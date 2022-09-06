import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";

import { Loader } from "../components/Loader";
import { ChatList } from "../components/ChatList";
import { UsersChat } from "../components/UsersChat";
import {
  EVENT_ACTIVITY,
  INNER_HEIGHT_WINDOW,
  TEXT_ON_START,
} from "../utils/constats";
import {
  addOnline,
  sendMsgAction,
  updateDialog,
  checkerActivity,
  checkingStatusMsg,
  checkibgUnreadedMsg,
} from "../utils/functionsFirebase";
import { scrollTopHandle } from "../utils/functions";
import { Context } from "../main.js";
import { useStyles } from "../styles/chatpageStyles";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";
import "firebase/compat/firestore";
import { collection, setDoc, doc, onSnapshot } from "firebase/firestore";
import { LoaderRadius } from "../components/LoaderRadius";
import { AccordionItem } from "../components/AccordionItem";
import { Button } from "@mui/material";

const Chat = () => {
  const classes = useStyles();

  const { auth, db } = useContext(Context);

  const [user] = useAuthState(auth);

  const [msgText, setMsgText] = useState("");
  const [companionUid, setCompanionUid] = useState(user.uid);
  const [messages, setMessages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isChatLoading, setIsChatLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [unreadedMsg, setUnreadedMsg] = useState({});
  const [isEditNow, setIsEditNow] = useState(false);
  const [startActionEdit, setStartActionEdit] = useState(false);

  const onlineCountCollectionRef = collection(db, "online-count");
  const [onlineCount] = useCollectionData(onlineCountCollectionRef);
  const usersCountCollectionRef = collection(db, "all-users");
  const [usersCount] = useCollectionData(usersCountCollectionRef);
  const userDialogsCollectionRef = collection(db, user.uid);
  const [userDialogsCount] = useCollection(userDialogsCollectionRef);

  const textArea = useRef(null);

  const DB_ONLINE = doc(db, "online-count", user.uid);
  const DB_USER = doc(db, user.uid, companionUid);
  const DB_COMPANION = doc(db, companionUid, user.uid);

  //!!!!!Возможно useCallback поломает
  const sendMsg = (firstMsg = null) => {
    console.log("sendMsg");
    addOnline(DB_ONLINE, user);
    sendMsgAction(DB_USER, DB_COMPANION, user, companionUid, msgText, firstMsg);
    setMsgText("");
  };

  // в самолете делал без дебага
  useEffect(() => {
    console.log(userDialogsCount);
    checkibgUnreadedMsg(db, user.uid, userDialogsCount, setUnreadedMsg);
    // if (userDialogsCount != undefined) {
    //   const idArray = Object.keys(userDialogsCount.docs).map(
    //     (key) => userDialogsCount.docs[key].id
    //   );

    //   idArray.forEach((profileUid) => {
    //     const subscribe = onSnapshot(doc(db, profileUid, user.uid), (doc) => {
    //       let count;
    //       const docData = doc.data();
    //       if (docData != undefined) {
    //         count = 0;
    //         Object.keys(docData).forEach((key) =>
    //           docData[key].unreaded == true ? count++ : null
    //         );
    //       }
    //       setUnreadedMsg((prev) => ({ ...prev, [profileUid]: count }));
    //       subscribe();
    //     });
    //   });
    // }
  }, [userDialogsCount]);

  function openDialog(compUid) {
    if (companionUid == compUid) return;
    setIsChatLoading(true);
    console.log("openDialog");
    setCompanionUid(compUid);
  }

  const refreshDialog = async () => {
    console.log("refreshDialog");
    updateDialog(DB_USER)
      .then((docSnap) => {
        if (docSnap.exists()) setMessages(docSnap.data());
        else {
          if (user.uid == companionUid) sendMsg(TEXT_ON_START);
          else setDoc(DB_USER, {});
        }
      })
      .then(() => {
        setUnreadedMsg((prev) => ({ ...prev, [companionUid]: 0 }));
        setIsLoading(false);
        setIsChatLoading(false);
        scrollTopHandle();
      });
  };

  useEffect(() => {
    openDialog(user.uid);
    addOnline(DB_ONLINE, user);

    let offline = checkerActivity(DB_ONLINE, 5000000);

    EVENT_ACTIVITY.forEach((item) => {
      window.addEventListener(item, () => {
        clearTimeout(offline);
        offline = checkerActivity(DB_ONLINE, 5000000);
      });
    });
  }, []);

  useEffect(() => {
    console.log("companionUid is changed");

    const subscribe = onSnapshot(DB_USER, () => {
      console.log("refresh is complited");
      refreshDialog();
    });

    return () => subscribe();
  }, [companionUid]);

  useEffect(() => {
    checkingStatusMsg(DB_COMPANION, messages, user);
  }, [messages]);

  useEffect(() => {
    if (isEditNow) textArea.current.children[1].children[0].focus();
  }, [isEditNow]);

  if (isLoading) return <Loader />;

  return (
    <Grid
      container
      component={Paper}
      className={classes.chatSection}
      sx={{
        minHeight: INNER_HEIGHT_WINDOW + "px",
        maxHeight: INNER_HEIGHT_WINDOW + "px",
      }}
    >
      <Grid item xs={3} className={`${classes.borderRight500} user-menu`}>
        <List>
          <ListItem button key="RemySharp">
            <ListItemIcon>
              <Avatar alt={user.displayName} src={user.photoURL} />
            </ListItemIcon>
            <ListItemText primary={user.displayName}></ListItemText>
          </ListItem>
        </List>

        <Grid item xs={12} style={{ padding: "10px" }}>
          <TextField
            id="outlined-basic-email"
            label="Search"
            variant="outlined"
            fullWidth
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Grid>

        <List>
          <UsersChat
            onlineCount={[user]}
            openDialog={openDialog}
            userProfile={user}
            filter={false}
          />
          <Grid container mt={1}>
            <AccordionItem title={"Все онлайн"}>
              <UsersChat
                onlineCount={onlineCount}
                openDialog={openDialog}
                userProfile={user}
                searchName={searchName}
                unreadedMsg={unreadedMsg}
              />
            </AccordionItem>
            <AccordionItem title={"Все пользователи"}>
              <UsersChat
                onlineCount={usersCount}
                openDialog={openDialog}
                userProfile={user}
                searchName={searchName}
                unreadedMsg={unreadedMsg}
              />
            </AccordionItem>
          </Grid>
        </List>
      </Grid>
      <Grid
        item
        xs={9}
        className="chat-window-wrapper"
        sx={{ maxWidth: "100%" }}
      >
        <List className={classes.messageArea} id="chatWindow">
          {isChatLoading ? (
            <>
              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                height={"100%"}
              >
                <LoaderRadius />
              </Grid>
            </>
          ) : (
            <>
              <ChatList
                messagesHistory={messages}
                companionUid={companionUid}
                user={user}
                usersCount={usersCount}
                db_const={{ DB_USER: DB_USER, DB_COMPANION: DB_COMPANION }}
                setIsChatLoading={setIsChatLoading}
                setIsEditNow={setIsEditNow}
                textArea={textArea}
                setMsgText={setMsgText}
                startActionEdit={startActionEdit}
                setStartActionEdit={setStartActionEdit}
              />
            </>
          )}
        </List>
        <Divider />
        <Grid container style={{ padding: "20px", flexWrap: "nowrap" }}>
          <Grid item xs={isEditNow ? 12 : 10}>
            <TextField
              id="outlined-basic-email"
              ref={textArea}
              label="Type Something"
              fullWidth
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
            />
          </Grid>
          {!isEditNow ? (
            <Grid item xs={1} sx={{ ml: "15px", mr: "15px" }}>
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => {
                  sendMsg();
                }}
              >
                <SendIcon />
              </Fab>
            </Grid>
          ) : null}
        </Grid>
        {isEditNow ? (
          <Grid
            container
            sx={{
              flexDirection: "row",
              marginTop: "-5px",
              marginRight: "5px",
              justifyContent: "space-around",
            }}
            xs="12"
          >
            <Button variant="text" onClick={() => setStartActionEdit(true)}>
              Сохранить
            </Button>
            <Button variant="text" onClick={() => setIsEditNow(false)}>
              Отмена
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};

export { Chat };

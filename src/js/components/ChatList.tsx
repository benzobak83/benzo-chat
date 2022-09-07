import { Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState, useContext, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ActiveDialogProfile } from "./ActiveDialogProfile";
import {
  deleteMsgAction,
  deleteMsgAllAction,
  editMsgAction,
} from "../utils/functionsFirebase";
import { Context } from "../main";
import ActionDelete from "./ActionDelete";

const ChatList = React.memo((props) => {
  const {
    messagesHistory,
    companionUid,
    user,
    usersCount,
    db_const,
    setIsChatLoading,
    setIsEditNow,
    textArea,
    setMsgText,
    startActionEdit,
    setStartActionEdit,
  } = props;
  const { auth, db } = useContext(Context);

  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isDeleteAction, setIsDeleteAction] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  // console.log(textArea.current.children[1].children[0].value)

  const keys = Object.keys(messagesHistory);
  const sortedKeys = keys.slice().sort((a, b) => new Date(a) - new Date(b));
  console.log(messagesHistory);

  const text = useRef(null);

  const changeDeleteAction = (boolean) => setIsDeleteAction(boolean);
  const handleSelectedMsg = (e) => {
    return e.target.closest(".chat-msg").getAttribute("data-key-msg");
  };
  const handleCancelSelected = () => {
    setSelectedMessages([]);
  };
  const pickMsg = (msgId) => {
    selectedMessages.includes(msgId)
      ? setSelectedMessages((prev) => prev.filter((item) => item != msgId))
      : setSelectedMessages((prev) => [...prev, msgId]);
  };

  const deleteMsg = () => {
    deleteMsgAction(db_const.DB_USER, selectedMessages);
    handleCancelSelected();
  };
  const deleteMsgAll = () => {
    deleteMsgAllAction(
      db_const.DB_USER,
      db_const.DB_COMPANION,
      selectedMessages
    );
    handleCancelSelected();
  };
  // const editMsg = () => editMsgAction(db_const.DB_USER, db_const.DB_COMPANION, messagesHistory, selectedMessages, 'checktext')
  const handleClickEditMsg = () => {
    setIsEditNow(true);
    text.current = messagesHistory[selectedMessages[0]].text;
    setMsgText(text.current);
    // editMsgAction(db_const.DB_USER, db_const.DB_COMPANION, messagesHistory, selectedMessages, text)
  };
  useEffect(() => {
    if (startActionEdit) {
      console.log("edit now");
      console.log(text.current);
      text.current = textArea.current.children[1].children[0].value;
      console.log(text.current);
      editMsgAction(
        db_const.DB_USER,
        db_const.DB_COMPANION,
        messagesHistory,
        selectedMessages,
        text.current
      );
      setStartActionEdit(false);
      setIsEditNow(false);
      setSelectedMessages([]);
      setMsgText("");
    }
  }, [startActionEdit]);

  useEffect(() => {
    window.addEventListener("scroll", () =>
      setScrollTop(document.documentElement.scrollTop)
    );
  }, []);
  console.log(scrollTop);

  return (
    <>
      <div className="container-active-dialog-profile">
        <Grid
          item
          xs={12}
          bgcolor={"white"}
          className={"active-dialog-profile"}
          sx={{
            position: "fixed",
            borderBottom: "1px solid #f5f5f5",
            zIndex: "998",
            top: "64px",
            width: "75%",

            padding: "10px",
            display: scrollTop > 0 ? "none" : "flex",
            justifyContent: "flex-end",
            maxHeight: "57.5px",
            alignItems: "center",
          }}
        >
          {selectedMessages.length ? (
            <>
              <Button
                variant="text"
                sx={{ position: "absolute", left: "10px" }}
                onClick={handleCancelSelected}
              >
                Отмена
              </Button>
              {selectedMessages.length == 1 && (
                <Button
                  variant="contained"
                  sx={{ marginRight: "20px" }}
                  onClick={handleClickEditMsg}
                >
                  Редактировать
                </Button>
              )}
              <Button
                variant="outlined"
                onClick={() => changeDeleteAction(true)}
              >
                {selectedMessages.length > 1
                  ? `Удалить все (${selectedMessages.length})`
                  : "Удалить"}
              </Button>
            </>
          ) : (
            <>
              <ActiveDialogProfile
                usersCount={usersCount}
                companionUid={companionUid}
                userProfile={user}
              />
            </>
          )}
        </Grid>
      </div>

      <ActionDelete
        isDeleteAction={isDeleteAction}
        changeDeleteAction={changeDeleteAction}
        deleteMsg={deleteMsg}
        deleteMsgAll={deleteMsgAll}
      />
      <Grid sx={{ marginTop: "55px" }}>
        {sortedKeys.map((item, index) => (
          <ChatMessage
            message={messagesHistory[item]}
            key={index}
            pickMsg={pickMsg}
            keyMsg={sortedKeys[index]}
            companionUid={companionUid}
            user={user}
            handleSelectedMsg={handleSelectedMsg}
            msgIsSelected={selectedMessages.includes(sortedKeys[index])}
          />
        ))}
      </Grid>
    </>
  );
});

export { ChatList };

import { Button, Grid } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { ChatMessage } from "./ChatMessage";
import { ActiveDialogProfile } from "./ActiveDialogProfile";
import {
  deleteMsgAction,
  deleteMsgAllAction,
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
  } = props;
  const { auth, db } = useContext(Context);

  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isDeleteAction, setIsDeleteAction] = useState(false);

  const keys = Object.keys(messagesHistory);
  const sortedKeys = keys.slice().sort((a, b) => new Date(a) - new Date(b));

  const changeDeleteAction = (boolean) => setIsDeleteAction(boolean);
  const handleSelectedMsg = (e) => {
    return e.target.closest(".chat-msg").getAttribute("data-key-msg");
  };
  const handleCancelSelected = () => {
    setSelectedMessages([]);
  };
  const pickMsg = (msgId) => {
    selectedMessages.includes(msgId)
    ? setSelectedMessages((prev) => prev.filter(item => item != msgId))
    : setSelectedMessages((prev) => [...prev, msgId]);
  }
  useEffect(() => {
  }, [selectedMessages])
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

  return (
    <>
      <Grid
        item
        xs={12}
        bgcolor={"white"}
        sx={{
          position: "fixed",
          borderBottom: "1px solid #f5f5f5",
          zIndex: "998",
          top: "64px",
          width: "75%",
          padding: "10px",
          display: "flex",
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
            {selectedMessages.length == 1 && (<Button variant="contained" sx={{ marginRight: "20px" }}>
              Редактировать
            </Button>)}
            <Button variant="outlined" onClick={() => changeDeleteAction(true)}>
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
            msgIsSelected = {selectedMessages.includes(sortedKeys[index])}
          />
        ))}
      </Grid>
    </>
  );
});

export { ChatList };

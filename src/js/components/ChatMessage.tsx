import React, { useState, useContext } from "react";
import { ListItem, Grid, ListItemText } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const ChatMessage = React.memo((props) => {
  const {
    message,
    companionUid,
    user,
    keyMsg = "",
    handleSelectedMsg,
    pickMsg,
    msgIsSelected = false ,
  } = props;
  const { text, userUid, createAt, dateUser, unreaded = false } = message;
  
  
console.log(text)


  const stylesUser = {
    justifyContent: "flex-end",
  };
  const stylesFriend = {
    justifyContent: "flex-start",
  };
  const publicStyles = {
    backgroundColor: msgIsSelected? '#d9d9d9' : "#f5f5f5",
    padding: "7px 12px",
    maxWidth: "80%",
    borderRadius: "10px",
    width: "auto",
    minWidth: "80px",
  };

  return (
    <>
      <ListItem
        className="chat-msg"
        data-key-msg={keyMsg}
        onDoubleClick={(e) => pickMsg(handleSelectedMsg(e))}
        sx={userUid !== companionUid ? { ...stylesUser } : { ...stylesFriend }}
      >
        <Grid container sx={{ ...publicStyles }}>
          <Grid
            item
            xs={12}
            sx={{ maxWidth: "100%", overflowWrap: "break-word" }}
          >
            <ListItemText primary={text}></ListItemText>
          </Grid>
          <Grid item xs={12} display={"flex"}>
            <ListItemText secondary={dateUser}></ListItemText>
            <ListItemText
              secondary={
                !(unreaded && companionUid != user.uid) ? (
                  ""
                ) : (
                  <VisibilityOffOutlinedIcon
                    fontSize={"small"}
                    sx={{ maxWidth: "15px", maxHeight: "15px" }}
                  />
                )
              }
              sx={{
                textAlign: "right",
                position: "absolute",
                right: "22px",
                bottom: "12px",
              }}
            ></ListItemText>
          </Grid>
        </Grid>
      </ListItem>
    </>
  );
});

export { ChatMessage };

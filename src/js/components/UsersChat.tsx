import React, { useRef, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

import notepadImg from "../../assets/img/saved.webp";
import { filterOnlineCount, getUid } from "../utils/functions";
import { Typography } from "@mui/material";

const UsersChat = React.memo((props) => {
  const {
    onlineCount,
    openDialog,
    userProfile,
    searchName,
    unreadedMsg = {},
    filter = true,
  } = props;

  const [isNotification, setIsNotification] = useState(true);
  const onlineCountFiltered = filterOnlineCount(
    onlineCount,
    searchName,
    userProfile,
    filter
  );

  const users_uid = Object.keys(unreadedMsg);

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      {onlineCountFiltered.map((user) => (
        <ListItem
          button
          sx={{ borderBottom: "1px solid #f5f5f5" }}
          key={user.displayName}
          data-uid={user.uid}
          className={
            userProfile.uid !== user.uid ? "user-online" : "user-online active"
          }
          onClick={(e) => getUid(e, openDialog)}
        >
          <ListItemIcon>
            <Avatar
              alt={user.displayName}
              src={userProfile.uid !== user.uid ? user.photoURL : notepadImg}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              userProfile.uid !== user.uid ? user.displayName : "Заметки"
            }
            className={"uset-chat__hidden"}
          >
            {userProfile !== user.uid ? user.displayName : "Заметки"}{" "}
          </ListItemText>
          <ListItemText
            secondary={userProfile.uid !== user.uid ? "online" : ""}
            className={"uset-chat__hidden"}
          ></ListItemText>
          {unreadedMsg[user.uid] > 0 ? (
            <Typography
              sx={{
                position: "absolute",
                top: "10px",
                left: "40px",
                color: "white",
                border: "1px solid #1976d2",
                borderRadius: "30px",
                backgroundColor: "#1976d2",
                padding: "1px 6px",
                fontSize: "12px",
              }}
              className={"uset-chat__hidden"}
            >
              {unreadedMsg[user.uid]}
            </Typography>
          ) : null}
        </ListItem>
      ))}
    </div>
  );
});

export { UsersChat };

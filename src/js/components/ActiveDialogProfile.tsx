import {
  Avatar,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import notepadImg from "../../assets/img/saved.webp";

const ActiveDialogProfile = (props) => {
  const { usersCount, companionUid, userProfile } = props;
  const [activeProfile] = usersCount.filter(
    (user) => user["uid"] == companionUid
  );

  return (
    <>
      <Grid
        container
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ListItem
          key={activeProfile.displayName}
          data-uid={activeProfile.uid}
          sx={{ width: "auto", margin: "0 auto" }}
        >
          <ListItemIcon>
            <Avatar
              alt={activeProfile.displayName}
              src={
                userProfile.uid !== activeProfile.uid
                  ? activeProfile.photoURL
                  : notepadImg
              }
            />
          </ListItemIcon>
          <ListItemText
            primary={
              userProfile.uid !== activeProfile.uid
                ? activeProfile.displayName
                : "Заметки"
            }
            className={"uset-chat__hidden"}
          >
            {userProfile !== activeProfile.uid
              ? activeProfile.displayName
              : "Заметки"}{" "}
          </ListItemText>
        </ListItem>
      </Grid>
    </>
  );
};

export { ActiveDialogProfile };

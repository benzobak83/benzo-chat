import React from "react";
import { makeStyles } from "@mui/styles";
import { INNER_HEIGHT_WINDOW } from "../utils/constats";

const useStyles = () => {
  const styles = makeStyles({
    table: {
      minWidth: 650,
    },
    chatSection: {
      width: "100%",
      height: "100%",
    },
    headBG: {
      backgroundColor: "#e0e0e0",
    },
    borderRight500: {
      borderRight: "1px solid #e0e0e0",
    },
    messageArea: {
      overflowY: "auto",
      maxHeight: INNER_HEIGHT_WINDOW - 64 - 53 + "px",
      height: INNER_HEIGHT_WINDOW - 64 - 53 + "px",
    },
  });
  return styles();
};

export { useStyles };

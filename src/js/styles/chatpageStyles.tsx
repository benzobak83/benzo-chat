import React from "react";
import { makeStyles } from "@mui/styles";

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
      height: "73vh",
      overflowY: "auto",
    },
  });
  return styles();
};

export { useStyles };

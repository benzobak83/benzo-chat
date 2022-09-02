import { Alert } from "@mui/material";
import React from "react";

const AlertSuccess = (props) => {
  const { text } = props;

  return <Alert severity="success">{text}</Alert>;
};

export { AlertSuccess };

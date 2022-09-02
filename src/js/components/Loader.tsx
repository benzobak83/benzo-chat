import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Box";
import Container from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { padding } from "@mui/system";
import { INNER_HEIGHT_WINDOW } from "../utils/constats";

function Loader() {
  return (
    <Box sx={{ width: "100%", height: `${INNER_HEIGHT_WINDOW}px` }}>
      <LinearProgress sx={{ top: "47%", padding: "3px" }} />
    </Box>
  );
}

export { Loader };

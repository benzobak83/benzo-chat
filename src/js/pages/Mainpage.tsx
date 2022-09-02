import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Container, Button } from "@mui/material";

const Main = () => {
  return (
    <>
      <Grid
        container
        alignItems={"center"}
        height={window.innerHeight - 64 - 53}
      >
        <Grid container flexDirection={"column"} alignItems={"center"}>
          <Typography variant={"h3"} component={"h1"}>
            Live Chat
          </Typography>
          <Grid
            container
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ pl: 2, pr: 2, textAlign: "center", mt: 4 }}
          >
            <Typography sx={{ mb: 0.2 }}>
              Онлайн чат с авторизацией, реализованная через Firebase
            </Typography>
            <Typography>
              Стэк технологий: React, react-router, MUI, typescript, webpack,
              firebase{" "}
            </Typography>
            <Link to="/chat">
              <Button variant="contained" sx={{ mt: 3, mb: 1 }}>
                Start
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export { Main };

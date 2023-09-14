import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Box
        width='100%'
        padding='1rem 6%'
        backgroundColor={theme.palette.background.alt}
        textAlign='center'
      >
        <Typography fontWeight='bold' fontSize='32px' color='primary'>
          9GAG
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        padding='2rem'
        margin='2rem auto'
        borderRadius='1.5rem'
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight='500' variant='h5' sx={{ mb: "1.5rem" }}>
          Welcome to 9GAG
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;

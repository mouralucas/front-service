import { Box, CircularProgress, Typography } from "@mui/material";
import { ReactElement } from "react";

const Loader = (): ReactElement => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        bgcolor: "background.default",
      }}
    >
      <CircularProgress size={50} thickness={4} />
      <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
        Carregando...
      </Typography>
    </Box>
  );
};

export default Loader;
import { Box, CircularProgress, Typography } from "@mui/material";
import { ReactElement } from "react";

interface CircularLoaderProps {
  height?: string;
  bgcolor?: string;
}

const CircularLoader = (props: CircularLoaderProps): ReactElement => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: props.height || "100vh",
        width: "100%",
        bgcolor: props.bgcolor || null,
      }}
    >
      <CircularProgress color="primary" size={50} thickness={4} />
      <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
        Carregando...
      </Typography>
    </Box>
  );
};

export default CircularLoader;
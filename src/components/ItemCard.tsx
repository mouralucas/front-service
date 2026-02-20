import { Box, Typography } from "@mui/material";

interface ItemCardProps {
  title?: string;
  coverUrl?: string;
  author?: string;
  onClick?: () => void;
}

export default function ItemCard({
  title,
  coverUrl,
  author,
  onClick,
}: ItemCardProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        width: {
          xs: 120,
          sm: 140,
          md: 150,
        },
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: onClick ? "scale(1.03)" : "none",
        },
      }}
      onClick={onClick}
    >
      {/* Capa */}
      <Box
        component="img"
        src={coverUrl || "/images/no-cover.png"}
        alt={title}
        onError={(e: any) => {
          e.currentTarget.src = "/images/no-cover.png";
        }}
        sx={{
          width: "100%",
          aspectRatio: "2 / 3",
          objectFit: "contain", // <- importante
          borderRadius: 1,
          border: "1px solid #ddd",
          backgroundColor: "#f5f5f5",
        }}
      />

      {/* Título */}
      {title && (
        <Typography
          variant="body2"
          mt={1}
          textAlign="center"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
      )}

      {/* Autor */}
      {author && (
        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
        >
          {author}
        </Typography>
      )}
    </Box>
  );
}

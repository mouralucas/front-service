import { Box, Typography } from "@mui/material";

interface ItemCardProps {
  title: string;
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
        width: 150,
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
        sx={{
          backgroundImage: `url(${coverUrl || "/images/no-cover.png"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 1,
          border: "1px solid #ddd",
          width: 150,
          height: 200,
        }}
      />

      {/* Título */}
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

      {/* Autor (opcional) */}
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

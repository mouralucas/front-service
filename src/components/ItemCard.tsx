import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import nocover from '@/assets/core/images/no-cover.png'


interface ItemCardProps {
  title?: string;
  coverUrl?: string;
  author?: string;
  onClick?: () => void;
  onEdit?: any;
  readingGoalAchieved?: boolean;
  readingGoalAchievedDate?: string;
}

export default function ItemCard({
  title,
  coverUrl,
  author,
  onClick,
  onEdit,
  readingGoalAchieved,
  readingGoalAchievedDate,
}: ItemCardProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        width: 150,
      }}
    >
      {/* Wrapper da imagem */}
      <Box
        position="relative"
        width="100%"
        sx={{
          transition: "transform 0.2s ease",
          cursor: onClick ? "pointer" : "default",

          "&:hover": {
            transform: "scale(1.03)",
          },

          "&:hover .overlay": {
            opacity: onEdit ? 1 : 0,
          },
        }}
        onClick={onClick}
      >
        {/* ⭐ Badge de conquista */}
        {readingGoalAchieved && (
          <Box
            position="absolute"
            top={-25}
            left="50%"
            sx={{
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
          >
            <StarIcon
              sx={{
                fill: "#FFD700",
                fontSize: 50,
                filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.4))",
              }}
            />
          </Box>
        )}

        {/* Imagem */}
        <Box
          component="img"
          src={coverUrl || nocover }
          alt={title}
          onError={(e: any) => {
            e.currentTarget.src = nocover ;
          }}
          sx={{
            width: "100%",
            aspectRatio: "2 / 3",
            objectFit: "contain",
            borderRadius: 1,
            border: "1px solid #ddd",
            backgroundColor: "#f5f5f5",
            display: "block",
          }}
        />

        {/* Overlay */}
        {onEdit && (
          <Box
            className="overlay"
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-start"
            p={1}
            sx={{
              backgroundColor: "rgba(0,0,0,0.35)",
              borderRadius: 1,
              opacity: 0,
              transition: "opacity 0.2s ease",
            }}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              sx={{
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "#eee",
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

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

      {/* 📅 Data de conclusão */}
      {readingGoalAchieved && readingGoalAchievedDate && (
        <Typography
          variant="caption"
          color="primary"
          textAlign="center"
          sx={{ mt: 0.5 }}
        >
          {/* TODO: add datetime to format */}
          {readingGoalAchievedDate} 
        </Typography>
      )}
    </Box>
  );
}
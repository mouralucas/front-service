import React, { ReactElement } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../assets/core/components/modal.css";

interface ModalProps {
  showModal: boolean;
  hideModal?: () => void;
  actionModal?: () => void;
  disableAction?: boolean;
  footer?: React.ReactElement;
  body: React.ReactElement;
  headerComponents?: React.ReactElement;
  fullscreen?: boolean;
  title?: string;
  size?: "modal-xs" | "modal-sm" | "modal-md" | "modal-lg" | "modal-xl" | "modal-fullscreen";
}

const App = (props: ModalProps): React.ReactElement => {
  const sizeMapping: Record<string, "xs" | "sm" | "md" | "lg" | "xl"> = {
    "modal-xs": "xs",
    "modal-sm": "sm",
    "modal-md": "md",
    "modal-lg": "lg",
    "modal-xl": "xl",
    "modal-fullscreen": "xl",
  };

  const footer: ReactElement =
    props.footer ?? (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={props.hideModal}
        >
          Fechar
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          disabled={props.disableAction ?? false}
          onClick={props.actionModal ?? props.hideModal}
        >
          Salvar
        </Button>
      </Box>
    );

  return (
    <Dialog
      open={props.showModal}
      onClose={props.hideModal}
      fullWidth
      maxWidth={sizeMapping[props.size ?? ""] ?? "md"}
      fullScreen={props.size === "modal-fullscreen" || props.fullscreen}
    >
      <DialogTitle
        className="custom-modal-header"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {props.title ?? "Modal Title"}
          {props.headerComponents && <Box ml={2}>{props.headerComponents}</Box>}
        </Box>

        {props.hideModal && (
          <IconButton
            aria-label="close"
            onClick={props.hideModal}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent>
        {props.body ?? <p>This is the modal body.</p>}
      </DialogContent>

      <DialogActions className="custom-modal-footer">
        {footer}
      </DialogActions>
    </Dialog>
  );
};

export default App;

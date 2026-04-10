import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import React, { ReactElement } from "react";
import "@/styles/components/modal.css";

interface ModalV2Props {
    isOpen: boolean;
    onToggle: () => void;
    body: React.ReactElement;
    actionModal?: () => void;
    disableAction?: boolean;
    footer?: React.ReactElement;
    headerComponents?: React.ReactElement;
    title?: string;
    size?: "modal-xs" | "modal-sm" | "modal-md" | "modal-lg" | "modal-xl" | "modal-fullscreen";
}

const ModalV2 = (props: ModalV2Props): React.ReactElement => {
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
                    onClick={props.onToggle}
                >
                    Fechar
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    disabled={props.disableAction ?? false}
                    onClick={props.actionModal ?? props.onToggle}
                >
                    Salvar
                </Button>
            </Box>
        );

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onToggle}
            fullWidth
            maxWidth={sizeMapping[props.size ?? ""] ?? "md"}
            fullScreen={props.size === "modal-fullscreen"}
            container={document.body}
            disablePortal={false}
        >
            <DialogTitle
                className="custom-modal-header"
                sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {props.title ?? "Modal Title"}
                    {props.headerComponents && <Box ml={2}>{props.headerComponents}</Box>}
                </Box>

                <IconButton
                    aria-label="close"
                    onClick={props.onToggle}
                    size="small"
                >
                    <CloseIcon />
                </IconButton>
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

export default ModalV2;

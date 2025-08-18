import React, { ReactElement } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
} from "@mui/material";
import "../assets/core/components/modal.css"; // 👉 importa o css separado

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
    size?: "modal-sm" | "modal-lg" | "modal-xl" | "modal-fullscreen";
}

const App = (props: ModalProps): React.ReactElement => {
    const sizeMapping: Record<string, "xs" | "sm" | "md" | "lg" | "xl"> = {
        "modal-sm": "sm",
        "modal-lg": "lg",
        "modal-xl": "xl",
        "modal-fullscreen": "xl",
    };

    const footer: ReactElement =
        props.footer ?? (
            <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
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
            <DialogTitle className="custom-modal-header">
                {props.title ?? "Modal Title"}
                {props.headerComponents && <Box ml={2}>{props.headerComponents}</Box>}
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

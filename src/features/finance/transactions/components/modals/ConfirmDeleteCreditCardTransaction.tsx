import Modal from '../../../../../components/Modal';
import { Box, Button } from '@mui/material';
import { ReactElement } from 'react';
import { CreditCardTransaction } from '../../types/CreditCard';

interface ConfirmDeleteCreditCardTransactionProps {
    isOpen: boolean;
    onToggle: () => void;
    onConfirm: () => void;
    transaction?: CreditCardTransaction | null;
}

const ConfirmDeleteCreditCardTransaction = (
    props: ConfirmDeleteCreditCardTransactionProps
): ReactElement => {
    return (
        <Modal
            isOpen={props.isOpen}
            onToggle={props.onToggle}
            title="Confirmar exclusão"
            body={
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <p>Tem certeza que deseja deletar esta transação?</p>
                    {props.transaction?.isInstallment && (
                        <p>
                            Essa é uma transação parcelada, ao deletar todas as parcelas serão deletadas, mesmo em períodos passados.
                        </p>
                    )}
                </Box>
            }
            footer={
                <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={props.onToggle}
                    >
                        Não
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={props.onConfirm}
                    >
                        Sim
                    </Button>
                </Box>
            }
            size="modal-sm"
        />
    );
};

export default ConfirmDeleteCreditCardTransaction;

import { useCallback, useState } from "react";
import Modal from "../../../../../components/Modal";
import PerformanceChart from '../charts/InvestmentPerformance';
import StatementTable from '../tables/InvestmentStatement';
import { Box, Button, Grid } from "@mui/material";
// import { from } from "@apollo/client";
import InvestmentStatementModal from '../modals/InvestmentStatement';

interface InvestmentPerformanceProps {
    isOpen: boolean;
    onToggle: any;
    investmentId: string;
    investmentName: string;
}


const PerformanceModal = (props: InvestmentPerformanceProps) => {
    const [isStatementModalOpen, setIsStatementModalOpen] = useState<boolean>(false);
    const [selectedStatementId, setSelectedStatementId] = useState<string>()
    const [refreshKey, setRefreshKey] = useState<number>(0);

    const onStatementModalToggle = useCallback((e: any) => {
        if (e !== undefined && e.row !== undefined) {
            setSelectedStatementId(e.row.id);
            setIsStatementModalOpen(true);
        }

        if (isStatementModalOpen) {
            setRefreshKey(prev => prev + 1);
        }

        setIsStatementModalOpen(!isStatementModalOpen);
    }, [isStatementModalOpen])

    const handleUpdated = () => {
        setRefreshKey(prev => prev + 1);
    };

    const body = (
        <Grid container spacing={2}>
            <Grid size={12}>
                <PerformanceChart
                    investmentId={props.investmentId}
                    refreshKey={refreshKey}
                />
            </Grid>

            <Grid size={12} sx={{ mt: 10 }}>
                <StatementTable
                    investmentId={props.investmentId}
                    updatePerformanceChart={handleUpdated}
                />
            </Grid>
        </Grid>
    )

    const footer = (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={onStatementModalToggle}
                >
                    Adicionar Extrato
                </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={props.onToggle}
                >
                    Fechar
                </Button>
            </Box>
        </>
    )

    return (
        <>
            <Modal
                isOpen={props.isOpen}
                onToggle={props.onToggle}
                title={props.investmentName || 'Investimento'}
                body={body}
                footer={footer}
                size={'modal-xl'}
            />
            <InvestmentStatementModal
                isOpen={isStatementModalOpen}
                onToggle={onStatementModalToggle}
                investmentId={props.investmentId}
                statementId={selectedStatementId}
            />
        </>
    )
}

export default PerformanceModal;
import { useQuery } from '@apollo/client';
import { Box, Stack } from '@mui/material';
import { ReactElement } from 'react';
import DrawerV2 from '../../../../../components/Drawer';
import { apolloFinanceClient } from '../../../../../services/apollo/client/ApolloFinanceService';
import { QUERY_INVESTMENT_BY_ID, QUERY_INVESTMENTS } from '../../api/queries';
import { Investment } from '../../types/Investment';
import { QueryInvestment, QueryInvestmentById } from '../../types/InvestmentQueries';


interface IvestmentDrawerProps {
    isOpen: boolean;
    onToggle: (e: any) => void;
    investmentId: string;
};

const InvestmentDetailDrawer = (props: IvestmentDrawerProps): ReactElement => {

    const { data: investmentData } = useQuery<QueryInvestment>(QUERY_INVESTMENTS, {
        client: apolloFinanceClient,
        variables: {
            params: {
                id: props.investmentId
            }
        },
        skip: !props.isOpen && !props.investmentId
    })

    const investment: Investment | undefined = investmentData?.getInvestments.investments[0];

    const content: ReactElement =
        <>
            <Box display="flex" flexDirection="column" height="100%">
                <Box className="custom-toolbar">
                    {investment?.name || "Loading"}
                </Box>
                <Stack direction="row" spacing={2} p={2}>
                    <Box flex={2}>
                        <div className="title">Data</div>
                        <div>{new Date(investment?.transactionDate).toLocaleDateString('pt-BR')}</div>
                    </Box>
                    <Box flex={2}>
                        <div className="title">Vencimento</div>
                        <div>{new Date(investment?.maturityDate).toLocaleDateString('pt-BR')}</div>
                    </Box>
                    <Box flex={2}>
                        <div className="title">Taxa</div>
                        <div>{investment?.contractedRate}</div>
                    </Box>
                </Stack>
                <Stack direction={"row"} spacing={2} p={2}>
                    <Box flex={2}>
                        <div className="title">Total Investido</div>
                        <div>{investment?.amount}</div>
                    </Box>
                    <Box flex={2}>
                        <div className="title">Valor</div>
                        <div>{investment?.price}</div>
                    </Box>
                    <Box flex={2}>
                        <div className="title">Quantidade</div>
                        <div>{investment?.quantity}</div>
                    </Box>
                </Stack>
            </Box>
        </>

    return (
        <DrawerV2
            isOpened={props.isOpen}
            changePanelOpened={props.onToggle}
            anchor="right"
            content={content}
        />
    )
}

export default InvestmentDetailDrawer;
import { useQuery } from "@apollo/client";
import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import { ReactElement, useEffect } from "react";
import { apolloFinanceClient } from "../../../services/apollo/client/ApolloFinanceService";
import { QUERY_FINANCE_SUMMARY } from "../../../services/apollo/queries/Finance";
import CircularLoader from "../../../components/Loader";


const FinanceLanding = (): ReactElement => {
    const { data: summaryData, loading: summaryLoading } = useQuery(QUERY_FINANCE_SUMMARY, {
        client: apolloFinanceClient,
        fetchPolicy: "no-cache"
    })

    useEffect(() => {
        console.log(summaryData?.getFinanceSummary);
    }, [summaryData])

    return (
        <div className="container">
            <Box>
                <Grid container spacing={4} alignItems="stretch">
                    <Grid size={{ xs: 12, md: 3 }} sx={{ display: 'flex' }}>
                        <Card
                            variant="outlined"
                            sx={{ flex: 1, borderRadius: 4 }}
                        >
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Saldo
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    35.50
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }} sx={{ display: 'flex' }}>
                        <Card
                            variant="outlined"
                            sx={{ flex: 1, borderRadius: 4 }}
                        >
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Entradas
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }} sx={{ display: 'flex' }}>
                        <Card
                            variant="outlined"
                            sx={{ flex: 1, borderRadius: 4 }}
                        >
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Saídas
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }} sx={{ display: 'flex' }}>
                        <Card
                            variant="outlined"
                            sx={{ flex: 1, borderRadius: 4 }}
                        >
                            <CardContent>
                                {summaryLoading ? <CircularLoader height="20vh"></CircularLoader> :
                                    <>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography variant="h5" component="div">
                                                Total Investido
                                            </Typography>

                                            <Chip
                                                label={`${summaryData?.getFinanceSummary?.investment?.activeInvestmentsCount ?? 0} ativos`}
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            R$ {(summaryData?.getFinanceSummary?.investment?.totalInvested ?? 0).toFixed(2)} | R$ {(summaryData?.getFinanceSummary?.investment?.totalGross ?? 0).toFixed(2)} | {(summaryData?.getFinanceSummary?.investment?.totalGrowthPercentage ?? 0).toFixed(2)}%

                                        </Typography>
                                    </>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Box>
        </div>
    )
}

export default FinanceLanding
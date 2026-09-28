import { FC, ReactElement } from "react";

import WalletPerformanceChart from '../components/charts/InvestmentWalletPerformance.tsx'
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const InvestmentLanding: FC = (): ReactElement => {
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
                                    Total investido
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
                                    Variação último mês
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    35.50 (1,03%)
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
                                    Variação no ano
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    35.50 (1,03%)
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
                                    Vencimento próximo
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    35.50 (1,03%)
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }} sx={{ display: 'flex' }}>
                        <Card
                            variant="outlined"
                            sx={{ flex: 1, borderRadius: 4 }}
                        >
                            <CardContent>
                                <WalletPerformanceChart />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default InvestmentLanding;
import { FC, ReactElement } from "react";

import WalletPerformanceChart from '../components/charts/InvestmentWalletPerformance.tsx'
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const InvestmentLanding: FC = (): ReactElement => {
    return (
        <div className="container">
            <Box>
                <Grid container spacing={4} alignItems="stretch">
                    <Card
                        variant="outlined"
                        sx={{ flex: 1, borderRadius: 4 }}
                    >
                        <CardContent>
                            <WalletPerformanceChart />
                        </CardContent>
                    </Card>
                </Grid>
            </Box>
        </div>
    )
}

export default InvestmentLanding;
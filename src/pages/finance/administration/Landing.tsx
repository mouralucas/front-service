import { ReactElement } from "react";
import Grid from "@mui/material/Grid";

import Card from "../../../components/Card";
import BankTable from "./tables/Bank";
import DefaultCategoriesTable from "./tables/DefaultCategory";
import BrazilianFundsTable from "./tables/BrazilianFunds";
import IpcaTable from "./tables/Ipca";
import CdiTable from "./tables/Cdi";

const App = (): ReactElement => {
    return (
        <div className="container">
            <Grid container spacing={2}>
                {/* Fundos de Investimento */}
                <Grid size={{ xs: 12 }}>
                    <Card>
                        <Card.Header>
                            <b>Fundos de investimentos</b>
                        </Card.Header>
                        <Card.Body>
                            <BrazilianFundsTable />
                        </Card.Body>
                    </Card>
                </Grid>

                {/* Bancos / Financeiras */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <Card.Header>
                            <b>Bancos/Financeiras</b>
                        </Card.Header>
                        <Card.Body>
                            <BankTable />
                        </Card.Body>
                    </Card>
                </Grid>

                {/* Categorias */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <Card.Header>
                            <b>Categorias</b>
                        </Card.Header>
                        <Card.Body>
                            <DefaultCategoriesTable />
                        </Card.Body>
                    </Card>
                </Grid>

                {/* Histórico CDI */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <Card.Header>
                            <b>Histórico CDI</b>
                        </Card.Header>
                        <Card.Body>
                            <CdiTable />
                        </Card.Body>
                    </Card>
                </Grid>

                {/* Histórico IPCA */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <Card.Header>
                            <b>Histórico IPCA</b>
                        </Card.Header>
                        <Card.Body>
                            <IpcaTable />
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default App;

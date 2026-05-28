import Card from '../../../../components/Card'
import React, {useEffect} from "react";
import InvestmentTable from '../components/tables/Investment'
import BrazilianFundInvestmentTable from '../components/tables/BrazilianFundInvestment';
import ObjectivesTable from '../components/tables/InvestmentObjectives';

const ActiveInvestments = (): React.ReactElement => {
    useEffect(() => {
        document.title = 'Investimentos ativos';
    }, [])

    return (
        <div className="container">
            <div className="App">
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>
                                <b>Investimentos</b>
                            </Card.Header>
                            <Card.Body>
                                <InvestmentTable />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Body>
                                <BrazilianFundInvestmentTable/>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header><b>Objetivos</b></Card.Header>
                            <Card.Body>
                                <ObjectivesTable />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActiveInvestments;
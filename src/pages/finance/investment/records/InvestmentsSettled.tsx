import {ReactElement, useEffect} from "react";
import Card from "../../../../components/Card.tsx";
import InvestmentLiquidatedTable from './tables/InvestmentLiquidated.tsx'


const LiquidatedInvestments = (): ReactElement => {
    useEffect(() => {
        document.title = 'Investimentos liquidados';
    }, [])


    return (
        <div className="container">
            <div className="App">
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>
                                <b>Investimentos liquidados</b>
                            </Card.Header>
                            <Card.Body>
                                <InvestmentLiquidatedTable />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LiquidatedInvestments;
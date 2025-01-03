import {FC, ReactElement} from "react";
import Card from "../../../components/Card";


const InvestmentLanding: FC = (): ReactElement => {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Header>Alocação dos investimentos</Card.Header>
                        <Card.Body>
                            Lucas
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default InvestmentLanding;
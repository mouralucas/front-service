import {FC, ReactElement} from "react";
import Card from "../../../../components/Card.tsx";
import AllocationChart from '../components/charts/InvestmentAllocation.tsx'
import WalletPerformanceChart from '../components/charts/InvestmentWalletPerformance.tsx'

const InvestmentLanding: FC = (): ReactElement => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Header>Alocação dos investimentos</Card.Header>
                        <Card.Body>
                            <AllocationChart/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className='row'>
                <div className="col-12">
                    <Card>
                        <Card.Body>
                            <WalletPerformanceChart/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default InvestmentLanding;
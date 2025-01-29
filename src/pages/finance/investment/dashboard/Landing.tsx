import {FC, ReactElement} from "react";
import Card from "../../../../components/Card.tsx";
import AllocationChart from './charts/Allocation.tsx'
import PerformanceChart from './charts/Performance.tsx'

const InvestmentLanding: FC = (): ReactElement => {
    return (
        <>
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
                            <PerformanceChart/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default InvestmentLanding;
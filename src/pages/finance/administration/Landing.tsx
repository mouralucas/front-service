import {ReactElement} from "react";
import Card from "../../../components/Card";
import BankTable from './tables/Bank';
import DefaultCategoriesTable from './tables/DefaultCategory.tsx';
import BrazilianFundsTable from './tables/BrazilianFunds.tsx';
import IpcaTable from './tables/Ipca.tsx'
import CdiTable from './tables/Cdi.tsx'


const App = (): ReactElement => {
    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Header>
                            <b>Fundos de investimentos</b>
                        </Card.Header>
                        <Card.Body>
                            <BrazilianFundsTable />
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Header>
                            <b>Bancos/Financeiras</b>
                        </Card.Header>
                        <Card.Body>
                            <BankTable />
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <Card.Header>
                            <b>Categorias</b>
                        </Card.Header>
                        <Card.Body>
                            <DefaultCategoriesTable />
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <Card.Header>
                            <b>Histórico CDI</b>
                        </Card.Header>
                        <Card.Body>
                            <CdiTable />
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <Card.Header>
                            <b>Histórico IPCA</b>
                        </Card.Header>
                        <Card.Body>
                            <IpcaTable />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default App;
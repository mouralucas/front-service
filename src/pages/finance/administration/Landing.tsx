import {ReactElement} from "react";
import Card from "../../../components/Card";
import BankTable from './tables/Banks';
import DefaultCategoriesTable from './tables/DefaultCategories';
import BrazilianFundsTable from './tables/BrazilianFunds';


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
            </div>
        </div>
    )
}

export default App;
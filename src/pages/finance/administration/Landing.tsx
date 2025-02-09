import {ReactElement} from "react";
import Card from "../../../components/Card";
import BankTable from './tables/Banks';
import DefaultCategoriesTable from './tables/DefaultCategories';


const App = (): ReactElement => {
    return (
        <div className='container'>
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
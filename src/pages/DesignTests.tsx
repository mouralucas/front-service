import {ReactElement} from "react";
import Card from "../components/Card.tsx";
import DataGrid from "../components/table/DataGridV2.tsx";
import { GridColDef } from '@mui/x-data-grid';

const App = (): ReactElement => {

    const columns:  GridColDef<(typeof rows)[number]>[] = [
        { field: 'service', headerName: 'Service Name', flex: 1},
        { field: 'host', headerName: 'Host', flex: 1}
    ]

    const rows = [
        {
            'id': 1,
            'service': 'Service 1',
            'host': 'Host 2'
        },
        {
            'id': 2,
            'service': 'Service 2',
            'host': 'Host 2'
        }
    ];

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Body>
                            <DataGrid 
                                columns={columns}
                                data={rows}
                            />
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <Card>
                        <Card.Body>
                            <>Card de descrição</>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-9">
                    <div className="row">
                        <div className="col-4">
                            <Card>
                                <Card.Body>
                                    <p>Saldo</p>
                                    <p>R$ 0,00</p>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-4">
                            <Card>
                                <Card.Body>
                                    <p>Entradas</p>
                                    <p>R$ 0,00</p>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-4">
                            <Card>
                                <Card.Body>
                                    <p>Despesas</p>
                                    <p>R$ 0,00</p>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <Card>
                                <Card.Body>
                                    <>Lucas</>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-6">
                            <Card>
                                <Card.Body>
                                    <>Lucas</>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
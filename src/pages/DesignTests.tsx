import { ReactElement } from "react";
import Card from "../components/Card.tsx";
import DataGrid from "../components/table/DataGridV2.tsx";
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import { toast } from "react-toastify";
import TestingRowExpand from './testing/table/RowExpanding.tsx';

const App = (): ReactElement => {

    const handleEdit = (id: number) => {
        toast.info("Editar registro com ID:" + id);
        // Aqui você pode chamar sua função de edição
    };

    const columns: GridColDef[] = [
        { field: 'service', headerName: 'Service Name', flex: 1, hideable: true },
        { field: 'host', headerName: 'Host', flex: 1, hideable: false },
        {
            field: 'actions',
            headerName: 'Ações',
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(params.row.id)}
                >
                    Editar
                </Button>
            ),
        },
    ];

    const rows = [
        { 'id': 1, 'service': 'Service 1', 'host': 'Host 2' },
        { 'id': 2, 'service': 'Service 2', 'host': 'Host 2' },
        { 'id': 3, 'service': 'Service 3', 'host': 'Host 2' },
        { 'id': 4, 'service': 'Service 4', 'host': 'Host 2' },
        { 'id': 5, 'service': 'Service 5', 'host': 'Host 2' },
        { 'id': 6, 'service': 'Service 6', 'host': 'Host 2' },
        { 'id': 7, 'service': 'Service 7', 'host': 'Host 2' },
        { 'id': 8, 'service': 'Service 8', 'host': 'Host 2' },
        { 'id': 9, 'service': 'Service 9', 'host': 'Host 2' },
        { 'id': 10, 'service': 'Service 10', 'host': 'Host 2' },
        { 'id': 11, 'service': 'Service 11', 'host': 'Host 2' },
        { 'id': 12, 'service': 'Service 12', 'host': 'Host 2' },
        { 'id': 13, 'service': 'Service 13', 'host': 'Host 2' },
    ];

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <TestingRowExpand />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Body>
                            <Box>
                                <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Button
                                        variant='contained'
                                        color='success'
                                        size='small'
                                        onClick={() => toast.info('Adicionou novos items')}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        variant='contained'
                                        color='success'
                                        size='small'
                                        onClick={() => toast.info('Atualizou')}
                                    >
                                        Refresh
                                    </Button>
                                </Box>
                                <DataGrid
                                    columns={columns}
                                    data={rows}
                                />
                            </Box>
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
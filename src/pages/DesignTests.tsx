import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
    Box,
    Card,
    CardContent,
    Grid,
    Tooltip,
} from '@mui/material';
import {
    DataGrid,
    GridActionsCell,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
    Toolbar,
    ToolbarButton,
    gridEditRowsStateSelector,
    useGridApiContext,
    useGridSelector,
    type GridColDef,
    type GridEventListener,
    type GridRenderCellParams,
    type GridRowId,
    type GridRowModel,
    type GridRowModesModel,
    type GridSlotProps,
    type GridSlots,
} from '@mui/x-data-grid';

type ServiceRow = {
    id: number;
    service: string;
    host: string;
    test: number;
    isNew?: boolean;
};

const initialRows: ServiceRow[] = [
    { id: 1, service: 'Service 1', host: 'Host 2', test: 1 },
    { id: 2, service: 'Service 2', host: 'Host 2', test: 2 },
    { id: 3, service: 'Service 3', host: 'Host 2', test: 3 },
];

declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        rows: ServiceRow[];
        setRows: React.Dispatch<React.SetStateAction<ServiceRow[]>>;
        setRowModesModel: (
            newModel:
                | GridRowModesModel
                | ((oldModel: GridRowModesModel) => GridRowModesModel),
        ) => void;
    }
}

function EditToolbar(props: GridSlotProps['toolbar']) {
    const { rows, setRows, setRowModesModel } = props;
    const nextId = React.useRef(
        rows.reduce((maxId, row) => Math.max(maxId, row.id), 0) + 1,
    );

    const handleAddClick = () => {
        const newId = nextId.current++;
        setRows((oldRows) => [
            ...oldRows,
            { id: newId, service: '', host: '', isNew: true },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'service' },
        }));
    };

    return (
        <Toolbar>
            <Tooltip title="Adicionar serviço">
                <ToolbarButton onClick={handleAddClick} aria-label="Adicionar serviço">
                    <AddIcon fontSize="small" />
                </ToolbarButton>
            </Tooltip>
        </Toolbar>
    );
}

interface ActionHandlers {
    handleCancelClick: (id: GridRowId) => void;
    handleDeleteClick: (id: GridRowId) => void;
    handleEditClick: (id: GridRowId) => void;
    handleSaveClick: (id: GridRowId, row: GridRowModel<ServiceRow>) => void;
}

const ActionHandlersContext = React.createContext<ActionHandlers>({
    handleCancelClick: () => {},
    handleDeleteClick: () => {},
    handleEditClick: () => {},
    handleSaveClick: () => {},
});

function ActionsCell(props: GridRenderCellParams<ServiceRow>) {
    const apiRef = useGridApiContext();
    const editRows = useGridSelector(apiRef, gridEditRowsStateSelector);
    const isInEditMode = typeof editRows[props.id] !== 'undefined';
    const {
        handleSaveClick,
        handleCancelClick,
        handleEditClick,
        handleDeleteClick,
    } = React.useContext(ActionHandlersContext);

    return (
        <GridActionsCell {...props}>
            {isInEditMode ? (
                <>
                    <GridActionsCellItem
                        icon={<SaveIcon />}
                        label="Salvar"
                        color="primary"
                        onClick={() =>
                            handleSaveClick(
                                props.id,
                                apiRef.current.getRowWithUpdatedValues(props.id, 'service'),
                            )
                        }
                    />
                    <GridActionsCellItem
                        icon={<CancelIcon />}
                        label="Cancelar"
                        onClick={() => handleCancelClick(props.id)}
                        color="inherit"
                    />
                </>
            ) : (
                <>
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Editar"
                        onClick={() => handleEditClick(props.id)}
                        color="inherit"
                    />
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Excluir"
                        onClick={() => handleDeleteClick(props.id)}
                        color="inherit"
                    />
                </>
            )}
        </GridActionsCell>
    );
}

const App = (): React.ReactElement => {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const actionHandlers = React.useMemo<ActionHandlers>(
        () => ({
            handleEditClick: (id) => {
                setRowModesModel((oldModel) => ({
                    ...oldModel,
                    [id]: { mode: GridRowModes.Edit },
                }));
            },
            handleSaveClick: (id, row) => {
                console.log('Dados atuais da linha:', row);
                setRowModesModel((oldModel) => ({
                    ...oldModel,
                    [id]: { mode: GridRowModes.View },
                }));
            },
            handleDeleteClick: (id) => {
                setRows((oldRows) => oldRows.filter((row) => row.id !== id));
            },
            handleCancelClick: (id) => {
                setRowModesModel((oldModel) => ({
                    ...oldModel,
                    [id]: { mode: GridRowModes.View, ignoreModifications: true },
                }));
                setRows((oldRows) => {
                    const editedRow = oldRows.find((row) => row.id === id);
                    return editedRow?.isNew
                        ? oldRows.filter((row) => row.id !== id)
                        : oldRows;
                    
                });
            },
        }),
        [],
    );

    const processRowUpdate = (newRow: GridRowModel<ServiceRow>) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows((oldRows) =>
            oldRows.map((row) => (row.id === updatedRow.id ? updatedRow : row)),
        );
        return updatedRow;
    };

    const columns: GridColDef<ServiceRow>[] = [
        { field: 'service', headerName: 'Serviço', flex: 1, editable: true },
        { field: 'host', headerName: 'Host', flex: 1, editable: true },
        {
            field: 'actions',
            headerName: 'Ações',
            type: 'actions',
            width: 100,
            sortable: false,
            filterable: false,
            renderCell: (params) => <ActionsCell {...params} />,
        },
    ];

    return (
        <div className="container">
            <Box>
                <Grid container spacing={4} alignItems="stretch">
                    <Grid size={12}>
                        <Card variant="outlined">
                            <CardContent>
                                <ActionHandlersContext.Provider value={actionHandlers}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        editMode="row"
                                        rowModesModel={rowModesModel}
                                        onRowModesModelChange={setRowModesModel}
                                        onRowEditStop={handleRowEditStop}
                                        processRowUpdate={processRowUpdate}
                                        showToolbar
                                        slots={{ toolbar: EditToolbar as GridSlots['toolbar'] }}
                                        slotProps={{
                                            toolbar: { rows, setRows, setRowModesModel },
                                        }}
                                        autoHeight
                                    />
                                </ActionHandlersContext.Provider>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={4} alignItems="stretch">
                    <Grid size={3}>
                        <Card variant="outlined" sx={{ flex: 1, borderRadius: 4 }}>
                            <CardContent>Card de descrição</CardContent>
                        </Card>
                    </Grid>
                    <Grid size={9} container direction="row">
                        <Grid size={4}>
                            <Card variant="outlined" sx={{ flex: 1, borderRadius: 4 }}>
                                <CardContent>
                                    <p>Saldo</p>
                                    <p>R$ 0,00</p>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={4}>
                            <Card variant="outlined" sx={{ flex: 1, borderRadius: 4 }}>
                                <CardContent>
                                    <p>Entradas</p>
                                    <p>R$ 0,00</p>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={4}>
                            <Card variant="outlined" sx={{ flex: 1, borderRadius: 4 }}>
                                <CardContent>
                                    <p>Despesas</p>
                                    <p>R$ 0,00</p>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={4}>
                            <Card variant="outlined" sx={{ flex: 1, borderRadius: 4 }}>
                                <CardContent>
                                    <p>Outro</p>
                                    <p>R$ 0,00</p>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default App;

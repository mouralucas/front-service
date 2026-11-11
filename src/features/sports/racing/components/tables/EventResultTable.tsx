import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Box, IconButton } from "@mui/material";
import {
    GridActionsCell,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
    gridEditRowsStateSelector,
    useGridApiContext,
    useGridSelector,
    type GridColDef,
    type GridEventListener,
    type GridRenderCellParams,
    type GridRenderEditCellParams,
    type GridRowId,
    type GridRowModel,
    type GridRowModesModel,
} from "@mui/x-data-grid";
import { ReactElement, createContext, useContext, useEffect, useMemo, useState } from "react";
import DataGrid from '../../../../../components/table/DataGrid.tsx';
import { SessionResults } from "../../types/SessionResults.ts";
import SelectAutocomplete from "../../../../../components/form/SelectAutocomplete.tsx";
import { Constructors } from "../../types/Constructors.ts";
import { getConstructors } from "../../../../../services/getCommonData/SportsData.ts";

interface EventResultTableProps {
    sessionResultData?: SessionResults[];
}

type EventResultRow = Omit<SessionResults, "constructorId"> & {
    constructorId: number | null;
    isNew?: boolean;
};

interface ActionHandlers {
    handleCancelClick: (id: GridRowId) => void;
    handleDeleteClick: (id: GridRowId) => void;
    handleEditClick: (id: GridRowId) => void;
    handleSaveClick: (id: GridRowId, row: GridRowModel) => void;
}

const ActionHandlersContext = createContext<ActionHandlers>({
    handleCancelClick: () => { },
    handleDeleteClick: () => { },
    handleEditClick: () => { },
    handleSaveClick: () => { },
});

function ActionsCell(props: GridRenderCellParams<EventResultRow>) {
    const apiRef = useGridApiContext();
    const editRows = useGridSelector(apiRef, gridEditRowsStateSelector);
    const isInEditMode = typeof editRows[props.id] !== "undefined";
    const {
        handleSaveClick,
        handleCancelClick,
        handleEditClick,
        handleDeleteClick,
    } = useContext(ActionHandlersContext);

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
                                apiRef.current.getRowWithUpdatedValues(props.id, "position"),
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

const EventResultTable = (props: EventResultTableProps): ReactElement => {
    // Edit filds data
    const [constructorsData, setConstructorsData] = useState<Constructors[]>([])

    const [rows, setRows] = useState<EventResultRow[]>(props.sessionResultData ?? []);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    useEffect(() => {
        setRows(props.sessionResultData ?? []);
    }, [props.sessionResultData]);

    const fetchData: () => Promise<void> = async () => {
        setConstructorsData(await getConstructors());
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const actionHandlers = useMemo<ActionHandlers>(
        () => ({
            handleEditClick: (id) => {
                setRowModesModel((oldModel) => ({
                    ...oldModel,
                    [id]: { mode: GridRowModes.Edit },
                }));
            },
            handleSaveClick: (id, row) => {
                console.log("Dados atuais do resultado:", row);
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

    const handleAddClick = () => {
        const newId = rows.reduce((maxId, row) => Math.max(maxId, row.id), 0) + 1;
        setRows((oldRows) => [
            ...oldRows,
            {
                id: newId,
                position: 0,
                lastName: "",
                constructorId: null,
                constructorName: "",
                laps: 0,
                raceTime: "",
                gap: "",
                raceStatus: "",
                eventName: "",
                sessionName: "",
                isNew: true,
            },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [newId]: { mode: GridRowModes.Edit, fieldToFocus: "position" },
        }));
    };

    const processRowUpdate = (newRow: GridRowModel<EventResultRow>) => {
        const updatedRow = { ...newRow, isNew: false };
        console.log(updatedRow);
        setRows((oldRows) =>
            oldRows.map((row) => (row.id === updatedRow.id ? updatedRow : row)),
        );
        return updatedRow;
    };

    const columns: GridColDef<EventResultRow>[] = [
        { field: "id", headerName: "Id", flex: 0.5 },
        { field: "position", headerName: "Posição", editable: true },
        { field: "driverName", headerName: "Piloto", flex: 1, editable: true },
        {
            field: "constructorId",
            headerName: "Equipe",
            flex: 1,
            editable: true,
            valueSetter: (value, row) => {
                const constructor = constructorsData.find((option) => option.id === value);
                return {
                    ...row,
                    constructorId: value,
                    constructorName: constructor?.name ?? "",
                };
            },
            renderCell: (params) => params.row.constructorName,
            renderEditCell: (params: GridRenderEditCellParams<EventResultRow>) => (
                <SelectAutocomplete
                    value={params.value}
                    label="Equipe"
                    options={constructorsData}
                    getOptionLabel={(option: Constructors) => option.name}
                    getOptionValue={(option: Constructors) => option.id}
                    onChange={(value) => {
                        void params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value,
                        });
                    }}
                />
            ),
        },
        { field: "laps", headerName: "Voltas", flex: 1, editable: true, type: "number" },
        { field: "raceTime", headerName: "Tempo", flex: 1, editable: true },
        { field: "gap", headerName: "Intervalo", flex: 1, editable: true },
        { field: "raceStatus", headerName: "Status", flex: 1, editable: true },
        {
            field: "actions",
            headerName: "Ações",
            type: "actions",
            width: 100,
            sortable: false,
            filterable: false,
            renderCell: (params) => <ActionsCell {...params} />,
        },
    ];

    return (
        <Box sx={{ display: "block" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                <IconButton
                    aria-label="Novo resultado"
                    color="primary"
                    onClick={handleAddClick}
                >
                    <AddCircleOutline />
                </IconButton>
            </Box>
            <ActionHandlersContext.Provider value={actionHandlers}>
                <DataGrid
                    columns={columns}
                    data={rows}
                    getRowId={(row: EventResultRow) => row.id}
                    pageSize={100}
                    columnVisibilityModel={{ id: false }}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={setRowModesModel}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                />
            </ActionHandlersContext.Provider>
        </Box>
    );
};

export default EventResultTable;

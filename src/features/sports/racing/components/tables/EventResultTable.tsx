import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ReactElement } from "react";
import DataGrid from '../../../../../components/table/DataGrid.tsx';
import { SessionResults } from "../../types/SessionResults.ts";


interface EventResultTableProps {
    sessionResultData: any;
}

const EventResultTable = (props: EventResultTableProps): ReactElement => {
    
    const columns: GridColDef<SessionResults>[] = [
        {
            field: "id", headerName: "Id", flex: .5
        },
        {
            field: "position", headerName: "Posição"
        },
        {
            field: "lastName", headerName: "Piloto", flex: 1
        },
        {
            field: "constructorName", headerName: "Equipe", flex: 1
        },
        {
            field: "laps", headerName: "Voltas", flex: 1
        },
        {
            field: "raceTime", headerName: "Tempo", flex: 1
        },
        {
            field: "gap", headerName: "Intervalo", flex: 1
        },
        {
            field: "raceStatus", headerName: "Status", flex: 1,
        }
    ]

    return (
        <Box sx={{ display: 'block ' }}>
            <DataGrid
                columns={columns}
                data={props.sessionResultData}
                getRowId={(row) => row.id}
                pageSize={100}
                columnVisibilityModel={{
                    id: false,
                }}
            />
        </Box>
    )
}

export default EventResultTable;
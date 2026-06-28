import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ReactElement } from "react";
import { useQuery } from "@apollo/client";
import { apolloLibraryClient } from "../../../../../services/apollo/client/ApolloLibraryService";
import { QUERY_READING } from "../../../api/queries";
import { formatDate } from "../../../../../utils/datetime";
import DataGrid from "../../../../../components/table/DataGrid";


interface ReadingHistoryTableProps {
    itemId: number;
}

const ReadingHistoryTable = (props: ReadingHistoryTableProps): ReactElement => {

    const { data } = useQuery(QUERY_READING, {
        client: apolloLibraryClient,
        variables: {
            params: {
                itemId: props.itemId
            }
        },
        fetchPolicy: "no-cache",
    })
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'number', headerName: '#', flex: .5 },
        {
            field: 'startDate',
            headerName: 'Início',
            flex: 1,
            valueFormatter: (value) => {
                if (!value) return '';

                const start = formatDate(value);
                return start;
            },
        },
        { 
            field: 'finishDate', 
            headerName: 'Término', 
            flex: 1,
            valueFormatter: (value) => {
                if (!value) return '';

                const start = formatDate(value);
                return start;
            },
        },
        { field: 'statusName', headerName: 'Status', flex: 1 },
    ]
    return (
        <Box sx={{ me: 5 }}>
            <DataGrid
                columns={columns}
                data={data?.getReadings?.readings}
                columnVisibilityModel={{
                    id: false
                }}
            />
        </Box>
    )
}

export default ReadingHistoryTable;
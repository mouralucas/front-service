import { ReactElement } from "react"
import DataGridComp from "../../../../components/table/DataGridV2"
import { Box, IconButton } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client"
import { apolloLibraryClient } from '../../../../services/apollo/client/ApolloLibraryService';

const PublisherTable = (): ReactElement => {
    const { data: publishersDate, loading: pubishersLoading, refetch: publishersRefetch} = useQuery(QUERY_PUBLISHER, 
        client: 
    )

    const columns: GridColDef[] = [
        { field: "publisherId", headerName: "Id"},
        { field: "publisherName", headerName: "Nome", flex: 2 }, 
        { field: "description", headerName: "Descrição", flex: 1 },
        { field: "countryName", headerName: "País", flex: 1 }
    ]


    return (<></>)
}

export default PublisherTable;
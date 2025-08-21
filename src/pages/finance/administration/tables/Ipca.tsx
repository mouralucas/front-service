import { ReactElement, useState, useEffect } from "react";
import DataGridComp from "../../../../components/table/DataGridV2";
import { Box } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import { Ipca } from "../../../../interfaces/Finance";


const IpcaTable = (): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [ipcaData, setIpcaData] = useState<Ipca[]>([])

    const columns: GridColDef<Ipca>[] = [
        { field: 'id', headerName: 'ID', flex: 1},
        { field: 'period', headerName: 'Período', flex: 1 },
        { field: 'value', headerName: 'Valor (%)', flex: 1, type: 'number' },
        { field: 'periodicity', headerName: 'Periodicidade', flex: 1 }
    ]

    return (
        <Box sx={{display: 'block'}}>
            <DataGridComp
                columns={columns}
                data={ipcaData}
                isLoading={isLoading}
                getRowId={(row) => row.id}
            />
        </Box>
    )
}

export default IpcaTable;
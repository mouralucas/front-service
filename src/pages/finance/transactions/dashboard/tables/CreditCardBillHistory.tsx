import {ReactElement} from "react";
import DataGrid from "../../../../../components/table/DataGrid";
import {DataGridColumn} from "../../../../../assets/core/components/Interfaces.tsx";


const App = (): ReactElement => {


    const columns: DataGridColumn[] = [
        {
            dataField: "name",
            caption: "Name",
            dataType: "string",
        }
    ]


    return (
        <DataGrid
            keyExpr={'tabelaId'}
            data={[]}
            columns={columns}
        />
    )
}

export default App;
import {ReactElement, useCallback, useState} from "react";
import DataGrid from '../components/table/DataGrid'
import {Button as Btn} from "devextreme-react/data-grid";
import Drawer from "../components/Drawer.tsx";


const App = (): ReactElement => {
    const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);

    const onOpenDrawerClick = useCallback(() => {
        setIsDrawerOpened(!isDrawerOpened);
    }, [isDrawerOpened]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <DataGrid
                        keyExpr={'id'}
                        data={[
                            {
                                id: '1',
                                name: 'Test 1',
                            },
                            {
                                id: '2',
                                name: 'Teste 2'
                            }
                        ]}
                        columns={[
                            {
                                dataField: 'id',
                                caption: 'ID',
                                dataType: 'string'
                            },
                            {
                                dataField: 'name',
                                caption: 'Nome',
                                dataType: 'string'
                            },
                            {
                                caption: 'Ações',
                                type: 'buttons',
                                width: 110,
                                child: [
                                    <Btn
                                        key={1}
                                        text="Editar"
                                        // icon="/url/to/my/icon.ico"
                                        icon="edit"
                                        hint="Abrir Drawer"
                                        onClick={onOpenDrawerClick}
                                    />
                                ]
                            }
                        ]}
                    />
                    <Drawer isOpened={isDrawerOpened} changePanelOpened={onOpenDrawerClick} />
                </div>
            </div>
        </div>
    )
}

export default App;
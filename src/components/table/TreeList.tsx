import {ReactElement} from "react";
import TreeList, {Column, ColumnChooser, HeaderFilter, Item, SearchPanel,} from 'devextreme-react/tree-list';
import {Format, Pager, Paging, Toolbar} from "devextreme-react/data-grid";


interface TreeListProps {
    tableColumns: any[],
    dataSource: any[],
    keyExpr: string,
    parentIdExpr: string,
    toolBar?: any,
    toolBarItems?: any[],
    toolBarRefresh?: boolean,
    loadPanel?: boolean
    pager?: any,
    allowedPageSizes?: any,
    displayMode?: any,
    infoText?: any
}

const pageSizes = [10, 15, 20, 50, 100];
// const exportFormats = ['pdf', 'xlsx'];
const expandedKeys: number[] = [];
const selectedKeys: number[] = [95];

const App = (props: TreeListProps): JSX.Element => {



    const setColumns = () => {
        if (!props.tableColumns) {
            return null
        } else {
            const columns_list: ReactElement[] = [];
            props.tableColumns.forEach(function (column, index) {
                columns_list.push(
                    <Column
                        key={index}
                        type={column.type ?? null}
                        dataField={column.dataField}
                        caption={column.caption}
                        dataType={column.dataType}
                        format={column.format}
                        alignment={column.alignment ?? 'center'}
                        width={column.width ?? null}
                        visible={column.visible ?? true}
                        // cellTemplate={column.cellTemplate ?? null}
                        customizeText={column.customizeText ?? null}
                        calculateCellValue={column.calculateCellValue}
                        cellRender={column.cellRender ?? null}
                    >
                        {column.child}
                        {column.format && <Format type="currency" precision={5}/>}
                    </Column>
                )
            });

            return columns_list
        }
    }

    const setPager = (): JSX.Element | null => {
        let pager;
        // TODO: set the props pager
        if (props.pager) {
            pager = null;
        } else {
            pager = <Pager
                visible={true}
                allowedPageSizes={props.allowedPageSizes ?? pageSizes}
                displayMode={props.displayMode ?? 'full'}
                showPageSizeSelector={true}
                showInfo={true}
                infoText={props.infoText ?? null}
                showNavigationButtons={true}
            />;
        }
        return pager
    }

    const setToolbar = () => {
        const listToolBar: ReactElement[] = [];

        if (props.toolBarItems) {
            props.toolBarItems.forEach(function (item, index) {
                listToolBar.push(
                    <Item key={index} name={item.name ?? null}
                          location={item.location ?? ''}>{item.child ?? null}</Item>
                )
            });
        }
        return listToolBar
    }

    return (
        <>
            <TreeList
                dataSource={props.dataSource}
                showBorders={true}
                showRowLines={true}
                showColumnLines={true}
                columnAutoWidth={true}
                wordWrapEnabled={true}
                defaultExpandedRowKeys={expandedKeys}
                defaultSelectedRowKeys={selectedKeys}
                keyExpr={props.keyExpr}
                parentIdExpr={props.parentIdExpr}
                id="tasks"
                rowAlternationEnabled={true}
            >
                <SearchPanel visible={true} width={250}/>
                <HeaderFilter visible={true}/>
                {/*<Selection mode="multiple"/>*/}
                <ColumnChooser enabled={true}/>

                {setColumns()}

                <Toolbar visible={props.toolBar}>
                    {setToolbar()}
                </Toolbar>

                {/* Page elements */}
                {setPager()}
                <Paging defaultPageSize={10}/>;

            </TreeList>
        </>
    )
}

export default App;
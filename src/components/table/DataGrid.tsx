import {ReactElement} from "react";
import DataGrid, {Column, ColumnChooser, Format, Grouping, GroupPanel,
    HeaderFilter, LoadPanel, Pager, Paging, SearchPanel, Summary, Toolbar, TotalItem, Export} from 'devextreme-react/data-grid';
import {Item} from "devextreme-react/box";
import {FilterRow} from "devextreme-react/gantt";
import '../../assets/core/components/table.css'
import {DataGridColumn, DataGridToolBarItem} from "../../assets/core/components/Interfaces";


const pageSizes: number[] = [10, 15, 25, 50, 100];

// const exportFormats: string[] = ['pdf', 'xlsx'];

interface DataGridProps {
    data: any
    keyExpr: string
    columns: DataGridColumn[]
    allowedPageSizes?: number[]
    allowColumnReordering?: boolean
    rowAlternationEnabled?: boolean
    showBorders?: boolean
    showRowLines?: boolean
    showColumnLines?: boolean
    pagerDisplayMode?: string
    pager?: {
        enabled: boolean;
    }
    paging?: {
        enabled: boolean;
        pageSize: number;
    }
    export?: {
        enabled: boolean;
    }
    pagerInfoText?: string
    showPagerInfo?: boolean
    showPagerNavButtons?: boolean
    showPageSizeSelector?: boolean
    columnChooser?: {
        enabled: boolean
    }
    showFilterRow?: boolean
    showHeaderFilter?: boolean
    showLoadPanel?: boolean
    focusedRowEnabled?: boolean
    groupPanel?: {
        visible: boolean
    }
    searchPanel?: {
        visible?: boolean,
        highlightCaseSensitive?: boolean
    }
    toolBar?: {
        visible?: boolean
        items?: DataGridToolBarItem[]
    }
    summary?: {
        column: any
        type?: string
        displayFormat?: any
    }
}

const App = (props: DataGridProps): ReactElement => {
    const setColumns = (): ReactElement[] => {
            const columns_list: ReactElement[] = [];
            props.columns.forEach(function (column: DataGridColumn, index: number) {
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
                        cellTemplate={column.cellTemplate}
                        customizeText={column.customizeText ?? null}
                        calculateCellValue={column.calculateCellValue}
                        cellRender={column.cellRender ?? null}
                        groupIndex={column.groupIndex ?? null}
                    >
                        {column.child}
                        {column.format && <Format type="currency" precision={5}/>}
                    </Column>
                )
            });

            return columns_list;
    }

    const setPager = (): ReactElement => {
        return <Pager
            visible={props.pager?.enabled ?? true}
            allowedPageSizes={props.allowedPageSizes ?? pageSizes}
            displayMode={props.pagerDisplayMode ?? 'full'}
            showPageSizeSelector={props.showPageSizeSelector ?? true}
            showInfo={props.showPagerInfo ?? true}
            infoText={props.pagerInfoText ?? null}
            showNavigationButtons={props.showPagerNavButtons ?? true}
        />;
    }

    const setPaging = (): ReactElement | null => {
        return <Paging
            enabled={props.paging?.enabled ?? true}
            defaultPageSize={props.paging?.pageSize ?? 10}
        />;
    }

    const setColumnChooser = (): ReactElement | null => {
        return <ColumnChooser
            enabled={props.columnChooser?.enabled ?? true}
            mode="dragAndDrop"
        />;
    }

    const setToolbar = (): ReactElement[] | null => {
        const lista_toolbar: ReactElement[] | null = [];
        if (props.toolBar?.items) {
            props.toolBar?.items?.forEach(function (item: any, index: number) {
                const propsItem = {
                    key: index,
                    name: item.name,
                    location: item.location
                }
                lista_toolbar.push(
                    <Item {...propsItem}>{item.child ?? null}</Item>
                )
            });
        }
        return lista_toolbar
    }

    const setExport = (): ReactElement => {
        return <Export
            enabled={props.export?.enabled ?? false}
        />
    }

    const setSummary = (): ReactElement => {
        if (props.summary) {
            return <Summary>
                <TotalItem
                    column={props.summary.column}
                    summaryType={props.summary.type ?? "sum"} // O tipo de resumo, você pode usar "sum", "avg", "count", etc.
                    displayFormat={props.summary.displayFormat ?? "Total: {0}"} // O formato de exibição do valor total
                />
            </Summary>
        } else {
            return <></>
        }
    }

    return (
        <>
            <DataGrid
                keyExpr={props.keyExpr}
                dataSource={props.data}
                allowColumnReordering={props.allowColumnReordering ?? true}
                rowAlternationEnabled={props.rowAlternationEnabled ?? true}
                showBorders={props.showBorders ?? true}
                // onContentReady={onContentReady}
                showRowLines={props.showRowLines ?? true}
                showColumnLines={props.showColumnLines ?? true}
                // onExporting={onExporting}
                // columnHidingEnabled={props.columnHidingEnabled ?? true}
                focusedRowEnabled={props.focusedRowEnabled ?? false}
                // onRowPrepared={}
            >

                <GroupPanel visible={props.groupPanel?.visible ?? false}/>
                <SearchPanel visible={props.searchPanel?.visible ?? false} highlightCaseSensitive={props.searchPanel?.highlightCaseSensitive ?? true}/>
                <FilterRow visible={props.showFilterRow ?? false}/>
                <Grouping autoExpandAll={false}/>
                <HeaderFilter visible={props.showHeaderFilter ?? false}/>

                <LoadPanel enabled={props.showLoadPanel ?? false}/>

                {setColumns()}
                {setSummary()}
                {setColumnChooser()}


                {/* Page elements */}
                {setPager()}
                {setPaging()}

                {/* Toolbar elements */}
                {setExport()}

                {props.toolBar &&
                    <Toolbar visible={props.toolBar.visible}>
                        {setToolbar()}
                    </Toolbar>
                }
            </DataGrid>
        </>
    )
}

export default App;
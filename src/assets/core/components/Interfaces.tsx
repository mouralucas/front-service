export interface DataGridColumn {
    key?: string
    dataField?: any
    dataType?: any
    caption?: string | undefined
    type?: string | undefined
    format?: any | undefined
    alignment?: string | undefined
    width?: number | undefined
    visible?: boolean | undefined
    cellTemplate?: any | undefined
    customizeText?: any | undefined
    calculateCellValue?: any | undefined
    cellRender?: any | undefined
    groupIndex?: any | undefined
    child?: any | undefined
}

export interface DataGridToolBarItem {
    index?: any
    name?: string
    location?: string
    child?: any
    locateInMenu?: string
}
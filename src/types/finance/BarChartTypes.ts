export interface BarChartReferenceLine {
    value: number | number | Date;
    label: string;
    labelAlign?: 'end' | 'middle' | 'start'
}

export interface BarChartSeries {
    data: number[];
    label: string;
    id: string;
    stack: string;
}
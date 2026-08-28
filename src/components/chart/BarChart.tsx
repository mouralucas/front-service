import Box from '@mui/material/Box';
import { ChartsReferenceLine } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import { BarChartSeries, BarChartReferenceLine } from '../../types/finance/BarChartTypes';

interface BarChartProps {
    data: any[];
    serie: any[];
    referenceLine?: BarChartReferenceLine[];
}

export default function StackedBarChart(props: BarChartProps) {
    const stacked = buildBillStackedSeries(props.data)

    return (
        <Box sx={{ width: '100%', height: 300 }}>
            <BarChart
                series={stacked}
                xAxis={[{ data: props.serie, height: 28 }]}
                yAxis={[{ width: 50 }]}
            >
                {props.referenceLine?.map((line, index) => (
                    <ChartsReferenceLine
                        key={`${line.label}-${index}`}
                        y={line.value}
                        label={line.label}
                        labelStyle={{
                            fill: 'red',
                            fontSize: 12,
                            fontWeight: 600,
                        }}
                        lineStyle={{
                            stroke: 'red',
                            strokeWidth: 2,
                            strokeDasharray: '4 4',
                        }}
                        labelAlign={line.labelAlign}
                    />
                ))}
            </BarChart>
        </Box>
    );
}


/**
 * Builds the stacked bar-series configuration from period-based data rows.
 * Each property other than "period" becomes a stacked series, preserving the
 * original order of the rows for the chart values.
 *
 * @param data Array of objects containing the chart values grouped by period.
 * @returns Array of bar series ready to be consumed by MUI BarChart.
 */
function buildBillStackedSeries(
    data: any[]
): BarChartSeries[] {
    if (!data || !data.length) {
        return []
    }

    const keys = Object.keys(data[0]).filter(
        key => key !== "period"
    )

    return keys.map(key => ({
        data: data.map(item => item[key]),
        label: key,
        id: key,
        stack: "total",
    }))
} 
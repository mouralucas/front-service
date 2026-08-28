import Box from '@mui/material/Box';
import { LineChart as Line } from '@mui/x-charts/LineChart';

const margin = { right: 24 };

interface LineChartProps {
    series: any[];
    loading?: boolean;
    xAxis: xAxisProps;
    yAxis: yAxisProps;
}

interface xAxisProps {
    data: any[]
    scaleType?: any;
    height?: any
}

interface yAxisProps {
    label?: string 
}

export default function LineChart(props: LineChartProps) {
    return (
        <Box sx={{ width: '100%', height: 300 }}>
            <Line
                series={props.series}
                xAxis={[
                    { 
                        data: props.xAxis.data,
                        scaleType: 'point', 
                        height: 28 
                    }]}
                yAxis={[
                    { 
                        label: props.yAxis.label || "",
                        width: 50, 
                        sx: {
                            mt: 5
                        }
                    }]}
                margin={margin}
                loading={props.loading || false}
            />
        </Box>
    );
}
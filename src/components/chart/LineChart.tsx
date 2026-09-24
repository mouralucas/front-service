import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { LineChart as Line } from '@mui/x-charts/LineChart';

const margin = { right: 24 };

interface LineChartProps {
    series: any[];
    loading?: boolean;
    xAxis: xAxisProps;
    yAxis: yAxisProps;
    title?: string;
    subtitle?: string
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
            {props.title &&
                <Typography variant="h2" sx={{ mb: 1, alignContent: "center" }} textAlign={"center"}>
                    {props.title}
                </Typography>
            }
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
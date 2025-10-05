import { Box, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { ReactElement } from 'react';

const margin = { right: 24 };
interface LineChartProps {
  xLabels: any
  series: any
  title?: string
  subtitle?: string
  customAxisTooltip?: any
}

const  Chart = (props: LineChartProps): ReactElement => {
  return (
    <Box>
      <Typography variant="h6" align="center">
        {props.title}
      </Typography>
      <Typography variant="subtitle2" align="center" color="text.secondary">
        {props.subtitle}
      </Typography>
      <LineChart
        height={300}
        series={props.series ?? []}
        xAxis={[{ scaleType: 'point', data: props.xLabels ?? []}]}
        yAxis={[{ width: 50 }]}
        margin={margin}
        slots={{ tooltip: props.customAxisTooltip }}
        slotProps={{ tooltip: { trigger: 'axis' } }}
      />
    </Box>
  );
}

export default Chart;
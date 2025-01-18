import {ArgumentAxis, Chart, CommonSeriesSettings, Export, Grid, Legend, Margin, Point, Series, Subtitle, Title, Tooltip,} from 'devextreme-react/chart';
import {ReactElement} from "react";

interface LineChartProps {
    id: string
    data: any[] | undefined
    series: any[] | undefined
    argumentField: string
    title: string
    subtitle?: string
    type?: string
    toolTip?: {
        enabled: boolean,
        shared?: boolean,
        zIndex?: number,
        customizeTooltip?: any
        contentRender?: any
    }
}

const App = (props: LineChartProps) => {

    const setToolTip = (): ReactElement => {
        let toolTip;

        if (!props.toolTip) {
            toolTip = <></>
        } else {
            toolTip =
                <Tooltip
                    enabled={props.toolTip?.enabled || false}
                    shared={!!props.toolTip.shared}
                    zIndex={props.toolTip?.zIndex || 1}
                    customizeTooltip={!!props.toolTip?.customizeTooltip}
                    contentRender={props.toolTip?.contentRender || null}
                />
        }

        return toolTip
    }

    return (
        <Chart
            id={props.id}
            palette={"Pastel"}
            dataSource={props.data}
        >

            <CommonSeriesSettings
                argumentField={props.argumentField}
                type={props.type || 'line'}
            />
            {
                props.series?.map((item) =>
                    <Series
                        key={item.value}
                        valueField={item.value}
                        name={item.name}
                    >
                        <Point visible={false} hoverMode={'includePoints'}/>
                    </Series>
                )
            }
            <Margin bottom={20}/>
            <ArgumentAxis
                valueMarginsEnabled={false}
                discreteAxisDivisionMode="crossLabels"
                argumentType={'string'}
            >
                <Grid visible={false}/>
            </ArgumentAxis>
            <Legend
                verticalAlignment="bottom"
                horizontalAlignment="center"
                itemTextPosition="bottom"
            />
            <Export enabled={true}/>
            <Title text={props.title}>
                {props.subtitle ? <Subtitle text={props.subtitle}/> : <></>}
            </Title>
            {setToolTip()}
        </Chart>
    )
}

export default App;
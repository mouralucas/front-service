interface PieCharProps {
    data: any[],
    title: string
    axis: any
    palette?: string[]
    type?: any

    legend?: {
        visible: boolean;
        orientation?: string;
        verticalAlignment?: string;
        horizontalAlignment?: string;
        itemTextPosition?: string;
    }

    tooltip?: {
        enabled: boolean;
        format?: string;
        customizeTooltip?: any;
    }

    exportEnabled?: boolean
    onPointClick?: any
}

const App = (props: PieCharProps) => {
    const formatText = (arg: { value: any; argumentText: any; percentText: any; }) => {
        const value = Number(arg.value).toFixed(2)

        return `${arg.argumentText}: ${value} (${arg.percentText})`;
    }

    const toolTipFunc =(info: any) => {
        return {text: `${info.argumentText}: (${info.percentText})`}
    }

    return (
        <PieChart
            id="pie"
            dataSource={props.data}
            palette={props.palette ?? 'Pastel'}
            title={props.title}
            type={props.type ?? 'pie'}
            resolveLabelOverlapping={'shift'}
            onPointClick={props.onPointClick ?? undefined}
        >
            <Series
                argumentField={props.axis.argumentField}
                valueField={props.axis.valueField}
            >
                <Label visible={false} customizeText={formatText}/>
            </Series>
            <Margin bottom={20}/>
            <Export enabled={props.exportEnabled ?? false}/>
            <Legend
                visible={props.legend?.visible ?? false}
                orientation={props.legend?.orientation ?? 'horizontal'}
                verticalAlignment={props.legend?.verticalAlignment ?? "bottom"}
                horizontalAlignment={props.legend?.horizontalAlignment ?? "center"}
                itemTextPosition={props.legend?.itemTextPosition ?? "right"}
            />
            <Tooltip
                enabled={props.tooltip?.enabled ?? false}
                format={props.tooltip?.format ?? "fixedPoint"}
                customizeTooltip={props.tooltip?.customizeTooltip ?? toolTipFunc}
            />
            <Animation enabled={true}/>
        </PieChart>
    );
}

export default App;
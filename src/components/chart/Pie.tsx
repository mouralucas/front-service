import PieChart, {Animation, Export, Label, Legend, Margin, Series} from 'devextreme-react/pie-chart';
import {Tooltip} from "devextreme-react/chart";

interface PieCharProps {
    data: any[],
    title: string
    axis: any
    palette?: string[]
    type?: any

    legend?: {
        show: boolean;
        orientation?: string;
        verticalAlignment?: string;
        horizontalAlignment?: string;
        itemTextPosition?: string;
    }

    tooltip?: {
        show: boolean;
        format?: string;
        customizeTooltip?: any;
    }

    exportEnabled?: boolean
    onPointClick?: any
}

const App = (props: PieCharProps) => {
    const formatText = (arg: { value: any; argumentText: any; percentText: any; }) => {
        // let value =  (Math.round(arg.value * 100) / 100).toFixed(2)
        let value = Number(arg.value).toFixed(2)

        return `${arg.argumentText}: ${value} (${arg.percentText})`;
    }

    // const handlePointClick = (e: any) => {
    //     const sliceData = e.target.originalArgument;
    //     // Make a backend call to get details based on sliceData
    //     // Assume you have the details in response.data
    //     const response = {}; // Your backend response here
    //     // setSliceDetails(response.data);
    //     // setModalIsOpen(true);
    // };

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
                visible={props.legend?.show ?? false}
                orientation={props.legend?.orientation ?? 'horizontal'}
                verticalAlignment={props.legend?.verticalAlignment ?? "bottom"}
                horizontalAlignment={props.legend?.horizontalAlignment ?? "center"}
                itemTextPosition={props.legend?.itemTextPosition ?? "right"}
            />
            <Tooltip
                enabled={props.tooltip?.show ?? false}
                format={props.tooltip?.format ?? "fixedPoint"}
                customizeTooltip={props.tooltip?.customizeTooltip ?? toolTipFunc}
            />
            <Animation enabled={true}/>
        </PieChart>
    );
}

export default App;
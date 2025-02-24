import BarChart from '../../../../../components/chart/Bar.tsx'
import {getFinanceData} from "../../../../../services/axios/Get.tsx";
import {URL_FINANCE_CREDIT_CARD_BILL_EVOLUTION} from "../../../../../services/axios/ApiUrls.tsx";
import {CreditCardBillConsolidatedResponse} from '../../../../../interfaces/FinanceRequest.tsx';
import {useEffect, useState} from "react";
import {CreditCardBill} from '../../../../../interfaces/Finance.tsx';
import {toast} from "react-toastify";
import {RangeSelector} from "devextreme-react";
import {Behavior, Scale} from "devextreme-react/range-selector";

// This interface should be here?
interface PeriodRangeSelector {
    date: Date;
    value: string;
}

const CreditCardBillEvolution = () => {
    const [creditCardBillEvolution, setCreditCardBillEvolution] = useState<CreditCardBill[]>([])
    const [expenseAvg, setExpenseAvg] = useState<number>(0)
    const [expenseGoal, setExpenseGoal] = useState<number>(0)

    // Variables for the bill history range selector
    const [acceptedYearRangeValues, setAcceptedYearRangeValues] = useState<PeriodRangeSelector[] | null>(null);
    const [selectedBillHistoryRange, setSelectedBillHistoryRange] = useState<[Date, Date]>()

    useEffect(() => {
        getCreditCardBillEvolution(202401, 202412);
    }, []);

    const getCreditCardBillEvolution = (startAt: number, endAt: number) => {
        getFinanceData(URL_FINANCE_CREDIT_CARD_BILL_EVOLUTION, {
            'startPeriod': startAt,
            'endPeriod': endAt,
        }).then((response: CreditCardBillConsolidatedResponse) => {
            const options = response.bill.map((i: CreditCardBill) =>
                (
                    {
                        period: i.period,
                        totalAmount: i.totalAmount
                    }
                )
            );
            setCreditCardBillEvolution(options);


            const period_range = response.periodRange.map((period: any) => ({
                date: new Date(Math.floor(period / 100), (period % 100) - 1, 1),
                value: period,
            }));

            // Only set accepted range when not available yet
            if (acceptedYearRangeValues == null) {
                setAcceptedYearRangeValues(period_range);
            }

            const sd = new Date(Math.floor(startAt / 100), (startAt % 100) - 1, 1)
            const ed = new Date(Math.floor(endAt / 100), (endAt % 100) - 1, 1)
            setSelectedBillHistoryRange([sd, ed])

            setExpenseGoal(response.goal);
            setExpenseAvg(response.average);
        }).catch((err: string) => {
                toast.error('Houve um erro ao buscar o histórico de faturas' + err)
            }
        );
    }

    const valueAxisLabel = (arg: any) => {
        return `R$ ${arg.valueText}`;
    }

    const customizePoint = (arg: { value: number; }) => {
        if (arg.value < expenseGoal) {
            return {color: '#77dd77', hoverStyle: {color: '#77dd77'}};
        } else if (arg.value >= expenseGoal && arg.value <= expenseAvg) {
            return {color: '#fdfd96', hoverStyle: {color: '#fdfd96'}}
        } else if (arg.value > expenseAvg) {
            return {color: '#ff6961', hoverStyle: {color: '#ff6961'}};
        }
        return null;
    }

    const onHandleMove = (e: any) => {
        const startDate = e.value[0];
        const startMonth = startDate.getUTCMonth() + 1;
        const startYear = startDate.getUTCFullYear();

        const startPeriod = startYear * 100 + startMonth;

        const endDate = e.value[1];
        const endMonth = endDate.getUTCMonth() + 1;
        const endYear = endDate.getUTCFullYear();

        const endPeriod = endYear * 100 + endMonth;

        setSelectedBillHistoryRange([startDate, endDate])
        getCreditCardBillEvolution(startPeriod, endPeriod);
    }

    function customizeTooltip(pointInfo: any) {
        return {
            html:
                `<div>
                    <div class="tooltip-header">
                        ${pointInfo.argumentText}
                    </div>
                    <div class="tooltip-body"><div class="series-name">
                        <span class='top-series-name'>
                            ${pointInfo.points[0].seriesName}:
                        </span> 
                    </div>
                    <div class="value-text">
                        <span class='top-series-value'>
                            R$ ${pointInfo.points[0].valueText}
                        </span>
                    </div>
                </div>`,
        };
    }

    return (
        <>
            <BarChart
                title={"Histórico de faturas"}
                data={creditCardBillEvolution}
                argumentField={'period'}
                valueField={'totalAmount'}
                name={'Faturas'}
                customizePoint={customizePoint}
                argumentAxis={{
                    argumentType: "string"
                }}
                valueAxis={{
                    maxValueMargin: 0.01,
                    name: 'total_amount',
                    label: {
                        customizeText: valueAxisLabel
                    },
                    title: {
                        text: "Valores em reais",
                        font: {
                            color: "#e91e63"
                        }
                    },
                    constantLine: [
                        {
                            value: expenseGoal,
                            width: 2,
                            color: '#8c8cff',
                            dashStyle: "dash",
                            label: {
                                text: 'Meta'
                            }
                        },
                        {
                            value: expenseAvg,
                            width: 2,
                            color: '#8c8cff',
                            dashStyle: "dash",
                            label: {
                                text: 'Média'
                            }
                        },
                        // Add more constant lines as needed
                    ]
                }}
                toolTip={{
                    enabled: true,
                    customizeTooltip: customizeTooltip
                }}
            ></BarChart>
            <RangeSelector
                dataSource={acceptedYearRangeValues}
                dataSourceField={'date'}
                onValueChanged={onHandleMove}
                defaultValue={selectedBillHistoryRange}
                // scale={{ valueType: 'datetime', tickInterval: { months: 1 } }}
                // behavior={{ snapToTicks: true }}
            >
                <Scale tickInterval={'year'} minorTickInterval={'month'} valueType={'period'}>
                    {/*<Label>*/}
                    {/*    <Format type={"decimal"}/>*/}
                    {/*</Label>*/}
                </Scale>
                <Behavior callValueChanged="onHandleMove"/>
            </RangeSelector>
        </>
    )
}

export default CreditCardBillEvolution;
import BarChart from '../../../../../components/chart/StackedBar.tsx'
import {getFinanceData} from "../../../../../services/axios/Get.tsx";
import {URL_FINANCE_CREDIT_CARD_BILL_EVOLUTION} from "../../../../../services/axios/ApiUrls.tsx";
import {useEffect, useState} from "react";
import {CreditCardBill} from '../../../../../interfaces/Finance.tsx';
import {toast} from "react-toastify";
import DatePicker from "react-datepicker";
import {getLastPeriods, getPeriodFromDate} from "../../../../../utils/datetime.tsx";
import {ptBR} from 'date-fns/locale';

const CreditCardBillEvolution = () => {
    const [creditCardBillEvolution, setCreditCardBillEvolution] = useState<CreditCardBill[]>([])
    const [dataSeries, setDataSeries] = useState<any[]>([])
    const [expenseAvg, setExpenseAvg] = useState<number>(0)
    const [expenseGoal, setExpenseGoal] = useState<number>(0)

    const [dateRange, setDateRange] = useState<any>([]);
    const [startDate, endDate] = dateRange;

    useEffect(() => {
        setDateRange(getLastPeriods())
        updateDateRange(getLastPeriods())
    }, []);

    const updateDateRange = (dates: any) => {
        if (dates[1] !== null) {
            getCreditCardBillEvolution(getPeriodFromDate(dates[0]), getPeriodFromDate(dates[1]));
        }
    }

    const getCreditCardBillEvolution = (startAt: number, endAt: number) => {
        getFinanceData(URL_FINANCE_CREDIT_CARD_BILL_EVOLUTION, {
            'startPeriod': startAt,
            'endPeriod': endAt,
        }).then((response: any) => {
            const formattedData = response.outro.map((item: any) => {
                const newItem: any = {period: item.period};
                Object.keys(item).forEach((key) => {
                    if (key !== "period") {
                        newItem[key] = item[key] ? parseFloat(item[key]) : 0;
                    }
                });
                return newItem;
            });

            console.log(formattedData);
            setCreditCardBillEvolution(formattedData);
            setDataSeries(response.series)
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

    function customizeTooltip(pointInfo: any) {
        const period: string = pointInfo.point.data.period
        const series: string = pointInfo.points.map(
            (p: { seriesName: any; valueText: any; }) =>
                `<b>${p.seriesName}</b>: R$ ${parseFloat(p.valueText).toFixed(2)}`
        ).join('<br/>')

        const formattedString = `<b>Período</b> ${period}<br/>${series}`
        return {
            text: formattedString,
        };
    }

    return (
        <>
            <div className="row mb-3">
                <div className="col-4"></div>
                <div className="col-4">
                </div>
                <div className="col-4">
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                            updateDateRange(update);
                            setDateRange(update);
                        }}
                        showMonthYearPicker
                        dateFormat={'MMM/yyyy'}
                        locale={ptBR}
                        className={'form-control'}
                    />
                </div>
            </div>
            <BarChart
                title={"Histórico de faturas"}
                data={creditCardBillEvolution}
                argumentField={'period'}
                // valueField={'totalAmount'}
                name={'Faturas'}
                // customizePoint={customizePoint}
                argumentAxis={{
                    argumentType: "string"
                }}
                series={dataSeries}
                valueAxis={{
                    maxValueMargin: 0.01,
                    name: 'totalAmount',
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
            />
        </>
    )
}

export default CreditCardBillEvolution;
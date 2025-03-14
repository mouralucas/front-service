import BarChart from '../../../../../components/chart/Bar.tsx'
import {getFinanceData} from "../../../../../services/axios/Get.tsx";
import {URL_FINANCE_CREDIT_CARD_BILL_EVOLUTION} from "../../../../../services/axios/ApiUrls.tsx";
import {CreditCardBillConsolidatedResponse} from '../../../../../interfaces/FinanceRequest.tsx';
import {useEffect, useState} from "react";
import {CreditCardBill} from '../../../../../interfaces/Finance.tsx';
import {toast} from "react-toastify";
import DatePicker from "react-datepicker";
import {getLastPeriods, getPeriodFromDate} from "../../../../../utils/datetime.tsx";
import { ptBR } from 'date-fns/locale';

const CreditCardBillEvolution = () => {
    const [creditCardBillEvolution, setCreditCardBillEvolution] = useState<CreditCardBill[]>([])
    const [expenseAvg, setExpenseAvg] = useState<number>(0)
    const [expenseGoal, setExpenseGoal] = useState<number>(0)

    const [dateRange, setDateRange] = useState<any>([]);
    const [startDate, endDate] = dateRange;

    useEffect(() => {
        setDateRange(getLastPeriods())
        updateDateRange(getLastPeriods())
    }, []);

    // useEffect(() => {
    //     if (!dateRange) {
    //         setDateRange(getLastPeriods())
    //     }
    //
    // }, [endDate, startDate]);

    const updateDateRange = (dates: any) => {
        console.log(dates);
        if (dates[1] !== null) {
            getCreditCardBillEvolution(getPeriodFromDate(dates[0]), getPeriodFromDate(dates[1]));
        }
    }

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
            <div className="row mb-3">
                <div className="col-4"></div>
                <div className="col-4">
                    {/*<Select*/}
                    {/*    options={periodsRange}*/}
                    {/*    value={periodsRange.find((c: any) => c.value === filters.selectedPeriod)}*/}
                    {/*    placeholder={'Selecione'}*/}
                    {/*    onChange={(val: any) => setFilters(prev => ({...prev, selectedPeriod: val.value}))}*/}
                    {/*/>*/}
                </div>
                <div className="col-4">
                    {/*<Select*/}
                    {/*    options={indexers}*/}
                    {/*    value={indexers.find((c: any) => c.value === filters.selectedIndexer)}*/}
                    {/*    placeholder={'Selecione'}*/}
                    {/*    onChange={(val: any) => setFilters(prev => ({ ...prev, selectedIndexer: val.value }))}*/}
                    {/*/>*/}
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
            />
        </>
    )
}

export default CreditCardBillEvolution;
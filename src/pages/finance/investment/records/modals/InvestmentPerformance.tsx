import Modal from "../../../../../components/Modal";
import {useEffect, useState} from "react";
import {getFinanceData} from "../../../../../services/axios/Get";
import {URL_FINANCE_INVESTMENT_PERFORMANCE, URL_FINANCE_INVESTMENT_STATEMENT} from "../../../../../services/axios/ApiUrls";
import {GetInvestmentPerformanceResponse, GetInvestmentStatementResponse} from "../../../../../interfaces/FinanceRequest";
import PerformanceChart from '../charts/Performance';
import StatementTable from '../tables/InvestmentStatement';
import {toast, ToastOptions} from "react-toastify";
import Loader from "../../../../../components/Loader.tsx";

interface InvestmentPerformanceProps {
    modalState: boolean;
    hideModal: any;
    investmentId: string;
    investmentName: string;
}


const App = (props: InvestmentPerformanceProps) => {
    const [indexerName, setIndexerName] = useState<string>()
    const [performance, setPerformance] = useState<any>([])
    const [statements, setStatements] = useState<any>([])

    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (props.modalState) {
            getPerformanceData();
            getInvestmentStatement();

            setIsLoading(false);
        }
    }, [props.modalState]);

    const getInvestmentStatement = () => {
        getFinanceData(URL_FINANCE_INVESTMENT_STATEMENT, {investmentId: props.investmentId}).then((response: GetInvestmentStatementResponse) => {
            setStatements(response.statement)
        }).catch(() => {
            toast.error('Erro ao buscar os extratos do investimento')
        })
    }

    const getPerformanceData = () => {
        getFinanceData(URL_FINANCE_INVESTMENT_PERFORMANCE, {
            periodRange: 60,
            investmentId: props.investmentId,
        }).then((response: GetInvestmentPerformanceResponse) => {
            setPerformance(response);
            setIndexerName(response.indexerName);
        }).catch((err: string | ToastOptions) => {
            toast.error(`Houve um erro ao buscar a performance dos investimentos ${err}`)
        })
    }


    const body = isLoading ? <Loader/> :
        <>
            <div className='row'>
                <div className="col-12">
                    <PerformanceChart performance={performance} indexerName={indexerName}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <StatementTable statementList={statements}/>
                </div>
            </div>
        </>

    const footer =
        <>
            <div className="col-9">
            </div>
            <div className="col-3">
                <div className="d-flex flex-nowrap">
                    <button className='btn btn-outline-secondary text-center w-100'
                            onClick={props.hideModal}>Fechar
                    </button>
                </div>
            </div>
        </>

    return (
        <Modal
            showModal={props.modalState}
            hideModal={props.hideModal}
            title={props.investmentName || 'Investimento'}
            body={body}
            footer={footer}
            size={'modal-xl'}
        />
    )
}

export default App;
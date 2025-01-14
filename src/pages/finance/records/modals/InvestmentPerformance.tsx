import Modal from "../../../../components/Modal.tsx";
import {useEffect, useState} from "react";
import {getFinanceData} from "../../../../services/axios/Get.tsx";
import {URL_FINANCE_INVESTMENT_PERFORMANCE} from "../../../../services/axios/ApiUrls.tsx";
import {GetInvestmentPerformanceResponse} from "../../../../interfaces/FinanceRequest.tsx";
import PerformanceChart from '../charts/Performance';
import {toast, ToastOptions} from "react-toastify";

interface InvestmentPerformanceProps {
    modalState: boolean;
    hideModal: any;
    investmentId: string;
}

const App = (props: InvestmentPerformanceProps) => {
    const [performance, setPerformance] = useState<any>([])

    useEffect(() => {
        if (props.modalState) {
            getPerformanceData();
        }

    }, [props.modalState]);

    const getPerformanceData = () => {
        getFinanceData(URL_FINANCE_INVESTMENT_PERFORMANCE, {
            periodRange: 60,
            investmentId: props.investmentId,
        }).then((response: GetInvestmentPerformanceResponse) => {
            setPerformance(response);
        }).catch((err: string | ToastOptions) => {
            toast.error(`Houve um erro ao buscar a performance dos investimentos ${err}`)
        })
    }

    const body =
        <div className='row'>
            <div className="col-12">
                <PerformanceChart performance={performance} />
            </div>
        </div>

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
            title={'Investimento'}
            body={body}
            footer={footer}
        />
    )
}

export default App;
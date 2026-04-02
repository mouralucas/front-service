import { useState } from "react";
import Modal from "../../../../../components/Modal";
import PerformanceChart from '../charts/Performance';
import StatementTable from '../tables/InvestmentStatement';

interface InvestmentPerformanceProps {
    modalState: boolean;
    hideModal: any;
    investmentId: string;
    investmentName: string;
}


const PerformanceModal = (props: InvestmentPerformanceProps) => {
    const [refreshKey, setRefreshKey] = useState<number>(0);

    const handleUpdated = () => {
        setRefreshKey(prev => prev + 1);
    };

    const body =
        <>
            <div className='row'>
                <div className="col-12">
                    <PerformanceChart
                        investmentId={props.investmentId}
                        refreshKey={refreshKey} />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <StatementTable
                        investmentId={props.investmentId}
                        updatePerformanceChart={handleUpdated}
                    />
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

export default PerformanceModal;
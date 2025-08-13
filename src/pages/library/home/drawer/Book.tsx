import { ReactElement, useEffect, useState } from "react";
import DrawerV2 from "../../../../components/DrawerV2.tsx";
import image from '../../../../assets/core/images/no-cover.png'
import { getLibraryData } from "../../../../services/axios/Get.tsx";
import { URL_LIBRARY_READING_STATS } from "../../../../services/axios/ApiUrls.tsx";
import { ReadingStatsResponse } from "../../../../interfaces/LibraryRequest.tsx";
import { ItemReadingStats } from "../../../../interfaces/Library.tsx";
import { toast } from "react-toastify";
import CreateReadingProgressModal from "../modals/CreateReadingProgress.tsx";


interface BookDrawerProps {
    openDrawerState: boolean;
    itemId?: number;
    item?: any;
    onCloseDrawerClick: (e: any) => void;
}

const BookDrawer = (props: BookDrawerProps): ReactElement => {

    const [stats, setStats] = useState<ItemReadingStats>();
    const [crateReadingProgressModalState, setCrateReadingProgressModalState] = useState<boolean>(false)

    useEffect(() => {
        if (props.openDrawerState) {
            getReadingStats();
        }
    }, [props.openDrawerState])

    const showCreateReadingProgressModal = () => {
        setCrateReadingProgressModalState(true);
    }

    const hideCreateReadingProgressModal = () => {
        setCrateReadingProgressModalState(false);
    }

    const getReadingStats = () => {
        getLibraryData(URL_LIBRARY_READING_STATS, { itemId: props.item.itemId }).then((response: ReadingStatsResponse) => {
            setStats(response.stats);
            //setValue('readingId', response.stats?.currentReadingId || '');
            console.log(response);
        }).catch((e: any) => {
            toast.error(`Erro ao buscar estatísticas de leitura: ${e.message}`)
        });
    }

    const startReading = () => {
        // Implementar lógica para iniciar leitura
        toast.info("Iniciar leitura não implementado ainda. Id do item: " + props.item.itemId);
        const submitData = {
            itemId: props.item.itemId,
        }

        // librarySubmit('undefined', URL_READING, submitData, 'post').then(() => {
        //     toast.success("Leitura iniciada com sucesso!");
        //     getReadingStats();
        // }).catch((e: any) => {
        //     toast.error(`Erro ao iniciar leitura: ${e.message}`);
        // });
    }

    const html: ReactElement =
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="custom-toolbar">
                <div className="toolbar-item before">
                    <span className="contact-name">{props.item?.title}</span>
                </div>
                <div className="toolbar-item before">
                    <div className="status-item status-owned">
                        <span>{props.item?.lastStatusName}</span>
                    </div>
                </div>
                <div className="toolbar-item after">

                </div>
                <div className="toolbar-item after">
                    <button className="toolbar-button close-button" onClick={props.onCloseDrawerClick}>
                        ✖
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className='item-cover-view mt-2 ms-2'>
                        <div
                            className={`item-cover`}
                            style={{
                                width: 150,
                                height: 200,
                                maxHeight: 200,
                                backgroundImage: `url(${image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        />
                    </div>
                </div>
                <div className="col-6">
                    <table className={'mt-2 me-2'}>
                        <tr>
                            <th className={'contact-name'}>Título</th>
                        </tr>
                        <tr>
                            <td>
                                <div>{props.item?.title}</div>
                                <div className="fw-light text-muted small">{props.item?.subtitle}</div>
                            </td>
                        </tr>
                    </table>
                    <table className={'mt-2 me-2'}>
                        <tr>
                            <th>
                                <div>
                                    {props.item?.mainAuthorName}
                                    <div className="fw-light text-mutted small">
                                        Owen King; Outro Autor; Mais um ainda
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </table>
                    <table className={'mt-2 me-2'}>
                        <tr>
                            <th className={'contact-name'}>Páginas</th>
                        </tr>
                        <tr>
                            {props.item?.pages}
                        </tr>
                    </table>
                </div>
            </div>
            <div className="ms-2 row">
                <div className="col-3">
                    <table className={'mt-2 me-2'}>
                        <tr>
                            <th className={'contact-name'}>Editora</th>
                        </tr>
                        <tr>
                            {props.item?.publisherName}
                        </tr>
                    </table>
                </div>
                <div className="col-9">
                    <table className={'mt-2 me-2'}>
                        <tr>
                            <th className={'contact-name'}>Série</th>
                        </tr>
                        <tr>
                            {props.item?.serieName}
                        </tr>
                    </table>
                </div>
            </div>
            <hr />
            {/* Reading statistics */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {(stats?.readingsCount !== undefined && stats.readingsCount > 0) ?
                    <>
                        <div className="ms-2 row">
                            <div className="col-6">
                                <table className={'mt-2 me-2'}>
                                    <tr>
                                        <th className={'contact-name'}>Leituras</th>
                                    </tr>
                                    <tr>
                                        {stats?.readingsCount}
                                    </tr>
                                </table>
                            </div>
                            <div className="col-6">
                                <table className={'mt-2 me-2'}>
                                    <tr>
                                        <th className={'contact-name'}>Última leitura</th>
                                    </tr>
                                    <tr>
                                        {stats?.lastReadingDate}
                                    </tr>
                                </table>
                            </div>
                        </div>
                        {(stats?.isCurrentlyReading) &&
                            <>
                                <div className="ms-2 me-2 row">
                                    <div className="col-6">
                                        <table className={'mt-2 me-2'}>
                                            <tr>
                                                <th className={'contact-name'}>Página atual</th>
                                            </tr>
                                            <tr>
                                                {stats?.currentPage}
                                            </tr>
                                        </table>
                                    </div>
                                    <div className="col-6">
                                        <table className={'mt-2 me-2'}>
                                            <tr>
                                                <th className={'contact-name'}>Perc. atual</th>
                                            </tr>
                                            <tr>
                                                {stats?.currentPercentage}
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div className="ms-2 me-2 mt-2 row">
                                    <button className='btn btn-outline-secondary text-center w-100'
                                        onClick={showCreateReadingProgressModal}>Adicionar Progresso
                                    </button>
                                </div>
                            </>
                        }
                    </>
                    :
                    (stats?.readingsCount === 0) ?
                        <>
                            <div className="ms-2 row me-2">
                                <div className="col-12">
                                    <button className='btn btn-outline-secondary text-center w-100'
                                        onClick={startReading}>Iniciar Leitura
                                    </button>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="ms-2 row me-2">
                                <div className="col-12">
                                    <span className="text-muted"><b>Leitura em andamento.</b></span>
                                    <button className='btn btn-outline-secondary text-center w-100'
                                        onClick={startReading}>Nova Leitura
                                    </button>
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>

    return (
        <>
            <DrawerV2
                isOpened={props.openDrawerState}
                changePanelOpened={props.onCloseDrawerClick}
                content={html}
            />
            <CreateReadingProgressModal
                modalState={crateReadingProgressModalState}
                hideCreateReadingProgressModal={hideCreateReadingProgressModal}
                readingId={stats?.currentReadingId || ''}
            />
        </>
    )
}

export default BookDrawer;
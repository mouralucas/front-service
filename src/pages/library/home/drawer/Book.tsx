import { ReactElement, useEffect, useState } from "react";
import '../../../../assets/library/itemDrawer.scss'
import Drawer from "../../../../components/Drawer.tsx";
import image from '../../../../assets/core/images/no-cover.png'
import { getLibraryData } from "../../../../services/axios/Get.tsx";
import { URL_READING_STATS } from "../../../../services/axios/ApiUrls.tsx";
import { ReadingStatsResponse } from "../../../../interfaces/LibraryRequest.tsx";
import { ItemReadingProgress, ItemReadingStats } from "../../../../interfaces/Library.tsx";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';
import DateMaskedInput from "../../../../components/form/DateMaskInput.tsx";
import DatePicker from "react-datepicker";


interface BookDrawerProps {
    openDrawerState: boolean;
    itemId?: number;
    item?: any;
    onCloseDrawerClick: (e: any) => void;
}

const DefaultReadingProgress: ItemReadingProgress = {
    readingId: '',
    progressType: null,
    value: 0,
    date: format(new Date().toDateString(), 'yyyy-MM-dd'),
    rate: 0,
    comment: null
}

const ReadingProgressOptions = [
    { value: 'page', label: 'Página' },
    { value: 'percentage', label: 'Porcentagem' },
]

const BookDrawer = (props: BookDrawerProps): ReactElement => {
    const { handleSubmit, control, reset, formState: { isDirty, dirtyFields, errors }, getValues, setValue } = useForm<ItemReadingProgress>({ defaultValues: DefaultReadingProgress });
    const [stats, setStats] = useState<ItemReadingStats>();

    useEffect(() => {
        if (props.openDrawerState) {
            getReadingStats();
        }
    }, [props.openDrawerState])

    const getReadingStats = () => {
        getLibraryData(URL_READING_STATS, { itemId: props.item.itemId }).then((response: ReadingStatsResponse) => {
            setStats(response.stats);
            setValue('readingId', response.stats?.currentReadingId || '');
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

    const submitReadingProgress = (data: ItemReadingProgress, e: BaseSyntheticEvent<object> | undefined) => {
        toast.info("Progresso enviado")
        console.log(data);
        console.log(e);
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
                                <div className="ms-2 row">
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
                                <form onSubmit={handleSubmit(submitReadingProgress)}>
                                    <div className="row ms-2 me-2">
                                        <div className="col-6">
                                            <Controller
                                                name={'readingId'}
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <input
                                                        type={"hidden"}
                                                        {...field}
                                                        className="form-control input-default"
                                                    />
                                                )}
                                            />
                                            <Controller
                                                name={'progressType'}
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={ReadingProgressOptions}
                                                        value={ReadingProgressOptions.find((c: any) => c.value === field.value)}
                                                        onChange={(e: any) => field.onChange(e?.value)}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Controller
                                                name={'value'}
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <input
                                                        type={"text"}
                                                        {...field}
                                                        className="form-control input-default"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="row me-2 ms-2">
                                        <div className="col-6">
                                            <label htmlFor="">Data</label>
                                            <Controller
                                                name={'date'}
                                                control={control}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        selected={parseISO(field.value)}
                                                        onChange={(date) => {
                                                            field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                                        }}
                                                        dateFormat="dd/MM/yyyy" // Exibe no formato brasileiro
                                                        className="form-control"
                                                        placeholderText="Selecione uma data"
                                                        customInput={
                                                            <DateMaskedInput
                                                                placeholder="dd/mm/aaaa"
                                                                className={`form-control ${errors.date ? "input-error" : ""}`}
                                                            />
                                                        }
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="">Nota</label>
                                            <Controller
                                                name={'rate'}
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <input
                                                        type={"number"}
                                                        {...field}
                                                        className="form-control input-default"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="row me-2 ms-2">
                                        <div className="col-12">
                                            <label htmlFor="">Comentário</label>
                                            <Controller name={'comment'}
                                                control={control}
                                                rules={{ required: false }}
                                                render={({ field }) => (
                                                    <textarea
                                                        {...field}
                                                        value={field.value ?? ''}
                                                        onChange={field.onChange}
                                                        rows={5}
                                                        className='form-control'></textarea>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="row ms-2 me-2">
                                        <div className="col-12">
                                            <button onClick={handleSubmit(submitReadingProgress)} className='btn btn-outline-secondary text-center w-100'>
                                                Enviar progresso
                                            </button>
                                        </div>
                                    </div>
                                </form>
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
        <Drawer
            isOpened={props.openDrawerState}
            changePanelOpened={props.onCloseDrawerClick}
            content={html}
        />
    )
}

export default BookDrawer;
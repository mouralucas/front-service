import {BaseSyntheticEvent, ReactElement, useEffect, useState} from "react";
import {Controller, useForm} from 'react-hook-form';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import {format, parseISO} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import CurrencyInput from "../../../components/form/CurrencyInput";
import {Item} from '../../../interfaces/Library'
import {getAuthors, getCollections, getPublishers, getSeries, getStatuses} from "../../../services/getCommonData/Library";
import {getLanguages} from "../../../services/getCommonData/Core.tsx";
import Modal from "../../../components/Modal.tsx";
import {librarySubmit} from "../../../services/axios/Submit.tsx";
import {URL_LIBRARY_ITEM} from "../../../services/axios/ApiUrls.tsx";
import {toast} from "react-toastify";

export interface ItemModalProps {
    item: Item | undefined | null
    modalState: boolean
    hideModalItem: any
}


const DefaultItem: Item = {
    itemId: null,
    lastStatusId: null,
    lastStatusDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    mainAuthorId: '',
    authorsId: [],
    translatorId: 0,
    title: '',
    subtitle: '',
    titleOriginal: '',
    subtitleOriginal: '',
    isbn: '',
    isbn10: '',
    itemType: 0,
    pages: 0,
    volume: 1,
    edition: 1,
    publicationDate: null,
    originalPublicationDate: null,
    serieId: 0,
    collectionId: 0,
    publisherId: 0,
    itemFormatId: 0,
    languageId: 'PT',
    coverPrice: 0,
    paidPrice: 0,
    dimensions: '',
    height: 0,
    width: 0,
    thickness: 0,
    summary: '',
    observation: '',
    createdBy: null,
    createdAt: null,
    lastEditedBy: null,
    lastEditedAt: null
}

const itemTypes = [
    {
        value: 'book',
        label: 'Livro'
    },
    {
        value: 'manga',
        label: 'Mangá'
    }
]

const itemFormats = [
    {
        value: 'hardcover',
        label: 'Capa Dura'
    },
    {
        value: 'paperback',
        label: 'Capa comum'
    },
    {
        value: 'ebook',
        label: 'eBook'
    }
]


const App = (props: ItemModalProps) => {
    const {handleSubmit, control, reset, formState: {isDirty, dirtyFields}, getValues} = useForm<Item>({defaultValues: DefaultItem});

    const [authors, setAuthors] = useState<any[]>([]);
    const [statuses, setStatuses] = useState<any[]>([])
    const [itemSeries, setItemSeries] = useState<any[]>([])
    const [itemCollections, setItemCollections] = useState<any[]>([])
    const [publishers, setPublishers] = useState<any[]>([])
    const [languages, setLanguages] = useState<any[]>([])

    const fetchItemData: () => Promise<void> = async () => {
        setAuthors(await getAuthors(true));
        setStatuses(await getStatuses('LIBRARY_ITEM', true));
        setItemSeries(await getSeries(true));
        setItemCollections(await getCollections(true));
        setPublishers(await getPublishers(true));
        setLanguages(await getLanguages(true));
    }

    useEffect(() => {
        // Set initial values
        if (props.modalState && props.item) {
            reset(props.item);
        } else if (props.modalState && !props.item) {
            reset(DefaultItem);
        }

        // Load necessary information
        if (props.modalState) {
            fetchItemData().then();
        }

        // Clean form when modal closes
        if (!props.modalState) {
            reset(DefaultItem);
        }
    }, [props.modalState, props.item, reset]);

    const onSubmit = (data: Item, e: BaseSyntheticEvent<object> | undefined) => {
        let method;
        let submitData;

        if (data.itemId !== null){
            method = 'patch'

            const currentValues: Item = getValues();
            const modifiedFields: Partial<Record<keyof Item, Item[keyof Item]>> = {
                itemId: data.itemId
            };

            (Object.keys(dirtyFields) as Array<keyof Item>).forEach((key: keyof Item) => {
                modifiedFields[key] = currentValues[key];
            });

            submitData = modifiedFields
        } else {
            method = 'post'
            submitData = data
        }

        librarySubmit(e, URL_LIBRARY_ITEM, submitData, method).then(() => {
            toast.success('Item salvo com sucesso');
        }).catch(() => {
            toast.error('Erro ao salvar o item');
        })
    };

    const body: ReactElement =
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-4">
                        <label htmlFor="">Autor</label>
                        <Controller
                            name={'mainAuthorId'}
                            control={control}
                            rules={{required: false}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={authors}
                                    value={authors.find((c: any) => c.value === field.value)}
                                    onChange={(e: any) => field.onChange(e?.value)}
                                />
                            )}
                        />
                    </div>
                    <div className="col-4">
                        <label htmlFor="">Outros autores</label>
                        <Controller
                            name={'authorsId'}
                            control={control}
                            rules={{required: false}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    isMulti
                                    options={authors}
                                    value={authors.filter((author: any) => field.value?.includes(author.value) || false)}
                                    onChange={(selectedOptions: any) => {
                                        const values = selectedOptions?.map((option: any) => option.value) || [];
                                        field.onChange(values);
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="">Status</label>
                        <Controller
                            name={'lastStatusId'}
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={statuses}
                                    value={authors.find((c: any) => c.value === field.value)}
                                    onChange={(e: any) => field.onChange(e?.value)}
                                />
                            )}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="">Data do status</label>
                        <Controller
                            name={'lastStatusDate'}
                            control={control}
                            render={({field}) => (
                                <DatePicker
                                    selected={parseISO(field.value)}
                                    onChange={(date) => {
                                        field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                    }}
                                    dateFormat="dd/MM/yyyy" // Exibe no formato brasileiro
                                    className="form-control"
                                    placeholderText="Selecione uma data"
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <label htmlFor="">Título</label>
                        <Controller
                            name={'title'}
                            control={control}
                            render={({field}) => (
                                <input
                                    type={"text"}
                                    {...field}
                                    className="form-control input-default"
                                />
                            )}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="">Subtítulo</label>
                        <Controller
                            name={'subtitle'}
                            control={control}
                            render={({field}) => (
                                <input
                                    {...field}
                                    className="form-control input-default"
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <label htmlFor="">Título original</label>
                        <Controller
                            name={'titleOriginal'}
                            control={control}
                            render={({field}) => (
                                <input
                                    type={"text"}
                                    {...field}
                                    className="form-control input-default"
                                />
                            )}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="">Subtítulo original</label>
                        <Controller
                            name={'subtitleOriginal'}
                            control={control}
                            render={({field}) => (
                                <input
                                    {...field}
                                    className="form-control input-default"
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-3">
                        <label htmlFor="">ISBN</label>
                        <Controller
                            name={'isbn'}
                            control={control}
                            render={({field}) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="form-control input-default"
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">ISBN 10</label>
                        <Controller
                            name={'isbn10'}
                            control={control}
                            render={({field}) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="form-control input-default"
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Tipo</label>
                        <Controller
                            name={'itemType'}
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={itemTypes}
                                    value={itemTypes.find((c: any) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                />
                            )}
                        />
                    </div>
                    <div className="col-1">
                        <label htmlFor="">Pages</label>
                        <Controller
                            name={'pages'}
                            control={control}
                            render={({field}) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="form-control input-default"
                                />
                            )}
                        />
                    </div>
                    <div className="col-1">
                        <label htmlFor="">Volume</label>
                        <Controller
                            name={'volume'}
                            control={control}
                            render={({field}) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="form-control input-default"
                                />
                            )}
                        />
                    </div>
                    <div className="col-1">
                        <label htmlFor="">Edição</label>
                        <Controller
                            name={'edition'}
                            control={control}
                            render={({field}) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="form-control input-default"
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-2">
                        <label htmlFor="">Lançamento</label>
                        <Controller
                            name={'publicationDate'}
                            control={control}
                            render={({field}) => (
                                <DatePicker
                                    selected={field.value ? parseISO(field.value) : null}
                                    onChange={(date) => {
                                        field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    placeholderText="__/__/____"
                                    isClearable
                                />
                            )}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="">Lançamento original</label>
                        <Controller
                            name={'originalPublicationDate'}
                            control={control}
                            render={({field}) => (
                                <DatePicker
                                    selected={field.value ? parseISO(field.value) : null}
                                    onChange={(date) => {
                                        // Verifica se a data é `null`
                                        field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                    }}
                                    dateFormat="dd/MM/yyyy" // Exibe no formato brasileiro
                                    className="form-control"
                                    placeholderText="__/__/____"
                                />
                            )}
                        />
                    </div>
                    <div className="col-4">
                        <label htmlFor="">Série</label>
                        <Controller
                            name={'serieId'}
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={itemSeries}
                                    value={itemSeries.find((c: any) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                />
                            )}
                        />
                    </div>
                    <div className="col-4">
                        <label htmlFor="">Coleção</label>
                        <Controller
                            name={'collectionId'}
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={itemCollections}
                                    value={itemCollections.find((c: any) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4">
                        <label htmlFor="">Editora</label>
                        <Controller
                            name={'publisherId'}
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={publishers}
                                    value={publishers.find((c: any) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                />
                            )}
                        />
                    </div>
                    <div className="col-4">
                        <label htmlFor="">Formato</label>
                        <Controller
                            name={'itemFormatId'}
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={itemFormats}
                                    value={itemFormats.find((c: any) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                />
                            )}
                        />
                    </div>
                    <div className="col-4">
                        <label htmlFor="">Idioma</label>
                        <Controller
                            name={'languageId'}
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={languages}
                                    value={languages.find((c: any) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-3">
                        <label htmlFor="">Preço de capa</label>
                        <Controller
                            name={'coverPrice'}
                            control={control}
                            render={({field}) => (
                                <CurrencyInput
                                    prefix="R$ "
                                    value={field.value}
                                    onValueChange={(values) => field.onChange(values.rawValue)}
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Preço pago</label>
                        <Controller
                            name={'paidPrice'}
                            control={control}
                            render={({field}) => (
                                <CurrencyInput
                                    prefix="R$ "
                                    value={field.value}
                                    onValueChange={(values) => field.onChange(values.rawValue)}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-3">
                        <label htmlFor="">Dimensões</label>
                        <Controller
                            name={'dimensions'}
                            control={control}
                            render={({field}) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="form-control input-default"
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Altura</label>
                        <Controller
                            name={'height'}
                            control={control}
                            render={({field}) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="form-control input-default"
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">largura</label>
                        <Controller
                            name={'width'}
                            control={control}
                            render={({field}) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="form-control input-default"
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Profundidade</label>
                        <Controller
                            name={'thickness'}
                            control={control}
                            render={({field}) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="form-control input-default"
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <label htmlFor="">Descrição</label>
                        <Controller name={'summary'}
                                    control={control}
                                    rules={{required: false}}
                                    render={({field}) => (
                                        <textarea
                                            {...field}
                                            value={field.value ?? ''}
                                            onChange={field.onChange}
                                            rows={15}
                                            className='form-control'></textarea>
                                    )}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <label htmlFor="">Observações</label>
                        <Controller name={'observation'}
                                    control={control}
                                    rules={{required: false}}
                                    render={({field}) => (
                                        <textarea
                                            {...field}
                                            value={field.value ?? ''}
                                            onChange={field.onChange}
                                            rows={15}
                                            className='form-control'></textarea>
                                    )}
                        />
                    </div>
                </div>
            </form>
        </div>


    return (
        <div>
            <Modal
                showModal={props.modalState}
                hideModal={props.hideModalItem}
                title={'Item Beta'}
                fullscreen={true}
                body={body}
                actionModal={handleSubmit(onSubmit)}
                disableAction={!isDirty}
                size={'modal-fullscreen'}
            />
        </div>
    )
}

export default App;
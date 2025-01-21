import {BaseSyntheticEvent, ReactElement, useEffect, useState} from "react";
import Modal from "../../../../components/Modal.tsx";
import {Author} from "../../../../interfaces/Library.tsx";
import {Controller, useForm} from "react-hook-form";
import {format, parseISO} from "date-fns";
import DatePicker from "react-datepicker";
import {getCountries, getLanguages} from "../../../../services/getCommonData/Core.tsx";
import Select from "react-select";
import {librarySubmit} from "../../../../services/axios/Submit.tsx";
import {URL_LIBRARY_AUTHOR} from "../../../../services/axios/ApiUrls.tsx";
import {toast} from "react-toastify";

interface AuthorModalProps {
    modalState: boolean;
    hideModal: () => void;
    author?: Author;
}

const DefaultAuthor: Author = {
    authorId: null,
    authorName: '',
    birthDate: null,
    languageId: '',
    description: ''
}

const App = (props: AuthorModalProps): ReactElement => {
    const {handleSubmit, control, formState: {errors, dirtyFields}, reset, getValues} = useForm({defaultValues: DefaultAuthor})

    const [countries, setCountries] = useState<any[]>([])
    const [languages, setLanguages] = useState<any[]>([])

    const getAuthorData = async () => {
        setCountries(await getCountries(true));
        setLanguages(await getLanguages(true));
    }

    useEffect(() => {
        if (props.modalState && props.author) {
            reset(props.author);
        } else if (props.modalState && !props.author) {
            reset(DefaultAuthor);
        }

        if (props.modalState) {
            getAuthorData().then();
        }
    }, [props.author, props.modalState, reset])

    const onSubmit = (data: Author, e: BaseSyntheticEvent<object> | undefined) => {
        let method;
        let submitData;

        if (data.authorId !== null) {
            method = 'patch'

            const currentValues: Author = getValues();
            const modifiedFields: Partial<Record<keyof Author, Author[keyof Author]>> = {
                authorId: data.authorId
            };

            (Object.keys(dirtyFields) as Array<keyof Author>).forEach((key: keyof Author) => {
                modifiedFields[key] = currentValues[key];
            });

            submitData = modifiedFields
        } else {
            method = 'post'
            submitData = data
        }

        librarySubmit(e, URL_LIBRARY_AUTHOR, submitData, method).then(() => {
            toast.success('Autor salvo com sucesso');
        }).catch(() => {
            toast.error('Erro ao salvar o autor');
        })

    }

    const body =
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-9">
                        <label htmlFor="">Nome</label>
                        <Controller
                            name={'authorName'}
                            control={control}
                            rules={{required: 'Esse campo é obrigatório'}}
                            render={({field}) => (
                                <input
                                    type="text"
                                    {...field}
                                    className={`form-control input-default ${errors.authorName ? "input-error" : ""}`}
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Nascimento</label>
                        <Controller
                            name='birthDate'
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
                                />
                            )}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-6">
                        <label htmlFor="">Páis</label>
                        <Controller
                            name={'countryId'}
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={countries}
                                    value={countries.find((c: any) => c.value === field.value)}
                                    onChange={(val: any) => field.onChange(val?.value)}
                                    placeholder={'Selecione'}
                                />
                            )}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="">Idioma</label>
                        <Controller
                            name={'languageId'}
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={languages}
                                    value={languages.find((c: any) => c.value === field.value)}
                                    onChange={(val: any) => field.onChange(val?.value)}
                                    placeholder={'Selecione'}
                                />
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
                hideModal={props.hideModal}
                title={'Autor'}
                body={body}
                // actionModal={handleSubmit(onSubmit)}
                size={'modal-lg'}
            />
        </div>
    )
}

export default App;
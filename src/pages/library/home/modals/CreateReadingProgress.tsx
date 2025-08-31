import { BaseSyntheticEvent, useEffect } from "react";
import { ItemReadingProgress } from "../../../../interfaces/Library";
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';
import DateMaskedInput from "../../../../components/form/DateMaskInput.tsx";
import DatePicker from "react-datepicker";
import { format, parseISO } from "date-fns";
import Modal2 from "../../../../components/Modal.tsx";
import { toast } from "react-toastify";
import { librarySubmit } from "../../../../services/axios/Submit.tsx";
import { URL_LIBRARY_READING_PROGRESS } from "../../../../services/axios/ApiUrls.tsx";

interface CreateReadingProgressProps {
    modalState: boolean;
    hideCreateReadingProgressModal: () => void;
    readingId: string;
}

const DefaultReadingProgress: ItemReadingProgress = {
    readingId: '',
    progressType: null,
    value: 0,
    progressDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    rate: undefined,
    comment: undefined
}

const ReadingProgressOptions = [
    { value: 'page', label: 'Página' },
    { value: 'percentage', label: 'Porcentagem' },
]

const CreateReadingProgress = (props: CreateReadingProgressProps) => {
    const { handleSubmit, control, reset, formState: { errors }, setValue } = useForm<ItemReadingProgress>({ defaultValues: DefaultReadingProgress });

    useEffect(() => {
        if (props.modalState && props.readingId) {
            setValue('readingId', props.readingId);
        }

        // Clean form when modal closes
        if (!props.modalState) {
            reset(DefaultReadingProgress);
        }

    }, [props.modalState, props.readingId]);

    const submitReadingProgress = (data: ItemReadingProgress, e: BaseSyntheticEvent<object> | undefined) => {
        librarySubmit(e, URL_LIBRARY_READING_PROGRESS, data, 'POST').then(() => {
            toast.success('Progresso de leitura salvo com sucesso');
        }).catch(() => {
            toast.error('Erro ao salvar o progresso de leitura');
        })
    };

    const body = (
        <div className="mt-2">
            <form onSubmit={handleSubmit(submitReadingProgress)}>
                <div className="row">
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
                            rules={{ required: "Este campo é obrigatório" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={ReadingProgressOptions}
                                    value={ReadingProgressOptions.find((c: any) => c.value === field.value)}
                                    onChange={(e: any) => field.onChange(e?.value)}
                                    className={`${errors.progressType ? "border border-danger" : ""}`}
                                />
                            )}
                        />
                    </div>
                    <div className="col-6">
                        <Controller
                            name={'value'}
                            control={control}
                            rules={{ required: 'Esse campo é obrigatório' }}
                            render={({ field }) => (
                                <input
                                    type={"text"}
                                    {...field}
                                    className={`form-control input-default ${errors.value ? 'input-error' : ''}`}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <label htmlFor="">Data do status</label>
                        <Controller
                            name={'progressDate'}
                            control={control}
                            rules={{ required: false }}
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
                                            className={`form-control ${errors.progressDate ? "input-error" : ""}`}
                                        />
                                    }
                                />
                            )}
                        />
                    </div>
                    <div className="col-8">
                        <label htmlFor="">Nota</label>
                        <Controller
                            name={'rate'}
                            control={control}
                            rules={{ required: false }}
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
                <div className="row mt-2">
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
            </form>
        </div>
    );

    return (
        <div>
            <Modal2
                showModal={props.modalState}
                hideModal={props.hideCreateReadingProgressModal}
                title={'Progresso de Leitura'}
                fullscreen={true}
                body={body}
                actionModal={handleSubmit(submitReadingProgress)}
                size={'modal-sm'}
            />
        </div>
    )
}

export default CreateReadingProgress;
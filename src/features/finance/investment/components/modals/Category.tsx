import { BaseSyntheticEvent, ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../../../../components/Modal.tsx";
import { Category } from "../../../../interfaces/Finance.tsx";
import { URL_FINANCE_CATEGORIES } from "../../../../services/axios/ApiUrls.tsx";
import { financeSubmit } from "../../../../services/axios/Submit.tsx";

interface BankModalProps {
    isOpen: boolean;
    onToggle: any;
    category?: Category;
}

const DefaultCategory: Category = {
    categoryId: null,
    name: '',
}


const CategoryModal = (props: BankModalProps): ReactElement => {
    // TODO: change to accept categoriId
    const {handleSubmit, control, formState: {errors, dirtyFields, isDirty}, getValues} = useForm<Category>({defaultValues: DefaultCategory})

    const onSubmit = (data: Category, e: BaseSyntheticEvent<object> | undefined) => {
        let method: string;
        let submitData;

        if (data.categoryId !== null) {
            method = 'patch';

            const currentValues: Category = getValues();
            const modifiedFields: Partial<Record<keyof Category, Category[keyof Category]>> = {
                categoryId: data.categoryId
            };

            (Object.keys(dirtyFields) as Array<keyof Category>).forEach((key: keyof Category) => {
                modifiedFields[key] = currentValues[key];
            });

            submitData = modifiedFields
        } else {
            method = 'post'
            submitData = data
        }

        financeSubmit(e, URL_FINANCE_CATEGORIES, submitData, method).then(() => {
            toast.success('Extrato inserido com sucesso');
        }).catch(() => {
            toast.error('Erro ao salvar extrato');
        })
    }

    const body =
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mt-2">
                    <div className="col-8">
                        <label htmlFor="">Nome</label>
                        <Controller
                            name={'name'}
                            control={control}
                            rules={{required: 'Esse campo é obrigatório'}}
                            render={({field}) => (
                                <input
                                    type={'text'}
                                    {...field}
                                    className={`form-control input-default ${errors.name ? 'input-error' : ''}`}
                                />
                            )}
                        />
                    </div>
                </div>
            </form>
        </>

    return (
        <Modal
            title={'Categorias padrão'}
            isOpen={props.isOpen}
            onToggle={props.onToggle}
            body={body}
            actionModal={handleSubmit(onSubmit)}
            disableAction={!isDirty}
            size='modal-sm'
        />
    )
}

export default CategoryModal;
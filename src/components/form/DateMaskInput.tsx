import React, { forwardRef } from "react";
import InputMask from "react-input-mask";

type DateMaskedInputProps = {
    value?: string;
    onClick?: () => void;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    placeholder?: string;
    className?: string;
};

// O `ref` precisa ser do tipo `Ref<HTMLInputElement>` (não `ReactInputMask`)
const DateMaskedInput = forwardRef<HTMLInputElement, DateMaskedInputProps>(
    ({ value, onClick, onChange, onBlur, placeholder, className }, ref) => (
        <InputMask
            mask="99/99/9999"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={className}
        >
            {(inputProps) => <input {...inputProps} ref={ref} onClick={onClick} />}
        </InputMask>
    )
);

// Dá um nome pro componente (boa prática com forwardRef)
DateMaskedInput.displayName = "DateMaskedInput";

export default DateMaskedInput;

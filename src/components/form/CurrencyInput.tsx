import React, { useEffect, useState } from 'react';

interface CurrencyProps extends React.InputHTMLAttributes<HTMLInputElement> {
    prefix?: string;
    suffix?: string;
    decimalPlaces?: number;
    onValueChange?: (values: { rawValue: number; formattedValue: string }) => void;
    defaultValue?: number;
}

function CurrencyInput({
                           prefix = '',
                           suffix = '',
                           decimalPlaces = 2,
                           defaultValue = 0,
                           value,
                           onValueChange,
                           onChange,
                           ...props
                       }: CurrencyProps) {
    const [internalValue, setInternalValue] = useState<string>('');
    const [signedValue, setSignedValue] = useState<boolean>(false);

    const formatValue = (inputValue: string) => {
        let isNegative = signedValue

        // check if the defaultValue is negative
        // in this case, the sigh will be the first char in the string
        if (/^-/.test(inputValue)) {
            isNegative = true;
        }

        // if the minus sign is typed change the sign of the number
        // in this case, the sign will be the last char in the string
        if (/-$/.test(inputValue)) {
            isNegative = !signedValue;
        }

        setSignedValue(isNegative)

        const numericValue = parseInt(inputValue.replace(/\D/g, '')) || 0;
        const factor = Math.pow(10, decimalPlaces);
        const formattedValue = (numericValue / factor).toFixed(decimalPlaces);

        const finalValue = `${prefix}${formattedValue}${suffix}`;
        return isNegative ? `-${finalValue}` : finalValue;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const formattedValue = formatValue(rawValue);

        if (onValueChange) {
            onValueChange({
                rawValue: parseFloat(formattedValue.replace(prefix, '').replace(suffix, '')),
                formattedValue: formattedValue,
            });
        }

        if (onChange) {
            onChange(e);
        }

        if (value === undefined) {
            setInternalValue(formattedValue);
        }
    };

    useEffect(() => {
        setInternalValue(formatValue(defaultValue.toFixed(decimalPlaces)));
    }, [defaultValue, decimalPlaces]);

    useEffect(() => {
        if (value !== undefined && typeof value === 'number') {
            const formatedValue = formatValue(value.toFixed(decimalPlaces));
            setInternalValue(formatedValue);
        }
    }, [value]);

    return (
        <div>
            <input
                type="text"
                value={value !== undefined ? internalValue : internalValue} // Sempre mostra o valor formatado
                onChange={handleChange}
                placeholder="0.00"
                className="form-control"
                {...props}
            />
        </div>
    );
}

export default CurrencyInput;

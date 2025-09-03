import React, { useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface CurrencyProps extends Omit<TextFieldProps, 'onChange'> {
    prefix?: string;
    suffix?: string;
    decimalPlaces?: number;
    onValueChange?: (values: { rawValue: number; formattedValue: string }) => void;
    defaultValue?: number;
    label?: string;
    onChange?: any;
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
        let isNegative = signedValue;

        if (/^-/.test(inputValue)) {
            isNegative = true;
        }

        if (/-$/.test(inputValue)) {
            isNegative = !signedValue;
        }

        setSignedValue(isNegative);

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
            const formatted = formatValue(value.toFixed(decimalPlaces));
            setInternalValue(formatted);
        }
    }, [value]);

    return (
        <TextField
            label={props.label}
            value={internalValue}
            onChange={handleChange}
            placeholder={`0${decimalPlaces > 0 ? '.' + '0'.repeat(decimalPlaces) : ''}`}
            {...props}
        />
    );
}

export default CurrencyInput;

import React, { useEffect, useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface CurrencyProps extends Omit<TextFieldProps, "onChange"> {
    prefix?: string;
    suffix?: string;
    decimalPlaces?: number;
    onValueChange?: (values: { rawValue: number; formattedValue: string }) => void;
    defaultValue?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CurrencyInput({
    prefix = "",
    suffix = "",
    decimalPlaces = 2,
    defaultValue = 0,
    value,
    onValueChange,
    onChange,
    size = "small",
    fullWidth = true,
    ...props
}: CurrencyProps) {
    const [internalValue, setInternalValue] = useState<string>("");
    const [signedValue, setSignedValue] = useState<boolean>(false);

    const formatValue = (inputValue: string) => {
        // Check the sign
        let isNegative = signedValue;
        if (/^-/.test(inputValue)) isNegative = true;
        if (/-$/.test(inputValue)) isNegative = !signedValue;

        // Remove all non-digit characters
        let numericValue = parseInt(inputValue.replace(/\D/g, "")) || 0;

        // Reset sign if real value is zero
        if (numericValue === 0) {
            isNegative = false;
        }

        setSignedValue(isNegative);

        const factor = Math.pow(10, decimalPlaces);
        const formattedValue = (numericValue / factor).toFixed(decimalPlaces);

        return isNegative ? `-${prefix}${formattedValue}${suffix}` : `${prefix}${formattedValue}${suffix}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const formattedValue = formatValue(rawValue);

        // dispara callback com valor bruto
        if (onValueChange) {
            onValueChange({
                rawValue: parseFloat(formattedValue.replace(prefix, "").replace(suffix, "")),
                formattedValue: formattedValue,
            });
        }

        // dispara o onChange do MUI
        if (onChange) {
            onChange(e);
        }

        // atualiza o estado interno se não for controlled
        if (value === undefined) {
            setInternalValue(formattedValue);
        }
    };

    // Initial values
    useEffect(() => {
        const formatted = formatValue(defaultValue.toFixed(decimalPlaces));
        setInternalValue(formatted);

        // Reset sign if real value is zero
        if (defaultValue === 0) {
            setSignedValue(false);
        }
    }, [defaultValue, decimalPlaces]);

    // Sync when parent passes value
    useEffect(() => {
        if (value !== undefined) {
            const formatted = typeof value === "number"
                ? formatValue(value.toFixed(decimalPlaces))
                : formatValue(value);

            setInternalValue(formatted);

            // Reset sign if real value is zero
            if ((typeof value === "number" ? value : parseFloat(value)) === 0) {
                setSignedValue(false);
            }
        }
    }, [value]);

    return (
        <TextField
            value={internalValue}
            onChange={handleChange}
            placeholder={`0${decimalPlaces > 0 ? "." + "0".repeat(decimalPlaces) : ""}`}
            size={size}
            fullWidth={fullWidth}
            {...props}
        />
    );
}

export default CurrencyInput;

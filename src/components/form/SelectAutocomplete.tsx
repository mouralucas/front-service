import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";

interface SelectAutocompleteProps<
  T,
  ReturnValue extends "id" | "object" = "id"
> {
  label: string;
  value: ReturnValue extends "object"
    ? T | T[] | null | undefined
    : string | number | Array<string | number> | null | undefined;
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string | number;
  onChange: (
    value: ReturnValue extends "object"
      ? T | T[] | null
      : string | number | Array<string | number> | null
  ) => void;
  error?: string;
  multiple?: boolean;
  width?: number | string;
  disabled?: boolean;
}

function SelectAutocomplete<
  T,
  ReturnValue extends "id" | "object" = "id"
>({
  label,
  value,
  options,
  getOptionLabel,
  getOptionValue,
  onChange,
  error,
  multiple = false,
  width,
  disabled,
}: SelectAutocompleteProps<T, ReturnValue>) {
  const isReturningObject = false as ReturnValue extends "object"
    ? true
    : false;

  // Resolve selected option(s)
  const selectedOption = multiple
    ? Array.isArray(value)
      ? options.filter((opt) =>
          typeof value[0] === "string" || typeof value[0] === "number"
            ? (value as Array<string | number>).includes(
                getOptionValue(opt)
              )
            : (value as T[]).includes(opt)
        )
      : []
    : options.find((opt) =>
        typeof value === "string" || typeof value === "number"
          ? getOptionValue(opt) === value
          : opt === value
      ) ?? null;

  return (
    <FormControl
      fullWidth
      size="small"
      sx={width ? { width } : undefined}
    >
      <Autocomplete<T, boolean, false, false>
        multiple={multiple}
        options={options}
        disabled={disabled}
        getOptionLabel={getOptionLabel}
        value={selectedOption as any}
        autoHighlight
        fullWidth
        isOptionEqualToValue={(option, val) =>
          getOptionValue(option) === getOptionValue(val)
        }
        onChange={(_, newValue) => {
          if (!newValue || (Array.isArray(newValue) && newValue.length === 0)) {
            onChange(null as any);
            return;
          }

          if (multiple) {
            if (isReturningObject) {
              onChange(newValue as any);
            } else {
              onChange(
                (newValue as T[]).map(getOptionValue) as any
              );
            }
          } else {
            if (isReturningObject) {
              onChange(newValue as any);
            } else {
              onChange(
                getOptionValue(newValue as T) as any
              );
            }
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            size="small"
            error={!!error}
          />
        )}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}

export default SelectAutocomplete;
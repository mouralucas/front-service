import { Autocomplete, FormControl, FormHelperText, TextField } from "@mui/material";

interface SelectAutocompleteProps<
  T,
  ReturnValue extends "id" | "object" = "id"
> {
  label: string;
  value: ReturnValue extends "id"
    ? string | number | Array<string | number> | null
    : T | T[] | null;
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string | number;
  onChange: (
    value: ReturnValue extends "id"
      ? string | number | Array<string | number> | null
      : T | T[] | null
  ) => void;
  error?: string;
  multiple?: boolean;
  width?: number | string; // 👈 nova prop
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
  width, // 👈 recebendo aqui
}: SelectAutocompleteProps<T, ReturnValue>) {
  // Determine selected options for single/multiple
  const selectedOption = multiple
    ? Array.isArray(value)
      ? options.filter((opt) =>
          (typeof value[0] === "string" || typeof value[0] === "number")
            ? value.includes(getOptionValue(opt))
            : value.includes(opt)
        )
      : []
    : (options.find((opt) =>
        (typeof value === "string" || typeof value === "number")
          ? getOptionValue(opt) === value
          : opt === value
      ) as T | null) || null;

  return (
    <FormControl
      fullWidth={!width} // se passar width, não ocupa 100%
      size="small"
      sx={width ? { width } : undefined} // 👈 aplica largura custom
    >
      <Autocomplete<T, typeof multiple, false, false>
        multiple={multiple}
        options={options}
        getOptionLabel={getOptionLabel}
        value={selectedOption}
        autoHighlight
        fullWidth={!width} // idem: só fullWidth se não tiver width
        onChange={(_, newValue) => {
          if (!newValue || (Array.isArray(newValue) && newValue.length === 0)) {
            onChange(null as any);
            return;
          }

          if (multiple) {
            if ((null as any as ReturnValue) === "object") {
              onChange(newValue as any); // retorna array de objetos
            } else {
              onChange(
                (newValue as T[]).map(getOptionValue) as any
              ); // retorna array de ids
            }
          } else {
            if ((null as any as ReturnValue) === "object") {
              onChange(newValue as any); // retorna objeto
            } else {
              onChange(getOptionValue(newValue as T) as any); // retorna id
            }
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} size="small" error={!!error} />
        )}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

export default SelectAutocomplete;

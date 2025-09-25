import { Autocomplete, FormControl, FormHelperText, TextField } from "@mui/material";

interface SelectAutocompleteProps<T, ReturnValue extends "id" | "object" = "id"> {
  label: string;
  value: ReturnValue extends "id" ? string | number | null : T | null;
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string | number;
  onChange: (value: ReturnValue extends "id" ? string | number | null : T | null) => void;
  error?: string;
}

function SelectAutocomplete<T, ReturnValue extends "id" | "object" = "id">({
  label,
  value,
  options,
  getOptionLabel,
  getOptionValue,
  onChange,
  error,
}: SelectAutocompleteProps<T, ReturnValue>) {
  const selectedOption =
    (options.find((opt) =>
      (typeof value === "string" || typeof value === "number")
        ? getOptionValue(opt) === value
        : opt === value
    ) as T | null) || null;

  return (
    <FormControl fullWidth size="small">
      <Autocomplete<T, false, false, false>
        options={options}
        getOptionLabel={getOptionLabel}
        value={selectedOption}
        autoHighlight
        onChange={(_, newValue) => {
          if (!newValue) {
            onChange(null as any);
            return;
          }

          if ((null as any as ReturnValue) === "object") {
            onChange(newValue as any); // retorna objeto
          } else {
            onChange(getOptionValue(newValue) as any); // retorna id
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
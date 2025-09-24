import {
    Autocomplete,
    FormControl,
    FormHelperText,
    TextField,
} from "@mui/material";
import { ReactElement } from "react";

interface SelectAutocompleteProps {
  label: string;
  value: any;
  options: any[];
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => string | number;
  onChange: (value: any) => void;
  error?: string;
}

const SelectAutocomplete = ({
  label,
  value,
  options,
  getOptionLabel,
  getOptionValue,
  onChange,
  error,
}: SelectAutocompleteProps): ReactElement => {
  const selectedOption =
    options.find((opt) => getOptionValue(opt) === value) || null;

  return (
    <FormControl fullWidth size="small">
      <Autocomplete
        options={options}
        getOptionLabel={getOptionLabel}
        value={selectedOption}
        onChange={(_, newValue) => {
          const newVal = newValue ? getOptionValue(newValue) : "";
          onChange(newVal);
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
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default SelectAutocomplete;

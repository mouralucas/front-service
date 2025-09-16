import { Controller } from "react-hook-form";
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    IconButton,
    Stack,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import CurrencyInput from "../components/form/CurrencyInput";
import { Currency } from "../interfaces/Finance";

interface TaxFeeArrayProps {
    control: any;
    errors: any;
    taxFeeFields: any;
    appendTaxFee: any;
    removeTaxFee: any;
    currencies: Currency[];
    taxFeeList: any[];
    type: "taxDetails" | "feeDetails";
    taxFeeTitile: string;
}

const TaxArray = (props: TaxFeeArrayProps) => {
    const title = props.type === "taxDetails" ? "Imposto" : "Taxa";

    return (
        <>
            {props.taxFeeFields.map((taxField: any, taxIndex: number) => (
                <Grid container rowSpacing={4} columnSpacing={2} key={taxField.id} sx={{ mt: 4 }} >
                    {/* Currency */}
                    <Grid size={{ sm: 12, md: 3 }}>
                        <FormControl
                            fullWidth
                            error={!!props.errors[props.type]?.[taxIndex]?.currencyId}
                            size="small"
                        >
                            <InputLabel>Moeda</InputLabel>
                            <Controller
                                name={`${props.type}.${taxIndex}.currencyId`}
                                control={props.control}
                                rules={{ required: "Esse campo é obrigatório" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="currency-label"
                                        label="Moeda"
                                        value={field.value || ""}>
                                        {props.currencies?.map((c) => (
                                            <MenuItem key={c.currencyId} value={c.currencyId}>
                                                {c.symbol}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            <FormHelperText>
                                {props.errors[props.type]?.[taxIndex]?.currencyId?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    {/* Tax/Fee type */}
                    <Grid size={{ sm: 12, md: 4 }}>
                        <FormControl
                            fullWidth
                            error={!!props.errors[props.type]?.[taxIndex]?.taxFeeId}
                            size="small"
                        >
                            <InputLabel id="taxFeeType-label">{title}</InputLabel>
                            <Controller
                                name={`${props.type}.${taxIndex}.taxFeeId`}
                                control={props.control}
                                rules={{ required: "Esse campo é obrigatório" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="taxFeeType-label"
                                        label={title}
                                        value={field.value || ""}>
                                        {props.taxFeeList.map((c) => (
                                            <MenuItem key={c.value} value={c.value}>
                                                {c.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            <FormHelperText>
                                {props.errors[props.type]?.[taxIndex]?.taxFeeId?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    {/* Amount */}
                    <Grid size={{ sm: 12, md: 4 }}>
                        <Controller
                            name={`${props.type}.${taxIndex}.amount`}
                            control={props.control}
                            rules={{
                                validate: (value) => value !== 0 || "Este campo não deve ser zero",
                            }}
                            render={({ field }) => (
                                <CurrencyInput
                                    label="Valor"
                                    prefix="R$ "
                                    value={field.value}
                                    onValueChange={(values: any) => field.onChange(values.rawValue)}
                                    // garante consistência visual
                                    fullWidth
                                    size="small"
                                    error={!!props.errors[props.type]?.[taxIndex]?.amount}
                                    helperText={props.errors[props.type]?.[taxIndex]?.amount?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Add/Remove Buttons */}
                    <Grid size={{ sm: 12, md: 1 }}>
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'center' }}
                        >
                            {taxIndex === props.taxFeeFields.length - 1 && (
                                <IconButton
                                    color="primary"
                                    onClick={() =>
                                        props.appendTaxFee({
                                            currencyId: "BRL",
                                            taxFeeId: "",
                                            amount: 0,
                                        })
                                    }
                                >
                                    <AddCircleOutline />
                                </IconButton>
                            )}
                            <IconButton
                                color="error"
                                onClick={() => props.removeTaxFee(taxIndex)}
                            >
                                <RemoveCircleOutline />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            ))}
        </>
    );
};

export default TaxArray;

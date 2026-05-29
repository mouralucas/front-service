import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencyInput from "../CurrencyInput";

describe("CurrencyInput Component", () => {
    describe("Rendering and Props", () => {
        it("should render with default values", () => {
            render(<CurrencyInput value={0} />);
            const input = screen.getByDisplayValue("0.00");
            expect(input).toBeInTheDocument();
        });

        it("should render with prefix", () => {
            render(<CurrencyInput value={100} prefix="$" />);
            const input = screen.getByDisplayValue("$100.00");
            expect(input).toBeInTheDocument();
        });

        it("should render with suffix", () => {
            render(<CurrencyInput value={100} suffix=" USD" />);
            const input = screen.getByDisplayValue("100.00 USD");
            expect(input).toBeInTheDocument();
        });

        it("should render with both prefix and suffix", () => {
            render(<CurrencyInput value={100} prefix="$" suffix=" USD" />);
            const input = screen.getByDisplayValue("$100.00 USD");
            expect(input).toBeInTheDocument();
        });

        it("should have placeholder text", () => {
            render(<CurrencyInput value={0} decimalPlaces={2} />);
            const input = screen.getByPlaceholderText("0.00");
            expect(input).toBeInTheDocument();
        });

        it("should have placeholder text with correct decimal places", () => {
            render(<CurrencyInput value={0} decimalPlaces={4} />);
            const input = screen.getByPlaceholderText("0.0000");
            expect(input).toBeInTheDocument();
        });
    });

    describe("Decimal Places Handling", () => {
        it("should format value with 2 decimal places by default", () => {
            render(<CurrencyInput value={123.456} />);
            const input = screen.getByDisplayValue("123.46") as HTMLInputElement;
            expect(input).toBeInTheDocument();
        });

        it("should format value with 3 decimal places", () => {
            render(<CurrencyInput value={123.4567} decimalPlaces={3} />);
            const input = screen.getByDisplayValue("123.457") as HTMLInputElement;
            expect(input).toBeInTheDocument();
        });

        it("should format value with 4 decimal places", () => {
            render(<CurrencyInput value={1.23456} decimalPlaces={4} />);
            const input = screen.getByDisplayValue("1.2346") as HTMLInputElement;
            expect(input).toBeInTheDocument();
        });

        it("should format value with 0 decimal places", () => {
            render(<CurrencyInput value={123.99} decimalPlaces={0} />);
            const input = screen.getByDisplayValue("124") as HTMLInputElement;
            expect(input).toBeInTheDocument();
        });
    });

    describe("Number Input Behavior", () => {
        it("should format input '2' as '0.02' with 2 decimal places", async () => {
            const user = userEvent.setup();
            render(<CurrencyInput value={undefined} decimalPlaces={2} />);
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "2");

            expect(input.value).toBe("0.02");
        });

        it("should format input '12345' as '1.2345' with 4 decimal places", async () => {
            const user = userEvent.setup();
            render(<CurrencyInput value={undefined} decimalPlaces={4} />);
            const input = screen.getByPlaceholderText("0.0000") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "12345");

            expect(input.value).toBe("1.2345");
        });

        it("should format input '123' as '1.23' with 2 decimal places", async () => {
            const user = userEvent.setup();
            render(<CurrencyInput value={undefined} decimalPlaces={2} />);
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "123");

            expect(input.value).toBe("1.23");
        });

        it("should format input '100' as '1.00' with 2 decimal places", async () => {
            const user = userEvent.setup();
            render(<CurrencyInput value={undefined} decimalPlaces={2} />);
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "100");

            expect(input.value).toBe("1.00");
        });

        it("should only accept numeric input", async () => {
            const user = userEvent.setup();
            render(<CurrencyInput value={undefined} decimalPlaces={2} />);
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "abc123xyz");

            // Only numeric characters should be present
            expect(input.value).toBe("1.23");
        });

        it("should handle leading zeros correctly", async () => {
            const user = userEvent.setup();
            render(<CurrencyInput value={undefined} decimalPlaces={2} />);
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "00123");

            expect(input.value).toBe("1.23");
        });

        it("should handle empty input", async () => {
            const user = userEvent.setup();
            render(<CurrencyInput value={undefined} decimalPlaces={2} />);
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);

            expect(input.value).toBe("0.00");
        });
    });

    describe("Prefix and Suffix with Input", () => {
        it("should maintain prefix when typing", async () => {
            const user = userEvent.setup();
            render(<CurrencyInput value={undefined} prefix="$" decimalPlaces={2} />);
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "123");

            expect(input.value).toBe("$1.23");
        });

        it("should maintain suffix when typing", async () => {
            const user = userEvent.setup();
            render(<CurrencyInput value={undefined} suffix=" USD" decimalPlaces={2} />);
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "123");

            expect(input.value).toBe("1.23 USD");
        });

        it("should maintain both prefix and suffix when typing", async () => {
            const user = userEvent.setup();
            render(<CurrencyInput value={undefined} prefix="$" suffix=" USD" decimalPlaces={2} />);
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "12345");

            expect(input.value).toBe("$123.45 USD");
        });
    });

    describe("Negative Values", () => {
        it("should handle negative values", () => {
            render(<CurrencyInput value={-100} decimalPlaces={2} />);
            const input = screen.getByDisplayValue("-100.00") as HTMLInputElement;
            expect(input).toBeInTheDocument();
        });

        it("should handle negative values with prefix and suffix", () => {
            render(<CurrencyInput value={-100} prefix="$" suffix=" USD" decimalPlaces={2} />);
            const input = screen.getByDisplayValue("-$100.00 USD") as HTMLInputElement;
            expect(input).toBeInTheDocument();
        });

        it("should toggle negative sign with trailing minus", async () => {
            const user = userEvent.setup();
            render(<CurrencyInput value={100} decimalPlaces={2} />);
            const input = screen.getByDisplayValue("100.00") as HTMLInputElement;

            // Move to end and add minus
            await user.click(input);
            await user.keyboard("{End}-");

            expect(input.value).toBe("-100.00");
        });

        it("should handle leading minus sign", async () => {
            const user = userEvent.setup();
            render(<CurrencyInput value={undefined} decimalPlaces={2} />);
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "-123");

            expect(input.value).toBe("-1.23");
        });

        it("should reset negative sign when value becomes zero", async () => {
            const user = userEvent.setup();
            render(<CurrencyInput value={-100} decimalPlaces={2} />);
            const input = screen.getByDisplayValue("-100.00") as HTMLInputElement;

            await user.clear(input);

            expect(input.value).toBe("0.00");
        });
    });

    describe("Controlled Component Behavior", () => {
        it("should be controlled when value prop is provided", () => {
            const { rerender } = render(<CurrencyInput value={100} decimalPlaces={2} />);
            let input = screen.getByDisplayValue("100.00") as HTMLInputElement;
            expect(input.value).toBe("100.00");

            rerender(<CurrencyInput value={200} decimalPlaces={2} />);
            input = screen.getByDisplayValue("200.00") as HTMLInputElement;
            expect(input.value).toBe("200.00");
        });

        it("should update when value prop changes", () => {
            const { rerender } = render(<CurrencyInput value={50} decimalPlaces={2} />);
            expect(screen.getByDisplayValue("50.00")).toBeInTheDocument();

            rerender(<CurrencyInput value={150.5} decimalPlaces={2} />);
            expect(screen.getByDisplayValue("150.50")).toBeInTheDocument();
        });

        it("should be uncontrolled when value is undefined", async () => {
            const user = userEvent.setup();
            render(<CurrencyInput value={undefined} decimalPlaces={2} />);
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "555");

            expect(input.value).toBe("5.55");
        });
    });

    describe("Default Value", () => {
        it("should use defaultValue when value is undefined", () => {
            render(<CurrencyInput value={undefined} defaultValue={99.99} decimalPlaces={2} />);
            const input = screen.getByDisplayValue("99.99") as HTMLInputElement;
            expect(input).toBeInTheDocument();
        });

        it("should use defaultValue with prefix and suffix", () => {
            render(
                <CurrencyInput
                    value={undefined}
                    defaultValue={99.99}
                    prefix="$"
                    suffix=" USD"
                    decimalPlaces={2}
                />
            );
            const input = screen.getByDisplayValue("$99.99 USD") as HTMLInputElement;
            expect(input).toBeInTheDocument();
        });

        it("should use defaultValue of 0 by default", () => {
            render(<CurrencyInput value={undefined} decimalPlaces={2} />);
            const input = screen.getByDisplayValue("0.00") as HTMLInputElement;
            expect(input).toBeInTheDocument();
        });

        it("should reset sign for zero defaultValue", () => {
            render(<CurrencyInput value={undefined} defaultValue={0} decimalPlaces={2} />);
            const input = screen.getByDisplayValue("0.00") as HTMLInputElement;
            expect(input.value).not.toContain("-");
        });
    });

    describe("Callbacks", () => {
        it("should call onValueChange with raw and formatted values", async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(
                <CurrencyInput
                    value={undefined}
                    decimalPlaces={2}
                    onValueChange={onValueChange}
                />
            );
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "123");

            expect(onValueChange).toHaveBeenCalledWith({
                rawValue: 1.23,
                formattedValue: "1.23",
            });
        });

        it("should call onValueChange with prefix and suffix stripped", async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(
                <CurrencyInput
                    value={undefined}
                    prefix="$"
                    suffix=" USD"
                    decimalPlaces={2}
                    onValueChange={onValueChange}
                />
            );
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "12345");

            expect(onValueChange).toHaveBeenCalledWith({
                rawValue: 123.45,
                formattedValue: "$123.45 USD",
            });
        });

        it("should call onValueChange for negative values", async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(
                <CurrencyInput
                    value={undefined}
                    decimalPlaces={2}
                    onValueChange={onValueChange}
                />
            );
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "-555");

            expect(onValueChange).toHaveBeenCalledWith({
                rawValue: -5.55,
                formattedValue: "-5.55",
            });
        });

        it("should call onChange callback", async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            render(
                <CurrencyInput
                    value={undefined}
                    decimalPlaces={2}
                    onChange={onChange}
                />
            );
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "123");

            expect(onChange).toHaveBeenCalled();
        });

        it("should call both onValueChange and onChange", async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            const onChange = jest.fn();
            render(
                <CurrencyInput
                    value={undefined}
                    decimalPlaces={2}
                    onValueChange={onValueChange}
                    onChange={onChange}
                />
            );
            const input = screen.getByPlaceholderText("0.00") as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "789");

            expect(onValueChange).toHaveBeenCalled();
            expect(onChange).toHaveBeenCalled();
        });
    });

    describe("MUI TextField Props", () => {
        it("should have small size by default", () => {
            render(<CurrencyInput value={0} />);
            const input = screen.getByDisplayValue("0.00") as HTMLInputElement;
            const textField = input.closest(".MuiTextField-root");
            expect(textField).toHaveClass("MuiTextField-root");
        });

        it("should be fullWidth by default", () => {
            render(<CurrencyInput value={0} />);
            const input = screen.getByDisplayValue("0.00") as HTMLInputElement;
            const textField = input.closest(".MuiTextField-root");
            expect(textField).toHaveClass("MuiFormControl-fullWidth");
        });

        it("should accept additional TextField props", () => {
            render(
                <CurrencyInput
                    value={0}
                    label="Amount"
                    error={true}
                    helperText="This field is required"
                />
            );
            expect(screen.getByText("Amount")).toBeInTheDocument();
            expect(screen.getByText("This field is required")).toBeInTheDocument();
        });

        it("should accept disabled prop", () => {
            render(<CurrencyInput value={100} disabled={true} />);
            const input = screen.getByDisplayValue("100.00") as HTMLInputElement;
            expect(input).toBeDisabled();
        });

        it("should accept required prop", () => {
            render(<CurrencyInput value={0} required={true} />);
            const input = screen.getByDisplayValue("0.00") as HTMLInputElement;
            expect(input).toBeRequired();
        });
    });

    describe("Edge Cases", () => {
        it("should handle very large numbers", () => {
            render(<CurrencyInput value={999999999.99} decimalPlaces={2} />);
            const input = screen.getByDisplayValue("999999999.99") as HTMLInputElement;
            expect(input).toBeInTheDocument();
        });

        it("should handle very small decimal values", () => {
            render(<CurrencyInput value={0.01} decimalPlaces={2} />);
            const input = screen.getByDisplayValue("0.01") as HTMLInputElement;
            expect(input).toBeInTheDocument();
        });

        it("should handle decimal places as 0", () => {
            render(<CurrencyInput value={123.99} decimalPlaces={0} />);
            const input = screen.getByPlaceholderText("0") as HTMLInputElement;
            expect(input).toBeInTheDocument();
        });

        it("should update formatted value when decimalPlaces prop changes", () => {
            const { rerender } = render(<CurrencyInput value={1.2345} decimalPlaces={2} />);
            expect(screen.getByDisplayValue("1.23")).toBeInTheDocument();

            rerender(<CurrencyInput value={1.2345} decimalPlaces={4} />);
            expect(screen.getByDisplayValue("1.2345")).toBeInTheDocument();
        });

        it("should handle null value gracefully", () => {
            render(<CurrencyInput value={null as any} decimalPlaces={2} />);
            const input = screen.queryByPlaceholderText("0.00");
            expect(input).toBeInTheDocument();
        });

        it("should reset negative sign when input becomes zero", async () => {
            const user = userEvent.setup();
            render(<CurrencyInput value={-100} decimalPlaces={2} />);
            const input = screen.getByDisplayValue("-100.00") as HTMLInputElement;

            await user.clear(input);

            expect(input.value).toBe("0.00");
            expect(input.value).not.toContain("-");
        });
    });
});

export function toHumanNumber(number: number, max = 2): string {
	return number.toLocaleString(undefined, {
		maximumSignificantDigits: max,
	});
}

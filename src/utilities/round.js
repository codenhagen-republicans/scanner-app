export default function round(value) {
	const decimals = Math.max(0, 3 - String(Math.floor(value)).length);
	const roundedValue = +value.toFixed(decimals);
	return Number(roundedValue);
}

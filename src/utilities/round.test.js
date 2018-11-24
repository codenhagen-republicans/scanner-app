import round from './round';

describe('Round function', () => {
	it('gives two decimal', () => {
		const num = round(1.12123123);
		expect(num).toBe(1.12);
	});
	it('gives one decimal', () => {
		const num = round(10.12123123);
		expect(num).toBe(10.1);
	});
	it('gives no decimals', () => {
		const num = round(100.12123123);
		expect(num).toBe(100);
	});
});

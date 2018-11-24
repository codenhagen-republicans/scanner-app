import { Container } from 'unstated';
import Config from 'react-native-config';

export const LOADING = 'PRODUCT_LOADING';
export const FAILED = 'PRODUCT_FAILED';
export const LOADED = 'PRODUCT_LOADED';
export const MISSING = 'PRODUCT_MISSING';

const wait = ms =>
	new Promise(resolve => {
		setTimeout(resolve, ms);
	});

export default class CartContainer extends Container {
	state = {
		products: [],
	};

	barCodeRead = barCode => {
		const { data: ean } = barCode;
		this.fetch(ean);
	};

	fetch = async ean => {
		this.add({ key: ean, status: LOADING });
		// await wait(300);
		try {
			// TODO: correct url
			const response = await fetch(
				`${Config.API_URL}/footprint?ean=${encodeURIComponent(ean)}`,
				{
					method: 'get',
				}
			);
			var product = await response.json();
            product = product.product;

			if (!product || product.length === 0) {
				this.update(ean, {
					status: MISSING,
				});
				return;
			}

			this.update(ean, {
				status: LOADED,
				name: (product.name && product.name.english) || 'No name',
				footprint: product.footprint,
				image: product.image,
			});
		} catch (e) {
			this.update(ean, {
				status: FAILED,
			});
		}
	};

	add = product => {
		if (this.state.products.some(({ key }) => key === product.key)) {
			return;
		}

		this.setState({
			products: [product, ...this.state.products],
		});
	};

	remove = productKey => {
		this.setState({
			products: this.state.products.filter(
				product => product.key !== productKey
			),
		});
	};

	update = (productKey, info) => {
		const products = this.state.products.map(product => {
			if (product.key === productKey) {
				return { ...product, ...info };
			}
			return product;
		});
		this.setState({ products });
	};

	retry = ean => {
		this.update(ean, {
			status: LOADING,
		});
		this.fetch(ean);
	};

    clean = () => {
        this.setState({
            products: [],
        });
    };
}

// { name:
// 11-24 20:08:31.589 22648 23132 I ReactNativeJS:    { swedish: 'Old El Paso original salsa 340g hot',
// 11-24 20:08:31.589 22648 23132 I ReactNativeJS:      finnish: 'Old El Paso original salsa 340g hot',
// 11-24 20:08:31.589 22648 23132 I ReactNativeJS:      english: 'Old El Paso original salsa 340g hot' },
// 11-24 20:08:31.589 22648 23132 I ReactNativeJS:   image: 'https://public.keskofiles.com/f/k-ruoka/product/8410076400024',
// 11-24 20:08:31.589 22648 23132 I ReactNativeJS:   weight: 0.34,
// 11-24 20:08:31.589 22648 23132 I ReactNativeJS:   ingredients:
// 11-24 20:08:31.589 22648 23132 I ReactNativeJS:    [ { name: 'tomat', weight: 0.18360000000000004, percentage: 54 },
// 11-24 20:08:31.589 22648 23132 I ReactNativeJS:      { name: 'lök', weight: 0.054400000000000004, percentage: 16 },
// 11-24 20:08:31.589 22648 23132 I ReactNativeJS:      { name: 'salt', weight: 0.00578, percentage: 1.7 } ],
// 11-24 20:08:31.589 22648 23132 I ReactNativeJS:   segment: { finnish: 'Taco- ja salsakastikkeet', id: '4730' },
// 11-24 20:08:31.589 22648 23132 I ReactNativeJS:   ean: '8410076400024',
// 11-24 20:08:31.589 22648 23132 I ReactNativeJS:   footprint: 0.16864000000000004 }

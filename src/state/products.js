import { Container } from 'unstated';
import Config from 'react-native-config';

export const LOADING = 'PRODUCT_LOADING';
export const FAILED = 'PRODUCT_FAILED';
export const LOADED = 'PRODUCT_LOADED';

const wait = ms =>
	new Promise(resolve => {
		setTimeout(resolve, ms);
	});

export default class ProductsContainer extends Container {
	state = {
		products: [],
	};

	barCodeRead = barCode => {
		const { data: ean } = barCode;
		this.fetch(ean);
	};

	fetch = async ean => {
		this.add({ key: ean, status: LOADING });
		await wait(300);
		try {
			// TODO: correct url
			const response = await fetch(
				`${Config.API_URL}/footprint?ean=${encodeURIComponent(ean)}`,
				{
					method: 'get',
				}
			);
			const product = await response.json();
			this.update(ean, {
				status: LOADED,
				title: product.title,
				co2: product.co2,
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
}

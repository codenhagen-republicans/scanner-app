import { Container } from 'unstated';
import Config from 'react-native-config';
import axios from 'axios';

import cart from '../utilities/cart';

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
			const response = await axios.get(`${Config.API_URL}/footprint`, {
                params: {
                    ean: ean,
                },
            });

			var product = await response;
            product = product.data.product;

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

    save = () => cart.upload(this.state.products);
}

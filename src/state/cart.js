import { Container } from 'unstated';
import Config from 'react-native-config';
import axios from 'axios';
import throttle from 'lodash/throttle';

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
		products: [
            {
                key: '8410076400024',
                status: 'PRODUCT_LOADED',
                name: 'Old El Paso original salsa 340g hot',
                footprint: 0.16864000000000004,
                image: 'https://public.keskofiles.com/f/k-ruoka/product/8410076400024',
                quantity: 1,
            }
        ],
	};

	barCodeRead = throttle(barCode => {
		const { data: ean } = barCode;
		this.fetch(ean);
	}, 1000, {leading: true, trailing: false});

	fetch = async ean => {
		const added = this.add({ key: ean, status: LOADING });
        if (added) {
            return;
        }

		// await wait(300);
		try {
			// TODO: correct url
			const response = await axios.get(`${Config.API_URL}/footprint`, {
                params: {
                    ean: ean,
                },
            });

			var productResp = await response;
            product = productResp.data.product;
            recommended = productResp.data.recommendation;
            recommended.name = (recommended.name && recommended.name.english) || 'No name';

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
                quantity: 1,
                recommended: recommended,
			});
		} catch (e) {
			this.update(ean, {
				status: FAILED,
			});
		}
	};

	add = product => {
        const found = this.state.products
                .filter(({ key }) => key === product.key)
		if (found.length > 0) {
            this.update(product.key, {
                quantity: found[0].quantity + 1,
            });
            return true;
		}

		this.setState({
			products: [product, ...this.state.products],
		});
	};

	remove = productKey => {
        const newProducts = this.state.products
            .map(product => {
                const newProduct = Object.assign({}, product);
                newProduct.quantity -= 1;
                return newProduct;
            })
            .filter(product => product.quantity > 0);

		this.setState({
			products: newProducts,
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

    save = axios => cart.upload(axios, this.state.products);
}

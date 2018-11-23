import { Container } from 'unstated';

export default class ProductsContainer extends Container {
	state = {
		products: [],
	};

	barCodeRead = barCode => {
		const { data } = barCode;
		this.add({ key: data, title: data, loading: true });
	};

	add = product => {
		if (this.state.products.some(({ key }) => key === product.key)) {
			return;
		}

		this.setState({
			products: [...this.state.products, product],
		});

		setTimeout(() => {
			this.update(product.key, {
				loading: false,
				co2: Math.floor(Math.random() * 100) / 100,
			});
		}, 350);
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
}

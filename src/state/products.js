import { Container } from 'unstated';

export default class ProductsContainer extends Container {
	state = {
		products: [],
	};

	barCodeRead = barCode => {
		const { data } = barCode;
		this.add({ key: data, title: data });
	};

	add = product => {
		if (this.state.products.some(({ key }) => key === product.key)) {
			return;
		}

		this.setState({
			products: [...this.state.products, product],
		});
	};

	remove = productKey => {
		this.setState({
			products: this.state.products.filter(
				product => product.key !== productKey
			),
		});
	};
}

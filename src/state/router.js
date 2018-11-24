import { Container } from 'unstated';

export const INDEX = 'ROUTE_INDEX';
export const SCANNER = 'ROUTE_SCANNER';
export const CARTS = 'ROUTE_CARTS';

export default class RouterContainer extends Container {
	state = {
		view: INDEX,
	};

	go = view => this.setState({ view });

	goToIndex = () => this.go(INDEX);
	goToScanner = () => this.go(SCANNER);
    goToCarts = this.go.bind(this, CARTS);
}

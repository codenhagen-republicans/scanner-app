import { Container } from 'unstated';

export const INDEX = 'ROUTE_INDEX';
export const SCANNER = 'ROUTE_SCANNER';
export const LOGIN = 'ROUTE_LOGIN';

export default class RouterContainer extends Container {
	state = {
		view: INDEX,
	};

	go = view => this.setState({ view });

	goToIndex = () => this.go(INDEX);
	goToScanner = () => this.go(SCANNER);
	goToLogin = () => this.go(LOGIN);
}

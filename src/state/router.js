import { Container } from 'unstated';

export const INDEX = 'ROUTE_INDEX';
export const SCANNER = 'ROUTE_SCANNER';
export const LOGIN = 'ROUTE_LOGIN';
export const REGISTRATION = 'ROUTE_REGISTRATION';

export default class RouterContainer extends Container {
	state = {
		view: INDEX,
	};

	go = view => this.setState({ view });

	goToIndex = () => this.go(INDEX);
	goToScanner = () => this.go(SCANNER);
	goToLogin = () => this.go(LOGIN);
	goToRegistration = () => this.go(REGISTRATION);
}

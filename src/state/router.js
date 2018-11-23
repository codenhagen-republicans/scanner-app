import { Container } from 'unstated';

export const INDEX = Symbol('index');
export const SCANNER = Symbol('scanner');

export default class RouterContainer extends Container {
	state = {
		view: INDEX,
	};

	go = view => this.setState({ view });

	goToIndex = () => this.go(INDEX);
	goToScanner = () => this.go(SCANNER);
}

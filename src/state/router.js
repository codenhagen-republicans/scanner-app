import { Container } from 'unstated';

export default class RouterContainer extends Container {
	state = {
		view: 'index',
	};

	go = view => this.setState({ view });
}

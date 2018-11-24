import { Container } from 'unstated';

export const CARTS = 'ROUTE_CARTS';
export const INDEX = 'ROUTE_INDEX';
export const LOGIN = 'ROUTE_LOGIN';
export const SCANNER = 'ROUTE_SCANNER';
export const VIEW_CART = 'ROUTE_VIEW_CART';

export default class RouterContainer extends Container {
	state = {
		view: INDEX,
        currentCart: [],
	};

	go = view => this.setState({ view });

    goToCarts = this.go.bind(this, CARTS);
	goToIndex = () => this.go(INDEX);
    goToLogin = () => this.go(LOGIN);
    goToScanner = () => this.go(SCANNER);
    goToViewCart = (cart) => {
        this.setState({
            currentCart: cart,
            view: VIEW_CART
        });
    };
}

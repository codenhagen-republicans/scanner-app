import React from 'react';
import { Provider, Subscribe } from 'unstated';
import RouterContainer, {
	CARTS,
	INDEX,
	LOGIN,
	SCANNER,
	VIEW_CART,
} from './state/router';
import RouteCarts from './components/route-carts';
import RouteIndex from './components/route-index';
import RouteLogin from './components/route-login';
import RouteScanner from './components/route-scanner';
import RouteViewCart from './components/route-view-cart';
import RouteNotFound from './components/route-not-found';

export default class App extends React.Component {
	render() {
		return (
			<Provider>
				<Subscribe to={[RouterContainer]}>
					{router => {
						let route;
						switch (router.state.view) {
							case CARTS:
								return <RouteCarts />;
							case INDEX:
								return <RouteIndex />;
							case LOGIN:
								return <RouteLogin />;
							case SCANNER:
								return <RouteScanner />;
							case VIEW_CART:
								return <RouteViewCart cart={router.state.currentCart} />;
							default:
								route = <RouteNotFound />;
						}

						return (
							<>
								<PersistRouterState go={router.go} route={router.state.view} />
								{route}
							</>
						);
					}}
				</Subscribe>
			</Provider>
		);
	}
}

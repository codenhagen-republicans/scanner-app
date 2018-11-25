import React from 'react';
import { Provider, Subscribe } from 'unstated';
import RouterContainer, {
	CARTS,
	INDEX,
	LOGIN,
	SCANNER,
	VIEW_CART,
	REGISTRATION,
} from './state/router';
import UserContainer from './state/user';
import PersistUserState from './components/persist-user-state';
import PersistRouterState from './components/persist-router-state';
import RouteCarts from './components/route-carts';
import RouteIndex from './components/route-index';
import RouteLogin from './components/route-login';
import RouteScanner from './components/route-scanner';
import RouteViewCart from './components/route-view-cart';
import RouteRegistration from './components/route-registration';
import RouteNotFound from './components/route-not-found';

export default class App extends React.Component {
	render() {
		return (
			<Provider>
				<Subscribe to={[RouterContainer, UserContainer]}>
					{(router, user) => {
						let route;
						switch (router.state.view) {
							case CARTS:
								route = <RouteCarts />;
								break;
							case INDEX:
								route = <RouteIndex />;
								break;
							case LOGIN:
								route = <RouteLogin />;
								break;
							case SCANNER:
								route = <RouteScanner />;
								break;
							case VIEW_CART:
								route = <RouteViewCart cart={router.state.currentCart} />;
								break;
							case REGISTRATION:
								route = <RouteRegistration />;
								break;
							default:
								route = <RouteNotFound />;
						}

						return (
							<>
								<PersistUserState
									setState={user.load}
									user={user.state}
								/>
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

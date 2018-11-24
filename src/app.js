import React from 'react';
import { Provider, Subscribe } from 'unstated';
import RouterContainer, { CARTS, INDEX, LOGIN, SCANNER } from './state/router';
import RouteCarts from './components/route-carts';
import RouteIndex from './components/route-index';
import RouteLogin from './components/route-login';
import RouteScanner from './components/route-scanner';
import RouteNotFound from './components/route-not-found';

export default class App extends React.Component {
	render() {
		return (
			<Provider>
				<Subscribe to={[RouterContainer]}>
					{router => {
						switch (router.state.view) {
                            case CARTS:
                                return <RouteCarts />;
							case INDEX:
								return <RouteIndex />;
                            case LOGIN:
                                return <RouteLogin />;
                            case SCANNER:
                                return <RouteScanner />;
							default:
								return <RouteNotFound />;
						}
					}}
				</Subscribe>
			</Provider>
		);
	}
}

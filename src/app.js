import React from 'react';
import { Provider, Subscribe } from 'unstated';
import RouterContainer, { INDEX, SCANNER, CARTS } from './state/router';
import RouteIndex from './components/route-index';
import RouteScanner from './components/route-scanner';
import RouteCarts from './components/route-carts';
import RouteNotFound from './components/route-not-found';

export default class App extends React.Component {
	render() {
		return (
			<Provider>
				<Subscribe to={[RouterContainer]}>
					{router => {
						switch (router.state.view) {
							case INDEX:
								return <RouteIndex />;
							case SCANNER:
								return <RouteScanner />;
                            case CARTS:
                                return <RouteCarts />;
							default:
								return <RouteNotFound />;
						}
					}}
				</Subscribe>
			</Provider>
		);
	}
}

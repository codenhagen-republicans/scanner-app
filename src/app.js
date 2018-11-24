import React from 'react';
import { Provider, Subscribe } from 'unstated';
import RouterContainer, { INDEX, SCANNER, LOGIN } from './state/router';
import PersistRouterState from './components/persist-router-state';
import RouteIndex from './components/route-index';
import RouteScanner from './components/route-scanner';
import RouteLogin from './components/route-login';
import RouteNotFound from './components/route-not-found';

export default class App extends React.Component {
	render() {
		return (
			<Provider>
				<Subscribe to={[RouterContainer]}>
					{router => {
						let route;
						switch (router.state.view) {
							case INDEX:
								route = <RouteIndex />;
								break;
							case SCANNER:
								route = <RouteScanner />;
								break;
							case LOGIN:
								route = <RouteLogin />;
								break;
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

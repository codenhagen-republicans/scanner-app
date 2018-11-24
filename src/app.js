import React from 'react';
import { Provider, Subscribe } from 'unstated';
import RouterContainer, { INDEX, SCANNER, LOGIN } from './state/router';
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
						switch (router.state.view) {
							case INDEX:
								return <RouteIndex />;
							case SCANNER:
								return <RouteScanner />;
							case LOGIN:
								return <RouteLogin />;
							default:
								return <RouteNotFound />;
						}
					}}
				</Subscribe>
			</Provider>
		);
	}
}

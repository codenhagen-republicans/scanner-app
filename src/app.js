import React from 'react';
import { Provider, Subscribe } from 'unstated';
import RouterContainer, {
	INDEX,
	SCANNER,
	LOGIN,
	REGISTRATION,
} from './state/router';
import UserContainer from './state/user';
import PersistUserState from './components/persist-user-state';
import PersistRouterState from './components/persist-router-state';
import RouteIndex from './components/route-index';
import RouteScanner from './components/route-scanner';
import RouteLogin from './components/route-login';
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
							case INDEX:
								route = <RouteIndex />;
								break;
							case SCANNER:
								route = <RouteScanner />;
								break;
							case LOGIN:
								route = <RouteLogin />;
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
									setState={user.setState.bind(user)}
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

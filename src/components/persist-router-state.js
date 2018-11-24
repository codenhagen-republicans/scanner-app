import React from 'react';
import { AsyncStorage } from 'react-native';

const ROUTER_STATE_KEY = 'ROUTE';

export default class PersistRouterState extends React.Component {
	componentDidMount() {
		AsyncStorage.getItem(ROUTER_STATE_KEY).then(previousRoute => {
			if (previousRoute) {
				this.props.go(previousRoute);
			}
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.route !== this.props.route) {
			AsyncStorage.setItem(ROUTER_STATE_KEY, this.props.route);
		}
	}

	render() {
		return <></>;
	}
}

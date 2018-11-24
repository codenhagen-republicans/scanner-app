import React from 'react';
import { AsyncStorage } from 'react-native';

const USER_STATE_KEY = 'USER';

export default class PersistUserState extends React.Component {
	componentDidMount() {
		AsyncStorage.getItem(USER_STATE_KEY).then(userState => {
			if (userState) {
				userState = JSON.parse(userState);
				console.log('what is userState', userState);
				this.props.setState({ ...userState });
			}
		});
	}

	componentDidUpdate(prevProps) {
		const propsJson = JSON.stringify(this.props.user);
		const prevPropsJson = JSON.stringify(prevProps);

		console.log(propsJson, prevPropsJson);

		if (prevPropsJson !== propsJson) {
			const toPersist = {
				...this.props.user,
				errorMessage: null,
				submitting: false,
			};
			console.log('to persist', toPersist);
			AsyncStorage.setItem(USER_STATE_KEY, JSON.stringify(toPersist));
		}
	}

	render() {
		return <></>;
	}
}

import { Container } from 'unstated';
import Config from 'react-native-config';
import axios from 'axios';

export default class UserContainer extends Container {
	state = {
		username: null,
		accessToken: '',
		refreshToken: '',
		submitting: false,
		errorMessage: null,
	};

    makeAxios = (accessToken, refreshToken) => axios.create({
        baseURL: Config.APP_BACKEND_API_URL,
        headers: {
            common: {
                ['Authorization']: 'Bearer ' + accessToken
            }
        },
    });

    load = state => {
        state.axios = this.makeAxios(state.accessToken, state.refreshToken);
        this.setState(state);
    };

	login = async (username, password) => {
		this.setState({ submitting: true, errorMessage: null });
		try {
			console.log(JSON.stringify({ username, password }));
			const res = await fetch(`${Config.APP_BACKEND_API_URL}/login`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});
			const body = await res.json();

			this.setState({
				submitting: false,
				errorMessage:
					typeof body.message === 'string' ? body.message : 'Maybe?',
				username,
				accessToken: body.access_token,
				refreshToken: body.refresh_token,
                axios: this.makeAxios(body.access_token, body.refresh_token)
			});
		} catch (e) {
			this.setState({
				submitting: false,
				errorMessage: e.toString(), // todo: get correct message
			});
		}
	};

	register = async (username, password) => {
		this.setState({ submitting: true, errorMessage: null });
		try {
			const res = await fetch(`${Config.APP_BACKEND_API_URL}/registration`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});
			const body = await res.json();

			this.setState({
				submitting: false,
				errorMessage:
					typeof body.message === 'string'
						? body.message
						: 'An error occurred.',
				username,
				accessToken: body.access_token,
				refreshToken: body.refresh_token,
                axios: this.makeAxios(body.access_token, body.refresh_token)
			});
		} catch (e) {
			this.setState({
				submitting: false,
				errorMessage: e.message
			});
		}
	};

	logout = async () => {
		this.setState({ submitting: true, errorMessage: null });
		try {
			const res = await fetch(`${Config.APP_BACKEND_API_URL}/logout/access`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.state.accessToken}`,
				},
			});

			const body = await res.json();

			this.setState({
				submitting: false,
				errorMessage:
					typeof body.message === 'string' ? body.message : 'You were logged out.',
				username: null,
				accessToken: '',
				refreshToken: '',
			});
		} catch (e) {
			this.setState({
				submitting: false,
				errorMessage: e.message,
			});
		}
	};
}

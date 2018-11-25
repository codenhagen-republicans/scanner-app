import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

const randomColor = () =>
	('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);

export default class PieFootprint extends React.PureComponent {
	state = {
		loading: false,
		foods: [],
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData = async () => {
		this.setState({ loading: true });
		try {
			const res = await fetch(
				`${Config.APP_BACKEND_API_URL}/footprint/product`,
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${this.props.user.state.accessToken}`,
					},
					body: JSON.stringify({
						start_at: '2018-11-20',
						end_at: '2018-11-30',
					}),
				}
			);

			const body = await res.json();
			const foods = body.foods.map(food => ({
				...food,
				color: randomColor(),
			}));

			this.setState({
				loading: false,
				foods,
			});
		} catch (e) {
			this.setState({
				loading: false,
			});
		}
	};

	render() {
		let data;

		if (this.state.loading === true) {
			<View style={{ height: 200 }} />;
		}

		if (
			(!this.state.foods || this.state.foods.length === 0) &&
			this.state.loading === false
		) {
			return <></>;
		}

		const pieData = this.state.foods
			.filter(food => food.footprint > 0)
			.map((food, index) => ({
				value: food.footprint,
				svg: {
					fill: food.color,
					onPress: () => console.log('press', index),
				},
				key: `pie-${index}`,
			}));

		return (
			<View style={styles.chart}>
				<PieChart style={{ height: 200, width: 200 }} data={pieData} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	chart: {
		justifyContent: 'center',
	},
});

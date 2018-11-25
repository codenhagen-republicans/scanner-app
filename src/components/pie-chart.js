import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Config from 'react-native-config';
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

			const foods = body.foods
				.filter(food => food.foot_print > 0)
				.map(food => ({
					...food,
					key: food.ean,
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
			<View style={{ height: 160 }} />;
		}

		if (
			(!this.state.foods || this.state.foods.length === 0) &&
			this.state.loading === false
		) {
			return <></>;
		}

		const pieData = this.state.foods.map((food, index) => ({
			value: food.foot_print,
			svg: {
				fill: food.color,
				onPress: () => console.log('press', index),
			},
		}));

		return (
			<View style={styles.container}>
				<PieChart style={styles.chart} data={pieData} />
				<FlatList
					data={this.state.foods}
					style={styles.list}
					renderItem={this.renderItem}
				/>
			</View>
		);
	}

	renderItem = ({ item: food }) => {
		return (
			<View key={food.ean} style={styles.listItem}>
				<View
					style={{
						width: 16,
						height: 16,
						marginRight: 5,
						backgroundColor: food.color,
					}}
				/>
				<Text>{food.name}</Text>
			</View>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 5,
		height: 200,
	},
	chart: {
		width: 150,
		height: 150,
		marginRight: 10,
	},
	list: {
		height: 200,
	},
	listItem: {
        flexDirection: 'row',
        marginBottom: 4,
	},
});

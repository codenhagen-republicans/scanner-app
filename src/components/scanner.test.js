import React from 'react';
import renderer from 'react-test-renderer';
import Scanner from './scanner';

jest.mock(
	'react-native-camera',
	() => require.requireActual('../__mocks__/react-native-camera').default
);

describe('Scanner component', () => {
	it('renders', () => {
		const component = renderer.create(<Scanner />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

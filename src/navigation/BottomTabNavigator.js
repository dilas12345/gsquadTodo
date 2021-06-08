import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import AllToDoScreen from '../screens/AllToDoScreen';
import DoneScreen from '../screens/DoneScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'AllToDo';

export default function BottomTabNavigator({ navigation, route }) {
	
	navigation.setOptions({ headerTitle: getHeaderTitle(route) });

	return (
		<BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
			<BottomTab.Screen
				name="AllToDo"
				component={AllToDoScreen}
				options={{
					title: 'Add To Do',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="add-circle-outline" />,
				}}
			/>
			<BottomTab.Screen
				name="Done"
				component={DoneScreen}
				options={{
					title: 'Done Task',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="checkmark-circle-outline" />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

function getHeaderTitle(route) {
	const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

	switch (routeName) {
		case 'AllToDo':
			return 'Add To Do';
		case 'Done':
			return 'Done Task';
	}
}

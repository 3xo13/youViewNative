/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import Home from '../screens/Home'
import User from '../screens/User'
import Groups from '../screens/Groups'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getHeaderTitle } from '@react-navigation/elements'
import { Feather } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

// header: ({ navigation, route, options }) => {
// 	const title = getHeaderTitle(options, route.name);

// 	return <MyHeader title={title} style={options.headerStyle} />;
// }

const Tabs = ({ setUserLogedIn }) => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: 'tomato',
				tabBarInactiveTintColor: 'lightgray',
				tabBarStyle: {
					backgroundColor: '#242124'
				},
				headerStyle: {
					backgroundColor: '#242124'
				},
				headerTitleStyle: {
					fontWeight: 'bold',
					fontSize: 25,
					color: 'white'
				},
				headerShown: false
			}}
		>
			<Tab.Screen
				name={'Home'}
				options={{
					tabBarIcon: ({ focused }) => (
						<Feather
							name={'home'}
							size={25}
							color={focused ? 'tomato' : 'white'}
						/>
					)
				}}
			>
				{() => <Home setUserLogedIn={setUserLogedIn} />}
			</Tab.Screen>
			<Tab.Screen
				name={'Groups'}
				options={{
					tabBarIcon: ({ focused }) => (
						<Feather
							name={'users'}
							size={25}
							color={focused ? 'tomato' : 'white'}
						/>
					)
				}}
			>
				{() => <Groups />}
			</Tab.Screen>
			<Tab.Screen
				name={'User'}
				options={{
					tabBarIcon: ({ focused }) => (
						<Feather
							name={'user'}
							size={25}
							color={focused ? 'tomato' : 'white'}
						/>
					)
				}}
			>
				{() => <User />}
			</Tab.Screen>
		</Tab.Navigator>
	)
}

export default Tabs

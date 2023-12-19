/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import Home from '../screens/Home'
import User from '../screens/User'
import Groups from '../screens/Groups'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const Tabs = () => {
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
				}
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
				{() => <Home />}
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

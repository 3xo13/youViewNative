import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
// import { auth, database } from './src/firebase/firebaseConfig'
import Tabs from './src/components/Tabs'
import Login from './src/screens/Login'
import { auth } from './src/firebase/firebaseConfig'

const App = () => {
	if (!auth.currentUser) {
		return (
			<NavigationContainer>
				<Login />
			</NavigationContainer>
		)
	}

	return (
		<NavigationContainer>
			<Tabs />
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
})

export default App

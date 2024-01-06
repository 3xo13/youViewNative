import React, { useEffect, useState, createRef } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
// import { auth, database } from './src/firebase/firebaseConfig'
import Tabs from './src/components/Tabs'
import Login from './src/screens/Login'
import { auth } from './src/firebase/firebaseConfig'
import Stacks from './src/components/Stacks'
import readLocalData from './src/utils/readLocalData'
import { UserAuth } from './src/components/auth/AuthContextProvider'
import { AuthContextProvider } from './src/components/auth/AuthContextProvider'

const App = () => {
	// const { user, loading } = UserAuth()
	const [userLogedIn, setUserLogedIn] = useState(true)

	// useEffect(() => {
	// 	;(async () => {
	// 		const userData = await readLocalData('user')
	// 		if (userData) {
	// 			setUserLogedIn(true)
	// 		}
	// 	})()
	// }, [])

	return (
		<NavigationContainer>
			<AuthContextProvider>
				{!userLogedIn ? (
					<Stacks setUserLogedIn={setUserLogedIn} />
				) : (
					<Tabs setUserLogedIn={setUserLogedIn} />
				)}
			</AuthContextProvider>
			<StatusBar style={'dark'} hidden />
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

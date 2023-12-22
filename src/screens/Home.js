import { StatusBar } from 'expo-status-bar'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
	ImageBackground,
	Button,
	Pressable
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { UserAuth } from '../components/auth/AuthContextProvider'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import useGetPosts from '../utils/useGetPosts'

const Home = ({ navigation, setUserLogedIn }) => {
	const { user, loading } = UserAuth()
	useEffect(() => {
		if (!user && !loading) {
			setUserLogedIn(false)
		} else {
			setUserLogedIn(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, loading])

	const { posts, loadingPosts } = useGetPosts() // both values are undefined
	// console.log("🚀 ~ file: Home.js:31 ~ Home ~ loadingPosts:", loadingPosts)
	// console.log('🚀 ~ file: Home.js:31 ~ Home ~ posts:', posts)

	return (
		<View>
			<Text>home</Text>
			<Pressable onPress={(e) => signOut(auth)}>
				<Text>sign out</Text>
			</Pressable>
		</View>
	)
}

const pageStyles = StyleSheet.create({})

export default Home

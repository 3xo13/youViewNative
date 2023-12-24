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
import { signOut, getIdToken } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import useGetPosts from '../utils/useGetPosts'
import getTokinValue from '../utils/getTokinValue'
import readLocalData from '../utils/readLocalData'
import checkAndRenewToken from '../utils/checkAndRenewToken'
import createLocalTokin from '../utils/createLocalTokin'
import MainPost from '../components/posts/MainPost'
import { colors } from '../utils/variables/colors'

const Home = ({ navigation, setUserLogedIn }) => {
	const { user, loading } = UserAuth()

	// todo from logic map
	useEffect(() => {
		if (!user && !loading) {
			setUserLogedIn(false)
			// check if an old tokin and old user data exist
			// both functions takes a key (strin) and return a value (previously stored) of that key
			// const oldTokin = getTokinValue('accessTokin')
			// const oldUser = readLocalData('user')
			// console.log(
			// 	'🚀 ~ file: Home.js:33 ~ useEffect ~ oldUser:',
			// 	typeof oldUser
			// )
			// if (!oldTokin || !oldUser) {
			// 	// navigate to login
			// 	setUserLogedIn(false)
			// } else {
			// 	const newTokin = checkAndRenewToken()
			// 	createLocalTokin(newTokin)
			// }
		} else {
			setUserLogedIn(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, loading])

	const { posts, loadingPosts } = useGetPosts() // both values are undefined

	const postList =
		posts && posts.map((item, index) => <MainPost key={index} post={item} />)

	return (
		<View>
			<View style={styles.topWrapper}>
				<Text>Welcome {user?.username}</Text>
				<Pressable style={styles.btn} onPress={(e) => signOut(auth)}>
					<Text>sign out</Text>
				</Pressable>
			</View>

			<ScrollView style={styles.postContainer}>{postList}</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	postContainer: {
		flexDirection: 'column'
	},
	topWrapper: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		padding: 10
	},
	btn: {
		padding: 3,
		borderWidth: 2,
		maxWidth: 70,
		backgroundColor: colors.red
	}
})

export default Home

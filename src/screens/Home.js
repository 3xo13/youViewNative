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
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../components/auth/AuthContextProvider'
import { signOut, getIdToken } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import useGetPosts from '../utils/useGetPosts'
import getTokinValue from '../utils/getTokinValue'
import readLocalData from '../utils/readLocalData'
import checkAndRenewToken from '../utils/checkAndRenewToken'
import createLocalTokin from '../utils/createLocalTokin'
import MainPost from '../components/posts/MainPost'
import colors from '../utils/variables/colors'
import dimensions from '../utils/variables/dimensions'
import Loading from '../components/Loading'
import NewPost from '../utils/posts/NewPost'

const Home = ({ navigation, setUserLogedIn }) => {
	const { user, loading } = UserAuth()
	// console.log("🚀 ~ file: Home.js:29 ~ Home ~ user:", user)
	const [creatingNewPost, setCreatingNewPost] = useState(false)

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

	let postList = []
	if (posts && !loadingPosts) {
		postList = posts.map((item, index) => (
			<MainPost key={index} post={item} user={user} />
		))
	}

	return (
		<View style={styles.container}>
			{creatingNewPost && user && (
				<ScrollView style={styles.newPostWraaper}>
					<NewPost
						userId={user.userId}
						setCreatingNewPost={setCreatingNewPost}
						balance={user.userData.balance}
						user={user.userData}
					/>
				</ScrollView>
			)}
			{!creatingNewPost && (
				<View style={styles.layerWrapper} pointerEvents={'box-none'}>
					<View style={styles.layerHeader}>
						<Pressable onPress={() => setCreatingNewPost(true)}>
							<Text style={styles.headerBtn}>New Post</Text>
						</Pressable>
					</View>
				</View>
			)}

			{!creatingNewPost && (
				<ScrollView
					snapToAlignment={'start'}
					decelerationRate={'fast'}
					snapToInterval={dimensions.height - 40}
					style={styles.postContainer}
					overScrollMode={'never'}
				>
					{postList}
					{/* <Loading /> */}
				</ScrollView>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.dark
	},
	postContainer: {
		flexDirection: 'column',
		gap: 10
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
	},
	layerWrapper: {
		// backgroundColor: 'rgba(0, 0, 0, 0.5)',
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: 1
	},
	layerHeader: {
		width: '100%',
		height: '30%',
		alignItems: 'flex-end'
	},
	layerText: {
		color: 'red'
	},
	headerBtn: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: 'white',
		color: 'white',
		borderRadius: 5,
		margin: 10,
		marginTop: 20,
		backgroundColor: colors.green
	}
})

export default Home

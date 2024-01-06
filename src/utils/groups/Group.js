import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Pressable,
	TextInput,
	Image
} from 'react-native'
import colors from '../variables/colors'
import * as ImagePicker from 'expo-image-picker'
import createNewGroup from './createNewGroup'
import getGroupPosts from './getGroupPosts'
import { Feather } from '@expo/vector-icons'
import { Timestamp } from 'firebase/firestore'

const Group = ({ blockedUsers, groupId, setOpenGroup }) => {
	const [name, setName] = useState('')
	const [pageLoading, setPageLoading] = useState(false)
	const [groupPosts, setGroupPosts] = useState([])

	useEffect(() => {
		getGroupPosts(setPageLoading, setGroupPosts, groupId, blockedUsers)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const postsList =
		groupPosts &&
		groupPosts.map((post) => (
			<View key={post.postId} style={styles.postWrapper}>
				<View style={styles.userInfoWrapper}>
					<Image
						source={{ uri: post.postValue.userImage }}
						width={50}
						height={50}
						style={styles.userImage}
					/>
					<Text style={styles.username}>{post.postValue.username}</Text>
				</View>

				<Text style={styles.text}>{post.postValue.text}</Text>
				<View style={styles.timeWrapper}>
					<Text style={styles.time}>
						{post.postValue.created.toDate().toLocaleString()}
					</Text>
				</View>
			</View>
		))

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={() => setOpenGroup(false)}>
					<Feather name={'arrow-left-circle'} size={25} color={'white'} />
					{/* <Text style={styles.backBtn}>Back</Text> */}
				</Pressable>
			</View>
			{postsList}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: colors.dark,
		paddingHorizontal: 10
		// alignItems: 'center'
		// justifyContent: 'center'
	},
	header: {
		width: '100%',
		height: 70,
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingRight: 10
	},
	backBtn: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		color: 'white',
		backgroundColor: colors.red,
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 5,
		fontSize: 15
	},
	postWrapper: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: 'white',
		padding: 5
	},
	userInfoWrapper: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'flex-end'
	},
	userImage: {
		width: 40,
		height: 40,
		borderRadius: 50
	},
	username: {
		color: 'white',
		fontSize: 18
	},
	text: {
		color: 'white',
		fontSize: 15,
		marginVertical: 10
	},
	time: {
		color: 'white',
		fontSize: 10,
		marginVertical: 10
	},
	timeWrapper: {
		alignItems: 'flex-end'
	}
})

export default Group

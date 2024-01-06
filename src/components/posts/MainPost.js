import React, { useState, useEffect, useRef } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	Pressable
} from 'react-native'
import Loading from '../Loading'
import colors from '../../utils/variables/colors'
import checkAndRenewToken from '../../utils/checkAndRenewToken'
import getUserId from '../../utils/getUserId'
import { auth, database } from '../../firebase/firebaseConfig'
import {
	doc,
	updateDoc,
	increment,
	arrayRemove,
	arrayUnion,
	deleteDoc,
	addDoc,
	collection
} from 'firebase/firestore'
import { Video, ResizeMode } from 'expo-av'
import { WebView } from 'react-native-webview'
import changeYoutubeUrl from '../../utils/changeYTUrl'
import dimensions from '../../utils/variables/dimensions'
import { Feather } from '@expo/vector-icons'
import deletePost from '../../utils/posts/deletePost'
import ConfirmationMessage from '../global/ConfirmationMessage'
import NewPost from '../../utils/posts/NewPost'
import EditMainPost from '../../utils/posts/EditMainPost'

const MainPost = ({ post, user }) => {
	const {
		username,
		time,
		userId,
		link,
		cost,
		views,
		userImage,
		title,
		platform,
		watched
	} = post.postValue
	const postId = post.postId
	// post main states
	const [play, setPlay] = useState(false)
	const [timer, setTimer] = useState(time)
	const [sendReward, setSendReward] = useState(false)
	const [pageLoading, setPageLoading] = useState(false)
	const [viewed, setViewed] = useState(watched)

	const video = useRef(null)

	// post options states
	const [usePostOptions, setUsePostOptions] = useState(false)
	const [isOwner, setIsOwner] = useState(false)
	const [reporting, setReporting] = useState(false)
	const [editing, setEditing] = useState(false)
	const [reportCase, setReportCase] = useState(false)
	const [deleteConfirmation, setDeleteConfirmation] = useState(false)

	const reward = Math.floor(cost / views)
	const progressPercentage =
		viewed === 0 ? viewed : (viewed / views).toFixed(2) * 100
	const uid = auth.currentUser.uid

	let embedUrl = link
	if (platform === 'youtube') {
		embedUrl = changeYoutubeUrl(link)
	}

	// check if the user is the owner of the post
	useEffect(() => {
		if (user) {
			if (user.userId === userId) {
				setIsOwner(true)
			} else {
				setIsOwner(false)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	return (
		<View style={styles.container}>
			{deleteConfirmation && (
				<ConfirmationMessage
					message={'Are you sure you want to delete this post?'}
					cancel={setDeleteConfirmation}
					confirm={{
						type: 'Delete',
						func: () => deletePost(setPageLoading, uid, postId)
					}}
				/>
			)}

			{/* {editing && <EditMainPost />} */}

			{/* overlay */}
			<View style={styles.layer} pointerEvents={'box-none'}>
				<View style={styles.layerBody}>
					{/* info */}
					<View style={styles.infoWrapper}>
						<View style={[styles.userInfoWrapper]}>
							<Image
								source={{ uri: userImage }}
								width={50}
								height={50}
								style={styles.userImage}
							/>
							<Text style={styles.username}>{username}</Text>
						</View>

						<View style={[styles.postInfoWrapper]}>
							<Text style={styles.title}>{title}</Text>
						</View>
					</View>

					{/* options */}
					<View style={styles.btnsWrapper}>
						{!isOwner && (
							<Pressable>
								<Feather name={'slash'} size={25} color={'white'} />
							</Pressable>
						)}
						{/* {isOwner && (
								<Pressable onPress={(e) => setEditing(true)}>
									<Feather name={'edit'} size={25} color={colors.green} />
								</Pressable>
							)} */}
						{isOwner && (
							<Pressable onPress={(e) => setDeleteConfirmation(true)}>
								<Feather name={'trash-2'} size={25} color={colors.red} />
							</Pressable>
						)}
					</View>
				</View>
			</View>
			<View
				style={[
					styles.wrapper,
					{ height: platform === 'facebook' ? 620 : 620 } //dimensions.height - 20
				]}
			>
				<WebView
					source={{
						uri: embedUrl
					}}
					style={[styles.web]}
				/>
			</View>
		</View>
	)
}
// className={'w-[50%] h-2 rounded bg-white mx-3'}
const styles = StyleSheet.create({
	container: {
		width: dimensions.width,
		height: dimensions.height - 40,
		backgroundColor: colors.dark,
		alignItems: 'center',
		justifyContent: 'center'
	},
	web: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	wrapper: {
		width: dimensions.width,
		height: dimensions.height - 20,
		backgroundColor: 'white'
	},
	layer: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: 1,
		justifyContent: 'flex-end'
	},
	layerBody: {
		width: '100%',
		flexDirection: 'row',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		padding: 10
	},
	infoWrapper: {
		width: '90%'
	},
	btnsWrapper: {
		width: '10%',
		alignItems: 'center'
	},
	userInfoWrapper: {
		flexDirection: 'row',
		alignItems: 'flex-end'
	},
	postInfoWrapper: {
		marginBottom: 10
	},
	userImage: {
		width: 70,
		height: 70,
		margin: 10,
		borderRadius: 50
	},
	username: {
		marginBottom: 10,
		color: 'white',
		fontSize: 20
	},
	title: {
		width: '100%',
		color: 'white',
		fontSize: 15,
		padding: 5
	},
	newPostWraaper: {
		left: 0,
		right: 0,
		top: 0,
		width: '100%',
		position: 'absolute',
		zIndex: 3,
		backgroundColor: 'rgba(0, 0, 0, 0.9)'
	}
})

export default MainPost

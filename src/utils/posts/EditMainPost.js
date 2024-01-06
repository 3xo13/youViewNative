import React, { useMemo, useState } from 'react'
import { Pressable, StyleSheet, View, Text, TextInput } from 'react-native'
import colors from '../../utils/variables/colors'
import Slider from '@react-native-community/slider'
import RadioGroup from 'react-native-radio-buttons-group'
import platforms from '../variables/platform'
import dimensions from '../variables/dimensions'
import createNewPost from './createNewPost'
import { Timestamp } from 'firebase/firestore'

const EditMainPost = ({ userId, setCreatingNewPost, balance, user }) => {
	const [title, setTitle] = useState('') // <= description
	const [link, setLink] = useState('')
	const [time, setTime] = useState(45)
	const [views, setViews] = useState(5)
	const [platform, setPlatform] = useState('youtube')
	const [pageLoading, setPageLoading] = useState(false)

	const postCost = Math.round((time / 60) * 20 * views)

	const radioButtons = useMemo(() => platforms, [])

	const handleNewPost = () => {
		if (!link) {
			return
		} else {
			const newPostData = {
				link,
				cost: postCost,
				title,
				views,
				time,
				platform,
				userImage: user.profile_picture,
				username: user.username,
				userId: userId,
				watched: 0,
				date: Timestamp.now()
			}
			createNewPost(setPageLoading, newPostData, setCreatingNewPost)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.balance}>You Balance: {balance}</Text>
				<Pressable onPress={(e) => setCreatingNewPost(false)}>
					<Text style={styles.headerBtn}>Cancel</Text>
				</Pressable>
			</View>
			<View style={styles.bodyWrapper}>
				{/* title (description) */}
				<View style={styles.inputWrapper}>
					<Text style={styles.label}>Post Description</Text>
					<TextInput
						style={styles.input}
						onChangeText={setTitle}
						value={title}
					/>
				</View>
				{/* Link */}
				<View style={styles.inputWrapper}>
					<Text style={styles.label}>Link</Text>
					<TextInput style={styles.input} onChangeText={setLink} value={link} />
				</View>
				{/* radio buttons (platforms) */}
				<View style={[styles.inputWrapper, styles.inputWrapperBox]}>
					<Text style={styles.label}>Platforms</Text>
					<RadioGroup
						radioButtons={radioButtons}
						onPress={setPlatform}
						selectedId={platform}
						color={'#fff'}
					/>
				</View>
				{/* time */}
				<View style={[styles.inputWrapper, styles.inputWrapperBox]}>
					<Text style={styles.label}>Time</Text>
					<View style={styles.sliderWrapper}>
						<Text style={styles.whiteText}>{time}</Text>
						<Slider
							step={5}
							minimumValue={45}
							maximumValue={3600}
							value={time}
							onValueChange={(slideValue) => setTime(slideValue)}
							minimumTrackTintColor="#1fb28a"
							maximumTrackTintColor="#d3d3d3"
							thumbTintColor="#b9e4c9"
							style={styles.input}
						/>
					</View>
				</View>
				{/* Views */}
				<View style={[styles.inputWrapper, styles.inputWrapperBox]}>
					<Text style={styles.label}>Views</Text>
					<View style={styles.sliderWrapper}>
						<Text style={styles.whiteText}>{views}</Text>
						<Slider
							step={5}
							minimumValue={5}
							maximumValue={4000}
							value={views}
							onValueChange={(slideValue) => setViews(slideValue)}
							minimumTrackTintColor="#1fb28a"
							maximumTrackTintColor="#d3d3d3"
							thumbTintColor="#b9e4c9"
							style={styles.input}
						/>
					</View>
				</View>
				<View style={styles.createBtnWrapper}>
					{balance >= postCost && (
						<Pressable onPress={handleNewPost}>
							<Text style={styles.createBtn}>Create New Post</Text>
						</Pressable>
					)}
					<Text style={styles.label}>Post Cost: {postCost}</Text>
					{balance <= postCost && (
						<Pressable>
							<Text style={styles.createBtn}>Get Remaining Balance</Text>
						</Pressable>
					)}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
		flexDirection: 'column',
		width: '100%',
		// height: '100%',
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.9)',
		marginBottom: 150,
		zIndex: 4
	},
	header: {
		width: '100%',
		height: '10%',
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between'
	},
	balance: {
		color: 'white',
		margin: 10,
		fontSize: 15
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
		backgroundColor: colors.red,
		fontSize: 15
	},
	bodyWrapper: {
		width: '100%',
		height: '90%',
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: 20,
		gap: 10
		// justifyContent: 'center'
	},
	inputWrapper: {
		width: '80%',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	inputWrapperBox: {
		borderWidth: 2,
		borderColor: 'white',
		marginTop: 10,
		padding: 5
	},
	label: {
		color: 'white',
		margin: 10,
		fontSize: 18
	},
	input: {
		width: '100%',
		height: 40,
		backgroundColor: 'white',
		// color: 'white',
		borderRadius: 5,
		paddingHorizontal: 5
	},
	sliderWrapper: {
		width: '100%',
		alignItems: 'flex-end'
	},
	whiteText: {
		color: 'white',
		fontSize: 15
	},
	createBtnWrapper: {
		width: '80%',
		flexDirection: 'column',
		alignItems: 'center'
	},
	createBtn: {
		width: Math.round((dimensions.width / 100) * 80),
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: 'white',
		color: 'white',
		borderRadius: 5,
		margin: 10,
		backgroundColor: colors.green,
		fontSize: 18,
		textAlign: 'center'
	}
})

export default EditMainPost

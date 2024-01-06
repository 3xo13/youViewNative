import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import colors from '../variables/colors'
import * as ImagePicker from 'expo-image-picker'
import createNewGroup from './createNewGroup'

const NewGroup = ({ setCreatingNewGroup, user }) => {
	const [image, setImage] = useState(null)
	const [name, setName] = useState('')
	const [pageLoading, setPageLoading] = useState(false)

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		})
		if (!result.canceled) {
			let blob = await fetch(result.assets[0].uri).then((r) => r.blob())
			setImage(blob)
		}
	}

	const handleNewGroup = () => {
		if (!image || !name) {
			return
		} else {
			createNewGroup(
				setPageLoading,
				setCreatingNewGroup,
				{
					id: user.userId,
					blockedUsers: user.userData.blockedUsers
				},
				{ name, image }
			)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={() => setCreatingNewGroup(false)}>
					<Text style={styles.btn}>Cancel</Text>
				</Pressable>
			</View>
			<View style={styles.wrapper}>
				<View style={styles.inputWrapper}>
					<Text style={styles.label}>Group Name</Text>
					<TextInput style={styles.input} value={name} onChangeText={setName} />
				</View>
				<View>
					<Pressable onPress={pickImage}>
						<Text style={styles.uploadImage}>Group Image</Text>
					</Pressable>
				</View>
				<View>
					<Pressable onPress={handleNewGroup}>
						<Text style={styles.createBtn}>Create Group</Text>
					</Pressable>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: colors.dark,
		alignItems: 'center'
	},
	header: {
		width: '100%',
		height: 70,
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingRight: 10
	},
	btn: {
		color: 'white',
		backgroundColor: colors.red,
		borderWidth: 1,
		borderColor: 'white',
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
		marginTop: 5
	},
	wrapper: {
		width: '80%',
		paddingTop: 20,
		gap: 20
	},
	label: {
		color: 'white',
		fontSize: 18
	},
	input: {
		backgroundColor: 'white',
		fontSize: 15,
		borderRadius: 5,
		padding: 5
	},
	inputWrapper: {
		borderWidth: 1,
		borderColor: 'white',
		padding: 10,
		gap: 10,
		borderRadius: 5
	},
	uploadImage: {
		width: '100%',
		height: 50,
		// backgroundColor: colors.green,
		textAlign: 'center',
		paddingVertical: 12,
		color: 'white',
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 5
	},
	createBtn: {
		width: '100%',
		height: 40,
		backgroundColor: colors.green,
		textAlign: 'center',
		paddingVertical: 10,
		color: 'white',
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 5
	}
})

export default NewGroup

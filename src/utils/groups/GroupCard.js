import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'

const GroupCard = ({ group, setOpenGroup, setCurrentGroupId }) => {
	return (
		<View style={styles.container}>
			<Pressable
				onPress={() => {
					setCurrentGroupId(group.groupId)
					setOpenGroup(true)
				}}
			>
				<Text style={styles.text}>{group.groupData.name}</Text>
				<Image
					source={{ uri: group.groupData.image }}
					width={50}
					height={50}
					style={styles.image}
				/>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginBottom: 20,
		borderWidth: 1,
		borderColor: 'white',
		padding: 10,
		borderRadius: 5
	},
	image: {
		width: '100%',
		height: 150
	},
	text: {
		color: 'white',
		fontSize: 18,
		width: '100%',
		textAlign: 'center',
		marginBottom: 10
	}
})

export default GroupCard

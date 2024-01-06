import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Loading = () => {
	return (
		<View style={styles.container}>
			<Text>Loading...</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})

export default Loading

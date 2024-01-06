import React from 'react'
import { Pressable, StyleSheet, View, Text } from 'react-native'
import colors from '../../utils/variables/colors'

const ConfirmationMessage = ({ message, cancel, confirm }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.message}>{message}</Text>
			<View style={styles.btnsWraaper}>
				<Pressable onPress={() => cancel(false)}>
					<Text style={[styles.btn, styles.green]}>Cancel</Text>
				</Pressable>
				<Pressable onPress={confirm.func}>
					<Text style={[styles.btn, styles.red]}>{confirm.type}</Text>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.9)'
	},
	message: {
		color: 'white',
		fontSize: 20,
		width: '90%',
		textAlign: 'center'
	},
	btnsWraaper: {
		flexDirection: 'row',
		gap: 20,
		marginTop: 20
	},
	btn: {
		paddingVertical: 5,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: 'white',
		color: 'white',
		borderRadius: 5,
		fontSize: 15
	},
	red: {
		backgroundColor: colors.red
	},
	green: {
		backgroundColor: colors.green
	}
})

export default ConfirmationMessage

import React from 'react'
import {
	Text,
	View,
	SafeAreaView,
	StyleSheet,
	SafeAreaViewComponent,
	Platform,
	Dimensions,
	Image
} from 'react-native'

const Login = () => {
	// get the padding value of the status bar for android
	const { height } = Dimensions.get('window')
	const paddingValue = height * 0.05
	return (
		<SafeAreaView
			style={[
				styles.container,
				// eslint-disable-next-line react-native/no-inline-styles
				{ paddingTop: Platform.OS === 'android' ? paddingValue : 0 }
			]}
		>
			<View style={styles.wrapper}>
				<Image
					source={require('../../assets/images/logo/logo.png')}
					style={styles.logo}
				/>
				<Text>Login</Text>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
		// paddingTop: Platform.OS === 'padd' ? paddingValue : 0
	},
	wrapper: {
		flex: 1,
		backgroundColor: '#242124'
	},
	logo: {
		width: 200,
		height: 200,
		// backgroundColor: 'white'
	}
})

export default Login

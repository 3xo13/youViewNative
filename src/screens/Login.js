import React, { useEffect, useState } from 'react'
import {
	Text,
	View,
	SafeAreaView,
	StyleSheet,
	SafeAreaViewComponent,
	Platform,
	Dimensions,
	Image,
	TextInput,
	Button,
	Pressable
} from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import createLocalTokin from '../utils/createLocalTokin'
import { auth } from '../firebase/firebaseConfig'
// console.log('🚀 ~ file: Login.js:18 ~ auth:', JSON.stringify(auth, null, 2))
import { colors } from '../utils/variables/colors'
import getUserId from '../utils/getUserId'
import getUser from '../utils/getUser'
import storeData from '../utils/StoreData'
import readLocalData from '../utils/readLocalData'

const Login = ({ navigation, setUserLogedIn }) => {
	const [retry, setRetry] = useState(false)
	const [resMessage, setResMessage] = useState()
	const [email, onChangeEmail] = useState('')
	const [password, onChangePassword] = useState('')

	// sign in user => set tokin => get/set user data => set authentication state in App to true
	// todo: Error => set message
	const handleSubmit = () => {
		console.log('submitting')
		const signinUser = async () => {
			try {
				await signInWithEmailAndPassword(auth, email, password)
				const uid = auth.currentUser.uid
				await createLocalTokin({
					key: 'accessToken',
					value: auth.currentUser.accessToken
				})
				const id = await getUserId(uid)
				const user = await getUser(id)
				await storeData({ key: 'user', value: JSON.stringify(user) })
				setUserLogedIn(true)
				console.log('user signed in')
			} catch (error) {
				console.log('🚀 ~ file: Login.js:36 ~ signinUser ~ error:', error)
			}
		}
		signinUser()
	}

	// get the padding value of the status bar for android
	const { height } = Dimensions.get('window')
	const paddingValue = height * 0.05
	return (
		<SafeAreaView
			style={[
				styles.container

				// { paddingTop: Platform.OS === 'android' ? paddingValue : 0 }
			]}
		>
			<View style={styles.wrapper}>
				<View style={styles.formWrapper}>
					<Image
						source={require('../../assets/images/logo/logo.png')}
						style={styles.logo}
					/>
					<TextInput
						onChangeText={onChangeEmail}
						placeholder="email"
						style={styles.input}
						value={email}
					/>
					<TextInput
						onChangeText={onChangePassword}
						placeholder="password"
						style={styles.input}
						value={password}
					/>
					<Pressable onPress={handleSubmit}>
						<Text style={styles.btn}>Login</Text>
					</Pressable>
				</View>
				<View style={styles.registerWrapper}>
					<Text style={styles.text}>Don&apos;t have an account?</Text>
					<Pressable>
						<Text style={styles.btn}>Register</Text>
					</Pressable>
				</View>
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
		backgroundColor: colors.darck,
		alignItems: 'center',
		flexDirection: 'column'
	},
	formWrapper: {
		height: '60%',
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: 10
	},
	logo: {
		width: 200,
		height: 200,
		marginTop: '25%'
	},
	btn: {
		width: 250,
		marginTop: 20,
		color: 'white',
		backgroundColor: colors.green,
		padding: 5,
		textAlign: 'center',
		fontSize: 18,
		borderRadius: 5
	},
	input: {
		backgroundColor: 'white',
		color: 'black',
		width: 250,
		paddingVertical: 3,
		paddingHorizontal: 5,
		borderRadius: 5
	},
	registerWrapper: {
		width: 'auto',
		borderWidth: 1,
		borderColor: 'white',
		padding: 10,
		marginTop: 50,
		borderRadius: 5
	},
	text: {
		color: 'white'
	}
})

export default Login

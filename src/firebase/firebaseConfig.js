// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app'
import {
	getAuth,
	initializeAuth,
	getReactNativePersistence
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import {
	API_KEY,
	AUTH_DOMAIN,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID,
	MEASUREMENT_ID,
	DATABASE_URL
} from '@env'

// import dotenv from 'dotenv';
// dotenv.config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: API_KEY,

	authDomain: AUTH_DOMAIN,

	databaseURL: DATABASE_URL,

	projectId: PROJECT_ID,

	storageBucket: STORAGE_BUCKET,

	messagingSenderId: MESSAGING_SENDER_ID,

	appId: APP_ID,

	measurementId: MEASUREMENT_ID
}

// initialize the app if it doesn't already exist
let app
if (!getApps()?.length) {
	app = initializeApp(firebaseConfig)
	initializeAuth(app, {
		persistence: getReactNativePersistence(ReactNativeAsyncStorage)
	})
} else {
	app = getApps()[0]
}
const auth = getAuth(app)
// console.log("🚀 ~ file: firebaseConfig.js:42 ~ auth:", auth)
// get firebase services references
const database = getFirestore(app)

const storage = getStorage(app)

export { database, auth, storage }

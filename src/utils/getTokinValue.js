import * as SecureStore from 'expo-secure-store'

export default async function getTokinValue(key) {
	let result = await SecureStore.getItemAsync(key)
	if (result) {
		return result
	} else {
		console.log('No values stored under that key.')
		return null
	}
}

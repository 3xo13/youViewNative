import * as SecureStore from 'expo-secure-store'

async function save(key, value) {
	await SecureStore.setItemAsync(key, value)
}

async function getValueFor(key) {
	let result = await SecureStore.getItemAsync(key)
	if (result) {
		console.log('🚀 ~ file: createCookey.js:10 ~ getValueFor ~ result:', result)
	} else {
		console.log('No values stored under that key.')
	}
}

export default async function createCookey(data) {
	const { key, value } = data
	try {
		await save(key, value)
		// getValueFor(key)
	} catch (error) {
		console.log('🚀 ~ file: createCookey.js:21 ~ createCookey ~ error:', error)
	}
}

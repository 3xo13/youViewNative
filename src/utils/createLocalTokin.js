import * as SecureStore from 'expo-secure-store'

async function save(key, value) {
	await SecureStore.setItemAsync(key, value)
}

export default async function createLocalTokin(data) {
	const { key, value } = data
	try {
		await save(key, value)
		// getValueFor(key)
	} catch (error) {
		console.log('🚀 ~ file: createCookey.js:21 ~ createCookey ~ error:', error)
	}
}

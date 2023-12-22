import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async (data) => {
	const { key, value } = data
	try {
		await AsyncStorage.setItem(key, value)
		console.log(key, ' data saved')
	} catch (e) {
		console.log('🚀 ~ file: StoreData.js:8 ~ storeData ~ e:', e)
		// saving error
	}
}

export default storeData

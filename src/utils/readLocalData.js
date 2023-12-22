import AsyncStorage from '@react-native-async-storage/async-storage'

const readLocalData = async (key) => {
	try {
		const value = await AsyncStorage.getItem(key)
		if (value !== null) {
			return value
			// value previously stored
		}
	} catch (error) {
		console.log(
			'🚀 ~ file: readLocalData.js:11 ~ readLocalData ~ error:',
			error
		)
		// error reading value
	}
}

export default readLocalData

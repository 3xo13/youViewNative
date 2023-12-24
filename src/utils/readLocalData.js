import AsyncStorage from '@react-native-async-storage/async-storage'

// read a previously stored value
const readLocalData = async (key) => {
	try {
		const value = await AsyncStorage.getItem(key)
		if (value !== null) {
			return value
		} else {
			return null
		}
	} catch (error) {
		console.log(
			'🚀 ~ file: readLocalData.js:13 ~ readLocalData ~ error:',
			error
		)
		return null
	}
}

export default readLocalData

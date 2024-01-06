import { Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const dimensions = {
	width: windowWidth,
	height: windowHeight
}

export default dimensions

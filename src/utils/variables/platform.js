import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	label: {
		color: 'white',
		fontSize: 15
	}
})

const platforms = [
	{
		id: 'youtube', // acts as primary key, should be unique and non-empty string
		label: 'Youtube  ',
		value: 'youtube',
		color: 'white',
		labelStyle: styles.label
	},
	{
		id: 'facebook',
		label: 'Facebook',
		value: 'facebook',
		color: 'white',
		labelStyle: styles.label
	},
	{
		id: 'tiktok',
		label: 'TikTok     ',
		value: 'tiktok',
		color: 'white',
		labelStyle: styles.label
	}
]

export default platforms

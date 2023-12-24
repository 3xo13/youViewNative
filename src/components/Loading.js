import React from 'react'
import { Image, View } from 'react-native'

const Loading = () => {
	return (
		<View className="w-full h-full absolute flex-center">
			<Image
				source={require('../../assets/loading.png')}
				alt=""
				width={100}
				height={100}
				className="rounded-full object-contain animate-spin-reverse "
			/>
		</View>
	)
}

export default Loading

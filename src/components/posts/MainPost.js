import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import Loading from '../Loading'
import { colors } from '../../utils/variables/colors'

const MainPost = ({ post }) => {
	const {
		username,
		time,
		userId,
		link,
		cost,
		views,
		userImage,
		title,
		platform,
		watched
	} = post.postValue
	// post main states
	const [play, setPlay] = useState(false)
	const [timer, setTimer] = useState(time)
	const [sendReward, setSendReward] = useState(false)
	const [pageLoading, setPageLoading] = useState(false)
	const [viewed, setViewed] = useState(watched)

	// post options states
	const [usePostOptions, setUsePostOptions] = useState(false)
	const [isOwner, setIsOwner] = useState(false)
	const [reporting, setReporting] = useState(false)
	const [reportCase, setReportCase] = useState(false)

	const reward = Math.floor(cost / views)
	const progressPercentage =
		viewed === 0 ? viewed : (viewed / views).toFixed(2) * 100

	return (
		<ScrollView style={styles.container}>
			{pageLoading && <Loading />}
			{/* {reporting && (
				<Report
					setReportCase={setReportCase}
					setReporting={setReporting}
					handleReport={handleReport}
				/>
			)} */}
			{!reporting && (
				<View>
					{/* post header, user and info */}
					<View style={styles.header}>
						<View style={styles.headerImageWrapper}>
							<Image
								source={{ uri: userImage }}
								alt="user image"
								style={styles.image}
							/>
							<Text style={styles.text}>{username}</Text>
						</View>
						<View style={styles.infoWrapper}>
							<View className="  w-full flex justify-end px-5">
								{/* <button
									className="font-bold text-3xl text-white mt-2"
									onClick={(e) => setUsePostOptions((prev) => !prev)}
								>
									⋮
								</button> */}
							</View>
							<Text style={styles.text}>
								{reward}
								<Text className="text-yellow-500" style={styles.text}>
									&ensp;$
								</Text>
							</Text>
							{platform && platform !== 'tiktok' && (
								<Text style={styles.text}>
									{timer}
									<Text style={styles.text}>&ensp;🕓</Text>
								</Text>
							)}
						</View>
					</View>

					{/* post body, title and video */}
					{usePostOptions ? (
						<Text />
					) : (
						// <TextostOptions
						// 	handleDelete={handleDelete}
						// 	setReporting={setReporting}
						// 	isOwner={isOwner}
						// />
						<View className="w-full   ">
							<View className="w-full  flex  p-3 ">
								<Text style={styles.text}>{title}</Text>
							</View>
							{((plat) => {
								if (plat === 'tiktok') {
									return (
										<View className="p-3">
											{/* <Link
												href={link}
												target="blank"
												className="w-fit flex-center w-full"
											>
												<Image
													src="/assets/icons/tiktok.png"
													alt=""
													className="w-full h-[150px] object-contain"
													onClick={(e) => setSendReward(true)}
												/>
											</Link> */}
										</View>
									)
								}
								if (plat === 'youtube' || plat === 'facebook') {
									return (
										<View className="flex items-center justify-center w-full overflow-y-hidden h-[400px]">
											{/* <ReactPlayer
												url={embedUrl}
												onPlay={(e) => setPlay(true)}
												onPause={(e) => setPlay(false)}
												controls={true}
											/> */}
										</View>
									)
								}
							})(platform)}
						</View>
					)}
					{/* post view metter */}
					{!usePostOptions && (
						<View style={styles.meterWrapper}>
							<View style={styles.innerMeterWrapper}>
								<Text style={styles.text}>{viewed}</Text>
								<View style={styles.progressBarWrapper}>
									<View
										style={[
											styles.progressBar,
											{
												width: `${progressPercentage}%`
											}
										]}
									/>
								</View>
								<Text style={styles.text}>{views}</Text>
							</View>
						</View>
					)}
				</View>
			)}
		</ScrollView>
	)
}
// className={'w-[50%] h-2 rounded bg-white mx-3'}
const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 250,
		flexDirection: 'column',
		backgroundColor: colors.darck,
		paddingHorizontal: 10,
		marginBottom: 10
	},
	header: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	headerImageWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingVertical: 10
	},
	image: {
		width: 60,
		height: 60,
		marginHorizontal: 10,
		objectFit: 'cover',
		borderRadius: 50
	},
	text: {
		color: 'white'
	},
	infoWrapper: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	meterWrapper: {
		width: '100%',
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly'
	},
	innerMeterWrapper: {
		width: '100%',
		height: '80%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	progressBar: {
		height: '100%',
		backgroundColor: colors.green,
		borderRadius: 5
	},
	progressBarWrapper: {
		width: '50%',
		height: 10,
		backgroundColor: 'white',
		marginHorizontal: 10,
		borderRadius: 5
	}
})

export default MainPost

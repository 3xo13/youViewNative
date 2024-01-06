import React, { useEffect, useState } from 'react'
import {
	SafeAreaView,
	Text,
	View,
	StyleSheet,
	ImageBackground,
	Button,
	Pressable,
	ScrollView
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import dimensions from '../utils/variables/dimensions'
import colors from '../utils/variables/colors'
import GroupCard from '../utils/groups/GroupCard'
import useGetGroups from '../utils/groups/useGetGroups'
import NewGroup from '../utils/groups/NewGroup'
import { UserAuth } from '../components/auth/AuthContextProvider'
import Group from '../utils/groups/Group'

const Groups = () => {
	const { user, loading } = UserAuth()
	const { groups, loadingGroups } = useGetGroups()
	const [creatingNewGroup, setCreatingNewGroup] = useState(false)
	const [openGroup, setOpenGroup] = useState(false)
	const [currentGroupId, setCurrentGroupId] = useState('')

	const groupsList =
		groups &&
		groups.map((group) => (
			<GroupCard
				key={group.groupId}
				group={group}
				setOpenGroup={setOpenGroup}
				setCurrentGroupId={setCurrentGroupId}
			/>
		))

	return (
		<View>
			{openGroup && (
				<Group
					blockedUsers={user.userData.blockedUsers}
					groupId={currentGroupId}
					setOpenGroup={setOpenGroup}
				/>
			)}

			{!openGroup && (
				<View style={styles.container}>
					{creatingNewGroup && (
						<NewGroup setCreatingNewGroup={setCreatingNewGroup} user={user} />
					)}

					{!creatingNewGroup && (
						<View style={styles.layer}>
							<Pressable onPress={() => setCreatingNewGroup(true)}>
								<Text style={styles.btn}>New Group</Text>
							</Pressable>
						</View>
					)}

					{!creatingNewGroup && (
						<ScrollView style={styles.groupsWrapper}>{groupsList}</ScrollView>
					)}
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: dimensions.width,
		height: dimensions.height - 30,
		backgroundColor: colors.dark
	},
	groupsWrapper: {
		// flexDirection: 'column',
		// gap: 100,
		// minHeight: dimensions.height - 30,
		// height: '100%',
		paddingVertical: 20,
		paddingHorizontal: 10
	},
	layer: {
		width: '100%',
		height: 50,
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingRight: 10
	},
	btn: {
		color: 'white',
		backgroundColor: colors.green,
		borderWidth: 1,
		borderColor: 'white',
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
		marginTop: 5
	}
})

export default Groups

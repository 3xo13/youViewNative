import { query, collection, where, orderBy, getDocs } from 'firebase/firestore'
import { database } from '../../firebase/firebaseConfig'

const getGroupPosts = async (
	setPageLoading,
	setGroupPosts,
	groupId,
	blockedUsers
) => {
	try {
		setPageLoading(true)
		const q = query(
			collection(database, 'groupPosts'),
			where('group', '==', groupId),
			orderBy('created', 'desc')
		)
		const querySnapshot = await getDocs(q)
		let newGroupPosts = []
		querySnapshot.forEach((doc) => {
			newGroupPosts.push({ postId: doc.id, postValue: doc.data() })
		})

		// filter out the blocked user's posts
		const newPosts = newGroupPosts.filter((groupPost) => {
			if (!blockedUsers.find((el) => el == groupPost.postValue.owner)) {
				return groupPost
			}
		})
		setGroupPosts(newPosts)
		setPageLoading(false)
	} catch (error) {
		console.log('🚀 ~ file: page.jsx:117 ~ getGroups ~ error:', error)
		setPageLoading(false)
	}
}

export default getGroupPosts

import { database } from '../../firebase/firebaseConfig'
import { doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore'
import getUserId from '../getUserId'

const deletePost = async (setPageLoading, uid, postId) => {
	try {
		setPageLoading(true)
		// delete the post
		const postRef = doc(database, 'posts', postId)
		await deleteDoc(postRef)
		const id = await getUserId(uid)
		// delete the post from the user
		const userRef = doc(database, 'users', id)
		await updateDoc(userRef, {
			posts: arrayRemove(postId)
		})
		// setUsePostOptions(false)
		setPageLoading(false)
	} catch (error) {
		console.log('🚀 ~ file: GroupPost.jsx:93 ~ deletePost ~ error:', error)
		setPageLoading(false)
	}
}

export default deletePost

import {
	query,
	where,
	getDocs,
	collection,
	addDoc,
	Timestamp,
	doc,
	updateDoc,
	increment,
	arrayUnion
} from 'firebase/firestore'
import { auth, database } from '../../firebase/firebaseConfig'
import checkAndRenewToken from '../checkAndRenewToken'

const createNewPost = async (
	setPageLoading,
	newPostData,
	setCreatingNewPost
) => {
	try {
		setPageLoading(true)
		const uid = auth.currentUser.uid

		// get the user id
		const q = query(collection(database, 'users'), where('uid', '==', uid))
		const querySnapshot = await getDocs(q)
		let users = []
		querySnapshot.forEach((newDoc) => {
			users.push({ id: newDoc.id, data: newDoc.data() })
		})

		const id = users[0].id
		// create a new post
		const newPost = await addDoc(collection(database, 'posts'), newPostData)

		// update the user after the creation of a new post
		const userRef = doc(database, 'users', id)

		await updateDoc(userRef, {
			balance: increment(-newPostData.cost),
			posts: arrayUnion(newPost.id)
		})
		console.log('post created')
		setPageLoading(false)
		setCreatingNewPost(false)
	} catch (error) {
		console.log(
			'🚀 ~ file: createNewPost.js:51 ~ createNewPost ~ error:',
			error
		)
		setPageLoading(false)
	}
}

export default createNewPost

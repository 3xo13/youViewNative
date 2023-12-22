import { database } from '../firebase/firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'

export default async function getUserId(uid) {
	try {
		const q = query(collection(database, 'users'), where('uid', '==', uid))
		const querySnapshot = await getDocs(q)
		let users = []
		querySnapshot.forEach((doc) => {
			users.push({ id: doc.id, data: doc.data() })
		})
		const id = users[0].id

		return id
	} catch (error) {
		console.log('🚀 ~ file: getUserId.js:17 ~ getUserId ~ error:', error)
	}
}

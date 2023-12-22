import { collection, addDoc, getDoc, getDocs, doc } from 'firebase/firestore'
import { database } from '../firebase/firebaseConfig'

export default async function getUser(id) {
	try {
		const docRef = doc(database, 'users', id)
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			return docSnap.data()
		} else {
			// console.log("No such document!");
			throw new Error('No such document!')
		}
	} catch (error) {
		console.log('🚀 ~ file: getUser.js:16 ~ getUser ~ error:', error)
		// console.log(error);
	}
}

import { auth } from '../firebase/firebaseConfig'
import { getIdToken } from 'firebase/auth'

export default async function checkAndRenewToken() {
	try {
		const accessToken = await getIdToken(auth?.currentUser)
		return accessToken
	} catch (error) {
		console.log(
			'🚀 ~ file: checkAndRenewToken.js:13 ~ checkAndRenewToken ~ error:',
			error
		)
		// return null
	}
}

import { auth } from '../firebase/firebaseConfig'
import { getIdToken } from 'firebase/auth'

export default async function checkAndRenewToken() {
	try {
		const newToken = await getIdToken(auth.currentUser)
		await fetch('/api/cookey', {
			method: 'POST',
			body: JSON.stringify({ newToken: newToken })
		})
	} catch (error) {
		console.log(
			'🚀 ~ file: checkAndRenewToken.js:13 ~ checkAndRenewToken ~ error:',
			error
		)
	}
}

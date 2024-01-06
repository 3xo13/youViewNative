import { database } from '../../firebase/firebaseConfig'
import { doc, addDoc, collection, updateDoc } from 'firebase/firestore'
import { storage } from '../../firebase/firebaseConfig'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'

const createNewGroup = async (setPageLoading, setCreateGroup, user, group) => {
	const { name, image } = group
	const { id, blockedUsers } = user
	try {
		setPageLoading(true)

		const userRef = doc(database, 'users', id)

		const imageRef = ref(storage, `images/${id}${image.name}`)

		// upload image and get the download url then create the group and update the user
		await uploadBytes(imageRef, image).then(async (snapshot) => {
			const newImageUrl = await getDownloadURL(imageRef)
			try {
				const newGroup = await addDoc(collection(database, 'groups'), {
					name: name,
					blockedUsers: blockedUsers,
					owner: id,
					posts: [],
					image: newImageUrl
				})

				await updateDoc(userRef, {
					group: newGroup.id
				})
			} catch (error) {
				console.log('🚀 ~ file: page.jsx:31 ~ awaituploadBytes ~ error:', error)
			}
		})
		setCreateGroup(false)
		setPageLoading(false)
	} catch (error) {
		console.log(error)
		setPageLoading(false)
	}
}

export default createNewGroup

const blockUser = async () => {
	try {
		setPageLoading(true)
		const id = await getUserId(uid)

		const userRef = doc(database, 'users', id)
		await updateDoc(userRef, { blockedUsers: arrayUnion(userId) })
		setReporting(false)
		setUsePostOptions(false)
		setPageLoading(false)
	} catch (error) {
		console.log('🚀 ~ file: GroupPost.jsx:91 ~ blockUser ~ error:', error)
		setPageLoading(false)
	}
}
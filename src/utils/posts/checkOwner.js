// check id the current user is the owner of the post
useEffect(() => {
	const checkOwner = async () => {
		try {
			await checkAndRenewToken()
			const id = await getUserId(uid)
			if (userId === id) {
				setIsOwner(true)
			}
		} catch (error) {
			console.log('🚀 ~ file: GroupPost.jsx:15 ~ checkOwner ~ error:', error)
		}
	}
	checkOwner()
})

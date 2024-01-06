// send a report and block the post owner (blocking is optional)
const handleReport = (e, block) => {
	e.preventDefault()
	if (!reportCase) {
		return
	}
	const sendReport = async () => {
		try {
			setPageLoading(true)
			await checkAndRenewToken()
			const id = await getUserId(uid)

			await addDoc(collection(database, 'reports'), {
				reportingUserId: id,
				reportingUserName: user.username,
				reportedUserName: username,
				reportedUserId: userId,
				reportedPost: postId,
				reportCase,
				postType: 'normal post'
			})
			setReporting(false)
			setUsePostOptions(false)
			setPageLoading(false)
		} catch (error) {
			console.log('🚀 ~ file: GroupPost.jsx:75 ~ sendReport ~ error:', error)
			setPageLoading(false)
		}
	}
	if (block) {
		sendReport()
		blockUser()
	} else {
		sendReport()
	}
}

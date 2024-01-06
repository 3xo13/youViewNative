/* using useEffect and a seprate state here to only send the reward once */
// send reward to user after countdown is over
useEffect(() => {
	const addBalance = async () => {
		try {
			setPageLoading(true)

			await checkAndRenewToken()

			const id = await getUserId(uid)

			const userRef = doc(database, 'users', id)
			await updateDoc(userRef, { balance: increment(reward) })

			const postRef = doc(database, 'posts', postId)

			// delete the post if it's the last needed view
			if (viewed === views - 1) {
				// delete the post
				await deleteDoc(postRef)

				// delete the post in the user
				const userRef = doc(database, 'users', userId)
				await updateDoc(userRef, { posts: arrayRemove(postId) })
			} else {
				await updateDoc(postRef, { watched: increment(1) })
				setViewed((prev) => prev + 1)
			}

			setPageLoading(false)
		} catch (error) {
			console.log('🚀 ~ file: Post.jsx:71 ~ addBalance ~ error:', error)
			setPageLoading(false)
		}
	}
	if (sendReward) {
		addBalance()
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
}, [sendReward])

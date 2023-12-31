import React, { useState, useEffect } from 'react'
import { database } from '../firebase/firebaseConfig'
import { query, collection, orderBy, limit, getDocs } from 'firebase/firestore'

const useGetPosts = () => {
	const [posts, setPosts] = useState(null)
	const [loadingPosts, setLoadingPosts] = useState(true)

	useEffect(() => {
		;(async () => {
			try {
				const q = query(
					collection(database, 'posts'),
					// orderBy('date', 'desc'),
					// limit(5)
				)
				const querySnapshot = await getDocs(q)

				let results = []
				querySnapshot.forEach((doc) => {
					results.push({ postId: doc?.id, postValue: doc?.data() })
				})
				setPosts(results)
			} catch (error) {
				console.log('🚀 ~ file: useGetPosts.js:25 ~ error:', error)
			}
			setLoadingPosts(false)
		})()
	}, [])

	return { posts, loadingPosts }
}

export default useGetPosts

import { useState, useEffect } from 'react'
import { database } from '../../../src/firebase/firebaseConfig'
import { query, collection, getDocs } from 'firebase/firestore'

const useGetGroups = () => {
	const [groups, setGroups] = useState(null)
	const [loadingGroups, setLoadingGroups] = useState(true)

	useEffect(() => {
		;(async () => {
			try {
				const q = query(collection(database, 'groups'))
				const querySnapshot = await getDocs(q)

				let results = []
				querySnapshot.forEach((doc) => {
					results.push({ groupId: doc?.id, groupData: doc?.data() })
				})
				setGroups(results)
			} catch (error) {
				console.log('🚀 ~ file: useGetGroups.js:25 ~ error:', error)
			}
			setLoadingGroups(false)
		})()
	}, [])

	return { groups, loadingGroups }
}

export default useGetGroups

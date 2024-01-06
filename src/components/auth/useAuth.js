'use client'
import React, { useState, useEffect } from 'react'
import { auth, database } from '../../firebase/firebaseConfig'
import {
	getIdToken,
	onAuthStateChanged,
	onIdTokenChanged,
	signOut
} from 'firebase/auth'
import { query, where, getDocs, collection } from 'firebase/firestore'
import checkAndRenewToken from '../../utils/checkAndRenewToken'

const useAuth = () => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// check for changes in the cuurent user, return the user if it's exist or set user to null
		// to be redirected to the login page
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				// if firebase user is logged in get the firestore user from the database
				// setUser(currentUser)
				try {
					await checkAndRenewToken()
					const uid = currentUser.uid
					const q = query(
						collection(database, 'users'),
						where('uid', '==', uid)
					)
					const querySnapshot = await getDocs(q)
					const newUser = []
					querySnapshot.forEach((doc) => {
						newUser.push({ userId: doc.id, userData: doc.data() })
					})
					setUser(newUser[0])
				} catch (error) {
					console.log('🚀 ~ file: useAuth.js:21 ~ fetchNewUser ~ error:', error)
					setUser(null)
					await signOut(auth)
				}
			} else {
				setUser(null)
			}
			setLoading(false)
		})
		// unmount component (i think )
		return () => unsubscribe()
	}, [])

	return { user, loading }
}

export default useAuth

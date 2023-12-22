'use client'
import { useContext, createContext } from 'react'
import useAuth from './useAuth'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const { user, loading } = useAuth()
	return (
		<AuthContext.Provider value={{ user, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

export const UserAuth = () => {
	return useContext(AuthContext)
}

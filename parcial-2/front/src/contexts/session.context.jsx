import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"
import {useNavigate} from 'react-router-dom'

import profileService from '../services/profile.service'
import authService from '../services/auth.service'

const SessionContext = createContext()

function useSession(){
    return useContext(SessionContext)
}

function useProfile(){
    const {profile} = useSession()
    return profile
}

function SessionProvider({children}){
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()

    const onLogout = useCallback(() => {
        authService.logout()
        localStorage.removeItem('token')
        navigate('/login', {replace: true})
    }, [navigate])


    useEffect(() => {
        profileService.getCurrent()
        .then((profile) => {
            setProfile(profile)
        })
    }, [])

    const value = useMemo(()=>{
        return {
            profile,
            onLogout
        }
    }, [profile, onLogout])
    

    
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
            )
}


export {
    useSession,
    useProfile,
    SessionProvider
}
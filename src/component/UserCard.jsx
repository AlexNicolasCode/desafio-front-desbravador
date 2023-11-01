import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { useAlert, useUser } from "../hook"
import { Loading } from "./Loading"

export const UserCard = () => {
    const { username } = useParams()
    const { setIsUserFound } = useUser()
    const { setIsActiveAlert, setAlertStatusCode } = useAlert()
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({
        name: '',
        bio: '',
        email: '',
        avatar_url: '',
        followersCount: 0,
        followingCount: 0,
    })

    useEffect(() => {
        fetchUser()
    }, [username])
    
    const fetchUser = useCallback(async () => {
        try {
            setIsLoading(true)
            setIsUserFound(false)
            const response = await axios.get(`https://api.github.com/users/${username}`)
            const { name, bio, email, avatar_url, followers, following  } = response.data
            setUser({
                name,
                bio,
                email,
                avatar_url,
                followersCount: followers,
                followingCount: following,
            })
            setIsUserFound(true)
        } catch (error) {
            console.error(error)
            setAlertStatusCode(error.response.status)
            setIsActiveAlert(true)
        } finally {
            setIsLoading(false)
        }
    }, [username])
    
    const renderProfileCard = useCallback(() => (
        <section className="card">
            <img src={user.avatar_url} className="card-img-top" alt={username} />
            <section className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h5 className="card-title">{user.email}</h5>
                <p className="card-text">{user.bio}</p>
                <p className="card-text">
                    Followed: {user.followersCount} Following: {user.followingCount}
                </p>
            </section>
        </section>
    ), [user])

    return isLoading ? <Loading/> : renderProfileCard()
}
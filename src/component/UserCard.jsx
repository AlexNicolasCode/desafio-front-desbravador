import axios from "axios"
import { useCallback, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

import { useUser } from "../hook"
import { Loading } from "./Loading"
import { statusCode } from "../main/helper"

export const UserCard = () => {
    const { username } = useParams()
    const { isUserFound, setIsUserFound, setRepositories } = useUser()
    const [isLoading, setIsLoading] = useState(false)
    const alertCode = useRef()
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
            setRepositories([])
            if (error.response.status === statusCode.notFound) {
                alertCode.current = statusCode.notFound
                return
            }
            if (error.response.status === statusCode.forbidden) {
                alertCode.current = statusCode.forbidden
                return
            }
            alertCode.current = 'error'
        } finally {
            setIsLoading(false)
        }
    }, [username])

    const truncateText = (text) => {
        if (text.length >= 7) {
            return `${text.substring(0, 7)}...`
        }
        return text
    }

    const renderNotFoundAlert = useCallback(() => (
        <section className="alert alert-warning">
            {truncateText(username)} Not Found on GitHub database
        </section> 
    ), [username])

    const renderForbiddenAlert = () => (
        <section className="alert alert-info">
            Ops! GitHub API rate limit exceeded!
        </section> 
    )

    const renderErrorAlert = () => (
        <section className="alert alert-danger">
            Ops! Please, Try again later!
        </section> 
    )

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

    const renderAlert = useCallback(() => {
        const alertMapper = {
            [statusCode.notFound]: renderNotFoundAlert(),
            [statusCode.forbidden]: renderForbiddenAlert(),
        }
        return alertMapper[alertCode.current] ?? renderErrorAlert()
    }, [alertCode])

    const renderCard = useCallback(
        () => isUserFound ? renderProfileCard() : renderAlert(),
        [isUserFound, username]
    )

    return isLoading ? <Loading/> : renderCard()
}
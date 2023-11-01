import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { RepositoryList } from "../component"

export function UserPage () {
    const [isUserFound, setIsUserFound] = useState(false)
    const [user, setUser] = useState({
        name: '',
        bio: '',
        email: '',
        avatar_url: '',
        followersCount: 0,
        followingCount: 0,
    })
    const [repositories, setRepositories] = useState([])
    const { username } = useParams()

    useEffect(() => {
        fetchUser()
    }, [username])

    useEffect(() => {
        if (isUserFound) {
            fetchRepositories()
        }
    }, [isUserFound])

    const fetchUser = async () => {
        const response = await axios.get(`https://api.github.com/users/${username}`)
        const notFound = 404
        if (response.status === notFound) {
            return
        }
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
    }
    
    const fetchRepositories = async () => {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`)
        const repositories = response.data
        setRepositories(repositories)
    }

    const renderEmptyState = () => (
        <section className="card">
            {username} Not Found on GitHub database
        </section> 
    )

    const renderRepositories = () => (
        <RepositoryList repositories={repositories} />
    )

    const renderUser = () => (
        <>
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
            {renderRepositories()}
        </>
    )

    return isUserFound ? renderUser() : renderEmptyState()
}
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

    const handleRepositorySort = (sortBy) => {
        const sortMapper = {
            "desc": [...repositories].sort((a, b) => b.starsCount - a.starsCount),
            "asc": [...repositories].sort((a, b) => a.starsCount - b.starsCount),
        }
        const sortedRepositories = sortMapper[sortBy] ?? repositories
        setRepositories(sortedRepositories)
    }

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
        const repositoriesReduced = response.data.map((repository) => ({
            name: repository.name,
            starsCount: repository.stargazers_count,
        }))
        const reorderedRepositories = repositoriesReduced.sort((a, b) => b.starsCount - a.starsCount)
        setRepositories(reorderedRepositories)
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
            <select onChange={($event) => handleRepositorySort($event.target.value)} defaultValue={"desc"}>
                <option value={"desc"}>Decrescente</option>
                <option value={"asc"}>Crescente</option>
            </select>
            {renderRepositories()}
        </>
    )

    return isUserFound ? renderUser() : renderEmptyState()
}
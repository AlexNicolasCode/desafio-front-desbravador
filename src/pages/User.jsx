import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export function UserPage () {
    const [user, setUser] = useState({
        name: '',
        bio: '',
        email: '',
        avatar_url: '',
        followersCount: 0,
        followingCount: 0,
    })
    const { username } = useParams()

    useEffect(() => {
        fetchUser()
    }, [username])

    const fetchUser = async () => {
        const reponse = await axios.get(`https://api.github.com/users/${username}`)
        const { name, bio, email, avatar_url, followers, following  } = reponse.data
        setUser({
            name,
            bio,
            email,
            avatar_url,
            followersCount: followers,
            followingCount: following,
        })
    }

    return (
        <section>
            <section className="card">
                <img src={user.avatar_url} className="card-img-top" alt={username} />
                <section className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.bio}</p>
                    <p className="card-text">
                        Followed: {user.followersCount} Following: {user.followingCount}
                    </p>
                </section>
            </section>            
        </section>
    )
}
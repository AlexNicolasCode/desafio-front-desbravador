import { useCallback, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const SearchEngine = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [username, setUsername] = useState(params.username)

    const handleSubmit = useCallback(($event) => {
        $event.preventDefault()
        navigate(`/user/${username}`)
    }, [username])

    return (
        <form className="input-group mb-3" onSubmit={handleSubmit}>
            <span className="input-group-text" id="basic-addon1">@</span>
            <input
                type="text"
                className="form-control"
                placeholder="Type a GitHub username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={($event) => setUsername($event.target.value)}
                value={username}
            />
        </form>
    )
}
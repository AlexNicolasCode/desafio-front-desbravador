import { useState } from "react"
import { useNavigate } from "react-router"

export function HomePage () {
    const navigate = useNavigate()
    const [username, setUsername] = useState()

    const handleSubmit = ($event) => {
        $event.preventDefault()
        navigate(`/user/${username}`)
    }

    return (
        <section>
            <form class="input-group mb-3" onSubmit={handleSubmit}>
                <span class="input-group-text" id="basic-addon1">@</span>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Type a GitHub username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={($event) => setUsername($event.target.value)}
                    value={username}
                />
            </form>
        </section>
    )
}
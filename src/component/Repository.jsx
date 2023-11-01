import axios from "axios"
import { useCallback, useRef, useState } from "react"
import { Link } from "react-router-dom"

import { Loading } from "./Loading"

export const Repository = ({ fullName, name, starsCount }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [isFetched, setIsFetched] = useState(false)
    const details = useRef({})

    const fetchRepositoryDetails = async () => {
        setIsLoading(true)
        const response = await axios.get(`https://api.github.com/repos/${fullName}`)
        setIsLoading(false)
        const { language, description, html_url } = response.data
        details.current = {
            language: language ?? '---',
            description: description ?? '---',
            githubUrl: html_url,
        }
    }

    const toggleDetailsTab = useCallback(async () => {
        setIsActive(!isActive)
        if (isFetched) {
            return
        }
        await fetchRepositoryDetails()
        setIsFetched(true)
    }, [isActive])

    return (
        <li onClick={toggleDetailsTab}>
            {name} - {starsCount}
            {isLoading && <Loading />}
            {!isLoading && isActive &&
                <section>
                    <strong>Description:</strong> {details.current.description}<br/>
                    <strong>Language:</strong> {details.current.language}<br/>
                    <Link to={details.current.githubUrl} target="_blank">
                        Check More Details
                    </Link>
                </section>
            }
        </li>
    )
}
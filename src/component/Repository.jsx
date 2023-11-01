import { useCallback, useRef, useState } from "react"
import { Link } from "react-router-dom"

import { Loading } from "./Loading"
import { useGitHubClient } from "@/hook"

export const Repository = ({ fullName, name, starsCount }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [isFetched, setIsFetched] = useState(false)
    const githubClient  = useGitHubClient()
    const details = useRef({})

    const fetchRepositoryDetails = useCallback(async () => {
        setIsLoading(true)
        const response = await githubClient.get(`/repos/${fullName}`)
        setIsLoading(false)
        const { language, description, html_url } = response.data
        details.current = {
            language: language ?? '---',
            description: description ?? '---',
            githubUrl: html_url,
        }
    }, [fullName])

    const toggleDetailsTab = useCallback(async () => {
        setIsActive(!isActive)
        if (isFetched) {
            return
        }
        await fetchRepositoryDetails()
        setIsFetched(true)
    }, [isActive, isFetched])

    return (
        <li
            className="list-group-item"
            onClick={toggleDetailsTab}
        >
            <p><strong>{name}</strong></p>
            <p>{starsCount} Stars</p>
            <section className="container">
                {isLoading && <Loading />}
                {!isLoading && isActive &&
                    <>
                        <p><strong>Description:</strong> {details.current.description}</p>
                        <p><strong>Language:</strong> {details.current.language}</p>
                        <Link to={details.current.githubUrl} target="_blank">
                            <button className="btn btn-primary">
                                Check More Details
                            </button>
                        </Link>
                    </>
                }
            </section>
        </li>
    )
}
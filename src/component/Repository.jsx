import { useCallback, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import { Loading } from "./Loading"
import { useGitHubClient } from "@/hook"

export const Repository = () => {
    const { username, reponame } = useParams()
    const githubClient  = useGitHubClient()
    const [isLoading, setIsLoading] = useState(false)
    const [repository, setRepository] = useState({
        name: '---',
        language: '---',
        description: '---',
        githubUrl: '',
        starsCount: 0,
    })

    useEffect(() => {
        fetchRepository()
    }, [username, reponame])

    const fetchRepository = useCallback(async () => {
        const response = await githubClient.get(`/repos/${username}/${reponame}`)
        setIsLoading(false)
        const { name, language, description, html_url, stargazers_count } = response.data
        setRepository({
            name: name ?? '---',
            language: language ?? '---',
            description: description ?? '---',
            githubUrl: html_url,
            starsCount: stargazers_count,
        })
    }, [username, reponame])

    return isLoading 
        ? <Loading /> 
        : (
            <section className="container">
                <p><strong>Name:</strong> {repository.name}</p>
                <p><strong>Stars:</strong> {repository.starsCount}</p>
                <p><strong>Description:</strong> {repository.description}</p>
                <p><strong>Language:</strong> {repository.language}</p>
                <Link to={repository.githubUrl} target="_blank">
                    <button className="btn btn-primary">
                        Check More Details
                    </button>
                </Link>
            </section>
        )
}
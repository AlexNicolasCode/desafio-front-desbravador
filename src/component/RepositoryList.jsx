import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import { Loading } from "@/component"
import { useUser, useGitHubClient } from "@/hook"

export const RepositoryList = () => {
    const { username } = useParams()
    const githubClient  = useGitHubClient()
    const { repositories, setRepositories, isUserFound } = useUser()
    const [isLoading , setIsLoading] = useState(false)

    useEffect(() => {
        if (isUserFound) {
            fetchRepositories()
        }
    }, [isUserFound, username])

    const reduceRepositories = (fetchedRepositories) => {
        return fetchedRepositories.map(({ full_name, name, stargazers_count }) => ({
            name: name,
            fullName: full_name,
            starsCount: stargazers_count,
        }))
    }

    const resortToDescRepositories = (repositoriesUnsorted) => {
        return repositoriesUnsorted.sort((a, b) => b.starsCount - a.starsCount)
    }

    const fetchRepositories = async () => {
        try {
            setIsLoading(true)
            const response = await githubClient.get(`/users/${username}/repos`)
            const reducedRepositories = reduceRepositories(response.data)
            const sortedRepositories = resortToDescRepositories(reducedRepositories)
            setRepositories(sortedRepositories)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ul className="list-group">
            {isLoading 
                ? <Loading />
                : repositories.map(({ fullName, name, starsCount }, index) => 
                    <li className="list-group-item" key={index}>
                        <Link to={`/repo/${fullName}`}>
                            <p><strong>{name}</strong></p>
                            <p>{starsCount} Stars</p>
                        </Link>
                    </li>
                )
            }
        </ul>
    )    
}
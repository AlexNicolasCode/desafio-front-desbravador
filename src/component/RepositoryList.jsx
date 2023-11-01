import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Repository } from "./Repository"
import { useUser } from "../hook"
import { Loading } from "./Loading"

export const RepositoryList = () => {
    const { username } = useParams()
    const { repositories, setRepositories, isUserFound } = useUser()
    const [isLoading , setIsLoading] = useState(false)

    useEffect(() => {
        if (isUserFound) {
            fetchRepositories()
        }
    }, [isUserFound])

    const fetchRepositories = async () => {
        setIsLoading(true)
        const response = await axios.get(`https://api.github.com/users/${username}/repos`)
        setIsLoading(false)
        const repositoriesReduced = response.data.map((repository) => ({
            name: repository.name,
            starsCount: repository.stargazers_count,
        }))
        const reorderedRepositories = repositoriesReduced.sort((a, b) => b.starsCount - a.starsCount)
        setRepositories(reorderedRepositories)
    }

    return (
        <ul>
            {isLoading && <Loading />}
            {!isLoading && repositories.map((repository, index) => 
                <Repository
                    name={repository.name}
                    starsCount={repository.starsCount}
                    key={index}
                />
            )}
        </ul>
    )    
}
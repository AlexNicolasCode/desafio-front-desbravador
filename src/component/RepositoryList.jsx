import { Repository } from "./Repository"

export const RepositoryList = ({ repositories }) => {
    return (
        <ul>
            {repositories.map((repository, index) => 
                <Repository name={repository.name} key={index} />
            )}
        </ul>
    )    
}
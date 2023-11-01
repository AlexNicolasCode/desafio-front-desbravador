import { Repository } from "./Repository"

export const RepositoryList = ({ repositories }) => {
    return (
        <ul>
            {repositories.map((repository, index) => 
                <Repository
                    name={repository.name}
                    starsCount={repository.starsCount}
                    key={index}
                />
            )}
        </ul>
    )    
}
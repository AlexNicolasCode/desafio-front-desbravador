import { useUser } from "../hook"

export const SelectSort = () => {
    const { repositories, setRepositories } = useUser()

    const handleRepositorySort = (sortBy) => {
        const sortMapper = {
            "desc": [...repositories].sort((a, b) => b.starsCount - a.starsCount),
            "asc": [...repositories].sort((a, b) => a.starsCount - b.starsCount),
        }
        const sortedRepositories = sortMapper[sortBy] ?? repositories
        setRepositories(sortedRepositories)
    }

    return (
        <select onChange={($event) => handleRepositorySort($event.target.value)} defaultValue={"desc"}>
            <option value={"desc"}>Decrescente</option>
            <option value={"asc"}>Crescente</option>
        </select>
    )
}
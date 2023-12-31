import { useCallback, useMemo } from "react"

import { useUser } from "@/hook"

export const SelectSort = () => {
    const { isUserFound, repositories, setRepositories } = useUser()
    const hasRepositories = useMemo(() => repositories.length > 0, [repositories])

    const handleRepositorySort = useCallback((sortBy) => {
        const sortMapper = {
            "desc": [...repositories].sort((a, b) => b.starsCount - a.starsCount),
            "asc": [...repositories].sort((a, b) => a.starsCount - b.starsCount),
        }
        const sortedRepositories = sortMapper[sortBy] ?? repositories
        setRepositories(sortedRepositories)
    }, [repositories])

    const renderSelectSort = () => (
        <select
            className="form-select mb-3"
            onChange={($event) => handleRepositorySort($event.target.value)}
            defaultValue={"desc"}
        >
            <option value={"desc"}>Decrescente</option>
            <option value={"asc"}>Crescente</option>
        </select>
    )

    return isUserFound && hasRepositories ? renderSelectSort() : <></>
}
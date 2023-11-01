import { RepositoryList, SearchEngine, SelectSort, UserCard } from "../component"
import { UserContextProvider } from "../context"

export function UserPage () {
    return (
        <>
            <SearchEngine />
            <UserContextProvider>
                <UserCard />
                <SelectSort/>
                <RepositoryList/>
            </UserContextProvider>
        </>
    )
}
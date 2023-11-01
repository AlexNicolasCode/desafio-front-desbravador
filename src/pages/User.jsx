import { RepositoryList, SelectSort, UserCard } from "../component"
import { UserContextProvider } from "../context"

export function UserPage () {
    return (
        <UserContextProvider>
            <UserCard />
            <SelectSort/>
            <RepositoryList/>
        </UserContextProvider>
    )
}
import { RepositoryList, SearchEngine, SelectSort, UserCard } from "@/component"
import { AlertContextProvider, UserContextProvider } from "@/context"

export function UserPage () {
    return (
        <>
            <SearchEngine />
            <UserContextProvider>
                <AlertContextProvider>
                    <section className="row container mx-0">
                        <section className="col-md-2">
                            <UserCard />
                        </section>
                        <section className="col-md-10">
                            <SelectSort/>
                            <RepositoryList/>
                        </section>
                    </section>
                </AlertContextProvider>
            </UserContextProvider>
        </>
    )
}
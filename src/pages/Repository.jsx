import { SearchEngine, Repository } from "@/component"

export function RepositoryPage () {
    return (
        <>
            <SearchEngine />
            <main className="container">
                <Repository />
            </main>
        </>
    )
}
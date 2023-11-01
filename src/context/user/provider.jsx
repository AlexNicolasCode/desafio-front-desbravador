import { useState } from "react"

import { UserContext } from "./context"

export function UserContextProvider({ children }) {
    const [isUserFound, setIsUserFound] = useState(false)
    const [repositories, setRepositories] = useState([])

    return (
      <UserContext.Provider 
        value={{
          repositories,
          setRepositories,
          isUserFound,
          setIsUserFound,
        }}>
        { children }
      </UserContext.Provider>
    )
}
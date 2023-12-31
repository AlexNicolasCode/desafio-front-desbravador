import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { AlertContext } from "@/context"
import { statusCode } from "@/main/helper"
import { useTextConverter } from "@/hook"

export function AlertContextProvider({ children }) {
    const { username } = useParams()
    const [isActiveAlert, setIsActiveAlert] = useState(false) 
    const [alertStatusCode, setAlertStatusCode] = useState(false)
    const { truncateText } = useTextConverter()

    useEffect(() => {
        setIsActiveAlert(false)
    }, [username])

    const renderNotFoundAlert = useCallback(() => (
        <section className="alert alert-warning">
            {truncateText(username)} Not Found on GitHub database
        </section> 
    ), [username])

    const renderForbiddenAlert = () => (
        <section className="alert alert-info">
            Ops! GitHub API rate limit exceeded!
        </section> 
    )

    const renderErrorAlert = () => (
        <section className="alert alert-danger">
            Ops! Please, Try again later!
        </section> 
    )

    const renderAlert = useCallback(() => {
        const alertMapper = {
            [statusCode.notFound]: renderNotFoundAlert(),
            [statusCode.forbidden]: renderForbiddenAlert(),
        }
        return alertMapper[alertStatusCode] ?? renderErrorAlert()
    }, [alertStatusCode])

    return (
      <AlertContext.Provider 
        value={{
            setAlertStatusCode,
            setIsActiveAlert,
        }}>
        {isActiveAlert 
            ? renderAlert()
            : children
        }
      </AlertContext.Provider>
    )
}
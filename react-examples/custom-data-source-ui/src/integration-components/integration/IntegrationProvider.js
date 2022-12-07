import * as React from 'react'
import {IAppContext, useIApp} from "../IntegrationSDK";
import {useEffect, useState} from "react";


const IntegrationContext = React.createContext()


function IntegrationProvider({integrationKey, children}) {
    const iApp = useIApp().iApp
    const [integration, setIntegration] = useState()

    useEffect(() => {
        (async () => {
            setIntegration(await iApp.integration(integrationKey).get())
        })()
    }, [])

    if (integration) {
        return <IntegrationContext.Provider value={integration}>{children}</IntegrationContext.Provider>
    }
}

function useIntegration() {
    const context = React.useContext(IntegrationContext)
    if (context === undefined) {
        throw new Error('useIntegration must be used within a IntegrationProvider')
    }
    return context
}

export {IntegrationProvider, useIntegration}
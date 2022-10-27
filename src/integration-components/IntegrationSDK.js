import {IntegrationAppClient} from '@integration-app/sdk'
import {createContext, useContext, useEffect, useState} from "react";

const IAppContext = createContext({})


function IntegrationSDKProvider({accessToken, children}) {
    const [value, setValue] = useState({})

    useEffect(() => {
        if (accessToken != "") {
            setValue({
                iApp: new IntegrationAppClient({accessToken: accessToken})
            })
        }
    }, [])
    if (value.iApp) {
        return <IAppContext.Provider value={value}>{children}</IAppContext.Provider>
    }
}

function useIApp() {
    const context = useContext(IAppContext)
    if (context === undefined) {
        throw new Error('useIApp must be used within a IntegrationSDKProvider')
    }
    return context
}

export {IntegrationSDKProvider, useIApp, IAppContext}
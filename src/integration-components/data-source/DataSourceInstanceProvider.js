import * as React from 'react'
import {IAppContext, useIApp} from "../IntegrationSDK";
import {useEffect, useState} from "react";
import {useIntegration} from "../integration/IntegrationProvider";


const DataSourceInstanceContext = React.createContext()


function DataSourceInstanceProvider({dataSourceKey, children}) {
    const iApp = useIApp().iApp
    const integration = useIntegration()
    const [dataSource, setDataSource] = useState()

    useEffect(() => {
        (async () => {
            if (dataSourceKey) {
                setDataSource(
                    await iApp.dataSourceInstance({
                        integrationKey: integration.key,
                        dataSourceKey: dataSourceKey,
                        autoCreate: true
                    }).get()
                )
            }
        })()
    }, [])

    if (dataSource) {
        return <DataSourceInstanceContext.Provider value={dataSource}>{children}</DataSourceInstanceContext.Provider>
    }
}

function useDataSourceInstance() {
    const context = React.useContext(DataSourceInstanceContext)
    if (context === undefined) {
        throw new Error('useDataSourceInstance must be used within a DataSourceInstanceProvider')
    }
    return context
}

export {DataSourceInstanceProvider, useDataSourceInstance}
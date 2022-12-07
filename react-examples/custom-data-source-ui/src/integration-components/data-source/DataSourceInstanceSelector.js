import * as React from 'react'
import {useIApp} from "../IntegrationSDK";
import {useEffect, useState} from "react";
import {useIntegration} from "../integration/IntegrationProvider";
import {useDataSourceInstance} from "./DataSourceInstanceProvider";

// import useSWR from 'swr'


function DataSourceInstanceSelector({dataSourceKey, defaultPath}) {
    const iApp = useIApp().iApp
    const integration = useIntegration()
    const dataSourceInstance = useDataSourceInstance()
    const [navigateOptions, setNavigateOptions] = useState([])
    const [path, setPath] = useState(defaultPath ? defaultPath : dataSourceInstance.rootPath)
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const [location, setLocation] = useState({})

    async function fetchLocationData() {

        let currentLocation = await iApp.dataLocation({
            integrationKey: integration.key,
            path: path,
        }).get()

        if (currentLocation.type == "collection") {
            await iApp.dataSourceInstance(dataSourceInstance.id).patch({
                config: {
                    path: path,
                }
            })
            console.log(path)
            alert("Do something when user selected Data Source Collection")
        } else {

            setNavigateOptions((await iApp.dataLocation({
                integrationKey: integration.key,
                path: path,
            }).list()).locations)

            setLocation(currentLocation)

            let newBreadcrumbs = [...breadcrumbs]
            newBreadcrumbs.push({
                location : currentLocation,
                path: path
            })
            setBreadcrumbs(newBreadcrumbs)
        }
    }

    useEffect(() => {
        fetchLocationData()
    }, [iApp, integration, path])


    if (breadcrumbs) {
        return (
            <div>
                {breadcrumbs.map((el)=>{
                    return [<button onClick={()=>{setBreadcrumbs([]);setPath(el.path);}}>{el.location.name}</button>,<span> > </span>]
                })}
                <h1>{location.name} </h1>
                <ul>
                    {navigateOptions.map((el) => {
                        return (
                            <li key={el.path}>{el.name}
                                <button onClick={() => {
                                    console.log(el)
                                    setPath(el.path)
                                }}>select
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}


export {DataSourceInstanceSelector}
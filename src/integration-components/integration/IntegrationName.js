import * as React from 'react'
import {useIntegration} from "./IntegrationProvider";

function IntegrationName() {
    const integration = useIntegration()
    if (integration) {
        return (<span>{integration.name}</span>)
    }
}


export {IntegrationName}
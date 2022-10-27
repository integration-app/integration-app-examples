import * as React from 'react'
import {useIntegration} from "./IntegrationProvider";

function IntegrationLogo() {
    const integration = useIntegration()
    if (integration) {
        return <img src={integration.logoUri}/>
    }
}


export {IntegrationLogo}
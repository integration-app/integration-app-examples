import {useIntegrationApp, useIntegrations} from '@integration-app/react'



function IntegrationsList() {
    const {items, loading, error} = useIntegrations()
    const integrationApp = useIntegrationApp()

    if (!loading && !error) {
        return (
            <ul>
                {items.map((integration) => (
                    <li key={integration.id}>{integration.name} <button onClick={integrationApp.integration(integration.key).connect}>Connect</button></li>
                ))}
            </ul>
        )
    }
}

export default IntegrationsList;

import {useIntegrationApp, useIntegrations} from '@integration-app/react'


function IntegrationsList() {

    const integrationApp = useIntegrationApp()

    const {
        items: integrations,
        refresh: refreshIntegrations
    } = useIntegrations()

    return (
        <table className="table w-full">
            <tbody>
            {integrations.map((integration) => (
                <tr key={integration.key}>
                    <td><img className="avatar w-16 11 h-16 App-logo" src={integration.logoUri}/></td>
                    <td>{integration.name}</td>
                    <td>{integration.connection ? (
                        <button className="btn btn-sm m-2" onClick={async () => {
                            await integrationApp.integration(integration.key).disconnect();
                            refreshIntegrations()
                        }}>Disconnect
                        </button>
                    ) : (
                        <button className="btn btn-sm m-2" onClick={async () => {
                            await integrationApp.integration(integration.key).connect();
                            refreshIntegrations()
                        }}>Connect
                        </button>
                    )}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default IntegrationsList;

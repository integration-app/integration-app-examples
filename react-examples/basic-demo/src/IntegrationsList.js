import {useIntegrationApp, useIntegrations} from '@integration-app/react'
import {Link} from 'react-router-dom'
import {useState} from "react";


function IntegrationsList() {

    const {items, loading, error, refresh} = useIntegrations()
    const integrationApp = useIntegrationApp()

    if (!loading && !error) {
        return (
            <table className="table w-full">
                <tbody>
                {items.map((integration) => (
                    <tr>
                        <td>
                            <div className="avatar">
                                <div className="w-16 h-16">
                                    <img className="App-logo" src={integration.logoUri}/>
                                </div>
                            </div></td>
                        <td>{integration.name}</td>
                        <td>{integration.connection ? (
                            <>
                                <Link className="btn btn-sm m-2" to={'/integrations/' + integration.key}>Configure</Link>
                                <button className="btn btn-sm m-2" onClick={async () => {
                                    await integrationApp.connection(integration.connection.id).archive();
                                    refresh()
                                }}>Disconnect
                                </button>
                            </>
                        ) : (
                            <button className="btn btn-sm m-2" onClick={async () => {
                                await integrationApp.integration(integration.key).connect();
                                refresh()
                            }}>Connect
                            </button>
                        )}</td>

                    </tr>
                ))}
                </tbody>
            </table>

        )
    }
}

export default IntegrationsList;

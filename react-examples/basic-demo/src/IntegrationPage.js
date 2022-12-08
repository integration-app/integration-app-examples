import {
    useFlowInstances,
    useFlows,
    useIntegration, useIntegrationApp,
} from '@integration-app/react'
import {Link, useParams} from 'react-router-dom'
import {useState} from "react";


function IntegrationPage() {
    const integrationKey = useParams().integrationKey
    const {integration, loading: integrationLoading, error: integrationError} = useIntegration(integrationKey)
    const {items: flows, loading: flowsLoading, error: flowsError} = useFlows()
    const {
        items: flowInstances,
        loading: flowInstancesLoading,
        error: flowInstancesError
    } = useFlowInstances({integrationKey: integrationKey})
    const integrationApp = useIntegrationApp()
    const [state, setState] = useState(false)


    // Merge flows with Instances to display if Integration is enabled for User
    flowInstances.map((flowInstance) => {
        flows.map((flow) => {
            if (flowInstance.flowId == flow.id) {
                flow.instance = flowInstance
            }
        })
    })
    console.log(flows, flowInstances)

    if (state) {
        setState(false)
    }
    const loaded = !(integrationLoading || flowsLoading || flowInstancesLoading)
    if (loaded) {
        return (<>
            <Link className="btn btn-sm m-2 btn-outline" to={'/'}>Back</Link>
            <div>
                <div className="avatar mt-4">
                    <div className="w-24 rounded">
                        <img src={integration.logoUri}/>
                    </div>
                </div>
                <h1>{integration.name}</h1>
                <table className="table w-full">
                    <tbody>
                    {flows.map((flow) => {
                        return (
                            <tr>
                                <td><input type="checkbox" className="toggle"
                                           defaultChecked={flow.instance ? flow.instance.enabled : false}
                                           onClick={async () => {
                                               if (flow.instance) {
                                                   await integrationApp.flowInstance(flow.instance.id).patch({
                                                       enabled: !flow.instance.enabled
                                                   })
                                               } else {
                                                   // Create Flow Instance for that user, since it wasn't create yet
                                                   flow.instance = await integrationApp.flowInstance({
                                                       flowId: flow.id,
                                                       integrationKey: integrationKey,
                                                       autoCreate: true
                                                   }).get()
                                               }
                                               setState(true)
                                           }}/></td>
                                <td>{flow.name}</td>
                                <td>
                                    {flow.instance && flow.instance.enabled ? (
                                        <button className="btn btn-sm m-2" onClick={() => {
                                            integrationApp.flowInstance(flow.instance.id).openConfiguration()
                                        }}>Configure
                                        </button>
                                    ) : (<></>)}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

            </div>

        </>)
    }
}

export default IntegrationPage
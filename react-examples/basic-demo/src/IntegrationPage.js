import {
    useFlowInstance,
    useFlows,
    useIntegration, useIntegrationApp,
} from '@integration-app/react'
import {Link, useParams} from 'react-router-dom'


function IntegrationPage() {
    const integrationKey = useParams().integrationKey
    const {integration, loading: integrationLoading} = useIntegration(integrationKey)
    const {items: flows, loading: flowsLoading} = useFlows()

    const loaded = !(integrationLoading || flowsLoading)
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
                        return (<FlowRow flow={flow} integration={integration}/>)
                    })}
                    </tbody>
                </table>

            </div>

        </>)
    }
}


function FlowRow(props) {

    const integrationApp = useIntegrationApp()
    const integration = props.integration
    const flow = props.flow
    const {
        flowInstance: flowInstance,
        refresh: refreshFlowInstance
    } = useFlowInstance({integrationKey: integration.key, flowKey: flow.key})


    return (
        <tr>
            <td><input type="checkbox" className="toggle"
                       defaultChecked={flowInstance?.enabled}
                       onClick={async () => {
                           integrationApp.flowInstance({
                               flowKey: flow.key,
                               integrationKey: integration.key,
                               autoCreate: true
                           }).patch({
                               enabled: !flowInstance?.enabled,
                               autoCreate: true
                           }).then(() => {
                               refreshFlowInstance()
                           })
                       }}/></td>
            <td>{flow.name}</td>
            <td>
                {(flowInstance?.enabled) ? (
                    <button className="btn btn-sm m-2" onClick={() => {
                        integrationApp.flowInstance(flowInstance.id).openConfiguration()
                    }}>Configure</button>
                ) : (<></>)}</td>
        </tr>
    )
}

export default IntegrationPage
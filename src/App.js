import './App.css';
import {IntegrationSDKProvider, useIApp} from "./integration-components/IntegrationSDK";
import * as React from "react";
import {IntegrationProvider} from "./integration-components/integration/IntegrationProvider";
import {IntegrationLogo} from "./integration-components/integration/IntegrationLogo";
import {IntegrationName} from "./integration-components/integration/IntegrationName";
import {DataSourceInstanceProvider} from "./integration-components/data-source/DataSourceInstanceProvider";
import {DataSourceInstanceSelector} from "./integration-components/data-source/DataSourceInstanceSelector";


function App() {
    const accessToken = "PASTE_ACCESS_TOKE_HERE"

    return (
        <IntegrationSDKProvider accessToken={accessToken}>
            <IntegrationProvider integrationKey={"dynamics-365"}>
                <IntegrationLogo/>
                <IntegrationName/>

                <DataSourceInstanceProvider dataSourceKey="all-data">
                    <DataSourceInstanceSelector>
                    </DataSourceInstanceSelector>
                </DataSourceInstanceProvider>
            </IntegrationProvider>
        </IntegrationSDKProvider>
    );
}

export default App;

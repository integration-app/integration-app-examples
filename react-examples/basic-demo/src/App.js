import './App.css';
import * as React from "react";
import IntegrationsList from "./IntegrationsList";
import {IntegrationAppProvider} from '@integration-app/react'

function App() {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhhLWhhaGEiLCJuYW1lIjoiVmxhZCBVcnN1bCIsImZpZWxkcyI6e30sImlzcyI6IjAxMjY4ZDhhLWFlZTMtNDEzMy04OTlmLWQ5OWExZDk2ZTk4MCIsImV4cCI6MTcwMTk2MTU2N30.EJWAFpt5nlG-1YCt5xsfN8RSP4bPPXfCx94IjTQzq_A"

    return (
        <IntegrationAppProvider token={accessToken}>
            <IntegrationsList>
            </IntegrationsList>
        </IntegrationAppProvider>
    );
}

export default App;

import IntegrationPage from "./IntegrationPage";
import {IntegrationAppProvider} from "@integration-app/react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import IntegrationsList from "./IntegrationsList";
import * as React from "react";
import {useState} from "react";

function App() {

    const [accessToken, setAccessToken] = useState()

    if (accessToken) {
        return (
            <BrowserRouter>
                <IntegrationAppProvider token={accessToken}>
                    <div className='flex place-content-center m-16'>
                        <div className='container sm-auto'>
                            <div className='px-4 py-16 bg-base-100 text-base-content'>
                                <Routes>
                                    <Route path='/' element={<IntegrationsList/>}/>
                                    <Route
                                        path='/integrations/:integrationKey'
                                        element={<IntegrationPage/>}
                                    />
                                </Routes>
                            </div>
                        </div>
                    </div>

                </IntegrationAppProvider>
            </BrowserRouter>
        )
    } else {
        (async () => {
            setAccessToken(await (await fetch("http://localhost:8080/integration-token")).json())
        })()
    }
}

export default App
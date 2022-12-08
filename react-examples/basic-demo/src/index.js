import * as React from "react";
import IntegrationsList from "./IntegrationsList";
import {IntegrationAppProvider} from '@integration-app/react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import IntegrationPage from "./IntegrationPage";
import './index.css';
import ReactDOM from 'react-dom/client';


const root = ReactDOM.createRoot(document.getElementById('root'));
const accessToken = "PUT_HERE_USER_ACCESS_TOKEN"

root.render(
    <React.StrictMode>
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
    </React.StrictMode>
);

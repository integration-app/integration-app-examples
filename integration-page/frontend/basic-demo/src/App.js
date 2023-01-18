import {IntegrationAppProvider} from "@integration-app/react";
import IntegrationsList from "./IntegrationsList";
import {useEffect, useState} from "react";

function App() {

    const [accessToken, setAccessToken] = useState()

    useEffect(() => {
        (async () => {
            // Get Integration App Access Token from your backend
           // const tokenResp = await fetch("http://localhost:8080/integration-token")
            // setAccessToken(await tokenResp.json())
            setAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODNjNTY5MGZmMWU1ZWUzODhhYjg1MyIsIm5hbWUiOiJWbGFkeXNsYXYgVXJzdWwiLCJmaWVsZHMiOnsiYXV0aFRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2SWpZeE9ETmpOVFk1TUdabU1XVTFaV1V6T0RoaFlqZzFNeUlzSW01aGJXVWlPaUpXYkdGa0lGVnljM1ZzSWl3aVptbGxiR1J6SWpwN2ZTd2lhWE56SWpvaU1ETmxOek5qTURFdE5XUTBNQzAwWmpKakxUbGxPVFl0TURGak5HVXlOVEk1TUdRMUlpd2laWGh3SWpveE56QXdPRFU0TURnNWZRLks2X00xNTBzdjhWc0dsX0lhNktkUkV6bERwTEJSUGN2Ymkya0VYOW5CTFEifSwiaXNzIjoiMDNlNzNjMDEtNWQ0MC00ZjJjLTllOTYtMDFjNGUyNTI5MGQ1IiwiZXhwIjoxNzA1MzQ1ODQ1fQ.wwib_53i1d_zLlS-TUEeLTkbVh1SS9n_gqXu0IbyJoY")

        })()
    }, [])
    if (accessToken) {
        return (
            // IntegrationAppProvider allows you to use Integration.app React hooks in all child components
            <IntegrationAppProvider token={accessToken}>
                <IntegrationsList/>
            </IntegrationAppProvider>
        )
    }

}

export default App
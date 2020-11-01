import React, { useState, useEffect } from "react"
import "./App.css"

const loginAndGetHoldings = async () => {
  const tokenRequestPayload = new URLSearchParams()
  tokenRequestPayload.append("username", "admin@frontend.com")
  tokenRequestPayload.append("password", "changethis")

  const tokenResponse = await fetch("/api/v1/login/access-token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: tokenRequestPayload,
  })
  const { access_token: token } = await tokenResponse.json()

  const holdingsResponse = await fetch("/api/v1/holdings/", {
    // careful, you need the trailing slash ;)
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return holdingsResponse.json()
}

const App = () => {
  const [data, setData] = useState({ holdings: [] })

  useEffect(() => {
    const getData = async () => {
      const holdings = await loginAndGetHoldings()
      setData({ holdings })
    }
    getData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <pre style={{ textAlign: "left" }}>
          Holdings: {JSON.stringify(data.holdings, null, 2)}
        </pre>
      </header>
    </div>
  )
}

export default App

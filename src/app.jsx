import "./app.css"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { gql } from "@apollo/client"

import { Home, Companies, Company, Cars, Car } from "./components"

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
})

client
  .query({
    query: gql`
      query {
        allCompanies {
          edges {
            node {
              name
            }
          }
        }
      }
    `,
  })
  .then((result) => console.log(result))
  .catch((error) => console.log(`error occurred ${error}`))

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/companies">
            <Companies />
          </Route>
          <Route path="/company/:id">
            <Company />
          </Route>
          <Route path="/cars">
            <Cars />
          </Route>
          <Route path="/car/:id">
            <Car />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App

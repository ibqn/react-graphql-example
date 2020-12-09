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

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="/companies">companies</Link>
              </li>
              <li>
                <Link to="/cars">cars</Link>
              </li>
            </ul>
          </nav>

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
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App

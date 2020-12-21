import "./app.css"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  // createHttpLink,
  // from,
} from "@apollo/client"
import { gql } from "@apollo/client"
// import { onError } from "@apollo/client/link/error"

import { Home, Companies, Company, Cars, Car } from "./components"
import { Login, Register } from "./components/auth"

// const httpLink = createHttpLink({
//   uri: "/graphql",
// })

// const errorLink = onError(({ response, graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.map(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     )

//   if (networkError) {
//     console.log(`[Network error]: ${networkError}`)
//   }
// })

// const link = from([errorLink, httpLink])

const client = new ApolloClient({
  uri: "/graphql",
  // link,
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
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
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

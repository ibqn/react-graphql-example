import React from "react"

import { useQuery, gql } from "@apollo/client"
import { Link } from "react-router-dom"

const COMPANIES = gql`
  query {
    allCompanies {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

const Companies = () => {
  const { loading, error, data } = useQuery(COMPANIES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <h2>companies</h2>
      {data.allCompanies.edges.map(({ node: { id, name } }) => (
        <div key={id}>
          <p>
            <Link to={`/company/${id}`}>{id}</Link>: {name}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Companies

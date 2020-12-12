import React, { useState } from "react"

import { useMutation, useQuery, gql } from "@apollo/client"
import { Link } from "react-router-dom"

const CREATE_COMPANY = gql`
  mutation CreateCompany($name: String!) {
    createCompany(input: { name: $name }) {
      company {
        name
        id
      }
    }
  }
`

const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: ID!) {
    deleteCompany(input: { id: $id }) {
      ok
    }
  }
`

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
  const [name, setName] = useState("")
  const changeName = ({ target: { value } }) => setName(value)

  const [deleteCompany] = useMutation(DELETE_COMPANY)

  const [createCompany, { loading: formLoading }] = useMutation(
    CREATE_COMPANY
    // { refetchQueries: [{ query: COMPANIES }] }
    // {
    //   update: (cache, { data: { createCompany } }) => {
    //     console.log("cache", cache)
    //     cache.modify({
    //       fields: {
    //         allCompanies: (existingCompanies = []) => {
    //           console.log("edges", existingCompanies)
    //           console.log("data", createCompany)
    //           const newCompanyRef = cache.writeFragment({
    //             data: createCompany,
    //             fragment: gql`
    //               fragment NewCompanyEdge on CompanyNodeEdge {
    //                 node {
    //                   id
    //                   name
    //                 }
    //               }
    //             `,
    //           })
    //           console.log([...existingCompanies, newCompanyRef])
    //           return [...existingCompanies, newCompanyRef]
    //         },
    //       },
    //     })
    //   },
    // }
  )

  const handleRemove = (id) => {
    deleteCompany({
      variables: { id },
      update: (cache) => {
        const data = cache.readQuery({ query: COMPANIES })
        cache.writeQuery({
          query: COMPANIES,
          data: {
            ...data,
            allCompanies: {
              ...data.allCompanies,
              edges: data.allCompanies.edges.filter(
                ({ node: { id: company_id } }) => company_id !== id
              ),
            },
          },
        })
      },
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!/\S/.test(name)) {
      return
    }

    createCompany({
      variables: { name },
      update: (cache, { data: { createCompany } }) => {
        const data = cache.readQuery({ query: COMPANIES })
        cache.writeQuery({
          query: COMPANIES,
          data: {
            ...data,
            allCompanies: {
              ...data.allCompanies,
              edges: [...data.allCompanies.edges, createCompany],
            },
          },
        })
      },
    })
    console.log(`add '${name}'`)
    setName("")
  }

  const { loading, error, data } = useQuery(COMPANIES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <h2>companies</h2>
      <div>
        <p>add new company</p>
        <form onSubmit={handleSubmit} disabled={formLoading}>
          <label>
            name: <input type="text" value={name} onChange={changeName} />
          </label>{" "}
          <input type="submit" value="add" />
        </form>
      </div>

      <ul>
        {data.allCompanies.edges.map(({ node: { id, name } }) => (
          <li key={id}>
            <p>
              <Link to={`/company/${id}`}>{id}</Link>: {name}{" "}
              <button onClick={() => handleRemove(id)}>remove</button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Companies

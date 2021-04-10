import { useState, useEffect } from "react"

import { useMutation, useLazyQuery, gql } from "@apollo/client"
import { Link } from "react-router-dom"

const CREATE_COMPANY = gql`
  mutation CreateCompany($name: String!) {
    createCompany(input: { name: $name }) {
      company {
        id
        name
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
  query Companies {
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

  const [getCompanies, { called, loading, error, data }] = useLazyQuery(
    COMPANIES
  )

  const [deleteCompany] = useMutation(DELETE_COMPANY)

  const [createCompany, { loading: formLoading }] = useMutation(
    CREATE_COMPANY
    // { refetchQueries: [{ query: COMPANIES }] }
  )

  useEffect(() => getCompanies(), [getCompanies])

  const handleRemove = async (id) => {
    await deleteCompany({
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

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!/\S/.test(name)) {
      return
    }

    await createCompany({
      variables: { name },
      // update: (cache, { data: { createCompany } }) => {
      //   const data = cache.readQuery({ query: COMPANIES })
      //   cache.writeQuery({
      //     query: COMPANIES,
      //     data: {
      //       ...data,
      //       allCompanies: {
      //         ...data.allCompanies,
      //         edges: [...data.allCompanies.edges, createCompany],
      //       },
      //     },
      //   })
      // },
      update: (cache, { data: { createCompany } }) => {
        // console.log("cache", cache)
        cache.modify({
          fields: {
            allCompanies: (existingCompanies = []) => {
              // console.log("edges", existingCompanies)
              const { company } = createCompany
              // console.log("data", company)
              const newCompanyRef = cache.writeFragment({
                data: company,
                fragment: gql`
                  fragment NewCompanyEdge on CompanyNodeEdge {
                    node {
                      id
                      name
                    }
                  }
                `,
              })
              return {
                ...existingCompanies,
                edges: { ...existingCompanies.edges, newCompanyRef },
              }
            },
          },
        })
      },
    })
    console.log(`added '${name}'`)
    setName("")
  }

  if (!called || loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error :(</p>
  }

  return (
    <>
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
        {/* {data?.allCompanies?.edges?.map(({ node: { id, name } }) => ( */}
        {data.allCompanies.edges.map(({ node: { id, name } }) => (
          <li key={id}>
            <p>
              <Link to={`/company/${id}`}>{id}</Link>: {name}{" "}
              <button onClick={async () => await handleRemove(id)}>
                remove
              </button>
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Companies

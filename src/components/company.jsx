import { useQuery, gql } from "@apollo/client"
import { Link, useParams } from "react-router-dom"

const COMPANY = gql`
  query Company($company_id: ID!) {
    company(id: $company_id) {
      id
      name
      cars {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`

const Company = () => {
  const { id: company_id } = useParams()
  const { loading, error, data } = useQuery(COMPANY, {
    variables: { company_id },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error {error}</p>

  const { id, name } = data.company

  return (
    <>
      <h2>company</h2>
      <div>
        <p>
          id: {id}
          {/* {JSON.stringify(data.company)} */}
          {/* {company_id} */}
        </p>
        <p>name: {name}</p>
        <p>Cars:</p>
        <ul>
          {data.company.cars.edges.map(({ node: { id, name } }) => (
            <li key={id}>
              <p>
                <Link to={`/car/${id}`}>{id}</Link>: {name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Company

import { useQuery, gql } from "@apollo/client"
import { Link } from "react-router-dom"

const CARS = gql`
  query Cars {
    allCars {
      edges {
        node {
          id
          name
          notes
        }
      }
    }
  }
`

const Cars = () => {
  const { loading, error, data } = useQuery(CARS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const cars = data?.allCars?.edges.map(({ node }) => node)

  return (
    <>
      <h2>cars</h2>
      {/* {JSON.stringify(cars)} */}
      {cars.map(({ id, name, notes }) => (
        <p key={id}>
          <Link to={`/car/${id}`}>{name}</Link> notes: {notes}
        </p>
      ))}
    </>
  )
}

export default Cars

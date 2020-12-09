import React from "react"

import { useQuery, gql } from "@apollo/client"
import { Link, useParams } from "react-router-dom"

const CAR = gql`
  query Car($car_id: ID!) {
    car(id: $car_id) {
      id
      name
      notes
    }
  }
`

const Car = () => {
  const { id: car_id } = useParams()
  const { loading, error, data } = useQuery(CAR, {
    variables: { car_id },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error {error}</p>

  const { id, name, notes } = data.car

  return (
    <div>
      <h2>car</h2>
      <div>
        <p>
          id: {id}
          {/* {JSON.stringify(data.company)} */}
        </p>
        <p>name: {name}</p>
        <p>notes: {notes}</p>
      </div>
    </div>
  )
}

export default Car

import { useEffect, useState } from "react"
import ReservationCard from "../cards/reservationCard"
import { useLocation } from 'react-router-dom';



const RestaurantUserReservations = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const restaurantId = location.state.restaurantId
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch(`http://localhost:3001/reservations/restaurant/user?userId=${userId}&restaurantId=${restaurantId}`, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },

    })
      .then(res => res.json())
      .then(json => setData(json))
  },

    [userId, restaurantId])
  return (
    <div className="mainContainer">

      {data.map((dataEntry) => {
        return (
          <div className="card mb-3 shadow-sm" key={dataEntry._id}>
            <ReservationCard
              contactInfo={dataEntry.contactInfo}
              numberOfGuests={dataEntry.numberOfGuests}
              totalAmount={dataEntry.totalAmount}
              status={dataEntry.status}
            >

            </ReservationCard>
          </div>
        )
      }

      )}
    </div>)

}

export default RestaurantUserReservations;
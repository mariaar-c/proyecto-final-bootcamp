import React, { useState, useEffect } from "react";
import UserCard from "../components/cards/userCard";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileReservationCard from "../components/cards/ProfileReservationCard";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const userResponse = await fetch(
          "http://localhost:3001/users/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userResponse.ok) throw new Error("Error fetching user data");
        const userData = await userResponse.json();
        setUser(userData);

        await getUserReservations();
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const getUserReservations = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/reservations/user?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const reservations = await response.json();

        const reservationsWithRestaurantNames = [];
        for (const reservation of reservations) {
          const restaurantResponse = await fetch(
            `http://localhost:3001/restaurants?id=${reservation.restaurantId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
              
          if (!restaurantResponse.ok) {
            throw new Error(
              `Error fetching restaurant with ID: ${reservation.restaurantId}`
            );
          }

          const restaurantData = await restaurantResponse.json();
          const reservationWithRestaurant = {
            ...reservation,
            restaurantName: restaurantData.restaurant.name,
          };

          reservationsWithRestaurantNames.push(reservationWithRestaurant);
        }

        setRestaurants(reservationsWithRestaurantNames);
        setError(null);
      } catch (error) {
        setError(error.message);
        setRestaurants([]);
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchData();
  }, [userId]);

  if (loading)
    return (
      <div className="container mt-5">
        <p>Cargando...</p>
      </div>
    );
  if (error)
    return (
      <div className="container mt-5">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-md-4">
          {user ? (
            <UserCard username={user.username} picture={user.picture} />
          ) : (
            <p>No user data available</p>
          )}
        </div>

        <div className="col-md-8">
          <h2>Mis reservas</h2>
          <div className="row">
            {restaurants.length > 0 ? (
              restaurants.map((reservation) => (
                <div className="col-md-4 mb-4" key={reservation._id}>
                  <ProfileReservationCard
                    contactInfo={reservation.contactInfo}
                    date={reservation.date}
                    numberOfGuests={reservation.numberOfGuests}
                    status={reservation.status}
                    restaurantId={reservation.restaurantId}
                    restaurantName={reservation.restaurantName}
                  />
                </div>
              ))
            ) : (
              <p>Actualmente no tienes ninguna reserva.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

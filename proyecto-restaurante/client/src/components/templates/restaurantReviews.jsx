import React from "react";
import ReviewCard from "../cards/reviewCard";
import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';

const ReviewsList = () => {
    const [Reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const id = location.state.restaurantId;
  
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await fetch('http://localhost:3001/reviews/restaurant/?restaurantId='+id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          setReviews(data); 
        } catch (err) {
          setError(err.message); 
        }
      };
  
      fetchReviews();
    },[id]);
  
    if (error) {
      return <div>Error: {error}</div>; 
    }
  
    return (
      <div className="container">
        <div className="row">
          {Reviews.map(review => {
            return <div className="col-md-4" key={review._id}>
            <ReviewCard
            userId = {review.userId}
            score = {review.score}
            text = {review.text}
            createdAt = {review.createdAt}
            
            >
  
            </ReviewCard>
          </div>
          })}
            
          
        </div>
      </div>
    );
  };
  
  export default ReviewsList;
  
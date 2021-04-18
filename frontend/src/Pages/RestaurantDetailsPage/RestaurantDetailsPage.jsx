import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantDetails } from "../../Actions/RestaurantActions/RestaurantDetailsActions";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
import "./RestaurantDetailsPage.css";
import { addReviewAction } from "../../Actions/ReviewActions/ReviewActions";
import { removeWord } from "../../Utilis/Regex";
import Rating from "../../Components/Rating/Rating";
import { Link } from "react-router-dom";
import { ADD_REVIEW_RESET } from "../../Constants/ReviewConstants/AddReviewConstants";
const RestaurantDetailsPage = ({ match, history }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const restaurantId = match.params.id;

  const restaurantDetails = useSelector((state) => state.restaurantDetails);
  const { restaurant, error, loading } = restaurantDetails;

  const loginInfo = useSelector((state) => state.loginInfo);
  const {  user } = loginInfo;

  const postReview = useSelector((state) => state.postReview);
  const {
    success: successReview,
    error: errorReview,
    
  } = postReview;

  const dispatch = useDispatch();
  console.log(restaurant);
  useEffect(() => {
    if (successReview) {
      alert("review Submitted");
      setComment("");
      setRating(0);
      dispatch({ type: ADD_REVIEW_RESET });
    }
    dispatch(getRestaurantDetails(restaurantId));
  }, [dispatch, match, restaurantId, successReview]);

  const jumpToDishPage = (e) => {
    e.preventDefault();
    history.push(`/restaurants/${restaurantId}/dishes`);
  };

  const reviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      addReviewAction(restaurantId, {
        rating,
        comment,
      })
    );
  };

  return (
    <div>
      <div className="restaurant-details">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message> {error} </Message>
        ) : (
          <div>
            <div>
              <h2 className="restaurant-page-title"> {restaurant.name} </h2>
              <button className="order-button" onClick={jumpToDishPage}>
                {" "}
                Order Now{" "}
              </button>
            </div>

            <div className="restaurant-details-card">
              <div className="restaurant-images grid-item">
                <img src={restaurant.photo} alt="dishes" />
                <img src={restaurant.photo2} alt="dishes" />
              </div>
              <h4>Description</h4> <h4> {restaurant.description} </h4>
              <h4>Email: {restaurant.email}</h4>
              <h4>Phone Number: {restaurant.phone}</h4>
              <h4>Website: {restaurant.website}</h4>
              <h5>
                {restaurant.location.street} {restaurant.location.streetNumber}{" "}
                {restaurant.location.city &&
                  removeWord(restaurant.location.city)}{" "}
              </h5>
            </div>
            <div>
              <div>
                <h2>Reviews</h2>
                {restaurant.reviews.length === 0 && (
                  <Message>No Reviews</Message>
                )}
                <div>
                  {restaurant.reviews.map((review) => (
                    <div key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                  <div>
                    <h2>Write A customer Review</h2>
                    <div className="review-container">
                      {errorReview && <Message> {errorReview} </Message>}
                      {user ? (
                        <form onSubmit={reviewHandler}>
                              <div>
                                <label >Rate Us!</label>
                            <select
                              type="select"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="1">1 poor</option>
                              <option value="2">2 fair</option>
                              <option value="3">3 good</option>
                              <option value="4">4 very good</option>
                              <option value="5">5 excellent</option>
                            </select>
                          </div>
                              <div>
                              <label >Leave A Comment</label>
                            <textarea
                              value={comment}
                              cols="30"
                              rows="10"
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                          </div>

                          <button type="submit">Submit</button>
                        </form>
                      ) : (
                        <Message>
                          You need to be logged in to leave a review!{" "}
                          <Link to="/login">Sign In</Link>
                        </Message>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;

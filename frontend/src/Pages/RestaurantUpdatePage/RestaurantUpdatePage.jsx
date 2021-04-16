import React, { useState, useEffect } from "react";
import { RESTAURANT_UPDATE_RESET } from "../../Constants/RestaurantConstants/RestaurantUpdateConstants";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantDetails } from "../../Actions/RestaurantActions/RestaurantDetailsActions";
import { useHistory } from "react-router-dom";
import { updaterRestaurantAction } from "../../Actions/RestaurantActions/RestaurantUpdateActions";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
import "./RestaurantUpdatePage.css";
import axios from "axios";
const RestaurantUpdatePage = ({ match }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fusion, setFusion] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [vegan, setVegan] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [traditional, setTraditional] = useState(false);
  const [uploading, setUploading] = useState(false);
  const restaurantId = match.params.restaurantId;
  const dispatch = useDispatch();

  const updatedRestaurant = useSelector((state) => state.updatedRestaurant);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = updatedRestaurant;

  const restaurantDetails = useSelector((state) => state.restaurantDetails);
  const { success, loading, restaurant, error } = restaurantDetails;
  const previousPage = useHistory();
  useEffect(() => {
    if (errorUpdate) {
      dispatch({
        type: RESTAURANT_UPDATE_RESET,
      });
      setTimeout(() => {
        previousPage.goBack();
      }, 4500);
    }
    if (successUpdate) {
      dispatch({
        type: RESTAURANT_UPDATE_RESET,
      });
      dispatch(getRestaurantDetails(restaurantId));
      previousPage.goBack();
    } else {
      if (!restaurant.name || restaurant._id !== restaurantId) {
        dispatch(getRestaurantDetails(restaurantId));
      } else {
        setName(restaurant.name);
        setDescription(restaurant.description);
        setVegan(restaurant.vegan);
        setFusion(restaurant.fusion);
        setVegetarian(restaurant.vegetarian);
        setTraditional(restaurant.traditional);
        setWebsite(restaurant.website);
        setPhone(restaurant.phone);
        setEmail(restaurant.email);
        setPhoto(restaurant.photo);
        setPhoto2(restaurant.photo2);
        setAddress(restaurant.address);
      }
    }
  }, [
    dispatch,
    restaurantId,
    restaurant,
    successUpdate,
    errorUpdate,
    previousPage,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updaterRestaurantAction({
        _id: restaurantId,
        name,
        vegan,
        vegetarian,
        description,
        traditional,
        website,
        photo,
        photo2,
        fusion,
        phone,
        email,
        address,
      })
    );
  };
  console.log(restaurant);
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/v1/uploads", formData, config);
      setPhoto(data);

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadFileHandler2 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/v1/uploads", formData, config);
      setPhoto2(data);

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  return (
    <div>
      <button onClick={() => previousPage.goBack()}>Back</button>
      <div>
        <h1 className='restaurant-update-title'>Update Restaurant</h1>
      </div>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message> {errorUpdate} </Message>}
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message> {error} </Message>
        ) : (
          <div className="form-container">
            <form onSubmit={submitHandler} className="restaurant-form">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-login-register"
                />
                <label>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-login-register"
                />
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-login-register"
                />
                <label>Website</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="input-login-register"
                />
                <label>Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-login-register"
                />
              </div>
              <div>
                <label>Photo1</label>
                <input
                  type="text"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="input-login-register"
                />
                <label className="file-label-input">Choose a file</label>
                <input
                  type="file"
                  name=""
                  id="image-file"
                  onChange={uploadFileHandler}
                  className="file-input"
                />
                <br></br>
                <label>Photo2</label>
                <input
                  type="text"
                  value={photo2}
                  onChange={(e) => setPhoto2(e.target.value)}
                  className="input-login-register"
                />
                <label className="file-label-input">Choose a file</label>
                <input
                  type="file"
                  name=""
                  id="image-file"
                  onChange={uploadFileHandler2}
                />
                {uploading && <Loader />}
                <div className="checkbox-container">
                  <label>Vegan</label>
                  <input
                    type="checkbox"
                    checked={vegan}
                    onChange={(e) => setVegan(e.target.checked)}
                    className="input-checkbox"
                  />
                  <label>Vegetarian</label>
                  <input
                    type="checkbox"
                    checked={vegetarian}
                    onChange={(e) => setVegetarian(e.target.checked)}
                    className="input-checkbox"
                  />
                  <label>Fusion</label>
                  <input
                    type="checkbox"
                    checked={fusion}
                    onChange={(e) => setFusion(e.target.checked)}
                    className="input-checkbox"
                  />
                  <label>Traditional</label>
                  <input
                    type="checkbox"
                    checked={traditional}
                    onChange={(e) => setTraditional(e.target.checked)}
                    className="input-checkbox"
                  />
                </div>
              </div>

              <button type="submit" className="dish-edit-update-button">
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantUpdatePage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDishDetails } from "../../Actions/DishesActions/DishDetailsActions";
import { Link, useHistory } from "react-router-dom";
import Loader from "../../Components/Loading/Loader";
import { updateDish } from "../../Actions/DishesActions/DishUpdateActions";
import Message from "../../Components/Message/Message";
import { UPDATE_DISH_RESET } from "../../Constants/DishesConstants/DishUpdateConstants";
import axios from "axios";
const DishEditPage = ({ match }) => {
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [vegan, setVegan] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [traditional, setTraditional] = useState(false);
  const [chinese, setChinese] = useState(false);
  const [mexican, setMexican] = useState(false);
  const [greek, setGreek] = useState(false);
  const [italian, setItalian] = useState(false);
  const [available, setAvailable] = useState(false);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const dishId = match.params.dishId;
  const dispatch = useDispatch();

  const dishDetails = useSelector((state) => state.dishDetails);
  const { dish, loading, error } = dishDetails;

  const dishUpdate = useSelector((state) => state.dishUpdate);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = dishUpdate;
  const previousPage = useHistory();
  useEffect(() => {
    if (errorUpdate) {
      dispatch({
        type: UPDATE_DISH_RESET,
      });
      setTimeout(() => {
        previousPage.goBack();
      }, 4500);
    }
    if (successUpdate) {
      dispatch({
        type: UPDATE_DISH_RESET,
      });
      previousPage.goBack();
    } else {
      if (!dish.data.name || dish.data._id !== dishId) {
        dispatch(getDishDetails(dishId));
      } else {
        setName(dish.data.name);
        setDescription(dish.data.description);
        setPrice(dish.data.price);
        setVegan(dish.data.vegan);
        setVegetarian(dish.data.vegetarian);
        setTraditional(dish.data.traditional);
        setChinese(dish.data.chinese);
        setMexican(dish.data.mexican);
        setGreek(dish.data.greek);
        setItalian(dish.data.italian);
        setAvailable(dish.data.available);
        setImage(dish.data.image);
      }
    }
  }, [dispatch, dishId, dish, successUpdate]);

  {
    !loading && console.log(dish.data.name);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDish({
        _id: dishId,
        name,
        price,
        vegan,
        vegetarian,
        description,
        traditional,
        chinese,
        mexican,
        italian,
        greek,
        available,
        image,
      })
    );
  };

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
      setImage(data);
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
        <h1>Update Dish</h1>
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
            <form onSubmit={submitHandler}>
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
              <label>Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input-login-register"
              />

              <label>Available</label>
              <input
                type="number"
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
                className="input-login-register"
              />
              <label>Image</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="input-login-register"
              />
              <label>Choose a file</label>
              <input
                type="file"
                name=""
                id="image-file"
                onChange={uploadFileHandler}
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
                <label>Greek</label>
                <input
                  type="checkbox"
                  checked={greek}
                  onChange={(e) => setGreek(e.target.checked)}
                  className="input-checkbox"
                />
                <label>Mexican</label>
                <input
                  type="checkbox"
                  checked={mexican}
                  onChange={(e) => setMexican(e.target.checked)}
                  className="input-checkbox"
                />
                <label>Traditional</label>
                <input
                  type="checkbox"
                  checked={traditional}
                  onChange={(e) => setTraditional(e.target.checked)}
                  className="input-checkbox"
                />
                <label>Chinese</label>
                <input
                  type="checkbox"
                  checked={chinese}
                  onChange={(e) => setChinese(e.target.checked)}
                  className="input-checkbox"
                />
                <label>Italian</label>
                <input
                  type="checkbox"
                  checked={italian}
                  onChange={(e) => setItalian(e.target.checked)}
                  className="input-checkbox"
                />
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

export default DishEditPage;

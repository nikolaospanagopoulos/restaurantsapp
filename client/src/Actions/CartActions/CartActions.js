import axios from 'axios'
import { CART_ADD_ITEM } from '../../Constants/CartConstants/CartConstants'

//with getState we have access to whole state
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/dishes/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            available: data.available,
            qty

        }
    })
    //save to local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

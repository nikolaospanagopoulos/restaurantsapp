import {CART_SAVE_DELIVERY_ADDRESS} from '../../Constants/CartConstants/CartConstants'

export const saveShippingAddress = (data) => (dispatch) =>{
    dispatch({
        type:CART_SAVE_DELIVERY_ADDRESS,
        payload:data
    })
    localStorage.setItem('deliveryAddress',JSON.stringify(data))
}
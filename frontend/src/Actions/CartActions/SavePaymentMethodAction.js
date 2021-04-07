import {CART_SAVE_PAYMENT_METHOD} from '../../Constants/CartConstants/CartConstants'

export const savePaymentMethod = (data) => (dispatch) =>{
    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload:data
    })
    localStorage.setItem('paymentMethod',JSON.stringify(data))
}
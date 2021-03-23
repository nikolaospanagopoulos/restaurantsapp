import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'

const DeliveryPage = ({history}) => {
    const [address,setAddress] = useState('')
    const [city,setCity] = useState('')
    const [postalCode,setPostalCode] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
    }
    return ( 
        <div>
            <h1>Delivery Info</h1>
            <div className='form-container'>
                <form onSubmit={submitHandler
                }>

                </form>
            </div>
        </div>
     );
}
 
export default DeliveryPage;
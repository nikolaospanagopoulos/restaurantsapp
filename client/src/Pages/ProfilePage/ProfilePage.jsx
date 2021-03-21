import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import Message from '../../Components/Message/Message'
import Loader from '../../Components/Loading/Loader'
import {loginInfoAction} from '../../Actions/UserActions/LogedUserInfoActions'
import {USER_UPDATE_PROFILE_RESET} from '../../Constants/UserConstants/LogedInUserInfoConstants'

const ProfilePage = ({history}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')

    const dispatch = useDispatch()
    const loginInfo = useSelector(state => state.loginInfo)
    const { loading, success , user } = loginInfo;

    useEffect(() => {
        if(!success){
            history.push('/login')
        }else{
            if(!success || !user){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(loginInfoAction())
                
            }else{
                setName(user.data.name)
                setEmail(user.data.email)
            }
        }
    },[dispatch,history,success,user])



    

    return ( 
        <div>
            <div className="form-container">
                <form>
                    <div>
                        <label>Name...</label>
                        <input type="text" className='input-login-register' value={name}/>
                        <label>Email...</label>
                        <input type="email"  className='input-login-register' value={email}/>
                        <label>Password...</label>
                        <input type="password"  className='input-login-register'/>
                        <label>Confirm Password...</label>
                        <input type="password"  className='input-login-register'/>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default ProfilePage;
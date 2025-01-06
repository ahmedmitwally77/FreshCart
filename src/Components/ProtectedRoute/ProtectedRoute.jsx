import { Navigate, } from 'react-router-dom';
import {  useContext } from 'react';
import { tokenContext } from '../Context/TokenContext/Token.Context';

export default function ProtectedRoute({children}) {
const {token} = useContext(tokenContext);
  if(token)
    return children
  else
    return <Navigate to="/login" />

}

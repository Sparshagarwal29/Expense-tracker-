import { Navigate } from "react-router-dom"
import { useExpense  } from '../Context/expense-Context.jsx';

export const PrivateRouter = ({children}) =>{
    const {islogin} = useExpense();

    return islogin ? children : <Navigate to="/login" />

} 
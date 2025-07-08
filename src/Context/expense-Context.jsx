import { useContext , createContext , useReducer } from "react";
import {expenseCal} from '../Reducer/espenseHandler.jsx'

const ExpenseContext =  createContext();


const ExpenseProvider  = ({children}) => {
          

let initialState = {
data: '',
list: [],
sum: 0 ,
category: '',
islogin: false 
}

const [{data , list , sum, category, islogin}, expenseDispatch] =useReducer(expenseCal, initialState);


 
        return(
            <ExpenseContext.Provider value={{ data, list, sum, category, islogin , expenseDispatch }}>
                {children}
            </ExpenseContext.Provider>
        )
        
}

const useExpense = ()=> useContext(ExpenseContext)
export {useExpense , ExpenseProvider}
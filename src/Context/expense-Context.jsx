import { useContext , createContext , useReducer } from "react";
import {expenseCal} from '../Reducer/espenseHandler.jsx'
import Select from "../category.jsx";

const ExpenseContext =  createContext();


const ExpenseProvider  = ({children}) => {
          

let initialState = {
data: '',
list: [],
sum: 0 ,
category: ''
}

const [{data , list , sum, category}, expenseDispatch] =useReducer(expenseCal, initialState);



        return(
            <ExpenseContext.Provider value={{ data, list, sum, category, expenseDispatch }}>
                {children}
            </ExpenseContext.Provider>
        )
        
}

const useExpense = ()=> useContext(ExpenseContext)
export {useExpense , ExpenseProvider}
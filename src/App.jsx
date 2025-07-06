import { useReducer } from 'react';
import Select from './category';
import {expenseCal} from './espenseHandler.js'
// import './App.css'

let initialState = {
    data: '',
    list: [],
    sum: 0 ,
    category: ''
}


function App() {

const [state, expenseDispatch] =useReducer(expenseCal, initialState);

const handlechange =(e) =>{
    expenseDispatch({
        type: "INPUT",
        payload: e.target.value
    })

}
const addExpense = () =>{
    expenseDispatch({
        type: "ADD"
    })
}
const subExpense =(id, value) =>{
    expenseDispatch({
        type: "SUB",
        payload: {id, value}
    })
}

return (
    <>
        <div className='conatiner'>
            <div className="header">
                <h1>Expense Tracker</h1>
                 <Select category= {state.category} expenseDispatch={expenseDispatch}/>
                <input value={state.data} onChange ={handlechange}  type="number"  placeholder='enter amount'/> {/* /*with data it become a controled input */ }
               <button onClick={addExpense}>Add</button> 
            </div>
            <div>
                {state.list?.length > 0 && state.list.map((iteam) =>(
                    <div key={iteam.id}>
                        <label>
                            <span> Category : {iteam.category}, Amount:  {iteam.data}</span>
                            <button onClick={() => {subExpense(iteam.id , iteam.data) }}>delete</button>
                        </label>
                    </div>
                ))}
                <h1>total expense : {state.sum}</h1>
            </div>
        </div>
    </>
)
}

export default App

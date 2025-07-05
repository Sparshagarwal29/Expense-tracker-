import { useReducer } from 'react';
import {v4 as uuid} from "uuid";
import Selcet from './category';
// import './App.css'

let initialState = {
    data: '',
    list: [],
    sum: 0 
}

const expenseCal = (state, action) =>{
    switch (action.type) {
        case "INPUT":
            return{
                ...state,
                data: action.payload
            };
        case "ADD":{
            if(!state.data){
                alert("bosdk number daal gandu");
                return state;
            }
            const numvalue = parseFloat(state.data)
            if(isNaN(numvalue)){
                alert("put valid input");
                return state;
            }
            return{
                ...state,
                // list: [...state.list, {id: uuid(), data: numvalue}],
                list: [...state.list, { id: uuid(), data: numvalue }],
                sum: state.sum + numvalue ,
                data: ''
            };
        }
        case "SUB":{
            let {id,value} = action.payload
            return {
                ...state,
                list: state.list.filter(iteam => iteam.id!==id),
                sum: state.sum-value,
            };
        }
        default:
          return  state;
    }
};

function App() {

const [state, expenseDispatch] =useReducer(expenseCal, initialState)

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
                 <Selcet/>
                <input value={state.data} onChange ={handlechange}  type="number"  placeholder='enter amount'/> {/* /*with data it become a controled input */ }
               <button onClick={addExpense}>Add</button> 
            </div>
            <div>
                {state.list?.length > 0 && state.list.map((iteam) =>(
                    <div key={iteam.id}>
                        <label>
                            <span>{iteam.data}</span>
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

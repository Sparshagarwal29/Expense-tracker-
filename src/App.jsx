import { useState } from 'react';
import {v4 as uuid} from "uuid";
import Selcet from './category';
// import './App.css'

function App() {
const[data,setData] =useState();
const[list,setList]= useState([]);
const addExpense = (e) =>{
 setData(e.target.value);
//  console.log(data)
}
const addtoscreen =() =>{
    setList([...list, {id: uuid(), data:data}]);
    setData("");
}
const deleteExpense = (id)=>{
    const updatedlist = list.filter(data => data.id!==id);
    setList(updatedlist)

}
return (
    <>
        <div className='conatiner'>
            <div className="header">
                <h1>Expense Tracker</h1>
                 <Selcet/>
                <input value={data} onChange={addExpense} type="text" /> {/* /*with data it become a controled input */ }
                <button onClick={addtoscreen}>Add</button>
            </div>
            <div>
                {list && list.length > 0 && list.map(data =>(
                    <div key={data.id}>
                        <label>
                            <span>{data.data}</span>
                            <button onClick={() => deleteExpense(data.id)}>delete</button>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    </>
)
}

export default App

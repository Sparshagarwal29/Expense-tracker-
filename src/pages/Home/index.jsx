import { useState } from 'react';
import Select from '../../category.jsx';
import { useExpense , ExpenseProvider } from '../../Context/expense-Context.jsx';

export const Home=() => {
    const {data, list , sum , category, income, expenseDispatch} = useExpense(); 
    const[saving , setSaving] = useState(0)
     console.log(income);
     
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
    const handleIncome = (e) =>{
        expenseDispatch({
            type: "INCOME",
            payload: e.target.value
        })

    }
        
const showSaving = () =>{
    expenseDispatch({
        type: "SAVING"
    })
}   
        return (
            <>
                <ExpenseProvider>
                    <div className='conatiner'>
                        <div className="header">
                            <h1>Expense Tracker</h1>
                            <Select category= {category} expenseDispatch={expenseDispatch}/>
                            <input value={data} onChange ={handlechange}  type="number"  placeholder='enter amount'/> {/* /*with data it become a controled input */ }
                            <button onClick={addExpense}>Add</button> 
                        </div>
                        <div>
                            <input type='number'  placeholder='enter your income ' onChange={handleIncome}/>
                            <button onClick={showSaving}>   update</button>
                        </div>
                        <div>
                            {list?.length > 0 && list.map((iteam) =>(
                                <div key={iteam.id}>
                                    <label>
                                        <span > Category : {iteam.category}, Amount:  {iteam.data}</span> 
                                        {/* if iteam.category alredy eixits the amount should add to the wxisting iteam */}
                                        <button onClick={() => {subExpense(iteam.id , iteam.data) }}>delete</button>
                                    </label>
                                </div>
                            ))}
                            <h1>total expense : {sum}</h1>
                        </div>
                    </div>

                </ExpenseProvider>            
             </>
)
}


// export default Home

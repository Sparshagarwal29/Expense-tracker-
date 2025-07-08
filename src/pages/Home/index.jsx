import Select from '../../category.jsx';
import { useExpense , ExpenseProvider } from '../../Context/expense-Context.jsx';

export const Home=() => {
    const {data, list , sum , category, expenseDispatch} = useExpense(); 
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
                <ExpenseProvider>
                    <div className='conatiner'>
                        <div className="header">
                            <h1>Expense Tracker</h1>
                            <Select category= {category} expenseDispatch={expenseDispatch}/>
                            <input value={data} onChange ={handlechange}  type="number"  placeholder='enter amount'/> {/* /*with data it become a controled input */ }
                        <button onClick={addExpense}>Add</button> 
                        </div>
                        <div>
                            {list?.length > 0 && list.map((iteam) =>(
                                <div key={iteam.id}>
                                    <label>
                                        <span> Category : {iteam.category}, Amount:  {iteam.data}</span>
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

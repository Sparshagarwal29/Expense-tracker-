import { useExpense , ExpenseProvider } from '../../Context/expense-Context.jsx';

export const  Login =() =>{

 const {islogin,expenseDispatch} = useExpense();
    const onloginCLick = ()=>{
        expenseDispatch({
            type: "login",
            payload: !islogin
    })
    }    
    console.log(islogin);
    
        return (
        <>
         <ExpenseProvider>
            <h1>this is login page </h1>
            <label >
                <input type="phone"  placeholder="Enter your mobile number" maxLength={10}/>
                </label>
            
            <button onClick={onloginCLick}>login</button>
            {!islogin ?
                <h1>NOT LOGIN</h1> : <h1>LOGGED IN</h1> }
         </ExpenseProvider>
        </>
    )
}
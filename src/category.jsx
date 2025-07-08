import { useExpense } from "./Context/expense-Context";

 const cat = [
    {id: 1, value: "Food"},
    {id: 2, value: "Home"},
    {id: 3, value: "Enterainment"},
    {id: 4, value: "Personal"},
    {id: 5, value: "Miscellaneous"},
 ]
function Select ({category, expenseDispatch}) {

    
    const showChange = (e) => {
        expenseDispatch({
            type: "CATEGORY",
            payload: e.target.value
    })
    };
    return (
        <>
             <div className="field_container">
                    <div>
                        <label className="category ">choose the category : </label>
                        <select  value= {category} onChange={showChange} >
                            <option> select your category  </option>
                            {cat.map(cat =>(
                                <option value = {cat.value} key={cat.id}> {cat.value}</option>
                            ))}
                        </select>

                    </div>
                </div>
        </>

    )
}
export default Select

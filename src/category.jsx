import {v4 as uuid}  from "uuid";

 const cat = [
    {id: uuid(), value: "Food"},
    {id: uuid(), value: "Home"},
    {id: uuid(), value: "Enterainment"},
    {id: uuid(), value: "Personal"},
    {id: uuid(), value: "Miscellaneous"},
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

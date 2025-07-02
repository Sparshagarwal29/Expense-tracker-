import { useState } from "react";
 const category = [
    {id: 1, value: "Food"},
    {id: 2, value: "Home"},
    {id: 3, value: "Enterainment"},
    {id: 4, value: "Personal"},
    {id: 5, value: "Miscellaneous"},
 ]
function Selcet () {
    // const[choose, setChoose] = useState("")

    return (
        <>
            <div className="field_container">
                <div>
                    <label className="category ">choose the category : </label>
                    <select  >
                        <option value=""> select your category  </option>
                        {category.map(category =>(
                            <option value = {category.value} key={category.id}> {category.value}</option>
                        ))}
                    </select>

                </div>
            </div>
        </>

    )
}
export default Selcet

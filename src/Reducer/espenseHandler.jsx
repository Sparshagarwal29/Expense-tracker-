import {v4 as uuid} from "uuid";


export const expenseCal = (state, action) =>{
    switch (action.type) {
        case "INPUT":
            return{
                ...state,
                data: action.payload
            };
        case "CATEGORY":
            return{
                ...state,
                category: action.payload 
                
            };            
        case "ADD":{
            if(!state.data && !state.category){
                alert("please enter a valid category or number ");
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
                list: [...state.list, { id: uuid(), data: numvalue , category: state.category}],
                sum: state.sum + numvalue ,
                data: '',
                category: ''
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
        case "login":{
            return{
                ...state,
                islogin: action.payload
            }
        }
        default:
          return  state;
    }
};

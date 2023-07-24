const {createStore, applyMiddleware} = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const initialStore = {
	loading : false,
	error:"",
	data:[],
}

//actions ------------------
const fetching_data = () => {
	return {
		type:"FETCH_DATA",
	}
}

const fetching_success = (user) => {
	return {
		type : "FETCH_SUCCESS",
		data : user,
	}
}

const fetching_fail = (error) => {
	return {
		type : "FETCH_FAIL",
		data : error,
	}
}

// ----------


const dataReducer = (store = initialStore , action) => {
	switch (action.type){
		case "FETCH_DATA" : 
			return{
				...store,
				loading : true,
			}

		case "FETCH_SUCCESS" :
			return {
				loading : false,
				error:"",
				data : action.data ,	
			}

		case "FETCH_FAIL" : 
			return{
				loading : false,
				error: action.data,
				data : [],
			}
	}
}


//action creator should return action function instead of obj
const fetchData = () => {
	return (dispatch) => {
		dispatch(fetching_data());
		axios.get("https://jsonplaceholder.typicode.com/users")
			.then(res => {
				const user = res.data;
				dispatch(fetching_success(user))
			})
			.catch(err => {
				dispatch(fetching_fail(err.message))
			})
	}
}


//use async with thunk middleware 
const store = createStore(dataReducer,applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchData());
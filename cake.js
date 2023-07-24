const {createStore, combineReducers} = require("redux");

const action = () => {
	return {		
		type : "buyCake",
		info : 'I m buying cake',
	}
}

const cakeStore = {
	cake : 10
}

const creamStore = {
	cream : 20
}

const cakeReducer = (store = cakeStore , action) => {
	switch(action.type){
		case "buyCake" : return {
			...store,
			cake : store.cake - 1
		}

		default : return store
	}
}


const creamReducer = (store = creamStore , action) => {
	switch(action.type){
		case "getCream" : return {
			...store,
			cream : store.cream - 1,
		}

		default : return store
	}
}


const rootReducer = combineReducers({
	cake:cakeReducer,
	cream:creamReducer

})
const store = createStore(rootReducer);


console.log(store.getState());

store.subscribe(() => console.log("changed", store.getState()));
store.dispatch(action())
store.dispatch(action())

store.dispatch(
	{
		type:"getCream",
		info: "get one cream",
	}
)



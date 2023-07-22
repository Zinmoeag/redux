const {createStore} = require("redux");

const action = () => {
	return {		
		type : "buyCake",
		info : 'I m buying cake',
	}

}

const initialStore = {
	cake : 10,
	cream : 5,
}


const reducer = (store = initialStore , action) => {
	switch(action.type){
		case "buyCake" : return {
			...store,
			cake : store.cake - 1
		}
		case "getCream" : return {
			...store,
			cream : store.cream - 1,
		}

		default : return store
	}
}

const store = createStore(reducer);

console.log(store.getState());

store.subscribe(() => console.log("changed", store.getState()));
store.dispatch(action());
store.dispatch(action());
store.dispatch(action());
store.dispatch(action());
store.dispatch(action());

store.dispatch(
	{
		type:"getCream",
		info: "get one cream",
	}
)



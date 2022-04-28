const initialState = {
    bats: ""
}

const HomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USERNAME":
            console.log("user Name set");
            return { ...state,bats: action.payload}
        default:
            return state;
        }
}

export default HomeReducer

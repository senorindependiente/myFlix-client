
import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES } from "../actions/actions";

//reducer
function visibilityFilter (state = "", action){
    //switch-case syntax determining if the reducer will be responsible for the action or not
    switch (action.type) {
        //returns new state if action is related 
        case SET_FILTER:
            return action.value;
            //returns default state if the given action is unrelated to the reducer
            // here the default value is an emptry string parameter of  "state=""
            default:
                return state;
    }
}

function movies(state=[], action){
    switch(action.type){
        case SET_MOVIES:

        console.log("SET_MOVIES reducer reached")
            return action.value;
            default:
                return state;
    }
}


// function moviesApp(state={}, action){
//     return{
//         visibilityFilter:visibilityFilter(state.visibilityFilter, action),
// movies:movies(state.movies, action)
//     }
// }

//combined reducer, built in function
const moviesApp = combineReducers({
    visibilityFilter,
    movies
})

export default moviesApp
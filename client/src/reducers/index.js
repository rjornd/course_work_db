import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import employeeReducer from "./employeeReducer";
const applyMiddleware = require("redux").applyMiddleware

const rootReducer = combineReducers({
    employees: employeeReducer,
    user: userReducer,
    app: appReducer
})

export const store = createStore(rootReducer,  composeWithDevTools(applyMiddleware(thunk)));

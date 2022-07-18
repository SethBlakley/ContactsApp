import modalReducer from "./ModalReducer";
import rerenderReducer from "./RerenderReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  modal: modalReducer,
  render: rerenderReducer,
});

export default rootReducer;

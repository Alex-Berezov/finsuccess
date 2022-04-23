import { combineReducers } from "redux"
import { incomesReducer } from './incomes/index'

const rootReducer = combineReducers({
  incomes: incomesReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
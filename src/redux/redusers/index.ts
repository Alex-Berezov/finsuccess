import { combineReducers } from "redux"
import { incomesReducer } from './incomes/index'
import { expenseReducer } from './expenses/index';

const rootReducer = combineReducers({
  incomes: incomesReducer,
  expenses: expenseReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
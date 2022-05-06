import { combineReducers } from "redux"
import { incomesReducer } from './incomes/index'
import { expenseReducer } from './expenses/index';
import { operationsReducer } from './operations/index';

const rootReducer = combineReducers({
  incomes: incomesReducer,
  expenses: expenseReducer,
  operations: operationsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
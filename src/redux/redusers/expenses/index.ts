import { ExpensesAction, ExpensesActionType, ExpensesState } from '../../../Types/ExpensesTypes';

const initialExpensesState: ExpensesState = {
  expenses: [],
  loading: false,
  error: null
}

export const expenseReducer = (state = initialExpensesState, action: ExpensesAction): ExpensesState => {
  switch (action.type) {
    case ExpensesActionType.FETCH_EXPENSES:
      return { ...state, loading: true, error: null, expenses: [] }

    case ExpensesActionType.EXPENSES_SUCCESS:
      return { ...state, loading: false, error: null, expenses: action.payload }

    case ExpensesActionType.EXPENSES_FAILURE:
      return { ...state, loading: false, error: action.payload, expenses: [] }

    default:
      return state
  }
}
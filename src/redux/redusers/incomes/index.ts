import { IncomesAction, IncomesActionType, IncomesState } from '../../../Types/IncomesTypes';

const initialIncomesState: IncomesState = {
  incomes: [],
  loading: false,
  error: null
}

export const incomesReducer = (state = initialIncomesState, action: IncomesAction): IncomesState => {
  switch (action.type) {
    case IncomesActionType.FETCH_INCOMES:
      return { ...state, loading: true, error: null, incomes: [] }

    case IncomesActionType.INCOMES_SUCCESS:
      return { ...state, loading: false, error: null, incomes: action.payload }

    case IncomesActionType.INCOMES_FAILURE:
      return { ...state, loading: false, error: action.payload, incomes: [] }

    default:
      return state
  }
}
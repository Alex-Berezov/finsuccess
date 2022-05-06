import { OperationsAction, OperationsActionType, OperationsState } from './../../../Types/OperationsTypes';

const initialOperationsState: OperationsState = {
  operations: [],
  loading: false,
  error: null
}

export const operationsReducer = (state = initialOperationsState, action: OperationsAction): OperationsState => {
  switch (action.type) {
    case OperationsActionType.FETCH_OPERATIONS:
      return { ...state, loading: true, error: null, operations: [] }

    case OperationsActionType.OPERATIONS_SUCCESS:
      return { ...state, loading: false, error: null, operations: action.payload }

    case OperationsActionType.OPERATIONS_FAILURE:
      return { ...state, loading: false, error: action.payload, operations: [] }

    default:
      return state
  }
}
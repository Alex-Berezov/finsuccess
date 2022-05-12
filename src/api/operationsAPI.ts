import { IOperations } from '../Types/Types';
import { instance } from './api';

export const operationsAPI = {
  getOperations() {
    return instance.get<IOperations>('operations').then(res => res.data)
  },
  postOperation(newOperation: IOperations) {
    return instance.post<IOperations[]>('operations', newOperation)
  },
  deleteOperation(operationId: string) {
    return instance.delete<IOperations[]>(`operations/${operationId}`)
  },
  updateOperation(operationId: string, editedOperation: IOperations) {
    return instance.put<IOperations[]>(`operations/${operationId}`, { ...editedOperation })
  }
}
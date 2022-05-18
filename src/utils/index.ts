import { IBalance } from './../Types/Types';

export const getFinFormat = (amount: number) => {
  return new Intl.NumberFormat("ru").format(amount)
}

export const countArrayValues = (array: Array<IBalance>) => {
  return array?.reduce((sum: number, current: IBalance) => sum + current.value, 0)
}

export const byField = (field: string | number) => {
  return (a: { [x: string]: number; }, b: { [x: string]: number; }) => a[field] > b[field] ? 1 : -1;
}
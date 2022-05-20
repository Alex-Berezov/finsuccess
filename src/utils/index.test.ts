import { getFinFormat, countArrayValues, byField } from './index'

describe('utils fuctions', () => {
  it('test for getFinFormat function', () => {
    expect(getFinFormat(100)).toBe("100")
  })

  it('test for countArrayValues function', () => {
    expect(countArrayValues([
      {
        id: 'string-1',
        name: 'Asdfg',
        value: 1
      },
      {
        id: 'string-2',
        name: 'Qwerty',
        value: 1
      }
    ])).toEqual(2)
  })

  it('test for byField function', () => {
    const arr = [{ 'id': 3 }, { 'id': 2 }, { 'id': 1 }]
    expect(arr.sort(byField('id'))).toEqual([{ 'id': 1 }, { 'id': 2 }, { 'id': 3 }])
  })
})

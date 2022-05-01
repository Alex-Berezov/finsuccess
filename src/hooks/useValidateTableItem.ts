import { useState, useEffect } from 'react';
import { IBalance } from './../Types/Types';

export const useValidateTableItem = (value: string, validations: any) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true)
  const [minLengthError, setMinLengthError] = useState<boolean>(false)
  const [maxLengthError, setMaxLengthError] = useState<boolean>(false)
  const [uniqueValueError, setUniqueValueError] = useState<boolean>(false)
  const [errors, setErrors] = useState<string>('')

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true)
          isEmpty && setErrors('Поле не должно быть пустым')
          break
        case 'maxLength':
          value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
          maxLengthError && setErrors('Слишком много букв')
          break
        case 'minLength':
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
          minLengthError && setErrors('Слишком мало букв')
          break
        case 'uniqueValue':
          validations[validation].find((elem: IBalance) => elem.name === value)
            ? setUniqueValueError(true)
            : setUniqueValueError(false)
          uniqueValueError && setErrors('Такая статья уже есть')
          break

        default:
          break
      }
    }
  }, [value, validations, isEmpty, minLengthError, maxLengthError, uniqueValueError])

  return { errors, isEmpty, minLengthError, maxLengthError, uniqueValueError }
}
import { useState, useEffect } from 'react';
import { IBalance } from '../Types/Types';

export const useValidate = (value: string, validations: any) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
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
  }, [value, validations, isEmpty, maxLengthError, uniqueValueError])

  return { errors, setErrors, isEmpty, maxLengthError, uniqueValueError }
}
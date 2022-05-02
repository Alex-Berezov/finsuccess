import { useState } from 'react';
import { useValidate } from './useValidate';

export default function useInput(initialValue: string, validations: Object) {
  const [value, setValue] = useState<string>(initialValue)
  const [isTouched, setIsTouched] = useState<boolean>(false)
  const validation = useValidate(value, validations)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true)
  }

  return { value, setValue, onChange, onBlur, isTouched, ...validation }
}
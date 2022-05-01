import { useState } from 'react';
import { useValidateTableItem } from './useValidateTableItem';

export default function useInput(initialValue: string, validations: Object) {
  const [value, setValue] = useState<string>(initialValue)
  const [isTouched, setIsTouched] = useState<boolean>(false)
  const validation = useValidateTableItem(value, validations)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    setIsTouched(true)
  }

  return { value, setValue, onChange, onBlur, isTouched, ...validation }
}
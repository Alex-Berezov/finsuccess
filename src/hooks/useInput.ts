import { useState } from 'react';

export default function useInput(initialValue: string) {
  const [value, setValue] = useState<string>(initialValue)
  const [isTouched, setIsTouched] = useState<boolean>(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true)
  }

  return {
    value,
    onChange,
    onBlur,
    setValue,
    isTouched
  }
}
import {useEffect, useState} from "react";

export const useDebounce = (searchValue: string, delay: number): string => {

  const [debouncedValue, setDebouncedValue] = useState<string>('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(searchValue)
    }, delay)

    return (() => {
      clearTimeout(timeoutId)
    })
  }, [searchValue, delay])

  return debouncedValue
}

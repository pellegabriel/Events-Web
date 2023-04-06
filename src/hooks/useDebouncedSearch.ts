import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { useState } from 'react'
import { useAsync } from 'react-async-hook'
import useConstant from 'use-constant'

const useDebouncedSearch = (searchFunction: any) => {
  const [inputText, setInputText] = useState('')

  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(searchFunction, 1000),
  )

  // The async callback is run each time the text changes,
  // but as the search function is debounced, it does not
  // fire a new request on each keystroke
  const searchResults = useAsync(async () => {
    if (inputText.length === 0) {
      return []
    } else {
      return debouncedSearchFunction(inputText)
    }
  }, [debouncedSearchFunction, inputText])

  // Return everything needed for the hook consumer
  return {
    inputText,
    setInputText,
    searchResults,
  }
}

export default useDebouncedSearch

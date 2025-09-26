import React, { useState } from 'react'

export const useInput = (initialValues = {}) => {
  const [value, setValue] = useState(initialValues);
  const handleChange = (e) => {
    const {name, value} = e.target;
    setValue(prev => ({
        ...prev,
        [name]: value
    }))
  }
  return {value, setValue, handleChange};
}

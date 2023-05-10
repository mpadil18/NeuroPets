import React, { useState } from 'react';

const TextBox = ({ onChange, placeholder }) => {
    const [text, setText] = useState('');
  
    const handleChange = (event) => {
      setText(event.target.value);
      if (onChange) {
        onChange(event.target.value);
      }
    }
  
    return (
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
      />
    );
}
export default TextBox;
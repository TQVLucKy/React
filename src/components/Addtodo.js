import React, { useState } from 'react';

const AddTodo = ({ addTodo }) => {
  const [text, setText] = useState('');


  const handleAddClick = () => {
    if (text.trim() !== '') {
      addTodo(text);
      setText('');
    }
  };

  return (
    <div className="input-group">
      <input
        type="text"
        placeholder="Nhập công việc"
        value={text}
        onKeyDown={(e)=>{
            if(e.key === 'Enter')
                handleAddClick();
        }}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAddClick} disabled={text.trim() === ''}>
        Add
      </button>
    </div>
  );
};

export default AddTodo;

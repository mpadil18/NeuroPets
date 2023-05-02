import handleSubmit from './handleSubmit';
import { useRef } from 'react';

function SaveData() {
  const dataRef = useRef()
  
  const submithandler = (e) => {
    e.preventDefault()
    handleSubmit(dataRef.current.value)
    dataRef.current.value = ""
  }
  return (
    <div className="app-container">
      Enter Data : 
      <form onSubmit = {submithandler}>
        <input type = "text" ref = {dataRef} />
        <button type = "submit"> Save </button>
      </form>
    </div>
  );
}

export default SaveData;
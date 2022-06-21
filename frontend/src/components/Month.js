import React, { useState } from 'react'

 const Month = () => {
     const [defaultValue, setDefaultValue] = useState(new Date().toLocaleString('default', { month: 'long' }));
     console.log(defaultValue)
     async function getNewData(e){
        console.log("inside function")
         setDefaultValue(e.target.value)
        console.log(defaultValue)
     }
  return (
    <div>month
          <input type='month' value={defaultValue} onChange={e => getNewData(e)} />
    </div>

  )
}

export default Month;
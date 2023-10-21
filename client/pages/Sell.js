import React from 'react'
import styled from 'styled-components'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'

const Sell = () => {
  return (
    <div>
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
 
</form>

    </div>
  )
}

export default Sell;


// import Item from './components/Item'

// const Sell = () => {

//   // const url = ''
//   const [item, setItem] = useState(null)

//   useEffect(() =>{
//     const fetchItem = async () => {
//       const response = await fetch(url)
//       const json = await response.json()
//     }
//     //make sure got a good response
//     if(response.ok){
//       setItem(json)
//     }else{
//       console.log("get request in item.jsx, has fetch issues")
//     }
//     fetchItem()
//   }, [url])

//   return(
//   <div className="sell">
//    {item && <Item item={item}/>}
//   </div>);
// }
// export default Sell;
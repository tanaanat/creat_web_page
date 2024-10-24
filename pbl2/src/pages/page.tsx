import { Button,Text, ButtonGroup } from '@chakra-ui/react'
import axios from "axios";
import { useState } from "react";



export default function Bottonpage() {

    async function getItem() {
        try {
          const url = "http://localhost:8000/items/1";
          const res = await axios.get(url);
          console.log(res.data) // response data
          console.log(res.status) // status code
          setItems(res.data);
		      console.log(items);
        } catch (err) {
            console.error(err);
        }
      }
      const [items, setItems] = useState([]);
     
      
    return (

    <>
    <Button colorScheme='blue' onClick={getItem}>Button</Button> 
   
    </>
    
    )
}

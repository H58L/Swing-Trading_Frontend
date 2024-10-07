import React,{useState} from 'react'
import { mockSearchResults } from '../constants/mock';

const Search = () => {

    //intialize both these states to the mock data that was copypastes gfrom Finn hub
    const [input, setInput] = useState("");  //Will track what the use ris searching for
    const [bestMatches, setBestMatches] = useState(mockSearchResults.result);
     //Will track the best matches being returned form the API

     const clear = () => { //to clear the search bar
      setInput("");
      setBestMatches = ([]) ;
     };

     const updateBestMatches = () => {
      setBestMatches(mockSearchResults.result);
     }


  return (
    <div className='flex items-center my-4 border-2 rounded-md relative z-50 w-96 bg-white border-neutral-200'>
      <input type ="text" value = {input} className='w-full px-4 py-2 focus:outline-none rounded-md'
      placeholder='Search Stock'
      onChange={(event) => { //Setting input to what is searchd in the bar
        setInput(event.target.value);
      }}
      onKeyPress={(event) => {
        if(event.key === "Enter"){
          updateBestMatches();
        }

      }}>

      </input>
    </div>
  )
}

export default Search

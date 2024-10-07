import React,{useState} from 'react'
import { mockSearchResults } from '../constants/mock';

const Search = () => {

    //intialize both these states to the mock data that was copypastes gfrom Finn hub
    const [input, setInput] = useState("");  //Will track what the use ris searching for
    const [bestMatches, setBestMatches] = useState(mockSearchResults.result);
     //Will track the best matches being returned form the API
  return (
    <div>
      
    </div>
  )
}

export default Search

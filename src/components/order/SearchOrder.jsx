import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const SearchOrder = () => {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    // function handleSubmit(e){
    //     e.preventDefault()
    //     if(!query) return
    //     navigate(`/order/${query}`)
    //     setQuery('')
    // }

    function handleSubmit(e) {
        e.preventDefault()
        if(!query) return
        navigate(`/order/${query}`)
        setQuery('')
    }

    return (
       <form onSubmit={handleSubmit}>
         <input 
            className='p-2 w-72 md:w-[350px] md:focus:w-[370px]  rounded-md text-sm bg-yellow-50 placeholder:text-stone-400 focus:w-80 transition-all duration-200 focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-opacity-50'
            type="text" 
            placeholder="Search Order #" 
            value={query}
            onChange = { e => setQuery(e.target.value)} 
            />
       </form>
    )
}

export default SearchOrder
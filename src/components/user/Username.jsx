import { useSelector } from "react-redux"

const Username = () => {
  const username = useSelector(store => store.user.username)

  if(!username) return null
  
  return (
    <p className="text-md font-semibold py-4 hidden md:block">{username}</p>
  )
}

export default Username
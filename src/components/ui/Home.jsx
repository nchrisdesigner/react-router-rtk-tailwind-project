import { Link } from "react-router-dom";
import CreateUser from './../user/CreateUser'
import { useSelector } from "react-redux";
import Button from "./Button";

function Home() {
  const username = useSelector(store => store.user.username)

  return (
    <div className="my-10 sm:my-16">
      <h1 className="text-3xl text-stone-800 font-bold mb-6 px-4 py-4 border-b-2 border-stone-200">
        The best pizza.
        <br />
        <span className="text-yellow-500 text-xl sm:text-2xl font-semibold">Straight out of the oven, straight to you.</span>
      </h1>

      {
      username === '' 
      ? 
      <CreateUser />
      :
      <Button to='/menu' type='primary'>
        Continue Ordering {username}
      </Button>
      }
    </div>
  );
}

export default Home;

import { Link } from "react-router-dom"

const className = "bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 py-3 px-6 my-4 text-white font-semibold text-lg rounded-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:ring-offset-1 cursor-pointer disabled:cursor-not-allowed"

const base = "bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 my-4 text-white font-semibold text-lg rounded-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:ring-offset-1 cursor-pointer disabled:cursor-not-allowed"

const styles = {
    primary: base + ' px-4 py-2 md:px-6 md:py-3',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-sm',
    secondary: " transition-all duration-300 my-4 text-στονε-500 font-semibold text-lg rounded-sm tracking-wide focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:ring-offset-1 cursor-pointer disabled:cursor-not-allowed border-2 border-stone-500 px-4 py-2 md:px-6 md:py-3",
    round: base + ' rounded-3xl px-1 py-1 md:px-3 md:py-2 text-xs',
}

const Button = ({children, disabled, to, type, onClick}) => {

    
    if(to){
        return(
        <Link className={styles[type]} to={to}>{children}</Link>
        )
    }

    if(onClick){
        return (
            <button onClick={onClick} className={styles[type]} disabled={disabled}>{children}</button>
        )
    }

    return (
        <button className={styles[type]} disabled={disabled}>{children}</button>
    )
}

export default Button

import { Link } from "react-router-dom";
import "./App.css";


const App = () => {
  return (
    <div>
      
      <div>
        <Link to ="/Signin">SIGN IN</Link>
      </div>
      <div>
        <Link to ="/Signup">SIGN UP</Link>
      </div>
    </div>
  )
}

export default App

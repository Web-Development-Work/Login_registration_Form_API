import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";


function App() {

	const [user,setLoginUser]=useState({});
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route exact path="/" element ={user && user._id ? <Homepage user={user} setLoginUser ={setLoginUser}/> : <Login setLoginUser ={setLoginUser}/>}></Route>
					<Route path="/login" exact element={< Login setLoginUser ={setLoginUser}/>}></Route>
					<Route path="/register" exact element={< Register />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;

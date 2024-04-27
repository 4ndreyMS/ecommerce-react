import { Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Nav from "./components/Layout/NavBar";

function App() {	
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" Component={HomePage}></Route>
				<Route path="/signin" Component={SignInPage}></Route>
				<Route path="/products" Component={SignInPage}></Route>

				<Route path="/signup" Component={SignUpPage}></Route>
			</Routes>
		</>
	);
}

export default App;

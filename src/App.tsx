import { Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/home";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import Nav from "./components/navbar";

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

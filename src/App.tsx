import { Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Nav from "./components/Layout/NavBar";
import ProductList from "./pages/ProductList";
import Footer from "./components/Layout/Footer";
import ProductDetails from "./pages/ProductDetails";

function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" Component={HomePage}></Route>
				<Route path="/signin" Component={SignInPage}></Route>
				<Route path="/products" Component={ProductList}></Route>
				<Route path="/#about" Component={HomePage}></Route>
				<Route path="/signup" Component={SignUpPage}></Route>
				<Route path="/product-details" Component={ProductDetails}></Route>
			</Routes>
			<Footer />
		</>
	);
}

export default App;

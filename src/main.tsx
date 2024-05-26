import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<RecoilRoot>
				<NextUIProvider>
					<App />
					<Toaster />
				</NextUIProvider>
			</RecoilRoot>
		</BrowserRouter>
	</React.StrictMode>
);

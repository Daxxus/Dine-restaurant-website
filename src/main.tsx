import React from "react"
import ReactDOM from "react-dom/client"
import { AuthProvider } from "./Contexts/AuthContext.tsx"
import { AvatarProvider } from "./Contexts/Avatar.Context.tsx"
import { CountdownProvider } from "./Contexts/CountdownContext.tsx"
import { Provider } from "react-redux"
import { Store } from "./Redux/Store.tsx"
import App from "./App.tsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			<AvatarProvider>
				<CountdownProvider>
					<Provider store={Store}>
						<App />
					</Provider>
				</CountdownProvider>
			</AvatarProvider>
		</AuthProvider>
	</React.StrictMode>
)

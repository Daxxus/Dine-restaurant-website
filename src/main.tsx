import React from "react"
import ReactDOM from "react-dom/client"
import { AuthProvider } from "./Contexts/AuthContext.tsx"
import { AvatarProvider } from "./Contexts/Avatar.Context.tsx"
import { CountdownProvider } from "./Contexts/CountdownContext.tsx"
import App from "./App.tsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			<AvatarProvider>
				<CountdownProvider>
					<App />
				</CountdownProvider>
			</AvatarProvider>
		</AuthProvider>
	</React.StrictMode>
)

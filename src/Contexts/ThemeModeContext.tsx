import React from "react"

export const ThemeModeContext = React.createContext({
	themeName: "",
	toggleTheme: () => {},
})

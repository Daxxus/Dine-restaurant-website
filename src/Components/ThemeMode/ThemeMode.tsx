// import { useEffect, useState } from "react"
// import { ThemeModeContext } from "../../Contexts/ThemeModeContext"
// import { Button } from "@chakra-ui/react"
// import { MoonIcon, SunIcon } from "@chakra-ui/icons"

// const themes = {
// 	dark: {
// 		primary: "#1ca086",
// 		separatorColor: "rgba(255,255,255,0.20)",
// 		textColor: "white",
// 		backgroundColor: "#121212",
// 		headerBackgroundColor: "rgba(255,255,255,0.05)",
// 		blockquoteColor: "rgba(255,255,255,0.20)",
// 		icon: "white",
// 		shadow: "rgb(255,255,255)",
// 	},
// 	light: {
// 		primary: "#1ca086",
// 		separatorColor: "rgba(0,0,0,0.08)",
// 		textColor: "black",
// 		backgroundColor: "white",
// 		headerBackgroundColor: "#f6f6f6",
// 		blockquoteColor: "rgba(0,0,0,0.80)",
// 		icon: "#121212",
// 		shadow: "rgb(0,0,0)",
// 	},
// }

// const ThemeMode = () => {
// 	const [themeName, setThemeName] = useState("light")
// 	const [themeMode, setThemeMode] = useState(themes.themeName)

// 	const toggleTheme = () => {
// 		if (themeMode === themes.dark) {
// 			setThemeMode(themes.light)
// 			setThemeName("light")
// 		} else {
// 			setThemeMode(themes.dark)
// 			setThemeName("dark")
// 		}
// 	}
// 	const setCSSVariables = (themeMode: { [x: string]: string | null }) => {
// 		for (const value in themeMode) {
// 			document.documentElement.style.setProperty(`--${value}`, themeMode[value])
// 		}
// 	}
// 	useEffect(() => {
// 		setCSSVariables(themeMode)
// 	})
// 	// console.log(toggleTheme)
// 	return (
// 		<ThemeModeContext.Provider value={{ themeName, toggleTheme }}>
// 			<Button onClick={toggleTheme} fontSize={25}>
// 				{themeName === "light" ? <MoonIcon /> : <SunIcon />}
// 			</Button>
// 		</ThemeModeContext.Provider>
// 	)
// }

// export default ThemeMode

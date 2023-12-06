import { AspectRatio } from "@chakra-ui/react"
import style from "./Style/Map.module.css"
const Map = () => {
	return (
		<AspectRatio ratio={16 / 9} className={style.frame}>
			<iframe src='https://www.google.com/maps/embed?' title='adress' />
		</AspectRatio>
	)
}

export default Map

// https://www.google.pl/maps/@53.4525348,14.5467741,15z?hl=pl&entry=ttu

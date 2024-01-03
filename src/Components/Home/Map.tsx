import { useState } from "react"
import { Map, Marker } from "pigeon-maps"

export default function Maps() {
	const [hue, setHue] = useState(0)
	const color = `hsl(${hue % 360}deg 39% 70%)`

	return (
		<Map height={400} defaultCenter={[51.06, 17.03333]} defaultZoom={16}>
			<Marker
				width={50}
				anchor={[51.06, 17.03333]}
				color={color}
				onClick={() => setHue(hue + 20)}
			/>
			<Marker
				width={50}
				anchor={[51.06, 17.03333]}
				color={color}
				onClick={() => setHue(hue + 20)}>
				{/* <CustomIcon /> */}
			</Marker>
		</Map>
	)
}

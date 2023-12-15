import { useState } from "react"
import { Map, Marker } from "pigeon-maps"

export default function Maps() {
	const [hue, setHue] = useState(0)
	const color = `hsl(${hue % 360}deg 39% 70%)`

	return (
		<Map height={400} defaultCenter={[51.0361, 16.9677]} defaultZoom={16}>
			<Marker
				width={50}
				anchor={[51.0361, 16.9677]}
				color={color}
				onClick={() => setHue(hue + 20)}
			/>
			<Marker
				width={50}
				anchor={[51.0361, 16.9677]}
				color={color}
				onClick={() => setHue(hue + 20)}>
				{/* <CustomIcon /> */}
			</Marker>
		</Map>
	)
}

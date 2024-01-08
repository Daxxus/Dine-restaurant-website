import { useState } from "react"
import { Map, Marker, ZoomControl } from "pigeon-maps"
import { osm } from "pigeon-maps/providers"
import { Text, Box } from "@chakra-ui/react"
export default function Maps() {
	const [hue, setHue] = useState(0)
	const color = `hsl(${hue % 360}deg 39% 70%)`

	return (
		<Box
			height={{ base: "sm", sm: "md " }}
			width={{ base: "md", md: "2xl " }}			
			mt={{ base: 400, md: 0 }}>
			<Map
				defaultCenter={[51.0675383, 16.9902624]}
				defaultZoom={16}
				provider={osm}>
				<Marker
					width={50}
					anchor={[51.0675383, 16.9902624]}
					color={color}
					onClick={() => setHue(hue + 20)}
				/>
				<Marker
					width={50}
					anchor={[51.0675383, 16.9902624]}
					color={color}
					onClick={() => setHue(hue + 20)}></Marker>
				<ZoomControl />
			</Map>
			<Text
				color={"white"}				
				bgColor={`grey`}
				fontWeight={200}
				fontSize={{ base: "sm", md: "xl" }}>
				Location: Wroclaw , Old market street 55
			</Text>
		</Box>
	)
}

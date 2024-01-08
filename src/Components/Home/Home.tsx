"use client"
import Maps from "./Map"
import Footer from "./Footer"
import AllTestimonials from "./Testimonials"
import RestImage from "./Images/urban-2004494_1920.jpg"

import { Flex, Box, Text, VStack, useBreakpointValue } from "@chakra-ui/react"

export default function Home() {
	return (
		<Flex
			w={"full"}
			backgroundImage={RestImage}
			backgroundSize={"cover"}
			backgroundPosition={"center center"}>
			<VStack
				w={"full"}
				px={useBreakpointValue({ base: 0, md: 0 })}
				bgGradient={"linear(to-r, blackAlpha.600, transparent)"}>
				<Box
					maxW={"2xl"}
					height={`100vh`}
					display={`flex`}
					alignItems={`center`}>
					<Text
						color={"white"}
						textAlign={`center`}
						fontWeight={700}
						lineHeight={1.2}
						fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}>
						Our cuisine <br />
						It's said the most well-seasoned across Wroclaw
					</Text>
				</Box>
				<Box height={`100vh`}>
					<AllTestimonials />
				</Box>

				<Box height={`100vh`}>
					<Maps />
				</Box>

				<Footer />
			</VStack>
		</Flex>
	)
}

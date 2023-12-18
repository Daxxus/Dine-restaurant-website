import Reservation from "./Reservation"
import { Box, Heading, Text, Stack, Flex } from "@chakra-ui/react"
import style from "./styles/AddOrder.module.css"
import BgImg from "../Images/menu-3153032_1920.jpg"
import SelectMenu from "../APIS/SelectMenu"

export default function AddOrder() {
	return (
		<Flex
			bgImg={BgImg}
			bgPos={"bottom"}
			height={"container.lg"}
			bgSize={"cover"}
			textAlign={"center"}
			filter={"grayscale(10%)"}>
			<Reservation />

			<Stack
				// margin={" auto"}
				as={Box}
				spacing={{ base: 5, md: 50 }}
				py={{ base: 20, md: 150 }}>
				<Box
					className={style.box}
					// py={{ base: 20, md: 350 }}
					fontSize={{ base: "2xl", sm: "4xl", md: "8xl" }}>
					<h1>Welcome to the World of flavour!!!</h1>
				</Box>
				<Heading
					className={style.heading}
					fontWeight={300}
					fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
					lineHeight={"110%"}>
					Order the dishes from <br />
					<Text as={"span"}>your heart</Text>
				</Heading>

				<SelectMenu />
			</Stack>
		</Flex>
	)
}

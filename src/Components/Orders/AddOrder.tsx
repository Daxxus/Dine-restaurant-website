import Reservation from "./Reservation"
import { Box, Heading, Text, Stack, Flex } from "@chakra-ui/react"
import style from "./styles/AddOrder.module.css"
import BgImg from "../Images/menu-3153032_1920.jpg"
import SelectMenu from "../APIS/SelectMenu"

export default function AddOrder() {
	return (
		<Flex
			justify={"center"}
			bgImg={BgImg}
			w={'full'}
			h={'100vh'}
			backgroundPosition={"bottom "}
			// height={"100%"} //patrz 100vh lepszy ale lipa
			backgroundSize={"cover"}
			filter={"grayscale(10%)"}>
			<Stack
				// margin={" auto"}
				// direction={'column'}
				// as={Box}
				spacing={{ base: 5, md: 50 }}
				py={{ base: 5, md: 50 }}>
				<Reservation />
				<Text
					className={style.box}
					textAlign={"center"}
					// py={{ base: 20, md: 350 }}
					fontSize={{ base: "2xl", sm: "4xl", md: "8xl" }}>
					Welcome to the World of flavour!!!
				</Text>
				<Heading
					className={style.heading}
					textAlign={"center"}
					fontWeight={300}
					fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
					lineHeight={"110%"}>
					Order the dishes from <br />
					<Text as={"span"}>your heart</Text>
				</Heading>
				<Box className={style.flex}>
					<SelectMenu />
				</Box>
			</Stack>
		</Flex>
	)
}

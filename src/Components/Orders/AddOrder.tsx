// import React from 'react'

// import { Flex, Box } from "@chakra-ui/react"

// const Menu = () => {
// 	return (
// 		<Flex
// 			// backgroundImage={"../Images/restaurant-449952_1920.jpg"}
// 			bgImg={
// 				"https://cdn.pixabay.com/photo/2017/08/07/07/06/coffeehouse-2600877_1280.jpg"
// 			}
// 			bgPosition={"center"}
// 			bgSize={"cover"}
// 			align={"center"}
// 			justify={"center"}
// 			h='container.lg'
// 			filter='grayscale(50%)'>
// 			{/* <ToastContainer autoClose={3000} /> */}
// 			<Box bg='white' p={4} rounded='md'></Box>
// 		</Flex>
// 	)
// }

// export default Menu

import {
	Box,
	Heading,
	Container,
	Text,
	Input,
	Stack,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	RangeSliderTrack,
} from "@chakra-ui/react"

import BgImg from "../Images/menu-3206749_1280.jpg"

export default function AddOrder() {
	return (
		<>
			<Container
				maxW={"full"}
				h={"container.lg"}
				backgroundImage={BgImg}
				// bgImg={
				// 	"https://cdn.pixabay.com/photo/2018/03/07/18/42/menu-3206749_1280.jpg"
				// }
				// bgPosition={"center"}
				bgSize={"cover"}
				filter={"grayscale(20%)"}>
				<Stack
					as={Box}
					textAlign={"center"}
					spacing={{ base: 8, md: 14 }}
					py={{ base: 20, md: 36 }}>
					<Heading
						fontWeight={600}
						color={"gray.400"}
						fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
						lineHeight={"110%"}>
						Order the dishes from <br />
						<Text as={"span"} color={"green.400"}>
							your heart
						</Text>
					</Heading>
					<Text color={"gray.100"}>Choose Your preferred ingredients</Text>
					<Stack spacing={3}>
						<Input
							htmlSize={4}
							width='auto'
							bg={"gray.300"}
							// color={ 'green' }
							placeholder='Search'
							border={"none"}
						/>
						<RangeSlider defaultValue={[120, 240]} min={0} max={300}>
							<RangeSliderTrack bg='red.100'>
								<RangeSliderFilledTrack bg='tomato' />
							</RangeSliderTrack>
							<RangeSliderThumb boxSize={6} index={0} />
							<RangeSliderThumb boxSize={6} index={1} />
						</RangeSlider>
					</Stack>

					{/* <Stack
						direction={"column"}
						spacing={3}
						align={"center"}
						alignSelf={"center"}
						position={"relative"}> */}
					{/* <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}>
              Get Started
            </Button>
            <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
              Learn more
            </Button> */}
					{/* <Box>
              <Icon
                as={Arrow}
                color={useColorModeValue('gray.800', 'gray.300')}
                w={71}
                position={'absolute'}
                right={-71}
                top={'10px'}
              />
              <Text
                fontSize={'lg'}
                fontFamily={'Caveat'}
                position={'absolute'}
                right={'-125px'}
                top={'-15px'}
                transform={'rotate(10deg)'}>
                Starting at $15/mo
              </Text>
            </Box> */}
					{/* </Stack> */}
				</Stack>
			</Container>
		</>
	)
}

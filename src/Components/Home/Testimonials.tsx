/* eslint-disable react-refresh/only-export-components */
import picGirl from "./Images/woman-1320810_1920.jpg"
import picMan from "./Images/adult-2449725_1920.jpg"

import {
	Box,
	Flex,
	Heading,
	Text,
	Stack,
	Container,
	Avatar,
	useColorModeValue,
} from "@chakra-ui/react"

interface Props {
	children: React.ReactNode
}

const Testimonial = (props: Props) => {
	const { children } = props

	return <Box>{children}</Box>
}

const TestimonialContent = (props: Props) => {
	const { children } = props

	return (
		<Stack
			bg={useColorModeValue("white", "gray.800")}
			boxShadow={"lg"}
			p={8}
			rounded={"xl"}
			align={"center"}
			pos={"relative"}
			_after={{
				content: `""`,
				w: 0,
				h: 0,
				borderLeft: "solid transparent",
				borderLeftWidth: 16,
				borderRight: "solid transparent",
				borderRightWidth: 16,
				borderTop: "solid",
				borderTopWidth: 16,
				borderTopColor: useColorModeValue("white", "gray.800"),
				pos: "absolute",
				bottom: "-16px",
				left: "50%",
				transform: "translateX(-50%)",
			}}>
			{children}
		</Stack>
	)
}

const TestimonialHeading = (props: Props) => {
	const { children } = props

	return (
		<Heading as={"h3"} fontSize={"xl"}>
			{children}
		</Heading>
	)
}

const TestimonialText = (props: Props) => {
	const { children } = props

	return (
		<Text
			textAlign={"center"}
			color={useColorModeValue("gray.600", "gray.400")}
			fontSize={"sm"}>
			{children}
		</Text>
	)
}

const TestimonialAvatar = ({
	src,
	name,
	title,
}: {
	src: string
	name: string
	title: string
}) => {
	return (
		<Flex align={"center"} mt={8} direction={"column"}>
			<Avatar src={src} mb={2} />
			<Stack spacing={-1} align={"center"}>
				<Text fontWeight={600}>{name}</Text>
				<Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
					{title}
				</Text>
			</Stack>
		</Flex>
	)
}

export default function AllTestimonials() {
	return (
		<Box bg={useColorModeValue("gray.100", "gray.700")}>
			<Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
				<Stack spacing={0} align={"center"}>
					<Heading>Our Clients Speak</Heading>
					{/* <Text>We have been working with clients around the world</Text> */}
				</Stack>
				<Stack
					direction={{ base: "column", md: "row" }}
					spacing={{ base: 10, md: 4, lg: 10 }}>
					<Testimonial>
						<TestimonialContent>
							<TestimonialHeading>Delicious taste</TestimonialHeading>
							<TestimonialText>
								I have been exposing outstanding pleasure each time visiting the
								place. The restaurant is not like the others
							</TestimonialText>
						</TestimonialContent>
						<TestimonialAvatar
							src={
								"https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
							}
							name={"Jane"}
							title={"from Warsaw"}
						/>
					</Testimonial>
					<Testimonial>
						<TestimonialContent>
							<TestimonialHeading>In a clase of it's own</TestimonialHeading>
							<TestimonialText>
								The retaurant is heaving with history. Wide range of seasonig,
								variety of cuisinies, excellent service
							</TestimonialText>
						</TestimonialContent>
						<TestimonialAvatar
							src={picMan}
							name={"Andrew"}
							title={"from Gliwice"}
						/>
					</Testimonial>
					<Testimonial>
						<TestimonialContent>
							<TestimonialHeading>Outstanding!</TestimonialHeading>
							<TestimonialText>
								This place is really posh. There is not comparable places like
								this in the local market. On top of that fantastic wine
								collection
							</TestimonialText>
						</TestimonialContent>
						<TestimonialAvatar
							src={picGirl}
							name={"Alice"}
							title={"from Szczecin"}
						/>
					</Testimonial>
				</Stack>
			</Container>
		</Box>
	)
}

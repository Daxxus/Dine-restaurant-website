"use client"

import React from "react"
import {
	Box,
	IconButton,
	useBreakpointValue,
	Stack,
	Heading,
	Text,
	Container,
} from "@chakra-ui/react"
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
// And react-slick as our Carousel Lib
import Slider from "react-slick"

// Settings for the slider
const settings = {
	dots: true,
	arrows: false,
	fade: true,
	infinite: true,
	autoplay: true,
	speed: 500,
	autoplaySpeed: 5000,
	slidesToShow: 1,
	slidesToScroll: 1,
}

export default function CaptionCarousel() {
	// As we have used custom buttons, we need a reference variable to
	// change the state
	const [slider, setSlider] = React.useState<Slider | null>(null )

	// These are the breakpoints which changes the position of the
	// buttons as the screen size changes
	const top = useBreakpointValue({ base: "90%", md: "50%" })
	const side = useBreakpointValue({ base: "30%", md: "40px" })

	// This list contains all the data for carousels
	// This can be static or loaded from a server
	const cards = [
		{
			title: "Andrew",
			text: "Our chief",
			image:
				"https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D	",
		},
		{
			title: "Peter",
			text: "Chief assistant",
			image:
				"https://images.unsplash.com/photo-1581349485608-9469926a8e5e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			title: "Anna",
			text: "The perfectionist",
			image:
				"https://images.unsplash.com/photo-1625631980634-397b9e9a73f9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
	]

	return (
		<Box
			position={"relative"}
			// height={"600px"}
			width={"full"}
			overflow={"hidden"}>
			{/* CSS files for react-slick */}
			<link
				rel='stylesheet'
				type='text/css'
				href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
			/>
			<link
				rel='stylesheet'
				type='text/css'
				href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
			/>
			{/* Left Icon */}
			<IconButton
				color={`white`}
				aria-label='left-arrow'
				variant='ghost'
				position='absolute'
				left={side}
				top={top}
				transform={"translate(0%, -50%)"}
				zIndex={2}
				onClick={() => slider?.slickPrev()}>
				<BiLeftArrowAlt size='40px' />
			</IconButton>
			{/* Right Icon */}
			<IconButton
				aria-label='right-arrow'
                color={`white`}
				variant='ghost'
				position='absolute'
				right={side}
				top={top}
				transform={"translate(0%, -50%)"}
				zIndex={2}
				onClick={() => slider?.slickNext()}>
				<BiRightArrowAlt size='40px' />
			</IconButton>
			{/* Slider */}
			{/* @ts-expect-error.() */}
			<Slider {...settings} ref={(slider: unknown) => setSlider(slider)}>
				{cards.map((card, index) => (
					<Box
						key={index}
						// height={"6xl"}
						position='relative'
						backgroundPosition='center'
						backgroundRepeat='no-repeat'
						backgroundSize='cover'
						backgroundImage={`url(${card.image})`}>
						{/* This is the block you need to change, to customize the caption */}
						<Container size='container.lg' height='600px' position='relative'>
							<Stack
								spacing={5}
								w={"full"}
								maxW={"lg"}
								color={`white`}
								position='absolute'
								top='10%'								
								transform={{
									base: "translate(50%, -50%)",
									sm: "translate(70%, -50%)",
								}}>
								<Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
									{card.title}
								</Heading>
								<Text fontSize={{ base: "md", lg: "lg" }}>{card.text}</Text>
							</Stack>
						</Container>
					</Box>
				))}
			</Slider>
		</Box>
	)
}

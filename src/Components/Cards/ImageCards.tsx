import {
	Card,
	CardBody,
	Stack,
	Heading,
	Divider,
	CardFooter,
	Button,
	Text,
	Image,
} from "@chakra-ui/react"

interface Props {
	image: string
	heading: React.ReactNode
	add: undefined
	// min: number
	max: number
}
const ImageCards = ({ image, heading, add, max }: Props) => {
	return (
		<Card maxW='2xs'>
			<CardBody>
				<Image src={image} alt='Tasty some meals' borderRadius='lg'></Image>
				<Stack mt='6' spacing='1'>
					<Heading size='sm'> {heading} </Heading>
					<Text color='blue.600' fontSize='xl'>
						{/* {max} */}
						{"$" + Math.trunc(Math.random() * max)}
					</Text>
				</Stack>
			</CardBody>
			<Divider />
			<CardFooter>
				{/* <ButtonGroup spacing='2'> */}
				<Button
					variant='ghost'
					colorScheme='blue'
					width={"full"}
					onClick={add}
					type='submit'>
					Add to cart
				</Button>
				{/* </ButtonGroup> */}
			</CardFooter>
		</Card>
	)
}

export default ImageCards

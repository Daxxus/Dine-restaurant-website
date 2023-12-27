import {
	Card,
	CardBody,
	Stack,
	Heading,
	Divider,
	CardFooter,
	Button,
	Image,
	Text,
} from "@chakra-ui/react"


interface Props {
	image: string
	heading: React.ReactNode
	add: (mealPrice: number) => void
	price: number
	onSubmit: () => void
}
const ImageCards = ({ image, heading, add, price, onSubmit }: Props) => {
	return (
		<Card maxW='2xs' {...onSubmit}>
			<CardBody>
				<Image src={image} alt='Tasty some meals' borderRadius='lg'></Image>
				<Stack mt='6' spacing='1'>
					<Heading size='sm'> {heading} </Heading>

					<Text color='blue.600' fontSize='2xl'
					textAlign={ 'center'}
					>
						${price}
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
					onClick={() => add(price)}
					type='submit'>
					Add to cart
				</Button>
			</CardFooter>
		</Card>
	)
}

export default ImageCards

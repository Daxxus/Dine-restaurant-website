import {
	Card,
	CardBody,
	Stack,
	Heading,
	Divider,
	CardFooter,
	Button,
	Text,
	Input,
	Image,
} from "@chakra-ui/react"
// import { ChangeEventHandler } from "react"
// import { FormEventHandler } from "react"

interface Props {
	image: string
	heading: React.ReactNode
	add: React.MouseEventHandler<HTMLButtonElement> | undefined
	price:number
	// max: ChangeEventHandler<HTMLInputElement>

	// max: FormEventHandler<HTMLParagraphElement>
}
const ImageCards = ({ image, heading, add, price }: Props) => {
	// const price = Math.trunc(Math.random() * max)
	return (
		<Card maxW='2xs'>
			<CardBody>
				<Image src={image} alt='Tasty some meals' borderRadius='lg'></Image>
				<Stack mt='6' spacing='1'>
					<Heading size='sm'> {heading} </Heading>
					<Input color='blue.600' fontSize='xl' defaultValue={price}>
					
						{/* {"$" + Math.trunc(Math.random() * max)} */}
					</Input>
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

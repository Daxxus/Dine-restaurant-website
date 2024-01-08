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
	Select,
	SelectProps,
	Box,
	useColorModeValue as mode,
} from "@chakra-ui/react"
import { ChangeEventHandler } from "react"

interface Props {
	image: string
	heading: React.ReactNode
	mealNumber: ChangeEventHandler<HTMLSelectElement>
	add: (mealPrice: number) => void
	price: number
	onSubmit: () => void
}
export const QuantitySelect = (props: SelectProps) => {
	return (
		<Select
			maxW='64px'
			aria-label='Select quantity'
			focusBorderColor={mode("blue.200", "blue.800")}
			{...props}>
			<option value='1'>1</option>
			<option value='2'>2</option>
			<option value='3'>3</option>
			<option value='4'>4</option>
		</Select>
	)
}
const ImageCards = ({
	image,
	heading,
	add,
	price,
	mealNumber,
	onSubmit,
}: Props) => {
	return (
		<Card maxW='2xs' {...onSubmit}>
			<CardBody
				display={`flex`}
				flexFlow={`column`}
				justifyContent={`space-between`}>
				<Image src={image} alt='Tasty some meals' borderRadius='lg'></Image>
				<Stack mt='6' spacing='1'>
					<Heading size='sm'> {heading} </Heading>
				</Stack>
				<Box display={`flex`} justifyContent={`space-between`}>
					<Text color='blue.600' fontSize='2xl' textAlign={"center"}>
						${price}
					</Text>
					<QuantitySelect onChange={mealNumber} />
				</Box>
			</CardBody>
			<Divider />
			<CardFooter>
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

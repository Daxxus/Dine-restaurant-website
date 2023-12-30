import {
	Button,
	Flex,
	Heading,
	// Link,
	Stack,
	Text,
	// useColorModeValue as mode,
} from "@chakra-ui/react"
import { FaArrowRight } from "react-icons/fa"
import { formatPrice } from "./PriceTag"
import { useAuthContext } from "../../../Contexts/useAuthContext"

export const CartOrderSummary = () => {
	const { totalPrice } = useAuthContext()
	return (
		<Stack
			spacing='8'
			borderWidth='1px'
			rounded='lg'
			padding='8'
			width='full'
			bg={" linear-gradient(to top, #ff0844 0%, #ffb199 100%);"}>
			<Heading size='md'>Order Summary</Heading>

			<Stack spacing='6'>
				{/* <OrderSummaryItem label='Subtotal' value={formatPrice(597)} /> */}
				{/* <OrderSummaryItem label='Shipping + Tax'>
					<Link href='#' textDecor='underline'>
						Calculate shipping
					</Link>
				</OrderSummaryItem> */}

				<Flex justify='space-between'>
					<Text fontSize='lg' fontWeight='semibold'>
						Total
					</Text>
					<Text fontSize='xl' fontWeight='extrabold'>
						{formatPrice(totalPrice)}
					</Text>
				</Flex>
			</Stack>
			<Button
				colorScheme='blue'
				size='lg'
				fontSize='md'
				rightIcon={<FaArrowRight />}>
				Add changes
			</Button>
		</Stack>
	)
}

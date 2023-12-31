import {
	// CloseButton,
	Flex,
	Select,
	SelectProps,
	useColorModeValue as mode,
} from "@chakra-ui/react"
import { PriceTag } from "./PriceTag"
import { CartProductMeta } from "./CartProductMeta"
import { useAuthContext } from "../../../Contexts/useAuthContext"

type CartItemProps = {
	orderTitle: string
	// mealNumber: number
	mealPrice: number
	currency: string
	image: string
	onChangeQuantity?: (quantity: number) => void
	
	// onClickDelete?: () => void
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

export const CartItem = (props: CartItemProps) => {
	const { totalPrice, setTotalPrice, setMealNumber } = useAuthContext()
	
	const {
		orderTitle,
		// mealNumber,
		image,
		currency,
		mealPrice,
		onChangeQuantity,
		// onClickDelete,
	} = props
	console.log(typeof totalPrice)

	return (
		<Flex
			bg={mode(`white`, `gray.600`)}
			direction={{ base: "column", md: "row" }}
			justify='space-between'
			align='center'>
			<CartProductMeta name={orderTitle} image={image} />

			{/* Desktop */}
			<Flex
				width='full'
				ml={50}
				justify='space-around'
				display={{ base: "none", md: "flex" }}>
				<QuantitySelect
					onChange={(e) => {
						// jak ustawić cenę na reduce
						const sumUp = totalPrice + (+e.target.value - 1) * mealPrice
						
						setTotalPrice(sumUp)
						setMealNumber(+e.target.value)
						
					}}
					// value={mealNumber}
					// onChange={(e) => {
					// 	onChangeQuantity?.(+e.currentTarget.value)
					// }}
				/>
				<PriceTag price={mealPrice} currency={currency} />
			</Flex>

			{/* Mobile */}
			<Flex
				mt='4'
				align='center'
				width='full'
				justify='space-between'
				display={{ base: "flex", md: "none" }}>
				{/* <Link fontSize='sm' textDecor='underline'>
					Delete
				</Link> */}
				<QuantitySelect
					// value={mealPrice}
					onChange={(e) => {
						onChangeQuantity?.(+e.currentTarget.value)
					}}
				/>
				<PriceTag price={mealPrice} currency={currency} />
			</Flex>
		</Flex>
	)
}

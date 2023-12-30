import {
	// CloseButton,
	Flex,
	// Link,
	Select,
	SelectProps,
	useColorModeValue,
} from "@chakra-ui/react"
import { PriceTag } from "./PriceTag"
import { CartProductMeta } from "./CartProductMeta"

type CartItemProps = {
	// isGiftWrapping?: boolean
	orderTitle: string
	// description: string
	mealNumber: number
	mealPrice: number
	currency: string
	image: string
	onChangeQuantity?: (quantity: number) => void
	// onClickGiftWrapping?: () => void
	onClickDelete?: () => void
}

const QuantitySelect = (props: SelectProps) => {
	return (
		<Select
			maxW='64px'
			aria-label='Select quantity'
			focusBorderColor={useColorModeValue("blue.200", "blue.800")}
			{...props}>
			<option value='1'>1</option>
			<option value='2'>2</option>
			<option value='3'>3</option>
			<option value='4'>4</option>
		</Select>
	)
}

export const CartItem = (props: CartItemProps) => {
	const {
		// isGiftWrapping,
		orderTitle,
		// description,
		mealNumber,
		image,
		currency,
		mealPrice,
		onChangeQuantity,
		// onClickDelete,
	} = props

	return (
		<Flex
			// bg={ 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)'}
      bg={useColorModeValue(`white`, `gray.600`)}
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
					value={mealNumber}
					onChange={(e) => {
						onChangeQuantity?.(+e.currentTarget.value)
					}}
				/>
				<PriceTag price={mealPrice} currency={currency} />
				{/* <CloseButton
					aria-label={`Delete ${orderTitle} from cart`}
					onClick={onClickDelete}
				/> */}
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
					value={mealPrice}
					onChange={(e) => {
						onChangeQuantity?.(+e.currentTarget.value)
					}}
				/>
				<PriceTag price={mealPrice} currency={currency} />
			</Flex>
		</Flex>
	)
}

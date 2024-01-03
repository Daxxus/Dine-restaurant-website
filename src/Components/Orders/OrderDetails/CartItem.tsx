import {
	// CloseButton,
	Flex,
	// Link,
	Select,
	SelectProps,
	useColorModeValue as mode,
} from "@chakra-ui/react"
import axios from "axios"
import { PriceTag } from "./PriceTag"
import { CartProductMeta } from "./CartProductMeta"
// import { useAuthContext } from "../../../Contexts/useAuthContext"
// import useOrders from "../../Clients/useOrders"
import { Formik } from "formik"
import { useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type CartItemProps = {
	orderTitle: string
	// mealNumber: number
	mealPrice: number
	currency: string
	image: string
	onChangeQuantity?: (quantity: number) => void
	onClickDelete?: () => void
}
interface mealNbr {
	mealNumber: number
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
	// const { totalPrice, setTotalPrice, setMealNumber } = useAuthContext()
	// const { orders } = useOrders()
	const param = useParams()
	// console.log(orders)

	const newMealNumber = (newNbr: mealNbr) => {
		console.log(newNbr)
		axios
			.put(`http://localhost:3000/clientOrders/${param.id}`, newNbr)
			.then((resp) => {
				const { data } = resp
				return data
			})
	}
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: async (values: mealNbr) => {
			return newMealNumber(values)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [`clientOrders`, Number(param.id)],
			})
		},
		onError: () => {
			console.log("Error !!!!!")
		},
	})

	const handleAddNewMealNbr = (mealNumb: mealNbr) => {
		console.log(mealNumb)
		mutation.mutate(mealNumb)
	}

	// const updateTotalPrice = (e: { target: { value: string | number } }) => {
	// 	console.log(e.target.value)

	// 	// if (orders) {
	// 	// 	const total = orders.reduce(
	// 	// 		(acc: number, cur: { mealPrice: number; mealNumber:number }) =>
	// 	// 			acc + (+e.target.value - 1) * cur.mealPrice,
	// 	// 		0
	// 	// 	)
	// 	// 	console.log(total)
	// 	// 	const sumUp = totalPrice + (+e.target.value - 1) * mealPrice
	// 	// 	console.log(sumUp)
	// 	// 	setTotalPrice(sumUp)

	// 	// 	setMealNumber(+e.target.value)
	// 	// }
	// }

	const {
		orderTitle,
		// mealNumber,
		image,
		currency,
		mealPrice,
		// onChangeQuantity,
		// onClickDelete,
	} = props

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
				<Formik
					initialValues={{
						mealNumber: 1,
					}}
					onSubmit={(values: mealNbr) => {
						handleAddNewMealNbr(values)
						// newMealNumber(values)
					}}>
					{({ handleSubmit, setFieldValue }) => (
						<form onSubmit={handleSubmit}>
							<QuantitySelect
								// id={param.id}

								onChange={(e) => {
									console.log(e.target.value)

									setFieldValue(`mealNumber`, +e.target.value)
								}}
								// onChange={handleChange}
								
							/>
						</form>
					)}
				</Formik>
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
					onChange={(e) => {
						// const sumUp = totalPrice + (+e.target.value - 1) * mealPrice
						// setTotalPrice(sumUp)
						// setMealNumber(+e.target.value)
					}}
				/>
				<PriceTag price={mealPrice} currency={currency} />
			</Flex>
		</Flex>
	)
}

import {
	Flex,
	Select,
	SelectProps,
	useColorModeValue as mode,
} from "@chakra-ui/react"
import axios from "axios"
import { PriceTag } from "./PriceTag"
import { CartProductMeta } from "./CartProductMeta"
import { Formik } from "formik"
import { useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type CartItemProps = {
	orderTitle: string
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
			<option value='0'>0</option>
			<option value='1'>1</option>
			<option value='2'>2</option>
			<option value='3'>3</option>
			<option value='4'>4</option>
		</Select>
	)
}

export const CartItem = (props: CartItemProps) => {
	const param = useParams()

	// const newMealNumber = async (
	// 	newNbr: mealNbr,
	// 	id: string | number | undefined
	// ) => {
	// 	const response = await fetch(`http://localhost:3000/clientOrders/${id}`, {
	// 		method: "PATCH",
	// 		headers: { "Content-type": "application/json;charset=UTF-8" },
	// 		body: JSON.stringify(newNbr),
	// 	})
	// 	const data = await response.json()
	// 	return data
	// }
	const newMealNumber = async (
		newNbr: mealNbr,
		id: string | number | undefined
	) => {
		await axios
			.patch(`http://localhost:3000/clientOrders/${id}`, newNbr)
			.then((resp) => {
				const { data } = resp
				return data
			})
	}

	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: async (values: mealNbr) => {
			return await newMealNumber(values, param.id)
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
		mutation.mutate(mealNumb)
	}

	const { orderTitle, image, currency, mealPrice } = props

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
					enableReinitialize
					onSubmit={(values: mealNbr) => {
						handleAddNewMealNbr(values)
					}}>
					{({ handleSubmit, setFieldValue }) => (
						<QuantitySelect
							onChange={(e) => {
								setFieldValue(`mealNumber`, +e.target.value)
								handleSubmit()
							}}
						/>
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
				<Formik
					initialValues={{
						mealNumber: 1,
					}}
					enableReinitialize
					onSubmit={(values: mealNbr) => {
						handleAddNewMealNbr(values)
					}}>
					{({ handleSubmit, setFieldValue }) => (
						<QuantitySelect
							onChange={(e) => {
								setFieldValue(`mealNumber`, +e.target.value)
								handleSubmit()
							}}
						/>
					)}
				</Formik>
				<PriceTag price={mealPrice} currency={currency} />
			</Flex>
		</Flex>
	)
}

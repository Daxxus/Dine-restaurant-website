/* eslint-disable no-mixed-spaces-and-tabs */
import { Box, Flex, VStack } from "@chakra-ui/react"
import axios from "axios"
import { Formik } from "formik"
import { Hourglass } from "react-loader-spinner"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import ImageCards from "../Cards/ImageCards"
import SearchTitle from "./SearchTitle"
import Ranges from "./RangePrice"
import SelectTitle from "./SelectTitle"
import style from "../Cards/Cards.module.css"
import { SetStateAction, useState } from "react"
import { useSelector } from "react-redux"
import { useAuthContext } from "../../Contexts/useAuthContext"
interface Order {
	mealPrice: number
	mealNumber: number
	orderTitle: string
}
interface OrderDetails {
	orderId: string
	date: string
	clientId: string | number
	image: string
	name: string
}

export default function SelectMenu() {
	const { clientEmail } = useSelector(
		(state: Record<string, never>) => state.emailSlice
	)

	const {
		data: menuItem,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["menuItems"],
		queryFn: () =>
			fetch("http://localhost:3000/menuItems").then((res) => res.json()),
	})

	const addOrder = async (newOrder: OrderDetails) => {
		await axios
			.post(` http://localhost:3000/clientOrders`, newOrder)
			.then((resp) => {
				const { data: mealsName } = resp
				return mealsName
			})
		
	}
	const [menu, setMenu] = useState(menuItem)
	const [menuTitle, setMenuTitle] = useState("")
	const [sliderValue, setSliderValue] = useState(200)

	const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
		const findMeal = menuItem.filter((el: { name: string }) => {
			{/* @ts-expect-error.() */}
			return el.name.toLowerCase().includes(e.target.value.toLowerCase().trim())
		})
		setMenuTitle(e.target.value)
		setMenu(findMeal)
	}

	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: async (values: OrderDetails) => {
			return await addOrder(values)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["clientOrders"] })
		},
		onError: () => {
			console.log("Error !!!!!")
		},
	})
	const handleAdd = (newOrder: OrderDetails) => {
		mutation.mutate(newOrder)
	}
{/* @ts-expect-error.() */}
	const handleRange = (e) => {
		setSliderValue(e.target.value)
		const findMeal = menuItem.filter((el: { price: number }) => {
			return el.price <= e.target.value
		})
		setMenuTitle(e.target.value)
		setMenu(findMeal)
	}

	const { clientId } = useAuthContext()

	if (error) {
		return <p>Can not get orders</p>
	}
	if (isLoading) {
		return (
			<h3>
				<Hourglass />
			</h3>
		)
	}
	if (!menuItem) {
		return <p>No data...</p>
	}
	return (
		<Flex>
			<VStack width={"100%"}>
				<Box className={style.gridBox} alignItems={"center"}>
					<SearchTitle search={handleSearch} />
					<Ranges target={handleRange} value={sliderValue} />
					<SelectTitle
						target={handleSearch}
						select={menuItem?.map((el: { id: string; name: string }) => (
							<option key={el.id} value={el.name}>
								{el.name}
							</option>
						))}
					/>
				</Box>
				<Box py={{ base: 20, md: 20 }} className={style.grid}>
					{menuTitle
						? menu?.map(
								(el: {
									id: string
									name: string
									image: string
									price: number
								}) => {
									return (
										<Formik
											key={el.id}
											// children={[]}
											initialValues={{
												orderTitle: el.name,
												mealPrice: 0,
												mealNumber: 1,
											}}
											onSubmit={(values: Order) => {
												handleAdd({
													...values,
													orderId: el.id,
													date: new Date().toLocaleDateString(),
													image: el.image,
													name: clientEmail,
													clientId: clientId,
												})
											}}>
											{({ handleSubmit, setFieldValue }) => (
												<ImageCards
													onSubmit={handleSubmit}
													image={el.image}
													heading={el.name}
													price={el.price}
													add={(mealPrice: number) => {
														setFieldValue("mealPrice", mealPrice)
														handleSubmit()
													}}
													mealNumber={(e) => {
														setFieldValue(`mealNumber`, +e.target.value)
													}}
												/>
											)}
										</Formik>
									)
								}
						  )
						: menuItem?.map(
								(el: {
									id: string
									name: string
									image: string
									price: number
								}) => {
									return (
										<Formik
											key={el.id}
											initialValues={{
												orderTitle: el.name,
												mealPrice: 0,
												mealNumber: 1,
											}}
											onSubmit={(values: Order) => {
												handleAdd({
													...values,
													orderId: el.id,
													date: new Date().toLocaleDateString(),
													image: el.image,
													name: clientEmail,
													clientId: clientId,
												})
											}}>
											{({ handleSubmit, setFieldValue }) => (
												<ImageCards
													onSubmit={handleSubmit}
													image={el.image}
													heading={el.name}
													price={el.price}
													add={(mealPrice: number) => {
														setFieldValue("mealPrice", mealPrice)
														handleSubmit()
													}}
													mealNumber={(e) => {
														setFieldValue(`mealNumber`, +e.target.value)
													}}
												/>
											)}
										</Formik>
									)
								}
						  )}
				</Box>
			</VStack>
		</Flex>
	)
}

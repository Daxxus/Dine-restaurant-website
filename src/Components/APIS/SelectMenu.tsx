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
import { toCart } from "../../Redux/SumUp"
import { addImage } from "../../Redux/MealImage"
// import { addOrder } from "../../Redux/Cart"
import { useDispatch, useSelector } from "react-redux"
import { useAuthContext } from "../../Contexts/useAuthContext"
interface Order {
	mealPrice: number
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
	const dispatch = useDispatch()
	const { clientEmail } = useSelector(
		(state: Record<string, never>) => state.emailSlice
	)

	// const { value } = useSelector((state) => state.sumUp)

	const {
		data: menuItem,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["menuItems"],
		queryFn: () =>
			fetch("http://localhost:3000/menuItems").then((res) => res.json()),
	})

	const addOrder = (newOrder: OrderDetails) => {
		axios.post(` http://localhost:3000/orders`, newOrder).then((resp) => {
			const { data: mealsName } = resp
			return mealsName
		})
		setTimeout(() => {
			setMenuTitle("")
		}, 1000)
	}
	const [menu, setMenu] = useState(menuItem)
	const [menuTitle, setMenuTitle] = useState("")
	const [sliderValue, setSliderValue] = useState(200)
	// zamiast tego daj setFieldValue w propsach
	// const [mealPrice, setMealPrice] = useState(0)

	const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
		const findMeal = menuItem.filter((el: { name: string }) => {
			return el.name.toLowerCase().includes(e.target.value.toLowerCase().trim())
		})
		setMenuTitle(e.target.value)
		setMenu(findMeal)
	}

	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: async (values: OrderDetails) => {
			return addOrder(values)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders", clientId] })
		},
		onError: () => {
			console.log("Error !!!!!")
		},
	})
	const handleAdd = (newOrder: OrderDetails) => {
		mutation.mutate(newOrder)
	}
	const handleRedux = (image: string, mealPrice: number) => {
		// problem podział na userów
		dispatch(toCart(mealPrice))
		dispatch(addImage(image))
		// dispatch(addOrder(name))
	}

	// const clearInput = () => {
	// 	if (menuTitle) {
	// 		console.log(menuTitle)
	// 		setMenuTitle("d")
	// 	}
	// }

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
						select={menuItem?.map((el) => (
							<option key={el.id} value={el.name}>
								{el.name}
							</option>
						))}
					/>
				</Box>

				<Box py={{ base: 20, md: 20 }} className={style.grid}>
					{menuTitle
						? menu?.map((el) => {
								return (
									<Formik
										key={el.id}
										// children={[]}
										initialValues={{
											orderTitle: el.name,
											mealPrice: 0,
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
												// mealePrice to param price z Image cart
												add={(mealPrice: number) => {
													// console.log("el.image", el.image)
													setFieldValue("mealPrice", mealPrice) //do orders
													// clearInput()
													handleSubmit()
													handleRedux(el.image, mealPrice) // do global
												}}
											/>
										)}
									</Formik>
								)
						  })
						: menuItem?.map((el) => {
								return (
									<Formik
										key={el.id}
										initialValues={{
											orderTitle: el.name,
											mealPrice: 0,
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
												// mealePrice to param price z Image cart
												add={(mealPrice: number) => {
													// console.log("el.image", el.image)
													setFieldValue("mealPrice", mealPrice) //do orders
													// clearInput()
													handleSubmit()
													handleRedux(el.image, mealPrice) // do global
												}}
											/>
										)}
									</Formik>
								)
						  })}
				</Box>
			</VStack>
		</Flex>
	)
}

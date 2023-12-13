import { Box, Flex } from "@chakra-ui/react"
import axios from "axios"
import { Formik } from "formik"
import { Hourglass } from "react-loader-spinner"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import ImageCards from "../Cards/ImageCards"
import SearchTitle from "./SearchTitle"
import Range from "./RangePrice"
import { StyledWrapper } from "./StyleWrapper"
import SelectTitle from "./SelectTitle"
import style from "../Cards/Cards.module.css"
import { useState } from "react"
import { toCart } from "../../Redux/SumUp"
import { useDispatch } from "react-redux"
interface Order {
	order: string
}
interface OrderDetails {
	orderId: string
	date: string
	price: number
}

export default function SelectMenu() {
	const dispatch = useDispatch()

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
	const [mealPrice, setMealPrice] = useState(0)

	const handleSearch = (e) => {
		const findMeal = menuItem.filter((el: { name: string }) => {
			return el.name.toLowerCase().includes(e.target.value.toLowerCase().trim())
		})
		setMenuTitle(e.target.value)
		setMenu(findMeal)
	}

	const handleRange = () => {
		console.log("das")
	}
	const handlePrice = () => {
		return "$" + Math.trunc(Math.random() * 200)
	}

	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: async (values: OrderDetails) => {
			return addOrder(values)
		},
		onSuccess: () => {
			queryClient.invalidateQueries()
		},
		onError: () => {
			console.log("Lipa!!!!!")
		},
	})
	const handleAdd = (newOrder: OrderDetails) => {
		mutation.mutate(newOrder)
	}

	// const clearInput = (e) => {
	// 	if (!menuTitle) {
	// 		e.target.value = ""
	// 	}
	// }

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
		// <>
		<Flex>
			<Box>
				{/* <StyledWrapper> */}
				<Box className={style.gridBox}>
					<SearchTitle
						search={handleSearch}
						// value={clearInput}
					/>
					<SelectTitle
						target={handleSearch}
						select={menuItem.map((el) => (
							<option key={el.id} value={el.name}>
								{el.name}
							</option>
						))}
					/>
					<Range
						target={handleRange}
						select={undefined}
						// select={menuItem.map((el) => (
						// 	<option key={el.id} value={el.name}>
						// 		{el.name}
						// 	</option>
						// ))}
					/>
				</Box>
				{/* </StyledWrapper> */}

				<Box py={{ base: 20, md: 20 }} className={style.grid}>
					{menuTitle
						? menu.map((el) => {
								return (
									<Formik
										key={el.id}
										// children={[]}
										initialValues={{
											order: el.name,
										}}
										onSubmit={(values: Order) => {
											handleAdd({
												...values,
												orderId: el.id,
												date: new Date().toLocaleDateString(),
												price: 22,
											})
										}}>
										{({ handleSubmit }) => (
											<ImageCards
												onSubmit={handleSubmit}
												image={el.image}
												value={setMealPrice(Math.trunc(Math.random() * 200))}
												heading={el.name}
												price={Math.trunc(Math.random() * 200)}
												add={() => {
													handleSubmit()
													dispatch(toCart(mealPrice))
												}}
											/>
										)}
									</Formik>
								)
						  })
						: null}
				</Box>
			</Box>
		</Flex>
	)
}

{
	/* <Flex py={{ base: 20, md: 15 }} className={style.grid}>
	{menuItem.map((el) => {
		return (
			<ImageCards
				key={el.id}
				image={el.image}
				heading={el.name}
				add={handleSubmit}
			/>
		)
	})}
</Flex> */
}

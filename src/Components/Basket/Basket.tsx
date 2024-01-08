/* eslint-disable no-mixed-spaces-and-tabs */
import BgImage from "../Images/restaurant-449952_1920.jpg"
import MealCard from "./MealCards"
import useOrders from "../Clients/useOrders"
import useReservations from "../Clients/useReservations"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useBreakpointValue, Flex, Box } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import style from "./Styles/Basket.module.css"
import axios from "axios"
interface MealProps {
	mealNumber: number
	name: string
	id: number
	orderTitle: string
	image: string
	mealPrice: number
}
export default function Basket() {
	// const { clientEmail } = useSelector(
	// 	(state: Record<string, never>) => state.emailSlice	// )

	const { orders } = useOrders()
	const { reservations } = useReservations()
	const navigate = useNavigate()

	const jumpToOrderDetails = (id: string | number) => {
		navigate(`/buisness/orders/${id}`)
	}
	const deleteOrder = async (id: void) => {
		const response = await axios.delete(
			`http://localhost:3000/clientOrders/${id}`
		)

		const { data: order } = response
		return order
	}
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: async (id) => {
			return await deleteOrder(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["clientOrders"] })
		},
		onError: () => {
			console.log("Error !!!!!")
		},
	})
	const handleDelete = (id: void | number) => {
		mutation.mutate(id)
	}

	return (
		<Flex
			justify={"center"}
			w={"full"}
			backgroundImage={BgImage}
			backgroundSize={"cover"}
			h={{ base: "full", sm: "full", md: "full", lg: "full", xl: "100vh" }}
			backgroundPosition={"center center"}
			>
			<Box
				className={style.grid}
				py={{ base: 5, md: 50 }}
				px={useBreakpointValue({ base: 4, md: 8 })}>
				{orders?.map((order: MealProps) => {
					return (
						<MealCard
							key={order.id}
							orderTitle={order.orderTitle}
							image={order.image}
							price={"$" + `${order.mealPrice}`}
							reservDate={
								reservations
									? "Reservation: " +
											reservations[reservations.length - 1]?.date.split("T") ||
									  null
									: `No reservation`
							}
							delOrder={() => handleDelete(order.id)}
							mealNumber={order.mealNumber}
							edit={() => jumpToOrderDetails(order.id)}
						/>
					)
				})}
			</Box>
		</Flex>
	)
}

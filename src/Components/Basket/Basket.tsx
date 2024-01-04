import BgImage from "../Images/restaurant-449952_1920.jpg"
import MealCard from "./MealCards"
import useOrders from "../Clients/useOrders"
import useReservations from "../Clients/useReservations"
import { useSelector } from "react-redux"
import { useBreakpointValue, Flex, HStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import style from "../Orders/styles/OrderDeatails.module.css"
// import { useAuthContext } from "../../Contexts/useAuthContext"
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
	const { clientEmail } = useSelector(
		(state: Record<string, never>) => state.emailSlice
	)
	const { orders } = useOrders()
	const { reservations } = useReservations()
	const navigate = useNavigate()

	const jumpToOrderDetails = (id: string | number) => {
		navigate(`/buisness/orders/${id}`)
	}
	const deleteOrder = async (id: number) => {
		await axios
			.delete(`http://localhost:3000/clientOrders/${id}`)
			.then((response) => {
				const { data: order } = response
				return order
			})
	}

	return (
		<Flex
			justify={"center"}
			w={"full"}
			h={{ base: "full", sm: "100vh",md: "100vh", lg: "100vh" }}
			backgroundImage={BgImage}
			backgroundSize={"cover"}
			backgroundPosition={"center center"}>
			<HStack
				// style.grid nie odpala sie należycie check out
				className={style.grid}
				spacing={{ base: 5, md: 50 }}
				py={{ base: 5, md: 50 }}
				px={useBreakpointValue({ base: 4, md: 8 })}>
				{orders?.map((order: MealProps) => {
					if (order.name === clientEmail) {
						return (
							<MealCard
								key={order.id}
								orderTitle={order.orderTitle}
								image={order.image}
								price={"$" + `${order.mealPrice}`}
								reservDate={
									reservations
										? "Reservation: " +
												reservations[reservations.length - 1]?.date.split(
													"T"
												) || "No reservation"
										: "No reservation"
								}
								delOrder={() => deleteOrder(order.id)}
								mealNumber={order.mealNumber}
								edit={() => jumpToOrderDetails(order.id)}
							/>
						)
					}
				})}
			</HStack>
		</Flex>
	)
}


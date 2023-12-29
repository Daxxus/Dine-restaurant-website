import BgImage from "../Images/restaurant-449952_1920.jpg"
import MealCard from "./MealCards"
import useOrders from "../Clients/useOrders"
import useReservations from "../Clients/useReservations"
import { useSelector } from "react-redux"
import { useBreakpointValue, Flex, HStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import style from "../Orders/styles/OrderDeatails.module.css"

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
	const deleteOrder = async (id: string | number) => {
		console.log(id)
		const response = await fetch(`http://localhost:3000/orders/${id}`, {
			headers: { "Content-type": "application/json;charset=UTF-8" },
			method: "DELETE",
		})
		const data = await response.json()
		return data
	}

	return (
		<Flex
			justify={"center"}
			w={"full"}
			h={{ base: "full", lg: "100vh" }}
			backgroundImage={BgImage}
			backgroundSize={"cover"}
			backgroundPosition={"center center"}>
			<HStack
				// style.grid nie odpala sie należycie check out
				className={style.grid}
				spacing={{ base: 5, md: 50 }}
				py={{ base: 5, md: 50 }}
				px={useBreakpointValue({ base: 4, md: 8 })}>
				{orders?.map(
					(order: {
						name: string
						id: string | number
						orderTitle: string
						image: string
						mealPrice: number
					}) => {
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
									mealNbr={1}
									edit={() => jumpToOrderDetails(order.id)}
								/>
							)
						}
					}
				)}
			</HStack>
		</Flex>
	)
}
// reservations
// 	?.find(
// 		(el: { user: string }) => el.user === clientEmail
// 	)
// 	?.date.split("T") || null

{
	/* <VStack
  w={'full'}
  bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
  justify={'center'}
  px={useBreakpointValue({ base: 4, md: 8 })}
  >
  <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
    <Text
      color={'white'}
      fontWeight={700}
      lineHeight={1.2}
      fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
      Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor
    </Text>
    <Stack direction={'row'}>
      <Button
        bg={'blue.400'}
        rounded={'full'}
        color={'white'}
        _hover={{ bg: 'blue.500' }}>
        Show me more
      </Button>
      <Button
        bg={'whiteAlpha.300'}
        rounded={'full'}
        color={'white'}
        _hover={{ bg: 'whiteAlpha.500' }}>
        Show me more
      </Button>
    </Stack>
  </Stack>
</VStack> */
}

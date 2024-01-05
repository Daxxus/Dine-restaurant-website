import { useParams } from "react-router-dom"
import BgImage from "../../Images/a-restaurant-4857484.jpg"
import { useNavigate } from "react-router-dom"
import useOrders from "../../Clients/useOrders"
import {
	Box,
	Flex,
	Heading,
	HStack,
	Link,
	Stack,
	useColorModeValue as mode,
} from "@chakra-ui/react"
import { Formik } from "formik"
import {  useMutation, useQueryClient } from "@tanstack/react-query"
import { CartItem } from "./CartItem"
import { CartOrderSummary } from "./CartOrderSummary"

interface SingleMeal {
	mealNumber: number
}
const updateMealOrderById = async (
	updateMealOrder: SingleMeal,
	id: string | undefined
) => {
	const response = await fetch(`http://localhost:3000/clientOrders/${id}`, {
		method: "PUT",
		headers: { "Content-type": "application/json;charset=UTF-8" },
		body: JSON.stringify(updateMealOrder),
	})
	const data = await response.json()
	return data
}

const OrderDetails = () => {
	const { orders } = useOrders()
	const param = useParams()
	const navigate = useNavigate()
	const queryClient = useQueryClient()	

	const mutation = useMutation({
		mutationFn: async (values: SingleMeal) => {
			return await updateMealOrderById(values, param.id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["clientOrders", param.id] })
		},
		onError: () => {
			console.log("Error !!!")
		},
	})
	const handleMealOrder = (newMeal: SingleMeal) => {
		mutation.mutate(newMeal)
	}

	const navigateMenuList = () => {
		navigate("/buisness/orders/addOrder")
	}
	if (!orders) <p>No data!!!</p>	
	
	return (
		<Flex
			bgImage={BgImage}
			bgSize={"cover"}
			justify={"center"}
			align={`center`}
			backgroundPosition={"center "}
			h={"100vh"}>
			<Box
				maxW={{ base: "3xl", lg: "7xl" }}
				mx='auto'
				px={{ base: "4", md: "8", lg: "12" }}
				py={{ base: "6", md: "8", lg: "12" }}>
				<Formik
					initialValues={{
						mealNumber:
							orders?.find((el: { id: number }) => el.id === Number(param.id))
								?.mealNumber || undefined,
					}}
					enableReinitialize
					onSubmit={(values) => {
						handleMealOrder(values)
					}}>
					{({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<Stack
								p={10}
								bg={" linear-gradient(to top, #0ba360 0%, #3cba92 100%)"}
								filter={"grayscale(40%)"}
								direction={{ base: "column", lg: "row" }}
								align={{ lg: "flex-start" }}
								spacing={{ base: "8", md: "16" }}>
								<Stack spacing={{ base: "8", md: "10" }} flex='2'>
									<Heading fontSize='2xl' fontWeight='extrabold'>
										Booking Cart
									</Heading>

									<Stack spacing='6'>
										{orders?.map((el) => {
											if (el.id === Number(param.id))
												return <CartItem key={el.id} {...el} />
										})}
									</Stack>
								</Stack>

								<Flex direction='column' align='center' flex='1'>
									<CartOrderSummary />
									<HStack mt='6' fontWeight='semibold'>
										<p>or</p>
										<Link
											onClick={navigateMenuList}
											color={mode("blue.200", "blue.800")}>
											Continue booking
										</Link>
									</HStack>
								</Flex>
							</Stack>
						</form>
					)}
				</Formik>
			</Box>
		</Flex>
	)
}

export default OrderDetails

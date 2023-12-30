import { useParams } from "react-router-dom"
import BgImage from "../../Images/a-restaurant-4857484.jpg"
import { useNavigate } from "react-router-dom"
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { CartItem } from "./CartItem"
import { CartOrderSummary } from "./CartOrderSummary"
// import { cartData } from "./CartData"
interface SingleMeal {
	mealNumber: number
}
const updateMealOrderById = async (
	updateMealOrder: SingleMeal,
	id: string | undefined
) => {
	const response = await fetch(`http://localhost:3000/orders/${id}`, {
		method: "PUT",
		headers: { "Content-type": "application/json;charset=UTF-8" },
		body: JSON.stringify(updateMealOrder),
	})
	const data = await response.json()
	return data
}

const OrderDetails = () => {
	const navigate = useNavigate()
	const param = useParams()
	const queryClient = useQueryClient()

	const {
		data: meal,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["orders"],
		queryFn: () =>
			fetch(`http://localhost:3000/orders/`).then((res) => res.json()),
	})

	const mutation = useMutation({
		mutationFn: async (values: SingleMeal) => {
			return updateMealOrderById(values, param.id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders", param.id] })
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
	if (error) <p>Can not get Order</p>
	if (isLoading) <p>Loading...</p>
	if (!meal) <p>No data!!!</p>
	// console.log(cartData)
	// console.log(meal)
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
							meal?.find((el: { id: number }) => el.id === Number(param.id))
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
										{meal?.map((el) => {
											if (el.id === Number(param.id))
												return <CartItem key={el.id} {...el} />
										})}
										{/* {meal?.map((item) => (
											
											<CartItem key={item.id} {...item} />
										))} */}
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

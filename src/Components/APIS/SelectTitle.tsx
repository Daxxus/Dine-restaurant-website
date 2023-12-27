import { Select, Box } from "@chakra-ui/react"
import { ChangeEventHandler } from "react"

interface SearchProps {
	select: React.ReactNode
	target: ChangeEventHandler<HTMLSelectElement> | undefined
	// value: any
}
const SelectTitle = ({ select, target }: SearchProps) => {
	return (
		<Box>
			<Select
				placeholder='Search meals'
				border={"1px"}				
				maxW={400}
				id='search'
				onChange={target}
				name='order'
				variant='filled'>				
				{select}
			</Select>
		</Box>
	)
}

export default SelectTitle























// {   menuItem.map((el) => (
// 	<option key={el.id} value={el.name}>
// 		{el.name}
// 	</option>									))}

// import {
// 	// Button,
// 	FormControl,
// 	FormLabel,
// 	Input,
// 	VStack,
// 	FormErrorMessage,
// 	Flex,
// } from "@chakra-ui/react"
// import axios from "axios"
// import { Formik, Field } from "formik"
// import { object } from "yup"
// import * as yup from "yup"
// import { Hourglass } from "react-loader-spinner"
// import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
// import ImageCards from "../Cards/ImageCards"
// import style from "../Cards/Cards.module.css"
// interface Order {
// 	search: string
// }
// interface OrderDetails {
// 	orderId: string
// 	date: string
// }

// const orderSchema = object({
// 	search: yup.string().required(),
// 	// orderTitle: yup.string().required(),
// 	// mealQuantity: yup.string().required(),
// 	// image: yup.string().required("Image is required"),
// })

// export default function SearchTitle() {
// 	const {
// 		data: menuItem,
// 		isLoading,
// 		error,
// 	} = useQuery({
// 		queryKey: ["menuItems"],
// 		queryFn: () =>
// 			fetch("http://localhost:3000/menuItems").then((res) => res.json()),
// 	})

// 	const addOrder = (newOrder: OrderDetails) => {
// 		axios.post(` http://localhost:3000/orders`, newOrder).then((resp) => {
// 			const { data: mealsName } = resp
// 			return mealsName
// 		})
// 	}

// 	const queryClient = useQueryClient()
// 	const mutation = useMutation({
// 		mutationFn: async (values: OrderDetails) => {
// 			return addOrder(values)
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries()
// 		},
// 		onError: () => {
// 			console.log("Lipa!!!!!")
// 		},
// 	})
// 	const handleAdd = (newOrder: OrderDetails) => {
// 		mutation.mutate(newOrder)
// 	}
// 	if (error) {
// 		return <p>Can not get orders</p>
// 	}
// 	if (isLoading) {
// 		return (
// 			<h3>
// 				<Hourglass />
// 			</h3>
// 		)
// 	}
// 	if (!menuItem) {
// 		return <p>No data...</p>
// 	}
// 	// console.log(menuItem)
// 	return (
// 		<>
// 			<Formik
// 				initialValues={{
// 					search: "",
// 				}}
// 				validationSchema={orderSchema}
// 				onSubmit={(values: Order, { resetForm }) => {
// 					resetForm()
// 					handleAdd({
// 						...values,
// 						orderId: values.search,
// 						date: new Date().toLocaleDateString(),
// 					})
// 				}}>
// 				{({ handleSubmit, errors, touched, values }) => (
// 					<form onSubmit={handleSubmit}>
// 						<VStack spacing={1}>
// 							<FormControl isInvalid={!!errors.search && touched.search}>
// 								<FormLabel htmlFor='order'></FormLabel>
// 								<Field
// 									placeholder='Search...'
// 									border={"1px"}
// 									// maxW={450}
// 									as={Input}
// 									id='search'
// 									value={values.search}
// 									name='order'
// 									variant='filled'>
// 									{/* <option disabled value='wybierz'>
// 										------ Meals ------
// 									</option>
// 									{menuItem.map((el) => (
// 										<option key={el.id} value={el.name}>
// 											{el.name}
// 										</option>
// 									))} */}
// 								</Field>
// 								<FormErrorMessage>{errors.search}</FormErrorMessage>
// 							</FormControl>
// 						</VStack>
// 						{/* <Flex py={{ base: 20, md: 15 }} className={style.grid}>
// 							{menuItem.map((el) => {
// 								return (
// 									<ImageCards
// 										key={el.id}
// 										image={el.image}
// 										heading={el.name}
// 										add={handleSubmit}
// 									/>
// 								)
// 							})}
// 						</Flex> */}
// 					</form>
// 				)}
// 			</Formik>
// 		</>
// 	)
// }

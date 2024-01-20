import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthContext } from "../../Contexts/useAuthContext"
// import useCountdownContext from "../../Contexts/useCountdownContext"
import { Formik, Field } from "formik"
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Stack,
	Button,
	Box,
	FormLabel,
	Input,
	Select,
	useColorMode,
	FormControl,
	FormErrorMessage,
} from "@chakra-ui/react"
import { useSelector } from "react-redux"
import styles from "./styles/Reservation.module.css"
import * as yup from "yup"
import { object } from "yup"
import axios from "axios"

interface Reservation {
	people: number
}
interface ReservationDetails {
	orderDate: string
	date: string
	clientId: string | number
	user: string
}
const yupSchema = object({
	date: yup
		.date()
		.default(() => new Date())
		.required("Booking date is required!!!"),
	people: yup.number().required(),
})

const Reservation = () => {
	const { clientId } = useAuthContext()
	const { clientEmail } = useSelector(
		(state: Record<string, never>) => state.emailSlice
	)
	const [datetime, setDatetime] = useState("")
	const { colorMode } = useColorMode()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const firstField = React.useRef()

	// const { setSecondsLeft } = useCountdownContext()

	const pickerTime = (val: React.SetStateAction<string>) => {
		setDatetime(val)
	}
	const addReservation = async (newReservation: ReservationDetails) => {
		await axios.post(`https://test-json-gamma.vercel.app`, newReservation)

		onClose()
	}
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: async (values: ReservationDetails) => {
			return addReservation(values)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reservations", clientId] })
		},
		onError: () => {
			console.log("Error !!!")
		},
	})

	const handleAddReservation = (newReservation: ReservationDetails) => {
		mutation.mutate(newReservation)
	}

	return (
		<>
			<Button
				colorScheme='teal'
				p={5}
				maxW={"200px"}
				onClick={onOpen}
				minW={150}>
				Make the reservation
			</Button>
			<Drawer
				size={"xs"}
				isOpen={isOpen}
				placement='right'
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				initialFocusRef={firstField}
				onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader borderBottomWidth='1px'>
						Select the reservation details
					</DrawerHeader>

					<DrawerBody>
						<Stack spacing='25px'>
							<Formik
								initialValues={{
									date: "",
									people: 0,
								}}
								validationSchema={yupSchema}
								onSubmit={(values) => {
									handleAddReservation({
										...values,
										date: datetime,
										orderDate: new Date().toLocaleDateString(),
										clientId: clientId,
										user: clientEmail,
									})
								}}>
								{({ handleSubmit, errors, values }) => (
									<form onSubmit={handleSubmit}>
										<Box
											className={styles.box}
											borderBottomWidth={"1px"}
											p={"20px 0"}>
											<FormLabel htmlFor='date' className={styles.label}>
												Reservation picker
											</FormLabel>
											<Box>
												<FormControl isInvalid={!!errors.date}>
													<FormLabel htmlFor='date'></FormLabel>
													<Field
														as={Input}
														maxW={120}
														id='date'
														variant='filled'
														min={new Date().toISOString().slice(0, -8)}
														name='date'
														onChange={(e: {
															target: { value: React.SetStateAction<string> }
														}) => pickerTime(e.target.value)}
														type='datetime-local'
														bg={colorMode === "light" ? "gray.400" : "gray.800"}
													/>
													<FormErrorMessage>{errors.date}</FormErrorMessage>
												</FormControl>
											</Box>
										</Box>
										<Box borderBottomWidth={"1px"} p={"20px 0"}>
											<FormLabel htmlFor='date' className={styles.label}>
												{/* Select the number of people */}
											</FormLabel>
											<FormControl isInvalid={!!errors.people}>
												<FormLabel htmlFor='people'></FormLabel>
												<Field
													as={Select}
													id='people'
													type='number'
													variant='filled'
													value={values.people}
													bg={colorMode === "light" ? "gray.400" : "gray.800"}>
													<option value='0'>
														-Select the number of people-
													</option>
													<option value='1'>1</option>
													<option value='2'>2</option>
													<option value='3'>3</option>
													<option value='4'>4</option>
													<option value='5'>5</option>
												</Field>
												<FormErrorMessage>{errors.people}</FormErrorMessage>
											</FormControl>
										</Box>

										<DrawerFooter
											p={"20px 0"}
											justifyContent={"space-between"}
											borderBottomWidth={"1px"}>
											<Button
												variant='outline'
												mr={3}
												onClick={onClose}
												w={100}>
												Cancel
											</Button>
											<Button colorScheme='blue' w={100} type='submit'>
												Confirm
											</Button>
										</DrawerFooter>
									</form>
								)}
							</Formik>
						</Stack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default Reservation

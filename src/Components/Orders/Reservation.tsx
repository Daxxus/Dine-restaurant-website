import React, { useState } from "react"
import useClients from "../Clients/Clients"
// import useCountdown from "./Countdown"
import useCountdownContext from "../../Contexts/useCountdownContext"
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
	const clients = useClients()

	const { clientEmail } = useSelector((state) => state.emailSlice)
	const [datetime, setDatetime] = useState("")
	const { colorMode } = useColorMode()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const firstField = React.useRef()

	const { setSecondsLeft } = useCountdownContext()
	// const { secondsLeft, start } = useCountdown()

	const countdown = () => {
		const currentTime = new Date().getTime()
		const finalTime: any = new Date(datetime)
		let timeDiffrence: any = (finalTime - currentTime) / 1000
		timeDiffrence = parseInt(timeDiffrence)
		// start(timeDiffrence)
		setSecondsLeft(timeDiffrence)

		// ilość osób do rezerwacji do koszyka przekazać
		onClose()
	}

	const pickerTime = (val: React.SetStateAction<string>) => {
		setDatetime(val)
	}
	// const addReservation = (newReservation: Reservation) => {
	// 	console.log(newReservation)
	// 	axios
	// 		.post(` http://localhost:3000/reservations`, newReservation)
	// 		.then((resp) => {
	// 			const { data: reservation } = resp
	// 			return reservation
	// 		})
	// }

	const addReservation = async (newReservation: ReservationDetails) => {
		console.log(newReservation)
		const Url = "http://localhost:3000/reservations"
		const resp = await fetch(Url, {
			method: "POST",
			headers: { "Content-type": "application/json;charset=UTF-8" },
			body: JSON.stringify(newReservation),
		})

		if (!resp.ok) {
			return {}
		}
		const data = await resp.json()
		return data
	}

	return (
		<>
			<Button
				colorScheme='teal'
				p={5}
				// w={  'auto'}
				maxW={ '200px'}
				onClick={onOpen}
				// m={10}
				// display={"flex"}
				minW={150}
				>
				Make the reservation
			</Button>
			<Drawer
				size={"xs"}
				isOpen={isOpen}
				placement='right'
				finalFocusRef={firstField}
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
									people: undefined,
								}}
								validationSchema={yupSchema}
								onSubmit={(values) => {
									addReservation({
										...values,
										date: datetime,
										orderDate: new Date().toLocaleDateString(),
										clientId:
											clients.find(
												(el: { email: string }) => el.email === clientEmail
											)?.id || "",
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
												Pic a date and time
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
											<Button
												colorScheme='blue'
												onClick={() => countdown()}
												w={100}
												type='submit'>
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

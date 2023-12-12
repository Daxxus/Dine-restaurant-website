import React, { useState } from "react"
import useCountdown from "./Countdown"
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
import styles from "./styles/Reservation.module.css"
import * as yup from "yup"
import { object } from "yup"
interface Reservation {
	date: Date | undefined
	people: string
}
const yupSchema = object({
	date: yup.date().required("hmmmmmm!!!!!"),
	people: yup.string(),
})

const Reservation = () => {
	const [datetime, setDatetime] = useState("")
	const { colorMode } = useColorMode()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const firstField = React.useRef()

	const { setSecondsLeft } = useCountdownContext()
	const { secondsLeft, start } = useCountdown()
	console.log("secondsLeft", secondsLeft)

	const countdown = () => {
		const currentTime = new Date().getTime()
		const finalTime = new Date(datetime)
		let timeDiffrence = (finalTime - currentTime) / 1000
		timeDiffrence = parseInt(timeDiffrence)
		start(timeDiffrence)
		setSecondsLeft(timeDiffrence)

		// ilość osób do rezerwacji do koszyka przekazać
		onClose()
	}

	const pickerTime = (val: React.SetStateAction<string>) => {
		setDatetime(val)
	}

	const addReservation = async (newReservation: Reservation) => {
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
		console.log(data)
		return data
	}

	return (
		<>
			<Button colorScheme='teal' onClick={onOpen}m={15} display={ 'flex' } minW={150 }>
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
									date: undefined,
									people: "",
								}}
								validationSchema={yupSchema}
								onSubmit={async (values) => {
									addReservation(values)
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
												Select the number of people
											</FormLabel>
											<FormControl isInvalid={!!errors.people}>
												<FormLabel htmlFor='people'></FormLabel>
												<Field
													as={Select}
													id='people'
													type='text'
													variant='filled'
													value={values.people}
													bg={colorMode === "light" ? "gray.400" : "gray.800"}>
													<option value='1'>1</option>
													<option value='2'>2</option>
													<option value='3'>3</option>
													<option value='4'>4</option>
													<option value='5'>5</option>
												</Field>
												<FormErrorMessage>{errors.people}</FormErrorMessage>
											</FormControl>
										</Box>
									</form>
								)}
							</Formik>
						</Stack>
						<DrawerFooter
							p={"20px 0"}
							justifyContent={"space-between"}
							borderBottomWidth={"1px"}>
							<Button variant='outline' mr={3} onClick={onClose} w={100}>
								Cancel
							</Button>
							<Button colorScheme='blue' onClick={() => countdown()} w={100}>
								Confirm
								{secondsLeft > 0 && `(${secondsLeft})`}
							</Button>
						</DrawerFooter>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default Reservation

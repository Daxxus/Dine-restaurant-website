import React, { useState } from "react"
import useCountdown from "./Countdown"
import useCountdownContext from "../../Contexts/useCountdownContext"

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
} from "@chakra-ui/react"
import styles from "./styles/Reservation.module.css"

const Reservation = () => {
	const [datetime, setDatetime] = useState("")
	const {setSecondsLeft} = useCountdownContext()
	const { secondsLeft, start } = useCountdown()
	console.log("secondsLeft", secondsLeft)

	const { colorMode } = useColorMode()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const firstField = React.useRef()

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

	return (
		<>
			<Button colorScheme='teal' onClick={onOpen} mt={"10px"}>
				Make the reservation
			</Button>
			<Drawer
				size={"sm"}
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
							<Box
								className={styles.box}
								borderBottomWidth={"1px"}
								p={"20px 0"}>
								<FormLabel htmlFor='date' className={styles.label}>
									Pic a date and time
								</FormLabel>
								<Box>
									<Input
										id='startTime'
										onChange={(e) => setDatetime(e.target.value)}
										type='datetime-local'
										bg={colorMode === "light" ? "gray.400" : "gray.800"}
									/>
								</Box>
							</Box>
							<Box borderBottomWidth={"1px"} p={"20px 0"}>
								<FormLabel htmlFor='date' className={styles.label}>
									Select the number of people
								</FormLabel>
								<Select bg={colorMode === "light" ? "gray.400" : "gray.800"}>
									<option value='option1'>1</option>
									<option value='option2'>2</option>
									<option value='option3'>3</option>
									<option value='option4'>4</option>
									<option value='option5'>5</option>
								</Select>
							</Box>
						</Stack>
						<DrawerFooter
							p={"20px 0"}
							justifyContent={"space-between"}
							borderBottomWidth={"1px"}>
							<Button variant='outline' mr={3} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme='blue' onClick={countdown}>
								Confirm
								{/* {secondsLeft > 0 && `(${secondsLeft})`} */}
							</Button>
						</DrawerFooter>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default Reservation

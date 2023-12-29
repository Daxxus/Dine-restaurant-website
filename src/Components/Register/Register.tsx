import { Formik, Field } from "formik"
import { ToastContainer, toast } from "react-toastify"
import { object } from "yup"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { useAvatar } from "../SelectAvatar/Avatar"
import useEmailDataCheck from "../Email/useEmailDataCheck"
import { useDispatch, useSelector } from "react-redux"

import {
	Avatar,
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	VStack,
	useColorMode,
} from "@chakra-ui/react"
import { Select } from "chakra-react-select"

import "react-toastify/dist/ReactToastify.css"
import { useState } from "react"
import BgImg from "../Images/restaurant-1837150_1920.jpg"
import { addId } from "../../Redux/ClientId"

interface Register {
	email: string
	password: string
	confirmPassword: string
	avatar: string
	rememberMe: boolean
	clientId: number
}
// type FormValues = InferType<typeof yupSchema>
const yupSchema = object({
	email: yup
		.string()
		.email("Invalid email format")
		.required("Mail is required"),

	password: yup
		.string()
		.min(6, "min 6")
		.max(20, "max ilość znaków to 10")
		.matches(/[a-z]/, "musi zawierać małe litery")
		.matches(/[A-Z]/, "musi zawierać duże litery")
		.required("To pole jest wymagane"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Hasła muszą być zgodne.")
		.required("To pole jest wymagane"),
	avatar: yup.string().url().nullable().required("Don't forget Your Avatar😊"),
})

const notify = () => toast("Great job, You've just beeing signed up")
const notify2 = () => toast("The email address provided already exists")

export default function FormRegister() {
	const dispatch = useDispatch()
	const { id: clientId } = useSelector((state:Record<string, never>) => state.clientId)

	const { colorMode } = useColorMode()
	const { verifyMailAvilable } = useEmailDataCheck() //array
	const [isError, setIsError] = useState(false)

	const avatars = useAvatar()
	const navigate = useNavigate()

	const addClient = async (newClient: Register) => {
		const Url = "http://localhost:3000/clients"
		const resp = await fetch(Url, {
			method: "POST",
			headers: { "Content-type": "application/json;charset=UTF-8" },
			body: JSON.stringify(newClient),
		})

		if (!resp.ok) {
			return {}
		}
		const data = await resp.json()
		return data
	}

	const jumpToSignInPage = () => {
		navigate(`/login`)
	}

	if (!avatars) <p>No data...</p>
	console.log(clientId)
	return (
		<Flex
			align='center'
			justify={"center"}
			h='container.lg'
			filter='grayscale(50%)'
			bgImg={BgImg}
			bgSize='cover'>
			<ToastContainer autoClose={2000} />
			<Box
				rounded='md'
				w={64}
				p={6}
				width={"auto"}
				maxW={"300px"}
				bg={colorMode === "light" ? "white" : "gray.900"}>
				<Formik
					initialValues={{
						email: "",
						password: "",
						confirmPassword: "",
						avatar: "",
						rememberMe: false,
					}}
					validationSchema={yupSchema}
					onSubmit={async (values, { resetForm }) => {
						const isAvilableMail = await verifyMailAvilable(values.email)
						if (isAvilableMail) {
							// nie zajęty
							setIsError(false)
							notify()
							addClient({
								...values,
								clientId: clientId,
							})
							resetForm()
							setTimeout(() => {
								jumpToSignInPage()
							}, 2000)
						} else {
							setIsError(true)
							notify2()
							resetForm()
						}
					}}>
					{({ handleSubmit, errors, touched, values, setFieldValue }) => (
						<form onSubmit={handleSubmit}>
							<VStack spacing={4} align='flex-start'>
								<FormControl isInvalid={!!errors.email && touched.email}>
									<FormLabel htmlFor='email'></FormLabel>
									<Field
										as={Input}
										id='email'
										name='email'
										type='text' // bo string a nie email
										variant='filled'
										placeholder='Input email adress'
									/>
									<FormErrorMessage>{errors.email}</FormErrorMessage>
									{isError ? "Email occupied" : null}
								</FormControl>
								<FormControl isInvalid={!!errors.password && touched.password}>
									<FormLabel htmlFor='password'></FormLabel>
									<Field
										as={Input}
										id='password'
										name='password'
										type='password'
										variant='filled'
										placeholder='Input Password'
									/>
									<FormErrorMessage>{errors.password}</FormErrorMessage>
								</FormControl>
								<FormControl
									isInvalid={
										!!errors.confirmPassword && touched.confirmPassword
									}>
									<FormLabel htmlFor='confirmPassword'></FormLabel>
									<Field
										as={Input}
										id='confirmPassword'
										name='confirmPassword'
										type='password'
										variant='filled'
										placeholder='Confirm Password...'
									/>
									<FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={!!errors.avatar && touched.avatar}>
									<FormLabel htmlFor='avatar' pl={5}>
										Select Your Avatar
									</FormLabel>
									<Select
										id='avatar'
										name='avatar'
										variant='filled'
										// placeholder='-Select Your Avatar-'
										value={{ pic: values.avatar }}
										options={avatars}
										formatOptionLabel={(avatar: { pic: string }) => (
											<Avatar src={avatar.pic} size={"xl"} />
										)}
										onChange={(e) => {
											setFieldValue("avatar", e.pic)
										}}
									/>
									<FormErrorMessage>{errors.avatar}</FormErrorMessage>
								</FormControl>

								<Field
									as={Checkbox}
									id='rememberMe'
									name='rememberMe'
									colorScheme='blue'>
									Remember me?
								</Field>
								<Button
									type='submit'
									colorScheme='green'
									width='full'
									onClick={() => dispatch(addId(clientId))}>
									Sign Up
								</Button>
							</VStack>
						</form>
					)}
				</Formik>
			</Box>
		</Flex>
	)
}

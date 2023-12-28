import { Formik, Field } from "formik"
import axios from "axios"
import * as yup from "yup"
import { object } from "yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import { Hourglass } from "react-loader-spinner"
import { useAuthContext } from "../../Contexts/useAuthContext"
import useAvatarContext from "../../Contexts/useAvatarContext"
import BgImg from "../Images/brick-wall-1834784_1280.jpg"
import { useDispatch } from "react-redux"

import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	VStack,
	FormErrorMessage,
	useColorMode,
} from "@chakra-ui/react"
import { addEmail } from "../../Redux/ClientsEmail"

interface Login {
	email: string
	password: string
}
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
		.required("Password is required"),
})

const Login = () => {
	const dispatch = useDispatch()
	const { colorMode } = useColorMode()
	const { isAuth, setIsAuth,setClientId } = useAuthContext()
	const { setAvatar } = useAvatarContext() //nie ma potrzeby avatar

	const logged = "Grats!!! successfully signed in"
	const error = "Data errors"
	const notify1 = () => toast(`${logged}`)
	const notify2 = () => toast(`${error}`)

	// const { data: cli, isLoading } = useQuery({
	// 	queryKey: ["clients"],
	// 	queryFn: () =>
	// 		fetch("http://localhost:3000/clients").then((response) =>
	// 			response.json()
	// 		),
	// })
	// console.log(cli)

	const logUser = (client: Login) => {
		axios
			.get(`http://localhost:3000/clients?email=${client.email}`)
			.then((resp) => {
				const { data } = resp

				if (data[0].password === client.password) {
					console.log(data)
					setIsAuth(true)
					setAvatar(data[0].avatar)
					setClientId(data[0].clientId)
					notify1()
				} else {
					notify2()
				}
			})
	}

	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: async (values: Login) => {
			return logUser(values)
		},
		onSuccess: () => {
			queryClient.invalidateQueries()
		},
		onError: () => {
			console.log("Lipa!!!!!")
		},
	})

	const handleLogin = (client: Login) => {
		mutation.mutate(client)
	}

	// if (isLoading)
	// 	<h3>
	// 		<Hourglass />
	// 	</h3>
	// if (!cli) <p>No data...</p>

	return (
		<Flex
			bgImg={BgImg}
			bgPosition={"center"}
			bgSize={"cover"}
			align={"center"}
			justify={"center"}
			h='container.lg'
			filter='grayscale(50%)'>
			<ToastContainer autoClose={3000} />
			<Box bg={colorMode === "light" ? "white" : "black"} p={4} rounded='md'>
				{isAuth ? (
					<section>
						<h1>You are logged in!</h1>
					</section>
				) : (
					<section>
						<Formik
							initialValues={{
								email: "",
								password: "",
							}}
							validationSchema={yupSchema}
							onSubmit={(values: Login, { resetForm }) => {
								resetForm({ values: "" || undefined })
								// logUser(values)
								dispatch(addEmail(values.email))
								handleLogin({
									...values,
								})
							}}>
							{({ handleSubmit, errors, touched }) => (
								<form onSubmit={handleSubmit}>
									<VStack spacing={1} align='flex-start'>
										<FormControl isInvalid={!!errors.email && touched.email}>
											<FormLabel htmlFor='email'></FormLabel>
											<Field
												as={Input}
												id='email'
												name='email'
												type='email'
												variant='filled'
												placeholder='Input the email adress'
											/>
											<FormErrorMessage>{errors.email}</FormErrorMessage>
										</FormControl>
										<FormControl
											isInvalid={!!errors.password && touched.password}>
											<FormLabel htmlFor='password'></FormLabel>
											<Field
												as={Input}
												id='password'
												name='password'
												type='password'
												variant='filled'
												placeholder='Enter the Password'
											/>
											<FormErrorMessage>{errors.password}</FormErrorMessage>
										</FormControl>

										<Button type='submit' mt='5' colorScheme='red' width='full'>
											Sign In
										</Button>
									</VStack>
								</form>
							)}
						</Formik>
					</section>
				)}
			</Box>
		</Flex>
	)
}

export default Login

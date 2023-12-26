import { NavLink } from "react-router-dom"
import { GiCook } from "react-icons/gi"
import { FaShoppingCart } from "react-icons/fa"
import { useQuery } from "@tanstack/react-query"

// import ThemeMode from "../ThemeMode/ThemeMode"
import { useAuthContext } from "../../Contexts/useAuthContext"
import useAvatarContext from "../../Contexts/useAvatarContext"
import useReservations from "../Clients/Reservations"
import useClients from "../Clients/Clients"
import Counting from "../Counting/Counting"
import useOrders from "../Clients/allOrders"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { outOfCart } from "../../Redux/SumUp"
import { removeImageById } from "../../Redux/MealImage"
import "./NavCss/Nav.css"

import {
	Box,
	Flex,
	Avatar,
	HStack,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	useColorMode,
	Image,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { useSelector, useDispatch } from "react-redux"
interface Props {
	children: React.ReactNode
}

// const Links = ["Home", "About Us", "Contact", 'Register', 'Login']
// const links2 = [
// 	{ label: "Home", to: "/" },
// 	{ label: "About Us", to: "/aboutus" },
// 	{ label: "Contact", to: "/contact" },
// 	// { label: "Orders", to: "/buisness/orders" },
// 	{ label: "Add order", to: "/buisness/orders/addOrder" },
// 	{ label: "Login", to: "/login" },
// 	{ label: "Register", to: "/register" },
// 	{ label: <Button />, to: "/basket" },
// ]

const Nav = (props: Props) => {
	const { children } = props
	return (
		<Box
			// as='a'
			px={2}
			py={1}
			rounded={"md"}
			_hover={{
				textDecoration: "none",
				bg: useColorModeValue("gray.200", "gray.700"),
			}}
			// href={"#"}
		>
			{children}
		</Box>
	)
}

export default function WithAction() {
	const totalPrice: number[] = []
	const orders = useOrders()
	const reservation = useReservations()
	// const clients = useClients()
	const { isAuth, setIsAuth } = useAuthContext()
	const { avatar } = useAvatarContext()
	const { clientEmail } = useSelector((state) => state.emailSlice)

	const { value } = useSelector((state) => state.sumUp)
	const orderMealImage = useSelector((state) => state.mealImg)

	const { colorMode, toggleColorMode } = useColorMode()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const navigation = useNavigate()
	const notify = () => toast(`Successfully logged out`)

	// const dispatch = useDispatch() //do deleteMeal
	const deleteMeal = (id: number) => {
		console.log(id)
		// usuwamy z servera a nie by redux!!!!!
		// dispatch(removeImageById(id))
		// dispatch(outOfCart(value))
	}

	const links2 = [
		{ label: "Home", to: "/" },
		{ label: "About Us", to: "/aboutus" },
		// { label: "Contact", to: "/contact" },
		// { label: "Orders", to: "/buisness/orders" },
		{ label: "Add order", to: "/buisness/orders/addOrder" },
		{ label: "Login", to: "/login" },
		{ label: "Register", to: "/register" },
		{
			label: isAuth
				? orders.map((elem) => {
						if (elem.name === clientEmail) {
							totalPrice.push(elem.mealPrice)
							return (
								<Stack direction='row' spacing={4} key={elem.id}>
									<Button
										leftIcon={<FaShoppingCart />}
										fontSize={{ base: "small", lg: "large" }}
										colorScheme='teal'
										variant='outline'>
										${totalPrice.reduce((acc, curr) => acc + curr, 0)}
									</Button>
								</Stack>
							)
						}
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  })
				: null,
			to: "/basket",
			/* {isAuth
								? orders
										.find((elem) => elem.name === clientEmail)
										.map((el) => {
											totalPrice.push(el.mealPrice)
											return (
												<Stack direction='row' spacing={4} key={elem.id}>
													<Button
														leftIcon={<FaShoppingCart />}
														fontSize={25}
														colorScheme='teal'
														variant='outline'>
														${totalPrice.reduce((acc, curr) => acc + curr, 0)}
													</Button>
												</Stack>
											)
										})
								: null} */
		},
		{
			label: (
				<Button
					variant={"solid"}
					colorScheme={"teal"}
					fontSize={{ base: "small", lg: "sm" }}
					onClick={() => {
						if (isAuth) {
							setIsAuth(false)
							notify()
							navigation("/login")
						}
					}}>
					LOGOUT
				</Button>
			),
			to: "/login  ",
		},
		{
			label: (
				<Box
					fontSize={{ base: "small", lg: "md" }}
					// mr={{ base: 5, md: 10, lg: 15 }} p={2}
				>
					{/* {isAuth ? <Counting /> : null} */}

					{isAuth &&
					reservation.find(
						(el: { user: string }) => el.user === clientEmail
					) ? (
						<Counting />
					) : null}
				</Box>
			),
			to: "/login",
		},
		{
			label: (
				<Button
					onClick={toggleColorMode}
					fontSize={{ base: "small", lg: "large" }}>
					{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
				</Button>
			),
			to: null,
		},
	]

	console.log(reservation)
	console.log(clientEmail)

	// const compareEmail = orders.find(
	// 	(elem: { name: string }) => elem.name === clientEmail
	// )
	return (
		<>
			<Box bg={useColorModeValue("gray.100", "gray.900")} px={2}>
				<Flex h={16} alignItems={"bottom"} justifyContent={"space-around"}>
					<HStack
						spacing={{ base: 10, md: 18, lg: 6 }}

						// alignItems={"center"}
					>
						<IconButton
							// size={"md"}
							fontSize={{ base: "small", lg: "lg" }}
							icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
							aria-label={"Open Menu"}
							display={{ md: "none" }}
							onClick={isOpen ? onClose : onOpen}
						/>
						<Box fontSize={{ base: "4xl", sm: "4xl", md: "4xl" }}>
							<GiCook />
						</Box>
						<HStack
							id='sidebar'
							className='bar'
							as={"nav"}
							fontSize={{ base: "small", lg: "lg" }}
							spacing={{ base: 0, md: 1, lg: 2 }}
							display={{ base: "none", md: "flex" }}>
							{links2.map((link, ind) => (
								<Nav key={ind}>
									<NavLink
										to={link.to}
										end
										className={({ isActive, isPending }) =>
											isPending ? "pending" : isActive ? "active" : ""
										}>
										{link.label}
									</NavLink>
								</Nav>
							))}
						</HStack>

						<HStack>
							{/* <ThemeMode /> */}
							<Menu>
								<MenuButton
									// as={Button}
									mr={3}
									rounded={"full"}
									// variant={"link"}
									cursor={"pointer"}
									// minW={0}
								>
									{isAuth ? (
										<Box>
											<Avatar size={"md"} src={avatar} />
										</Box>
									) : (
										<Avatar size={"md"} src={""} />
									)}
								</MenuButton>
								<div>
									<MenuList textAlign={"center"}>
										Orders
										<MenuDivider />
										<MenuItem>
											<Stack direction='column'>
												{orderMealImage.map(
													(el: { orderMealImage: string }) => {
														return el.orderMealImage === "" ? null : (
															<Box key={el.id}>
																<Box className='flex'>
																	<Image
																		borderRadius='full'
																		boxSize='80px'
																		src={el.orderMealImage}
																		alt='Meals'
																	/>

																	<CloseIcon
																		h={8}
																		w={8}
																		type='button'
																		onClick={() => deleteMeal(el.id)}
																		ml={20}
																		color='crimson'
																		// cursor={"pointer"}
																	/>
																</Box>
																<MenuDivider />
															</Box>
														)
													}
												)}
											</Stack>
										</MenuItem>
									</MenuList>
								</div>
							</Menu>
						</HStack>
					</HStack>
				</Flex>
				{isOpen ? (
					<Box
						pb={3}
						display={{ md: "none" }}
						// justifyContent={"flex-end"}
					>
						<Stack as={"nav"}>
							{links2.map((link, ind) => (
								<Nav key={ind}>
									<NavLink
										to={link.to}
										end
										className={({ isActive, isPending }) =>
											isPending ? "pending" : isActive ? "active" : ""
										}>
										{link.label}
									</NavLink>
								</Nav>
							))}
							{/* or */}
							{/* {Links.map((link, ind) => (
								<Nav key={ind}>{link}</Nav>
							))} */}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	)
}

// const Links = [
// 	<NavLink
// 		to='/'
// 		end
// 		className={({ isActive, isPending }) =>
// 			isPending ? "pending" : isActive ? "active" : ""
// 		}>
// 		Home
// 	</NavLink>,
// 	<NavLink
// 		to='/aboutus'
// 		className={({ isActive, isPending }) =>
// 			isPending ? "pending" : isActive ? "active" : ""
// 		}>
// 		About Us
// 	</NavLink>,
// 	<NavLink
// 		to='contact'
// 		className={({ isActive, isPending }) =>
// 			isPending ? "pending" : isActive ? "active" : ""
// 		}>
// 		Contact
// 	</NavLink>,

// 	<NavLink
// 		to='/buisness/orders'
// 		end
// 		className={({ isActive, isPending }) =>
// 			isPending ? "pending" : isActive ? "active" : ""
// 		}>
// 		Orders
// 	</NavLink>,
// 	<NavLink
// 		to='/buisness/orders/addOrder'
// 		end
// 		className={({ isActive, isPending }) =>
// 			isPending ? "pending" : isActive ? "active" : ""
// 		}>
// 		Add order
// 	</NavLink>,
// 	<NavLink
// 		to='/login'
// 		end
// 		className={({ isActive, isPending }) =>
// 			isPending ? "pending" : isActive ? "active" : ""
// 		}>
// 		Login
// 	</NavLink>,
// 	<NavLink
// 		to='/register'
// 		className={({ isActive, isPending }) =>
// 			isPending ? "pending" : isActive ? "active" : ""
// 		}>
// 		Register
// 	</NavLink>,
// ]

{
	/* <Stack direction='row' spacing={4}>								
								<Button
									leftIcon={<FaShoppingCart />}
									// rightIcon={<ArrowForwardIcon />}
									fontSize={25}
									colorScheme='teal'
									variant='outline'>
									${value}
								</Button>
							</Stack> */
}

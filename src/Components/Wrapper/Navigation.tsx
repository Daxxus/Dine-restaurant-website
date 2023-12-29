import { NavLink } from "react-router-dom"
import { GiCook } from "react-icons/gi"
import { FaShoppingCart } from "react-icons/fa"
import { useEffect, useState } from "react"

// import ThemeMode from "../ThemeMode/ThemeMode"
import { useAuthContext } from "../../Contexts/useAuthContext"
import useAvatarContext from "../../Contexts/useAvatarContext"
import useReservations from "../Clients/useReservations"
// import useClients from "../Clients/Clients"
import Counting from "../Counting/Counting"
import useOrders from "../Clients/useOrders"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
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
	VStack,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { useSelector } from "react-redux"
import { Key } from "react"
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
	const { orders, isLoading } = useOrders()
	const { reservations, loading } = useReservations()
	const { isAuth, setIsAuth } = useAuthContext()
	const { avatar } = useAvatarContext()
	const { clientEmail } = useSelector(
		(state: Record<string, never>) => state.emailSlice
	)
	const [totalPrice, setTotalPrice] = useState(0)
	const { colorMode, toggleColorMode } = useColorMode()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const navigation = useNavigate()
	const notify = () => toast(`Successfully logged out`)
	// console.log(orders, reservations)
	useEffect(() => {
		if (orders && reservations) {
			const totalPrice = orders.reduce(
				(acc: number, cur: { mealPrice: number }) => acc + cur.mealPrice,
				0
			)
			setTotalPrice(totalPrice)
		}
	}, [orders, reservations])

	const links2 = [
		{ label: "Home", to: "/" },
		{ label: "About Us", to: "/aboutus" },
		// { label: "Contact", to: "/contact" },
		// { label: "Orders", to: "/buisness/orders" },
		{ label: "Add order", to: "/buisness/orders/addOrder" },
		{ label: "Login", to: "/login" },
		{ label: "Register", to: "/register" },
		{
			label: isAuth ? (
				!isLoading ? (
					<Stack spacing={4}>
						<Button
							leftIcon={<FaShoppingCart />}
							fontSize={{ base: "small", lg: "large" }}
							colorScheme='teal'
							variant='outline'>
							${totalPrice}
						</Button>
					</Stack>
				) : (
					loading
				)
			) : null,
			to: "/basket",
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
			label: isAuth ? (
				!loading ? (
					<Box fontSize={{ base: "small", lg: "md" }}>
						<Counting />
					</Box>
				) : (
					<p>loading...</p>
				)
			) : null,
			to: "/basket  ",
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

	return (
		<>
			<Box bg={useColorModeValue("gray.100", "gray.900")} px={2}>
				<Flex h={16} alignItems={"bottom"} justifyContent={"space-around"}>
					<HStack spacing={{ base: 10, md: 18, lg: 6 }}>
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
										Current orders
										<MenuDivider />
										<MenuItem>
											<VStack width={200}>
												{orders?.map(
													(el: {
														name: string
														image: string | undefined
														id: Key | null | undefined
													}) => {
														if (el.name === clientEmail) {
															return el.image === "" ? null : (
																<Box key={el.id}>
																	<Image
																		borderRadius='full'
																		boxSize='80px'
																		src={el.image}
																		alt='Meals'
																	/>
																	<MenuDivider />
																</Box>
															)
														}
													}
												)}
											</VStack>
										</MenuItem>
									</MenuList>
								</div>
							</Menu>
						</HStack>
					</HStack>
				</Flex>
				{isOpen ? (
					<Box pb={3} display={{ md: "none" }}>
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

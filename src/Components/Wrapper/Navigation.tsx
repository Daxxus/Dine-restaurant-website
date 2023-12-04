import { NavLink } from "react-router-dom"
import { GiCook } from "react-icons/gi"
import { FaShoppingCart } from "react-icons/fa"
// import ThemeMode from "../ThemeMode/ThemeMode"
import { useAuthContext } from "../../Contexts/useAuthContext"
import useAvatarContext from "../../Contexts/useAvatarContext"
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
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"

interface Props {
	children: React.ReactNode
}

// const Links = ["Home", "About Us", "Contact", 'Register', 'Login']
const links2 = [
	{ label: "Home", to: "/" },
	{ label: "About Us", to: "/aboutus" },
	{ label: "Contact", to: "/contact" },
	{ label: "Orders", to: "/buisness/orders" },
	{ label: "Add order", to: "/buisness/orders/addOrder" },
	{ label: "Login", to: "/login" },
	{ label: "Register", to: "/register" },
]

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
	const { isAuth, setIsAuth } = useAuthContext()
	const { avatar } = useAvatarContext()

	const { colorMode, toggleColorMode } = useColorMode()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const navigation = useNavigate()
	const notify = () => toast(`Successfully logged out`)

	return (
		<>
			<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={"center"}>
						<Box fontSize={50}>
							<GiCook />
						</Box>
						<HStack
							id='sidebar'
							className='bar'
							as={"nav"}
							spacing={4}
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
					</HStack>
					<Flex alignItems={"center"} id='sidebar'>
						{/* <ThemeMode /> */}
						<NavLink
							to='/basket'
							end
							className={({ isActive, isPending }) =>
								isPending ? "pending" : isActive ? "active" : ""
							}>
							<h1 className='faIcon'>
								<FaShoppingCart />
							</h1>
						</NavLink>
						<Button
							variant={"solid"}
							colorScheme={"teal"}
							size={"sm"}
							mr={4}
							ml={4}
							onClick={() => {
								if (isAuth) {
									setIsAuth(false)
									notify()
									navigation("/login")
								}
							}}
							// leftIcon={<AddIcon />}
						>
							LOGOUT
						</Button>
						<Menu>
							<MenuButton
								as={Button}
								rounded={"full"}
								variant={"link"}
								cursor={"pointer"}
								minW={0}>
								{isAuth ? (
									<Avatar size={"md"} src={avatar} />
								) : (
									<Avatar size={"md"} src={""} />
								)}
							</MenuButton>
							<MenuList>
								<MenuItem>Link 1</MenuItem>
								<MenuItem>Link 2</MenuItem>
								<MenuDivider />
								<MenuItem>Link 3</MenuItem>
							</MenuList>
						</Menu>
						<Button onClick={toggleColorMode} fontSize={25}>
							{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
						</Button>
					</Flex>
				</Flex>
				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
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
			{/* <Box p={4}>Main Content Here from Navigation</Box> */}
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

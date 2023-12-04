import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"
import { Vortex } from "react-loader-spinner"
import { ChakraProvider } from "@chakra-ui/react"
import {
	QueryClient,
	QueryClientProvider,
	QueryCache,
} from "@tanstack/react-query"
import ProtectWrapper from "./Contexts/ProtectContext"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
const Contact = lazy(() => import("./Components/Contact/Contact"))
const AddOrder = lazy(() => import("./Components/Orders/AddOrder"))
const OrderDetails = lazy(() => import("./Components/Orders/OrderDetails"))
const Orders = lazy(() => import("./Components/Orders/Orders"))
const Error404 = lazy(() => import("./Components/404/Error404"))
// const Menu = lazy(() => import("./Components/Menu/Menu"))
const AboutUs = lazy(() => import("./Components/About Us/AboutUs"))
const Login = lazy(() => import("./Components/Login/Login"))
const Basket = lazy(() => import("./Components/Basket/Basket"))
const FormRegister = lazy(() => import("./Components/Register/Register"))
const Home = lazy(() => import("./Components/Home/Home"))

import ErrorBoundary from "./Components/Wrapper/ErrorBoundary"
import Navig from "./Components/Wrapper/Navigation"
import "./App.css"

const queryClient = new QueryClient({
	queryCache: new QueryCache(),
	defaultOptions: {
		queries: {
			staleTime: 60_000,
		},
	},
})

function App() {
	return (
		<ErrorBoundary>
			<QueryClientProvider client={queryClient}>
				{process.env.NODE_ENV === "development" && (
					<ReactQueryDevtools initialIsOpen={false} position='bottom' />
				)}
				<ChakraProvider>
					<BrowserRouter>
						<Suspense fallback={<Vortex />}>
							<Navig />
							<Routes>
								<Route element={<Home />} path='/' />
								<Route element={<AboutUs />} path='/aboutus' />
								<Route element={<Contact />} path='/contact' />
								<Route path='buisness'>
									{/* <Route index element={<Menu />} /> */}
									<Route path='orders'>
										<Route
											index
											element={
												<ProtectWrapper>
													<Orders />
												</ProtectWrapper>
											}
										/>

										<Route
											element={
												<ProtectWrapper>
													<AddOrder />
												</ProtectWrapper>
											}
											path='addOrder'
										/>

										<Route
											element={
												<ProtectWrapper>
													<OrderDetails />
												</ProtectWrapper>
											}
											path=':id'
										/>
									</Route>
								</Route>

								<Route element={<Login />} path='/login' />
								<Route element={<FormRegister />} path='/register' />
								<Route element={<Basket />} path='/basket' />
								<Route element={<Error404 />} path='*' />
							</Routes>
						</Suspense>
					</BrowserRouter>
				</ChakraProvider>
			</QueryClientProvider>
		</ErrorBoundary>
	)
}

export default App

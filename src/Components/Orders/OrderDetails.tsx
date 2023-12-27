import { useParams } from "react-router-dom"

const OrderDetails = () => {
	const param = useParams()
	console.log(param)
	return <div>OrderDetails</div>
}

export default OrderDetails

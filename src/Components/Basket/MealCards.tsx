import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Avatar, Card, Modal } from "antd"
import { MouseEventHandler } from "react"

interface MealcardProps {
	orderTitle: string
	image: string
	price: number | string
	reservDate: React.ReactNode
	mealNumber: number
	delOrder: MouseEventHandler<HTMLSpanElement> | undefined
	edit: MouseEventHandler<HTMLSpanElement> | undefined
}
const { Meta } = Card
const MealCard = ({
	orderTitle,
	image,
	price,
	reservDate,
	mealNumber,
	delOrder,
	edit,
}: MealcardProps) => (
	<Card
		style={{ width: 300, height: 400 }}
		cover={<img alt='meal' src={image} style={{ height: 250 }} />}
		actions={[
			<div>{mealNumber} </div>,
			<div> {price} </div>,
			<EditOutlined key='edit' type='button' onClick={edit} />,
			// <DeleteOutlined  style={{fontSize:18}} onClick={del} />,

			<DeleteOutlined
				type='button'
				onClick={() => {
					Modal.confirm({
						onOk: delOrder,
						title: "Delete?",
						content: "Please confirm",
						footer: (_, { OkBtn, CancelBtn }) => (
							<>
								<CancelBtn />
								<OkBtn />
							</>
						),
					})
				}}
			/>,
		]}>
		<Meta
			avatar={
				<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />
			}
			title={orderTitle}
			description={reservDate}></Meta>
	</Card>
)

export default MealCard

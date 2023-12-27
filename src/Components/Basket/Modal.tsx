import React, { useState } from "react"
import { Button, Modal, Space } from "antd"

const ModalConfirm: React.FC = () => {
	const [open, setOpen] = useState(false)

	const showModal = () => {
		setOpen(true)
	}
	const handleOk = () => {
		setOpen(false)
	}

	const handleCancel = () => {
		setOpen(false)
	}

	return (
		<>
			<Space>
				<Button type='primary' onClick={showModal}>
					Open Modal
				</Button>
				<Button
					type='primary'
					onClick={() => {
						Modal.confirm({
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
					
					>
					Del
				</Button>
			</Space>
			<Modal
				open={open}
				title='Title'
				onOk={handleOk}
				onCancel={handleCancel}
				footer={(_, { OkBtn, CancelBtn }) => (
					<>
						<Button>Custom Button</Button>
						<CancelBtn />
						<OkBtn />
					</>
				)}>
				<p>Some contents...</p>
			</Modal>
		</>
	)
}

export default ModalConfirm

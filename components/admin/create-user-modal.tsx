"use client";

import { Button, Modal } from "@heroui/react";
import CreateUserForm from "./create-user-form";

export default function CreateUserModal() {
	return (
		<Modal>
			<Button variant="secondary">+ Add User</Button>

			<Modal.Backdrop>
				<Modal.Container placement="center">
					<Modal.Dialog className="sm:max-w-md">
						<Modal.CloseTrigger />

						<Modal.Header>
							<Modal.Heading>Create User</Modal.Heading>
						</Modal.Header>

						<Modal.Body>
							<CreateUserForm />
						</Modal.Body>

						<Modal.Footer>
							<Button slot="close" variant="secondary">
								Cancel
							</Button>

							<Button slot="close">Done</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}

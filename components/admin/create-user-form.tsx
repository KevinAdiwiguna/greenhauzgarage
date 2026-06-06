"use client";

import { useState, useTransition } from "react";
import { Input, Button } from "@heroui/react";
import { createUser } from "@/app/actions/users";

export default function CreateUserForm() {
	const [isPending, startTransition] = useTransition();

	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		startTransition(async () => {
			await createUser(form);
		});
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />

			<Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth />

			<Input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} fullWidth />

			<Button type="submit" isDisabled={isPending}>
				Create
			</Button>
		</form>
	);
}

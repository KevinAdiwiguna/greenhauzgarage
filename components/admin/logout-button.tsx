"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function LogoutButton() {
	const router = useRouter();
	const [isPending, setIsPending] = useState(false);

	const handleLogout = async () => {
		setIsPending(true);
		await authClient.signOut();
		router.push("/login");
	};

	return (
		<Button variant="danger" size="sm" className="w-full font-medium" onPress={handleLogout} isPending={isPending}>
			{({ isPending }) => (
				<>
					{isPending ? <Spinner color="current" size="sm" /> : null}
					{isPending ? "Keluar..." : "Keluar dari Akun"}
				</>
			)}
		</Button>
	);
}

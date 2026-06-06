"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label, Input, Button, Checkbox, Spinner } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

interface LoginFormProps {
	siteName: string;
}

export default function LoginForm({ siteName }: LoginFormProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setErrorMessage("");

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		const { data, error } = await authClient.signIn.email({
			email,
			password,
		});

		if (error) {
			setErrorMessage(error.message || "Kredensial tidak valid. Silakan coba lagi.");
			setIsLoading(false);
		} else {
			router.push("/admin");
		}
	};

	return (
		<div className="flex flex-col w-full">
			<div className="flex flex-col gap-2 mb-8 text-left">
				<h2 className="text-3xl font-bold tracking-tight text-foreground">Selamat Datang</h2>
				<p className="text-sm text-muted">Silakan masukkan kredensial admin {siteName} untuk melanjutkan.</p>
			</div>

			<form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
				<div className="flex flex-col gap-1 w-full">
					<Label htmlFor="email" className="font-medium text-foreground">
						Alamat Email
					</Label>
					<Input id="email" name="email" type="email" placeholder="admin@mail.com" disabled={isLoading} required className="w-full" />
				</div>

				<div className="flex flex-col gap-1 w-full">
					<Label htmlFor="password" className="font-medium text-foreground">
						Kata Sandi
					</Label>
					<Input id="password" name="password" type="password" placeholder="••••••••" disabled={isLoading} required className="w-full" />
				</div>

				<div className="flex items-center justify-between w-full mt-1">
					<Checkbox id="remember" name="remember" value="on" isDisabled={isLoading}>
						<Checkbox.Control>
							<Checkbox.Indicator />
						</Checkbox.Control>
						<Checkbox.Content>
							<Label htmlFor="remember" className="text-sm text-muted cursor-pointer">
								Ingat saya
							</Label>
						</Checkbox.Content>
					</Checkbox>

					<a href="#" className="text-sm text-accent hover:underline font-medium">
						Lupa sandi?
					</a>
				</div>

				{errorMessage && <div className="w-full p-3 mt-2 rounded-md bg-danger-50/10 border border-danger text-danger text-sm font-medium">{errorMessage}</div>}

				<Button type="submit" variant="primary" className="w-full mt-4 font-bold shadow-md" isPending={isLoading}>
					{({ isPending }) => (
						<>
							{isPending ? <Spinner color="current" size="sm" /> : null}
							{isPending ? "Otentikasi..." : "Masuk ke Dashboard"}
						</>
					)}
				</Button>
			</form>
		</div>
	);
}

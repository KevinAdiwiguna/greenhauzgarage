import { Metadata } from "next";
import LoginForm from "@/components/auth/login-form";
import { getSiteSettings } from "@/lib/data/settings";

export async function generateMetadata(): Promise<Metadata> {
	const settings = await getSiteSettings();

	return {
		title: `Login Admin | ${settings.name}`,
		description: `Masuk ke panel kontrol manajemen ${settings.name}.`,
	};
}

export default async function LoginPage() {
	const settings = await getSiteSettings();

	return (
		<main className="min-h-screen w-full flex bg-background">
			<div className="hidden lg:flex w-1/2 bg-surface-secondary flex-col justify-between p-12 border-r border-border relative overflow-hidden">
				<div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-foreground to-transparent pointer-events-none" />

				<div className="relative z-10 flex items-center gap-3">
					<div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground font-bold text-xl">G</div>
					<h1 className="text-2xl font-bold text-foreground tracking-tight">{settings.name}</h1>
				</div>

				<div className="relative z-10 max-w-lg">
					<h2 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">
						Custom Workshop & <br /> Vehicle Service Center.
					</h2>
					<p className="text-lg text-muted">Panel manajemen terintegrasi untuk mengelola inventaris produk, layanan, dan galeri portofolio bengkel secara *real-time*.</p>
				</div>

				<div className="relative z-10">
					<p className="text-sm font-medium text-muted">
						&copy; {new Date().getFullYear()} {settings.name} Mataram. All rights reserved.
					</p>
				</div>
			</div>

			<div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
				<div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-8 duration-700">
					<LoginForm siteName={settings.name} />
				</div>
			</div>
		</main>
	);
}

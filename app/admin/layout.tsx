import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getSiteSettings } from "@/lib/data/settings";
import LogoutButton from "@/components/admin/logout-button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/login");
	}

	const settings = await getSiteSettings();

	const navLinks = [
		{ name: "Dashboard Utama", href: "/admin" },
		{ name: "Users", href: "/admin/users" },
		{ name: "Manajemen Inventaris", href: "/admin/products" },
		{ name: "Galeri Portofolio", href: "/admin/gallery" },
		{ name: "Pengaturan Web", href: "/admin/settings" },
	];

	return (
		<div className="min-h-screen flex bg-background">
			<aside className="w-64 bg-surface border-r border-border flex flex-col z-20">
				<div className="h-16 flex items-center px-6 border-b border-border bg-surface-secondary">
					<span className="font-bold text-lg text-foreground tracking-tight truncate">{settings.name}</span>
				</div>

				<nav className="flex-1 p-4 flex flex-col gap-1.5">
					{navLinks.map((link) => (
						<Link key={link.name} href={link.href} className="px-4 py-2.5 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-surface-secondary transition-colors">
							{link.name}
						</Link>
					))}
				</nav>

				<div className="p-4 border-t border-border bg-surface-secondary/50">
					<div className="flex flex-col gap-0.5 mb-4 px-2">
						<span className="text-sm font-bold text-foreground truncate">{session.user.name}</span>
						<span className="text-xs text-muted truncate">{session.user.email}</span>
					</div>
					<LogoutButton />
				</div>
			</aside>

			<div className="flex-1 flex flex-col min-w-0">
				<header className="h-16 border-b border-border bg-surface flex items-center justify-between px-8 z-10 sticky top-0">
					<h2 className="text-sm font-semibold text-muted uppercase tracking-wider">Panel Kontrol Admin</h2>
				</header>

				<main className="p-8 flex-1 overflow-auto bg-background">
					<div className="max-w-6xl mx-auto">{children}</div>
				</main>
			</div>
		</div>
	);
}

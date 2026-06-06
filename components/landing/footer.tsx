import Link from "next/link";
import type { SiteSetting } from "@/app/generated/prisma/client";

export default function Footer({ settings }: { settings: SiteSetting | null }) {
	const currentYear = new Date().getFullYear();

	const openingHoursLines = settings?.openingHours ? settings.openingHours.split("\n") : ["SENIN - JUMAT: 09:00 - 17:00", "SABTU: 09:00 - 15:00", "MINGGU: TUTUP / RILEKS"];

	return (
		<footer className="light bg-background text-foreground border-t border-border py-16 px-6">
			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
				<div className="md:col-span-4 space-y-4">
					<Link href="/" className="text-xl font-black tracking-wider uppercase text-foreground">
						{settings?.name ? (
							<>
								{settings.name.split(" ").slice(0, -1).join(" ")} <span className="text-accent">{settings.name.split(" ").slice(-1)}</span>
							</>
						) : (
							"GREENHAUZGARAGE"
						)}
					</Link>
					<p className="text-muted text-sm font-medium leading-relaxed">Di mana Rumah & Garasi Bertemu. Bengkel kustom dan restorasi premium terbaik di Mataram, Lombok.</p>
				</div>

				<div className="md:col-span-2 space-y-4">
					<h4 className="text-xs font-black uppercase tracking-widest text-foreground border-b border-border pb-2">JELAJAHI HUB</h4>
					<ul className="space-y-2 text-xs font-bold uppercase tracking-wider">
						{["Home", "Layanan", "Katalog", "Karya Kami", "Tentang Kami", "Kontak"].map((item) => (
							<li key={item}>
								<Link href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-muted hover:text-accent transition-colors">
									{item}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div className="md:col-span-3 space-y-4">
					<h4 className="text-xs font-black uppercase tracking-widest text-foreground border-b border-border pb-2">PINTU TERBUKA</h4>
					<div className="space-y-2 text-xs font-medium text-muted">
						{openingHoursLines.map((line, i) => (
							<p key={i} className="flex justify-between">
								{line}
							</p>
						))}
					</div>
				</div>

				<div className="md:col-span-3 space-y-4">
					<h4 className="text-xs font-black uppercase tracking-widest text-foreground border-b border-border pb-2">KONTAK & JARINGAN</h4>
					<div className="space-y-3 text-xs font-medium">
						<p className="text-muted">
							<span className="font-bold text-foreground block uppercase tracking-wider mb-1">WhatsApp:</span>
							{settings?.phoneNumber || "-"}
						</p>
						<div className="flex gap-2 pt-1">
							{settings?.instagram && (
								<a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 border border-border hover:border-accent flex items-center justify-center transform -skew-x-12">
									IG
								</a>
							)}
							{settings?.facebook && (
								<a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 border border-border hover:border-accent flex items-center justify-center transform -skew-x-12">
									FB
								</a>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-6xl mx-auto border-t border-border mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted gap-4">
				<div>
					© {currentYear} {settings?.name || "GREENHAUZGARAGE"}. ALL RIGHTS RESERVED.
				</div>
				<Link href="/login" className="border border-border hover:border-accent hover:text-accent px-3 py-1.5 transform -skew-x-12">
					ADMIN PANEL
				</Link>
			</div>
		</footer>
	);
}

"use client";

import Link from "next/link";
import { useState } from "react";
import type { SiteSetting } from "@/app/generated/prisma/client";

export default function Navbar({ settings }: { settings: SiteSetting | null }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border text-foreground transition-all duration-300">
			<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
				<Link href="/" className="flex items-center gap-3 group">
					<div className="relative w-12 h-12 rounded-full overflow-hidden border border-border bg-surface flex items-center justify-center shrink-0">{settings?.logoUrl ? <img src={settings.logoUrl} alt="Logo" className="object-cover w-full h-full" /> : <span className="text-[10px] font-black text-accent text-center leading-none">GHG</span>}</div>
					<div className="flex flex-col">
						<span className="text-sm font-black tracking-wider uppercase leading-none group-hover:text-accent transition-colors">{settings?.name || "GREENHAUZGARAGE"}</span>
						<span className="text-[8px] font-bold text-muted uppercase tracking-widest leading-none mt-1">AUTOMOTIVE WORKSHOP</span>
					</div>
				</Link>

				<div className="hidden lg:flex items-center gap-8 text-xs font-black uppercase tracking-widest">
					<Link href="#" className="text-foreground/80 hover:text-accent transition-colors">
						Home
					</Link>
					<Link href="#services" className="text-foreground/80 hover:text-accent transition-colors">
						Layanan
					</Link>
					<Link href="#catalog" className="text-foreground/80 hover:text-accent transition-colors">
						Katalog
					</Link>
					<Link href="#gallery" className="text-foreground/80 hover:text-accent transition-colors">
						Karya Kami
					</Link>
					<Link href="#about" className="text-foreground/80 hover:text-accent transition-colors">
						Tentang Kami
					</Link>
					<Link href="#contact" className="text-foreground/80 hover:text-accent transition-colors">
						Kontak
					</Link>
				</div>

				<div className="hidden lg:flex">
					<Link href={`https://wa.me/${settings?.phoneNumber?.replace(/\D/g, "") || ""}`} scroll={false} className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all font-black tracking-widest px-5 py-2.5 text-xs uppercase border border-accent transform -skew-x-12 active:scale-95 duration-100">
						BOOKING KONSULTASI
					</Link>
				</div>

				<button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-foreground hover:text-accent focus:outline-none" aria-label="Toggle Menu">
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
					</svg>
				</button>
			</div>

			{isOpen && (
				<div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md px-6 py-6 space-y-4 text-sm font-black uppercase tracking-widest text-left">
					<Link href="#" onClick={() => setIsOpen(false)} className="block py-2 text-foreground/80 hover:text-accent border-b border-border/40">
						Home
					</Link>
					<Link href="#services" onClick={() => setIsOpen(false)} className="block py-2 text-foreground/80 hover:text-accent border-b border-border/40">
						Layanan
					</Link>
					<Link href="#catalog" onClick={() => setIsOpen(false)} className="block py-2 text-foreground/80 hover:text-accent border-b border-border/40">
						Katalog
					</Link>
					<Link href="#gallery" onClick={() => setIsOpen(false)} className="block py-2 text-foreground/80 hover:text-accent border-b border-border/40">
						Karya Kami
					</Link>
					<Link href="#about" onClick={() => setIsOpen(false)} className="block py-2 text-foreground/80 hover:text-accent border-b border-border/40">
						Tentang Kami
					</Link>
					<Link href="#contact" onClick={() => setIsOpen(false)} className="block py-2 text-foreground/80 hover:text-accent border-b border-border/40">
						Kontak
					</Link>
					<div className="pt-4">
						<Link href={`https://wa.me/${settings?.phoneNumber?.replace(/\D/g, "") || ""}`} scroll={false} onClick={() => setIsOpen(false)} className="block text-center bg-accent text-accent-foreground hover:bg-accent/90 transition-all font-black tracking-widest py-3 text-xs uppercase border border-accent transform -skew-x-12">
							BOOKING KONSULTASI
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
}

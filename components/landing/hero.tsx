import Link from "next/link";

import type { SiteSetting } from "@/app/generated/prisma/client";
export default function Hero({ settings }: { settings?: SiteSetting | null }) {
	const siteName = settings?.name || "GREENHAUZ GARAGE";
	const nameArray = siteName.split(" ");
	const firstWord = nameArray[0];
	const restWords = nameArray.slice(1).join(" ");
	return (
		<section className="relative min-h-[90vh] flex items-center justify-center bg-black text-white overflow-hidden py-24">
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity filter blur-[2px]"
				style={{
					backgroundImage: `url('https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1920')`,
				}}
			/>

			<div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/50" />

			<div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

			<div className="relative max-w-6xl mx-auto px-6 w-full space-y-10 text-center md:text-left z-10">
				<div className="inline-flex items-center gap-2 px-4 py-1.5 border border-accent/30 bg-accent/5 text-accent font-black text-xs uppercase tracking-widest transform -skew-x-12 mx-auto md:mx-0">
					<svg className="w-4 h-4 text-accent animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
					</svg>
					BENGKEL KUSTOM NO. 1 DI MATARAM
				</div>

				<div className="space-y-4">
					<h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
						{firstWord}
						<span className="text-emerald-500 block lg:inline">{restWords}</span>
					</h1>
					<h2 className="text-xl md:text-3xl font-black tracking-wide text-foreground uppercase">Di mana Rumah & Garasi Bertemu.</h2>
					<p className="text-muted text-base md:text-lg max-w-3xl leading-relaxed font-medium">Kami menghadirkan standar baru restorasi, pengecatan, kustomisasi bodi, dan penyetelan performa mesin di Lombok. Dikerjakan dengan keahlian presisi tinggi, material premium, dan suasana bengkel yang bersahabat untuk mendiskusikan visi kendaraan impian Anda.</p>
				</div>

				<div className="flex flex-wrap justify-center md:justify-start gap-4">
					<Link href="#services" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all font-black tracking-widest px-8 py-4 text-sm uppercase border border-accent transform -skew-x-12 active:scale-95 duration-100">
						LIHAT LAYANAN KAMI
					</Link>
					<Link href="#catalog" className="bg-transparent text-white hover:bg-white/5 transition-all font-black tracking-widest px-8 py-4 text-sm uppercase border border-border hover:border-white transform -skew-x-12 active:scale-95 duration-100">
						KATALOG JUAL-BELI
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-border/40 max-w-4xl">
					<div className="flex items-center justify-center md:justify-start gap-3">
						<div className="w-10 h-10 rounded bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
							</svg>
						</div>
						<span className="font-black tracking-wider text-sm uppercase">Garansi Cat</span>
					</div>
					<div className="flex items-center justify-center md:justify-start gap-3">
						<div className="w-10 h-10 rounded bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
						</div>
						<span className="font-black tracking-wider text-sm uppercase">Tim Ahli</span>
					</div>
					<div className="flex items-center justify-center md:justify-start gap-3">
						<div className="w-10 h-10 rounded bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</div>
						<span className="font-black tracking-wider text-sm uppercase">Mataram, Lombok</span>
					</div>
				</div>
			</div>
		</section>
	);
}

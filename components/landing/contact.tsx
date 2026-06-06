"use client";

import type { SiteSetting } from "@/app/generated/prisma/client";

export default function Contact({ settings }: { settings: SiteSetting | null }) {
	return (
		<section id="contact" className="py-24 bg-background text-foreground px-6 border-b border-border">
			<div className="max-w-6xl mx-auto space-y-16">
				
				<div className="text-center space-y-4">
					<span className="text-xs font-black uppercase tracking-widest text-accent border-b-2 border-accent pb-2 inline-block">
						HUBUNGI GARASI
					</span>
					<h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
						Mari Bertemu & <span className="text-accent">Berkolaborasi</span>
					</h2>
					<p className="text-muted max-w-2xl mx-auto font-medium">
						Diskusikan restorasi bodi, cat velg, kustom motor, atau tanyakan unit mobil/motor retro pilihan Anda secara detail.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
					
					<div className="lg:col-span-6 space-y-8">
						
						<div className="grid grid-cols-2 gap-4">
							
							<a
								href={`https://wa.me/${(settings?.phoneNumber || "+6281234567890").replace(/[^0-9]/g, "")}`}
								target="_blank"
								rel="noopener noreferrer"
								className="bg-surface border border-border hover:border-accent/40 p-5 space-y-3 transition-colors block transform -skew-x-3"
							>
								<div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center text-accent">
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1.3 1.3 0 01-.321.988l-1.305 1.305a12.934 12.934 0 005.306 5.306l1.305-1.305a1.3 1.3 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
									</svg>
								</div>
								<div>
									<h4 className="text-sm font-black uppercase tracking-wider text-foreground">WHATSAPP CHAT</h4>
									<p className="text-muted text-[10px] font-bold uppercase tracking-wider mt-1">FAST RESPONSE</p>
								</div>
							</a>

							
							<a
								href="https://facebook.com/marketplace"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-surface border border-border hover:border-accent/40 p-5 space-y-3 transition-colors block transform skew-x-3"
							>
								<div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center text-accent">
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
									</svg>
								</div>
								<div>
									<h4 className="text-sm font-black uppercase tracking-wider text-foreground">MARKETPLACE</h4>
									<p className="text-muted text-[10px] font-bold uppercase tracking-wider mt-1">CEK UNIT READY</p>
								</div>
							</a>
						</div>

						
						<div className="bg-surface border border-border p-6 space-y-4">
							<span className="text-[10px] uppercase font-bold tracking-widest text-muted block">
								GARAGE COORDINATES
							</span>
							<div className="relative border border-border overflow-hidden h-64 bg-background">
								{settings?.mapsIframe ? (
									<div
										className="w-full h-full grayscale invert opacity-60 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-500 [&_iframe]:w-full [&_iframe]:h-full"
										dangerouslySetInnerHTML={{ __html: settings.mapsIframe }}
									/>
								) : (
									<div className="w-full h-full flex items-center justify-center">
										<p className="text-muted uppercase text-xs font-bold tracking-widest">MAPS PREVIEW</p>
									</div>
								)}
							</div>
							<div className="space-y-1 pt-2">
								<span className="text-[10px] uppercase font-bold tracking-widest text-muted">ALAMAT LENGKAP</span>
								<p className="text-xs font-bold uppercase tracking-wider text-foreground">
									Jl. Greenhauz Garage No. 1, Kel. Pagutan, Kec. Mataram, Kota Mataram, Lombok, Nusa Tenggara Barat.
								</p>
							</div>
						</div>
					</div>

					
					<div className="lg:col-span-6">
						<div className="bg-surface border border-border p-8 space-y-6">
							<h3 className="text-xl font-black uppercase tracking-wider text-foreground">
								Kirim Pesan <span className="text-accent">Langsung</span>
							</h3>

							<form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Pesan berhasil terkirim!"); }}>
								<div className="space-y-1">
									<label className="text-[10px] uppercase font-bold tracking-widest text-muted block">Nama Lengkap</label>
									<input
										type="text"
										required
										placeholder="Masukkan nama Anda"
										className="w-full bg-field-background text-field-foreground border border-border p-3 focus:border-accent focus:outline-none placeholder:text-field-placeholder text-sm transition-colors"
									/>
								</div>

								<div className="space-y-1">
									<label className="text-[10px] uppercase font-bold tracking-widest text-muted block">Alamat Email</label>
									<input
										type="email"
										required
										placeholder="nama@email.com"
										className="w-full bg-field-background text-field-foreground border border-border p-3 focus:border-accent focus:outline-none placeholder:text-field-placeholder text-sm transition-colors"
									/>
								</div>

								<div className="space-y-1">
									<label className="text-[10px] uppercase font-bold tracking-widest text-muted block">Subjek Pertanyaan</label>
									<input
										type="text"
										required
										placeholder="e.g. Estimasi Repaint / Custom Motor"
										className="w-full bg-field-background text-field-foreground border border-border p-3 focus:border-accent focus:outline-none placeholder:text-field-placeholder text-sm transition-colors"
									/>
								</div>

								<div className="space-y-1">
									<label className="text-[10px] uppercase font-bold tracking-widest text-muted block">Isi Pesan</label>
									<textarea
										rows={4}
										required
										placeholder="Tuliskan detail pertanyaan Anda di sini..."
										className="w-full bg-field-background text-field-foreground border border-border p-3 focus:border-accent focus:outline-none placeholder:text-field-placeholder text-sm transition-colors resize-none"
									/>
								</div>

								<button
									type="submit"
									className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all font-black tracking-widest py-4 uppercase border border-accent text-sm mt-2 transform -skew-x-12 cursor-pointer active:scale-95 duration-100"
								>
									KIRIM PESAN
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

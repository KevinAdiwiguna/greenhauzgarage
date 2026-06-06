import type { Gallery } from "@/app/generated/prisma/client";

export default function InstaFeed({ gallery }: { gallery: Gallery[] }) {
	return (
		<section id="gallery" className="py-24 px-6 bg-surface border-b border-border">
			<div className="max-w-6xl mx-auto space-y-16">

				
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/80 pb-8">
					<div className="space-y-4">
						<div className="flex items-center gap-2 text-accent">
							
							<svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={2} />
								<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth={2} />
								<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={2.5} strokeLinecap="round" />
							</svg>
							<span className="text-xs font-black uppercase tracking-widest border-b-2 border-accent pb-1 inline-block">
								KARYA TERBARU KAMI
							</span>
						</div>
						<h2 className="text-4xl font-black uppercase tracking-tight text-foreground">
							PORTFOLIO & <span className="text-accent">GALERI BENGKEL</span>
						</h2>
						<p className="text-muted max-w-xl font-medium">
							Saksikan dokumentasi harian proses pengerjaan unit kustom dan restorasi bodi langsung dari Instagram feed kami.
						</p>
					</div>

					
					<div className="flex items-center gap-4 bg-background p-4 border border-border rounded-none shrink-0 transform -skew-x-12">
						<div className="flex flex-col">
							<span className="text-[10px] uppercase font-bold tracking-widest text-muted">Instagram</span>
							<span className="text-sm font-black text-foreground">@greenhauzgarage</span>
						</div>
						<a
							href="https://instagram.com/greenhauzgarage"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-[#0095f6] hover:bg-[#1877f2] text-white text-xs font-bold px-4 py-2 rounded-full transition-colors transform skew-x-12"
						>
							Ikuti / Follow
						</a>
					</div>
				</div>

				{gallery.length === 0 ? (
					<div className="text-center py-12 border border-dashed border-border bg-background">
						<p className="text-muted font-bold uppercase tracking-widest text-sm">Belum ada karya galeri diunggah saat ini.</p>
					</div>
				) : (
					/* 3x2 Grid layout (6 images) */
					<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
						{gallery.slice(0, 6).map((img) => (
							<div
								key={img.id}
								className="group relative aspect-square bg-background border border-border overflow-hidden cursor-pointer"
							>
								
								<img
									src={img.imageUrl}
									alt={img.altText || "Gallery image"}
									className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
								/>

								
								<span className="absolute top-3 right-3 bg-accent text-accent-foreground text-[8px] font-black uppercase tracking-widest px-2 py-1 transform -skew-x-12 z-10">
									KLIP REEL
								</span>

								
								<div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
									<div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
										<p className="text-xs font-black uppercase tracking-widest text-accent">
											{img.altText || "LIHAT PROJECT"}
										</p>
										<div className="w-8 h-[2px] bg-accent mx-auto" />
										<span className="text-[10px] text-foreground/85 font-bold uppercase tracking-widest block">
											KLIK UNTUK DETAIL
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}

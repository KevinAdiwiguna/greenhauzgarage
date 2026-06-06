import type { Metadata } from "next";
import Image from "next/image";

export default function About() {
	return (
		<section id="about" className="light bg-background text-foreground py-24 px-6 border-b border-border">
			<div className="max-w-6xl mx-auto space-y-20">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
					<div className="lg:col-span-5 space-y-3">
						<div className="relative border border-border overflow-hidden bg-surface shadow-md">
							<Image width={1000} height={2000} src="/image.png" alt="Tim Greenhauzgarage bekerja" className="w-full h-full object-cover bg-center grayscale hover:grayscale-0 transition-all duration-500" />
						</div>
						<p className="text-[10px] uppercase font-bold tracking-widest text-muted text-center lg:text-left">🛠️ PROSES DESIGN & CURATING WORKSHOP KAMI</p>
					</div>

					<div className="lg:col-span-7 space-y-6">
						<span className="text-xs font-black uppercase tracking-widest text-accent border-b-2 border-accent pb-2 inline-block">KISAH & FILOSOFI KAMI</span>
						<h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground">
							Lebih dari Sekadar <span className="text-accent">Bengkel</span>.
						</h2>
						<p className="text-muted leading-relaxed font-medium">Greenhauzgarage didirikan atas dasar hasrat murni terhadap seni kustomisasi dan kesempurnaan mekanis kendaraan. Kami memadukan atmosfer garasi yang santai dan bersahabat dengan profesionalisme bengkel kustom modern.</p>
						<p className="text-muted leading-relaxed font-medium">Bagi kami, setiap kendaraan adalah kanvas kosong yang layak mendapatkan detail terbaik. Kami berkomitmen untuk merawat dan memodifikasi setiap unit layaknya kendaraan kami sendiri—menjunjung tinggi nilai kejujuran, kualitas pengerjaan, dan kesenangan saat berkendara.</p>

						<div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
							<div className="text-left space-y-1">
								<h3 className="text-3xl font-black text-accent tracking-tighter">350+</h3>
								<p className="text-[9px] font-black uppercase tracking-widest text-muted">VELG TER-REPAINT</p>
							</div>
							<div className="text-left space-y-1">
								<h3 className="text-3xl font-black text-foreground tracking-tighter">80+</h3>
								<p className="text-[9px] font-black uppercase tracking-widest text-muted">MOTOR KUSTOM</p>
							</div>
							<div className="text-left space-y-1">
								<h3 className="text-3xl font-black text-accent tracking-tighter">100%</h3>
								<p className="text-[9px] font-black uppercase tracking-widest text-muted">KEPUASAN CLIENT</p>
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border/80">
					<div className="bg-surface border border-border p-8 space-y-4 hover:shadow-md transition-shadow">
						<div className="w-12 h-12 rounded bg-accent/10 flex items-center justify-center text-accent">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
							</svg>
						</div>
						<h4 className="text-lg font-black uppercase tracking-wider text-foreground">Sentuhan Homey</h4>
						<p className="text-muted text-xs font-medium leading-relaxed">Atmosfer bengkel yang bersih, nyaman, dan ramah seperti rumah sendiri. Anda selalu dipersilakan berdiskusi langsung dengan tim kami sambil menikmati kopi hangat.</p>
					</div>

					<div className="bg-surface border border-border p-8 space-y-4 hover:shadow-md transition-shadow">
						<div className="w-12 h-12 rounded bg-accent/10 flex items-center justify-center text-accent">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
							</svg>
						</div>
						<h4 className="text-lg font-black uppercase tracking-wider text-foreground">Keahlian Presisi</h4>
						<p className="text-muted text-xs font-medium leading-relaxed">Setiap proses penyetelan, kelistrikan, pengelasan rangka, hingga penyemprotan lapisan cat dikerjakan secara teliti dengan standar akurasi milimeter.</p>
					</div>

					<div className="bg-surface border border-border p-8 space-y-4 hover:shadow-md transition-shadow">
						<div className="w-12 h-12 rounded bg-accent/10 flex items-center justify-center text-accent">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
							</svg>
						</div>
						<h4 className="text-lg font-black uppercase tracking-wider text-foreground">Transparansi Penuh</h4>
						<p className="text-muted text-xs font-medium leading-relaxed">Tidak ada biaya tersembunyi. Kami mendokumentasikan setiap kemajuan pekerjaan dan memberi tahu Anda setiap detail suku cadang serta alur estimasi biaya pengerjaan.</p>
					</div>
				</div>
			</div>
		</section>
	);
}

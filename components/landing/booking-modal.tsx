"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function BookingModal() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const isOpen = searchParams.get("booking") === "true";
	const initialService = searchParams.get("service") || "";

	const [service, setService] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [date, setDate] = useState("");

	useEffect(() => {
		if (isOpen) {
			setService(initialService);
		}
	}, [isOpen, initialService]);

	if (!isOpen) return null;

	const handleClose = () => {
		// Reset state
		setName("");
		setPhone("");
		setDate("");
		setService("");
		// Remove query parameters
		router.push("/", { scroll: false });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Show success alert
		alert(`Booking Konsultasi Berhasil!\nNama: ${name}\nNomor WA: ${phone}\nLayanan: ${service || "Umum"}\nTanggal: ${date}`);
		handleClose();
	};

	return (
		<div className="fixed inset-0 bg-background/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
			<div className="bg-surface border border-border p-8 w-full max-w-md relative overflow-hidden">
				
				<div className="absolute top-0 left-0 w-full h-[4px] bg-accent" />

				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-black uppercase tracking-wider text-foreground">
						BOOKING <span className="text-accent">KONSULTASI</span>
					</h2>
					<button
						onClick={handleClose}
						className="text-muted hover:text-danger transition-colors font-black tracking-widest text-xs uppercase cursor-pointer"
					>
						CLOSE
					</button>
				</div>

				<form className="space-y-5" onSubmit={handleSubmit}>
					
					<div className="space-y-1">
						<label className="text-[10px] uppercase font-bold tracking-widest text-muted block">NAMA LENGKAP</label>
						<input
							type="text"
							placeholder="Masukkan nama lengkap Anda"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="w-full bg-field-background text-field-foreground border border-border p-3 focus:border-accent focus:outline-none placeholder:text-field-placeholder text-sm transition-colors"
						/>
					</div>

					
					<div className="space-y-1">
						<label className="text-[10px] uppercase font-bold tracking-widest text-muted block">NOMOR WHATSAPP</label>
						<input
							type="tel"
							placeholder="Contoh: +62 812-3456-7890"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							required
							className="w-full bg-field-background text-field-foreground border border-border p-3 focus:border-accent focus:outline-none placeholder:text-field-placeholder text-sm transition-colors"
						/>
					</div>

					
					<div className="space-y-1">
						<label className="text-[10px] uppercase font-bold tracking-widest text-muted block">PILIH LAYANAN</label>
						<select
							value={service}
							onChange={(e) => setService(e.target.value)}
							required
							className="w-full bg-field-background text-field-foreground border border-border p-3 focus:border-accent focus:outline-none text-sm transition-colors cursor-pointer"
						>
							<option value="" disabled>Pilih layanan kustom...</option>
							<option value="Cat / Repaint Velg">Cat / Repaint Velg</option>
							<option value="Kustomisasi Motor">Kustomisasi Motor</option>
							<option value="Restorasi Mobil Retro">Restorasi Mobil Retro</option>
							<option value="Servis Berkala / Tune-up">Servis Berkala / Tune-up</option>
							<option value="Detailing / Polish">Detailing / Polish</option>
							<option value="Lainnya">Lainnya</option>
						</select>
					</div>

					
					<div className="space-y-1">
						<label className="text-[10px] uppercase font-bold tracking-widest text-muted block">TANGGAL APPOINTMENT</label>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							required
							className="w-full bg-field-background text-field-foreground border border-border p-3 focus:border-accent focus:outline-none text-sm transition-colors"
						/>
					</div>

					
					<button
						type="submit"
						className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all font-black tracking-widest py-3 uppercase border border-accent text-sm mt-4 transform -skew-x-12 active:scale-95 duration-100 cursor-pointer"
					>
						SUBMIT BOOKING
					</button>
				</form>
			</div>
		</div>
	);
}

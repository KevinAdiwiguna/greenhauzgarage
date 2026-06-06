"use client";

import { useState } from "react";
import { Button, Input, TextArea, Label, Spinner } from "@heroui/react";
import { updateSettings } from "@/app/actions/settings";
import ImageUpload from "./image-upload";

type SettingsProps = {
	initialSettings: {
		name: string;
		logoUrl: string | null;
		phoneNumber: string | null;
		email: string | null;
		mapsIframe: string | null;
		instagram: string | null;
		facebook: string | null;
		openingHours: string | null;
	};
};

export default function SettingsForm({ initialSettings }: SettingsProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [logoUrl, setLogoUrl] = useState(initialSettings.logoUrl || "");
	const [uploading, setUploading] = useState(false);

	// UPLOAD LOGO KE R2
	const handleUpload = async (file: File) => {
		setUploading(true);

		const formData = new FormData();
		formData.append("file", file);

		const res = await fetch("/api/upload", {
			method: "POST",
			body: formData,
		});

		const data = await res.json();

		setUploading(false);

		if (data?.url) {
			setLogoUrl(data.url);
		} else {
			alert("Upload gagal");
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		const formData = new FormData(e.currentTarget);

		try {
			const result = await updateSettings({
				name: formData.get("name") as string,
				phoneNumber: formData.get("phoneNumber") as string,
				email: formData.get("email") as string,
				mapsIframe: formData.get("mapsIframe") as string,
				instagram: formData.get("instagram") as string,
				facebook: formData.get("facebook") as string,
				openingHours: formData.get("openingHours") as string,
				logoUrl,
			});

			if (!result.success) throw new Error(result.error);

			alert("Settings berhasil diperbarui");
		} catch (err: unknown) {
			alert((err as Error).message || "Terjadi kesalahan");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-3xl flex flex-col gap-6 bg-surface border border-border p-6 rounded-xl">
			{/* LOGO UPLOAD */}
			<div className="flex flex-col gap-2">
				<Label>Logo Website</Label>

				{logoUrl && <img src={logoUrl} alt="logo" className="h-20 w-auto object-contain" />}

				<input
					type="file"
					accept="image/*"
					onChange={(e) => {
						const file = e.target.files?.[0];
						if (file) handleUpload(file);
					}}
				/>

				{uploading && <p className="text-xs text-muted">Uploading...</p>}
			</div>

			<div className="flex flex-col gap-2">
				<label className="text-sm font-medium">Logo Website</label>

				<ImageUpload value={logoUrl} onChange={setLogoUrl} label="Upload Logo" />
			</div>
			{/* NAME */}
			<div className="flex flex-col gap-2">
				<Label>Nama Website</Label>
				<Input name="name" defaultValue={initialSettings.name} variant="secondary" placeholder="Greenhauzgarage" />
			</div>

			{/* PHONE + EMAIL */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="flex flex-col gap-2">
					<Label>Phone</Label>
					<Input name="phoneNumber" defaultValue={initialSettings.phoneNumber || ""} variant="secondary" />
				</div>

				<div className="flex flex-col gap-2">
					<Label>Email</Label>
					<Input name="email" type="email" defaultValue={initialSettings.email || ""} variant="secondary" />
				</div>
			</div>

			{/* SOCIAL */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="flex flex-col gap-2">
					<Label>Instagram</Label>
					<Input name="instagram" defaultValue={initialSettings.instagram || ""} variant="secondary" />
				</div>

				<div className="flex flex-col gap-2">
					<Label>Facebook</Label>
					<Input name="facebook" defaultValue={initialSettings.facebook || ""} variant="secondary" />
				</div>
			</div>

			{/* OPENING HOURS */}
			<div className="flex flex-col gap-2">
				<Label>Opening Hours</Label>
				<TextArea name="openingHours" defaultValue={initialSettings.openingHours || ""} variant="secondary" rows={3} />
			</div>

			{/* MAPS */}
			<div className="flex flex-col gap-2">
				<Label>Google Maps Embed</Label>
				<TextArea name="mapsIframe" defaultValue={initialSettings.mapsIframe || ""} variant="secondary" rows={4} />
			</div>

			{/* SUBMIT */}
			<div className="flex justify-end">
				<Button type="submit" isDisabled={isSubmitting}>
					{isSubmitting ? (
						<>
							<Spinner size="sm" />
							Saving...
						</>
					) : (
						"Save Settings"
					)}
				</Button>
			</div>
		</form>
	);
}

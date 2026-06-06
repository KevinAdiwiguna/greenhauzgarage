"use client";

import { useState } from "react";
import { Button, Spinner } from "@heroui/react";

type Props = {
	value: string;
	onChange: (url: string) => void;
	label?: string;
};

export default function ImageUpload({ value, onChange, label }: Props) {
	const [uploading, setUploading] = useState(false);

	const handleUpload = async (file: File) => {
		setUploading(true);

		try {
			const formData = new FormData();
			formData.append("file", file);

			const res = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			const data = await res.json();

			if (!data?.url) {
				throw new Error("Upload gagal");
			}

			onChange(data.url);
		} catch (err) {
			alert("Upload error");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="flex flex-col gap-2">
			{label && <p className="text-sm font-medium">{label}</p>}

			{/* Preview */}
			{value && (
				<div className="relative w-fit">
					<img src={value} alt="upload" className="h-24 w-auto rounded-md border object-cover" />
				</div>
			)}

			{/* Input */}
			<input
				type="file"
				accept="image/*"
				onChange={(e) => {
					const file = e.target.files?.[0];
					if (file) handleUpload(file);
				}}
			/>

			{/* Status */}
			{uploading && (
				<div className="flex items-center gap-2 text-xs text-muted">
					<Spinner size="sm" />
					Uploading...
				</div>
			)}
		</div>
	);
}

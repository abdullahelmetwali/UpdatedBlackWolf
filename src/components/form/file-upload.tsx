import { useState, useRef, useEffect, type FormEvent, type DragEvent } from "react";
import { FileUploadTypo } from "@/types"

import { cn } from "@/lib/cn"
import { CloudUpload, FileArchiveIcon, X } from "lucide-react";

export function FileUpload({
    onChange,
    label,
    className = "",
    type = "image",
    value,
    name = "image",
    icon: Icon,
    errors,
    errorMessage,
    props
}: FileUploadTypo) {
    const [file, setFile] = useState<File | null | string>(value)
    const [uploadError, setUploadError] = useState<string | null>(errorMessage || null)

    const inputRef = useRef<HTMLInputElement>(null)
    const maxSize = 5 // 5MB
    const hasError = errors?.[type]?.message || errors?.[name]?.message;

    useEffect(() => {
        setFile(value || null);
        if (hasError) {
            setUploadError(hasError)
        }
    }, [value, hasError])

    const onFileSelect = (selectedFiles: FileList) => {
        setUploadError(null)
        const selected = selectedFiles[0]
        if (!selected) return

        if (selected.size > maxSize * 1024 * 1024) {
            setUploadError(`File size exceeds ${maxSize}MB limit`)
            return
        }

        setFile(selected)
        onChange?.(selected)
    }

    const onChangeFn = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        if (target.files?.[0]) {
            onFileSelect(target.files)
        }
    }

    const dropFile = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files?.[0]
        if (droppedFile) {
            onFileSelect(e.dataTransfer.files)
        }
    }

    const removeFile = () => {
        setFile(null)
        onChange?.(null)
    }

    return (
        <div className={cn("space-y-2 relative", className)}>
            <input
                type="file"
                ref={inputRef}
                accept={`${type}/*`}
                onChange={onChangeFn}
                className="hidden"
                {...props}
            />

            {file ? (
                <div
                    className="w-full h-full min-h-32 border-2 border-dashed flex flex-col items-center justify-center rounded-lg cursor-pointer transition-colors relative z-10"
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
                    onDrop={dropFile}
                    aria-invalid={!!uploadError}
                    {...props}
                >
                    {file instanceof File ? (
                        file.type.includes('image') ?
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                className="object-cover size-9"
                            />
                            :
                            <span className="!size-6">
                                <FileArchiveIcon size={24} className="!size-6" />
                            </span>
                    ) : (
                        (type === "image" && typeof value === "string")
                            ?
                            <img
                                src={file as string}
                                alt="Preview"
                                className="object-cover size-9"
                            />
                            :
                            <span className="!size-6">
                                <FileArchiveIcon size={24} className="!size-6" />
                            </span>
                    )}
                    <p className="text-xs !text-center text-muted-foreground my-1">
                        {name ? name : file instanceof File ? file?.name : `Attached ${type}`}
                    </p>
                    {file instanceof File && file.size && <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(4)} MB</p>}
                    <button
                        onClick={removeFile}
                        className="absolute top-1 right-1 p-1 bg-muted rounded-full z-30"
                        aria-label="Remove"
                    >
                        <X size={14} />
                    </button>
                    {(uploadError) &&
                        <p className="text-xs w-[99%] h-5 text-white absolute bottom-0.5 flex justify-center bg-destructive rounded-b-md"
                            title={uploadError}
                        >
                            {uploadError}
                        </p>
                    }
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
                    onDrop={dropFile}
                    className="w-full h-full min-h-32 border-2 border-dashed flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-muted/10 transition-colors relative"
                    aria-invalid={!!uploadError}
                    {...props}
                >
                    {Icon ?
                        <Icon className="size-6 text-muted-foreground mb-1" />
                        :
                        <CloudUpload className="size-6 text-muted-foreground mb-1" />
                    }
                    <p className="text-xs !text-center text-muted-foreground">
                        Upload {type}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{maxSize}MB max</p>
                </div>
            )}

        </div>
    )
};
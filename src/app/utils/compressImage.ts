const MAX_WIDTH = 1920;
const JPEG_QUALITY = 0.8;

export async function compressImage(file: File): Promise<File> {
    if (!file.type.startsWith("image/")) return file;

    const bitmap = await createImageBitmap(file);
    const width = bitmap.width;
    const height = bitmap.height;

    let targetWidth = width;
    let targetHeight = height;

    if (width > MAX_WIDTH) {
        targetWidth = MAX_WIDTH;
        targetHeight = Math.round((height / width) * MAX_WIDTH);
    }

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
    bitmap.close();

    const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
            (b) => resolve(b!),
            "image/jpeg",
            JPEG_QUALITY
        );
    });

    const compressed = new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), {
        type: "image/jpeg",
        lastModified: Date.now(),
    });

    return compressed;
}

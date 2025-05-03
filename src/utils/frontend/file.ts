export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  callback: ({ file, files }: { file: File | null; files: File[] }) => void,
) => {
  const targetFiles = e.currentTarget.files;
  if (targetFiles != null) {
    callback({ file: targetFiles.item(0), files: [...targetFiles] });
  } else {
    callback({ file: null, files: [] });
  }
};

export const blobToDataUrl = (blob: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => reject(error);
  });
};

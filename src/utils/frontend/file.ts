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

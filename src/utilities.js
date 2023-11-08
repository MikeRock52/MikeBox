function getThumbnail(file) {
  const fileExt = getFileExtension(file?.key);
  if (fileExt.endsWith("/")) {
    return icons.folder;
  } else if (imageExtensions.includes(fileExt)) {
    return null;
  } else if (fileExt === "pdf") {
    return icons.pdf;
  } else {
    return icons.file;
  }
}

function isFolder(filename) {
  return filename.endsWith("/");
}

function getFileExtension(filename) {
  return filename.split(".").pop().toLowerCase();
}

function getFileName(fileKey) {
  if (isFolder(fileKey)) {
    return fileKey;
  } else {
    const parts = fileKey.split('/');
    return parts[parts.length - 1];
  }
}

function calculateFileSize(sizeInBytes) {
  const kb = (sizeInBytes / 1024).toFixed(2);
  if (kb < 1024) {
    return `${kb}kb`;
  } else {
    return `${(kb / 1024).toFixed(2)}mb`;
  }
}

const icons = {
  folder: "https://icons.iconarchive.com/icons/uriy1966/steel-system/256/Library-Windows-icon.png",
  file: "https://icons.iconarchive.com/icons/royalflushxx/systematrix/256/Document-icon.png",
  pdf: "https://icons.iconarchive.com/icons/hopstarter/soft-scraps/256/Adobe-PDF-Document-icon.png"
}

const imageExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "tiff",
  "webp",
  "svg",
  "ico",
  "jfif",
  "pjpeg",
  "pjp",
];


export default getThumbnail;
export { getFileExtension, calculateFileSize, isFolder, getFileName };

function getThumnail(file) {
  const fileExt = getFileExtension(file?.key);
  if (imageExtensions.includes(fileExt)) {
    return null;
  } else {
    return icons.file;
  }
}

function getFileExtension(filename) {
  return filename.split(".").pop().toLowerCase();
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
  file: "https://icons.iconarchive.com/icons/royalflushxx/systematrix/256/Document-icon.png"
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


export default getThumnail;
export { getFileExtension, calculateFileSize };

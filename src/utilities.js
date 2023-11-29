function getThumbnail(file) {
  const fileExt = getFileExtension(file?.key);
  if (fileExt.endsWith("/")) {
    return fileIcons.folder;
  } else if (imageExtensions.includes(fileExt)) {
    return null;
  } else if (imageExtensions.includes(fileExt)) {
      return fileIcons.image;
  } else if (musicExtensions.includes(fileExt)) {
      return fileIcons.music;
  } else if (fileExt === 'pdf') {
      return fileIcons.pdf;
  } else if (archiveExtensions.includes(fileExt)) {
      return fileIcons.archive;
  } else if (videoExtensions.includes(fileExt)) {
      return fileIcons.video;
  } else {
      return fileIcons.docs;
  }
}

function isFolder(filename) {
  return filename.endsWith("/");
}

function getFileExtension(filename) {
  return filename.split(".").pop().toLowerCase();
}

function getFileName(fileKey) {
  let parts = fileKey.split('/');
  if (isFolder(fileKey)) {
    return parts[parts.length - 2];
  } else {
    parts = parts[parts.length - 1];
    // parts = parts.slice(parts.indexOf('_') + 1);
    return parts;
  }
}

function calculateFileSize(sizeInBytes) {
  const kb = (sizeInBytes / 1024).toFixed(2);
  if (kb < 1024) {
      return `${kb}KB`;
  } else if (kb < 1024 * 1024) {
      return `${(kb / 1024).toFixed(2)}MB`;
  } else {
      return `${(kb / (1024 * 1024)).toFixed(2)}GB`;
  }
}

function getFolderName(folderKey) {
  const f = folderKey.split("/");
  return f[f.length - 2];
}

const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "webp",
    "svg", "ico", "jfif", "pjpeg", "pjp", ];

const musicExtensions = ['mp3', 'wav', 'ogg', 'aac', 'flac', 'wma', 'm4a',
        'mid', 'midi', 'amr', 'aiff', 'opus', ];

const archiveExtensions = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'arj', 'z', ];

const videoExtensions = ['mp4', 'mkv', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mpeg', 'mpg',
    '3gp', 'm4v', 'ogv', 'rm', 'swf',];

const fileIcons = {
    folder: "https://icons.iconarchive.com/icons/uriy1966/steel-system/256/Library-Windows-icon.png",
    image: "https://icons.iconarchive.com/icons/jommans/emluator/256/Pictures-icon.png",
    music: "https://icons.iconarchive.com/icons/robsonbillponte/sinem/256/File-Music-icon.png",
    docs: "https://icons.iconarchive.com/icons/royalflushxx/systematrix/256/Document-icon.png",
    pdf: "https://icons.iconarchive.com/icons/designbolts/graphic-file-type/256/Filetype-PDF-icon.png",
    archive: "https://icons.iconarchive.com/icons/wallpaperfx/3d-bluefx-desktop/256/Archive-icon.png",
    video: "https://icons.iconarchive.com/icons/wallpaperfx/3d-bluefx-desktop/256/Movies-icon.png",
}


export default getThumbnail;
export { getFileExtension, calculateFileSize, isFolder, getFileName, getFolderName };

export default (thisTrack) => {
  const { files, file, previewfile, isMix, artist, title } = thisTrack;
  const folder = 'http://127.0.0.1:8080/userfiles/';

  if (isMix) {
    let filePath = folder + JSON.parse(file).filename;
    return [{url: filePath, title: `${artist} - ${title}`}];
  }

  const trackList = JSON.parse(files);
  return trackList.map(file => {
    return {
      url: folder + file.filename,
      title: file.originalname
    }
  });
}
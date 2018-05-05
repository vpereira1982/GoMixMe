export default (thisTrack) => {
  const { files, file, previewfile, isMix, artist, title } = thisTrack;
  const folder = 'https://gomixme.s3.us-east-2.amazonaws.com/';

  if (isMix) {
    const filePath = folder + JSON.parse(file).filename;
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
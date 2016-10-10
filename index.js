import atat from 'walk';
import mediastic from 'mediastic';

let buildTree = (medecine) => {
  let artists = {};
  for(let medpack of medecine) {
    // console.log('med', medpack);
    artists[medpack.artistName] = artists[medpack.artistName] || {};
    artists[medpack.artistName][medpack.albumName] =
      artists[medpack.artistName][medpack.albumName] || [];
    artists[medpack.artistName][medpack.albumName].push({
      trackTitle: medpack.trackName,
      duration: medpack.duration,
      path: medpack.path,
      trackTitle: medpack.trackTitle
    });
  }

  return artists;
}
let scan = (path) => {
  return new Promise((resolve, reject) => {

    let tbtt = atat.walk(path);
    let medecine = []
    tbtt.on('file', async (root, stats, next) => {
      let filename = stats.name;
      console.log(filename);
      let medic = await mediastic(filename);
      medic.push(filename);
      medecine.push(medic);
    });

    tbtt.on('end', async () => {
        resolve(buildTree(medecine));
    });
  });

};

scan.buildTree = buildTree;
export default scan;

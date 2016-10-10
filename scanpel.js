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
    tbtt.on('file', (root, stats, next) => {
      let filename = root + '/' + stats.name;
      // console.log(filename);
      mediastic(filename).then((medic) => {
        medecine.push(medic);
        next();
      });
      // medic.push(filename);
    });
    tbtt.on('error', reject);
    tbtt.on('end', () => {
        resolve(buildTree(medecine));
    });
  });

};

scan.buildTree = buildTree;
export default scan;

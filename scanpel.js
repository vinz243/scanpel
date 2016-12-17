const atat = require('walk')
const mediastic = require('mediastic');

let buildTree = function (medecine) {
  let artists = {};
  for(let medpack of medecine) {
    // console.log('med', medpack);
    artists[medpack.artistName] = artists[medpack.artistName] || {};
    artists[medpack.artistName][medpack.albumName] =
      artists[medpack.artistName][medpack.albumName] || [];
    artists[medpack.artistName][medpack.albumName].push({
      duration: medpack.duration,
      path: medpack.path,
      trackTitle: medpack.trackTitle
    });
  }

  return artists;
}
let scan = function (path) {
  return new Promise(function (resolve, reject) {

    let tbtt = atat.walk(path);
    let medecine = []
    tbtt.on('file', function (root, stats, next) {
      let filename = root + '/' + stats.name;
      // console.log(filename);
      mediastic(filename).then(function (medic) {
        medecine.push(medic);
        next();
      });
      // medic.push(filename);
    });
    tbtt.on('error', reject);
    tbtt.on('end', function () {
        resolve(buildTree(medecine));
    });
  });

};

scan.buildTree = buildTree;
module.exports = scan;

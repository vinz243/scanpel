const atat = require('walk')
const mediastic = require('mediastic');

let buildTree = function (medecine) {
  let artists = {};
  for(let medpack of medecine) {
    artists[medpack.artistName] = artists[medpack.artistName] || {};
    artists[medpack.artistName][medpack.albumName] =
      artists[medpack.artistName][medpack.albumName] || [];
    artists[medpack.artistName][medpack.albumName].push({
      duration: medpack.duration,
      path: medpack.path,
      trackTitle: medpack.trackTitle,
      bitrate: medpack.bitrate
    });
  }

  return artists;
} 

let scan = function (path) {
  return new Promise(function (resolve, reject) {

    let tbtt = atat.walk(path);
    let medecine = []
    tbtt.on('file', function (root, stats, next) {
      const regex = /^(.+)\.(mp3|flac|ogg|wmv)$/gi;

      let filename = root + '/' + stats.name;
      if (!regex.test(filename)) {
        return next();
      }
      mediastic(filename).then(function (medic) {
        console.log(filename, medic);
        medecine.push(medic);
        next();
      }).catch(function (err) {
        console.log(err);
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

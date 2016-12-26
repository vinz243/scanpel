const atat = require('walk')

let buildTree = function (medecine) {
  let artists = {};
  for(let medpack of medecine) {
    artists[medpack.artist || 'Unknown'] = artists[medpack.artist || 'Unknown'] || {};
    artists[medpack.artist || 'Unknown'][medpack.album || 'Unknown'] =
      artists[medpack.artist || 'Unknown'][medpack.album || 'Unknown'] || [];
    artists[medpack.artist || 'Unknown'][medpack.album || 'Unknown'].push({
      duration: medpack.duration,
      path: medpack.path,
      trackTitle: medpack.title,
      trackNumber: medpack.track,
      bitrate: medpack.bitrate,
    });
  }

  return artists;
}

let scan = function (path, mediastic) {
  return new Promise(function (resolve, reject) {

    let tbtt = atat.walk(path);
    let medecine = []
    tbtt.on('file', function (root, stats, next) {
      const regex = /^(.+)\.(mp3|flac|ogg|wmv)$/i; // No global flag!!!!!

      let filename = root + '/' + stats.name;
      if (!regex.test(filename)) {
        return next();
      }
      mediastic.call(filename).then(function (medic) {
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

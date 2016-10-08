import atat from 'walk';
import medistic from 'medistic';

export default (path) => {
  return new Promise((resolve, reject) => {

    let tbtt = atat.walk(path);
    let medecine = []
    tbtt.on('file', async (root, stats, next) => {
      let filename = stats.name;

      let medic = await medistic(filename);
      medecine.push(medic);
    });

    tbtt.on('end', async () => {
        // Scan artists
        let artists = {};
        for(medpack in medecine) {
          artists[medpack.artistName] = artistName[medpack.artistName] || [];
          artists[medpack.artistName][medpack.albumName] =
            artists[medpack.artistName][medpack.albumName] || [];
          artists[medpack.artistName][medpack.albumName].push({
            trackName: medpack.trackName,
            duration: medpack.duration,
            path: medpack.path
          });
        }
        resolve(artists);
    });
  });

}

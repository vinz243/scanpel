import test from 'ava';
import scanpel from './scanpel';

const data = [{
  artist: 'Eminem',
  album: 'Greatest Hits',
  title: 'The Real Slim Shady',
  path: '/mock/music/Stan.mp3',
  duration: 1
}, {
  artist: 'Eminem',
  album: 'Greatest Hits',
  title: 'Cleaning Out My Closet',
  path: '/mock/music/closet.mp3',
  duration: 2
}, {
  artist: 'Eminem',
  album: 'The Marshall Mathers LP 2',
  title: 'Rap God',
  path: '/mock/music/god.mp3',
  duration: 3
}, {
  artist: 'Alborosie',
  album: 'Soul Pirate',
  title: 'Herbalist',
  path: '/mock/music/Herbalist.mp3',
  duration: 4
}, {
  artist: 'Eminem',
  album: 'Greatest Hits',
  title: 'Stan',
  path: '/mock/music/Stan.mp3',
  duration: 5
}];

test('should parse correctly mock data', t => {
  let tree = scanpel.buildTree(data);

  // console.log(JSON.stringify(tree))

  t.is(tree['Eminem']['Greatest Hits'].length, 3);
  t.is(tree['Eminem']['The Marshall Mathers LP 2'].length, 1);
  t.deepEqual(tree.Alborosie['Soul Pirate'][0],
     {
        "duration":4,
        "path":"/mock/music/Herbalist.mp3",
        "trackTitle":"Herbalist",
        "bitrate": undefined,
        "trackNumber": undefined
      });

});

test('should correct parse folder', async t => {
  let mock = {
    call: async (path) => {
      switch (path) {
        case __dirname + "/test/01.Cleanin Out My Closet.mp3":
          return Promise.resolve({
            artist: 'Eminem',
            album: 'The Marshall Mathers LP1',
            title: 'Cleanin Out My Closet',
            path
          });
        case __dirname + "/test/Radioactive.flac":
          return Promise.resolve({
            artist: 'Imagine Dragons',
            album: 'Night Visions',
            title: 'Radioactive',
            path
          });
        case __dirname + "/test/music/eminem/Rap God.mp3":
          return Promise.resolve({
            artist: 'Eminem',
            album: 'The Marshall Mathers LP2',
            title: 'Rap God',
            path
          });
        default:
          t.fail('Looking for ' + path)

      }
      return Promise.resolve();
    }
  };
  let res = await scanpel(__dirname + '/test', mock);
  // console.log(JSON.stringify(res));
  t.is(res['Eminem']['The Marshall Mathers LP1'][0].path,
    __dirname + "/test/01.Cleanin Out My Closet.mp3");
  t.is(res['Imagine Dragons']['Night Visions'][0].path,
    __dirname + "/test/Radioactive.flac");
});

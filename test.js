import test from 'ava';
import scanpel from './scanpel';

const data = [{
  artistName: 'Eminem',
  albumName: 'Greatest Hits',
  trackTitle: 'The Real Slim Shady',
  path: '/mock/music/Stan.mp3',
  duration: 1
}, {
  artistName: 'Eminem',
  albumName: 'Greatest Hits',
  trackTitle: 'Cleaning Out My Closet',
  path: '/mock/music/closet.mp3',
  duration: 2
}, {
  artistName: 'Eminem',
  albumName: 'The Marshall Mathers LP 2',
  trackTitle: 'Rap God',
  path: '/mock/music/god.mp3',
  duration: 3
}, {
  artistName: 'Alborosie',
  albumName: 'Soul Pirate',
  trackTitle: 'Herbalist',
  path: '/mock/music/Herbalist.mp3',
  duration: 4
}, {
  artistName: 'Eminem',
  albumName: 'Greatest Hits',
  trackTitle: 'Stan',
  path: '/mock/music/Stan.mp3',
  duration: 5
}];

test('should parse correctly mock data', t => {
  let tree = scanpel.buildTree(data);
  // console.log(JSON.stringify(tree))
  // t.is(tree.Eminem['Greatest Hits'])
  t.is(tree['Eminem']['Greatest Hits'].length, 3);
  t.is(tree['Eminem']['The Marshall Mathers LP 2'].length, 1);
  t.deepEqual(tree.Alborosie['Soul Pirate'][0],
     {
        "duration":4,
        "path":"/mock/music/Herbalist.mp3",
        "trackTitle":"Herbalist",
        "bitrate": undefined
      });

});



test('should correct parse folder', async t => {
  let res = await scanpel(__dirname + '/test');
  // console.log(JSON.stringify(res));
  t.is(res.Eminem['The Eminem Show (Explicit Version)'][0].duration, 297.933);
  t.is(res['Imagine Dragons']['Night Visions'][0].duration, 186.813)
});



import test from 'ava';
import scanpel from './index';

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
        "trackTitle":"Herbalist"
      });

});

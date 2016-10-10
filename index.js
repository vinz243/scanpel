'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _walk = require('walk');

var _walk2 = _interopRequireDefault(_walk);

var _mediastic = require('mediastic');

var _mediastic2 = _interopRequireDefault(_mediastic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var buildTree = function buildTree(medecine) {
  var artists = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = medecine[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var medpack = _step.value;

      // console.log('med', medpack);
      artists[medpack.artistName] = artists[medpack.artistName] || {};
      artists[medpack.artistName][medpack.albumName] = artists[medpack.artistName][medpack.albumName] || [];
      artists[medpack.artistName][medpack.albumName].push(_defineProperty({
        trackTitle: medpack.trackName,
        duration: medpack.duration,
        path: medpack.path
      }, 'trackTitle', medpack.trackTitle));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return artists;
};
var scan = function scan(path) {
  return new Promise(function (resolve, reject) {

    var tbtt = _walk2.default.walk(path);
    var medecine = [];
    tbtt.on('file', function (root, stats, next) {
      var filename = root + '/' + stats.name;
      // console.log(filename);
      (0, _mediastic2.default)(filename).then(function (medic) {
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
exports.default = scan;

const path = require('path');
const src = p => path.resolve(__dirname, '../src', p);
const root = p => path.resolve(__dirname, '..', p);

module.exports = {
  src,
  root
};

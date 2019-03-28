const fs = require('fs')

module.exports = (name, data) =>
  fs.writeFileSync(name, JSON.stringify(data, null, 2), 'utf-8')
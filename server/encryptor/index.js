let bcrypt = require('bcrypt');
let saltRounds = Math.random();

module.exports = {
  makeSaltSync: function() {
    return bcrypt.genSaltSync(saltRounds);
  },
  makeHashPw: function(password, salt) {
    return bcrypt.hashSync(password, salt);
  }
}
const router = require("express").Router();
const { readdirSync, readFileSync } = require('fs-extra');
const path = require('path');
try {
  // ------------------------------------------------------------------------//
  // ------------------------/     Public folder    /-------------------------//
  // ------------------------------------------------------------------------//
  var i, j, n = 0;
  const srcPath = path.join(__dirname, "/public/");
  const hosting = readdirSync(srcPath).filter((file) => file.endsWith(".js"));
  for (i of hosting) {
    const { index, name } = require(srcPath + i);
    router.get(name, index);
    n++
    console.log(i);
  }

  // for 'post' folder
  const srcPathPost = path.join(__dirname, "/post/");
  const hostingPost = readdirSync(srcPathPost).filter((file) => file.endsWith(".js"));
  for (j of hostingPost) {
    const { index, name } = require(srcPathPost + j);
    router.post(name, index);
    n++
    console.log('post/' + j);
  }


  // ------------------------------------------------------------------------//
  // ----------------------------/     Public    /----------------------------//
  // ------------------------------------------------------------------------//
  const getDirs = readdirSync(srcPath).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
  for (const dir of getDirs) {
    const fileName = readdirSync(path.join(__dirname, '/public/' + dir + '/')).filter((file) => file.endsWith(".js"));
    for (j of fileName) {
      const { index, name } = require(path.join(__dirname, '/public/' + dir + '/') + j);
      router.get(name, index);
      n++
      console.log('\x1b[38;5;46m[ LOADING ] \x1b[33m→\x1b[40m\x1b[1m\x1b[38;5;161m Successfully loaded ' + j);
    }
  }

  // for 'post' folder
  const getDirsPost = readdirSync(srcPathPost).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
  for (const dir of getDirsPost) {
    const fileName = readdirSync(path.join(__dirname, '/post/' + dir + '/')).filter((file) => file.endsWith(".js"));
    for (j of fileName) {
      const { index, name } = require(path.join(__dirname, '/post/' + dir + '/') + j);
      router.post(name, index);
      n++
      console.log('\x1b[38;5;154m[ LOADING ] \x1b[33m→\x1b[38;5;197m Successfully loaded POST/' + j);
    }
  }
  console.log(`\x1b[38;5;154m[ LOADING ] \x1b[33m→\x1b[38;5;197m Successfully loaded ${n} API files`);
} catch (e) { console.log(e); }

// -------------------------->      END     <------------------------------//
module.exports = router;
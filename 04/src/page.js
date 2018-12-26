/**
 * requir.ensure(): 只是加载并不执行
 * import(): 加载并且自动执行
 */

import( './subPageA').then(function(subPageA) {
  console.log(subPageA);
});

import( "./subPageB").then(function(subPageB) {
  console.log(subPageB);
});

import( "lodash").then(function(_) {
  console.log(_.join(["1", "2"]));
});

// require.include("./module.js"); // 将subPageA和subPageB共用的module.js打包在此page中

/* require.ensure(
  ["./subPageA.js", "./subPageB.js"],
  function () {
    var subPageA = require("./subPageA");
    var subPageB = require("./subPageB");
  },
  "subPage"
); */


// require.ensure(
//   [],
//   function () {
//     var subPageA = require('./subPageA');
//   },
//   "subPageA"
// )

// require.ensure(
//   [],
//   function () {
//     var subPageB = require('./subPageB');
//   },
//   "subPageB"
// )


// require.ensure(
//   ["lodash"],   
//   function () {
//     var _ = require("lodash");
//     _.join(["1", "2"]);
//   },
//   "vendor"
// );

export default "page";
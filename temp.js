var fs = require('fs');
var filename = "data.txt";
var library = require("./library.js").library;



console.log(library.getCapHolder("purple"));
console.log(library.getCapHolder("orange"));

//
// Pass a parameter like purple 0r orange to getCapHolder function & then on that  parameter deside what to do next
// On that parameter change runs or wickets;
//

// fs.writeFile(filename, 'Hello Node', function (err) {
//   if (err) throw err;
//   console.log('It\'s saved!');
// });

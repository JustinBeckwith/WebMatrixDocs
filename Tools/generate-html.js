var markdown = require('markdown').markdown;
var fs = require('fs');
var rimraf = require('rimraf');

var inputDir = '../DevCenter';
var outputDir = '../Output';


function clearOutputDir(callback) {
	// clear the output directory
	var clearCount = 0;
	fs.readdir(outputDir, function(err, files) {
		if (err) console.log('Error! ' + err);
		if (files.length == 0) callback();
		files.forEach(function(file) {
			console.log('removing ' + outputDir + '/' + file);
			rimraf(outputDir + '/' + file, function(err) {
				if (err) console.log('Error! ' + err);
				clearCount++;
				if (clearCount == files.length) 
					callback();
			});
		});
	});

}

// create the markdown files in the output dir
function generateOutput(dir, callback) {
	fs.readdir(dir, function(err, files) {
		if (err) return callback(err);
		if (files !== undefined) {
			files.forEach(function(file) {
				file = dir + '/' + file;
				fs.stat(file, function(err, stat) {
					if (stat && stat.isDirectory()) {

						// create the directory in the output tree
						var mirrorDir = outputDir + file.substring(2);
						console.log('creating directory: ' + mirrorDir )
						fs.mkdir(mirrorDir, 0777, function(err) {
							if (err) console.log('error creating mirror dir >> ' + err);
								generateOutput(file, function(err, results) {
								console.log('DANGER: ' + err);
							});
						})
					} else {
						fs.readFile(file, 'utf8', function(err, data) {
							if (err) console.log('ERROR: ' + err);
							var output = markdown.toHTML(data);
							var outputPath = "../Output" + file.substring(2, file.length-2) + "html";
							console.log('writing out to: ' + outputPath);
							fs.writeFile(outputPath, output, 'utf8', function(err) {
								if (err) 
									console.log('error writing output file >> ' + err);
								else 
									console.log('output complete: ' + outputPath);
							});
							console.log('Touching file: ' + file);
						});
					}
				});
			});
		}
	})
}

clearOutputDir(function() {
	var outD = outputDir + inputDir.substring(2);
	console.log('creating directory >> ' + outD);
	fs.mkdir(outD, 077, function(err) {
		generateOutput(inputDir, function (err, results) {
			if (err) console.log(err);
			console.log('DONE!');
		});
	});
});



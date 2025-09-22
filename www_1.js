const http = require("http");
const dateET = require("./src/dateTimeET.js");
const pageHead = '<!DOCTYPE html><html lang="et">\n<head>\n<meta charset="utf-8">\n<title>Jako Puusepp</title>\n</head>\n<body>';
const pageBody ='  <h1> Jako Puusepp </h1>\n<p>See leht on loodud õppimise põhimõtetega <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning pole tõsiselt võetava sisuga.</p>\n<hr>\n<p>Kodutöö on tehtud. </p>\n<hr>\n';
const pageFoot = '</body>\n</html>';
http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	//res.write("Ongi nii!");
	res.write(pageHead);
	res.write(pageBody);
	res.write("<p> Täna on " + dateET.fullDate() + "</p>" );
	res.write("<p> Kell on " + dateET.fullTime() + "</p>");
	res.write(pageFoot);
	return res.end();
}).listen(5107);
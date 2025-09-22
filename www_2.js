const http = require("http");
const fs = require("fs");
//laeme mooduli päringu parsimiseks
const url = require("url");
const dateET = require("./src/dateTimeET.js");
const textRef = "txt/vanasonad.txt";
const pageHead = '<!DOCTYPE html><html lang="et">\n<head>\n<meta charset="utf-8">\n<title>Jako Puusepp</title>\n</head>\n<body>';
const pageBody ='  <h1> Jako Puusepp </h1>\n<p>See leht on loodud õppimise põhimõtetega <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning pole tõsiselt võetava sisuga.</p>\n<hr>\n<p>Kodutöö on tehtud. </p>\n<hr>\n';
const pageFoot = '</body>\n</html>';
http.createServer(function(req, res){
	//parsin URL-i
	console.log("Päring: " + req.url)
	let currentUrl = url.parse(req.url, true);
	console.log("Parsituna: " + currentUrl.pathname);

		if(currentUrl.pathname === "/"){
			res.write(pageHead);
			res.write(pageBody);
			res.write("\n\t<p>Täna on " + dateET.fullDate() + ".</p>");
			res.write(pageFoot);
			return res.end();
		}

	else if(currentUrl.pathname === "/vanasonad"){
		res.writeHead(200, {"Content-type": "text/html"});
		fs.readFile(textRef, "utf8", (err, data)=>{
		if(err){
			res.write(pageHead);
			res.write(pageBody);
			res.write("<p>Ei suutnud vanasõna lugeda<p>");
			res.write("\n\t<p>Täna on " + dateET.fullDate() + "</p>");
			res.write(pageFoot);
			return res.end();
		} else {
			let folkWisdom = data.split(";");
			let folkWisdomOutput = "\n\t<ol>";
			for (let i = 0; i < folkWisdom.length; i ++){
				folkWisdomOutput += "\n\t\t<li>" + folkWisdom[i] + "</li>";
			}
			folkWisdomOutput += "\n\t</ol>";
			res.write(pageHead);
			res.write(pageBody);
			res.write("\n\t<p>Täna on " + dateET.fullDate() + ".</p>")
			res.write(folkWisdomOutput);
			res.write(pageFoot);
			return res.end();
		}
	});
	}
	}).listen(5107);
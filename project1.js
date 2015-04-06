// Module dependencies

var express    = require('express'),
    mysql      = require('mysql');

// Application initialization

var connection = mysql.createConnection({
    host     : 'cwolf.cs.sonoma.edu',
    user     : '',
    password : ''
});

var app = module.exports = express.createServer();

// Database setup

connection.query('USE ', function (err) {
    if (err) throw err;
});

// Configuration

app.use(express.bodyParser());

// Main page with two links to view the table and drop down menu

var htmlHeader = '<html><head><title>Pokemon Database</title></head><body>';
var htmlFooter = '</body></html>';

function handleError(res, error) {
    console.log(error);
    res.send(error.toString());
}

function buildUserView(result) {
    var responseHTML = htmlHeader + '<h1>Pokemon</h1>';
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>PokemonID: ' + result[i].PokeID + '</li>' +
            '<li>Name: ' + result[i].Name + '</li>' +
            '<li>HP: ' + result[i].HP + '</li>' +
            '<li>Attack: ' + result[i].Attack + '</li>' +
            '<li>Defense: ' + result[i].Defense + '</li>' +
            '<li>SP Attack: ' + result[i].SP_attack + '</li>' +
            '<li>SP Defense: ' + result[i].SP_defense + '</li>' +
            '<li>Speed: ' + result[i].Speed + '</li>' +
            '<li>Total: ' + result[i].Total + '</li></ul>' +
	    '<br /><a href="/">Home</a>'
    }
    responseHTML += htmlFooter;
    return responseHTML;
}


app.get('/', function(req, res) {
    req.query.name
       res.send('<html><head><title>Pokemon Database</title></head>' +
		'<body background="http://cartoondistrict.com/wp-content/uploads/2014/12/pokemon-wallpaper-HD-for-desktop-28.jpg">' +
		'<basefont="sans-serif" size ="10" color ="000000">' +
		'<h1><strong>Pokemon Database</strong></h1>' +
	     '<a style="font-weight:bold" href="/pokemon/">Pokemon</a><br />' +
            '<a style="font-weight:bold" href="/pokemon/add">Add a Pokemon</a><br />' +
             '<a style="font-weight:bold" href="/pokemon/strongest">Your Strongest Pokemon</a><br />' +
	'<a style ="font-weight:bold" href="/moves">Teach Your Pokemon Moves</a><br />' +
		'<a style="font-weight:bold" href="/pokemon/moves/all">All Moves Learned</a><br />' +
            '</body></html>'
    );
});

app.get('/pokemon/view/table', function (req, res) {

    var myQry = 'SELECT * FROM ' + req.query.Type + '_poke';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                var responseHTML = '<body background="http://cartoondistrict.com/wp-content/uploads/2014/12/pokemon-wallpaper-HD-for-desktop-28.jpg">'
		    +'<h1>' + req.query.Type + ' Pokemon</h1>';
                responseHTML += '<table border=1 bgcolor="#FFFFFF">' +
                    '<tr><th>Pokemon ID</th>' +
                    '<th>Name</th>' +
		    '<th>HP</th>' +
		    '<th>Attack</th>' +
		    '<th>Defense</th>' +
		    '<th>SP Attack</th>' +
		    '<th>SP Defense</th>' +
		    '<th>Speed</th>' +
		    '<th>Total</th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].PokeID + '</td>' +
                        '<td>' + result[i].Name + '</td>' +
			'<td>' + result[i].HP + '</td>' +
			'<td>' + result[i].Attack + '</td>' +
			'<td>' + result[i].Defense + '</td>' +
			'<td>' + result[i].SP_attack + '</td>' +
			'<td>' + result[i].SP_defense + '</td>' +
			'<td>' + result[i].Speed + '</td>' +
			'<td>' + result[i].Total + '</td>' +
                        '<td><a href="/pokemon/edit?PokeID=' + result[i].PokeID + '&Type=' + req.query.Type + '">edit</a>' +
                        '<td><a href="/pokemon/delete?PokeID=' + result[i].PokeID + '&Type=' + req.query.Type + '">delete</a>' +
                        '</tr>';
		   }

                responseHTML += '</table>' + '<a href="/">Return Home</a>';
                res.send(responseHTML);
            }
        }
    );
});

app.get('/pokemon', function (req, res) {
    var responseHTML = htmlHeader;
    responseHTML += '<h1>Which type do you want to see?</h1>' +
	'<form action="/pokemon/view/table" method="GET">' +
	'<label for="Type">Type</label>' + '<br />' + '<input type ="radio" name="Type" value="Fire" checked>Fire' + '<br />' +
	'<input type="radio" name="Type" value="Water" checked>Water' + '<br />' +
	'<input type="radio" name="Type" value="Grass" checked>Grass' + '<br />' +
	'<input type="radio" name="Type" value="Fighting" checked>Fighting' + '<br />' +
	'<input type="radio" name="Type" value="Psychic" checked>Psychic' + '<br />' +
	'<input type="radio" name="Type" value="Ground" checked>Ground' + '<br />' +
	'<input type="submit"/>' +
	'</form>';
    responseHTML += htmlFooter;
    res.send(responseHTML);

});

app.get('/pokemon/add', function(req, res){

    var responseHTML = htmlHeader;
    responseHTML += '<h1>Insert a Pokemon</h1>' +
        '<form action="/pokemon/insert" method="GET">' +
        '<label for="PokeID">Pokemon ID</label> <input type="text" name="PokeID" id="PokeID" /><br />' +
        '<label for="Name">Name</label> <input type="text" name="Name" id="Name" /><br />' +
        '<label for="HP">HP</label> <input type="text" name="HP" id="HP" /><br />' +
        '<label for="Attack">Attack</label> <input type="text" name="Attack" id="Attack" /><br />' +
        '<label for="Defense">Defense</label> <input type="text" name="Defense" id="Defense" /><br />' +
        '<label for="SP_attack">SP Attack</label> <input type="text" name="SP_attack" id="SP_attack" /><br />' +
	'<label for="SP_defense">SP Defense</label> <input type="text" name="SP_defense" id="SP_defense" /><br />' +
	'<label for="Speed">Speed</label> <input type="text" name="Speed" id="Speed" /><br />' +
        '<label for="Type">Type</label>' + '<br />' + '<input type="radio" name="Type" value="Fire" checked>Fire' + '<br />' +
	'<input type="radio" name="Type" value="Water" checked>Water' + '<br />' +
	'<input type="radio" name="Type" value="Grass" checked>Grass' + '<br />' +
	'<input type="radio" name="Type" value="Fighting" checked>Fighting' + '<br />' +
	'<input type="radio" name="Type" value="Psychic" checked>Psychic' + '<br />' +
	'<input type="radio" name="Type" value="Ground" checked>Ground' + '<br />' +
        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

app.get('/pokemon/insert', function(req, res){

    var myQry = 'INSERT INTO ' + req.query.Type + '_poke (PokeID, Name, HP, Attack, Defense, SP_attack, SP_defense, Speed) VALUES (' +
        '\'' + req.query.PokeID + '\', ' +
        '\'' + req.query.Name + '\', ' +
        '\'' + req.query.HP + '\', ' +
        '\'' + req.query.Attack + '\', ' +
	'\'' + req.query.Defense + '\', ' +
        '\'' + req.query.SP_attack + '\', ' +
	'\'' + req.query.SP_defense + '\', ' +
        '\'' + req.query.Speed + '\'' +
        ')';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM ' + req.query.Type + '_poke WHERE PokeID = ' + req.query.PokeID,
                    function (err, result) {
                        if (err) {
                            handleError(res, err);
                        }
                        else if(result.length == 1) {
                            res.send(buildUserView(result));
			   // res.send('<a href="/">Return Home</a>');
                        }
                        else {
                            res.send('No pokemon found for that Pokemon ID.');
                        }
                    });
            }
        }
    );
});

app.get('/pokemon/edit', function (req, res) {

    var myQry = 'SELECT * FROM ' + req.query.Type + '_poke WHERE PokeID = ' + req.query.PokeID;

    console.log(myQry);

    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                var responseHTML = htmlHeader + '<h1>Edit Pokemon Information</h1>';
                responseHTML += '<form action="/pokemon/update" method="GET">';
                if (result.length == 1) {
                    responseHTML += 'Name: <input type="text" name="Name" id="Name" value="' + result[0].Name + '" /><br />' +
                        'HP: <input type ="text" name ="HP"  id="HP" value="' + result[0].HP + '" /><br />' +
		        'Attack: <input type="text" name="Attack" id="Attack" value="' + result[0].Attack + '" /><br />' +
                        'Defense: <input type="text" name="Defense" id="Defense" value="' + result[0].Defense + '" /><br />' +
		        'SP Attack: <input type ="text" name ="SP_attack"  id="SP_attack" value="' + result[0].SP_attack + '"/><br />' +
			'SP Defense: <input type ="text" name ="SP_defense"  id="SP_defense" value="' + result[0].SP_defense + '"/><br />' +
                        'Speed: <input type ="text" name ="Speed"  id="Speed" value="' + result[0].Speed + '"/><br />' +
		        '<input type="hidden" name="PokeID" id="PokeID" value="' + result[0].PokeID + '" />' +
			 '<input type="hidden" name="Type" id="Type" value="' + req.query.Type + '" />' +
		        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('More than one record was returned.')
                }
            }
        }
    );
});

app.get('/pokemon/update', function (req, res) {

    var myQry = 'UPDATE ' + req.query.Type + '_poke SET Name="' + req.query.Name + '", HP="' + req.query.HP + '", Attack="' + req.query.Attack
	+ '", Defense="' + req.query.Defense + '", SP_attack="' + req.query.SP_attack + '", SP_defense="' + req.query.SP_defense +
	'", Speed="' + req.query.Speed + '" WHERE PokeID = ' + req.query.PokeID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM ' + req.query.Type + '_poke WHERE PokeID = ' + req.query.PokeID,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                            res.send(buildUserView(result));
                        }
                        else {
                            res.send('No pokemon found for that ID.');
                        }
                    });
            }
        }
    );
});


app.get('/pokemon/delete', function (req, res) {

    var myQry = 'DELETE FROM ' + req.query.Type + '_poke WHERE PokeID = ' + req.query.PokeID;
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Pokemon ' + req.query.PokeID + ' successfully deleted.' +
			'<a href="/">Return Home</a>');
            }
        }
    );
});




app.get('/pokemon/strongest', function (req, res) {
    var myQry = 'Select f.PokeID as ID, f.Name as PokeName, f.Total as Total from Fire_poke f ' + 'Union'
	+ ' Select w.PokeID as ID, w.Name as PokeName, w.Total as Total from Water_poke w ' + 'Union' 
	+ ' Select g.PokeID as ID, g.Name as PokeName, g.Total as Total from Grass_poke g Union'
        + ' Select fi.PokeID as ID, fi.Name as PokeName, fi.Total as Total from Fighting_poke fi UNION'
        + ' Select p.PokeID as ID, p.Name as PokeName, p.Total as Total from Psychic_poke p Order by Total Desc LIMIT 5';
  connection.query(myQry,
        function (err, result) {
            if (err) {
              console.log(err);
                      throw err;
                      res.send('An error occured');

            }
            else {
              var responseHTML = '<body background="http://cartoondistrict.com/wp-content/uploads/2014/12/pokemon-wallpaper-HD-for-desktop-28.jpg">'
		    +'<h1>Your Strongest Pokemon</h1>';
              responseHTML += '<table border=1 bgcolor="#FFFFFF">' +
		    '<tr><th>PokeID</th>' +
		    '<th>Name</th>' +
		    '<th>Total</th>';
              for (var i=0; i < result.length; i++) {
                responseHTML += '<tr><td>' + result[i].ID + '</td>' + '<td>' + result[i].PokeName + '</td><td>' +
		      result[i].Total + '</td></tr>'
              }
		responseHTML += '</table>' + '<a href="/">Return Home</a>';

              res.send(responseHTML);
            }
        }
    );
});

app.get('/moves', function (req, res) {
    var responseHTML = htmlHeader;
    responseHTML += '<h1>What Type?</h1>' +
        '<form action="/pokemon/moves/add" method="GET">' +
	'<input type="radio" name="Type" value="Fire" checked>Fire' + '<br />' +
        '<input type="radio" name="Type" value="Water" checked>Water' + '<br />' +
        '<input type="radio" name="Type" value="Grass" checked>Grass' + '<br />' +
        '<input type="radio" name="Type" value="Fighting" checked>Fighting' + '<br />' +
        '<input type="radio" name="Type" value="Psychic" checked>Psychic' + '<br />' +
        '<input type="radio" name="Type" value="Ground" checked>Ground' + '<br />' +
        '<input type="submit"/>' +
        '</form>';
    responseHTML += htmlFooter;
    res.send(responseHTML);

});

app.get('/pokemon/moves/add', function(req, res){
    var responseHTML = htmlHeader;
    responseHTML += '<h1>Teach One Of Your Pokemon a Move</h1>' +
        '<form action="/pokemon/moves" method="GET">' +
        '<label for="PokeID">Pokemon ID</label> <input type="text" name="PokeID" id="PokeID" /><br />' +
        '<label for="Name">Name</label> <input type="text" name="Name" id="Name" /><br />' +
	'<label for="MoveName">Move Name</label> <input type="text" name="MoveName" id="MoveName" /><br />' +
        '<label for="Category">Category</label> <input type="text" name="Category" id="Category" /><br />' +
        '<label for="PP">PP</label> <input type="text" name="PP" id="PP" /><br />' +
        '<label for="Power">Power</label> <input type="text" name="Power" id="Power" /><br />' +
        '<label for="Accuracy">Accuracy</label> <input type="text" name="Accuracy" id="Accuracy" /><br />' +
        '<input type="hidden" name="Type" id="Type" value="' + req.query.Type + '" />' +
        '<input type="submit"/>' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

app.get('/pokemon/moves', function (req, res) {
  var myQry = 'Insert into  ' + req.query.Type + '_moves(PokeID, Name, MoveName, Category, PP, Power, Accuracy) VALUES(' +
	'\'' + req.query.PokeID + '\', ' +
	'\'' + req.query.Name + '\', ' +
	'\'' + req.query.MoveName + '\', ' +
        '\'' + req.query.Category + '\',' +
	'\'' + req.query.PP + '\', ' +
	'\'' + req.query.Power + '\', ' + 
	 '\'' + req.query.Accuracy + '\'' +
	')';
  console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
		res.send('You did something wrong.');
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM ' + req.query.Type + '_moves WHERE PokeID = ' + req.query.PokeID ,
                    function (err, result) {
                        if (err) {
                            handleError(res, err);
                        }
                        else if(result.length == 1) {
			    for(var i=0; i< result.length; i++){
			    res.send('<h1> Your Pokemon learned a move! </h1>' +
				     'Pokemon Name: ' + result[i].Name + '<br />' +
				     'Move Name: ' + result[i].MoveName + '<br />' +
				     'Category: ' + result[i].Category + '<br />' +
				     'PP: ' + result[i].PP + '<br />' +
				     'Power: ' + result[i].Power + '<br />' +
				     'Accuracy: ' + result[i].Accuracy + '<br />' +
				     '<a href="/">Return Home</a>');
                            }
			}
                        else {
                            res.send('No pokemon found for that Pokemon ID.');
			    res.send('<a href="/">Return Home</a>');
                        }
                   });
            }
        }
    );
});

app.get('/pokemon/strongest', function (req, res) {
    var myQry = 'Select f.PokeID as ID, f.Name as PokeName, f.Total as Total from Fire_poke f ' + 'Union'
        + ' Select w.PokeID as ID, w.Name as PokeName, w.Total as Total from Water_poke w ' + 'Union'
        + ' Select g.PokeID as ID, g.Name as PokeName, g.Total as Total from Grass_poke g Union'
        + ' Select fi.PokeID as ID, fi.Name as PokeName, fi.Total as Total from Fighting_poke fi UNION'
        + ' Select p.PokeID as ID, p.Name as PokeName, p.Total as Total from Psychic_poke p UNION'
        + ' Select gro.PokeID as ID, gro.Name as PokeName, gro.Total as Total From Ground_poke gro' 
        + ' Order by Total Desc';                                                                                                                                 
  connection.query(myQry,
        function (err, result) {
            if (err) {
              console.log(err);
                      throw err;
                      res.send('An error occured');
            }
            else {
                var responseHTML = '<h1>Your Pokemon Moves</h1>';
		responseHTML += '<table border=1>' +
                    '<tr><th>PokeID</th>' +
                    '<th>Name</th>' +
                    '<th>Total</th>';
		for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].ID + '</td>' + '<td>' + result[i].PokeName + '</td><td>' +
			result[i].Total + '</td></tr>';
		}
		responseHTML += '</table>' + '<a href="/">Return Home</a>';
		res.send(responseHTML);
            }
        }
    );
});

app.get('/pokemon/moves/all', function (req, res) {
    var myQry = 'Select f.PokeID as ID, f.Name as PokeName, f.MoveName as Move from Fire_moves f ' + 'Union'
        + ' Select w.PokeID as ID, w.Name as PokeName, w.MoveName as Move from Water_moves w ' + 'Union'
        + ' Select g.PokeID as ID, g.Name as PokeName, g.MoveName as Move from Grass_moves g Union'
        + ' Select fi.PokeID as ID, fi.Name as PokeName, fi.MoveName as Move from Fighting_moves fi UNION'
        + ' Select p.PokeID as ID, p.Name as PokeName, p.MoveName as Move from Psychic_moves p UNION' 
        + ' Select gr.PokeID as ID, gr.Name as PokeName, gr.MoveName as Move From Ground_moves gr'
        + ' Order by ID ASC';                                                                
  connection.query(myQry,
        function (err, result) {
            if (err) {
              console.log(err);
                      throw err;
                      res.send('An error occured');
            }
            else {
                var responseHTML = '<body background="http://cartoondistrict.com/wp-content/uploads/2014/12/pokemon-wallpaper-HD-for-desktop-28.jpg">'
		    +'<h1>Your Pokemon Moves</h1>';
		responseHTML += '<table border=1 bgcolor="#FFFFFF">' +
                    '<tr><th>PokeID</th>' +
                    '<th>Name</th>' +
                    '<th>Move</th>';
		for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].ID + '</td>' + '<td>' + result[i].PokeName + '</td><td>' +
			result[i].Move + '</td></tr>'
		}
		responseHTML+= '</table> ' + '<a href="/">Return Home</a>';	
		res.send(responseHTML);
            }
        }
    );
});

app.listen(8005);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

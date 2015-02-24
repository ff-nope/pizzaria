
<html>
<head>
<meta charset="ISO-8859-1">
<title></title>
<style type="text/css">
</style>
</head>
<body>

<h1>Read Me</h1>



<p>	Please go to <a href="http://github.com/ff-nope/pizzaria"> http://github.com/ff-nope/pizzaria  </a> for source code. </p>
<p>Below is the list of available REST services <br />
	
</p>
<hr>

<h2>API resources: </h2>
<p>
	<strong>/com.ff.pizza/api/v1/status/inventory -</strong> <em>A http GET to this url will return all the rows wrapped in a JSON array.</em>
	<p  class="Ident">Sample of return:<BR>
	[<BR>
    {<BR>
        "PI_PK": 4,<BR>
        "PI_NOME": "Brocolli",<BR>
        "PI_ING01": "Champignon",<BR>
        "PI_ING02": "Brocolli",<BR>
        "PI_ING03": "Raspberry",<BR>
        "TEMPO_FORNO": 150<BR>
    },<BR>
    {<BR>
        "PI_PK": 9,<BR>
        "PI_NOME": "Italian",<BR>
        "PI_ING01": "Tomato",<BR>
        "PI_ING02": "Parsley",<BR>
        "PI_ING03": "Parmesan",<BR>
        "TEMPO_FORNO": 375<BR>
    }<BR>
]</p>



<p>
    <p>
	<strong>/com.ff.pizza/api//v1/crud/cadastro - </strong><em>A http POST to this URL with the DB columns wrapped in a JSON array will record to the database.</em>
	<p  class="Ident">Sample of POST:<BR>
	[<BR>
    {<BR>
        "PI_PK": 3,<BR>
        "PI_NOME": "Marguerita",<BR>
        "PI_ING01": "Tomato",<BR>
        "PI_ING02": "Pineapple",<BR>
        "PI_ING03": "Muzzarella",<BR>
        "TEMPO_FORNO": 150<BR>
    }<BR>
    ]<BR>
</p>
<p>
    <p>
	<strong>/com.ff.pizza/api//v1/crud/update - </strong><em>A http POST to this URL with all the columns sent wrapped in a JSON array will update the database.</em>
	<p  class="Ident">Sample of POST: Same as above. Primary key is checked for existence before recording.<BR>
	
</p>


<p>
    <p>
	<strong>/com.ff.pizza/api//v1/crud/retrieve - </strong><em>A http POST to this URL with PI_NOME in a JSON object will return all columns wrapped in a JSON array .</em>
</p>
<p  class="Ident">Sample of POST:<BR>
	PI_NOME : Italian<BR>
</p>

<p>
    <p>
	<strong>/com.ff.pizza/api//v1/crud/delete/{PI_PK} - </strong><em>A http DELETE to this URL will delete the row for that primary key.</em>




<hr>

























</body>
</html>
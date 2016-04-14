<h1> Symphony Words API </h1>

<h2> Words </h2> 

<h3> Get (GET /words/get/:id) </h3>

<h4> Consume </h4>
id - words list id 

<h4> Supply </h4>
Array of objects containing:
words - array of words;
id - words list id;

<h3> Create (POST /words/create) </h3> 

<h4> Consume </h4>
Array of objects containing:
name - string;
translation - string;

<h4> Supply </h4>
Array of objects containing:
words - array of words;
id - words list id;



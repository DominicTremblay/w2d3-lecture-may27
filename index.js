const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const uuidv4 = require('uuid/v4');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

const movieQuotesDb = {
  'd9424e04-9df6-4b76-86cc-9069ca8ee4bb': {
    id: 'd9424e04-9df6-4b76-86cc-9069ca8ee4bb',
    quote: 'Why so serious?',
  },
  '27b03e95-27d3-4ad1-9781-f4556c1dee3e': {
    id: '27b03e95-27d3-4ad1-9781-f4556c1dee3e',
    quote: 'YOU SHALL NOT PASS!',
  },
  '5b2cdbcb-7b77-4b23-939f-5096300e1100': {
    id: '5b2cdbcb-7b77-4b23-939f-5096300e1100',
    quote: "It's called a hustle, sweetheart.",
  },
  '917d445c-e8ae-4ed9-8609-4bf305de8ba8': {
    id: '917d445c-e8ae-4ed9-8609-4bf305de8ba8',
    quote: 'The greatest teacher, failure is.',
  },
  '4ad11feb-a76a-42ae-a1c6-8e30dc12c3fe': {
    id: '4ad11feb-a76a-42ae-a1c6-8e30dc12c3fe',
    quote: 'Speak Friend and Enter',
  },
};

const quoteComments = {
  '70fcf8bd-6cb0-42f3-9887-77aa9db4f0ac': {
    id: '70fcf8bd-6cb0-42f3-9887-77aa9db4f0ac',
    comment: 'So awesome comment!',
    quoteId: 'd9424e04-9df6-4b76-86cc-9069ca8ee4bb',
  },
};

app.get('/', (req, res) => {
  res.send('Quotes App Homepage');
});

app.get('/quotes', (req, res) => {
  res.render('quotes', { quotes: Object.values(movieQuotesDb) });
});

app.get('/quotes/new', (req, res) => {
  res.render('quote_new');
});

app.post('/quotes', (req, res) => {
  console.log('req.body', req.body);

  // extracting the quote content from the form request
  // es6 destructing
  const { quote } = req.body;
  // conventional
  // const quote = req.body.quote;

  const id = uuidv4();

  // create a new quote object

  const newQuote = {
    id: id,
    quote: quote,
  };

  // Add a new quote to the movieQuoteDb
  movieQuotesDb[id] = newQuote;

  // redirecting to the quotes page
  res.redirect('/quotes');
});

app.get('/quotes/:id', (req, res) => {
  const { id } = req.params;

  const templateVars = { quote: movieQuotesDb[id] };

  res.render('quote_show', templateVars);
});

app.post('/quotes/:id/delete', (req, res) => {
  // extract the id info from the path
  const { id } = req.params;
  // const id = req.params.id;

  delete movieQuotesDb[id];

  res.redirect('/quotes');
});

app.post('/quotes/:id', (req, res) => {
  // extract the id from the url
  const { id } = req.params;

  // extract the quote content from the form
  const { quote } = req.body;

  // update the quote in movieQuoteDb
  movieQuotesDb[id].quote = quote;

  // redirect to quotes

  res.redirect('/quotes');
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));

// const for elements on html
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading and hide quote
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Show quote and hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new Quote
function newQuote() {
    loading()
    // Pick a random quot from apiQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author is null to replace with Unknown
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    // Check quote length to dtermine styling(font-size)
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('longe-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}

//  Gets quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote();
    } catch (error) {
        alert(error);
        // Catch error here
    }
}
// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();
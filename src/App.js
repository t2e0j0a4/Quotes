import React , {useState} from 'react';
import { Colors } from './ColorsData';
import {FaQuoteLeft} from 'react-icons/fa';

const API = "https://type.fit/api/quotes";

function App() {
  const [quoteItem,setQuoteItem] = useState({});
  const [loading,setLoading] = useState(false);
  const [color,setColor] = useState(getRandom(Colors));

  const fetchQuotes = async () => {
    setLoading(true);
    const response = await fetch(API);
    const quotes = await response.json();
    let indexItem = getRandom(quotes);
    setQuoteItem(indexItem);
    setLoading(false);
  }
  
  React.useEffect(()=>{
    fetchQuotes();
    // eslint-disable-next-line
  },[])

  // Random Item from Index
  function getRandom (list) {
    return list[Math.floor((Math.random()*list.length))];
  }

  document.body.style.backgroundColor = color;
  const newQuote = () => {
    fetchQuotes();
    setColor(`${getRandom(Colors)}`)
  }

  return (
    <>
    <div id="wrapper">
      <div id="quote-box">
        {loading ? 
          <h1 style={{color : color}}>Loading...</h1> : 
        (<>
          <h1 id="text" style={{color : color}}><FaQuoteLeft/> {quoteItem.text}</h1>&nbsp;
          <h2 id="author" style={{color : color}}> - {quoteItem.author === null ? 'Great Person' : quoteItem.author}</h2>
        </>)}
        <div className="utils">
          <a href={`https://twitter.com/intent/tweet?hashtags=quotes&related=hello_12340987&text=${quoteItem.text}`} target="_blank" rel="noreferrer"  id="tweet-quote" style={{color: color}}><svg stroke="currentColor" fill={color} strokeWidth="0" viewBox="0 0 448 512" height="2.5em" width="2.5em" xmlns="http://www.w3.org/2000/svg" style={{color: 'black'}}><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"></path></svg></a>
          <button style={{backgroundColor : color , color : 'white'}} type="button" id="new-quote" onClick={()=>newQuote()}>New Quote</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;

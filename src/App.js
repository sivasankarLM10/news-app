import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';



function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');
  const [darkMode, setDarkMode] = useState(false);

  const categories = [
    { name: 'General', value: 'general' },
    { name: 'Business', value: 'business' },
    { name: 'Entertainment', value: 'entertainment' },
    { name: 'Health', value: 'health' },
    { name: 'Science', value: 'science' },
    { name: 'Sports', value: 'sports' },
    { name: 'Technology', value: 'technology' },
  ];

  useEffect(() => {
    const fetchData = async (category) => {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=25bdfdb7661242c88579756412d99878`
      );
      setNews(response.data.articles);
    };
    fetchData(category);

    const intervalId = setInterval(() => {
      fetchData(category);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [category]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  

  const speakArticle = (text,description) => {
    const speechSynthesis = window.speechSynthesis;
    const utteranceTitle = new SpeechSynthesisUtterance(text);
    const utteranceDescription = new SpeechSynthesisUtterance(description);
    // speechSynthesis.speak(utterance);
    speechSynthesis.speak(utteranceTitle);
    speechSynthesis.speak(utteranceDescription);
  };

  

  return (
    <div className="container">
      <header className="header">
        <div className="toggle-switch">
          <input
            type="checkbox"
            id="darkModeToggle"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <label htmlFor="darkModeToggle" className="toggle-label"></label>
        </div>
        <h1>Latest News</h1>
        <div className="categories">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={category === cat.value ? 'active' : ''}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </header>
      <main className="main">
        <div className="news">
          {news.map((article) => (
            <div key={article.title} className="news-item">
              <div className="news-image">
                <img src={article.urlToImage} alt={article.title} />
              </div>
              <div className="news-content">
                <h2 className="news-title">{article.title}</h2>
                {article.description && (
                  <p className="news-description">
                    {article.description.length > 200
                    ? `${article.description.substring(0, 200)}...`
                    : article.description}
                  </p>
               )}
                <a className="news-read-more" href={article.url}>
                  Read more
                </a>
                <button
                  className="news-text-to-speech"
                  onClick={() => speakArticle(article.title,article.description)}>listen
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

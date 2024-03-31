import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  const loadNews = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/everything?q=keyword&apiKey=51a66b41f7494e2a99e7c10b6e6b1f12"
      );
      setNews(response.data.articles);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-5">
      {news.map((newsArticles, index) => {
        const {
          author,
          title,
          description,
          url,
          urlToImage,
          publishedAt,
          content,
        } = newsArticles;

        return (
          <div key={index} className=" w-[450px] inline-block m-1">
            <img src={urlToImage} alt="" className="image" loading="lazy" />
            <h4 className="bg-red-500">{title}</h4>
            <p>{description}</p>
            <h3>{author}</h3>
            <p>{content}</p>
            <p> {publishedAt}</p>
            <a
              href={url}
              className="px-8 py-2 bg-pink-600 inline-block mt-5 rounded-2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default App;

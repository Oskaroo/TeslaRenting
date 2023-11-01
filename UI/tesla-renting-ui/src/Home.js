import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import News from "./newsData.json";

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(News);
  }, []);

  return (
    <div className="home">
      {data && (
        <div>
          <h2>News</h2>
          {data.map((newsItem) => (
            <Link key={newsItem.id} to={`/post/${newsItem.id}`}>
              <div className="news-item">
                <h3>{newsItem.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

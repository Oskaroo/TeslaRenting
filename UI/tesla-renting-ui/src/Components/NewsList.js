import React from "react";
import News from "../newsData.json";

const NewsList = () => {
  return (
    <div className="news-list">
      {News.map((item, index) => (
        <div key={index} className="news-item">
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default NewsList;

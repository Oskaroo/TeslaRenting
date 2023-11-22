import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import News from "../newsData.json"; // Import the JSON data

const PostDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (News) {
      setData(News);
    }
  }, []);

  // Check if data is still null, and if so, display a loading message
  if (data === null) {
    return <div>Loading...</div>;
  }

  // Find the selected news item based on the ID
  const selectedNews = data.find((dataItem) => dataItem.id.toString() === id);

  if (!selectedNews) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="car-details">
      <article>
        <h2>{selectedNews.name}</h2>
        <div>{selectedNews.content}</div>
      </article>
    </div>
  );
};

export default PostDetails;

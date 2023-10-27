import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [place, setPlace] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const car = { title, body, place };
    setIsPending(true);
    fetch(`http://localhost:8001/cars`, {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    }).then(() => {
      console.log("new blok added");
      setIsPending(false);
      history.push("/");
    });
  };
  return (
    <div className="create">
      <h2>Add a New Car</h2>
      <form onSubmit={handleSubmit}>
        <label>Car title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Car body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog Place:</label>
        <select value={place} onChange={(e) => setPlace(e.target.value)}>
          <option value="brzesko">brzesko</option>
          <option value="krakow">krakow</option>
        </select>
        {!isPending && <button>Add Car</button>}
        {isPending && <button disabled>Adding car...</button>}
      </form>
    </div>
  );
};

export default Create;

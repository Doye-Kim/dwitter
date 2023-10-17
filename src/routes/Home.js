import React from "react";
import { useState, useEffect } from "react";
import { dbService } from "../fbase";
const Home = () => {
  const [dweet, setDweet] = useState("");
  const [dweets, setDweets] = useState([]);
  const getDweets = async () => {
    const dbDweets = await dbService.collection("dweets").get();
    dbDweets.forEach((document) => {
      const dweetObject = {
        ...document.data(),
        id: document.id,
      };
      setDweets((prev) => [dweetObject, ...prev]);
    });
    console.log(dweets);
  };
  useEffect(() => {
    getDweets();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("dweets").add({
      dweet,
      createdAt: Date.now(),
    });
    setDweet("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setDweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={dweet}
          onChange={onChange}
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Dweet" />
      </form>
      <div>
        {dweets.map((dweet) => (
          <div key={dweet.id}>
            <h4>{dweet.dweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;

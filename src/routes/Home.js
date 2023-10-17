import React from "react";
import { useState } from "react";
import { dbService } from "../fbase";
const Home = () => {
  const [dweet, setDweet] = useState("");
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
    </div>
  );
};
export default Home;

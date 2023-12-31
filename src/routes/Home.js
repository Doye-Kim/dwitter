import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Dweet from "components/Dweet";
import DweetFactory from "components/DweetFactory";

const Home = ({ userObj }) => {
  const [dweets, setDweets] = useState([]);
  useEffect(() => {
    dbService
      .collection("dweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const dweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDweets(dweetArray);
      });
  }, []);
  return (
    <div className="container">
      <DweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {dweets.map((dweet) => (
          <Dweet
            key={dweet.id}
            dweetObj={dweet}
            isOwner={dweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;

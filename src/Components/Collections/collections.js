import React from "react";
import CollectionItem from "./collection-item";

const Collection = ({ title }) => {
  console.log("title", Object.keys(title).length === 0);
  if (Object.keys(title).length === 0) {
    title = [localStorage.getItem("title")];
  }
  return (
    <div className="collection">
      {console.log("title", title)}
      {(title || []).map((title, i) => (
        <CollectionItem key={i} title={title} />
      ))}
      {/* <CollectionItem title="Thee Kastjes" picture={images.donkerGroen001} />
      <CollectionItem title="Buikkastjes" picture={images.armyGreen001} />
      <CollectionItem title="Sidetables" picture={images.verfRose001} /> */}
    </div>
  );
};

export default Collection;

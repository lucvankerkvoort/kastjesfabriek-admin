import React from "react";
import CollectionItem from "./collection-item";

const Collection = ({ title }) => {
  return (
    <div className="collection">
      {title.map((title, i) => (
        <CollectionItem key={i} title={title} />
      ))}
      {/* <CollectionItem title="Thee Kastjes" picture={images.donkerGroen001} />
      <CollectionItem title="Buikkastjes" picture={images.armyGreen001} />
      <CollectionItem title="Sidetables" picture={images.verfRose001} /> */}
    </div>
  );
};

export default Collection;

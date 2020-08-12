import React, { useContext } from "react";
import Items from "../Components/Items/item";
import Title from "../Components/Jumbotron/title";
import Footer from "../Components/Footer/footer";
import Collection from "../Components/Collections/collections";
import { store } from "../Services/Store";

const Home = ({ collections }) => {
  const userData = useContext(store);
  const { info } = userData.state;
  const collectionsArray = () => {
    const obj = {};
    for (let i = 0; i < collections.length; i++) {
      obj[collections[i].type] = obj[collections[i].type] + 1 || 1;
    }
    return Object.keys(obj);
  };
  return (
    <div className="home">
      <Title title="Collecties" />
      <Collection title={collectionsArray()} collections={collections} />
      <Title title="Producten" />
      <div className="shop">
        {(info || []).map((item, i) => {
          return (
            <Items
              key={i}
              title={item.title}
              description={item.description}
              pics={item.images}
              price={item.price}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

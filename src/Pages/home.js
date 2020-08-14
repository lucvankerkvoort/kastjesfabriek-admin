import React, { useContext, useEffect } from "react";
import Items from "../Components/Items/item";
import Title from "../Components/Jumbotron/title";
import Footer from "../Components/Footer/footer";
import Collection from "../Components/Collections/collections";
import { store } from "../Services/Store";

const Home = (props) => {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (localStorage.getItem("authUser") === "") {
      props.history.push("/");
    }
  }, []);

  const userData = useContext(store);
  const { info } = userData.state;
  const collectionsArray = () => {
    const obj = {};
    for (let i = 0; i < props.collections.length; i++) {
      obj[props.collections[i].type] = obj[props.collections[i].type] + 1 || 1;
    }
    return Object.keys(obj);
  };
  return (
    <div className="home">
      <Title title="Collecties" />
      <Collection title={collectionsArray()} collections={props.collections} />
      <Title title="Producten" />
      <div className="shop">
        {(info || []).map((item, i) => {
          return (
            <Items
              history={props.history}
              key={i}
              id={item.id}
              title={item.title}
              sold={item.sold}
              description={item.description}
              pics={item.images}
              price={item.price}
              type={item.type}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

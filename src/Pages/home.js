import React, { useContext, useEffect } from "react";
import Items from "../Components/Items/item";
import Title from "../Components/Jumbotron/title";
import Footer from "../Components/Footer/footer";
import Collection from "../Components/Collections/collections";
import Remove from "../Components/Modal/remove";
import { store } from "../Services/Store";
// import { db } from "../Firebase/Firebase";

const Home = (props) => {
  useEffect(() => {
    localStorage.setItem("title", props.collectionTitles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (localStorage.getItem("authUser") === "") {
      props.history.push("/");
    }
  }, []);

  const userData = useContext(store);
  const { info } = userData.state;
  // const collectionsArray = () => {
  //   const obj = {};
  //   for (let i = 0; i < props.collections.length; i++) {
  //     // props.collections[i].type.forEach()
  //     obj[props.collections[i].type] = obj[props.collections[i].type] + 1 || 1;
  //   }
  //   db.collection("collection").doc("all").set(obj);
  //   return Object.keys(obj);
  // };
  return (
    <div className="home">
      <Title title="Collecties" />
      <Collection
        title={props.collectionTitles}
        collections={props.collections}
      />
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
              type={item.Collection}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

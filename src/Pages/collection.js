import React, { useContext, useEffect } from "react";
import Items from "../Components/Items/item";
import Title from "../Components/Jumbotron/title";
import Footer from "../Components/Footer/footer";
import { store } from "../Services/Store";

const Collection = (props) => {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (localStorage.getItem("authUser") === "") {
      props.history.push("/");
    }
  }, []);

  const userData = useContext(store);
  const { collection } = userData.state;
  return (
    <>
      <Title title="Collectie" />
      <div className="shop">
        {(collection || []).map((item, i) => {
          return (
            <Items
              history={props.history}
              key={i}
              id={item.id}
              title={item.title}
              description={item.description}
              pics={item.images}
              price={item.price}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default Collection;

import React, { useContext } from "react";
import Items from "../Components/Items/item";
import Title from "../Components/Jumbotron/title";
import Footer from "../Components/Footer/footer";
import { store } from "../Services/Store";

const Shop = () => {
  const userData = useContext(store);
  const { info } = userData.state;
  return (
    <>
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
        {/* <Items
          title="Antraciet Grijze Kast"
          price="150"
          sold={true}
          pics={[images.antracietGrijs001, images.antracietGrijs002]}
        />
        <Items
          title="Bruine Kast"
          price="150"
          sold={true}
          pics={[images.bruin001, images.bruin002]}
        />
        <Items
          title="Donker Groene Kast"
          price="150"
          sold={false}
          pics={[images.donkerGroen001]}
        />
        <Items
          title="Army Green Kast"
          price="150"
          sold={false}
          pics={[
            images.armyGreen001,
            images.armyGreen002,
            images.armyGreen003,
            images.armyGreen004,
          ]}
        /> */}
      </div>
      <Footer />
    </>
  );
};

export default Shop;

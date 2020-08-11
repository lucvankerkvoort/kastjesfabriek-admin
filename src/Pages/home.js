import React from "react";
import Jumbotron from "../Components/Jumbotron/jumbotron";
import Images from "../Images/images";
import Title from "../Components/Jumbotron/title";
import Footer from "../Components/Footer/footer";
import Collection from "../Components/Collections/collections";

const Home = ({ collections }) => {
  const collectionsArray = () => {
    const obj = {};
    for (let i = 0; i < collections.length; i++) {
      obj[collections[i].type] = obj[collections[i].type] + 1 || 1;
    }
    return Object.keys(obj);
  };
  return (
    <div className="home">
      <Jumbotron
        title="Kastjes Fabriek"
        backgroundPicture={Images.jumbotronBackground}
        text="Vind je het ook zo zonde dat er zoveel spullen afgedankt worden? Ik ook! Daarom ben ik begonnen met de Kastjes Fabriek om oude meubels een tweede kans te geven. Met liefde knap ik alles op tot echte pareltjes! Kijk snel wat er allemaal te koop is."
      />
      <Title title="Collecties" />
      <Collection title={collectionsArray()} collections={collections} />
      <Footer />
    </div>
  );
};

export default Home;

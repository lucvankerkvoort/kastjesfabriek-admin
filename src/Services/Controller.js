const url = {
  marktplaatsAds: "https://api.marktplaats.nl",
};

export default {
  getAds: fetch(url.marktplaatsAds),
};

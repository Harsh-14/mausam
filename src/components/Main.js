import React, { useEffect, useContext } from "react";
import axios from "axios";
import { Ripple } from "react-css-spinners/dist/Ripple";
import Footer from "./Footer";
import Error from "./Error";
import Map from "./Map";
import Header from "./Header";
import Weather from "./Weather";
import { GlobalStoreContext } from "./Store";
import "../css/style.scss";
const urlParams = new URLSearchParams(window.location.search);

const Main = () => {
  const [globalStore, setGlobalStore] = useContext(GlobalStoreContext);

  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    if (urlParams.has("search")) {
      handleAddressSearch(urlParams.get("search"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          reverseGeocoding(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error(`ERROR(${err.code}): ${err.message}`);
          getCoordinatesByIP();
        },
        {
          timeout: 6000,
          enableHighAccuracy: false,
        }
      );
    }
  }

  async function getCoordinatesByIP() {
    const URL = "https://ipapi.co/json/";
    try {
      const json = await axios.get(URL);
      setGlobalStore({
        ...globalStore,
        latitude: json.data.latitude,
        longitude: json.data.longitude,
        city: json.data.city,
        address: json.data.city,
        isAppLoaded: true,
      });
    } catch (err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
      setGlobalStore({
        ...globalStore,
        error: err,
      });
    }
  }

  async function reverseGeocoding(lat, lng) {
    window.history.replaceState(
      window.location.origin,
      document.title,
      window.location.origin
    );

    try {
      var options = {
        method: "GET",
        url: "https://trueway-geocoding.p.rapidapi.com/ReverseGeocode",
        params: { location: `${lat},${lng}`, language: "en" },
        headers: {
          "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
          "x-rapidapi-key":
            "2d32db8c02msh533e5bf6c9c289ep11ab4ajsnc36ee583996d",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          if (response.status === 200) {
            var json = response.data.results[0];
            setGlobalStore({
              ...globalStore,
              city: json.locality,
              address: json.address,
              latitude: json.location.lat,
              longitude: json.location.lng,
              isAppLoaded: true,
            });
          } else {
            setGlobalStore({
              ...globalStore,
              city: "There's nothing here, please check where you click",
              address: "There's nothing here, please check where you click",
              latitude: lat,
              longitude: lng,
              isAppLoaded: true,
            });
          }
        })
        .catch(function (err) {
          console.error(`ERROR(${err.code}): ${err.message}`);
          setGlobalStore({
            ...globalStore,
            isAppLoaded: false,
            error: err,
          });
        });
    } catch (err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
      setGlobalStore({
        ...globalStore,
        isAppLoaded: false,
        error: err,
      });
    }
  }

  async function handleAddressSearch(addresss) {
    setGlobalStore({
      ...globalStore,
      city: "",
      address: addresss,
      isAppLoaded: false,
    });

    const newURL = window.location.origin + "?search=" + encodeURI(addresss);
    window.history.pushState(newURL, document.title, newURL);

    try {
      const options = {
        method: "GET",
        url: "https://trueway-geocoding.p.rapidapi.com/Geocode",
        params: { address: addresss, language: "en" },
        headers: {
          "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
          "x-rapidapi-key":
            "2d32db8c02msh533e5bf6c9c289ep11ab4ajsnc36ee583996d",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          var json = response.data;
          console.log(json.results[0]);
          if (json.results.length === 0) {
            setGlobalStore({
              ...globalStore,
              city: "There's nothing here",
              address: "There's nothing here",
              isAppLoaded: true,
            });
          } else {
            setGlobalStore({
              ...globalStore,
              latitude: json.results[0].location.lat,
              longitude: json.results[0].location.lng,
              city: json.results[0].locality,
              address: json.results[0].address,
              isAppLoaded: true,
            });
          }
        })
        .catch(function (err) {
          console.error(`ERROR(${err.code}): ${err.message}`);
          setGlobalStore({
            ...globalStore,
            isAppLoaded: false,
            error: err,
          });
        });
    } catch (err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
      setGlobalStore({
        ...globalStore,
        isAppLoaded: false,
        error: err,
      });
    }
  }

  function handleMapClick({ lat, lng }) {
    reverseGeocoding(lat, lng);
  }

  if (globalStore.error) {
    return (
      <div className="loadingDiv">
        <Ripple size={154} />
        <Error
          message={
            globalStore.error
              ? globalStore.error.message
              : "SOMETHING WRONG HAPPENED"
          }
        />
      </div>
    );
  }

  if (!globalStore.isAppLoaded)
    return (
      <div className="loadingDiv">
        <Ripple size={154} />
      </div>
    );

  return (
    <>
      <Header handleAddressSearch={handleAddressSearch} />
      <Weather />
      <Map handleMapClick={handleMapClick} />
      <Footer />
    </>
  );
};
export default Main;

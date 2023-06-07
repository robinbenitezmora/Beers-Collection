import { message } from "antd";
import React from "react";
import { useState } from "react";

state = {
  beers: [],
  loading: true,
  error: false,
};

loadBeers = () => {
 const url = "api/v1/beers/index";
 fetch(url)
   .then((data) => {
     if (data.ok) {
       return data.json();
     }
     throw new Error("Network response was not ok.");
   })
   .then((data) => {
    data.forEach((beer) => {
      const newBeer = {
        key: beer.id,
        id: beer.id,
        brand: beer.brand,
        style: beer.style,
        country: beer.country,
        quantity: beer.quantity,
      };
      this.setState((prevState) => ({
        beers: [...prevState.beers, newBeer],
        loading: false,
      }));
    });
   })
   .catch((err) => this.setState({ error: true }));
};

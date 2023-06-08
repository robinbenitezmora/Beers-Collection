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

deleteBeer = (id) => {
  const url = `api/v1/beers/${id}`;

  fetch(url, {
    method: "DELETE",
  })
    .then((data) => {
      if (data.ok) {
        this.reloadBeers();
        return data.json();
      }
      throw new Error("Network response was not ok.");
    })
    .catch((err) => message.error("Error: " + err));
};

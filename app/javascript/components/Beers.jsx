import { Table, message, Popconfirm } from "antd";
import React from "react";
import AddBeerModal from "./AddBeerModal";

class Beers extends React.Component {
  columns = [
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Style",
      dataIndex: "style",
      key: "style",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Popconfirm title="Are you sure to delete this beer?" onConfirm={() => this.deleteBeer(record.id)}>
          <a href="#" type="danger">
            Delete{" "}
          </a>
        </Popconfirm>
      ),
    },
  ];

state = {
  beers: [],
  visible: false,
  loading: true,
  error: false,
};

componentDidMount() {
  this.loadBeers();
}

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
        visible: true,
        loading: false,
      }));
    });
   })
   .catch((err) => this.setState({ error: true }));
};

reloadBeers = () => {
  this.setState({ beers: [], loading: true });
  this.loadBeers();
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

onFinish = (values) => {
  const url = "api/v1/beers/";
  fetch (url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((data) => {
      if (data.ok) {
        this.handleCancel();

        return data.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(() {
      this.props.reloadBeers();
    })
    .catch((err) => console.error("Error: " + err));
    };

render() {
  const { beers, loading, error } = this.state;

  if (loading) {
    return <p>Loading beers...</p>;
  }

  if (error) {
    return <p>There was an error loading the beers</p>;
  }

  return (
    <>
      <Table className="table-striped-rows" dataSource={beers} columns={this.columns} />
      <AddBeerModal reloadBeers={this.reloadBeers} />
    </>
  );
}
}


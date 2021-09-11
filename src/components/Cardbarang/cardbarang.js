import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./cardbarang.module.css";

class Cards extends Component {
  render() {
    const {
      barang_id,
      barang_name,
      barang_jual,
      barang_beli,
      barang_stok,
      barang_image,
    } = this.props.data;
    const { handleUpdate, handleDelete, data } = this.props;
    console.log("kotn", this.props);
    console.log("kotn");
    return (
      <>
        <Card style={{ width: "200px" }} className="mx-auto">
          <Card.Img
            variant="top"
            src={`http://localhost:3001/backend1/api/${barang_image}`}
            className={styles.imgCard}
          />
          <Card.Body className="text-center">
            <Card.Title className={styles.title}>{barang_name}</Card.Title>
            <Card.Text className={styles.category}>Harga Jual  :{barang_jual}</Card.Text>
            <Card.Text className={styles.category}>Harga Beli  :{barang_beli}</Card.Text>
            <Card.Text className={styles.category}>Jumlah Stok :{barang_stok}</Card.Text>
            <Button
              className={styles.btUpdate}
              variant="outline-primary"
              onClick={() => handleUpdate(data)}
            >
              {/* <Jajalpopup className={styles.btUpdate} /> */}
              Update
            </Button>
            <Button
              className={styles.btDelete}
              variant="outline-primary"
              onClick={() => handleDelete(barang_id)}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Cards;

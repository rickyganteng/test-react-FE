import React, { Component } from "react";
import { Button, Row, Col, Image, Form } from "react-bootstrap";
import styles from "./formupdate.module.css";
import Popup from "reactjs-popup";
import dummy from "../../assets/img/no_image.jpg";
// import Warper from "../Warper/warper"
// import "./css/index.css";
import { postBarang } from "../../redux/action/barang"
import { connect } from "react-redux";



class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        barangName: "",
        barangBeli: "",
        barangJual: "",
        barangStok: "",
        barangImage: null,
        image: null,
      }
    }
  }
  postData = () => {
    const { form } = this.state;
    delete form.barangImage;
    if (!form.image) {
      delete form.image;
    }
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    this.props
      .postBarang(formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Submit Data Succes !",
            show: true,
          },
          () => {
            this.getData();
          }
        );
        this.resetForm();
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Submit Data Failed !",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };
  handleImage = (event) => {
    if (event.target.files[0]) {
      this.setState({
        form: {
          ...this.state.form,
          barangImage: URL.createObjectURL(event.target.files[0]),
          image: event.target.files[0],
        },
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          barangImage: null,
          image: null,
        },
      });
    }
  };
  changeTextForm = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  setUpdate = (data) => {
    console.log(data);
    this.setState({
      isUpdate: true,
      id: data.movie_id,
      form: {

      },
    });
  };

  render() {
    // const {
    //   barang_id,
    //   barang_name,
    //   barang_jual,
    //   barang_beli,
    //   barang_stok,
    //   barang_image,
    // } = this.props.data;
    // const { handleUpdate, handleDelete, data } = this.props;
    const {
      barangName,
      barangBeli,
      barangJual,
      barangStok,
      barangImage,
    } = this.state.form;
    // console.log("kotn", this.state.form);
    // console.log("kotn");
    // console.log("propsuuuuuuuuu", this.props);

    return (
      <>
        {/* <h3>update</h3> */}
        <div>
          <Popup
            trigger={<Button className={styles.button}> Update </Button>}
            modal
            contentStyle={{ width: "90%", background: "white" }}
          >
            {close => (
              <div className={styles.modal}>
                <a href className={styles.close} onClick={close}>
                  &times;
                </a>
                <div className={styles.header}> Posting Barang </div>

                <Row>
                  <Col lg={4}>
                    <Image
                      className={`${styles.hero} p-4 mb-4 d-block mx-auto`}
                      src={barangImage ? barangImage : dummy}
                      // src={dummy}
                      fluid
                    />
                  </Col>

                  <Form>
                    <Form.Group as={Row}>
                      <Col>
                        <br />
                        <br />
                        <Form.Label>Name Barang</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Name barang"
                          name="barangName"
                          value={barangName}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>

                      <Col >
                        <br />
                        <br />
                        <Form.Label>Harga Barang Beli</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Harga Barang Beli"
                          name="barangBeli"
                          value={barangBeli}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Col >
                        <br />
                        <br />
                        <Form.Label>Harga Barang Jual</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Harga Barang Jualt"
                          name="barangJual"
                          value={barangJual}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>

                      <Col>
                        <br />
                        <br />
                        <Form.Label>Jumlah Barang Stok</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Jumlah Stok"
                          name="barangStok"
                          value={barangStok}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group>
                      <Col>
                        <br />
                        <br />
                        <Form.Label>Name Premiere</Form.Label>
                        <Form.File
                          label="Barang Image"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </Col>
                    </Form.Group>
                  </Form>
                </Row>

                <div className={styles.actions}>




                  {/* <Popup
            trigger={<button className={style.button}> Menu Demo </button>}
            position={style.topcenter}
            closeOnDocumentClick
            contentStyle={{ padding: "0px", border: "none" }}
          >

            <div className={style.menu}>
              <div className={style.menuitem}> Menu item 1</div>
              <div className={style.menuitem}> Menu item 2</div>
              <div className={style.menuitem}> Menu item 3</div>
              <Popup
                trigger={<div className={style.menuitem}> sup Menu </div>}
                position="right top"
                on="hover"
                closeOnDocumentClick
                mouseLeaveDelay={300}
                mouseEnterDelay={0}
                contentStyle={{ padding: "0px", border: "none" }}
                arrow={false}
              >
                <div className={style.menu}>
                  <div className={style.menuitem}> item 1</div>
                  <div className={style.menuitem}> item 2</div>
                  <div className={style.menuitem}> item 3</div>
                </div>
              </Popup>
              <div className={style.menuitem}> Menu item 4</div>
            </div>
          </Popup> */}




                  <button
                    className={styles.button}
                    onClick={() => this.postData()}
                  >
                    Submit
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => {
                      console.log("Cancel ");
                      close();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div >
      </>
    );
  }
}

const mapDispatchToProps = { postBarang };

const mapStateToProps = (state) => ({
  movie: state.movie,
  barang: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
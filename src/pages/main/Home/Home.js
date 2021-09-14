import React, { Component } from "react";
import Cards from "../../../components/Cardbarang/cardbarang";
import axiosApiIntances from "../../../utils/axios";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { Button, Image, Container, Row, Col, Form, Modal } from "react-bootstrap";

import styles from "./Home.module.css";


import { deleteBarang, updateBarang, getAllBarang } from "../../../redux/action/barang"
import ModalPost from "../../../components/formpost/formpost"
import dummy from "../../../assets/img/no_image.jpg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      databarang: [],
      form: {
        barangName: "",
        barangBeli: "",
        barangStok: "",
        barangJual: "",
        barangImage: null,

      },
      pagination: {},
      page: 1,
      limit: 4,
      sort: "barang_id DESC",
      search: "%%",
      isUpdate: false,
      show: false,
      modalMsg: "",
      barangBeliValid: "",
      barangJualValid: "",
      barangStokValid: "",
      msg: "",

    };
  }
  componentDidMount() {
    this.getBarang(
      this.state.page,
      this.state.limit,
      this.state.sort,
      this.state.search
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("halo");
    if (
      prevState.search !== this.state.search ||
      prevState.sort !== this.state.sort
    ) {
      this.setState({ page: 1 }, () => {
        this.getBarang(
          this.state.page,
          this.state.limit,
          this.state.sort,
          this.state.search
        );
      });
    }

    if (
      prevState.search !== this.state.search ||
      prevState.sort !== this.state.sort ||
      prevState.page !== this.state.page
    ) {
      this.props.history.push(
        `?page=${this.state.page}&limit=${this.state.limit}&sort=${this.state.sort}&search=${this.state.search}`
      );

    }
  }
  resetForm = () => {
    this.setState({
      form: {
        ...this.state.form,
        barangName: "",
        barangBeli: "",
        barangStok: "",
        barangJual: "",
        barangImage: null,
      },
    });
  };


  sendData = () => {
    const { isUpdate } = this.state;
    if (isUpdate) {
      this.updateData();
    }
  };

  setUpdate = (data) => {
    console.log('datadatdatatat', data);
    this.setState({
      isUpdate: true,
      id: data.barang_id,
      form: {
        barangName: data.barang_name,
        barangBeli: data.barang_beli,
        barangStok: data.barang_stok,
        barangJual: data.barang_jual,
        barangImage: `http://localhost:3001/backend1/api/${data.barang_image}`,
        image: null,
      },
    });
  };
  changeTextForm = (event) => {
    // validation
    const name = event.target.name;
    const value = event.target.value;

    if (name === "barangBeli") {
      /^[0-9]*\.?[0-9]*$/.test(value)
        ? this.setState({ barangBeliValid: "invalid" })
        : this.setState({
          barangBeliValid: "valid",
          msg: "Please input only number"
        });
    } else if (name === "barangJual") {
      /^[0-9]*\.?[0-9]*$/.test(value)
        ? this.setState({ barangJualValid: "valid" })
        : this.setState({
          barangJualValid: "invalid",
          msg: "Please input only number"
        });
    } else if (name === "barangStok") {
      /^[0-9]*\.?[0-9]*$/.test(value)
        ? this.setState({ barangStokValid: "valid" })
        : this.setState({
          barangStokValid: "invalid",
          msg: "Please input only number"
        });
    }
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  };


  updateData = (event) => {

    const {
      barangBeliValid,
      barangJualValid,
      barangStokValid,
      msg,
      id,
      form,
    } = this.state;

    if (
      barangBeliValid === "valid" &&
      barangJualValid === "valid" &&
      barangStokValid === "valid" &&
      msg.length > 0 &&
      form.userEmail.length > 0
    )
      if (!form.image) {
        delete form.image;
      }
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    this.props
      .updateBarang(id, formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Update Data Succes !",
            show: true,
            isUpdate: false,
          },
          () => {
            window.location.reload();

          }
        );
        this.resetForm();
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Update Data Failed !",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };

  getBarang = (page, limit, sort, search) => {
    axiosApiIntances
      .get(`?page=${page}&limit=${limit}&sort=${sort}&search=${search}`)
      .then((res) => {
        console.log('tollllllll', res.data.data);
        this.setState({
          databarang: res.data.data,
          pagination: res.data.pagination,
        });
      })
      .catch((err) => {
        return [];
      });
  }

  handlePageClick = (event) => {
    console.log('handle page', event);
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getBarang(
        this.state.page,
        this.state.limit,
        this.state.sort,
        this.state.search,
      );

    });
  };
  deleteData = (id) => {
    if (window.confirm("sure you want to delete image ?") === true) {
      this.props
        .deleteBarang(id)
        .then((res) => {
          this.setState(
            {
              modalMsg: "Movie Deleted !",
              show: true,
            },
            () => {
              window.location.reload();

            }
          );
        })
        .catch((err) => {
          this.setState({
            modalMsg: "Deleted Failed !",
            show: true,
          });
        })
        .finally(() => {
          setTimeout(() => {
            this.setState({ show: false });
          }, 10000);
        });
    }
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  changeText = (event) => {
    this.setState({ [event.target.name]: "%" + event.target.value + "%" });
  };
  render() {

    const { show, modalMsg, pagination, barangBeliValid, barangJualValid, barangStokValid, msg } = this.state
    console.log('databarang', this.props);
    // console.log("DataMovUpcoming", this.state.dataMovUpcoming);
    // console.log("Databarang", this.state.databarang);
    const {
      barangName,
      barangBeli,
      barangStok,
      barangJual,
      barangImage,
    } = this.state.form

    return (
      <>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className={styles.modal}>{modalMsg}</Modal.Title>
          </Modal.Header>
        </Modal>
        <Container fluid>
          <div className={`${styles.bgDiv} ${styles.semi} p-5`}>
            <Col lg={3}>
              <Form className={styles.searchInput}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Search barang name..."
                    name="search"
                    // value={search}
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Row>
              <Col xs={4}>
                <Image
                  className={`${styles.hero} p-4 mb-4 d-block mx-auto`}
                  src={barangImage ? barangImage : dummy}
                  // src={dummy}
                  fluid
                />
              </Col>

              <Col xs={6}>
                <Form>
                  <Row>
                    <Form.Group as={Row}>
                      <Col xs={12}>

                        <Form.Label>Name Barang</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Name barang"
                          name="barangName"
                          value={barangName}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group>

                      <Col xs={12}>

                        <Form.Label>Harga Barang Beli</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Harga Barang Beli"
                          name="barangBeli"
                          value={barangBeli}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                      <Form.Control.Feedback type={barangBeliValid}>
                        <p className={styles.warning}>{msg}</p>
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group as={Row}>
                      <Col xs={12}>

                        <Form.Label>Harga Barang Jual</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Harga Barang Jualt"
                          name="barangJual"
                          value={barangJual}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                      <Form.Control.Feedback type={barangJualValid}>
                        <p className={styles.warning}>{msg}</p>
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>

                      <Col xs={12}>

                        <Form.Label>Jumlah Barang Stok</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Jumlah Stok"
                          name="barangStok"
                          value={barangStok}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col>
                      <Form.Control.Feedback type={barangStokValid}>
                        <p className={styles.warning}>{msg}</p>
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group>
                      <Col xs={8}>

                        <Form.Label>Barang Image</Form.Label>
                        <Form.File
                          onChange={(event) => this.handleImage(event)}
                        />
                      </Col>
                    </Form.Group>
                  </Row>
                </Form>
              </Col>
              <Col>
                <Row>
                  <Col xs={4}>
                    <Button
                      className={`${styles.btReset} mb-2`}
                      variant="outline-primary"
                      onClick={() => this.resetForm()}
                    >
                      Reset
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      className={styles.btSubmit}
                      variant="primary"
                      onClick={() => this.sendData()}
                    >
                      Update
                    </Button>
                  </Col>

                </Row>
              </Col>
            </Row>

          </div>
          <div
            className={`${styles.bgDiv} ${styles.semi} pt-5 pb-5 pl-4 pr-4`}
          >
            <Row>
              {this.state.databarang.map((item, key) => {
                return (
                  <Col lg={3} md={4} key={key} className="mb-2">
                    <Cards
                      data={item}
                      handleUpdate={this.setUpdate.bind(this)}
                      handleDelete={this.deleteData.bind(this)}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>

        </Container>
        <Container className={styles.bgCnt} fluid>
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pagination.totalPage ? pagination.totalPage : 0}
              marginPagesDisplayed={5}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={styles.pagination}
              subContainerClassName={`${styles.pages} ${styles.pagination}`}
              activeClassName={styles.active}
            />
          </div>
        </Container>
        <div className="d-flex justify-content-center">
          <ModalPost />

        </div>
      </>
    );
  }
}


const mapDispatchToProps = { deleteBarang, updateBarang, getAllBarang };

const mapStateToProps = (state) => ({
  barang: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React from "react";
import "./AdminDashboard.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";

import { API_URL } from "../../../constants/API";

import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";

import swal from "sweetalert";

class AdminDashboard extends React.Component {
  state = {
    productList: [],
    categoryList: [],
    paketList: [],
    createForm: {
      productName: "",
      price: 0,
      stock: 0,
      year: "",
      merek: "",
      image: "",
      description: "",
    },
    editForm: {
      id: 0,
      productName: "",
      price: 0,
      stock: 0,
      year: "",
      merek: "",
      image: "",
      description: "",
    },
    createCategory: {
      categoryName: "",
    },
    createPaket: {
      paketName: "",
    },
    addCategoryToProduct: {
      categoryName: 0,
      productName: 0,
    },
    addPaketToProduct: {
      paketName: 0,
      productName: 0,
    },
    editCategory: {
      id: 0,
      categoryName: "",
    },
    activeProducts: [],
    modalOpen: false,
  };

  getProductList = () => {
    Axios.get(`${API_URL}/products/readProduct`)
      .then((res) => {
        this.setState({ productList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getCategoryList = () => {
    Axios.get(`${API_URL}/category/readCategory`)
      .then((res) => {
        this.setState({ categoryList: res.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  getPaketList = () => {
    Axios.get(`${API_URL}/paket/readPaket`)
      .then((res) => {
        this.setState({ paketList: res.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  editCategoryBtnHandler = (id) => {
    Axios.get(`${API_URL}/category/readCategory/${id}`)
      .then((res) => {
        console.log(res.data)
        this.setState({ editCategory: res.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  editProductHandler = (id) => {
    Axios.put(`${API_URL}/products/${id}`, this.state.editForm)
      .then((res) => {
        console.log(res.data)
        swal("Good job!", "Product sudah terganti", "success");
        this.getProductList()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  editCategory = () => {
    Axios.put(`${API_URL}/category/editCategory`, this.state.editCategory)
      .then((res) => {
        console.log(res.data)
        swal("Good job!", "Category sudah terganti", "success");
        this.getProductList()
        this.getCategoryList()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  deleteCategory = (id) => {
    Axios.delete(`${API_URL}/category/${id}`)
      .then((res) => {
        console.log(res.data)
        swal("Good job!", "Category sudah terhapus", "success");
        this.getProductList()
        this.getCategoryList()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  deleteProduct = (id) => {
    Axios.delete(`${API_URL}/products/delete/${id}`)
      .then((res) => {
        console.log(res.data)
        swal("Good job!", "Product sudah terhapus", "success");
        this.getProductList()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  deleteCategoryinProduct = (productId, categoryId) => {
    Axios.delete(`${API_URL}/products/delete/${productId}/category/${categoryId}`)
      .then((res) => {
        console.log(res.data)
        this.getProductList()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  getCategoryTable = () => {
    return this.state.categoryList.map((val, idx) => {
      return (
        <tr>
          <td>{idx + 1}</td>
          <td>{val.categoryName}</td>
          <td>
            <button
              onClick={() => this.editCategoryBtnHandler(val.id)}
              style={{ width: "200px" }}
              data-toggle="modal" data-target="#myModal-1" className="button"><span>Edit Category</span></button>
            <div class="modal fade" id="myModal-1" role="dialog">
              <div style={{ marginTop: "100pt" }} class="modal-dialog ">
                <div class="modal-content">
                  <div class="modal-body">
                    <input
                      value={this.state.editCategory.categoryName}
                      onChange={(e) => this.inputHandler(e, "categoryName", "editCategory")} type="text" className="form-control" placeholder="category name" />
                  </div>
                  <div class="modal-footer">
                    <button
                      onClick={this.editCategory}
                      type="button" class="btn btn-success">Save</button>
                    <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td>
            <ButtonUI
              onClick={() => this.deleteCategory(val.id)}
            >
              Delete
            </ButtonUI>
          </td>
        </tr>
      )
    })
  }

  renderProductList = () => {
    return this.state.productList.map((val, idx) => {
      const { id, productName, price, merek, stock, year, image, description } = val;
      // let discHarga = (price - (price * (disc / 100)))
      return (
        <>
          <tr
            onClick={() => {
              if (this.state.activeProducts.includes(idx)) {
                this.setState({
                  activeProducts: [
                    ...this.state.activeProducts.filter((item) => item !== idx),
                  ],
                });
              } else {
                this.setState({
                  activeProducts: [...this.state.activeProducts, idx],
                });
              }
            }}
          >
            <td> {idx + 1} </td>
            <td> {productName} </td>
            <td>{new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price)}
              {/* {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price)}{" "} */}
            </td>
          </tr>
          <tr
            className={`collapse-item ${
              this.state.activeProducts.includes(idx) ? "active" : null
              }`}
          >
            <td className="" colSpan={3}>
              <div className="d-flex justify-content-around align-items-center">
                <div className="d-flex">
                  <img src={image} alt="" />
                  <div style={{ maxWidth: "100%", width: "100%" }} className="d-flex flex-column ml-4 justify-content-center">
                    <h5>{productName}</h5>
                    <h6 className="mt-2">
                      Category: <br />
                      <span style={{ fontWeight: "normal" }}>{val.categories.map((val) => {
                        return (
                          <>
                            <div class="d-flex bg-secondary">
                              <div class="p-2 flex-grow-1">
                                <ul className="ml-4" style={{ listStyleType: "square" }}>
                                  <li className="text-white">
                                    {val.categoryName}
                                  </li>
                                </ul>
                              </div>
                              <div class="p-2">
                                <button
                                  onClick={() => this.deleteCategoryinProduct(id, val.id)}
                                  type="button" class="btn btn-warning">Delete</button>
                              </div>
                            </div>
                            {/* <br /> */}
                          </>
                        )
                      })}</span>
                    </h6>
                    <h6>
                      Normal Price:
                      <span style={{ fontWeight: "normal" }}>
                        {" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(price)}
                      </span>
                    </h6>
                    <h6>
                      Stock:
                      <span> {stock} pcs</span>
                    </h6>
                    <h6>
                      Merek:
                      <span> {merek}</span>
                    </h6>
                    <h6>
                      Year:
                      <span> {year}</span>
                    </h6>
                    <h6>
                      Description:
                      <span style={{ fontWeight: "normal" }}>
                        <textarea
                          disabled
                          value={description}
                          style={{ resize: "none" }}
                          placeholder="Description"
                          className="custom-text-input"
                        >
                        </textarea>
                        {/* {description} */}
                      </span>
                    </h6>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center ml-2">
                  <ButtonUI
                    onClick={() => this.editBtnHandler(idx)}
                    type="contained"
                  >
                    Edit Product
                  </ButtonUI>
                  <ButtonUI
                    onClick={() => this.deleteProduct(id)}
                    className="mt-3"
                    type="contained">
                    Delete
                  </ButtonUI>
                </div>
              </div>
            </td>
          </tr>
        </>
      );
    });
  };

  inputHandler = (e, field, form) => {
    let { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  };

  createProductHandler = () => {
    Axios.post(`${API_URL}/products`, this.state.createForm)
      .then((res) => {
        console.log(res.data)
        swal("Good job!", "Ada penambahan Product", "success");
        this.getProductList()
      })
      .catch((err) => {
        console.log(err)
        swal("Gagal!", err.response.data.message, "error");
      })
  }
  createCategoryHandler = () => {
    Axios.post(`${API_URL}/category`, this.state.createCategory)
      .then((res) => {
        console.log(res.data)
        swal("Good job!", "Ada penambahan Category", "success");
        this.getProductList()
        this.getCategoryList()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  createPaketHandler = () => {
    Axios.post(`${API_URL}/paket`, this.state.createPaket)
      .then((res) => {
        console.log(res.data)
        swal("Good job!", "Ada Penambahan Paket", "success");
        this.getPaketList()
      })
      .catch((err) => {
        console.log(err)
        swal("Gagal!", err.response.data.message, "error");
      })
  }
  renderProductName = () => {
    return this.state.productList.map((val) => {
      return (
        <option value={val.id}>{val.productName}</option>
      )
    })
  }
  renderCategoryList = () => {
    return this.state.categoryList.map((val) => {
      return (
        <option value={val.id}>{val.categoryName}</option>
      )
    })
  }
  renderPaketList = () => {
    return this.state.paketList.map((val) => {
      return (
        <option value={val.id}>{val.paketName}</option>
      )
    })
  }
  addCategoryToProductHandler = () => {
    Axios.post(`${API_URL}/products/${this.state.addCategoryToProduct.productName}/category/${this.state.addCategoryToProduct.categoryName}`)
      .then((res) => {
        console.log(res.data)
        swal("Good job!", "Category bertambah ke product", "success");
        this.getProductList()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  addPaketToProductHandler = () => {
    Axios.post(`${API_URL}/products/${this.state.addPaketToProduct.productName}/paket/${this.state.addPaketToProduct.paketName}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // createProductHandler = () => {
  //   Axios.post(`${API_URL}/products`, this.state.createForm)
  //     .then((res) => {
  //       swal("Success!", "Your item has been added to the list", "success");
  //       this.setState({
  //         createForm: {
  //           productName: "",
  //           price: 0,
  //           category: "Phone",
  //           image: "",
  //           description: "",
  //         },
  //       });
  //       this.getProductList();
  //     })
  //     .catch((err) => {
  //       swal("Error!", "Your item could not be added to the list", "error");
  //     });
  // };

  editBtnHandler = (idx) => {
    this.setState({
      editForm: {
        ...this.state.productList[idx],
      },
      modalOpen: true,
    });
  };

  // editProductHandler = () => {
  //   Axios.put(
  //     `${API_URL}/products/${this.state.editForm.id}`,
  //     this.state.editForm
  //   )
  //     .then((res) => {
  //       swal("Success!", "Your item has been edited", "success");
  //       this.setState({ modalOpen: false });
  //       this.getProductList();
  //     })
  //     .catch((err) => {
  //       swal("Error!", "Your item could not be edited", "error");
  //       console.log(err);
  //     });
  // };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  componentDidMount() {
    this.getProductList();
    this.getCategoryList()
    this.getPaketList()
  }
  // renderMerekProduct = () => {
  //   return this.state.productList.map((val)=> {
  //     return <option >{val.merek}</option>
  //   })
  // }

  render() {
    return (
      <div className="container py-4">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Products</h2>
          </caption>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <span>
                  <img style={{ width: "50px" }} src="https://w1.pngwave.com/png/209/91/767/black-friday-icon-cheap-icon-discount-icon-price-icon-reduced-icon-sale-icon-tag-icon-yellow-sticker-png-clip-art.png" alt="" />
                </span>
              </tr>
            </thead>
            <tbody>{this.renderProductList()}</tbody>
          </table>
        </div>
        <div className="dashboard-form-container p-4">
          <caption className="mb-4 mt-2">
            <h2>Add Product</h2>
          </caption>
          <div className="row">
            <div className="col-5">
              <TextField
                value={this.state.createForm.productName}
                placeholder="Product Name"
                onChange={(e) =>
                  this.inputHandler(e, "productName", "createForm")
                }
              />
            </div>
            <div className="col-3">
              <TextField
                value={this.state.createForm.merek}
                placeholder="Merek"
                onChange={(e) =>
                  this.inputHandler(e, "merek", "createForm")
                }
              />
              {/* {this.renderMerekProduct()} */}
            </div>
            <div className="col-4">
              <TextField
                value={this.state.createForm.price}
                placeholder="Price"
                onChange={(e) => this.inputHandler(e, "price", "createForm")}
              />
            </div>
            <div className="col-12 mt-3">
              <textarea
                value={this.state.createForm.description}
                onChange={(e) => this.inputHandler(e, "description", "createForm")}
                style={{ resize: "none" }}
                placeholder="Description"
                className="custom-text-input"
              ></textarea>
            </div>
            <div className="col-8 mt-3">
              <TextField
                value={this.state.createForm.image}
                placeholder="Image Source"
                onChange={(e) => this.inputHandler(e, "image", "createForm")}
              />
            </div>
            <div className="col-2 mt-3">
              <TextField
                value={this.state.createForm.stock}
                placeholder="Stock"
                onChange={(e) => this.inputHandler(e, "stock", "createForm")}
              />
            </div>
            <div className="col-2 mt-3">
              <TextField
                value={this.state.createForm.year}
                placeholder="Year"
                onChange={(e) => this.inputHandler(e, "year", "createForm")}
              />
            </div>
            {/* <div className="col-6 mt-3">
              <select
                value={this.state.createForm.category}
                className="custom-text-input h-100 pl-3"
                onChange={(e) => this.inputHandler(e, "category", "createForm")}
              >
                <option value="Phone">Phone</option>
                <option value="Tab">Tab</option>
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option>
              </select>
            </div> */}
            <div className="col-3 mt-3">
              <ButtonUI onClick={this.createProductHandler} type="contained">
                Create Product
              </ButtonUI>
            </div>
          </div>
        </div>
        <div className="dashboard-form-container p-4">
          <caption className="mb-4 mt-2">
            <h2>Add / Edit / Delete Category</h2>
          </caption>
          <div className="row">
            <div className="col-7">
              <TextField
                value={this.state.createCategory.categoryName}
                placeholder="Category Name"
                onChange={(e) =>
                  this.inputHandler(e, "categoryName", "createCategory")
                }
              />
            </div>
            <div className="col-5 ">
              <ButtonUI
                onClick={this.createCategoryHandler}
                type="contained">
                Add Category
              </ButtonUI>
            </div>
            <div className="col-7 mt-2">
              <TextField
                value={this.state.createPaket.paketName}
                placeholder="Paket Name"
                onChange={(e) =>
                  this.inputHandler(e, "paketName", "createPaket")
                }
              />
            </div>
            <div className="col-5 mt-2">
              <ButtonUI
                onClick={this.createPaketHandler}
                type="contained">
                Add Paket
              </ButtonUI>
            </div>
            <div className="col-12 mt-2 table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Category</th>
                    <th className="text-center" colSpan="2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.getCategoryTable()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="dashboard-form-container p-4">
          <caption className="mb-4 mt-2">
            <h2>Add_Category_To_Product</h2>
          </caption>
          <div className="row">
            <div className="col-6">
              <select
                value={this.state.addCategoryToProduct.productName}
                className="custom-text-input h-100 pl-3"
                onChange={(e) => this.inputHandler(e, "productName", "addCategoryToProduct")}
              >
                <option value=""></option>
                {this.renderProductName()}
              </select>
            </div>
            <div className="col-4">
              <select
                value={this.state.addCategoryToProduct.categoryName}
                className="custom-text-input h-100 pl-3"
                onChange={(e) => this.inputHandler(e, "categoryName", "addCategoryToProduct")}
              >
                {/* <option value="Phone">Phone</option>
                <option value="Tab">Tab</option>
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option> */}
                <option value=""></option>
                {this.renderCategoryList()}
              </select>
            </div>
            <div className="col-3 mt-3">
              <ButtonUI
                onClick={this.addCategoryToProductHandler}
                type="contained">
                Add Category To Product
              </ButtonUI>
            </div>
          </div>
          <caption className="mb-4 mt-2">
            <h2>Add_Paket_To_Product</h2>
          </caption>
          <div className="row">
            <div className="col-6">
              <select
                value={this.state.addPaketToProduct.productName}
                className="custom-text-input h-100 pl-3"
                onChange={(e) => this.inputHandler(e, "productName", "addPaketToProduct")}
              >
                <option value=""></option>
                {this.renderProductName()}
              </select>
            </div>
            <div className="col-4">
              <select
                value={this.state.addPaketToProduct.paketName}
                className="custom-text-input h-100 pl-3"
                onChange={(e) => this.inputHandler(e, "paketName", "addPaketToProduct")}
              >
                {/* <option value="Phone">Phone</option>
                <option value="Tab">Tab</option>
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option> */}
                <option value=""></option>
                {this.renderPaketList()}
              </select>
            </div>
            <div className="col-3 mt-3">
              <ButtonUI
                onClick={this.addPaketToProductHandler}
                type="contained">
                Add Paket To Product
              </ButtonUI>
            </div>
          </div>
        </div>
        <Modal
          toggle={this.toggleModal}
          isOpen={this.state.modalOpen}
          className="edit-modal"
        >
          <ModalHeader toggle={this.toggleModal}>
            <caption>
              <h3>Edit Product</h3>
            </caption>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-8">
                <TextField
                  value={this.state.editForm.productName}
                  placeholder="Product Name"
                  onChange={(e) =>
                    this.inputHandler(e, "productName", "editForm")
                  }
                />
              </div>
              <div className="col-4">
                <TextField
                  value={this.state.editForm.price}
                  placeholder="Price"
                  onChange={(e) => this.inputHandler(e, "price", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <textarea
                  value={this.state.editForm.description}
                  onChange={(e) => this.inputHandler(e, "description", "editForm")}
                  style={{ resize: "none" }}
                  placeholder="Description"
                  className="custom-text-input"
                ></textarea>
              </div>
              <div className="col-6 mt-3">
                <TextField
                  value={this.state.editForm.merek}
                  placeholder="Merek"
                  onChange={(e) => this.inputHandler(e, "merek", "editForm")}
                />
              </div>
              <div className="col-6 mt-3">
                <TextField
                  value={this.state.editForm.year}
                  placeholder="Year"
                  onChange={(e) => this.inputHandler(e, "year", "editForm")}
                />
              </div>
              <div className="col-6 mt-3">
                <TextField
                  value={this.state.editForm.image}
                  placeholder="Image Source"
                  onChange={(e) => this.inputHandler(e, "image", "editForm")}
                />
              </div>
              <div className="col-6 mt-3">
                <TextField
                  value={this.state.editForm.stock}
                  placeholder="Stock"
                  onChange={(e) => this.inputHandler(e, "stock", "editForm")}
                />
              </div>
              <div className="col-12 text-center my-3">
                <img src={this.state.editForm.image} alt="" />
              </div>
              <div className="col-5 mt-3 offset-1">
                <ButtonUI
                  className="w-100"
                  onClick={this.toggleModal}
                  type="outlined"
                >
                  Cancel
                </ButtonUI>
              </div>
              <div className="col-5 mt-3">
                <ButtonUI
                  className="w-100"
                  onClick={() => this.editProductHandler(this.state.editForm.id)}
                  type="contained"
                >
                  Save
                </ButtonUI>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AdminDashboard;

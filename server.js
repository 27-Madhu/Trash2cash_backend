import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./sellform.module.css";
import Img from "../all_image/sell_scarep.png"; // Import your image
import { Link } from "react-router-dom";
const SellForm = () => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState({});

  const handleNext = () => setShowSchedule(true);
  const handlePrevious = () => setShowSchedule(false);
  // Pastic Input Kg
  const [showPlasticBottleInput, setShowPlasticBottleInput] = useState(false);
  const [showMixePlasticInput, setMixPlasticInput] = useState(false);
  const [showHighDensityPlastic, setshowHighDensityPlastic] = useState(false);
  // Metal Input Kg
  const [showMetalAluminum, setShowMetalAluminum] = useState(false);
  const [showCopperInput, setCopperInput] = useState(false);
  const [showSeetlPlastic, setshowSeetlPlastic] = useState(false);

  // Papper Input Kg
  const [showNewspaper, setshowNewspaper] = useState(false);
  const [showOfficepaper, setshowOfficepaper] = useState(false);
  const [showMixpaper, setshowMixpaper] = useState(false);
  // Glass Input Kg
  const [showBeer, setshowBeer] = useState(false);
  const [showmixbottle, setshowmixbottle] = useState(false);

  const toggleSubcategory = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className=" ${style.main}" style={{ marginTop: "7%" }}>
      {/* Contact Us Header */}
      <h3 className="text-success text-center ">
        "Sell Your Scrap – It's Simple and Easy!"
      </h3>
      <hr />
      <div
        className={`row align-items-center justify-content-center ${styles.contactContainer}`}
      >
        <div
          className={`col-lg-5 col-md-12 text-center ${styles.imageContainer}`}
        >
          <img src={Img} alt="Location" className="img-fluid" />
        </div>

        <div className={`col-lg-7 col-md-12 mt-5 ${styles.formContainer}`}>
          <div className={` mb-5 card ${styles.card}`}>
            <form>
              {!showSchedule ? (
                // Item Details
                <div>
                  <h3 className="text-center">Item Details</h3>

                  <div className="mb-3">
                    <label className="form-label">Item Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter item name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Item Image</label>
                    <input
                      type="file"
                      className="form-control"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Item Description</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Enter a brief description"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Item Category</label>

                    <div className="d-flex">
                      {/* Plastic Categories */}
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="plastic"
                          onChange={() => toggleSubcategory("plastic")}
                        />
                        <label className="form-check-label" htmlFor="plastic">
                          Plastic
                        </label>
                        {selectedCategories.plastic && (
                          <div className="ms-4">
                            <div className="form-check d-flex align-items-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="plasticBottle"
                                onChange={(e) =>
                                  setShowPlasticBottleInput(e.target.checked)
                                }
                              />
                              <label
                                className="form-check-label me-2"
                                htmlFor="plasticBottle"
                              >
                                Plastic Bottle
                              </label>
                              {showPlasticBottleInput && (
                                <input
                                  type="number"
                                  className="form-control ms-2"
                                  placeholder="Enter quantity 5KG"
                                  style={{ width: "170px" }}
                                />
                              )}
                            </div>
                            <div className="form-check d-flex align-items-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="Mixeplastic"
                                onChange={(e) =>
                                  setMixPlasticInput(e.target.checked)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Mixeplastic"
                              >
                                Mixed Plastic
                              </label>
                              {showMixePlasticInput && (
                                <input
                                  type="number"
                                  className="form-control ms-2"
                                  placeholder="Enter quantity 5KG"
                                  style={{ width: "170px" }}
                                />
                              )}
                            </div>
                            <div className="form-check d-flex align-items-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="High-Density Plastic"
                                onChange={(e) =>
                                  setshowHighDensityPlastic(e.target.checked)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="High-Density Plastic"
                              >
                                High-Density Plastic
                              </label>
                              {showHighDensityPlastic && (
                                <input
                                  type="number"
                                  className="form-control ms-2"
                                  placeholder="Enter quantity 5KG"
                                  style={{ width: "170px" }}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Metal Categories */}
                      <div className="form-check mx-auto">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="Metal"
                          onChange={() => toggleSubcategory("Metal")}
                        />
                        <label className="form-check-label" htmlFor="Metal">
                          Metal{" "}
                        </label>
                        {selectedCategories.Metal && (
                          <div className="ms-4">
                            <div className="form-check d-flex align-items-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="metalaluminum"
                                onChange={(e) =>
                                  setShowMetalAluminum(e.target.checked)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="metalaluminum"
                              >
                                {" "}
                                Metal Aluminum
                              </label>
                              {showMetalAluminum && (
                                <input
                                  type="number"
                                  className="form-control ms-2"
                                  placeholder="Enter quantity 5KG"
                                  style={{ width: "170px" }}
                                />
                              )}
                            </div>
                            <div className="form-check d-flex align-items-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="copper"
                                onChange={(e) =>
                                  setCopperInput(e.target.checked)
                                }
                              />
                              <label
                                className="form-check-label  "
                                htmlFor="copper"
                              >
                                Copper
                              </label>
                              {showCopperInput && (
                                <input
                                  type="number"
                                  className="form-control ms-2"
                                  placeholder="Enter quantity 5KG"
                                  style={{ width: "170px" }}
                                />
                              )}
                            </div>
                            <div className="form-check d-flex align-items-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="copper"
                                onChange={(e) =>
                                  setshowSeetlPlastic(e.target.checked)
                                }
                              />
                              <label className="form-check-label">Seetl</label>
                              {showSeetlPlastic && (
                                <input
                                  type="number"
                                  className="form-control ms-2"
                                  placeholder="Enter quantity 5KG"
                                  style={{ width: "170px" }}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="d-flex">
                      {/* Paper Categories */}
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="paper"
                          onChange={() => toggleSubcategory("paper")}
                        />
                        <label className="form-check-label" htmlFor="paper">
                          Paper
                        </label>
                        {selectedCategories.paper && (
                          <div className="ms-4">
                            <div className="form-check d-flex algin-item-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="newpapper"
                                onChange={(e) =>
                                  setshowNewspaper(e.target.checked)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="newpapper"
                              >
                                Newspaper
                              </label>
                              {showNewspaper && (
                                <input
                                  type="number"
                                  className="form-control ms-2"
                                  placeholder="Enter quantity 5KG"
                                  style={{ width: "170px" }}
                                />
                              )}
                            </div>
                            <div className="form-check d-flex algin-item-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="Officepapper"
                                onChange={(e) =>
                                  setshowOfficepaper(e.target.checked)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Officepapper"
                              >
                                Office paper{" "}
                              </label>
                              {showOfficepaper && (
                                <input
                                  type="number"
                                  className="form-control ms-2"
                                  placeholder="Enter quantity 5KG"
                                  style={{ width: "170px" }}
                                />
                              )}
                            </div>
                            <div className="form-check d-flex algin-item-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="Mixpaper"
                                onChange={(e) =>
                                  setshowMixpaper(e.target.checked)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Mixpaper"
                              >
                                Mix paper{" "}
                              </label>
                              {showMixpaper && (
                                <input
                                  type="number"
                                  className="form-control ms-2"
                                  placeholder="Enter quantity 5KG"
                                  style={{ width: "170px" }}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Glass Categories */}
                      <div className="form-check mx-auto">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="glass"
                          onChange={() => toggleSubcategory("glass")}
                        />
                        <label className="form-check-label" htmlFor="glass">
                          Glass
                        </label>
                        {selectedCategories.glass && (
                          <div className="ms-4">
                            <div className="form-check d-flex algin-item-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="beer"
                                onChange={(e) => setshowBeer(e.target.checked)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="beer"
                              >
                                Beer Bottle Glass
                              </label>
                              {showBeer && (
                                <input
                                  type="number"
                                  className="form-control ms-2"
                                  placeholder="Enter quantity 5KG"
                                  style={{ width: "170px" }}
                                />
                              )}
                            </div>
                            <div className="form-check d-flex algin-item-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="mixglass"
                                onChange={(e) =>
                                  setshowmixbottle(e.target.checked)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="mixglass"
                              >
                                Mix Glass{" "}
                              </label>
                              {showmixbottle && (
                                <input
                                  type="number"
                                  className="form-control ms-2"
                                  placeholder="Enter quantity 5KG"
                                  style={{ width: "170px" }}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-3">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                // Schedule Your Pickup

                <div>
                  <h3 className="text-success text-center">
                    Schedule Your Pickup
                  </h3>
                  <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contact Number</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter your contact number"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Full Address</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter full address (House No, Street, Locality)"
                      required
                    ></textarea>
                  </div>
                  <div className="d-flex">
                    <div className="mb-3">
                      <label className="form-label">Select City</label>
                      <select className="form-select" required>
                        <option value="Patna">Patna</option>
                        <option value="siwan">Siwan</option>
                        <option value="chhapra">Chhapra</option>
                        <option value="muz">Muzaffarpur</option>
                      </select>
                    </div>
                    <div className="mb-3 ms-5">
                      <label className="form-label">Pincode</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter your pincode"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Nearest Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="E.g., Near XYZ Mall, Opposite ABC Park"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-warning me-2"
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                  <div className="picup mt-3 ">
                    <button
                      type="submit"
                      style={{
                        width: "250px",
                        marginLeft: "35%",
                        fontSize: "20px",
                      }}
                      className="btn btn-success"
                    >
                      {" "}
                      Pickup Request
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellForm;

SellForm.jsx;












  {/* Plastic Categories */}
  <div className="form-check">
  <input
    type="checkbox"
    className="form-check-input"
    id="plastic"
    onChange={() => toggleSubcategory("plastic")}
  />
  <label className="form-check-label" htmlFor="plastic">
    Plastic
  </label>
  {selectedCategories.plastic && (
    <div className="ms-4">
      <div className="form-check d-flex align-items-center">
        <input
          type="checkbox"
          className="form-check-input"
          checked={plasticBottleChecked}
          onChange={(e) =>
            setPlasticBottleChecked(e.target.checked)
          }
        />
        <label
          className="form-check-label me-2"
          htmlFor="plasticBottle"
        >
          Plastic Bottle
        </label>
        {plasticBottleChecked && (
          <input
            type="number"
            placeholder="Quantity"
            value={plasticBottleQty}
            onChange={(e) =>
              setPlasticBottleQty(e.target.value)
            }
            className="form-control ms-2"
            style={{ width: "170px" }}
            required
          />
        )}
      </div>

      <div className="form-check d-flex align-items-center">
        
          <input
            type="checkbox"
            className="form-check-input"
            checked={mixedPlasticChecked}
            onChange={(e) =>
              setMixedPlasticChecked(e.target.checked)
            }
          />
          <label
          className="form-check-label"
          htmlFor="Mixeplastic"
        >
          Mixed Plastic
        </label>
        {mixedPlasticChecked && (
          <input
            type="number"
            placeholder="Quantity"
            value={mixedPlasticQty}
            onChange={(e) =>
              setMixedPlasticQty(e.target.value)
            }
            className="form-control ms-2"
            style={{ width: "170px" }}
            required
          />
        )}
      </div>

      <div className="form-check d-flex align-items-center">
        
          <input
            type="checkbox"
            className="form-check-input"
            checked={hdPlasticChecked}
            onChange={(e) =>
              setHdPlasticChecked(e.target.checked)
            }
          />
           <label
          className="form-check-label"
          htmlFor="High-Density Plastic"
        >
          High-Density Plastic
        </label>
        {hdPlasticChecked && (
          <input
            type="number"
            placeholder="Quantity"
            value={hdPlasticQty}
            onChange={(e) =>
              setHdPlasticQty(e.target.value)
            }
            className="form-control ms-2"
            style={{ width: "170px" }}
            required
          />
        )}
      </div>
    </div>
  )}
</div>
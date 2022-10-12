import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  FloatingLabel,
  Image,
  Container,
} from "react-bootstrap";
import alkNoDesc from "./resources/logos/alkohol-znak-bez-hasla.png";
import alkDescBottom from "./resources/logos/alkohol-znak-haslo-pod-spodem.png";
import alkDescRight from "./resources/logos/alkohol-znak-haslo-z-boku.png";
import noAlkNoDesc from "./resources/logos/bezalkohol-znak-bez-hasla.png";
import noAlkDescBottom from "./resources/logos/bezalkohol-znak-haslo-pod-spodem.png";
import noAlkDescRight from "./resources/logos/bezalkohol-znak-haslo-z-boku.png";

function App() {
  const [beerType, setBeerType] = useState("");
  const [bottleType, setBottleType] = useState("");
  const [logoType, setLogoType] = useState("");
  const [labelWidth, setLabelWidth] = useState(0);
  const [labelHeight, setLabelHeight] = useState(0);
  const [labelUnit, setLabelUnit] = useState("");
  const [percentage, setPercentage] = useState(0);

  const alcLogoMap = {
    "Znak bez hasła": alkNoDesc,
    "Znak z prawej strony": alkDescRight,
    "Znak z hasłem pod spodem": alkDescBottom,
  };

  const unitMap = {
    "Materiały POS": "mm",
    "Opakowania jednostkowe": "mm",
    "Opakowania zbiorcze": "mm",
    "Spoty reklamowe": "px",
    "Internet / Social Media": "px",
  };

  const freeLogoMap = {
    "Znak bez hasła": noAlkNoDesc,
    "Znak z prawej strony": noAlkDescRight,
    "Znak z hasłem pod spodem": noAlkDescBottom,
  };

  const selectLogoList =
    beerType === "Piwa alkoholowe" ? alcLogoMap : freeLogoMap;

  const beerTypesList = ["Piwa alkoholowe", "Piwa bezalkoholowe"];
  const bottleTypesListA = [
    "Opakowania jednostkowe",
    "Opakowania zbiorcze",
    "Spoty reklamowe",
    "Materiały POS",
    "Internet / Social Media",
  ];
  const bottleTypesListB = ["Opakowania jednostkowe", "Opakowania zbiorcze"];
  const bottleTypesList =
    beerType === "Piwa alkoholowe" ? bottleTypesListA : bottleTypesListB;
  const logoTypesList = [
    "Znak z hasłem pod spodem",
    "Znak bez hasła",
    "Znak z prawej strony",
  ];
  const unitsList = ["cm", "px", "mm"];

  let surfaceArea = labelWidth * labelHeight;

  useEffect(() => {
    switch (logoType) {
      case "Znak z hasłem pod spodem":
        setPercentage(3.7);
        break;
      case "Znak bez hasła":
        setPercentage(3.5);
        break;
      case "Znak z prawej strony":
        setPercentage(5);
        break;
      default:
    }
    if (
      beerType === "Piwa bezalkoholowe" &&
      bottleType === "Opakowania zbiorcze"
    ) {
      setPercentage(1.71);
    }
    setLabelUnit(unitMap[bottleType]);
  }, [logoType, beerType, bottleType]);

  return (
    <>
      <Container className="mt-5 pt-5">
        <Form>
          <Row className="d-flex justify-content-center">
            <Col className="">
              <Form.Group className="mb-4">
                <Form.Label className="mb-2">
                  Wybierz rodzaj piwa i nośnik, którego dotyczy komunikacja
                </Form.Label>
                <Form.Select
                  id="beer_type"
                  onChange={(e) => setBeerType(e.target.value)}
                  defaultValue="0"
                >
                  <option value="0">---</option>
                  {beerTypesList.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Select
                  id="bottle_type"
                  onChange={(e) => setBottleType(e.target.value)}
                  defaultValue="0"
                >
                  <option value="0">---</option>
                  {bottleTypesList.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-4">
                <Form.Label className="">
                  Wybierz rodzaj znaku, który chcesz zastosować
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Select
                  id="beer_type"
                  onChange={(e) => setLogoType(e.target.value)}
                  defaultValue="0"
                >
                  <option value="0">---</option>
                  {logoTypesList.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Row className="d-flex text-center mt-3">
                <Col>
                  <Image
                    src={selectLogoList[logoType]}
                    style={{ zoom: ".3" }}
                  />
                </Col>
              </Row>
            </Col>

            <Col>
              <Row>
                <Form.Label className="mb-2">
                  Wpisz pole powierzni nośnika, na którym stosujesz znak
                </Form.Label>
                <Col xl={6} md={6} sm={6}>
                  <Form.Group id="width" className="mb-4">
                    <FloatingLabel label="Szerokość">
                      <Form.Control
                        value={labelWidth}
                        type="number"
                        placeholder="szerokość"
                        onChange={(e) => setLabelWidth(e.target.value)}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col xl={6} md={6} sm={6}>
                  <Form.Group id="height" className="mb-4">
                    <FloatingLabel label="Wysokość">
                      <Form.Control
                        value={labelHeight}
                        type="number"
                        placeholder="Przeznaczenie wagonu"
                        onChange={(e) => setLabelHeight(e.target.value)}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col xl={6} md={6} sm={6}>
                  <Form.Group id="height" className="mb-4">
                    <FloatingLabel label="Jednostka">
                      <Form.Select
                        id="label_unit"
                        onChange={(e) => setLabelUnit(e.target.value)}
                        defaultValue={labelUnit}
                      >
                        <option value={labelUnit}>{labelUnit}</option>
                        {unitsList.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        <Row className="d-flex justify-content-center text-center mt-5">
          <Col xl={2} md={2} sm={5}>
            <span>Szerokość: {labelWidth}</span>
          </Col>
          <Col xl={2} md={2} sm={5}>
            <span>Wysokość: {labelHeight}</span>
          </Col>
          <Col xl={2} md={2} sm={5}>
            <span>pole {surfaceArea}</span>
          </Col>
          <Col xl={2} md={2} sm={5}>
            <span>
              {percentage}% pola ={" "}
              {Math.round((percentage / 100) * surfaceArea * 100) / 100}{" "}
              {labelUnit}
            </span>
          </Col>
          <Col xl={2} md={2} sm={5}>
            <span>
              {percentage}% szerokości ={" "}
              {Math.round((percentage / 100) * labelWidth * 100) / 100}{" "}
              {labelUnit}
            </span>
          </Col>
          <Col xl={2} md={2} sm={5}>
            <span>
              {percentage}% wysokości ={" "}
              {Math.round((percentage / 100) * labelHeight * 100) / 100}{" "}
              {labelUnit}
            </span>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

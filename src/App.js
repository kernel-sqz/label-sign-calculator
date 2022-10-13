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
  const [switchUnits, setSwitchUnits] = useState(null);

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
  let percentageOfSurfaceArea =
    Math.round((percentage / 100) * surfaceArea * 100) / 100;

  const doTheMath = () => {
    const proportionsAlk = {
      "Znak bez hasła": 2.92,
      "Znak z prawej strony": 5.78,
      "Znak z hasłem pod spodem": 2.18,
    };
    const proportionsNoAlk = {
      "Znak bez hasła": 1,
      "Znak z prawej strony": 1,
      "Znak z hasłem pod spodem": 1,
    };
    const selectProportions =
      beerType === "Piwa alkoholowe" ? proportionsAlk : proportionsNoAlk;

    let perimeter =
      Math.round((percentage / 100) * labelWidth * 100) / 100 +
      Math.round((percentage / 100) * labelHeight * 100) / 100;

    let a = 1 * 2;
    let b = perimeter / a + 2 * selectProportions[logoType];

    let finalA = percentageOfSurfaceArea / b;

    if (
      beerType === "Piwa bezalkoholowe" &&
      logoType === "Znak z hasłem pod spodem"
    ) {
      return {
        width: (Math.sqrt(percentageOfSurfaceArea) * 1.36).toFixed(4),
        height: (Math.sqrt(percentageOfSurfaceArea) * 2.87).toFixed(4),
      };
    } else if (
      beerType === "Piwa bezalkoholowe" &&
      logoType === "Znak bez hasła"
    ) {
      return {
        width: Math.sqrt(percentageOfSurfaceArea).toFixed(4),
        height: Math.sqrt(percentageOfSurfaceArea).toFixed(4),
      };
    } else if (
      beerType === "Piwa bezalkoholowe" &&
      logoType === "Znak z prawej strony"
    ) {
      return {
        width: Math.sqrt(percentageOfSurfaceArea).toFixed(4),
        height: (Math.sqrt(percentageOfSurfaceArea) * 3.82).toFixed(4),
      };
    } else {
      return {
        width: b.toFixed(4),
        height: finalA.toFixed(4),
      };
    }
  };

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
      (beerType === "Piwa bezalkoholowe" &&
        bottleType === "Opakowania zbiorcze") ||
      (beerType === "Piwa bezalkoholowe" && logoType === "Znak bez hasła")
    ) {
      setPercentage(1.71);
    }
    setLabelUnit(unitMap[bottleType]);
    if (labelUnit == "mm") {
      setSwitchUnits(
        <span>
          wynik = {doTheMath().width}
          {labelUnit} x {doTheMath().height}
          {labelUnit}
        </span>
      );
    }
    if (labelUnit == "cm") {
      setSwitchUnits(
        <span>
          wynik = {(doTheMath().width / 10).toFixed(4)}
          {labelUnit} x {(doTheMath().height / 10).toFixed(4)}
          {labelUnit}
        </span>
      );
    }
  }, [logoType, beerType, bottleType, labelUnit]);
  console.log(labelUnit);

  const parsedLabelWidth =
    labelUnit === "cm" ? (labelWidth / 10).toFixed(4) : labelWidth;
  const parsedLabelHeight =
    labelUnit === "cm" ? (labelHeight / 10).toFixed(4) : labelHeight;
  const parsedArea =
    labelUnit === "cm" ? (surfaceArea / 10).toFixed(4) : surfaceArea;
  const parsedPercentageArea =
    labelUnit === "cm"
      ? (percentageOfSurfaceArea / 10).toFixed(4)
      : percentageOfSurfaceArea;

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
                      >
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
            <span>
              Szerokość: {parsedLabelWidth} {labelUnit}
            </span>
          </Col>
          <Col xl={2} md={2} sm={5}>
            <span>
              Wysokość: {parsedLabelHeight} {labelUnit}
            </span>
          </Col>
          <Col xl={2} md={2} sm={5}>
            <span>
              pole {parsedArea} {labelUnit}²
            </span>
          </Col>
          <Col xl={2} md={2} sm={5}>
            <span>
              {percentage}% pola = {parsedPercentageArea} {labelUnit}²
            </span>
          </Col>

          <Col xl={4} md={4} sm={10}>
            {switchUnits}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

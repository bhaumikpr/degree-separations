import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import AddPersonForm from "./components/AddPersonForm";
import CardLayout from "./components/CardLayout";
import Header from "./components/Header";
import TwoPersonInputForm from "./components/TwoPersonInputForm";

function App() {
  const addPerson = ({ name }: { name: string }) => {
    console.log(name, "name");
  };
  const addRelation = ({
    person1,
    person2,
  }: {
    person1: string;
    person2: string;
  }) => {};
  const findDegreeOfSeparation = ({
    person1,
    person2,
  }: {
    person1: string;
    person2: string;
  }) => {};

  return (
    <div>
      <Container>
        <Header />
        <Row>
          <Col>
            <CardLayout>
              <Card.Title>Person</Card.Title>
              <AddPersonForm onSubmit={addPerson} />

              <Card.Title>Relation</Card.Title>
              <TwoPersonInputForm onSubmit={addRelation} submitBtnName="Add" />

              <Card.Title>Degree of Separation</Card.Title>
              <TwoPersonInputForm
                onSubmit={findDegreeOfSeparation}
                submitBtnName="Find"
              />
            </CardLayout>
          </Col>
          <Col>Result</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

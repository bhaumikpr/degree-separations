import React, { useEffect, useState, useMemo } from "react";
import { Card, Col, Container, Row, Badge } from "react-bootstrap";
import "./App.css";
import AddPersonForm from "./components/AddPersonForm";
import CardLayout from "./components/CardLayout";
import DisplayNode from "./components/DisplayNode";
import Header from "./components/Header";
import TwoPersonInputForm from "./components/TwoPersonInputForm";
import Graph from "./utils/graph";
import Node from "./utils/node";

function App() {
  const graph = useMemo(() => new Graph(), []);

  const [persons, setPersons] = useState([
    { id: 1, name: "Sameer" },
    { id: 2, name: "Aayushi" },
    { id: 3, name: "Bhaskar" },
    { id: 4, name: "Kamalnath Sharma" },
    { id: 5, name: "Shanti Kumar Saha" },
  ]);

  const [relations, setRelations] = useState([
    { id: 1, person1: 1, person2: 2 },
    { id: 2, person1: 2, person2: 3 },
    { id: 3, person1: 1, person2: 4 },
    { id: 4, person1: 4, person2: 5 },
  ]);

  const [displayFriendsList, setDisplayFriendsList] = useState<JSX.Element[]>(
    []
  );

  const [separation, setSeparation] = useState<Node[][]>([]);

  useEffect(() => {
    graph.addVertex(persons[0].name);
    graph.addVertex(persons[1].name);
    graph.addVertex(persons[2].name);
    graph.addVertex(persons[3].name);
    graph.addVertex(persons[4].name);

    // graph.addVertex(2);

    graph.addEdge(persons[0].name, persons[1].name);
    graph.addEdge(persons[1].name, persons[2].name);
    graph.addEdge(persons[0].name, persons[3].name);
    graph.addEdge(persons[3].name, persons[4].name);
    graph.addEdge(persons[4].name, persons[2].name);

    console.log(graph.findAllPaths(persons[0].name, persons[2].name));
  }, []);

  const addPerson = ({ name }: { name: string }) => {
    let newPerson = { id: persons.length + 1, name };
    setPersons([...persons, newPerson]);
    graph.addVertex(newPerson.name);
  };

  const addRelation = ({
    person1,
    person2,
  }: {
    person1: string;
    person2: string;
  }) => {
    const person1Temp = persons.find((person) => person.name === person1);
    const person2Temp = persons.find((person) => person.name === person2);

    if (!person1Temp || !person2Temp) {
      return;
    }
    const result = graph.addEdge(person1, person2);
    console.log(result, "result");

    setRelations([
      ...relations,
      {
        id: relations.length + 1,
        person1: person1Temp.id,
        person2: person2Temp.id,
      },
    ]);
  };

  const findDegreeOfSeparation = ({
    person1,
    person2,
  }: {
    person1: string;
    person2: string;
  }) => {
    const allPaths = graph.findAllPaths(person1, person2);
    setSeparation(allPaths);
  };

  useEffect(() => {
    const list = [];
    for (const personIter of graph.nodes.values()) {
      const personDiv = (
        <div key={personIter.value}>
          <DisplayNode node={personIter} />
          {personIter.adjacents.length > 0 && <span> is friend with </span>}
          {personIter.adjacents.map((node) => (
            <DisplayNode key={node.value} node={node} />
          ))}
        </div>
      );
      list.push(personDiv);
    }
    setDisplayFriendsList(list);
  }, [relations, persons, graph.nodes]);

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
              <TwoPersonInputForm
                persons={persons}
                onSubmit={addRelation}
                submitBtnName="Add"
              />

              <Card.Title>Degree of Separation</Card.Title>
              <TwoPersonInputForm
                persons={persons}
                onSubmit={findDegreeOfSeparation}
                submitBtnName="Find"
              />
            </CardLayout>
          </Col>
          <Col>
            <CardLayout>
              <div className="text-start">
                <Card.Title>Persons</Card.Title>
                {displayFriendsList}
                <Card.Title className="mt-5">Degree of Separation</Card.Title>
                {separation.map((path, i) => {
                  return (
                    <div key={i}>
                      <Badge>{i}</Badge>
                      {path.map((node) => {
                        return <DisplayNode key={node.value} node={node} />;
                      })}
                    </div>
                  );
                })}
              </div>
            </CardLayout>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

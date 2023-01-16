import React, { useEffect, useState, useMemo } from "react";
import { Card, Col, Container, Row, Badge } from "react-bootstrap";
import "./App.css";
import AddPersonForm from "./components/AddPersonForm";
import CardLayout from "./components/CardLayout";
import DisplayNode from "./components/DisplayNode";
import Header from "./components/Header";
import TwoPersonInputForm from "./components/TwoPersonInputForm";
import { AddRelation } from "./types";
import Graph from "./utils/graph";
import { initGraphData, initPersons, initRelations } from "./utils/init";
import Node from "./utils/node";

function App() {
  const graph = useMemo(() => new Graph(), []);

  const [persons, setPersons] = useState(initPersons);

  const [relations, setRelations] = useState(initRelations);

  const [displayFriendsList, setDisplayFriendsList] = useState<JSX.Element[]>(
    []
  );

  const [separation, setSeparation] = useState<Node[][]>([]);

  useEffect(() => {
    initGraphData(graph, persons, relations);
    // console.log(graph.findAllPaths(persons[0].name, persons[2].name));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addPerson = ({ name }: { name: string }) => {
    graph.addVertex(name);
    const newPersons = [...persons, { id: persons.length + 1, name }];
    setPersons(newPersons);
  };

  const addRelation = ({ person1, person2 }: AddRelation) => {
    const person1Temp = persons.find((person) => person.name === person1);
    const person2Temp = persons.find((person) => person.name === person2);

    if (!person1Temp || !person2Temp) {
      return;
    }

    graph.addEdge(person1, person2);
    const newRelations = [
      ...relations,
      {
        id: relations.length + 1,
        person1: person1Temp.id,
        person2: person2Temp.id,
      },
    ];

    setRelations(newRelations);
  };

  const findDegreeOfSeparation = ({ person1, person2 }: AddRelation) => {
    const allPaths = graph.findAllPaths(person1, person2);
    setSeparation(allPaths);
  };

  useEffect(() => {
    localStorage.setItem("persons", JSON.stringify(persons));
    localStorage.setItem("relations", JSON.stringify(relations));
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

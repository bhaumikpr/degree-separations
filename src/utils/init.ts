import { Person, Relation } from "../types";
import Graph from "./graph";

const personData = [
    { id: 1, name: "Sameer" },
    { id: 2, name: "Aayushi" },
    { id: 3, name: "Bhaskar" },
    { id: 4, name: "Kamalnath Sharma" },
    { id: 5, name: "Shanti Kumar Saha" },
]

const relationData = [
    { id: 1, person1: 1, person2: 2 },
    { id: 2, person1: 2, person2: 3 },
    { id: 3, person1: 1, person2: 4 },
    { id: 4, person1: 4, person2: 5 },
]

export const initGraphData = (graph: Graph, persons: Person[], relations: Relation[]): void => {
    const lookupTable: { [index: number]: Person } = {}
    for (let i = 0; i < persons.length; i++) {
        lookupTable[persons[i].id] = persons[i]
        graph.addVertex(persons[i].name)
    }

    for (const relation of relations) {
        graph.addEdge(lookupTable[relation.person1].name, lookupTable[relation.person2].name)
    }
}

export const initPersons = () => {
    const saved = localStorage.getItem('persons')
    if (saved) {
        return JSON.parse(saved) as Person[]
    }
    return personData
}

export const initRelations = () => {
    const saved = localStorage.getItem('relations')
    if (saved) {
        return JSON.parse(saved) as Relation[]
    }
    return relationData
}



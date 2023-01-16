export type Person = {
    id: number
    name: string
}

export type Relation = {
    id: number
    person1: number
    person2: number
}

export type AddRelation = {
    person1: string
    person2: string
}
import {Storage} from "./storage";
export class Project{
    constructor(name) {
        this.id = `project_${crypto.randomUUID()}`
        this.name = name
        this.todos = []
    }

}
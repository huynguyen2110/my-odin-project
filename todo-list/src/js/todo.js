export class Todo{
    constructor(name, description, date, priority, projectId) {
        this.id = `todo_${crypto.randomUUID()}`
        this.name = name
        this.description = description
        this.date = date
        this.priority = priority
        this.projectId = projectId
        this.cheked = false
    }


}
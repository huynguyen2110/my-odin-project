export class Project {
  constructor(name) {
    // eslint-disable-next-line no-undef
    this.id = `project_${crypto.randomUUID()}`;
    this.name = name;
    this.todos = [];
  }
}

import { column, Schema, Table } from "@powersync/web";

export const MILESTONES_TABLE = "milestones";
export const PROJECTS_TABLE = "projects";

const milestones = new Table(
  {
    title: column.text,
    company: column.text,
    date: column.text,
    description: column.text,
    type: column.text,
    distance: column.integer,
  },
  { indexes: {} }
);

const projects = new Table(
  {
    title: column.text,
    description: column.text,
    image: column.text,
    tech_stack: column.text,
    github_link: column.text,
    live_link: column.text,
    order: column.integer,
  },
  { indexes: {} }
);

export const AppSchema = new Schema({
  [MILESTONES_TABLE]: milestones,
  [PROJECTS_TABLE]: projects,
});

export type Database = (typeof AppSchema)["types"];

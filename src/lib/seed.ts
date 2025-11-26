import { AbstractPowerSyncDatabase } from "@powersync/web";
import { MILESTONES_TABLE, PROJECTS_TABLE } from "./schema";
import { v4 as uuidv4 } from "uuid";

export async function seedDatabase(db: AbstractPowerSyncDatabase) {
  const milestonesResult = await db.getAll(`SELECT * FROM ${MILESTONES_TABLE}`);
  const projectsResult = await db.getAll(`SELECT * FROM ${PROJECTS_TABLE}`);

  if (milestonesResult.length > 0 && projectsResult.length > 0) return;

  console.log("Seeding Adzan's Resume...");

  const resumeData = [
    {
      title: "Bachelor of Informatics Engineering",
      company: "Catur Insan Cendekia University",
      date: "Sep 2020 - Sep 2024",
      description: "GPA: 3.77.",
      type: "education",
      distance: 35,
    },
    {
      title: "Junior Front End Developer",
      company: "Habibi Garden",
      date: "Jun 2022 - Oct 2022",
      description:
        "Built landing pages and processed API data into graphical forms.",
      type: "work",
      distance: 55,
    },
    {
      title: "Web Programmer Intern",
      company: "Diskominfo Kota Tasikmalaya",
      date: "Sep 2023 - Oct 2024",
      description:
        "Built Helpdesk TIK (CodeIgniter4) and JDIH websites (Laravel).",
      type: "work",
      distance: 75,
    },
    {
      title: "Independent Study Mentee",
      company: "Alterra Academy (MBKM)",
      date: "2023",
      description: "Complete Front-End Engineer Career with ReactJS course.",
      type: "education",
      distance: 95,
    },
    {
      title: "Frontend Dev",
      company: "Ready to work",
      date: "2025+",
      description:
        "Had experience in Html, CSS, Javascript,ReactJS,PHP,Laravel and Beginner in Next.js and typescript, eager to learn and grow.",
      type: "future",
      distance: 110,
    },
  ];

  if (milestonesResult.length === 0) {
    for (const item of resumeData) {
      await db.execute(
        `INSERT INTO ${MILESTONES_TABLE} (id, title, company, date, description, type, distance) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          uuidv4(),
          item.title,
          item.company,
          item.date,
          item.description,
          item.type,
          item.distance,
        ]
      );
    }
  }

  const projectsData = [
    {
      title: "Banabams",
      description: "E-commerce platform for local products with modern UI/UX",
      image: "/project/banabams.png",
      tech_stack: "React, firebase, bootstrap",
      github_link: "",
      live_link: "",
      order: 1,
    },
    {
      title: "Helpdesk TIK",
      description:
        "IT helpdesk management system for Diskominfo Kota Tasikmalaya",
      image: "/project/helpdesk.png",
      tech_stack: "CodeIgniter 4, Bootstrap, MySQL",
      github_link: "",
      live_link: "",
      order: 2,
    },
    {
      title: "JDIH Website",
      description: "Legal documentation and information system website",
      image: "/project/jdih.png",
      tech_stack: "Laravel, Tailwind CSS, MySQL",
      github_link: "",
      live_link: "",
      order: 3,
    },
  ];

  if (projectsResult.length === 0) {
    for (const project of projectsData) {
      await db.execute(
        `INSERT INTO ${PROJECTS_TABLE} (id, title, description, image, tech_stack, github_link, live_link, \`order\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          uuidv4(),
          project.title,
          project.description,
          project.image,
          project.tech_stack,
          project.github_link,
          project.live_link,
          project.order,
        ]
      );
    }
  }
}

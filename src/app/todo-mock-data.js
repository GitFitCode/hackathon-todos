/* 
 * Let's stick with a school theme for mock data
 *
 * From Design Doc:
 * - Required
 *     - Name - Require
 * - Optional
 *     - isUrgent
 *     - isImportant
 *     - [2] due date
 *     - [2] task description
 *     - isCompleted
 */


//mockData is written in JSON format bc that is the most likely method we'll use once we start with a database
//mockData is an array of objects where each object is a todo
//mockData is one person's todos 
const mockData = [
  {
    "name": "Complete mock data creation",
    "urgent": true,
    "important": true,
    "completed": false
  },
  {
    "name": "History Homework Ch. 12",
    "urgent": false,
    "important": true,
    "completed": false
  },
  {
    "name": "fill out study planner",
    "urgent": true,
    "important": false,
    "completed": true
  },
  {
    "name": "talk to Erica at lunch for robotics",
    "urgent": false,
    "important": false,
    "completed": false
  },
  {
    "name": "English essay on ATOTC",
    "urgent": false,
    "important": true,
    "completed": false
  },
  {
    "name": "proofread and edit essay",
    "urgent": false,
    "important": true,
    "completed": false
  },
  {
    "name": "AP Chemistry insulating material scavenge",
    "urgent": false,
    "important": false,
    "completed": true
  },
  {
    "name": "Study potential vs kinetic energy",
    "urgent": false,
    "important": false,
    "completed": false
  },
  {
    "name": "complete linked list coding assignment",
    "urgent": true,
    "important": false,
    "completed": false
  },
  {
    "name": "Study for Friday quiz",
    "urgent": false,
    "important": true,
    "completed": false
  },
];

export default mockData;

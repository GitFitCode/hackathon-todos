/* 
 * Let's stick with a school theme for mock data
 *
 * From Design Doc:
 * - Required
 *     - Name
 * - Optional
 *     - isUrgent
 *     - isImportant
 *     - isCompleted
 *     - [2] due date
 *     - [2] task description
 */


//mockData is written in JSON format bc that is the most likely method we'll use once we start with a database
//mockData is an array of objects where each object is a todo
//mockData is one person's todos 
const mockData = [
  {
    "name": "Complete mock data creation",
    "isUrgent": true,
    "isImportant": true,
    "isCompleted": false,
    "description": "Almost all done, asymptotically"
  },
  {
    "name": "History Homework Ch. 12",
    "isUrgent": false,
    "isImportant": true,
    "isCompleted": false,
    "description": "Review WWI and Franz Ferdinand's vehicle's make and model."
  },
  {
    "name": "fill out study planner",
    "isUrgent": true,
    "isImportant": false,
    "isCompleted": true,
    "description": ""
  },
  {
    "name": "talk to Erica at lunch for robotics",
    "isUrgent": false,
    "isImportant": false,
    "isCompleted": false,
    "description": ""
  },
  {
    "name": "English essay on ATOTC",
    "isUrgent": false,
    "isImportant": true,
    "isCompleted": false,
    "description": ""
  },
  {
    "name": "proofread and edit essay",
    "isUrgent": false,
    "isImportant": true,
    "isCompleted": false,
    "description": ""
  },
  {
    "name": "AP Chemistry insulating material scavenge",
    "isUrgent": false,
    "isImportant": false,
    "isCompleted": true,
    "description": ""
  },
  {
    "name": "Study potential vs kinetic energy",
    "isUrgent": false,
    "isImportant": false,
    "isCompleted": false,
    "description": ""
  },
  {
    "name": "complete linked list coding assignment",
    "isUrgent": true,
    "isImportant": false,
    "isCompleted": false,
    "description": ""
  },
  {
    "name": "Study for Friday quiz",
    "isUrgent": false,
    "isImportant": true,
    "isCompleted": false,
    "description": ""
  },
];

export default mockData;

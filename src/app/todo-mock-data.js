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
    "description": "Almost all done, asymptotically",
    "createdDate": 1609712291000
  },
  {
    "name": "History Homework Ch. 12",
    "isUrgent": false,
    "isImportant": true,
    "isCompleted": false,
    "description": "Review WWI and Franz Ferdinand's vehicle's make and model.",
    "createdDate": 1615673891000
  },
  {
    "name": "fill out study planner",
    "isUrgent": true,
    "isImportant": false,
    "isCompleted": true,
    "description": "",
    "createdDate": 1609712291000,
    "completedDate": 1615673891000
  },
  {
    "name": "talk to Erica at lunch for robotics",
    "isUrgent": false,
    "isImportant": false,
    "isCompleted": false,
    "description": "",
    "createdDate": 1614637091000,
  },
  {
    "name": "English essay on ATOTC",
    "isUrgent": false,
    "isImportant": true,
    "isCompleted": false,
    "description": "",
    "createdDate": 1614688091000,
  },
  {
    "name": "proofread and edit essay",
    "isUrgent": false,
    "isImportant": true,
    "isCompleted": false,
    "description": "",
    "createdDate": 1611958691000,
  },
  {
    "name": "AP Chemistry insulating material scavenge",
    "isUrgent": false,
    "isImportant": false,
    "isCompleted": true,
    "description": "",
    "createdDate": 1609539491000,
    "completedDate": 1614032291000
  },
  {
    "name": "Study potential vs kinetic energy",
    "isUrgent": false,
    "isImportant": false,
    "isCompleted": false,
    "description": "",
    "createdDate": 1611181091000,
  },
  {
    "name": "complete linked list coding assignment",
    "isUrgent": true,
    "isImportant": false,
    "isCompleted": false,
    "description": "",
    "createdDate": 1617315491000,
  },
  {
    "name": "Study for Friday quiz",
    "isUrgent": false,
    "isImportant": true,
    "isCompleted": false,
    "description": "",
    "createdDate": 1617401891000,
  },
];

export default mockData;

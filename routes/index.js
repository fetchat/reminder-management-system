const express = require('express');
const userRoute = require('./user.route');
const reminderRoute = require('./reminder.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/reminder',
    route: reminderRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;

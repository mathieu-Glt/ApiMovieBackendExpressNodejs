// const calendarController = require('../controllers/CalendarController')
const express = require('express');
const router = express.Router();
const withAuth = require('../middlewares/authMiddleware');



//endpoints for create Events on google calendar
// router.post('/create', withAuth, calendarController.createEventCalendarGoogle)



module.exports = router;

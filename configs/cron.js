const cron = require('node-cron');
const Reminder = require('../models/reminders');
const moment = require('moment');

// Cron job to check every minute
const initializeCronJobs = () => {
    cron.schedule('* * * * *', async () => {
        try {
        const now = moment().toDate();
    
        const remindersToTrigger = await Reminder.find({
            dateTime: { $lte: now },
            status: 'pending'
        });
        console.log("cron working")
    
        if (remindersToTrigger.length > 0) {
            remindersToTrigger.forEach(async (reminder) => {
    
            console.log(`Reminder triggered: ${reminder.message}`);
    
            reminder.status = 'triggered';
            await reminder.save();
    
            if (reminder.recurrence) {
                await handleRecurrence(reminder);
            }
            });
        }
        } catch (error) {
        console.error('Error checking reminders:', error);
        }
    });
    
    
    const handleRecurrence = async (reminder) => {
        let nextDateTime;
    
        switch (reminder.recurrence) {
        case 'daily':
            nextDateTime = moment(reminder.dateTime).add(1, 'days').toDate();
            break;
        case 'weekly':
            nextDateTime = moment(reminder.dateTime).add(1, 'weeks').toDate();
            break;
        case 'monthly':
            nextDateTime = moment(reminder.dateTime).add(1, 'months').toDate();
            break;
        default:
            return;
        }
    
        reminder.dateTime = nextDateTime;
        await reminder.save();
        // set the status to 'pending' for next reminder
        reminder.status = 'pending';
        await reminder.save();
        console.log(`Next occurrence scheduled for: ${nextDateTime}`);
    };
};

module.exports = initializeCronJobs;
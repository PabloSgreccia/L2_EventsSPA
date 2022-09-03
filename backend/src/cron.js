// Cron to close events where end_date < date.today
const cron = require('node-cron');
require('dotenv').config();
const Event = require('./database/models/').event

// Cron logic every hour al minute 0
cron.schedule('0 * * * *', async () => {
    const today = new Date()
    
    let events = await Event.findAll({
        attributes: ['id', 'init_date'],
        where: {
            finished: false
        },
    })


    events.forEach(event => {
        if (Date.parse(event.init_date) <= today) { event.update({finished: true})} 
    });
    
});
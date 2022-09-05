// Cron to close events where end_date < date.today
const cron = require('node-cron');
const Event = require('../database/models/').event

// Cron logic every hour al minute 0
cron.schedule('0 * * * *', async () => {
    const today = new Date()
    
    let events = await Event.findAll({
        attributes: ['id', 'end_date'],
        where: { finished: false },
    })

    events.forEach(event => {
        if (Date.parse(event.end_date) <= today) { event.update({finished: true})} 
    });
    
});
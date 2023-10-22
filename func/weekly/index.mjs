import dayjs from 'dayjs';
import ukLocale from 'dayjs/locale/uk.js';
import AWS from 'aws-sdk';
import TelegramBot from 'node-telegram-bot-api';

export const handler = async (event) => {
    AWS.config.update({ region: 'eu-central-1' });
    dayjs.locale(ukLocale);

    // load moving.json from S3 bucket with ARN arn:aws:s3:::calendars-hosting1 using AWS S3 SDK
    const file  = await new AWS.S3().getObject({ Bucket: 'calendars-hosting1', Key: 'moving.json' }).promise();
    const holidays = JSON.parse(file.Body.toString());
    const hasMovingHoliday = (date) => !!holidays[date];
      
    const normalizeDate = (date) => date.add(13, 'd').format('MM-DD');

    const getMovigHoliday = (date) => holidays[date];  

    const today = dayjs();
    const week = [];
    for (let i = 1; i <= 7; i++) {
      week.push(today.add(i, 'd'));
      
    }

    const filteredWeek = week.filter(d => hasMovingHoliday(normalizeDate(d)));
    
    if (filteredWeek.length > 0) {
      const message = `Свята на наступному тижні:\n${filteredWeek.map(d => `- ${d.format('D MMM, dddd')}: ${getMovigHoliday(normalizeDate(d))}`).join('\n')}\n\nПовний список на https://www.new-holidays.in.ua/`;
      console.log(`Sending message: ${message}`);
      
      try {
        const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
        const answer = await telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });
        console.log(`Sent the message successfully: ${answer}`);
      } catch (e) {
        console.log('Error sending message', e);
      }
    } else {
      console.log('No holidays today');
    }
    
    return {
        statusCode: 200,
        body: ''
    };
  };
  
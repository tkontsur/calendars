import dayjs from 'dayjs';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import TelegramBot from 'node-telegram-bot-api';

export const handler = async (event) => {
  const s3Client = new S3Client({ region: 'eu-central-1' });
  // load moving.json from S3 bucket with ARN arn:aws:s3:::calendars-hosting1 using AWS S3 SDK
  const file = await s3Client.send(
    new GetObjectCommand({ Bucket: 'calendars-hosting1', Key: 'moving.json' })
  );
  const holidays = JSON.parse(await file.Body.transformToString());
  const hasMovingHoliday = (date) => !!holidays[date];

  const normalizeDate = (date) => date.add(13, 'd').format('MM-DD');

  const getMovigHoliday = (date) => holidays[date];

  const tomorrow = normalizeDate(dayjs().add(1, 'd'));
  console.log(`Normalized tomorrow is: ${tomorrow}`);

  if (hasMovingHoliday(tomorrow)) {
    const holiday = getMovigHoliday(tomorrow);
    console.log(`Today is holiday: ${holiday}`);
    try {
      if (!event?.dryRun) {
        const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
          polling: false
        });
        const answer = await telegramBot.sendMessage(
          process.env.TELEGRAM_CHAT_ID,
          `Нагадую, завтра свято: *${holiday}*!`,
          { parse_mode: 'Markdown' }
        );
        console.log(`Sent the message successfully: ${answer}`);
      } else {
        console.log('Dry run, no message sent');
      }
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

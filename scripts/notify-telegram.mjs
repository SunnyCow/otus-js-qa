const telegramToken = process.env.TEST_TELEGRAM_TOKEN;
const chatId = process.env.TEST_TELEGRAM_CHAT_ID;
const testResult = process.env.TEST_RESULT ?? 'Unknwon';

async function sendTelegramMessage() {
  const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
  const reportUrl = 'https://sunnycow.github.io/otus-js-qa/'
  const statusEmoji = testResult.toLowerCase() === 'success' ? '✅' : '❌';
  const text = `${statusEmoji} *Allure Test Report*\n\n` +
                `Result: *${testResult.toUpperCase()}*\n` +
                `[Click here to view the report](${reportUrl})`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('Telegram API error:', data);
    process.exit(1);
  }

  console.log('Telegram message sent successfully:', data);

}

await sendTelegramMessage();

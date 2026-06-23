import { escapeHtml, GRADE_MAP, GOAL_MAP, COUNTRY_MAP } from '../utils/helpers.js';

/**
 * Sends a form submission notification to the configured Telegram chat.
 * Emojis are removed from the message template.
 */
export async function sendConsultationNotification({ name, contact, grade, country, goal, comment }) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || botToken === 'YOUR_TELEGRAM_BOT_TOKEN' || !chatId || chatId === 'YOUR_TELEGRAM_CHAT_ID') {
    throw new Error('Telegram credentials are not configured on the server.');
  }

  const displayGrade = GRADE_MAP[grade] || grade || 'Не вказано';
  const displayGoal = GOAL_MAP[goal] || goal || 'Не вказано';
  const displayCountry = COUNTRY_MAP[country] || country || 'Не вказано';
  const displayComment = comment && comment.trim() ? comment.trim() : 'Немає';

  const messageHtml = [
    `<b>Нова заявка на консультацію!</b>\n`,
    `<b>Ім'я:</b> ${escapeHtml(name)}`,
    `<b>Контакт:</b> <code>${escapeHtml(contact)}</code>`,
    `<b>Клас/Вік:</b> ${escapeHtml(displayGrade)}`,
    `<b>Країна:</b> ${escapeHtml(displayCountry)}`,
    `<b>Мета занять:</b> ${escapeHtml(displayGoal)}`,
    `<b>Коментар:</b> <i>${escapeHtml(displayComment)}</i>`
  ].join('\n');

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: messageHtml,
      parse_mode: 'HTML',
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    console.error('Telegram API response error details:', data);
    throw new Error('Failed to send notification via Telegram API.');
  }

  return data;
}

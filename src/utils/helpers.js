export const GRADE_MAP = {
  '1-4': 'Молодша школа (1-4 класи)',
  '5-9': 'Середня школа (5-9 класи)',
  '10-11': 'Старша школа (10-11 класи)',
  'student': 'Студент / Дорослий'
};

export const GOAL_MAP = {
  'exams': 'Підготовка до іспитів (НМТ, ЗНО, SAT)',
  'school': 'Підтягнути шкільну програму',
  'adaptation': 'Адаптація за кордоном',
  'olympiad': 'Олімпіадна математика / Логіка'
};

// HTML escape helper to prevent breaking Telegram's HTML parse mode
export function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

import rateLimit from 'express-rate-limit';

const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;

export const submitRateLimit = rateLimit({
  windowMs: FIFTEEN_MINUTES_MS,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Можна надіслати не більше 3 заявок за 15 хвилин. Спробуйте пізніше.',
  },
});
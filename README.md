# 📚 GradesTracker

> Telegram Mini App для учёта оценок, посещаемости и школьного расписания — со статистикой, прогрессом полугодия и синхронизацией через Telegram Cloud Storage.

![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-1-000000?style=flat&logo=bun&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.14-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.127-009688?style=flat&logo=fastapi&logoColor=white)

## ✨ Возможности

- 🏠 **Дашборд** — текущий урок/перемена, посещаемость в процентах, средний балл и прогресс второго полугодия
- 🎓 **Оценки** — учёт оценок по предметам с весами (multiplier) и подсчётом среднего балла
- 📅 **Расписание** — недельное расписание уроков с подсчётом пройденных занятий
- ☁️ **Экспорт / импорт** — резервная копия данных в Telegram Cloud Storage (лимит 4096 символов с индикатором заполнения)
- 💾 **Локальное хранение** — данные живут в `localStorage` через zustand persist, аккаунт не нужен
- 🌌 **Aurora-фон** — анимированный WebGL-фон на OGL
- 📳 **Haptic feedback** — тактильный отклик на действия через Telegram SDK

## 🛠 Стек

| Часть | Технологии |
|---|---|
| **Frontend** (`web/`) | Next.js 16 (App Router, React Compiler), React 19, Tailwind CSS 4, Radix UI, zustand, SWR, `@telegram-apps/sdk-react`, OGL, Biome |
| **Backend** (`backend/`) | Python 3.14, FastAPI, Beanie (MongoDB), uvicorn, uv |
| **Инфраструктура** | Docker Compose, nginx (реверс-прокси), Traefik labels |

## 🚀 Запуск

### Frontend

Пакетный менеджер — **bun** (в репозитории `bun.lock`):

```bash
cd web
bun install
bun run dev      # http://localhost:3000
```

Прочие скрипты:

```bash
bun run build    # production-сборка
bun run start    # next start -p 80
bun run lint     # biome check
bun run format   # biome format --write
```

Переменные окружения (используются при server-side запросах в `src/lib/api/base.ts`, файл `.env` в `web/`):

| Переменная | Описание |
|---|---|
| `API_URL_ENDPOINT` | Адрес backend API для SSR-запросов |
| `USE_PROD_API` | `true` — ходить в `https://kewldan.ru/api` вместо `API_URL_ENDPOINT` |

### Backend (WIP)

Backend на ранней стадии: подключение к MongoDB и модели пользователей/сессий/passkey уже есть, роуты в разработке. Управляется через **uv** (`uv.lock`):

```bash
cd backend
uv sync
uv run src/main.py
```

При первом запуске создаётся `data/config.json` — заполните в нём `database_url` (MongoDB), при необходимости `server_port` и `debug`.

### Docker

```bash
docker compose up -d --build
```

Compose поднимает `web` и nginx-прокси (`conf.d/default.conf` проксирует `/api/*` на backend). Требуется внешняя docker-сеть `virtual-hosts` и Traefik — конфигурация рассчитана на деплой под `kewldan.ru`.

## 📂 Структура

```
├── web/          # Next.js Mini App (bun)
│   └── src/
│       ├── app/          # страницы: главная, /grades, /schedule
│       ├── components/   # UI-компоненты, Aurora, нижняя навигация
│       ├── features/     # zustand-сторы: предметы, расписание
│       └── lib/api/      # HTTP-клиент
├── backend/      # FastAPI-сервис (uv)
│   └── src/
│       ├── database/     # Beanie-модели: user, session, passkey
│       └── routes/       # API-роуты
├── conf.d/       # конфигурация nginx
└── docker-compose.yml
```

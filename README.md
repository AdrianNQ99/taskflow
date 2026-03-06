# TaskFlow

Aplicación de gestión de tareas estilo Kanban con autenticación JWT, tableros por proyecto y modo demo sin backend.

## Stack

| Capa | Tecnologías |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4, React Router v7, lucide-react |
| Backend | Django, Django REST Framework, SimpleJWT, django-cors-headers |
| Base de datos | SQLite (desarrollo) / PostgreSQL (producción) |
| Estado | React Context API (UserContext, ProjectsContext) |

## Características

- **Autenticación** — registro, login con usuario o correo electrónico, JWT en localStorage
- **Proyectos** — crear y eliminar proyectos propios
- **Kanban** — columnas Por Hacer / En Progreso / Completado con arrastrar y soltar (HTML5 nativo)
- **Tareas** — crear, editar (modal), mover y eliminar tareas
- **Modo demo** — funciona completamente sin backend con datos de ejemplo
- **Dark mode** — toggle persistente en el header
- **UI responsiva** — diseño adaptado a móvil y escritorio

## Estructura

```
taskflow/
├── backend/          # Django REST API
│   ├── config/       # Settings, URLs, WSGI/ASGI
│   ├── core/         # Modelos, vistas y serializadores de Project y Task
│   └── users/        # Registro, login (TokenObtainPair), perfil
└── frontend/         # React + Vite
    └── src/
        ├── components/   # Header, Button, Input, TaskCard, Modal (EditTaskModal)
        ├── context/      # UserContext, ProjectsContext + useProjectTasks
        ├── pages/        # Login, Register, Dashboard, ProjectBoard
        ├── routing/      # routerConfig con rutas protegidas
        └── services/     # apiFetch, hooks (useDarkMode, useKanbanDrag), mockData
```

## Puesta en marcha

### Requisitos

- Python 3.9+
- Node.js 18+

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Linux / macOS
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver   # http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev                  # http://localhost:5173
```

## Modo demo

Si el backend no está disponible, haz clic en **"Entrar como Demo"** en la pantalla de login. Se cargan 3 proyectos y 9 tareas de ejemplo. Todas las operaciones (crear, editar, eliminar, arrastrar) funcionan en memoria durante la sesión.

## API endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/register/` | Registro de usuario |
| `POST` | `/api/token/` | Login → `access` + `refresh` |
| `GET` | `/api/profile/` | Perfil del usuario autenticado |
| `GET/POST` | `/api/projects/` | Listar / crear proyectos |
| `DELETE` | `/api/projects/:id/` | Eliminar proyecto |
| `GET/POST` | `/api/projects/:id/tasks/` | Listar / crear tareas |
| `PATCH/DELETE` | `/api/tasks/:id/` | Editar / eliminar tarea |

## Licencia

MIT
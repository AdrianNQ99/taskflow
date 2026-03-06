// ---------------------------------------------------------------------------
// Mock data — used when the backend is unreachable (demo mode)
// All mutations (create/update/delete) are applied only to in-memory state.
// ---------------------------------------------------------------------------

export const MOCK_USER = { id: 1, username: "demo", email: "demo@taskflow.com" };

// Mutable copy so in-session mutations are reflected
export const MOCK_PROJECTS = [
    {
        id: 1,
        name: "Diseño Web",
        description: "Rediseño del sitio corporativo",
        owner: MOCK_USER,
        created_at: "2026-03-01T00:00:00Z",
        tasks: [
            {
                id: 1, project: 1, title: "Crear wireframes",
                description: "Bocetos iniciales de todas las páginas.",
                status: "done", assigned_to: MOCK_USER,
                due_date: "2026-03-10T00:00:00Z", created_at: "2026-03-01T00:00:00Z",
            },
            {
                id: 2, project: 1, title: "Diseño en Figma",
                description: "Diseño final en alta fidelidad con sistema de diseño.",
                status: "doing", assigned_to: MOCK_USER,
                due_date: "2026-03-20T00:00:00Z", created_at: "2026-03-02T00:00:00Z",
            },
            {
                id: 3, project: 1, title: "Implementar componentes React",
                description: "Desarrollo de los componentes UI definidos en Figma.",
                status: "todo", assigned_to: null,
                due_date: "2026-04-01T00:00:00Z", created_at: "2026-03-03T00:00:00Z",
            },
        ],
    },
    {
        id: 2,
        name: "App Móvil",
        description: "Aplicación iOS y Android con React Native",
        owner: MOCK_USER,
        created_at: "2026-02-01T00:00:00Z",
        tasks: [
            {
                id: 4, project: 2, title: "Definir requerimientos",
                description: "Reunión con stakeholders para definir el alcance.",
                status: "done", assigned_to: MOCK_USER,
                due_date: "2026-02-15T00:00:00Z", created_at: "2026-02-01T00:00:00Z",
            },
            {
                id: 5, project: 2, title: "Setup React Native",
                description: "Configurar entorno de desarrollo y CI/CD.",
                status: "doing", assigned_to: null,
                due_date: "2026-03-25T00:00:00Z", created_at: "2026-02-10T00:00:00Z",
            },
            {
                id: 6, project: 2, title: "Pantalla de autenticación",
                description: "Login y registro con JWT.",
                status: "todo", assigned_to: null,
                due_date: "2026-04-10T00:00:00Z", created_at: "2026-02-15T00:00:00Z",
            },
        ],
    },
    {
        id: 3,
        name: "API Backend",
        description: "Servicios REST con Django REST Framework",
        owner: MOCK_USER,
        created_at: "2026-01-15T00:00:00Z",
        tasks: [
            {
                id: 7, project: 3, title: "Modelado de base de datos",
                description: "Diseño de los modelos en Django.",
                status: "done", assigned_to: MOCK_USER,
                due_date: "2026-01-25T00:00:00Z", created_at: "2026-01-15T00:00:00Z",
            },
            {
                id: 8, project: 3, title: "Endpoints de autenticación",
                description: "JWT login, registro y refresh token.",
                status: "done", assigned_to: MOCK_USER,
                due_date: "2026-02-05T00:00:00Z", created_at: "2026-01-20T00:00:00Z",
            },
            {
                id: 9, project: 3, title: "CRUD de proyectos y tareas",
                description: "ViewSets con permisos por usuario.",
                status: "doing", assigned_to: null,
                due_date: "2026-03-15T00:00:00Z", created_at: "2026-02-01T00:00:00Z",
            },
        ],
    },
];

let _nextId = 200;
export const mockNextId = () => ++_nextId;

export const isMockMode = () => localStorage.getItem("demo") === "true";

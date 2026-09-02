# PACEFORGE — PROFESSIONAL CODE ARCHITECTURE REFACTOR

This plan outlines the refactoring of the PACEFORGE full-stack fitness tracker into a modular, clean, and professional architecture. The goal is to separate concerns, improve maintainability, and demonstrate best practices for a college viva presentation, while preserving the existing design and functionality.

## User Review Required

> [!IMPORTANT]
> - Reusable logic currently inside components will be extracted into custom hooks.
> - Data constants will be moved to a centralized `constants` directory.
> - API calls will be abstracted into a `services` layer.
> - Backend logic will be moved from route handlers to controllers.
> - A "Glass Navbar" setting will be implemented as a global style/toggle if needed, or as the default based on the request.

## Proposed Changes

### Frontend (client/src)

Separation of concerns into the following directories:
- `constants/`: Static data and configuration.
- `hooks/`: Reusable React logic.
- `services/`: API interaction logic.
- `routes/`: Centralized routing configuration.
- `context/`: Global UI/Theme state.
- `components/`: Modular UI pieces.
- `pages/`: Clean page containers using modular components.

#### [NEW] [constants.js](file:///D:/VS projects imp/ironman70.3/client/src/constants/index.js)
Move `pageTitles`, `categoryTitles`, `newsItems`, `allEvents`, and `categoryMap` here.

#### [NEW] [api.js](file:///D:/VS projects imp/ironman70.3/client/src/services/api.js)
Centralized Axios instance and API call wrappers.

#### [NEW] [useAuth.js](file:///D:/VS projects imp/ironman70.3/client/src/hooks/useAuth.js)
Extract authentication-related logic.

#### [MODIFY] [Navbar.jsx](file:///D:/VS projects imp/ironman70.3/client/src/components/Navbar.jsx)
Implement Glass/Translucent effect using Tailwind's `backdrop-blur` and `bg-opacity`.

#### [MODIFY] [App.jsx](file:///D:/VS projects imp/ironman70.3/client/src/App.jsx)
Clean up routing and move titles logic to a hook or route config.

---

### Backend (server/)

Restructuring for a cleaner separation:
- `controllers/`: Request handling and response formatting.
- `services/`: Core business logic.
- `config/`: Configuration files (DB, JWT).
- `middleware/`: Reusable request processing.

#### [NEW] [auth.controller.js](file:///D:/VS projects imp/ironman70.3/server/controllers/auth.controller.js)
Move logic from `routes/auth.js`.

#### [NEW] [db.js](file:///D:/VS projects imp/ironman70.3/server/config/db.js)
Move MongoDB connection logic.

#### [MODIFY] [index.js](file:///D:/VS projects imp/ironman70.3/server/index.js)
Clean up route registration.

## Verification Plan

### Automated Tests
- Build both client and server to ensure no syntax errors or broken imports.
- `npm run build` for client.
- `npm start` for server.

### Manual Verification
- Verify that all pages load correctly.
- Check that navigation works.
- Verify authentication (login/register).
- Check the Glass Navbar effect across different scroll positions.
- Ensure the "Responsive Pixel System" (layout) remains intact.

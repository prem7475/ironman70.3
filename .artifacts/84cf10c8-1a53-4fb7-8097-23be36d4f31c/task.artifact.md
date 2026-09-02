# PACEFORGE Refactor Tasks

- [ ] **Infrastructure**
    - [ ] Create folder structures in `client/src` and `server/`
- [ ] **Frontend Refactor**
    - [ ] Extract constants from `App.jsx` and `Home.jsx`
    - [ ] Set up `services/api.js` for axios
    - [ ] Create `hooks/` for shared logic
    - [ ] Extract sub-components from `Home.jsx`
    - [ ] Implement Glass Navbar in `Navbar.jsx`
    - [ ] Clean up `App.jsx` and setup routing
- [ ] **Backend Refactor**
    - [ ] Set up `config/db.js`
    - [ ] Create `controllers/` for auth, user, events, registrations
    - [ ] Update `routes/` to use controllers
    - [ ] Clean up `index.js`
- [ ] **Verification**
    - [ ] Test full user flow (Register -> Login -> Browse -> Join)
    - [ ] Verify responsive design

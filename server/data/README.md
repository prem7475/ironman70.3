# Verified Race Catalog

`verified-races.json` is the curated event source for the project demo. Every record must have:

- An exact location from the navbar: Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, or Pune.
- An exact event category supported by `Event.js`.
- An official organizer `sourceUrl`.
- An official `registrationUrl`.
- `sourceVerified: true`.

The catalog currently contains real events verified from the official Tata Mumbai Marathon, Devils Circuit, and IRONMAN websites. Registration inside PaceForge is deliberately mock data for the project overview: it creates a local ticket and does not charge the athlete or submit an entry to the external organizer.

Import the catalog after checking the official pages again:

```powershell
cd server
npm run import-races
```

Dates, registration availability, fees, and organizer URLs can change. Re-verify the source pages before presenting an event as open for registration. The catalog does not invent cycling or swimming races when an official event page could not be verified for one of the supported navbar cities.

# TODO: Fix Vercel Deployment Error

## Steps to Complete
- [x] Update server/package.json: Add "type": "module", add "build" script, update "start" script to run compiled JS
- [x] Update server/tsconfig.json: Change "module" to "ES2022"
- [x] Update server/src/app-server.ts: Change import for app-router to include .js extension
- [x] Update server/src/app-router.ts: Change all controller imports to include .js extensions
- [x] Update all controller imports to include .js extensions
- [x] Fix dotenv path in jsonWebToken-Config.ts
- [x] Test build locally: Run npm run build and npm start
- [ ] Deploy to Vercel and verify fix

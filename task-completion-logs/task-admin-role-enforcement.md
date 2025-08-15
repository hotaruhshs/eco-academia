# Admin Role Enforcement and Secure Admin Setup

**Task ID/Name:** admin-role-enforcement  
**Date and Time:** Completed now  
**Status:** ✅ Completed

## Task Description
Ensure only admin users can access admin pages. Provide a secure way to mark an account as admin and remove insecure password storage in Realtime Database.

## What Was Done
- Updated `admin/js/auth-guard.js` to verify admin access using one of the following (in order):
  1. `admins/{uid} === true` (recommended)
  2. `users/{uid}/role === 'admin'`
  3. Legacy fallback: `users/admin/email` matches the signed-in user's email
- Added clear denial/redirect if the user is not an admin

## Files Modified
- **Modified:** `admin/js/auth-guard.js`

## How To Make Your Account An Admin (Recommended)
1. Create the user in Firebase Authentication (email/password) if not already created
2. Find the user's UID in Firebase Console → Authentication → Users
3. In Realtime Database, set:
   - `admins/{uid} = true`
4. (Optional) Alternatively set `users/{uid}/role = 'admin'`

## Migration From Current Data
- You currently have `users/admin/email = admin@ecoacademia.com` and a `password` field. Do this:
  - Remove `users/admin/password` (never store passwords in the database)
  - Create the auth user in Firebase Authentication with the same email
  - After login, copy the user's UID and set `admins/{uid} = true`

## Testing
- Log in with the admin email/password
- You should access admin pages
- Log in with a non-admin account → should be denied and redirected

## Notes
- Client-side apps cannot securely elevate roles; use the console to seed the first admin UID under `admins/{uid}`
- Consider adding Realtime Database Rules to protect the `admins` node (only existing admins can modify it)

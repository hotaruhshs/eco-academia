# Creating an Admin Account in Firebase

## Method 1: Firebase Console (Recommended)

### Step 1: Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `ecoacademiadb-301ba`

### Step 2: Navigate to Authentication
1. In the left sidebar, click on **"Authentication"**
2. Click on the **"Users"** tab

### Step 3: Add New User
1. Click the **"Add user"** button
2. Enter the following details:
   - **Email**: `admin@ecoacademia.com` (or your preferred email)
   - **Password**: `Admin123!` (or a strong password of your choice)
3. Click **"Add user"**

### Step 4: Verify User Creation
- The new user should appear in the Users list
- The user will have a "Verified" status

## Method 2: Using Firebase CLI (Alternative)

If you have Firebase CLI installed, you can also create users via command line:

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Create a user (replace with your desired email and password)
firebase auth:create-user --email admin@ecoacademia.com --password Admin123!
```

## Method 3: Programmatic Creation (Advanced)

If you want to create users programmatically, you can use the Firebase Admin SDK. However, this requires additional setup and should only be used in secure server environments.

## Testing the Admin Account

1. Go to your application: `http://localhost:your-port/index.html`
2. Use the credentials you created:
   - Email: `admin@ecoacademia.com`
   - Password: `Admin123!`
3. You should be redirected to the dashboard upon successful login

## Security Recommendations

1. **Use a strong password** (at least 8 characters with uppercase, lowercase, numbers, and symbols)
2. **Enable two-factor authentication** for additional security
3. **Regularly update the password**
4. **Limit access** to only necessary team members

## Default Admin Credentials

For development purposes, you can use these credentials:
- **Email**: `admin@ecoacademia.com`
- **Password**: `Admin123!`

**Important**: Change these credentials in production!

## Troubleshooting

If you encounter issues:
1. Make sure Email/Password authentication is enabled in Firebase Console
2. Check that the Firebase configuration in `admin/js/firebase-config.js` is correct
3. Verify that the user was created successfully in the Firebase Console
4. Check browser console for any error messages

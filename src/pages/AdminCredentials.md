# Admin Dashboard Access

## Hidden Admin Login URL
```
/admin-portal-secure-access-2024
```

## Default Admin Credentials
**Email:** admin@lovedancelive.com  
**Password:** LoveDance2024!Secure

## Instructions
1. Navigate to the hidden URL: `/admin-portal-secure-access-2024`
2. Use the credentials above to log in
3. You'll be redirected to the admin dashboard at `/admin`

## Important Security Notes
- Change the default password immediately after first login
- The admin login URL is hidden from the main navigation
- All admin access is logged and monitored
- Only share these credentials with authorized personnel

## Dashboard Features
- **Events Management:** Create, edit, and manage all events
- **Content Management:** Update page content, images, and text
- **Event Status:** Mark events as upcoming, current, or sold out
- **Poster Management:** Upload and change event poster images
- **Complete Control:** Manage everything without code changes

## Creating Admin Account
To create the admin account, run this SQL in your Supabase SQL Editor:

```sql
-- Insert admin user into auth.users (you may need to do this through the Supabase Auth interface)
-- Then run this to create the admin profile:

INSERT INTO public.profiles (user_id, email, name, role)
VALUES (
  'REPLACE_WITH_ACTUAL_USER_ID', 
  'admin@lovedancelive.com', 
  'Platform Administrator', 
  'admin'
);
```

Replace `REPLACE_WITH_ACTUAL_USER_ID` with the actual UUID from the auth.users table after creating the admin user through Supabase Auth.
# Database Setup Guide

This guide will help you set up the database for the Birthday Reminder App.

## Quick Setup (Recommended)

1. Open your Supabase project at https://supabase.com/dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the entire contents of `scripts/000_initial_setup.sql`
5. Paste into the SQL Editor
6. Click **Run** or press Ctrl+Enter
7. Wait for the success message

That's it! Your database is now ready to use.

## What Gets Created

The setup script creates:

### Tables:
- **profiles** - User profile information
- **birthdays** - Birthday data for church members
- **settings** - User preferences and settings
- **fcm_tokens** - Firebase Cloud Messaging tokens for push notifications

### Storage Buckets:
- **photos** - Birthday photos
- **avatars** - User profile pictures

### Security:
- Row Level Security (RLS) policies for all tables
- Storage policies for file uploads
- Automatic profile creation trigger

## Verifying the Setup

After running the script, verify everything is set up correctly:

1. Go to **Table Editor** in Supabase
2. You should see: `profiles`, `birthdays`, `settings`, `fcm_tokens`
3. Go to **Storage** 
4. You should see: `photos`, `avatars` buckets

## Troubleshooting

### "relation already exists" errors
This is normal if you're re-running the script. The script uses `IF NOT EXISTS` and `DROP POLICY IF EXISTS` to handle this safely.

### Permission errors
Make sure you're running the script in the Supabase SQL Editor as an admin user.

### Missing auth.users table
This is a built-in Supabase table. If you see errors about it, make sure you're using a valid Supabase project.

## Manual Migration (Alternative)

If you prefer to run migrations one by one:

1. Run scripts in numerical order:
   - `001_create_birthdays_table.sql`
   - `002_create_photos_storage.sql`
   - `005_fix_rls_policies.sql`
   - `006_add_notification_time.sql`
   - `007_add_notification_enabled.sql`
   - `008_create_settings_table.sql`
   - `009_add_auto_sync_setting.sql`
   - `010_create_auth_tables.sql`
   - `011_create_avatars_storage.sql`
   - `012_fix_settings_constraint.sql`
   - `013_add_profile_fields.sql`
   - `014_create_fcm_tokens_table.sql`
   - `015_add_notification_times.sql`

## Next Steps

After setting up the database:

1. Configure environment variables (see main README)
2. Set up Firebase for push notifications (see FIREBASE_SETUP.md)
3. Deploy your application
4. Create your first user account

## Support

If you encounter any issues, check the debug logs in the v0 interface or open an issue on GitHub.

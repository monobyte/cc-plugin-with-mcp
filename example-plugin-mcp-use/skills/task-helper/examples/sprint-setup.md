# Sprint Setup Example

Practical example of setting up a two-week sprint using the task manager MCP tools.

## Sprint Goal

"Implement user authentication and profile management features"

## Step 1: Create Epic-Level Tasks

Create high-level tasks for the sprint:

```
Use create_task:
  title: "User Authentication System"
  description: "Implement login, logout, and session management"
  priority: "high"

Use create_task:
  title: "User Profile Management"
  description: "Create, read, update user profile information"
  priority: "high"

Use create_task:
  title: "Password Reset Flow"
  description: "Email-based password reset functionality"
  priority: "medium"
```

## Step 2: Break Down into Subtasks

Create detailed implementation tasks:

### Authentication Tasks

```
Use create_task:
  title: "Design authentication database schema"
  description: "Create users table, sessions table, define relationships"
  priority: "high"

Use create_task:
  title: "Implement login API endpoint"
  description: "POST /api/auth/login - email/password validation, JWT generation"
  priority: "high"

Use create_task:
  title: "Implement logout API endpoint"
  description: "POST /api/auth/logout - session invalidation"
  priority: "medium"

Use create_task:
  title: "Create login UI component"
  description: "Login form with validation, error handling, loading states"
  priority: "high"

Use create_task:
  title: "Add session middleware"
  description: "JWT validation middleware for protected routes"
  priority: "high"

Use create_task:
  title: "Write authentication unit tests"
  description: "Cover login, logout, session validation, edge cases"
  priority: "medium"
```

### Profile Tasks

```
Use create_task:
  title: "Design profile database schema"
  description: "Profile fields: name, avatar, bio, preferences"
  priority: "high"

Use create_task:
  title: "Implement profile CRUD endpoints"
  description: "GET/PUT /api/profile - read and update profile"
  priority: "medium"

Use create_task:
  title: "Create profile UI components"
  description: "Profile view, edit form, avatar upload"
  priority: "medium"

Use create_task:
  title: "Add avatar image upload"
  description: "S3 upload, image resizing, URL storage"
  priority: "low"

Use create_task:
  title: "Write profile unit tests"
  description: "Cover CRUD operations, validation, permissions"
  priority: "medium"
```

### Password Reset Tasks

```
Use create_task:
  title: "Implement password reset request"
  description: "POST /api/auth/reset-request - send email with token"
  priority: "medium"

Use create_task:
  title: "Implement password reset confirmation"
  description: "POST /api/auth/reset-confirm - validate token, update password"
  priority: "medium"

Use create_task:
  title: "Create password reset UI"
  description: "Request form, confirmation form, success/error states"
  priority: "medium"

Use create_task:
  title: "Set up email service integration"
  description: "Configure SendGrid/SES for transactional emails"
  priority: "medium"
```

## Step 3: Review Sprint Scope

Check the task summary:

```
Use get_task_summary

Expected output:
Task Summary (16 total)

By Status:
  To Do: 16
  In Progress: 0
  Done: 0

By Priority:
  Critical: 0
  High: 6
  Medium: 9
  Low: 1
```

## Step 4: Verify Priority Distribution

List by priority to review:

```
Use list_tasks:
  priority: "high"

Expected: 6 high-priority tasks
- Database schemas (both)
- Login endpoint
- Login UI
- Session middleware
- Profile schema

Use list_tasks:
  priority: "medium"

Expected: 9 medium-priority tasks
- Most implementation tasks
- All test tasks
- Password reset flow
```

## Step 5: Identify Sprint Risks

Tasks that might need attention:

1. **Email service integration** - External dependency
   - Consider: Move to high priority if blocker potential

2. **Avatar upload** - Nice-to-have feature
   - Consider: Keep low, cut if time runs short

3. **Database schemas** - Block everything else
   - Action: These should be first tasks started

## Day 1: Sprint Start

Begin work on critical path:

```
Use update_task_status:
  taskId: "task-1"  # Auth database schema
  status: "in_progress"

Use update_task_status:
  taskId: "task-7"  # Profile database schema
  status: "in_progress"
```

## Mid-Sprint Check (Day 5)

```
Use get_task_summary

Target state:
- 8-10 tasks done
- 2-3 tasks in progress
- 3-5 tasks remaining in todo
```

## Sprint End

Final summary check:

```
Use get_task_summary

Use list_tasks:
  status: "done"

Use list_tasks:
  status: "todo"
```

Document what didn't complete for next sprint planning.

# Usage Guide: @purplelab/organisms-ui

This guide provides detailed information on how to use the `@purplelab/organisms-ui` package, a library of complex components and utility hooks for HealthNexus applications.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation and Setup](#installation-and-setup)
3. [Components](#components)
   - [Error Pages](#error-pages)
   - [Navbar](#navbar)
   - [Monitoring](#monitoring)
4. [Hooks](#hooks)
   - [useErrorToast](#useerrortoast)
   - [useMultipleTaskWatcher](#usemultipletaskwatcher)
   - [useValidationsApplications](#usevalidationsapplications)
5. [Modules](#modules)
   - [Analytics Monitoring](#analytics-monitoring)
   - [Validations & Restrictions](#validations--restrictions)
   - [Admin View Mode](#admin-view-mode)
6. [Usage Examples](#usage-examples)
7. [Available Exports](#available-exports---quick-reference)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Introduction

`@purplelab/organisms-ui` is a package containing complex organizational components and reusable hooks for applications in the HealthNexus ecosystem. These components are designed to integrate with:

- `@purplelab/atoms-ui` - Base components
- `@purplelab/icons-ui` - Icon system
- `@purplelab/services-ui` - Shared services

**Current version:** 20.0.2

---

## Installation and Setup

### Peer Dependencies

This package requires the following dependencies:

```json
{
  "@purplelab/atoms-ui": "*",
  "@purplelab/icons-ui": "*",
  "@purplelab/services-ui": "*",
  "@sentry/nextjs": "^10.22.0",
  "jose": "^6.0.11",
  "jotai": "^2.11.0",
  "react": "19.1.2",
  "react-dom": "19.1.2",
  "swr": "^2.2.5",
  "zod": ">=3.24.1",
  "mixpanel-browser": "^2.70.0"
}
```

### Import

The package uses specific exports to optimize tree-shaking. Each component/hook must be imported from its specific path:

```typescript
// ✅ Correct
import { Navbar } from '@purplelab/organisms-ui/navbar';
import { useErrorToast } from '@purplelab/organisms-ui/use-error-toast';

// ❌ Incorrect
import { Navbar } from '@purplelab/organisms-ui';
```

---

## Components

### Error Pages

#### NotFoundPage

Component for 404 pages (page not found).

**Import:**

```typescript
import NotFoundPageContent from '@purplelab/organisms-ui/not-found-page';
```

**Props:**

```typescript
type NotFoundPageContentProps = {
  title: string; // Page title
  action: ReactNode; // Custom button or action
};
```

**Usage example:**

```typescript
// app/not-found.tsx
import NotFoundPageContent from '@purplelab/organisms-ui/not-found-page';
import { Button } from '@purplelab/atoms-ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <NotFoundPageContent
      title="Page Not Found"
      action={
        <Link href="/">
          <Button>Go to Home</Button>
        </Link>
      }
    />
  );
}
```

**Features:**

- Centered design with 404 error icon
- Default message: "Oops! Page not found"
- Description: "We're sorry, the page you requested cannot be found."
- Icon: `Error404Icon` 200x200px
- Integration with `HeaderPage` and `GridSystem` from atoms-ui

---

#### NotFoundElementPage

Component for specific elements not found (reports, measurements, etc.).

**Import:**

```typescript
import NotFoundElementPageContent from '@purplelab/organisms-ui/not-found-element-page';
```

**Props:**

```typescript
type NotFoundElementPageContentProps = {
  title: string; // Page title
  elementName: string; // Element name (e.g., "report", "measurement")
  action: ReactNode; // Custom button or action
};
```

**Usage example:**

```typescript
// app/(authenticated)/report-not-found/page.tsx
import NotFoundElementPageContent from '@purplelab/organisms-ui/not-found-element-page';
import { Button } from '@purplelab/atoms-ui/button';
import Link from 'next/link';

export default function ReportNotFound() {
  return (
    <NotFoundElementPageContent
      title="Report Not Found"
      elementName="Report"
      action={
        <Link href="/reports">
          <Button>Go to Reports</Button>
        </Link>
      }
    />
  );
}
```

**Features:**

- Dynamic message based on `elementName`
- Message format: "Oops! {elementName} not found"
- Description: "It seems that your search for a {elementName} did not produce any results."
- Icon: `ErrorFolderIcon` 200x200px
- Automatic capitalization of elementName in title

---

#### UnauthorizedPage

Component for pages without access permissions.

**Import:**

```typescript
import UnauthorizedPageContent from '@purplelab/organisms-ui/unauthorized-page';
```

**Props:**

```typescript
type UnauthorizedPageContentProps = {
  title: string; // Page title
  action: ReactNode; // Custom button or action
};
```

**Usage example:**

```typescript
// app/(non-authenticated)/unauthorized/page.tsx
import UnauthorizedPageContent from '@purplelab/organisms-ui/unauthorized-page';
import { Button } from '@purplelab/atoms-ui/button';
import Link from 'next/link';

export default function Unauthorized() {
  return (
    <UnauthorizedPageContent
      title="Unauthorized Access"
      action={
        <Link href="/login">
          <Button>Go to Login</Button>
        </Link>
      }
    />
  );
}
```

**Features:**

- Message: "Page without permissions"
- Description: "It looks like you don't have permissions to access this URL, you can request them and try again."
- Icon: `LockedIcon` 200x200px

---

### Navbar

Main navigation component with support for authentication, impersonation, and applications.

**Import:**

```typescript
import { Navbar } from '@purplelab/organisms-ui/navbar';
```

**Props:**

```typescript
type NavbarProps = Partial<AuthDataPort> & {
  children?: React.ReactNode;
  logoLinkUrl?: string;
  logo?: React.ReactNode;
  className?: string;
};

type AuthDataPort = {
  userId: string;
  clientApis: string[];
  capabilities: string[];
  permissions: string[];
  tenantName: string;
  tags: string[];
  healthnexusToken: string;
  idTenant: string;
  privateInternalApiKey: string;
  resellerAppsUrls?: {
    portal: string;
    conceptGroups: string;
    providerGroups: string;
    healthNexus: string;
  };
};
```

**Complete usage example:**

```typescript
// src/modules/navbar/components/auth-aware-navbar.tsx
'use client';

import { Navbar } from '@purplelab/organisms-ui/navbar';
import useUserAuth from '@modules/auth/hooks/use-user-auth';
import { handleAppLogout } from '@shared/utils/handle-app-logout';
import { useRouter } from 'next/navigation';
import { getPortalUrl } from '@purplelab/services-ui/agreements';
import { getCheckloginSSOUrl } from '@purplelab/services-ui/ssoPage';

const AuthAwareNavbar = () => {
  const router = useRouter();
  const { userAuthData, clientData } = useUserAuth();

  const {
    capabilities,
    clientApis,
    tagsList,
    token,
    userId,
    permissions
  } = userAuthData ?? {};

  const { id, name } = clientData ?? {};

  const onLogoutClick = async () => {
    const logoutUrl = await handleAppLogout();
    router.push(logoutUrl);
  };

  const onTenantChanged = () => {
    window.location.href = getCheckloginSSOUrl(getPortalUrl());
  };

  return (
    <Navbar
      capabilities={capabilities}
      clientApis={clientApis}
      tags={tagsList}
      healthnexusToken={token}
      tenantName={name}
      idTenant={id}
      userId={userId}
      permissions={permissions}
      privateInternalApiKey={privateInternalApiKey}
    >
      <Navbar.Impersonate onTenantChanged={onTenantChanged} />
      <Navbar.Applications onLogoutClick={onLogoutClick} />
    </Navbar>
  );
};

export default AuthAwareNavbar;
```

**Available subcomponents:**

1. **Navbar.Impersonate** - Tenant selector for impersonation
2. **Navbar.Applications** - Applications menu with logout
3. **Navbar.AdminViewToggle** - Toggle for administrator view mode
4. **Navbar.AlertMessageAdminMode** - Alert when in admin mode

#### Navbar.Impersonate

Tenant selection component with infinite scroll for impersonation.

**Props:**

```typescript
type ImpersonationTenantProps = {
  onTenantChanged?: (value: SingleValue<OptionSelect>) => void;
};
```

**Features:**

- Infinite scroll with 100 items per page
- Search with 300ms debounce
- Integration with JWT authentication services
- Only visible for users with mimic permissions
- Auto-reload or custom callback when changing tenant

**Example:**

```typescript
<Navbar.Impersonate
  onTenantChanged={(newTenant) => {
    // Custom logic when changing tenant
    window.location.href = getCheckloginSSOUrl(getPortalUrl());
  }}
/>
```

#### Navbar.Applications

Dropdown menu with available applications and logout option.

**Props:**

```typescript
type ApplicationsAccessProps = {
  onLogoutClick?: () => void;
  customDocumentationUrl?: string;
};
```

**Features:**

- Menu with accordion for nested applications
- Automatic filtering by permissions (allowed property)
- Keyboard navigation (Arrow Up/Down, Space, Tab)
- Truncated tooltips for long names
- SSO integration for navigation between apps

**Example:**

```typescript
<Navbar.Applications
  onLogoutClick={async () => {
    const logoutUrl = await handleAppLogout();
    router.push(logoutUrl);
  }}
  customDocumentationUrl="https://docs.myapp.com"
/>
```

#### Navbar.AdminViewToggle

Button to toggle between regular user and administrator view.

**Props:**

```typescript
type AdminViewToggleProps = {
  className?: string;
  onToggle?: (isAdminViewMode: boolean) => void;
};
```

**Features:**

- Requires `AdminViewModeProvider` in the component tree
- Shows loading state during toggle
- Dynamic text: "View as a Regular User" / "View as an Administrator"
- Auto-reload or custom callback

**Example:**

```typescript
<Navbar.AdminViewToggle
  onToggle={(isAdminMode) => {
    trackEvent({
      event: 'Admin View Toggle',
      properties: { isAdminMode }
    });
  }}
/>
```

#### Navbar.AlertMessageAdminMode

Visual alert that displays when the user is in administrator mode.

**Features:**

- Only shows when `isAdminViewMode` is true
- Message: "You're in content creator mode. Any data you create will be saved as system data."
- Style: StatusTag type "determinal" with icon
- Requires `AdminViewModeProvider`

**Example:**

```typescript
// Automatically displays when isAdminViewMode is true
<Navbar.AlertMessageAdminMode />
```

---

### Monitoring

Component to initialize Sentry monitoring in the application.

**Import:**

```typescript
import Monitoring from '@purplelab/organisms-ui/monitoring';
```

**Props:**

```typescript
type MonitoringProps = Partial<InitMonitoringData> & {
  children: React.ReactNode;
};

type InitMonitoringData = {
  appSource: string; // Application identifier
  clientId: string; // Client ID
  clientName: string; // Client name
  userName: string; // User name
};
```

**Usage example:**

```typescript
// src/modules/monitoring/components/monitoring-provider.tsx
'use client';

import Monitoring from '@purplelab/organisms-ui/monitoring';
import APP_SOURCE from '@shared/domain/app-source';
import useUserAuth from '@modules/auth/hooks/use-user-auth';

export default function MonitoringProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { userAuthData, clientData } = useUserAuth();
  const { id: clientId, name: clientName } = clientData ?? {};
  const { email: username } = userAuthData ?? {};

  return (
    <Monitoring
      appSource={APP_SOURCE}
      clientId={clientId}
      clientName={clientName}
      userName={username}
    >
      {children}
    </Monitoring>
  );
}
```

**Usage in main layout:**

```typescript
// app/layout.tsx
import MonitoringProvider from '@/modules/monitoring/components/monitoring-provider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <MonitoringProvider>
          {children}
        </MonitoringProvider>
      </body>
    </html>
  );
}
```

**Features:**

- Automatic Sentry initialization
- Data validation with Zod schema
- Client-only execution (useEffect)
- User context for tracking

---

## Hooks

### useErrorToast

Hook to display error notifications with `ErrorService` integration.

**Import:**

```typescript
import { useErrorToast } from '@purplelab/organisms-ui/use-error-toast';
```

**Return:**

```typescript
{
  errorToast: (error: unknown) => void
}
```

**Usage example:**

```typescript
import { useErrorToast } from '@purplelab/organisms-ui/use-error-toast';
import { Button } from '@purplelab/atoms-ui/button';

const MyComponent = () => {
  const { errorToast } = useErrorToast();

  const handleDelete = async () => {
    try {
      await deleteReport(reportId);
    } catch (error) {
      errorToast(error);
    }
  };

  return <Button onClick={handleDelete}>Delete Report</Button>;
};
```

**Features:**

- Automatically detects `ErrorService` instances
- Default message: "Unexpected error occurred, contact custom success"
- Toast variant: "determinal"
- Title: "Error"

**Common use cases:**

```typescript
// In creation operations
const { errorToast } = useErrorToast();

const createReport = async (data: ReportData) => {
  try {
    const response = await createReportService(data);
    toast({ title: 'Success', description: 'Report created' });
  } catch (error) {
    errorToast(error); // Handles error automatically
  }
};
```

---

### useMultipleTaskWatcher

Complex hook to monitor the status of multiple asynchronous tasks with automatic polling.

**Import:**

```typescript
import useMultipleTaskWatcher from '@purplelab/organisms-ui/use-multiple-task-watcher';
```

**Configuration:**

```typescript
interface UseMultipleTaskWatcher<
  TData,
  TDataAdapted,
  TErrorResponse,
  TFinishStatuses extends string,
  TProcessingStatuses extends string
> {
  statusConfig: {
    finished: TFinishStatuses[];
    processing: TProcessingStatuses[];
  };
  fetchTaskStatus: (taskId: string) => Promise<TData>;
  dataAdapter: (data: TData) => {
    status: TFinishStatuses | TProcessingStatuses;
    data: TDataAdapted;
  };
  timeInterval?: number; // Default: 30000ms (30 seconds)
  onTaskFinished?: (data: TDataAdapted, previousStatus?) => void;
  onTaskProcessing?: (data: TDataAdapted, previousStatus?) => void;
  onFetchFailed?: (error: TErrorResponse) => void;
}
```

**Return:**

```typescript
{
  initTaskWatcher: (taskId: string) => Promise<void>;
  clearTaskById: (taskId: string) => void;
  clearAllTask: () => void;
  statusTasks: Map<string, TFinishStatuses | TProcessingStatuses>;
  setStatusTasks: Dispatch<SetStateAction<Map<string, Status>>>;
}
```

**Complete example - Report monitoring:**

```typescript
// src/shared/hooks/use-report-status-watcher.tsx
import useMultipleTaskWatcher from '@purplelab/organisms-ui/use-multiple-task-watcher';
import getReportByReportId from '@shared/services/get-report-by-report-id';
import {
  CREATED_REPORT_STATUS,
  FAILED_REPORT_STATUS,
  GENERATED_REPORT_STATUS,
  IN_PROGRESS_REPORT_STATUS,
  ReportStatus
} from '@shared/domain/report-status';

type ReportStatusResponse = {
  data: Report & { reportId: string };
  status: ReportStatus;
};

const getReportTaskStatus = async (
  reportId: string
): Promise<ReportStatusResponse> => {
  const tempData = await getReportByReportId(Number(reportId));

  if (!tempData?.reportStatus) {
    throw new Error('Invalid ReportStatus');
  }

  return {
    status: tempData.reportStatus,
    data: { ...tempData, reportId }
  };
};

const reportTaskAdapter = ({ data, status }: ReportStatusResponse) => {
  return {
    status: status,
    data
  };
};

const reportStatus = {
  finished: [FAILED_REPORT_STATUS, GENERATED_REPORT_STATUS],
  processing: [CREATED_REPORT_STATUS, IN_PROGRESS_REPORT_STATUS]
} as const;

type UseReportStatusWatcher = {
  onFinishedTask: (data: Report) => void;
};

const useReportStatusWatcher = ({ onFinishedTask }: UseReportStatusWatcher) => {
  const { initTaskWatcher, clearAllTask, clearTaskById } =
    useMultipleTaskWatcher<
      ReportStatusResponse,
      Report,
      unknown,
      ReportStatus,
      ReportStatus
    >({
      fetchTaskStatus: getReportTaskStatus,
      dataAdapter: reportTaskAdapter,
      statusConfig: reportStatus,
      onTaskFinished(data) {
        const { reportStatus, lastRun, id } = data;
        onFinishedTask?.({ reportStatus, lastRun, id });
      },
      timeInterval: 15000 // Poll every 15 seconds
    });

  return { initTaskWatcher, clearAllTask, clearTaskById };
};

export default useReportStatusWatcher;
```

**Usage in component:**

```typescript
import useReportStatusWatcher from '@shared/hooks/use-report-status-watcher';
import { mutate } from 'swr';

const ReportList = () => {
  const { initTaskWatcher, clearAllTask } = useReportStatusWatcher({
    onFinishedTask: (data) => {
      // Update SWR cache when report finishes
      mutate('/api/reports');

      if (data.reportStatus === 'GENERATED') {
        toast({
          title: 'Success',
          description: 'Report generated successfully'
        });
      }
    }
  });

  const handleRunReport = async (reportId: string) => {
    await startReportGeneration(reportId);
    // Start status monitoring
    initTaskWatcher(reportId);
  };

  useEffect(() => {
    // Clean up watchers on unmount
    return () => clearAllTask();
  }, []);

  return (
    <Button onClick={() => handleRunReport('123')}>
      Run Report
    </Button>
  );
};
```

**Advanced features:**

- Automatic polling with configurable interval
- Management of multiple simultaneous tasks
- Callbacks for finished and processing states
- Auto-cleanup when a task finishes
- Prevention of duplicate watchers
- Error handling in fetch
- Reactive state with Map of states

**Use cases:**

1. Report generation
2. File processing
3. Data export
4. Long background calculations
5. Any asynchronous operation requiring polling

---

### useValidationsApplications

Hook to validate user permissions and capabilities within the Navbar context.

**Import:**

```typescript
// This hook is NOT publicly exported, used internally
// For permission validations, use: isApiAllowed from validations-restrictions
```

**Note:** This hook is internal to the navbar module and requires being within `NavbarContext`. For permission validations outside navbar, use `isApiAllowed` from the `validations-restrictions` module.

**Return:**

```typescript
{
  isApiAllowed: (typePermission: string) => boolean;
  isCapabilitiesAllowed: (typePermission: string) => boolean;
  isConceptGroupRestricted: () => boolean;
  isNotConceptGroupRestricted: () => boolean;
}
```

**Internal usage (within Navbar components):**

```typescript
import { useValidationsApplications } from '@/modules/header/hooks/use-validations-applications';

const MyNavbarComponent = () => {
  const {
    isApiAllowed,
    isCapabilitiesAllowed,
    isConceptGroupRestricted
  } = useValidationsApplications();

  const canAccessReports = isApiAllowed('REPORTS_API');
  const hasExportCapability = isCapabilitiesAllowed('EXPORT_DATA');
  const isRestricted = isConceptGroupRestricted();

  return (
    <>
      {canAccessReports && <Link href="/reports">Reports</Link>}
      {hasExportCapability && !isRestricted && (
        <Button>Export</Button>
      )}
    </>
  );
};
```

**Methods:**

1. **isApiAllowed(typePermission: string)**: Checks if user has access to a specific API based on `clientApis`

2. **isCapabilitiesAllowed(typePermission: string)**: Checks if user has a specific capability based on `capabilities`

3. **isConceptGroupRestricted()**: Checks if user has concept groups restriction based on tags named `isConceptGroupRestricted`

4. **isNotConceptGroupRestricted()**: Inverse of `isConceptGroupRestricted()`

**Difference with isApiAllowed from validations-restrictions:**

- `useValidationsApplications`: Internal navbar hook, validates against `clientApis` and `capabilities` from navbar context
- `isApiAllowed` (validations-restrictions): Standalone function that validates against user `permissions`

---

## Modules

### Analytics Monitoring

Event tracking system with Mixpanel.

**Import:**

```typescript
import {
  useMixpanelInit,
  trackEvent,
  registerUser,
  resetMixpanel,
  initMixpanel
} from '@purplelab/organisms-ui/analytics-monitoring';

// Types
import type {
  EventProperties,
  TrackEvent,
  RegisterUserContext
} from '@purplelab/organisms-ui/analytics-monitoring';
```

#### useMixpanelInit

Hook to initialize Mixpanel in your application.

**Usage:**

```typescript
'use client';

import { useMixpanelInit } from '@purplelab/organisms-ui/analytics-monitoring';

const App = ({ children }) => {
  useMixpanelInit({
    mixpanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!,
    debugAnalytics: process.env.NODE_ENV === 'development',
    availableAnalytics: true,
    config: {
      // Optional Mixpanel configuration
      track_pageview: true,
      persistence: 'localStorage'
    }
  });

  return <>{children}</>;
};
```

#### trackEvent

Function to register user events.

**Signature:**

```typescript
type TrackEvent = {
  event: string;
  properties?: Record<string, unknown>;
};

trackEvent(params: TrackEvent): void
```

**Example:**

```typescript
import { trackEvent } from '@purplelab/organisms-ui/analytics-monitoring';

// Simple event
trackEvent({ event: 'Report Created' });

// Event with properties
trackEvent({
  event: 'Report Exported',
  properties: {
    reportId: '123',
    format: 'PDF',
    timestamp: new Date().toISOString()
  }
});

// In a component
const ReportActions = () => {
  const handleExport = () => {
    exportReport();
    trackEvent({
      event: 'Report Exported',
      properties: {
        reportType: 'Monthly Analysis',
        format: 'Excel'
      }
    });
  };

  return <Button onClick={handleExport}>Export</Button>;
};
```

#### registerUser

Function to register user context in analytics.

**Signature:**

```typescript
type RegisterUserContext = {
  tenantId: string;
  tenantName: string;
  userEmail: string;
  appSource: string;
};

registerUser(params: RegisterUserContext): void
```

**Example:**

```typescript
import { registerUser } from '@purplelab/organisms-ui/analytics-monitoring';

const AuthProvider = () => {
  const { user, tenant } = useAuth();

  useEffect(() => {
    if (user && tenant) {
      registerUser({
        tenantId: tenant.id,
        tenantName: tenant.name,
        userEmail: user.email,
        appSource: 'report-builder'
      });
    }
  }, [user, tenant]);

  return <>{children}</>;
};
```

#### resetMixpanel

Function to clear Mixpanel state (useful on logout).

**Usage:**

```typescript
import { resetMixpanel } from '@purplelab/organisms-ui/analytics-monitoring';

const handleLogout = async () => {
  resetMixpanel();
  await logout();
  router.push('/login');
};
```

---

### Validations & Restrictions

Utilities to validate API permissions.

**Import:**

```typescript
import { isApiAllowed } from '@purplelab/organisms-ui/validations-restrictions';
```

**Signature:**

```typescript
type IsAPIAllowedProps = {
  permissions: string[];
  typePermission: string;
};

isApiAllowed(props: IsAPIAllowedProps): boolean
```

**Usage example:**

```typescript
import { isApiAllowed } from '@purplelab/organisms-ui/validations-restrictions';

const ReportActions = ({ userPermissions }) => {
  const canDeleteReports = isApiAllowed({
    permissions: userPermissions,
    typePermission: 'REPORTS_DELETE'
  });

  const canExportReports = isApiAllowed({
    permissions: userPermissions,
    typePermission: 'REPORTS_EXPORT'
  });

  return (
    <div>
      {canExportReports && (
        <Button onClick={handleExport}>Export</Button>
      )}
      {canDeleteReports && (
        <Button onClick={handleDelete} variant="destructive">
          Delete
        </Button>
      )}
    </div>
  );
};
```

**Usage with custom hooks:**

```typescript
const usePermissions = () => {
  const { userAuthData } = useUserAuth();
  const permissions = userAuthData?.permissions ?? [];

  const canCreate = isApiAllowed({
    permissions,
    typePermission: 'REPORTS_CREATE'
  });

  const canEdit = isApiAllowed({
    permissions,
    typePermission: 'REPORTS_EDIT'
  });

  return { canCreate, canEdit };
};
```

---

### Admin View Mode

Context system for administrator view mode.

**Import:**

```typescript
import {
  AdminViewModeProvider,
  useAdminViewModeContext
} from '@purplelab/organisms-ui/admin-view-mode-context';
```

#### AdminViewModeProvider

Provider to wrap components that need admin mode context.

**Props:**

```typescript
type Props = {
  children: React.ReactNode;
  userHasPermission: boolean;
};
```

**Usage:**

```typescript
// app/layout.tsx
import { AdminViewModeProvider } from '@purplelab/organisms-ui/admin-view-mode-context';

export default function Layout({ children }) {
  const userHasPermission = checkAdminPermission();

  return (
    <AdminViewModeProvider userHasPermission={userHasPermission}>
      {children}
    </AdminViewModeProvider>
  );
}
```

#### useAdminViewModeContext

Hook to access admin mode state.

**Return:**

```typescript
{
  isAdminViewMode: boolean;
  toggleAdminViewMode: () => void;
  userHasPermission: boolean;
  isLoading: boolean;
}
```

**Example:**

```typescript
import useAdminViewModeContext from '@purplelab/organisms-ui/admin-view-mode-context';

const ContentCreatorPanel = () => {
  const {
    isAdminViewMode,
    toggleAdminViewMode,
    userHasPermission,
    isLoading
  } = useAdminViewModeContext();

  if (!userHasPermission) return null;

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Switch
            checked={isAdminViewMode}
            onCheckedChange={toggleAdminViewMode}
          />
          <label>Admin View Mode</label>
        </>
      )}
    </div>
  );
};
```

**Usage with Navbar:**

```typescript
import { Navbar } from '@purplelab/organisms-ui/navbar';
import { AdminViewModeProvider } from '@purplelab/organisms-ui/admin-view-mode-context';

const Layout = () => {
  return (
    <AdminViewModeProvider userHasPermission={hasPermission}>
      <Navbar {...props}>
        <Navbar.AdminViewToggle />
        <Navbar.AlertMessageAdminMode />
        <Navbar.Applications />
      </Navbar>
      {children}
    </AdminViewModeProvider>
  );
};
```

---

## Usage Examples

### Example 1: Complete application with all components

```typescript
// app/layout.tsx
import { AdminViewModeProvider } from '@purplelab/organisms-ui/admin-view-mode-context';
import MonitoringProvider from '@/modules/monitoring/components/monitoring-provider';
import AuthAwareNavbar from '@/modules/navbar/components/auth-aware-navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MonitoringProvider>
          <AdminViewModeProvider userHasPermission={true}>
            <AuthAwareNavbar />
            <main>{children}</main>
          </AdminViewModeProvider>
        </MonitoringProvider>
      </body>
    </html>
  );
}
```

### Example 2: Page with error handling and tracking

```typescript
// app/(authenticated)/reports/[id]/page.tsx
'use client';

import { useErrorToast } from '@purplelab/organisms-ui/use-error-toast';
import { trackEvent } from '@purplelab/organisms-ui/analytics-monitoring';
import { isApiAllowed } from '@purplelab/organisms-ui/validations-restrictions';
import NotFoundElementPageContent from '@purplelab/organisms-ui/not-found-element-page';

export default function ReportDetailPage({ params }) {
  const { errorToast } = useErrorToast();
  const { data: report, error } = useReport(params.id);
  const { permissions } = useUserAuth();

  const canEdit = isApiAllowed({
    permissions,
    typePermission: 'REPORTS_EDIT'
  });

  const handleEdit = async () => {
    try {
      await editReport(params.id);
      trackEvent({
        event: 'Report Edited',
        properties: { reportId: params.id }
      });
    } catch (error) {
      errorToast(error);
    }
  };

  if (error?.status === 404) {
    return (
      <NotFoundElementPageContent
        title="Report Not Found"
        elementName="Report"
        action={<Link href="/reports">Back to Reports</Link>}
      />
    );
  }

  return (
    <div>
      <h1>{report.name}</h1>
      {canEdit && (
        <Button onClick={handleEdit}>Edit Report</Button>
      )}
    </div>
  );
}
```

### Example 3: Complete task monitoring system

```typescript
// src/modules/reports/hooks/use-export-watcher.ts
import useMultipleTaskWatcher from '@purplelab/organisms-ui/use-multiple-task-watcher';
import { useErrorToast } from '@purplelab/organisms-ui/use-error-toast';
import { trackEvent } from '@purplelab/organisms-ui/analytics-monitoring';

const useExportWatcher = () => {
  const { errorToast } = useErrorToast();

  const { initTaskWatcher, clearAllTask } = useMultipleTaskWatcher({
    fetchTaskStatus: getExportStatus,
    dataAdapter: (data) => ({
      status: data.exportStatus,
      data: data
    }),
    statusConfig: {
      finished: ['COMPLETED', 'FAILED'],
      processing: ['PENDING', 'IN_PROGRESS']
    },
    onTaskFinished: (data) => {
      if (data.status === 'COMPLETED') {
        trackEvent({
          event: 'Export Completed',
          properties: { exportId: data.id }
        });
        downloadFile(data.url);
      } else {
        trackEvent({
          event: 'Export Failed',
          properties: { exportId: data.id }
        });
      }
    },
    onFetchFailed: (error) => {
      errorToast(error);
    },
    timeInterval: 10000
  });

  return { initTaskWatcher, clearAllTask };
};
```

---

## Best Practices

### 1. Specific imports

```typescript
// ✅ Correct - Optimized tree-shaking
import { Navbar } from '@purplelab/organisms-ui/navbar';
import { useErrorToast } from '@purplelab/organisms-ui/use-error-toast';

// ❌ Incorrect - Larger bundle
import { Navbar, useErrorToast } from '@purplelab/organisms-ui';
```

### 2. Consistent error handling

```typescript
// ✅ Correct
const { errorToast } = useErrorToast();

try {
  await operation();
} catch (error) {
  errorToast(error); // Automatically handles ErrorService
}

// ❌ Incorrect
catch (error) {
  toast({ title: 'Error', description: error.message });
}
```

### 3. Watcher cleanup

```typescript
// ✅ Correct
const Component = () => {
  const { initTaskWatcher, clearAllTask } = useMultipleTaskWatcher({...});

  useEffect(() => {
    return () => clearAllTask(); // Clean up on unmount
  }, []);
};
```

### 4. Permission validation

```typescript
// ✅ Correct - Validate before rendering
const canDelete = isApiAllowed({ permissions, typePermission: 'DELETE' });

return (
  <>
    {canDelete && <Button onClick={handleDelete}>Delete</Button>}
  </>
);
```

### 5. Event tracking

```typescript
// ✅ Correct - Descriptive events with properties
trackEvent({
  event: 'Report Exported',
  properties: {
    reportId,
    format: 'PDF',
    timestamp: Date.now()
  }
});

// ❌ Incorrect - Generic events without context
trackEvent({ event: 'click' });
```

---

## Troubleshooting

### Error: "useAdminViewMode must be used within AdminViewModeProvider"

**Solution:** Wrap your application with `AdminViewModeProvider`:

```typescript
<AdminViewModeProvider userHasPermission={true}>
  {children}
</AdminViewModeProvider>
```

### Error: Module not found - Can't resolve '@purplelab/organisms-ui/navbar'

**Solution:** Verify all peer dependencies are installed:

```bash
npm install @purplelab/atoms-ui @purplelab/icons-ui @purplelab/services-ui
```

### Watchers don't clean up correctly

**Solution:** Use `clearAllTask` in the useEffect cleanup:

```typescript
useEffect(() => {
  return () => clearAllTask();
}, [clearAllTask]);
```

---

## Available Exports - Quick Reference

All public exports from the package with their import paths:

```typescript
// Error components
import NotFoundPageContent from '@purplelab/organisms-ui/not-found-page';
import NotFoundElementPageContent from '@purplelab/organisms-ui/not-found-element-page';
import UnauthorizedPageContent from '@purplelab/organisms-ui/unauthorized-page';

// Navbar and subcomponents
import { Navbar } from '@purplelab/organisms-ui/navbar';
// Subcomponents: Navbar.Impersonate, Navbar.Applications, Navbar.AdminViewToggle, Navbar.AlertMessageAdminMode

// Monitoring
import Monitoring from '@purplelab/organisms-ui/monitoring';

// Hooks
import { useErrorToast } from '@purplelab/organisms-ui/use-error-toast';
import useMultipleTaskWatcher from '@purplelab/organisms-ui/use-multiple-task-watcher';

// Contexts
import {
  AdminViewModeProvider,
  useAdminViewModeContext
} from '@purplelab/organisms-ui/admin-view-mode-context';

// Modules
import {
  useMixpanelInit,
  trackEvent,
  registerUser,
  resetMixpanel,
  initMixpanel
} from '@purplelab/organisms-ui/analytics-monitoring';

import { isApiAllowed } from '@purplelab/organisms-ui/validations-restrictions';
```

**Note about tenant-switch:**
The export `./tenant-switch` is declared in package.json but the component is integrated in `Navbar.Impersonate`. It should not be imported directly.

---

## Additional Resources

- [atoms-ui Documentation](../packages/atoms-ui/README.md)
- [services-ui Documentation](../packages/services-ui/README.md)
- [Project Architecture Guide](../CLAUDE.md)

---

## Support

To report issues or request new features, contact the Purplelab development team.

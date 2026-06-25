# Usage Guide: @purplelab/icons-ui

This guide provides complete information on how to use the `@purplelab/icons-ui` package, the optimized SVG icon system for HealthNexus applications.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation and Setup](#installation-and-setup)
3. [Basic Usage](#basic-usage)
4. [IconBase - Base Component](#iconbase---base-component)
5. [Props and Variants](#props-and-variants)
6. [Icon Catalog](#icon-catalog)
7. [Icons by Category](#icons-by-category)
8. [Usage Examples](#usage-examples)
9. [Customization](#customization)
10. [Creating New Icons](#creating-new-icons)
11. [Best Practices](#best-practices)
12. [Troubleshooting](#troubleshooting)

---

## Introduction

`@purplelab/icons-ui` is HealthNexus's official icon system. It provides a collection of **84+ optimized SVG icons**, consistent and accessible for use in React applications.

**Current version:** 2.3.1

### Key features:

- ✅ **84+ icons** optimized and vectorial
- ✅ **TypeScript** with complete types
- ✅ **Optimized tree-shaking** - only import what you use
- ✅ **Size variants**: sm (20px), md (24px), lg (36px), xl (48px)
- ✅ **Color variants**: 7 colors from the design system
- ✅ **Accessibility**: aria-hidden by default
- ✅ **Tailwind CSS** for styling
- ✅ **Pure SVG** - no icon fonts

---

## Installation and Setup

### Peer Dependencies

```json
{
  "react": "19.1.2",
  "react-dom": "19.1.2"
}
```

### Installation

This package is already included in the monorepo. For external projects:

```bash
npm install @purplelab/icons-ui
```

### Import

**IMPORTANT:** Always import icons from specific paths to optimize the bundle:

```typescript
// ✅ Correct - Optimized tree-shaking
import { AddIcon } from '@purplelab/icons-ui/AddIcon';
import { TrashIcon } from '@purplelab/icons-ui/TrashIcon';

// ❌ Incorrect - Imports entire package
import { AddIcon, TrashIcon } from '@purplelab/icons-ui';
```

---

## Basic Usage

### Simple example

```typescript
import { AddIcon } from '@purplelab/icons-ui/AddIcon';

const MyComponent = () => {
  return (
    <button>
      <AddIcon size="md" color="primary" />
      Add Item
    </button>
  );
};
```

### With custom className

```typescript
import { SearchIcon } from '@purplelab/icons-ui/SearchIcon';

const SearchBar = () => {
  return (
    <div className="flex items-center">
      <SearchIcon className="mr-2" size="sm" />
      <input type="text" placeholder="Search..." />
    </div>
  );
};
```

---

## IconBase - Base Component

All icons inherit from `IconBase`, the base component that provides structure and common variants.

### Import

```typescript
import IconBase from '@purplelab/icons-ui/IconBase';
// or
import IconBase from '@purplelab/icons-ui/icon-base-color';
```

### Using IconBase

Normally you don't need to use `IconBase` directly, but it's useful for creating custom icons:

```typescript
import IconBase, { IconProps } from '@purplelab/icons-ui/IconBase';

const CustomIcon = ({ className, color, size, ...props }: IconProps) => {
  return (
    <IconBase
      className={className}
      color={color}
      size={size}
      viewBox="0 0 20 20"
      {...props}
    >
      <path d="M10 2L2 10l8 8 8-8-8-8z" fillRule="evenodd" />
    </IconBase>
  );
};
```

### IconBaseFlow

For icons with fixed colors (don't inherit currentColor):

```typescript
import { IconBaseFlow } from '@purplelab/icons-ui/IconBaseFlow';
```

---

## Props and Variants

### TypeScript Types

```typescript
import { IconProps } from '@purplelab/icons-ui/icon-base-color';

type IconProps = {
  className?: string;
  size?: 'default' | 'sm' | 'md' | 'lg' | 'xl';
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'success'
    | 'warning'
    | 'info'
    | 'disabled';
  // + all SVGSVGElement props
  onClick?: () => void;
  style?: React.CSSProperties;
  title?: string;
  // ... etc
};
```

### Size Variants

| Size      | Dimensions | Tailwind Class | Recommended Usage              |
| --------- | ---------- | -------------- | ------------------------------ |
| `default` | Custom     | -              | Custom size with className     |
| `sm`      | 20x20px    | `size-[20px]`  | Inline icons, badges, tooltips |
| `md`      | 24x24px    | `size-[24px]`  | Buttons, navigation (default)  |
| `lg`      | 36x36px    | `size-[36px]`  | Headers, featured sections     |
| `xl`      | 48x48px    | `size-[48px]`  | Empty states, placeholders     |

**Examples:**

```typescript
<AddIcon size="sm" />  {/* 20px */}
<AddIcon size="md" />  {/* 24px - Default */}
<AddIcon size="lg" />  {/* 36px */}
<AddIcon size="xl" />  {/* 48px */}
<AddIcon className="size-[32px]" />  {/* Custom */}
```

### Color Variants

Colors are mapped to Tailwind's design system:

| Color       | Tailwind Class           | Usage                              |
| ----------- | ------------------------ | ---------------------------------- |
| `default`   | -                        | Inherits currentColor from context |
| `primary`   | `fill-action-primary`    | Primary actions                    |
| `secondary` | `fill-action-secondary`  | Secondary actions                  |
| `error`     | `fill-system-determinal` | Errors, deletions                  |
| `success`   | `fill-system-success`    | Confirmations, success             |
| `warning`   | `fill-system-warning`    | Warnings                           |
| `info`      | `fill-system-info`       | Information                        |
| `disabled`  | `fill-system-neutral`    | Disabled states                    |

**Examples:**

```typescript
<CheckIcon color="success" />
<TrashIcon color="error" />
<InfoIcon color="info" />
<AddIcon color="primary" />
```

### Additional Props

All icons accept standard SVG props:

```typescript
<AddIcon
  onClick={() => console.log('clicked')}
  style={{ cursor: 'pointer' }}
  title="Add new item"
  aria-label="Add"
  aria-hidden={false}
/>
```

---

## Icon Catalog

### Complete List of Available Icons

The package includes **84 icons** organized in two categories:

1. **Icons** (66 icons) - General system icons
2. **Icons Flow** (18 icons) - Flow and state specific icons

### All Available Icons

```typescript
// Actions
AddIcon; // Add/Create
MinusIcon; // Subtract/Collapse
CheckIcon; // Confirm/Select
XIcon; // Close/Cancel
SendIcon; // Send
SaveIcon; // Save
CopyIcon; // Copy
PencilIcon; // Edit
RunIcon; // Execute

// Navigation
ArrowLeftIcon; // Left
ArrowRightIcon; // Right
ArrowUpIcon; // Up
ArrowDownIcon; // Down
ArrowBackIcon; // Go back
ArrowUpRightIcon; // External
ArrowLeftRightIcon; // Swap
ArrowDownToLineIcon; // Download

// Chevrons
ChevronLeftIcon; // Previous
ChevronRightIcon; // Next
ChevronUpIcon; // Expand up
ChevronDownIcon; // Expand down

// Files and Folders
FileIcon; // Generic file
FilesIcon; // Multiple files
FileCsvIcon; // CSV
FileHtmlIcon; // HTML
FileBlueIcon; // Blue file (flow)
Folder; // Closed folder
FolderOpen; // Open folder
UploadFileIcon; // Upload file (flow)

// Data and Management
ArchiveIcon; // Archive
ArchiveRestoreIcon; // Restore archive
RestoreIcon; // Restore
TrashIcon; // Delete
DownloadIcon; // Download
DownloadCheckIcon; // Download completed
MoveIcon; // Move

// UI Elements
MenuHamburgerIcon; // Hamburger menu
MenuVerticalDots; // Vertical menu (⋮)
MenuHorizontalDotsIcon; // Horizontal menu (⋯)
SettingsIcon; // Settings
FilterIcon; // Filter
SearchIcon; // Search
EyeIcon; // View/Visualize
ColumnIcon; // Columns
SidePanelIcon; // Side panel
CollapseHorizontalLeft; // Collapse panel

// Alerts and States
AlertIcon; // Alert outline
AlertCircleIcon; // Alert circle outline
FilledAlertIcon; // Alert filled
FilledAlertCircleIcon; // Alert circle filled
InfoIcon; // Information outline
FilledInfoIcon; // Information filled
FilledCircleCheckIcon; // Check circle filled
BanIcon; // Prohibited

// Users and Social
UsersIcon; // Users
LogoutIcon; // Logout
StarIcon; // Favorite
FilledStartIcon; // Favorite filled

// Data and Analytics
ActivityIcon; // Activity
ChartLineUpIcon; // Line chart
TargetIcon; // Target
UnionSetIcon; // Set union (flow)
DifferentSetIcon; // Set difference (flow)

// Time
ClockIcon; // Clock/Time
CalendarIcon; // Calendar

// Technology
AppSwitcherIcon; // Switch application
IAIcon; // Artificial Intelligence
UniversityIcon; // University/Education
HomeIcon; // Home

// Empty States and Errors (Flow Icons)
EmptyBoxIcon; // Empty state
EmptyStateIcon; // General empty state
Error404Icon; // 404 Error
ErrorFolderIcon; // Folder not found
NetworkErrorIcon; // Network error
LockedIcon; // Locked/No permissions

// Search (Flow Icons)
NewSearchIcon; // New search
NewSearchFolderIcon; // Search in folder

// Branding (Flow Icons)
LogoHealthNexus; // HealthNexus Logo
LeavesGreyIcon; // Grey leaves

// Domain Specific (Flow Icons)
ConceptGroupsIcon; // Concept groups
ProviderGroupsIcon; // Provider groups
FilteringIcon; // Advanced filtering
DestinationsIcon; // Destinations

// Others
UserManualIcon; // User manual
SpinnerIcon; // Loading/Loading
```

---

## Icons by Category

### Primary Actions

Icons for common user actions:

```typescript
import { AddIcon } from '@purplelab/icons-ui/AddIcon';
import { TrashIcon } from '@purplelab/icons-ui/TrashIcon';
import { PencilIcon } from '@purplelab/icons-ui/PencilIcon';
import { SaveIcon } from '@purplelab/icons-ui/SaveIcon';
import { RunIcon } from '@purplelab/icons-ui/RunIcon';
import { CopyIcon } from '@purplelab/icons-ui/CopyIcon';
import { SendIcon } from '@purplelab/icons-ui/SendIcon';

<AddIcon size="md" color="primary" />
<TrashIcon size="md" color="error" />
<PencilIcon size="sm" />
<SaveIcon size="md" color="success" />
```

### Navigation and Direction

```typescript
import { ArrowLeftIcon } from '@purplelab/icons-ui/ArrowLeftIcon';
import { ArrowRightIcon } from '@purplelab/icons-ui/ArrowRightIcon';
import { ArrowBackIcon } from '@purplelab/icons-ui/ArrowBackIcon';
import { ChevronDownIcon } from '@purplelab/icons-ui/ChevronDownIcon';
import { ChevronUpIcon } from '@purplelab/icons-ui/ChevronUpIcon';

<ArrowLeftIcon size="sm" />
<ChevronDownIcon size="md" />
```

### Alerts and Information

```typescript
import { AlertIcon } from '@purplelab/icons-ui/AlertIcon';
import { FilledAlertIcon } from '@purplelab/icons-ui/FilledAlertIcon';
import { InfoIcon } from '@purplelab/icons-ui/InfoIcon';
import { FilledInfoIcon } from '@purplelab/icons-ui/FilledInfoIcon';
import { CheckIcon } from '@purplelab/icons-ui/CheckIcon';
import { FilledCircleCheckIcon } from '@purplelab/icons-ui/FilledCircleCheckIcon';

<AlertIcon color="warning" size="md" />
<FilledAlertIcon color="error" size="md" />
<InfoIcon color="info" size="sm" />
<CheckIcon color="success" size="md" />
```

### Files and Document Management

```typescript
import { FileIcon } from '@purplelab/icons-ui/FileIcon';
import { FileCsvIcon } from '@purplelab/icons-ui/FileCsvIcon';
import { Folder } from '@purplelab/icons-ui/Folder';
import { FolderOpen } from '@purplelab/icons-ui/FolderOpen';
import { DownloadIcon } from '@purplelab/icons-ui/DownloadIcon';
import { UploadFileIcon } from '@purplelab/icons-ui/UploadFileIcon';

<FileIcon size="md" />
<FileCsvIcon size="md" />
<Folder size="md" color="primary" />
<DownloadIcon size="sm" />
```

### Menus and Controls

```typescript
import { MenuHamburgerIcon } from '@purplelab/icons-ui/MenuHamburgerIcon';
import { MenuVerticalDots } from '@purplelab/icons-ui/MenuVerticalDots';
import { MenuHorizontalDotsIcon } from '@purplelab/icons-ui/MenuHorizontalDotsIcon';
import { SettingsIcon } from '@purplelab/icons-ui/SettingsIcon';
import { FilterIcon } from '@purplelab/icons-ui/FilterIcon';

<MenuHamburgerIcon size="md" />
<MenuVerticalDots size="sm" />
<SettingsIcon size="md" />
```

### Empty States and Errors (Flow)

```typescript
import { EmptyBoxIcon } from '@purplelab/icons-ui/EmptyBoxIcon';
import { Error404Icon } from '@purplelab/icons-ui/Error404Icon';
import { ErrorFolderIcon } from '@purplelab/icons-ui/ErrorFolderIcon';
import { LockedIcon } from '@purplelab/icons-ui/LockedIcon';
import { NetworkErrorIcon } from '@purplelab/icons-ui/NetworkErrorIcon';

<EmptyBoxIcon className="size-[200px]" />
<Error404Icon className="size-[200px]" />
<LockedIcon className="size-[200px]" />
```

---

## Usage Examples

### Example 1: Buttons with Icons

```typescript
import { AddIcon } from '@purplelab/icons-ui/AddIcon';
import { TrashIcon } from '@purplelab/icons-ui/TrashIcon';
import { Button } from '@purplelab/atoms-ui/button';

const ActionButtons = () => {
  return (
    <div className="flex gap-2">
      <Button variant="primary" size="md">
        <AddIcon size="sm" className="mr-2" />
        Add Report
      </Button>

      <Button variant="destructive" size="md">
        <TrashIcon size="sm" className="mr-2" />
        Delete
      </Button>
    </div>
  );
};
```

### Example 2: List with Status Icons

```typescript
import { CheckIcon } from '@purplelab/icons-ui/CheckIcon';
import { ClockIcon } from '@purplelab/icons-ui/ClockIcon';
import { AlertIcon } from '@purplelab/icons-ui/AlertIcon';

const TaskList = ({ tasks }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckIcon size="sm" color="success" />;
      case 'pending':
        return <ClockIcon size="sm" color="warning" />;
      case 'failed':
        return <AlertIcon size="sm" color="error" />;
      default:
        return null;
    }
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} className="flex items-center gap-2">
          {getStatusIcon(task.status)}
          <span>{task.name}</span>
        </li>
      ))}
    </ul>
  );
};
```

### Example 3: Dropdown Menu

```typescript
import { MenuVerticalDots } from '@purplelab/icons-ui/MenuVerticalDots';
import { EyeIcon } from '@purplelab/icons-ui/EyeIcon';
import { PencilIcon } from '@purplelab/icons-ui/PencilIcon';
import { TrashIcon } from '@purplelab/icons-ui/TrashIcon';
import { DownloadIcon } from '@purplelab/icons-ui/DownloadIcon';

const ActionsCell = ({ reportId }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuVerticalDots size="sm" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <EyeIcon size="sm" className="mr-2" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PencilIcon size="sm" className="mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DownloadIcon size="sm" className="mr-2" />
          Download
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TrashIcon size="sm" className="mr-2" color="error" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
```

### Example 4: Search Input

```typescript
import { SearchIcon } from '@purplelab/icons-ui/SearchIcon';
import { XIcon } from '@purplelab/icons-ui/XIcon';
import { useState } from 'react';

const SearchInput = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="relative">
      <SearchIcon
        size="sm"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-10 py-2 border rounded"
        placeholder="Search reports..."
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <XIcon size="sm" className="text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};
```

### Example 5: Empty State

```typescript
import { EmptyBoxIcon } from '@purplelab/icons-ui/EmptyBoxIcon';
import { AddIcon } from '@purplelab/icons-ui/AddIcon';
import { Button } from '@purplelab/atoms-ui/button';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <EmptyBoxIcon className="size-[200px] mb-6" />
      <h3 className="text-lg font-semibold mb-2">No reports yet</h3>
      <p className="text-gray-600 mb-6">
        Create your first report to get started
      </p>
      <Button variant="primary">
        <AddIcon size="sm" className="mr-2" />
        Create Report
      </Button>
    </div>
  );
};
```

### Example 6: Tabs with Icons

```typescript
import { ActivityIcon } from '@purplelab/icons-ui/ActivityIcon';
import { FileIcon } from '@purplelab/icons-ui/FileIcon';
import { UsersIcon } from '@purplelab/icons-ui/UsersIcon';
import { SettingsIcon } from '@purplelab/icons-ui/SettingsIcon';

const TabNavigation = ({ activeTab, onChange }) => {
  const tabs = [
    { id: 'activity', label: 'Activity', icon: ActivityIcon },
    { id: 'files', label: 'Files', icon: FileIcon },
    { id: 'users', label: 'Users', icon: UsersIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  return (
    <div className="flex border-b">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 border-b-2
              ${isActive
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600'
              }
            `}
          >
            <Icon
              size="sm"
              color={isActive ? 'primary' : 'default'}
            />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
```

### Example 7: Toast with Icons

```typescript
import { CheckIcon } from '@purplelab/icons-ui/CheckIcon';
import { AlertIcon } from '@purplelab/icons-ui/AlertIcon';
import { InfoIcon } from '@purplelab/icons-ui/InfoIcon';
import { XIcon } from '@purplelab/icons-ui/XIcon';
import { useToast } from '@purplelab/atoms-ui/toast/use-toast';

const useNotifications = () => {
  const { toast } = useToast();

  const showSuccess = (message: string) => {
    toast({
      title: (
        <div className="flex items-center gap-2">
          <CheckIcon size="sm" color="success" />
          Success
        </div>
      ),
      description: message,
      variant: 'default'
    });
  };

  const showError = (message: string) => {
    toast({
      title: (
        <div className="flex items-center gap-2">
          <AlertIcon size="sm" color="error" />
          Error
        </div>
      ),
      description: message,
      variant: 'determinal'
    });
  };

  return { showSuccess, showError };
};
```

---

## Customization

### Custom Sizes

Use className for custom sizes:

```typescript
<AddIcon className="size-[32px]" />
<AddIcon className="w-8 h-8" />
<AddIcon className="size-12" />
```

### Custom Colors

Icons inherit `currentColor` by default:

```typescript
<div className="text-blue-500">
  <AddIcon size="md" />  {/* Will be blue */}
</div>

<AddIcon className="fill-purple-600" size="md" />
<AddIcon style={{ fill: '#FF5733' }} size="md" />
```

### Animations

Use Tailwind classes for animations:

```typescript
<SpinnerIcon
  size="md"
  className="animate-spin"
/>

<ArrowRightIcon
  size="sm"
  className="transition-transform hover:translate-x-1"
/>

<StarIcon
  size="md"
  className="transition-colors hover:fill-yellow-400"
/>
```

### Interactivity

```typescript
<TrashIcon
  size="md"
  className="cursor-pointer hover:fill-red-600 transition-colors"
  onClick={handleDelete}
  title="Delete item"
/>
```

---

## Creating New Icons

### Complete Process

Follow the process documented in the package [README.md](packages/icons-ui/README.md):

#### 1. Download from Figma

- Download the icon in **SVG** format
- Make sure it maintains design details

#### 2. Resize (if necessary)

If the icon is **larger than 20px**, resize it using:
[https://www.svgviewer.dev/](https://www.svgviewer.dev/)

**Steps:**

1. Upload the SVG file
2. Adjust dimensions to **20x20px**
3. Download the resized file

#### 3. Convert Stroke to Fill

Use the tool:
[https://iconly.io/tools/svg-convert-stroke-to-fill](https://iconly.io/tools/svg-convert-stroke-to-fill)

**Steps:**

1. Upload the SVG file
2. Select "Convert Stroke to Fill"
3. Download the converted file

#### 4. Create the Component

Create a new file in `src/icons/icon-name.tsx`:

```typescript
import IconBase, { IconProps } from '@/icon-base-color';

const IconName = ({ className, color, size, ...props }: Readonly<IconProps>) => {
  return (
    <IconBase
      className={className}
      color={color}
      size={size}
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        d="[YOUR SVG PATH HERE]"
        fillRule="evenodd"
      />
    </IconBase>
  );
};

export { IconName };
```

#### 5. Export in package.json

Add the export in `package.json`:

```json
"./IconName": {
  "types": "./dist/icons/icon-name.d.ts",
  "import": "./dist/icons/icon-name.mjs",
  "default": "./dist/icons/icon-name.js"
}
```

#### 6. Build and Test

```bash
npm run build
npm run type-check
```

### Template for Flow Icons

For icons with fixed colors (don't inherit currentColor):

```typescript
import { IconBaseFlow } from '@/icon-base-color-flow';
import { IconProps } from '@/icon-base-color';

const FlowIconName = ({ className, size, ...props }: Readonly<IconProps>) => {
  return (
    <IconBaseFlow
      className={className}
      size={size}
      viewBox="0 0 200 200"
      {...props}
    >
      <path fill="#specific-color" d="..." />
      <circle fill="#another-color" cx="100" cy="100" r="50" />
    </IconBaseFlow>
  );
};

export { FlowIconName };
```

---

## Best Practices

### 1. Optimized Import

```typescript
// ✅ Correct - Tree-shaking
import { AddIcon } from '@purplelab/icons-ui/AddIcon';
import { TrashIcon } from '@purplelab/icons-ui/TrashIcon';

// ❌ Incorrect - Imports everything
import { AddIcon, TrashIcon } from '@purplelab/icons-ui';
```

### 2. Size Consistency

Use predefined sizes to maintain consistency:

```typescript
// ✅ Correct
<AddIcon size="sm" />  // 20px
<AddIcon size="md" />  // 24px

// ⚠️ Only when necessary
<AddIcon className="size-[22px]" />
```

### 3. Accessibility

```typescript
// For decorative icons (default)
<AddIcon size="md" />  // aria-hidden="true" by default

// For icons with semantic meaning
<AddIcon
  size="md"
  aria-hidden={false}
  aria-label="Add new item"
  role="img"
/>

// In buttons, the button text provides the label
<button>
  <AddIcon size="sm" />  {/* aria-hidden="true" is fine */}
  Add Item
</button>
```

### 4. Semantic Colors

Use color variants to maintain consistency:

```typescript
// ✅ Correct - Use semantic variants
<TrashIcon color="error" />
<CheckIcon color="success" />
<InfoIcon color="info" />

// ⚠️ Only when you need brand-specific colors
<CustomIcon className="fill-brand-purple" />
```

### 5. Performance

```typescript
// ✅ Correct - Icons are lightweight components
const icons = items.map(item => (
  <div key={item.id}>
    <CheckIcon size="sm" />
    {item.name}
  </div>
));

// No need to memoize simple icons
// Only memoize if parent component has complex logic
```

### 6. Reusability

Create wrapper components for icons with specific styles:

```typescript
// utils/icons.tsx
import { CheckIcon } from '@purplelab/icons-ui/CheckIcon';

export const SuccessIcon = () => (
  <CheckIcon
    size="sm"
    color="success"
    className="animate-bounce"
  />
);

export const ErrorIcon = () => (
  <AlertIcon
    size="sm"
    color="error"
    className="animate-pulse"
  />
);
```

---

## Troubleshooting

### Error: "Cannot find module '@purplelab/icons-ui/IconName'"

**Cause:** Incorrect import or icon doesn't exist

**Solution:**

```typescript
// Verify the exact name in the catalog
import { AddIcon } from '@purplelab/icons-ui/AddIcon';

// Name must match the export in package.json
```

### Icon doesn't show the correct color

**Cause:** Icon uses `currentColor` and inherits from context

**Solution:**

```typescript
// Option 1: Use the color prop
<AddIcon color="primary" />

// Option 2: Wrap in a div with color
<div className="text-blue-500">
  <AddIcon size="md" />
</div>

// Option 3: Use className
<AddIcon className="fill-blue-500" />
```

### Icon size is not applied

**Cause:** Conflicting styles or className override

**Solution:**

```typescript
// size prop has lower specificity than className
<AddIcon size="md" className="size-8" />  // size-8 wins

// If you need both, use !important or adjust specificity
<AddIcon size="md" className="!size-8" />
```

### Icons don't have tree-shaking

**Cause:** Import from index

**Solution:**

```typescript
// ❌ Avoid
import { AddIcon } from '@purplelab/icons-ui';

// ✅ Use
import { AddIcon } from '@purplelab/icons-ui/AddIcon';
```

### Build error: "Cannot resolve icon path"

**Cause:** Incorrect internal path in icon component

**Solution:**

```typescript
// In the icon file, use @ alias for imports
import IconBase from '@/icon-base-color';

// DO NOT use relative paths
import IconBase from '../icon-base-color'; // ❌
```

---

## Available Exports - Quick Reference

### Base Components

```typescript
import IconBase from '@purplelab/icons-ui/IconBase';
import { IconBaseFlow } from '@purplelab/icons-ui/IconBaseFlow';
```

### Common Icons

```typescript
// Actions
import { AddIcon } from '@purplelab/icons-ui/AddIcon';
import { TrashIcon } from '@purplelab/icons-ui/TrashIcon';
import { PencilIcon } from '@purplelab/icons-ui/PencilIcon';
import { SaveIcon } from '@purplelab/icons-ui/SaveIcon';
import { CopyIcon } from '@purplelab/icons-ui/CopyIcon';

// Navigation
import { ArrowLeftIcon } from '@purplelab/icons-ui/ArrowLeftIcon';
import { ArrowRightIcon } from '@purplelab/icons-ui/ArrowRightIcon';
import { ChevronDownIcon } from '@purplelab/icons-ui/ChevronDownIcon';
import { ChevronUpIcon } from '@purplelab/icons-ui/ChevronUpIcon';

// UI
import { SearchIcon } from '@purplelab/icons-ui/SearchIcon';
import { FilterIcon } from '@purplelab/icons-ui/FilterIcon';
import { SettingsIcon } from '@purplelab/icons-ui/SettingsIcon';
import { XIcon } from '@purplelab/icons-ui/XIcon';
import { CheckIcon } from '@purplelab/icons-ui/CheckIcon';

// Alerts
import { AlertIcon } from '@purplelab/icons-ui/AlertIcon';
import { InfoIcon } from '@purplelab/icons-ui/InfoIcon';
import { FilledAlertIcon } from '@purplelab/icons-ui/FilledAlertIcon';
import { FilledInfoIcon } from '@purplelab/icons-ui/FilledInfoIcon';

// Empty states
import { EmptyBoxIcon } from '@purplelab/icons-ui/EmptyBoxIcon';
import { Error404Icon } from '@purplelab/icons-ui/Error404Icon';
import { ErrorFolderIcon } from '@purplelab/icons-ui/ErrorFolderIcon';
```

See [Complete catalog](#icon-catalog) for all 84 available icons.

---

## Additional Resources

- [organisms-ui Guide](../ORGANISMS-UI-GUIDE.md)
- [atoms-ui Guide](../packages/atoms-ui/README.md)
- [Architecture Guide](../CLAUDE.md)
- [Figma Design System](https://figma.com/...)

---

## Contributing

### Adding a New Icon

1. Follow the [creation process](#creating-new-icons)
2. Run `npm run type-check`
3. Create a PR with:
   - The new icon file
   - Export in package.json
   - Screenshot of the icon in the PR

### Report Issues

To report issues or request new icons, contact the Purplelab design or development team.

---

## Changelog

### v2.3.1

- 84 icons available
- React 19.1.2 support
- Tree-shaking optimization
- Improved size and color variants

---

**Last updated:** December 2024
**Maintained by:** Purplelab Development Team

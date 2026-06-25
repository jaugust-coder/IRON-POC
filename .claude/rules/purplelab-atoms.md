# Complete Usage Guide - @purplelab/atoms-ui

## Table of Contents

1. [Introduction](#introduction)
2. [Installation and Setup](#installation-and-setup)
3. [Available Components](#available-components)
4. [Usage Examples](#usage-examples)
5. [Style Configuration](#style-configuration)
6. [Utilities](#utilities)
7. [Best Practices](#best-practices)

---

## Introduction

`@purplelab/atoms-ui` is a UI component library built on Radix UI and Tailwind CSS, specifically designed for Purplelab applications. The library provides reusable, accessible, and styled components that follow the Purplelab design system.

**Current Version:** 11.1.5

**Main Dependencies:**

- React 19.1.2
- Radix UI (multiple packages)
- Tailwind CSS 4.1.5
- AG Grid 33.1.0 (for grid components)
- React Hook Form 7.54.2
- Zod 3.24.1
- Recharts 3.4.1

---

## Installation and Setup

### 1. Add the Dependency

In your `package.json`, add the dependency:

```json
{
  "dependencies": {
    "@purplelab/atoms-ui": "*"
  }
}
```

### 2. Configure Styles

Import CSS theme variables in your main file (for example, `layout.tsx` or `_app.tsx`):

```tsx
// In your layout.tsx or root file
import '@purplelab/atoms-ui/default-theme-variables.css';
```

### 3. Configure Toaster (optional but recommended)

To use toast notifications, add the `Toaster` component to your layout:

```tsx
import { Toaster } from '@purplelab/atoms-ui/toast/toaster';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

---

## Available Components

### Basic UI Components

#### **Button**

```tsx
import { Button, IconButton } from '@purplelab/atoms-ui/button';
```

Main Props:

- `variant`: `'primary'` | `'secondary'` | `'secondary-subtle'` | `'tertiary'` | `'tertiary-subtle'` | `'determinal'` | `'determinal-ghost'` | `'warning'` | `'warning-ghost'`
- `size`: `'lg'` | `'md'` | `'sm'` | `'xs'`
- `startIcon`: React.ReactNode
- `endIcon`: React.ReactNode
- `isLoading`: boolean
- `disabled`: boolean

Example:

```tsx
<Button variant="primary" size="lg" startIcon={<Icon />}>
  Guardar
</Button>

<IconButton variant="tertiary" size="md">
  <TrashIcon />
</IconButton>
```

---

#### **Input**

```tsx
import {
  InputSearchInput,
  MultiSelectContextProvider,
  useInputDebounce,
  useMultiSelectContext,
  SearchDropdownContextProvider,
  useSearchDropdownContext
} from '@purplelab/atoms-ui/input';
```

Exports:

- `InputSearchInput`: Search input with debounce
- `MultiSelectContextProvider`: Context for multi-selects with selection limit
- `SearchDropdownContextProvider`: Context for searchable dropdowns
- `MultiSelectOption`: Type for multi-select options
- `useInputDebounce`: Hook for input debouncing
- `useMultiSelectContext`: Hook to access multi-select context
- `useSearchDropdownContext`: Hook to access search dropdown context

Basic Example:

```tsx
import { useState } from 'react';
import { InputSearchInput } from '@purplelab/atoms-ui/input';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <InputSearchInput
      placeholder="Buscar reportes..."
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      inputSize="sm"
      className="w-full"
    />
  );
}
```

Example with Debounce:

```tsx
import { useState, useEffect } from 'react';
import { InputSearchInput, useInputDebounce } from '@purplelab/atoms-ui/input';

function SearchWithDebounce() {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useInputDebounce(searchValue, 500);

  // debouncedSearch se actualiza 500ms después del último cambio
  useEffect(() => {
    if (debouncedSearch) {
      performSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <InputSearchInput
      placeholder="Buscar..."
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
}
```

Example with MultiSelectContextProvider:

```tsx
import {
  MultiSelectContextProvider,
  useMultiSelectContext
} from '@purplelab/atoms-ui/input';

const MAX_FIELDS = 50;

function FieldsSelector() {
  return (
    <MultiSelectContextProvider maxSelected={MAX_FIELDS}>
      <FieldsDrawer />
    </MultiSelectContextProvider>
  );
}

// En componente hijo
function FieldsDrawer() {
  const { countSelected, selectedOptions, initMultiSelectOptions } =
    useMultiSelectContext();

  return (
    <div>
      <p>
        Campos: {countSelected} / {MAX_FIELDS}
      </p>
    </div>
  );
}
```

---

#### **Select**

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@purplelab/atoms-ui/select';
```

Standard select component based on Radix UI.

Main Props of SelectTrigger:

- `inputSize`: `'lg'` | `'md'` | `'sm'`

Basic Example:

```tsx
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@purplelab/atoms-ui/select';

function CategorySelect() {
  const [value, setValue] = useState('');

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger inputSize="md">
        <SelectValue placeholder="Selecciona una categoría" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="category1">Categoría 1</SelectItem>
        <SelectItem value="category2">Categoría 2</SelectItem>
        <SelectItem value="category3">Categoría 3</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

Example with Groups:

```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger inputSize="lg">
    <SelectValue placeholder="Selecciona un reporte" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Reportes Activos</SelectLabel>
      <SelectItem value="report1">Reporte Mensual</SelectItem>
      <SelectItem value="report2">Reporte Anual</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Reportes Archivados</SelectLabel>
      <SelectItem value="report3">Reporte 2023</SelectItem>
      <SelectItem value="report4">Reporte 2022</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

---

#### **Checkbox**

```tsx
import { Checkbox } from '@purplelab/atoms-ui/checkbox';
```

Checkbox based on Radix UI with support for indeterminate state.

Main Props:

- `checked`: boolean | 'indeterminate'
- `indeterminated`: boolean (displays minus icon instead of check)
- `disabled`: boolean
- `onCheckedChange`: (checked: boolean) => void

Basic Example:

```tsx
import { useState } from 'react';
import { Checkbox } from '@purplelab/atoms-ui/checkbox';
import { Label } from '@purplelab/atoms-ui/label';

function AcceptTerms() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" checked={accepted} onCheckedChange={setAccepted} />
      <Label htmlFor="terms" className="cursor-pointer">
        Acepto los términos y condiciones
      </Label>
    </div>
  );
}
```

Example with Indeterminate State:

```tsx
import { useState } from 'react';
import { Checkbox } from '@purplelab/atoms-ui/checkbox';
import { Label } from '@purplelab/atoms-ui/label';

function MultiSelectCheckbox() {
  const [parentChecked, setParentChecked] = useState(false);
  const [child1, setChild1] = useState(false);
  const [child2, setChild2] = useState(false);

  const allChecked = child1 && child2;
  const someChecked = child1 || child2;
  const isIndeterminate = someChecked && !allChecked;

  const handleParentChange = (checked: boolean) => {
    setChild1(checked);
    setChild2(checked);
    setParentChecked(checked);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id="parent"
          checked={allChecked}
          indeterminated={isIndeterminate}
          onCheckedChange={handleParentChange}
        />
        <Label htmlFor="parent" className="cursor-pointer">
          Seleccionar todos
        </Label>
      </div>
      <div className="ml-6 space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox id="child1" checked={child1} onCheckedChange={setChild1} />
          <Label htmlFor="child1" className="cursor-pointer">
            Opción 1
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="child2" checked={child2} onCheckedChange={setChild2} />
          <Label htmlFor="child2" className="cursor-pointer">
            Opción 2
          </Label>
        </div>
      </div>
    </div>
  );
}
```

---

#### **Radio Group**

```tsx
import { RadioGroup, RadioGroupItem } from '@purplelab/atoms-ui/radio-group';
```

Radio group based on Radix UI for single selection.

Main Props of RadioGroup:

- `value`: string
- `onValueChange`: (value: string) => void
- `disabled`: boolean

Main Props of RadioGroupItem:

- `value`: string (required)
- `disabled`: boolean

Basic Example:

```tsx
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@purplelab/atoms-ui/radio-group';
import { Label } from '@purplelab/atoms-ui/label';

function NotificationSettings() {
  const [frequency, setFrequency] = useState('daily');

  return (
    <div className="space-y-3">
      <h3 className="text-body-lg font-medium">Frecuencia de notificaciones</h3>
      <RadioGroup value={frequency} onValueChange={setFrequency}>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="realtime" id="realtime" />
          <Label htmlFor="realtime" className="cursor-pointer">
            Tiempo real
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="daily" id="daily" />
          <Label htmlFor="daily" className="cursor-pointer">
            Diario
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="weekly" id="weekly" />
          <Label htmlFor="weekly" className="cursor-pointer">
            Semanal
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="never" id="never" />
          <Label htmlFor="never" className="cursor-pointer">
            Nunca
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
```

---

#### **Switch**

```tsx
import { Switch } from '@purplelab/atoms-ui/switch';
```

Toggle switch component based on Radix UI.

Main Props:

- `checked`: boolean
- `onCheckedChange`: (checked: boolean) => void
- `disabled`: boolean

Basic Example:

```tsx
import { useState } from 'react';
import { Switch } from '@purplelab/atoms-ui/switch';
import { Label } from '@purplelab/atoms-ui/label';

function EnableNotifications() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <Switch
        id="notifications"
        checked={enabled}
        onCheckedChange={setEnabled}
      />
      <Label htmlFor="notifications" className="cursor-pointer">
        Activar notificaciones
      </Label>
    </div>
  );
}
```

Example with Multiple Switches:

```tsx
import { useState } from 'react';
import { Switch } from '@purplelab/atoms-ui/switch';
import { Label } from '@purplelab/atoms-ui/label';

function PrivacySettings() {
  const [settings, setSettings] = useState({
    publicProfile: false,
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-body-lg font-medium">Configuración de privacidad</h3>

      <div className="flex items-center justify-between">
        <Label htmlFor="public" className="cursor-pointer">
          Perfil público
        </Label>
        <Switch
          id="public"
          checked={settings.publicProfile}
          onCheckedChange={(checked) => updateSetting('publicProfile', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="email" className="cursor-pointer">
          Notificaciones por email
        </Label>
        <Switch
          id="email"
          checked={settings.emailNotifications}
          onCheckedChange={(checked) =>
            updateSetting('emailNotifications', checked)
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="push" className="cursor-pointer">
          Notificaciones push
        </Label>
        <Switch
          id="push"
          checked={settings.pushNotifications}
          onCheckedChange={(checked) =>
            updateSetting('pushNotifications', checked)
          }
        />
      </div>
    </div>
  );
}
```

---

#### **Label**

```tsx
import { Label } from '@purplelab/atoms-ui/label';
```

Form label based on Radix UI.

Main Props:

- `htmlFor`: string (ID of associated input)

Basic Example:

```tsx
import { Label } from '@purplelab/atoms-ui/label';
import { Input } from '@purplelab/atoms-ui/input';

function FormField() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Correo electrónico</Label>
      <Input id="email" type="email" placeholder="ejemplo@correo.com" />
    </div>
  );
}
```

---

#### **Text Area**

```tsx
import { Textarea } from '@purplelab/atoms-ui/text-area';
```

TextArea for multiline text.

Main Props:

- `inputSize`: `'lg'` | `'md'` | `'sm'`
- `placeholder`: string
- `disabled`: boolean
- `rows`: number (height in rows)

Basic Example:

```tsx
import { useState } from 'react';
import { Textarea } from '@purplelab/atoms-ui/text-area';
import { Label } from '@purplelab/atoms-ui/label';

function CommentForm() {
  const [comment, setComment] = useState('');

  return (
    <div className="space-y-2">
      <Label htmlFor="comment">Comentario</Label>
      <Textarea
        id="comment"
        inputSize="md"
        placeholder="Escribe tu comentario aquí..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      />
      <p className="text-system-neutral-600 text-body-sm">
        {comment.length} / 500 caracteres
      </p>
    </div>
  );
}
```

Example with Validation:

```tsx
import { useState } from 'react';
import { Textarea } from '@purplelab/atoms-ui/text-area';
import { Label } from '@purplelab/atoms-ui/label';
import { Button } from '@purplelab/atoms-ui/button';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (feedback.trim().length < 10) {
      setError('El comentario debe tener al menos 10 caracteres');
      return;
    }
    setError('');
    // Enviar feedback...
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="feedback">
          Feedback <span className="text-system-determinal-500">*</span>
        </Label>
        <Textarea
          id="feedback"
          inputSize="lg"
          placeholder="Cuéntanos tu experiencia..."
          value={feedback}
          onChange={(e) => {
            setFeedback(e.target.value);
            setError('');
          }}
          rows={6}
          aria-invalid={!!error}
          className={error ? 'border-system-determinal-500' : ''}
        />
        {error && (
          <p className="text-body-sm text-system-determinal-500">{error}</p>
        )}
      </div>
      <Button onClick={handleSubmit}>Enviar feedback</Button>
    </div>
  );
}
```

---

### Layout Components

#### **Container**

```tsx
import { Container } from '@purplelab/atoms-ui/container';
```

Main container for pages.

Example:

```tsx
<Container>
  <div>Contenido de la página</div>
</Container>
```

---

#### **Grid System**

```tsx
import { GridSystem } from '@purplelab/atoms-ui/grid-system';
```

Responsive grid system.

Example:

```tsx
<GridSystem>
  <div>Columna 1</div>
  <div>Columna 2</div>
</GridSystem>
```

---

#### **Separator**

```tsx
import { Separator } from '@purplelab/atoms-ui/separator';
```

Horizontal or vertical divider based on Radix UI.

Main Props:

- `orientation`: `'horizontal'` | `'vertical'` (default: `'horizontal'`)
- `decorative`: boolean (default: `true`)

Basic Horizontal Example:

```tsx
import { Separator } from '@purplelab/atoms-ui/separator';

function MenuSection() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-heading-xs">Perfil</h3>
        <p className="text-system-neutral-600 text-body-sm">
          Administra tu información personal
        </p>
      </div>

      <Separator />

      <div>
        <h3 className="text-heading-xs">Seguridad</h3>
        <p className="text-system-neutral-600 text-body-sm">
          Configura tu contraseña y autenticación
        </p>
      </div>
    </div>
  );
}
```

Example with Viewtical Orientation:

```tsx
import { Separator } from '@purplelab/atoms-ui/separator';

function Toolbar() {
  return (
    <div className="flex items-center gap-4">
      <button>Cortar</button>
      <button>Copiar</button>
      <button>Pegar</button>

      <Separator orientation="vertical" className="h-6" />

      <button>Deshacer</button>
      <button>Rehacer</button>

      <Separator orientation="vertical" className="h-6" />

      <button>Buscar</button>
      <button>Reemplazar</button>
    </div>
  );
}
```

---

### Navigation Components

#### **Header Page**

```tsx
import { HeaderPage, HeaderPageActions } from '@purplelab/atoms-ui/header-page';
```

Page header with title and actions.

Example:

```tsx
<HeaderPage title="Crear Reporte">
  <HeaderPageActions>
    <Button>Guardar</Button>
    <Button variant="secondary">Cancelar</Button>
  </HeaderPageActions>
</HeaderPage>
```

---

#### **Navbar**

```tsx
import {
  NavbarMenu,
  NavbarBrand,
  NavbarOptions
} from '@purplelab/atoms-ui/navbar';
```

Top navigation bar for the application.

Basic Example:

```tsx
import {
  NavbarMenu,
  NavbarBrand,
  NavbarOptions
} from '@purplelab/atoms-ui/navbar';
import { Button, IconButton } from '@purplelab/atoms-ui/button';

function AppNavbar() {
  return (
    <NavbarMenu>
      <NavbarBrand>
        <img src="/logo.svg" alt="Logo" className="h-8" />
        <span className="text-heading-xs">Mi Aplicación</span>
      </NavbarBrand>

      <NavbarOptions>
        <Button variant="tertiary" size="sm">
          Inicio
        </Button>
        <Button variant="tertiary" size="sm">
          Reportes
        </Button>
        <Button variant="tertiary" size="sm">
          Configuración
        </Button>
      </NavbarOptions>
    </NavbarMenu>
  );
}
```

Example with User Actions:

```tsx
import {
  NavbarMenu,
  NavbarBrand,
  NavbarOptions
} from '@purplelab/atoms-ui/navbar';
import { Button, IconButton } from '@purplelab/atoms-ui/button';
import { Avatar } from '@purplelab/atoms-ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@purplelab/atoms-ui/dropdown-menu';

function CompleteNavbar() {
  return (
    <NavbarMenu>
      <NavbarBrand>
        <img src="/logo.svg" alt="Logo" className="h-8" />
        <span className="text-heading-xs">HealthNexus</span>
      </NavbarBrand>

      <NavbarOptions>
        <Button variant="tertiary" size="sm">
          Dashboard
        </Button>
        <Button variant="tertiary" size="sm">
          Reportes
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton variant="tertiary" size="sm">
              <Avatar src="/user.jpg" fallback="JD" />
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </NavbarOptions>
    </NavbarMenu>
  );
}
```

---

#### **Breadcrumb**

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@purplelab/atoms-ui/breadcrumb';
```

Hierarchical navigation component that shows the current path.

Basic Example:

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@purplelab/atoms-ui/breadcrumb';

function PageBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/reportes">Reportes</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Reporte Anual 2024</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

Example with Next.js Link:

```tsx
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@purplelab/atoms-ui/breadcrumb';

function DynamicBreadcrumb({
  paths
}: {
  paths: Array<{ label: string; href?: string }>;
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {path.href ? (
                <BreadcrumbLink asChild>
                  <Link href={path.href}>{path.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{path.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < paths.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Uso:
// <DynamicBreadcrumb
//   paths={[
//     { label: 'Dashboard', href: '/dashboard' },
//     { label: 'Settings', href: '/dashboard/settings' },
//     { label: 'Profile' }
//   ]}
// />
```

---

#### **Tabs**

```tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@purplelab/atoms-ui/tabs';
```

Tab component to organize content.

Complete Example:

```tsx
import { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@purplelab/atoms-ui/tabs';

function FolderManagement() {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <Tabs
      value={activeTab}
      className="flex w-full grow flex-col"
      onValueChange={setActiveTab}
    >
      <TabsList className="pl-150">
        <TabsTrigger value="active">Active Reports</TabsTrigger>
        <TabsTrigger value="trash">Trash</TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="grow py-50">
        <div>Contenido de reportes activos</div>
      </TabsContent>

      <TabsContent value="trash" className="grow py-50">
        <div>Contenido de papelera</div>
      </TabsContent>
    </Tabs>
  );
}
```

---

### Feedback Components

#### **Toast**

```tsx
import { useToast } from '@purplelab/atoms-ui/toast/use-toast';
import { Toaster } from '@purplelab/atoms-ui/toast/toaster';
```

Complete Example:

```tsx
// En tu componente
import { useToast } from '@purplelab/atoms-ui/toast/use-toast';

function MyComponent() {
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: 'Éxito',
      description: 'La operación se completó correctamente',
      variant: 'success'
    });
  };

  const handleError = () => {
    toast({
      title: 'Error',
      description: 'Ocurrió un error al procesar la solicitud',
      variant: 'destructive'
    });
  };

  return (
    <div>
      <Button onClick={handleSuccess}>Mostrar éxito</Button>
      <Button onClick={handleError}>Mostrar error</Button>
    </div>
  );
}
```

---

#### **Alert**

```tsx
import { Alert, AlertDescription } from '@purplelab/atoms-ui/alert';
```

Example:

```tsx
<Alert variant="warning">
  <AlertDescription>
    Advertencia: Esta acción no se puede deshacer
  </AlertDescription>
</Alert>
```

---

#### **Spinner**

```tsx
import { Spinner } from '@purplelab/atoms-ui/spinner';
```

Indicador of carga animado circular.

Main Props:

- `size`: `'sm'` | `'md'` | `'lg'` | `'xl'` (default: `'lg'`)
- `thickness`: number (grosor of spinner, default: 9)

Basic Example:

```tsx
import { Spinner } from '@purplelab/atoms-ui/spinner';

function LoadingComponent() {
  return (
    <div className="flex items-center justify-center p-8">
      <Spinner size="lg" />
    </div>
  );
}
```

Example with Different Sizes:

```tsx
import { Spinner } from '@purplelab/atoms-ui/spinner';

function SpinnerSizes() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  );
}
```

Example in Button with Loading State:

```tsx
import { useState } from 'react';
import { Button } from '@purplelab/atoms-ui/button';
import { Spinner } from '@purplelab/atoms-ui/spinner';

function SubmitButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await saveData();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleSubmit} disabled={isLoading}>
      {isLoading ? (
        <>
          <Spinner size="sm" />
          <span className="ml-2">Guardando...</span>
        </>
      ) : (
        'Guardar'
      )}
    </Button>
  );
}
```

Example with Custom Thickness:

```tsx
import { Spinner } from '@purplelab/atoms-ui/spinner';

function CustomThickness() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="lg" thickness={5} />
      <Spinner size="lg" thickness={9} />
      <Spinner size="lg" thickness={15} />
    </div>
  );
}
```

---

#### **Spinner Loader**

```tsx
import { SpinnerLoader } from '@purplelab/atoms-ui/spinner-loader';
```

Spinner loader with icon, ideal for loading statuses in full page.

Main Props:

- `size`: `'sm'` | `'md'` | `'lg'` | `'xl'` (default: `'sm'`)
- `color`: `'info'` | `'warning'` | `'success'` | `'error'` | `'neutral'` (default: `'neutral'`)

Basic Example:

```tsx
import { SpinnerLoader } from '@purplelab/atoms-ui/spinner-loader';

function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SpinnerLoader size="xl" color="neutral" />
    </div>
  );
}
```

Example with Different Colors:

```tsx
import { SpinnerLoader } from '@purplelab/atoms-ui/spinner-loader';

function LoadingStates() {
  return (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <SpinnerLoader size="lg" color="info" />
        <p className="mt-2 text-body-sm">Cargando...</p>
      </div>
      <div className="text-center">
        <SpinnerLoader size="lg" color="success" />
        <p className="mt-2 text-body-sm">Procesando...</p>
      </div>
      <div className="text-center">
        <SpinnerLoader size="lg" color="warning" />
        <p className="mt-2 text-body-sm">Esperando...</p>
      </div>
    </div>
  );
}
```

Example in Overlay:

```tsx
import { SpinnerLoader } from '@purplelab/atoms-ui/spinner-loader';

function FullPageLoader({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <div className="bg-black/50 fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white flex flex-col items-center gap-4 rounded-lg p-8">
        <SpinnerLoader size="xl" color="neutral" />
        <p className="text-body-lg">Cargando datos...</p>
      </div>
    </div>
  );
}
```

---

#### **Dots Loader**

```tsx
import { DotsLoader } from '@purplelab/atoms-ui/dots-loader';
```

Example:

```tsx
<DotsLoader size="md" color="var(--primary-500)" />
```

---

#### **Skeleton**

```tsx
import { Skeleton } from '@purplelab/atoms-ui/skeleton';
```

Componente placeholder animado for statuses of carga.

Basic Example:

```tsx
import { Skeleton } from '@purplelab/atoms-ui/skeleton';

function LoadingCard() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[150px]" />
    </div>
  );
}
```

Example Card with Skeleton:

```tsx
import { Skeleton } from '@purplelab/atoms-ui/skeleton';
import { Card, CardHeader, CardContent } from '@purplelab/atoms-ui/card';

function ProfileCardSkeleton() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-3 w-[150px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  );
}
```

Example with Item List:

```tsx
import { Skeleton } from '@purplelab/atoms-ui/skeleton';

function ListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

Example with Skeleton Table:

```tsx
import { Skeleton } from '@purplelab/atoms-ui/skeleton';

function TableSkeleton() {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
      </div>

      {/* Rows */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-16 w-1/4" />
          <Skeleton className="h-16 w-1/4" />
          <Skeleton className="h-16 w-1/4" />
          <Skeleton className="h-16 w-1/4" />
        </div>
      ))}
    </div>
  );
}
```

---

#### **Async Task Status**

```tsx
import AsyncTaskStatus from '@purplelab/atoms-ui/async-task-status';
```

Status component for asynchronous tasks with visual indicators of success, error, and processing.

Main Props:

- `statusTask`: string (estado actual of the tarea)
- `statusConfig`: objeto with arrays of statuses for `success`, `processing` and `error`

Basic Example:

```tsx
import AsyncTaskStatus from '@purplelab/atoms-ui/async-task-status';

type ReportStatus = 'GENERATED' | 'IN_PROGRESS' | 'FAILED';

function ReportStatusDisplay({ status }: { status: ReportStatus }) {
  return (
    <AsyncTaskStatus
      statusTask={status}
      statusConfig={{
        success: ['GENERATED'],
        processing: ['IN_PROGRESS'],
        error: ['FAILED']
      }}
    />
  );
}
```

Example with Multiple States:

```tsx
import AsyncTaskStatus from '@purplelab/atoms-ui/async-task-status';

type TaskStatus =
  | 'CREATED'
  | 'QUEUED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED';

function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <AsyncTaskStatus
      statusTask={status}
      statusConfig={{
        success: ['COMPLETED'],
        processing: ['CREATED', 'QUEUED', 'PROCESSING'],
        error: ['FAILED', 'CANCELLED']
      }}
    />
  );
}
```

Example in Task List:

```tsx
import AsyncTaskStatus from '@purplelab/atoms-ui/async-task-status';

type JobStatus = 'PENDING' | 'RUNNING' | 'SUCCESS' | 'ERROR';

interface Job {
  id: string;
  name: string;
  status: JobStatus;
}

function JobsList({ jobs }: { jobs: Job[] }) {
  return (
    <div className="space-y-2">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="flex items-center justify-between rounded border p-4"
        >
          <span className="text-body-md">{job.name}</span>
          <AsyncTaskStatus
            statusTask={job.status}
            statusConfig={{
              success: ['SUCCESS'],
              processing: ['PENDING', 'RUNNING'],
              error: ['ERROR']
            }}
          />
        </div>
      ))}
    </div>
  );
}
```

---

### Componentes of Overlay

#### **Dialog**

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@purplelab/atoms-ui/dialog';
```

Complete Example:

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Abrir diálogo</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirmar acción</DialogTitle>
      <DialogDescription>
        ¿Estás seguro de que quieres continuar?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="secondary" onClick={() => setIsOpen(false)}>
        Cancelar
      </Button>
      <Button onClick={handleConfirm}>Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

#### **Drawer**

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@purplelab/atoms-ui/drawer';
```

Panel deslizante lateral for mostrar contenido adicional.

Complete Example:

```tsx
import { Button } from '@purplelab/atoms-ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@purplelab/atoms-ui/drawer';
import { ColumnIcon } from '@purplelab/icons-ui/ColumnIcon';

function FieldsDrawer() {
  const [fieldsCount, setFieldsCount] = useState(5);

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button size="sm" variant="secondary" startIcon={<ColumnIcon />}>
          Fields ({fieldsCount})
        </Button>
      </DrawerTrigger>

      <DrawerContent direction="right" className="w-[456px]">
        <DrawerHeader>
          <DrawerTitle asChild>
            <h5 className="text-system-neutral-900">Select Fields</h5>
          </DrawerTitle>
        </DrawerHeader>

        <DrawerDescription asChild>
          <div className="flex flex-col p-4">
            {/* Contenido del drawer */}
            <p>Selecciona los campos que deseas incluir</p>
          </div>
        </DrawerDescription>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="primary" size="sm" disabled={fieldsCount === 0}>
              Apply Fields
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
```

---

#### **Popover**

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@purplelab/atoms-ui/popover';
```

Example:

```tsx
<Popover>
  <PopoverTrigger asChild>
    <IconButton variant="tertiary">
      <MoreVerticalIcon />
    </IconButton>
  </PopoverTrigger>
  <PopoverContent>
    <ListBox>
      <ListOption onClick={handleEdit}>Editar</ListOption>
      <ListOption onClick={handleDelete}>Eliminar</ListOption>
    </ListBox>
  </PopoverContent>
</Popover>
```

---

#### **Tooltip**

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@purplelab/atoms-ui/tooltip';
```

Example:

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <IconButton>
        <InfoIcon />
      </IconButton>
    </TooltipTrigger>
    <TooltipContent>
      <p>Información adicional</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

#### **Truncated Tooltip**

```tsx
import { TruncatedTooltip } from '@purplelab/atoms-ui/truncated-tooltip';
```

Tooltip that only shows when the text is truncated.

Example:

```tsx
<TruncatedTooltip text="Este es un texto muy largo que puede ser truncado" />
```

---

#### **Dropdown Menu**

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup
} from '@purplelab/atoms-ui/dropdown-menu';
```

Dropdown Menu based on Radix UI with multiple interaction options.

Basic Example:

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@purplelab/atoms-ui/dropdown-menu';
import { IconButton } from '@purplelab/atoms-ui/button';
import { MoreVerticalIcon } from '@purplelab/icons-ui/MoreVerticalIcon';

function ActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton variant="tertiary" size="sm">
          <MoreVerticalIcon />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => console.log('Edit')}>
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Duplicate')}>
          Duplicar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log('Delete')}>
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

Example with Checkboxes:

```tsx
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@purplelab/atoms-ui/dropdown-menu';
import { Button } from '@purplelab/atoms-ui/button';

function ColumnsMenu() {
  const [columns, setColumns] = useState({
    name: true,
    email: true,
    status: false,
    date: true
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">
          Columnas
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Columnas visibles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={columns.name}
          onCheckedChange={(checked) =>
            setColumns({ ...columns, name: checked })
          }
        >
          Nombre
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={columns.email}
          onCheckedChange={(checked) =>
            setColumns({ ...columns, email: checked })
          }
        >
          Email
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={columns.status}
          onCheckedChange={(checked) =>
            setColumns({ ...columns, status: checked })
          }
        >
          Estado
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={columns.date}
          onCheckedChange={(checked) =>
            setColumns({ ...columns, date: checked })
          }
        >
          Fecha
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

Example with Radio Group:

```tsx
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@purplelab/atoms-ui/dropdown-menu';
import { Button } from '@purplelab/atoms-ui/button';

function SortMenu() {
  const [sortBy, setSortBy] = useState('date');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">
          Ordenar por
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          <DropdownMenuRadioItem value="date">Fecha</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name">Nombre</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="status">Estado</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

Example with Submenu:

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator
} from '@purplelab/atoms-ui/dropdown-menu';
import { Button } from '@purplelab/atoms-ui/button';

function FileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Archivo</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Nuevo</DropdownMenuItem>
        <DropdownMenuItem>Abrir</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Exportar como</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>PDF</DropdownMenuItem>
            <DropdownMenuItem>Excel</DropdownMenuItem>
            <DropdownMenuItem>CSV</DropdownMenuItem>
            <DropdownMenuItem>JSON</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Cerrar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

### Componentes of Listados

#### **List Option**

```tsx
import { ListOption, ListBox } from '@purplelab/atoms-ui/list-option';
```

Example:

```tsx
<ListBox>
  <ListOption onClick={() => handleAction('edit')}>
    <EditIcon />
    Editar
  </ListOption>
  <ListOption onClick={() => handleAction('delete')}>
    <TrashIcon />
    Eliminar
  </ListOption>
  <ListOption onClick={() => handleAction('download')}>
    <DownloadIcon />
    Descargar
  </ListOption>
</ListBox>
```

---

### Componentes of Tags

#### **Interactive Tag**

```tsx
import { InteractiveTag } from '@purplelab/atoms-ui/interactive-tag';
```

---

#### **Status Tag**

```tsx
import {
  StatusTagRoot,
  StatusTagIcon,
  StatusTagName,
  StatusTagProps
} from '@purplelab/atoms-ui/status-tag';
```

Status tags with icons and specific colors.

Main Props:

- `type`: `'success'` | `'warning'` | `'determinal'` | `'info'`

Basic Example:

```tsx
<StatusTagRoot type="success">
  <StatusTagIcon />
  <StatusTagName>Activo</StatusTagName>
</StatusTagRoot>

<StatusTagRoot type="warning">
  <StatusTagIcon />
  <StatusTagName>Pendiente</StatusTagName>
</StatusTagRoot>

<StatusTagRoot type="determinal">
  <StatusTagIcon />
  <StatusTagName>Error</StatusTagName>
</StatusTagRoot>
```

Example in AG Grid Cell:

```tsx
import { CustomCellRendererProps } from 'ag-grid-react';
import {
  StatusTagIcon,
  StatusTagProps,
  StatusTagRoot
} from '@purplelab/atoms-ui/status-tag';

const reportStatusTypes: { [key: string]: StatusTagProps['type'] } = {
  FAILED: 'determinal',
  GENERATED: 'success',
  IN_PROGRESS: 'warning'
};

function StatusCell({ data }: CustomCellRendererProps) {
  if (!data) return null;

  const { reportStatus } = data;
  const type = reportStatusTypes[reportStatus] ?? 'info';

  return (
    <div className="flex h-full items-center justify-start">
      <StatusTagRoot type={type} className="w-[7rem]">
        <StatusTagIcon />
        {reportStatus}
      </StatusTagRoot>
    </div>
  );
}
```

---

#### **Badge**

```tsx
import { Badge } from '@purplelab/atoms-ui/badge';
```

Small label to display status or categorization.

Main Props:

- `variant`: `'default'` | `'secondary'` | `'destructive'` | `'outline'` | `'success'` | `'info'`

Basic Example:

```tsx
import { Badge } from '@purplelab/atoms-ui/badge';

function BadgeExample() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="success">Activo</Badge>
      <Badge variant="info">Información</Badge>
      <Badge variant="destructive">Error</Badge>
    </div>
  );
}
```

Example with Counters:

```tsx
import { Badge } from '@purplelab/atoms-ui/badge';

function NotificationBadges() {
  return (
    <div className="flex gap-4">
      <div className="relative">
        <button className="bg-gray-200 rounded px-4 py-2">Mensajes</button>
        <Badge
          variant="destructive"
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full p-0"
        >
          5
        </Badge>
      </div>

      <div className="relative">
        <button className="bg-gray-200 rounded px-4 py-2">
          Notificaciones
        </button>
        <Badge
          variant="info"
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full p-0"
        >
          12
        </Badge>
      </div>
    </div>
  );
}
```

Example in Item List:

```tsx
import { Badge } from '@purplelab/atoms-ui/badge';

function TaskList() {
  const tasks = [
    { id: 1, name: 'Revisar reportes', status: 'completed', priority: 'high' },
    {
      id: 2,
      name: 'Actualizar docs',
      status: 'in-progress',
      priority: 'medium'
    },
    { id: 3, name: 'Fix bugs', status: 'pending', priority: 'high' }
  ];

  const statusVariant = {
    completed: 'success',
    'in-progress': 'info',
    pending: 'default'
  } as const;

  const priorityVariant = {
    high: 'destructive',
    medium: 'default',
    low: 'secondary'
  } as const;

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between rounded border p-3"
        >
          <span>{task.name}</span>
          <div className="flex gap-2">
            <Badge variant={statusVariant[task.status]}>{task.status}</Badge>
            <Badge variant={priorityVariant[task.priority]}>
              {task.priority}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
```

Example with Outline:

```tsx
import { Badge } from '@purplelab/atoms-ui/badge';

function CategoryBadges() {
  const categories = ['React', 'TypeScript', 'Next.js', 'Tailwind'];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge key={category} variant="outline">
          {category}
        </Badge>
      ))}
    </div>
  );
}
```

---

### Componentes of Card

#### **Card**

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@purplelab/atoms-ui/card';
```

Contenedor with borde for agrupar contenido relacionado.

Basic Example:

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@purplelab/atoms-ui/card';

function SimpleCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Configuración de cuenta</CardTitle>
        <CardDescription>
          Administra tu perfil y configuraciones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body-md">
          Aquí puedes actualizar tu información personal y preferencias.
        </p>
      </CardContent>
    </Card>
  );
}
```

Example with footer and acciones:

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@purplelab/atoms-ui/card';
import { Button } from '@purplelab/atoms-ui/button';

function CardWithActions() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Nuevo Reporte</CardTitle>
        <CardDescription>
          Crea un reporte personalizado con tus métricas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-body-sm font-medium">
              Nombre del reporte
            </label>
            <input
              type="text"
              placeholder="Mi reporte"
              className="mt-2 w-full rounded-md border px-3 py-2"
            />
          </div>
          <div>
            <label className="text-body-sm font-medium">Descripción</label>
            <textarea
              placeholder="Descripción opcional"
              className="mt-2 w-full rounded-md border px-3 py-2"
              rows={3}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="secondary" className="flex-1">
          Cancelar
        </Button>
        <Button variant="primary" className="flex-1">
          Crear Reporte
        </Button>
      </CardFooter>
    </Card>
  );
}
```

Example with estadísticas:

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@purplelab/atoms-ui/card';

function StatsCard({
  title,
  value,
  change
}: {
  title: string;
  value: string;
  change: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-system-neutral-600 text-body-sm">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-heading-lg text-system-neutral-1000">{value}</div>
        <p className="mt-2 text-body-sm text-system-success-700">{change}</p>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <StatsCard
        title="Usuarios Activos"
        value="2,543"
        change="+12% desde el mes pasado"
      />
      <StatsCard
        title="Reportes Generados"
        value="1,234"
        change="+8% desde el mes pasado"
      />
      <StatsCard
        title="Tiempo Promedio"
        value="4.5s"
        change="-15% más rápido"
      />
    </div>
  );
}
```

---

### Componentes of Formulario

#### **Form Builder**

```tsx
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@purplelab/atoms-ui/form-builder';
```

Integrado with React Hook Form.

Complete Example:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@purplelab/atoms-ui/form-builder';
import { Input } from '@purplelab/atoms-ui/input';
import { Button } from '@purplelab/atoms-ui/button';

const formSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido')
});

function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: ''
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
```

---

### Componentes of Calendario

#### **Calendar**

```tsx
import { Calendar } from '@purplelab/atoms-ui/calendar';
```

Componente of calendario basado in react-day-picker.

Main Props:

- `mode`: `'single'` | `'multiple'` | `'range'`
- `selected`: Date | Date[] | DateRange (según the mode)
- `onSelect`: función for manejar the selección
- `disabled`: Date[] | función for deshabilitar fechas
- `showOutsideDays`: boolean (default: true)

Example with selección simple:

```tsx
import { useState } from 'react';
import { Calendar } from '@purplelab/atoms-ui/calendar';

function DatePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}
```

Example with rango of fechas:

```tsx
import { useState } from 'react';
import { Calendar } from '@purplelab/atoms-ui/calendar';
import { DateRange } from 'react-day-picker';

function DateRangePicker() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <div className="space-y-4">
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={2}
        className="rounded-md border"
      />
      {dateRange?.from && (
        <div className="text-sm">
          <p>Desde: {dateRange.from.toLocaleDateString()}</p>
          {dateRange.to && <p>Hasta: {dateRange.to.toLocaleDateString()}</p>}
        </div>
      )}
    </div>
  );
}
```

Example with selección múltiple:

```tsx
import { useState } from 'react';
import { Calendar } from '@purplelab/atoms-ui/calendar';

function MultipleDatePicker() {
  const [dates, setDates] = useState<Date[] | undefined>([]);

  return (
    <div className="space-y-4">
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-md border"
      />
      <div className="text-sm">
        <p>{dates?.length || 0} fechas seleccionadas</p>
      </div>
    </div>
  );
}
```

Example with fechas deshabilitadas:

```tsx
import { useState } from 'react';
import { Calendar } from '@purplelab/atoms-ui/calendar';

function DisabledDatesCalendar() {
  const [date, setDate] = useState<Date | undefined>();

  // Deshabilitar fines de semana
  const disabledDays = (date: Date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

  // Deshabilitar fechas pasadas
  const isPastDate = (date: Date) => {
    return date < new Date();
  };

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={isPastDate}
      className="rounded-md border"
    />
  );
}
```

---

### Componentes of Filtros

#### **Filter**

```tsx
import { Filter, FilterDef, useFilter } from '@purplelab/atoms-ui/filter';
```

Sistema completo of filtros with múltiples tipos.

Example:

```tsx
import { Filter, FilterDef, useFilter } from '@purplelab/atoms-ui/filter';

function MyComponent() {
  const filterDefinitions: FilterDef[] = [
    {
      id: 'status',
      label: 'Estado',
      type: 'one-choice',
      options: [
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' }
      ]
    },
    {
      id: 'dateRange',
      label: 'Rango de fechas',
      type: 'date-range'
    },
    {
      id: 'categories',
      label: 'Categorías',
      type: 'multiple-choices',
      options: [
        { value: 'cat1', label: 'Categoría 1' },
        { value: 'cat2', label: 'Categoría 2' }
      ]
    }
  ];

  const { selectedFilters, handleFilterChange } = useFilter();

  return (
    <div>
      <Filter
        filters={filterDefinitions}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
```

---

#### **Filter Tag**

```tsx
import { FilterTag } from '@purplelab/atoms-ui/filter';
```

Muestra los filtros activos como tags removibles.

Basic Example:

```tsx
import { useState } from 'react';
import { FilterTag } from '@purplelab/atoms-ui/filter';

function ActiveFilters() {
  const [filters, setFilters] = useState([
    { id: 'status', label: 'Estado', value: 'active', displayValue: 'Activo' },
    { id: 'date', label: 'Fecha', value: '2024-01', displayValue: 'Enero 2024' }
  ]);

  const handleRemoveFilter = (filterId: string) => {
    setFilters(filters.filter((f) => f.id !== filterId));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <FilterTag
          key={filter.id}
          label={`${filter.label}: ${filter.displayValue}`}
          onRemove={() => handleRemoveFilter(filter.id)}
        />
      ))}
    </div>
  );
}
```

Example with clear all:

```tsx
import { useState } from 'react';
import { FilterTag } from '@purplelab/atoms-ui/filter';
import { Button } from '@purplelab/atoms-ui/button';

function FiltersWithClearAll() {
  const [activeFilters, setActiveFilters] = useState([
    { id: 'category', label: 'Categoría', value: 'reports' },
    { id: 'status', label: 'Estado', value: 'active' },
    { id: 'priority', label: 'Prioridad', value: 'high' }
  ]);

  const handleRemove = (filterId: string) => {
    setActiveFilters(activeFilters.filter((f) => f.id !== filterId));
  };

  const handleClearAll = () => {
    setActiveFilters([]);
  };

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-system-neutral-600 text-body-sm">
        Filtros activos:
      </span>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <FilterTag
            key={filter.id}
            label={`${filter.label}: ${filter.value}`}
            onRemove={() => handleRemove(filter.id)}
          />
        ))}
      </div>
      <Button variant="tertiary" size="sm" onClick={handleClearAll}>
        Limpiar todo
      </Button>
    </div>
  );
}
```

---

### Componentes of Tablas (AG Grid)

#### **AG Grid PL**

```tsx
import { AgGridPL, TableHead } from '@purplelab/atoms-ui/aggrid-pl';
```

Wrapper of AG Grid with estilos of Purplelab.

Example:

```tsx
import { AgGridPL, TableHead } from '@purplelab/atoms-ui/aggrid-pl';
import { ColDef } from 'ag-grid-community';

function MyTable() {
  const columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Nombre' },
    { field: 'email', headerName: 'Email' }
  ];

  const rowData = [
    { id: 1, name: 'Juan', email: 'juan@example.com' },
    { id: 2, name: 'María', email: 'maria@example.com' }
  ];

  return (
    <div>
      <TableHead title="Usuarios" />
      <AgGridPL
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}
```

---

#### **AG Grid Custom Loading Overlay**

```tsx
import { CustomLoadingOverlay } from '@purplelab/atoms-ui/aggrid-custom-loading-overlay';
```

Overlay of carga personalizado for AG Grid with servidor-side data.

Example of uso:

```tsx
import { AgGridPL } from '@purplelab/atoms-ui/aggrid-pl';
import { CustomLoadingOverlay } from '@purplelab/atoms-ui/aggrid-custom-loading-overlay';
import { ColDef } from 'ag-grid-community';

function ServerSideGrid() {
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  const columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Nombre' },
    { field: 'email', headerName: 'Email' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await api.getUsers();
      setRowData(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AgGridPL
      columnDefs={columnDefs}
      rowData={rowData}
      loading={loading}
      loadingOverlayComponent={CustomLoadingOverlay}
      domLayout="autoHeight"
    />
  );
}
```

---

#### **AG Grid Custom Loading Overlay Client Side**

```tsx
import { CustomLoadingOverlayClientSide } from '@purplelab/atoms-ui/aggrid-custom-loading-overlay-client-side';
```

Overlay of carga for AG Grid with client-side data.

Example of uso:

```tsx
import { AgGridPL } from '@purplelab/atoms-ui/aggrid-pl';
import { CustomLoadingOverlayClientSide } from '@purplelab/atoms-ui/aggrid-custom-loading-overlay-client-side';

function ClientSideGrid() {
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  const columnDefs = [
    { field: 'name', headerName: 'Nombre', filter: true },
    { field: 'age', headerName: 'Edad', filter: 'agNumberColumnFilter' },
    { field: 'city', headerName: 'Ciudad', filter: true }
  ];

  return (
    <AgGridPL
      columnDefs={columnDefs}
      rowData={rowData}
      loading={loading}
      loadingOverlayComponent={CustomLoadingOverlayClientSide}
      // Client-side features
      pagination
      paginationPageSize={20}
      defaultColDef={{
        sortable: true,
        filter: true
      }}
    />
  );
}
```

---

#### **AG Grid Custom No Rows Overlay**

```tsx
import {
  CustomNoRowsOverlay,
  CustomNoRowsNoDataOverlay
} from '@purplelab/atoms-ui/aggrid-custom-no-rows-overlay';
```

Overlays personalizados cuando no hay data in AG Grid.

Example with CustomNoRowsOverlay:

```tsx
import { AgGridPL } from '@purplelab/atoms-ui/aggrid-pl';
import { CustomNoRowsOverlay } from '@purplelab/atoms-ui/aggrid-custom-no-rows-overlay';

function EmptyStateGrid() {
  const columnDefs = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Nombre' }
  ];

  return (
    <AgGridPL
      columnDefs={columnDefs}
      rowData={[]}
      noRowsOverlayComponent={CustomNoRowsOverlay}
      domLayout="autoHeight"
    />
  );
}
```

Example with CustomNoRowsNoDataOverlay:

```tsx
import { AgGridPL } from '@purplelab/atoms-ui/aggrid-pl';
import { CustomNoRowsNoDataOverlay } from '@purplelab/atoms-ui/aggrid-custom-no-rows-overlay';

function NoDataGrid() {
  const [rowData, setRowData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const columnDefs = [
    { field: 'name', headerName: 'Nombre' },
    { field: 'email', headerName: 'Email' }
  ];

  const handleSearch = async (query: string) => {
    setHasSearched(true);
    const results = await searchData(query);
    setRowData(results);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => handleSearch(e.target.value)}
        className="rounded border px-4 py-2"
      />
      <AgGridPL
        columnDefs={columnDefs}
        rowData={rowData}
        noRowsOverlayComponent={CustomNoRowsNoDataOverlay}
      />
    </div>
  );
}
```

---

#### **AG Grid Tooltip**

```tsx
import { AggridTooltip } from '@purplelab/atoms-ui/aggrid-tooltip';
```

Tooltip personalizado for celdas of AG Grid.

Example of uso:

```tsx
import { AgGridPL } from '@purplelab/atoms-ui/aggrid-pl';
import { AggridTooltip } from '@purplelab/atoms-ui/aggrid-tooltip';
import { ColDef } from 'ag-grid-community';

function GridWithTooltips() {
  const columnDefs: ColDef[] = [
    {
      field: 'name',
      headerName: 'Nombre',
      tooltipField: 'name',
      tooltipComponent: AggridTooltip
    },
    {
      field: 'description',
      headerName: 'Descripción',
      tooltipField: 'description',
      tooltipComponent: AggridTooltip,
      width: 200
    },
    {
      field: 'status',
      headerName: 'Estado',
      tooltipValueGetter: (params) => {
        return `Estado actual: ${params.value}`;
      },
      tooltipComponent: AggridTooltip
    }
  ];

  const rowData = [
    {
      name: 'Reporte muy largo que necesita tooltip',
      description: 'Una descripción extensa que será truncada en la celda',
      status: 'ACTIVE'
    }
  ];

  return (
    <AgGridPL
      columnDefs={columnDefs}
      rowData={rowData}
      tooltipShowDelay={500}
      domLayout="autoHeight"
    />
  );
}
```

---

### Componentes of Selección Avanzada

#### **Select Infinity Scroll**

```tsx
import { SelectInfinityScroll } from '@purplelab/atoms-ui/select-infinity-scroll/select-scroll';
import { useLoadOptionsSelectInfinityScroll } from '@purplelab/atoms-ui/select-infinity-scroll/use-load-options-select-infinity-scroll';
```

Select with scroll infinito for grandes cantidades of datos.

---

#### **Autocomplete Multiselect**

```tsx
import { AutocompleteMultiselect } from '@purplelab/atoms-ui/select/autocomplete-multiselect';
```

---

#### **Tree Select**

```tsx
import {
  TreeSelect,
  TreeSelectContent,
  TreeSelectTrigger
} from '@purplelab/atoms-ui/tree-select';
```

Select with estructura of árbol.

Example:

```tsx
<TreeSelect>
  <TreeSelectTrigger>Seleccionar carpeta</TreeSelectTrigger>
  <TreeSelectContent treeData={folderTree} onSelect={handleSelect} />
</TreeSelect>
```

---

### Componentes of Árbol

#### **Tree Data**

```tsx
import { TreeData } from '@purplelab/atoms-ui/tree-data';
```

---

#### **Tree Data Inner Renderer**

```tsx
import { TreeDataInnerRenderer } from '@purplelab/atoms-ui/tree-data-inner-renderer';
```

---

### Componentes of Stepper

#### **Stepper**

```tsx
import Stepper from '@purplelab/atoms-ui/stepper';
```

Componente of wizard multi-paso for flujos complejos.

Props principales of Stepper:

- `totalSteps`: number (total of pasos)
- `defaultStep`: number (paso inicial, default: 0)
- `onStepChange`: (step: number) => void
- `value`: number (control controlado)
- `onValueChange`: (value: number) => void

Basic Example:

```tsx
import { useState } from 'react';
import Stepper from '@purplelab/atoms-ui/stepper';
import { Button } from '@purplelab/atoms-ui/button';

function CreateReportWizard() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Stepper totalSteps={3} value={currentStep} onValueChange={setCurrentStep}>
      <Stepper.Steps />

      <Stepper.Content>
        {currentStep === 0 && (
          <div className="space-y-4">
            <h3 className="text-heading-md">Paso 1: Información básica</h3>
            <input
              type="text"
              placeholder="Nombre del reporte"
              className="w-full rounded border px-4 py-2"
            />
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-heading-md">Paso 2: Configuración</h3>
            <select className="w-full rounded border px-4 py-2">
              <option>Selecciona tipo</option>
              <option>Mensual</option>
              <option>Anual</option>
            </select>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-heading-md">Paso 3: Revisión</h3>
            <p>Revisa la información antes de crear el reporte</p>
          </div>
        )}
      </Stepper.Content>

      <Stepper.Navigation>
        <Stepper.ButtonBack />
        <Stepper.ButtonNext />
      </Stepper.Navigation>
    </Stepper>
  );
}
```

Example with validación by paso:

```tsx
import { useState } from 'react';
import Stepper from '@purplelab/atoms-ui/stepper';
import { Button } from '@purplelab/atoms-ui/button';
import { useToast } from '@purplelab/atoms-ui/toast/use-toast';

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    terms: false
  });
  const { toast } = useToast();

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        if (!formData.name) {
          toast({
            title: 'Error',
            description: 'El nombre es requerido',
            variant: 'destructive'
          });
          return false;
        }
        break;
      case 1:
        if (!formData.email) {
          toast({
            title: 'Error',
            description: 'El email es requerido',
            variant: 'destructive'
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    if (formData.terms) {
      toast({
        title: 'Éxito',
        description: 'Formulario enviado',
        variant: 'success'
      });
    }
  };

  return (
    <Stepper totalSteps={3} value={currentStep} onValueChange={setCurrentStep}>
      <Stepper.Steps />

      <Stepper.Content>
        {currentStep === 0 && (
          <div className="space-y-4">
            <label>
              <span className="text-body-md font-medium">Nombre</span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-2 w-full rounded border px-4 py-2"
              />
            </label>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <label>
              <span className="text-body-md font-medium">Email</span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-2 w-full rounded border px-4 py-2"
              />
            </label>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.terms}
                onChange={(e) =>
                  setFormData({ ...formData, terms: e.target.checked })
                }
              />
              <span>Acepto términos y condiciones</span>
            </label>
          </div>
        )}
      </Stepper.Content>

      <Stepper.Navigation>
        <Stepper.ButtonBack />
        {currentStep < 2 ? (
          <Button onClick={handleNext}>Siguiente</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!formData.terms}>
            Enviar
          </Button>
        )}
      </Stepper.Navigation>
    </Stepper>
  );
}
```

---

#### **Simple Stepper**

```tsx
import { SimpleStepper } from '@purplelab/atoms-ui/simple-stepper';
```

Viewsión simplificada of stepper for casos básicos.

---

### Componentes of Carpetas

#### **Folder Management**

```tsx
import { FolderSelectRoot } from '@purplelab/atoms-ui/folder-management-shared';
```

Sistema of gestión of carpetas.

Example:

```tsx
<FolderSelectRoot
  folders={folderData}
  onSelectFolder={handleFolderSelect}
  selectedFolderId={currentFolderId}
/>
```

---

### Componentes of Drag and Drop

#### **Drag and Drop**

```tsx
import DragAndDrop from '@purplelab/atoms-ui/drag-and-drop';
```

Componente for subir archivos mediante arrastrar and soltar or selección manual.

Props principales of DragAndDrop:

- `files`: FileData[] (archivos actuales)
- `processAddFiles`: (files: FileData[]) => void
- `processRemoveFiles`: (files: FileData[]) => void
- `accept`: string (tipos of archivo permitidos, default: `'*'`)
- `maxFiles`: number (máximo of archivos, default: infinito)
- `maxSize`: number (tamaño máximo in bytes, default: infinito)

Basic Example:

```tsx
import { useState } from 'react';
import DragAndDrop from '@purplelab/atoms-ui/drag-and-drop';
import { Button } from '@purplelab/atoms-ui/button';

interface FileData {
  fileName: string;
  value: ArrayBuffer;
}

function FileUploader() {
  const [files, setFiles] = useState<FileData[]>([]);

  const handleAddFiles = (newFiles: FileData[]) => {
    setFiles(newFiles);
  };

  const handleRemoveFiles = (updatedFiles: FileData[]) => {
    setFiles(updatedFiles);
  };

  return (
    <DragAndDrop
      files={files}
      processAddFiles={handleAddFiles}
      processRemoveFiles={handleRemoveFiles}
    >
      <DragAndDrop.DropZone>
        <div className="rounded-lg border-2 border-dashed p-8 text-center">
          <p className="text-body-md">Arrastra archivos aquí o</p>
          <DragAndDrop.Trigger>
            <Button variant="secondary" size="sm" className="mt-4">
              Seleccionar archivos
            </Button>
          </DragAndDrop.Trigger>
        </div>
      </DragAndDrop.DropZone>

      <DragAndDrop.ErrorDrag />

      <DragAndDrop.List>
        {files.map((file, index) => (
          <DragAndDrop.Item
            key={index}
            index={index}
            fileName={file.fileName}
          />
        ))}
      </DragAndDrop.List>
    </DragAndDrop>
  );
}
```

Example with restricciones:

```tsx
import { useState } from 'react';
import DragAndDrop from '@purplelab/atoms-ui/drag-and-drop';
import { Button } from '@purplelab/atoms-ui/button';

function RestrictedUploader() {
  const [files, setFiles] = useState<FileData[]>([]);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_FILES = 3;
  const ACCEPTED_TYPES = '.pdf,.doc,.docx';

  return (
    <div className="space-y-4">
      <div className="text-system-neutral-600 text-body-sm">
        <p>Archivos permitidos: PDF, DOC, DOCX</p>
        <p>Tamaño máximo: 5MB por archivo</p>
        <p>Máximo: {MAX_FILES} archivos</p>
      </div>

      <DragAndDrop
        files={files}
        processAddFiles={setFiles}
        processRemoveFiles={setFiles}
        accept={ACCEPTED_TYPES}
        maxSize={MAX_FILE_SIZE}
        maxFiles={MAX_FILES}
      >
        <DragAndDrop.DropZone>
          <div className="rounded-lg border-2 border-dashed p-8 text-center transition-colors hover:border-action-primary-500">
            <p className="text-body-md">Arrastra tus documentos aquí</p>
            <DragAndDrop.Trigger>
              <Button variant="secondary" size="sm" className="mt-4">
                Seleccionar archivos
              </Button>
            </DragAndDrop.Trigger>
          </div>
        </DragAndDrop.DropZone>

        <DragAndDrop.ErrorDrag />

        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="mb-2 text-body-md font-medium">
              Archivos ({files.length}/{MAX_FILES})
            </h4>
            <DragAndDrop.List>
              {files.map((file, index) => (
                <DragAndDrop.Item
                  key={index}
                  index={index}
                  fileName={file.fileName}
                />
              ))}
            </DragAndDrop.List>
          </div>
        )}
      </DragAndDrop>
    </div>
  );
}
```

Example with preview of imágenes:

```tsx
import { useState } from 'react';
import DragAndDrop from '@purplelab/atoms-ui/drag-and-drop';
import { Button } from '@purplelab/atoms-ui/button';

function ImageUploader() {
  const [files, setFiles] = useState<FileData[]>([]);

  return (
    <DragAndDrop
      files={files}
      processAddFiles={setFiles}
      processRemoveFiles={setFiles}
      accept=".jpg,.jpeg,.png,.gif,.webp"
      maxSize={10 * 1024 * 1024} // 10MB
      maxFiles={5}
    >
      <DragAndDrop.DropZone>
        <div className="bg-system-neutral-50 rounded-lg border-2 border-dashed p-12 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-heading-xs">Sube tus imágenes</span>
            <p className="text-system-neutral-600 text-body-sm">
              Arrastra imágenes o haz clic para seleccionar
            </p>
            <DragAndDrop.Trigger>
              <Button variant="primary" size="md" className="mt-2">
                Seleccionar imágenes
              </Button>
            </DragAndDrop.Trigger>
            <p className="mt-2 text-body-xs text-system-neutral-500">
              PNG, JPG, GIF hasta 10MB (máximo 5 archivos)
            </p>
          </div>
        </div>
      </DragAndDrop.DropZone>

      <DragAndDrop.ErrorDrag />

      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {files.map((file, index) => (
            <DragAndDrop.Item
              key={index}
              index={index}
              fileName={file.fileName}
            />
          ))}
        </div>
      )}
    </DragAndDrop>
  );
}
```

---

### Componentes of Visualización

#### **Accordion**

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionTriggerItemDropdown
} from '@purplelab/atoms-ui/accordion';
```

Componente of acordeón for mostrar/ocultar contenido.

Basic Example:

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@purplelab/atoms-ui/accordion';

function FAQSection() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>¿Cómo crear un reporte?</AccordionTrigger>
        <AccordionContent>
          Para crear un reporte, haz clic en el botón "Crear Reporte"...
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>¿Cómo exportar datos?</AccordionTrigger>
        <AccordionContent>
          Puedes exportar tus datos en formato CSV o Excel...
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

Example with múltiples items in dropdown:

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerItemDropdown
} from '@purplelab/atoms-ui/accordion';
import { Filter } from '@purplelab/atoms-ui/filter';

function FiltersAccordion({ tablesAndFilters }) {
  return (
    <div>
      {tablesAndFilters.map(({ name, filters }) => (
        <Accordion type="single" collapsible key={name}>
          <AccordionItem value={name}>
            <AccordionTriggerItemDropdown>{name}</AccordionTriggerItemDropdown>
            <AccordionContent>
              <Filter.Options filters={filters} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
```

---

#### **Scroll Area**

```tsx
import { ScrollArea, ScrollBar } from '@purplelab/atoms-ui/scroll-area';
```

Área of desplazamiento personalizada basada in Radix UI.

Props principales of ScrollBar:

- `orientation`: `'vertical'` | `'horizontal'` (default: `'vertical'`)

Example básico with scroll vertical:

```tsx
import { ScrollArea } from '@purplelab/atoms-ui/scroll-area';

function NotificationsList() {
  const notifications = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    title: `Notificación ${i + 1}`,
    message: 'Contenido de la notificación'
  }));

  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className="border-b pb-4 last:border-0">
            <h4 className="text-body-md font-medium">{notif.title}</h4>
            <p className="text-system-neutral-600 text-body-sm">
              {notif.message}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
```

Example with scroll horizontal:

```tsx
import { ScrollArea, ScrollBar } from '@purplelab/atoms-ui/scroll-area';

function HorizontalGallery() {
  const images = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    url: `/image-${i}.jpg`
  }));

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex gap-4 p-4">
        {images.map((img) => (
          <div key={img.id} className="h-[200px] w-[300px] flex-shrink-0">
            <img
              src={img.url}
              alt={`Image ${img.id}`}
              className="h-full w-full rounded object-cover"
            />
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
```

Example with contenido largo:

```tsx
import { ScrollArea } from '@purplelab/atoms-ui/scroll-area';

function TermsAndConditions() {
  return (
    <div className="space-y-4">
      <h2 className="text-heading-md">Términos y Condiciones</h2>
      <ScrollArea className="h-[500px] w-full rounded-md border p-6">
        <div className="space-y-4 pr-4">
          <section>
            <h3 className="mb-2 text-heading-xs">1. Introducción</h3>
            <p className="text-body-md text-system-neutral-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-heading-xs">2. Uso del Servicio</h3>
            <p className="text-body-md text-system-neutral-700">
              Sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua...
            </p>
          </section>

          {/* Más secciones... */}
        </div>
      </ScrollArea>
    </div>
  );
}
```

Example in sidebar:

```tsx
import { ScrollArea } from '@purplelab/atoms-ui/scroll-area';

function Sidebar({ items }: { items: Array<{ id: string; name: string }> }) {
  return (
    <aside className="w-64 border-r">
      <div className="border-b p-4">
        <h3 className="text-heading-xs">Navegación</h3>
      </div>
      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="space-y-2 p-4">
          {items.map((item) => (
            <button
              key={item.id}
              className="w-full rounded px-3 py-2 text-left hover:bg-system-neutral-100"
            >
              {item.name}
            </button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
```

---

#### **Slider**

```tsx
import { Slider } from '@purplelab/atoms-ui/slider';
```

Control deslizante for seleccionar values numéricos.

Main Props:

- `value`: number[] (array of valores)
- `min`: number
- `max`: number
- `step`: number
- `onValueChange`: (value: number[]) => void
- `useStickyLabel`: boolean (muestra label to the hover)
- `textStickyLabelComplementary`: string (texto complementario of label)

Basic Example:

```tsx
import { useState } from 'react';
import { Slider } from '@purplelab/atoms-ui/slider';

function VolumeControl() {
  const [volume, setVolume] = useState([50]);

  return (
    <div className="space-y-4">
      <label className="text-body-md font-medium">Volumen: {volume[0]}%</label>
      <Slider
        value={volume}
        onValueChange={setVolume}
        min={0}
        max={100}
        step={1}
      />
    </div>
  );
}
```

Example with label sticky:

```tsx
import { useState } from 'react';
import { Slider } from '@purplelab/atoms-ui/slider';

function PriceRangeSlider() {
  const [price, setPrice] = useState([500]);

  return (
    <div className="space-y-4">
      <label className="text-body-md font-medium">Precio máximo</label>
      <Slider
        value={price}
        onValueChange={setPrice}
        min={0}
        max={1000}
        step={10}
        useStickyLabel
        textStickyLabelComplementary="USD"
      />
      <p className="text-system-neutral-600 text-body-sm">
        Hasta ${price[0]} USD
      </p>
    </div>
  );
}
```

Example with label personalizado:

```tsx
import { useState } from 'react';
import { Slider } from '@purplelab/atoms-ui/slider';

function QualitySlider() {
  const [quality, setQuality] = useState([2]);

  const qualityLabels = ['Baja', 'Media', 'Alta', 'Máxima'];

  return (
    <div className="space-y-4">
      <label className="text-body-md font-medium">Calidad de exportación</label>
      <Slider
        value={quality}
        onValueChange={setQuality}
        min={0}
        max={3}
        step={1}
        useCustomLabel
        textCustomLabel={qualityLabels[quality[0]]}
      />
      <p className="text-system-neutral-600 text-body-sm">
        Calidad: {qualityLabels[quality[0]]}
      </p>
    </div>
  );
}
```

---

#### **Text**

```tsx
import { Text } from '@purplelab/atoms-ui/text';
```

Componente of text with variantes predefinidas and truncamiento.

Main Props:

- `variant`: `'heading'` | `'title'` | `'body'` (default: `'body'`)
- `truncate`: boolean (default: false)

Example básico with variantes:

```tsx
import { Text } from '@purplelab/atoms-ui/text';

function TextVariants() {
  return (
    <div className="space-y-4">
      <Text variant="heading">Este es un encabezado principal</Text>

      <Text variant="title">Este es un título de sección</Text>

      <Text variant="body">
        Este es texto de cuerpo normal para contenido general.
      </Text>
    </div>
  );
}
```

Example with truncamiento:

```tsx
import { Text } from '@purplelab/atoms-ui/text';

function TruncatedText() {
  const longText =
    'Este es un texto muy largo que será truncado automáticamente cuando exceda el ancho del contenedor disponible.';

  return (
    <div className="w-[200px]">
      <Text variant="body" truncate>
        {longText}
      </Text>
    </div>
  );
}
```

Example in cards:

```tsx
import { Text } from '@purplelab/atoms-ui/text';
import { Card, CardHeader, CardContent } from '@purplelab/atoms-ui/card';

function UserCard({
  name,
  email,
  bio
}: {
  name: string;
  email: string;
  bio: string;
}) {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <Text variant="heading">{name}</Text>
        <Text variant="body" truncate className="text-system-neutral-600">
          {email}
        </Text>
      </CardHeader>
      <CardContent>
        <Text variant="body">{bio}</Text>
      </CardContent>
    </Card>
  );
}
```

---

#### **Charts**

```tsx
import { Charts } from '@purplelab/atoms-ui/charts';
```

Componentes of gráficos basados in Recharts.

---

## Usage Examples

### Example 1: Página with Header and Tabla

```tsx
import { Container } from '@purplelab/atoms-ui/container';
import { HeaderPage, HeaderPageActions } from '@purplelab/atoms-ui/header-page';
import { Button } from '@purplelab/atoms-ui/button';
import { AgGridPL, TableHead } from '@purplelab/atoms-ui/aggrid-pl';
import { InputSearchInput } from '@purplelab/atoms-ui/input';
import { Filter, FilterDef } from '@purplelab/atoms-ui/filter';
import { useToast } from '@purplelab/atoms-ui/toast/use-toast';

function ReportsPage() {
  const { toast } = useToast();
  const [searchValue, setSearchValue] = useState('');

  const columnDefs = [
    { field: 'name', headerName: 'Nombre' },
    { field: 'status', headerName: 'Estado' },
    { field: 'date', headerName: 'Fecha' }
  ];

  const filterDefs: FilterDef[] = [
    {
      id: 'status',
      label: 'Estado',
      type: 'one-choice',
      options: [
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' }
      ]
    }
  ];

  const handleCreate = () => {
    toast({
      title: 'Nuevo reporte',
      description: 'Creando nuevo reporte...'
    });
  };

  return (
    <Container>
      <HeaderPage title="Reportes">
        <HeaderPageActions>
          <Button onClick={handleCreate}>Crear Reporte</Button>
        </HeaderPageActions>
      </HeaderPage>

      <div className="space-y-4">
        <div className="flex gap-4">
          <InputSearchInput
            placeholder="Buscar reportes..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Filter filters={filterDefs} />
        </div>

        <TableHead title="Lista de Reportes" />
        <AgGridPL
          columnDefs={columnDefs}
          rowData={[]}
          pagination
          paginationPageSize={20}
        />
      </div>
    </Container>
  );
}
```

---

### Example 2: Diálogo of Confirmación with Toast

```tsx
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@purplelab/atoms-ui/dialog';
import { Button } from '@purplelab/atoms-ui/button';
import { useToast } from '@purplelab/atoms-ui/toast/use-toast';

function DeleteConfirmation({ isOpen, onClose, onConfirm, itemName }) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      toast({
        title: 'Éxito',
        description: `${itemName} eliminado correctamente`,
        variant: 'success'
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el elemento',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres eliminar "{itemName}"? Esta acción no
            se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button
            variant="determinal"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

### Example 3: Formulario with Validación

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@purplelab/atoms-ui/form-builder';
import { Input } from '@purplelab/atoms-ui/input';
import { Button } from '@purplelab/atoms-ui/button';
import { TextArea } from '@purplelab/atoms-ui/text-area';
import { Select } from '@purplelab/atoms-ui/select';
import { useToast } from '@purplelab/atoms-ui/toast/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  description: z.string().optional(),
  category: z.string().min(1, 'Selecciona una categoría')
});

function CreateItemForm() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      description: '',
      category: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      // Lógica de envío
      console.log(data);
      toast({
        title: 'Éxito',
        description: 'Elemento creado correctamente',
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo crear el elemento',
        variant: 'destructive'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el nombre" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="ejemplo@correo.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <TextArea {...field} placeholder="Descripción opcional" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría *</FormLabel>
              <FormControl>
                <Select {...field}>
                  <option value="">Selecciona una categoría</option>
                  <option value="cat1">Categoría 1</option>
                  <option value="cat2">Categoría 2</option>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="secondary">
            Cancelar
          </Button>
          <Button type="submit" isLoading={form.formState.isSubmitting}>
            Crear
          </Button>
        </div>
      </form>
    </Form>
  );
}
```

---

### Example 4: Menú of Acciones with Popover

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@purplelab/atoms-ui/popover';
import { IconButton } from '@purplelab/atoms-ui/button';
import { ListBox, ListOption } from '@purplelab/atoms-ui/list-option';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@purplelab/atoms-ui/tooltip';

function ActionsMenu({ onEdit, onDelete, onDownload }) {
  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <IconButton variant="tertiary" size="sm">
                <MoreVerticalIcon />
              </IconButton>
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent>Acciones</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent align="end">
        <ListBox>
          <ListOption onClick={onEdit}>
            <EditIcon className="h-4 w-4" />
            Editar
          </ListOption>
          <ListOption onClick={onDownload}>
            <DownloadIcon className="h-4 w-4" />
            Descargar
          </ListOption>
          <ListOption onClick={onDelete} className="text-red-600">
            <TrashIcon className="h-4 w-4" />
            Eliminar
          </ListOption>
        </ListBox>
      </PopoverContent>
    </Popover>
  );
}
```

---

### Example 5: Grid with Filtros and Búsqueda

```tsx
import { useState } from 'react';
import {
  AgGridPL,
  TableHead,
  useAgGridPagination
} from '@purplelab/atoms-ui/aggrid-pl';
import { InputSearchInput, useInputDebounce } from '@purplelab/atoms-ui/input';
import { Filter, FilterDef, useFilter } from '@purplelab/atoms-ui/filter';
import { CustomLoadingOverlay } from '@purplelab/atoms-ui/aggrid-custom-loading-overlay';
import { CustomNoRowsNoDataOverlay } from '@purplelab/atoms-ui/aggrid-custom-no-rows-overlay';

function DataGrid() {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useInputDebounce(searchValue, 500);
  const { selectedFilters, handleFilterChange } = useFilter();

  const filterDefs: FilterDef[] = [
    {
      id: 'status',
      label: 'Estado',
      type: 'one-choice',
      options: [
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' }
      ]
    },
    {
      id: 'dateRange',
      label: 'Rango de fechas',
      type: 'date-range'
    }
  ];

  const columnDefs = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'status', headerName: 'Estado', width: 150 },
    { field: 'date', headerName: 'Fecha', width: 150 }
  ];

  // Aquí irían tus datos reales, posiblemente de una API
  const [rowData, setRowData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <InputSearchInput
          placeholder="Buscar..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1"
        />
        <Filter
          filters={filterDefs}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      </div>

      <TableHead title="Resultados" count={rowData.length} />

      <AgGridPL
        columnDefs={columnDefs}
        rowData={rowData}
        pagination
        paginationPageSize={20}
        loading={isLoading}
        loadingOverlayComponent={CustomLoadingOverlay}
        noRowsOverlayComponent={CustomNoRowsNoDataOverlay}
        domLayout="autoHeight"
      />
    </div>
  );
}
```

---

## Style Configuration

### Variables CSS of Tema

La librería utiliza variables CSS for the sistema of diseño. Estas están definidas in `default-theme-variables.css` e incluyen:

**Colores of Sistema:**

- `--neutral-0` to `--neutral-1000`: Escala of grises
- `--action-primary-*`: Colores of acción principal
- `--action-secondary-*`: Colores of acción secundaria
- `--system-success-*`: Colores of éxito
- `--system-warning-*`: Colores of advertencia
- `--system-determinal-*`: Colores destructivos/peligro

**Espaciado:**

- `--spacing-50` to `--spacing-600`: Sistema of espaciado

**Tipografía:**

- Variables for tamaños of fuente, pesos and alturas of línea

### Tailwind Configuration

Asegúrate of que tu `tailwind.config.ts` incluya las rutas of atoms-ui:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Importante: incluir atoms-ui
    '../../packages/atoms-ui/src/**/*.{js,ts,jsx,tsx}',
    // O si está en node_modules:
    './node_modules/@purplelab/atoms-ui/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // Tu configuración personalizada
    }
  },
  plugins: []
};

export default config;
```

---

## Utilities

### `cn` - Class Name Utility

```tsx
import { cn } from '@purplelab/atoms-ui/utils';
```

Utilidad for combinar clases of Tailwind CSS, basada in `clsx` and `tailwind-merge`.

Example:

```tsx
<div className={cn('text-base', isActive && 'text-primary', className)}>
  Contenido
</div>
```

---

## Best Practices

### 1. Importaciones Específicas

Siempre importa componentes específicos in lugar of paquete completo:

**Correcto:**

```tsx
import { Button } from '@purplelab/atoms-ui/button';
import { useToast } from '@purplelab/atoms-ui/toast/use-toast';
```

**Incorrecto:**

```tsx
import { Button, useToast } from '@purplelab/atoms-ui';
```

Esto mejora the tree-shaking and reduce the tamaño of bundle.

---

### 2. Uso of Toaster

Siempre incluye the componente `Toaster` in tu layout raíz si vas to usar toasts:

```tsx
import { Toaster } from '@purplelab/atoms-ui/toast/toaster';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

---

### 3. Formularios with React Hook Form

Usa siempre `react-hook-form` with `zod` for validación of formularios:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
```

---

### 4. Tipado with TypeScript

Aprovecha los tipos exportados by the librería:

```tsx
import { ButtonProps } from '@purplelab/atoms-ui/button';
import { MultiSelectOption } from '@purplelab/atoms-ui/input';
import { FilterDef } from '@purplelab/atoms-ui/filter';
```

---

### 5. Accesibilidad

Los componentes ya incluyen las mejores prácticas of accesibilidad (ARIA attributes), pero asegúrate de:

- Usar labels apropiados in formularios
- Proporcionar textos alternativos in tooltips
- Usar variantes semánticas of botones (primary, secondary, determinal)

---

### 6. Performance

Para tablas grandes with AG Grid:

```tsx
<AgGridPL
  columnDefs={columnDefs}
  rowData={rowData}
  pagination
  paginationPageSize={20}
  // Mejora performance con virtualización
  suppressRowVirtualisation={false}
  // Cache de filas
  rowBuffer={10}
/>
```

---

### 7. Estructura of Archivos Recomendada

```
src/
├── components/
│   ├── ui/              # Componentes UI reutilizables
│   └── features/        # Componentes específicos de features
├── hooks/               # Custom hooks
├── utils/               # Utilidades
└── app/                 # Páginas (Next.js)
    ├── layout.tsx       # Incluye Toaster aquí
    └── page.tsx
```

---

### 8. Manejo of Estados of Carga

Usa `isLoading` in botones and overlays in grids:

```tsx
<Button isLoading={isSubmitting}>
  Guardar
</Button>

<AgGridPL
  loading={isLoadingData}
  loadingOverlayComponent={CustomLoadingOverlay}
/>
```

---

### 9. Errores and Feedback

Siempre proporciona feedback to the usuario:

```tsx
try {
  await submitData();
  toast({
    title: 'Éxito',
    description: 'Datos guardados correctamente',
    variant: 'success'
  });
} catch (error) {
  toast({
    title: 'Error',
    description: error.message || 'Ocurrió un error',
    variant: 'destructive'
  });
}
```

---

### 10. Responsive Design

Usa the Grid System and utilidades of Tailwind for diseño responsive:

```tsx
<GridSystem>
  <div className="col-span-12 md:col-span-6 lg:col-span-4">
    {/* Contenido */}
  </div>
</GridSystem>
```

---

## Ejemplos Avanzados

### Example 6: Drawer with MultiSelect Context

```tsx
import { useState, useCallback, useMemo } from 'react';
import { Button } from '@purplelab/atoms-ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@purplelab/atoms-ui/drawer';
import {
  MultiSelectContextProvider,
  SearchDropdownContextProvider,
  useMultiSelectContext
} from '@purplelab/atoms-ui/input';
import { ColumnIcon } from '@purplelab/icons-ui/ColumnIcon';

const MAX_FIELDS = 50;

function FieldsDrawerComplete() {
  const [appliedFields, setAppliedFields] = useState([]);

  const allOptions = useMemo(
    () => [
      { value: 'field1', label: 'Campo 1', group: 'Table 1' },
      { value: 'field2', label: 'Campo 2', group: 'Table 1' },
      { value: 'field3', label: 'Campo 3', group: 'Table 2' }
    ],
    []
  );

  return (
    <MultiSelectContextProvider maxSelected={MAX_FIELDS}>
      <FieldsDrawerInner
        appliedFields={appliedFields}
        setAppliedFields={setAppliedFields}
        allOptions={allOptions}
      />
    </MultiSelectContextProvider>
  );
}

function FieldsDrawerInner({ appliedFields, setAppliedFields, allOptions }) {
  const {
    countSelected: fieldsCount,
    initMultiSelectOptions,
    selectedOptions
  } = useMultiSelectContext();

  const onOpenDrawerChange = useCallback(
    (open: boolean) => {
      if (open) {
        const values = appliedFields.map((f) => f.value);
        initMultiSelectOptions(values, allOptions);
      }
    },
    [appliedFields, allOptions, initMultiSelectOptions]
  );

  const onApplyFields = () => {
    setAppliedFields([...selectedOptions]);
  };

  return (
    <Drawer direction="right" onOpenChange={onOpenDrawerChange}>
      <DrawerTrigger asChild>
        <Button size="sm" variant="secondary" startIcon={<ColumnIcon />}>
          Fields ({appliedFields.length})
        </Button>
      </DrawerTrigger>

      <DrawerContent direction="right" className="w-[456px]">
        <DrawerHeader>
          <DrawerTitle asChild>
            <h5 className="text-system-neutral-900">Select Fields</h5>
          </DrawerTitle>
        </DrawerHeader>

        <DrawerDescription asChild>
          <div className="flex flex-col">
            <SearchDropdownContextProvider allOptions={allOptions}>
              {/* Tu componente de selección de campos */}
              <div className="p-4">
                <p>
                  Seleccionados: {fieldsCount} / {MAX_FIELDS}
                </p>
              </div>
            </SearchDropdownContextProvider>
          </div>
        </DrawerDescription>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              variant="primary"
              size="sm"
              disabled={!fieldsCount}
              onClick={onApplyFields}
            >
              Apply Fields
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
```

---

### Example 7: Tabs with Búsqueda and Estado

```tsx
import { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@purplelab/atoms-ui/tabs';
import { InputSearchInput } from '@purplelab/atoms-ui/input';
import { IconButton } from '@purplelab/atoms-ui/button';
import { AddIcon } from '@purplelab/icons-ui/AddIcon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@purplelab/atoms-ui/tooltip';

type FolderLocation = 'active' | 'trash';

function FolderManagementComplete() {
  const [searchByName, setSearchByName] = useState('');
  const [location, setLocation] = useState<FolderLocation>('active');
  const [openAddFolder, setOpenAddFolder] = useState(false);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-b-system-neutral-300 py-100 pl-200 pr-100">
        <h5 className="text-system-neutral-1000">Folders</h5>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <IconButton
                size="sm"
                variant="tertiary-subtle"
                aria-label="Add folder"
                onClick={() => setOpenAddFolder(true)}
              >
                <AddIcon />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent side="top" align="end">
              Add folder
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Search */}
      <div className="px-200 py-150">
        <InputSearchInput
          placeholder="Search by name"
          className="w-full"
          inputSize="sm"
          onChange={(e) => setSearchByName(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs
        value={location}
        className="flex w-full grow flex-col"
        onValueChange={(value) => setLocation(value as FolderLocation)}
      >
        <TabsList className="pl-150">
          <TabsTrigger value="active">Active Reports</TabsTrigger>
          <TabsTrigger value="trash">Trash</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="grow py-50">
          <ActiveFolders searchByName={searchByName} />
        </TabsContent>

        <TabsContent value="trash" className="grow py-50">
          <TrashFolders searchByName={searchByName} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

### Example 8: Accordion with Filtros Dinámicos

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerItemDropdown
} from '@purplelab/atoms-ui/accordion';
import { Filter } from '@purplelab/atoms-ui/filter';
import { ListBox } from '@purplelab/atoms-ui/list-option';

type TableFilter = {
  name: string;
  filters: FilterDef[];
};

function FiltersAccordionComplete({
  tablesAndFilters
}: {
  tablesAndFilters: TableFilter[];
}) {
  const [accordionValues, setAccordionValues] = useState<
    Record<string, string>
  >({});

  const getAccordionValue = (name: string) => accordionValues[name] || '';

  const onAccordionValueChange = (name: string) => (value: string) => {
    setAccordionValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ListBox aria-label="Tables and Filters">
      {tablesAndFilters.map(({ name, filters }) => {
        const accordionValue = getAccordionValue(name);

        return filters.length ? (
          <Accordion
            type="single"
            collapsible
            key={name}
            value={accordionValue}
            onValueChange={onAccordionValueChange(name)}
          >
            <AccordionItem value={name}>
              <AccordionTriggerItemDropdown>
                {name}
              </AccordionTriggerItemDropdown>
              <AccordionContent>
                <Filter.Options
                  filters={filters}
                  onFilterOutputChange={handleFilterChange}
                  preventStartFocus={true}
                  isSon={true}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : null;
      })}
    </ListBox>
  );
}
```

---

### Example 9: StatusTag in AG Grid with Variantes Dinámicas

```tsx
import { CustomCellRendererProps } from 'ag-grid-react';
import {
  StatusTagIcon,
  StatusTagProps,
  StatusTagRoot
} from '@purplelab/atoms-ui/status-tag';

// Mapeo de estados a tipos de StatusTag
const STATUS_MAPPING: Record<string, StatusTagProps['type']> = {
  FAILED: 'determinal',
  SIZE_EXCEEDED: 'determinal',
  GENERATED: 'success',
  UPDATED: 'success',
  CREATED: 'success',
  RESTORED: 'success',
  IN_PROGRESS: 'warning'
};

type ReportStatus = keyof typeof STATUS_MAPPING;

interface ReportData {
  reportStatus: ReportStatus;
  id: number;
  name: string;
}

function StatusCellRenderer({ data }: CustomCellRendererProps<ReportData>) {
  if (!data) return null;

  const { reportStatus } = data;
  const statusType = STATUS_MAPPING[reportStatus] ?? 'info';

  return (
    <div className="flex h-full items-center justify-start">
      <StatusTagRoot type={statusType} className="w-[7rem]">
        <StatusTagIcon />
        {reportStatus}
      </StatusTagRoot>
    </div>
  );
}

// Uso en definición de columnas AG Grid
const columnDefs: ColDef[] = [
  {
    field: 'reportStatus',
    headerName: 'Estado',
    cellRenderer: StatusCellRenderer,
    width: 150
  }
  // ... otras columnas
];
```

---

### Example 10: Input with Debounce and Estado of Búsqueda

```tsx
import { useState, useEffect } from 'react';
import { InputSearchInput, useInputDebounce } from '@purplelab/atoms-ui/input';
import { AgGridPL } from '@purplelab/atoms-ui/aggrid-pl';
import { Spinner } from '@purplelab/atoms-ui/spinner';

function SearchableDataGrid() {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [rowData, setRowData] = useState([]);

  // Debounce de 500ms
  const debouncedSearch = useInputDebounce(searchValue, 500);

  // Efecto para realizar la búsqueda cuando cambia el valor debounced
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearch) {
        setRowData([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchAPI(debouncedSearch);
        setRowData(results);
      } catch (error) {
        console.error('Error searching:', error);
        setRowData([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedSearch]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <InputSearchInput
          placeholder="Buscar reportes..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          inputSize="md"
          className="w-full"
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Spinner size="sm" />
          </div>
        )}
      </div>

      <AgGridPL
        columnDefs={columnDefs}
        rowData={rowData}
        loading={isSearching}
      />
    </div>
  );
}
```

---

## Recursos Adicionales

- **AG Grid Documentation**: https://www.ag-grid.com/
- **Radix UI Documentation**: https://www.radix-ui.com/
- **React Hook Form**: https://react-hook-form.com/
- **Zod**: https://zod.dev/
- **Tailwind CSS**: https://tailwindcss.com/

---

## Soporte and Contribuciones

Para reportar bugs or solicitar nuevas características, contacta to the equipo of desarrollo of Purplelab.

**Viewsión of documento:** 1.0
**Última actualización:** Diciembre 2025

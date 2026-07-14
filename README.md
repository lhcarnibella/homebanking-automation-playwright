# Homebanking Automation Framework

*[English](#english) | [Español](#español)*

---

## English

End-to-end test automation framework built with **Playwright + TypeScript**, targeting a demo homebanking application ([homebanking-demo-tests.netlify.app](https://homebanking-demo-tests.netlify.app/)).

This project was built as a hands-on learning exercise to deepen automation skills beyond manual/API testing, applying industry-standard practices: Page Object Model, custom fixtures, centralized test data, and CI/CD integration.

![Playwright Tests](https://github.com/lhcarnibella/homebanking-automation-playwright/actions/workflows/playwright.yml/badge.svg)

### Tech Stack

- **Playwright** — test runner and browser automation
- **TypeScript** — static typing
- **GitHub Actions** — CI pipeline (Chromium + Firefox)
- **ESLint + Prettier** — code quality and formatting

### Architecture

The framework follows the **Page Object Model (POM)** pattern with strict separation of concerns:

```
pages/          -> Page Objects (locators + business actions per screen)
tests/          -> Test specs, organized by feature/module
fixtures/       -> Custom Playwright fixtures (authenticated session)
test-data/      -> Centralized test data (users, accounts, business rules, messages)
utils/          -> Reusable helper functions (currency parsing, regex escaping)
```

#### Key design decisions

- **Custom fixture (`dashboardPage`)**: automates login + navigation setup, removing duplicated boilerplate across test files, while keeping login-specific tests (`login.spec.ts`) independent of the fixture, since they test the login flow itself.
- **Locator strategy**: follows Playwright's recommended priority (`getByRole` > `getByLabel` > `getByPlaceholder` > `getByTestId` > CSS/id), falling back to `id`-based locators only when the application lacks accessible attributes.
- **Separate confirmation modal classes**: each business flow (transfer, deposit creation, deposit cancellation) has its own confirmation modal class, even though they share similar UI structure, because they represent distinct business responsibilities with different data.
- **Centralized test data**: credentials, account codes, business rules (e.g., transfer limits), and expected UI messages live in `test-data/`, separated by concern rather than in a single file, for easier maintenance.

### Running the tests

```bash
npm install
npx playwright install
npx playwright test
```

Run a specific suite:
```bash
npx playwright test tests/transfers/transfers.spec.ts
```

Run only smoke tests:
```bash
npx playwright test --grep @smoke
```

### Test Coverage

| Module | Scenarios |
|---|---|
| **Login** | Valid credentials, invalid credentials, locked account |
| **Navigation** | Parameterized menu navigation (Transfers, Fixed Terms) |
| **Transfers** | Successful transfer, same-account validation, amount limit exceeded, empty amount |
| **Fixed Terms (Plazos Fijos)** | Successful deposit creation (with interest calculation verified against business formula), deposit cancellation |

**Not covered by design** (documented as future extension):
- Minimum deposit amount validation
- Insufficient balance validation
- Exact boundary value test for transfer limit
- Logout flow
- Other modules (Loans, Bill Payments, Virtual Cards) — out of scope for this iteration

### Known Issues / Limitations

**Dashboard balance widget — timing issue.** The account balance widget on the main dashboard displays a stale cached value momentarily before recalculating after a transaction. This is inconsistent enough (confirmed via multiple debugging strategies: `toBeVisible`, text-change waits, `networkidle`) that direct balance comparison was deemed unreliable for automated assertions. As a workaround, transaction success is verified via toast notifications instead, which reflect the operation result immediately and consistently. This tradeoff is documented here rather than hidden, since it's a real limitation of the target application, not of the framework.

**No dedicated API testing.** This application is a fully client-side SPA with no exposed backend API to test independently. API testing practices are demonstrated in a separate, dedicated repository (to be added).

### CI/CD

Tests run automatically on every push to `main` via GitHub Actions, across Chromium and Firefox. Results and HTML reports are available as workflow artifacts.

### Author

Leandro Carnibella — QA Engineer transitioning into test automation.

---

## Español

Framework de automatización de tests end-to-end construido con **Playwright + TypeScript**, apuntando a una aplicación demo de homebanking ([homebanking-demo-tests.netlify.app](https://homebanking-demo-tests.netlify.app/)).

Este proyecto fue construido como ejercicio práctico de aprendizaje para profundizar habilidades de automatización más allá del testing manual/API, aplicando prácticas estándar de la industria: Page Object Model, fixtures personalizados, datos de test centralizados, e integración de CI/CD.

### Stack Tecnológico

- **Playwright** — test runner y automatización de navegador
- **TypeScript** — tipado estático
- **GitHub Actions** — pipeline de CI (Chromium + Firefox)
- **ESLint + Prettier** — calidad y formateo de código

### Arquitectura

El framework sigue el patrón **Page Object Model (POM)** con separación estricta de responsabilidades:

```
pages/          -> Page Objects (locators + acciones de negocio por pantalla)
tests/          -> Specs de test, organizados por feature/módulo
fixtures/       -> Fixtures personalizados de Playwright (sesión autenticada)
test-data/      -> Datos de test centralizados (usuarios, cuentas, reglas de negocio, mensajes)
utils/          -> Funciones helper reutilizables (parseo de moneda, escape de regex)
```

#### Decisiones de diseño clave

- **Fixture personalizado (`dashboardPage`)**: automatiza el setup de login + navegación, eliminando código repetido entre archivos de test, manteniendo los tests específicos de login (`login.spec.ts`) independientes del fixture, ya que testean el flujo de login en sí mismo.
- **Estrategia de locators**: sigue la prioridad recomendada por Playwright (`getByRole` > `getByLabel` > `getByPlaceholder` > `getByTestId` > CSS/id), cayendo a locators por `id` solo cuando la aplicación carece de atributos de accesibilidad.
- **Clases de modal de confirmación separadas**: cada flujo de negocio (transferencia, creación de plazo fijo, cancelación de plazo fijo) tiene su propia clase de modal de confirmación, aunque comparten estructura de UI similar, porque representan responsabilidades de negocio distintas con datos diferentes.
- **Datos de test centralizados**: credenciales, códigos de cuenta, reglas de negocio (ej. límites de transferencia), y mensajes esperados de UI viven en `test-data/`, separados por responsabilidad en vez de un solo archivo, para facilitar el mantenimiento.

### Cómo correr los tests

```bash
npm install
npx playwright install
npx playwright test
```

Correr una suite específica:
```bash
npx playwright test tests/transfers/transfers.spec.ts
```

Correr solo tests de smoke:
```bash
npx playwright test --grep @smoke
```

### Cobertura de Tests

| Módulo | Escenarios |
|---|---|
| **Login** | Credenciales válidas, credenciales inválidas, cuenta bloqueada |
| **Navegación** | Navegación parametrizada del menú (Transferencias, Plazos Fijos) |
| **Transferencias** | Transferencia exitosa, validación de misma cuenta, monto excede el límite, monto vacío |
| **Plazos Fijos** | Creación exitosa de depósito (con cálculo de interés verificado contra la fórmula de negocio), cancelación de depósito |

**No cubierto por decisión de alcance** (documentado como extensión futura):
- Validación de monto mínimo de depósito
- Validación de saldo insuficiente
- Test de valor límite exacto para el tope de transferencia
- Flujo de logout
- Otros módulos (Préstamos, Pago de Servicios, Tarjetas Virtuales) — fuera de alcance en esta iteración

### Problemas Conocidos / Limitaciones

**Widget de saldo del Dashboard — problema de timing.** El widget de saldo de cuenta en el panel principal muestra momentáneamente un valor cacheado desactualizado antes de recalcularse tras una transacción. Esto es lo suficientemente inconsistente (confirmado mediante múltiples estrategias de debugging: `toBeVisible`, espera de cambio de texto, `networkidle`) como para que la comparación directa de saldos se considerara poco confiable para aserciones automatizadas. Como solución alternativa, el éxito de la transacción se verifica mediante notificaciones toast, que reflejan el resultado de la operación de forma inmediata y consistente. Este tradeoff se documenta acá en vez de ocultarse, ya que es una limitación real de la aplicación objetivo, no del framework.

**Sin testing de API dedicado.** Esta aplicación es una SPA completamente del lado del cliente, sin API de backend expuesta para testear de forma independiente. Las prácticas de API testing se demuestran en un repositorio separado y dedicado (a agregar).

### CI/CD

Los tests corren automáticamente en cada push a `main` vía GitHub Actions, en Chromium y Firefox. Los resultados y reportes HTML están disponibles como artifacts del workflow.

### Autor

Leandro Carnibella — QA Engineer en transición hacia automatización de tests.

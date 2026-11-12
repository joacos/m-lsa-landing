# CLAUDE.md — Faena Limpia (repo `m_lsa_project`)
> Contexto denso para agentes. Leer esto ANTES de explorar el código; evita re-escanear el repo.
> Última revisión: 2026-11-12 (rediseño tema claro, sobre commit e17207e). Si cambias arquitectura, estado o rutas, actualiza este archivo.

## 1. Idea principal (1 párrafo)
Landing page / demo interactiva de un **servicio B2B para constructoras chilenas**: carros metálicos cerrados
(acero galvanizado, 450 kg, cáncamos de izaje D.S. 594) que **suben materiales** al piso por grúa/montacargas y,
en el **mismo viaje de vuelta, bajan residuos separados** (logística circular / inversa). Portería registra cada
despacho con **código QR**; el pesaje en patio alimenta trazabilidad **Ley REP N° 20.920 / Sinader / RETC**.
Modelo: **arriendo mensual $850.000 CLP** ("$0 en compra de equipos"), ROI declarado 3.7x, piloto 30 días con
2 carros. Es un **proyecto formativo INACAP, metodología 4+1, Unidad 3**. No hay backend: todo es simulación en cliente.

## 2. Evolución / enfoques que conviven
| Etapa | Commit | Enfoque |
|---|---|---|
| v1 "M-LSA" (*Módulos Logísticos Satélite de Acopio*) | 023e855 | Landing de una sola página, lenguaje técnico-académico (JIT, milla intermedia, RCD, logística inversa). |
| fix | cac6a4c | Upgrade React 19 + PostCSS/Tailwind para Next 16. |
| v2 "Faena Limpia" (actual) | e17207e | Rebrand a lenguaje de obra ("despuntes", "cuadrilla", "al tiro"), **multi-página**, **estado compartido persistente**, tour guiado de 4 pasos, lógica pura testeable. |

Restos del nombre viejo: `src/types/mlsa.ts`, `src/data/mlsa-content.ts`, `MLSA_SYSTEM_DATA`, nombre de carpeta. **No renombrar sin pedirlo** (solo cosmético).

Los 3 pilares del discurso (SustainabilitySection): **Seguridad** (D.S. 594, -50% caídas, pasillos libres) ·
**Ambiental** (Ley REP, separación en origen, -45% CO₂ en portería) · **Económico** (arriendo deducible, 3.7x–5.2x).
KPIs fijos en `MLSA_SYSTEM_DATA.kpis`: búsqueda de material 60→8 min (-85%), pérdidas por clima <2%, 100% respaldo REP, 3.7x.
Todas las cifras son **supuestos de marketing**, no datos medidos.

## 3. Stack
Next **16.4** (App Router; ⚠ ver AGENTS.md: leer `node_modules/next/dist/docs/` antes de usar APIs de Next) ·
React 19 · TS strict · Tailwind 3.4 (**tema claro**; paleta `brand.*` en `tailwind.config.ts`: cream #fff8ec fondo, ink #14213d texto, emerald #00b84a = subida/materiales,
amber #ff6a00 = bajada/residuos, yellow = señalética, sky = digital/QR; texto de color sobre claro usa `emeraldDark`/`amberDark`; sombras `shadow-hard*`) ·
framer-motion 11 · lucide-react. Alias `@/* → src/*`. Idioma UI: **español de Chile**; formato `es-CL`, moneda CLP.
Scripts: `dev`, `build`, `start`, `typecheck` (= `tsc --noEmit`, **pasa limpio**). `lint` usa `next lint` (eliminado en Next 16 → probablemente falla).

## 4. Mapa de archivos (≈4.1k líneas)
```
src/app/layout.tsx          metadata SEO + <SiteShell>
src/app/page.tsx            /            → HeroSection
src/app/flujo/              /flujo       → DualFlowShowcase   (subida/bajada paso a paso)
src/app/simulador/          /simulador   → BuildingSimulator: modo "Recorrido guiado" (default, GuidedCycle) | "Explorar la torre" (consola de pisos + 3 columnas: elegir piso · plano [piso | faena] · "qué hacer ahora" con un solo botón)
src/components/GuidedCycle  recorrido de 5 pasos (`GUIDED_STEPS` en data: qué pasa / "sin Faena Limpia" / lo que se gana + contadores min y kg) sobre un piso ficticio (P7 de 12); no toca la torre, solo marca floorDelivered/wasteReturned del tour
src/app/sistema/            /sistema     → FeatureBento (+ GateQrAppDemo #porteria, CartInteractiveView)
src/app/calculadora/        /calculadora → RoiCalculator
src/app/ley-rep/            /ley-rep     → SustainabilitySection (totales kg, códigos Sinader, imprimir)
src/components/ProcessScene escena SVG animada del circuito (`stageIndex` 0–5 de `FLOW_STAGES`, `mode="con"|"sin"`); la usan HeroSection y DualFlowShowcase
src/components/FloorPlanMap plano de planta SVG del piso: núcleo y Zonas A/B fijos (`FLOOR_PLAN`) + recintos según variante (`FLOOR_LAYOUTS`)
src/components/SitePlanMap  plano general de la faena: portería, torre, montacargas, balanza y patio de acopio con una pila por tipo de desecho (`SITE_PLAN`, altura según `wasteTotalsKg`)
src/components/CountUp      hook `useCountUp` + `<CountUp value="-85%">` (conteo al entrar en pantalla)
src/components/SiteShell    "use client": MotionConfig(reducedMotion=user) + FaenaProvider + PilotModalContext(usePilotModal) + Navbar + GuidedTourBar + Footer + PilotFormModal
src/components/FaenaContext Provider de estado global + localStorage; hook useFaena()
src/lib/faena-state.ts      reducers PUROS (toda la lógica de negocio va aquí)
src/lib/faena-state.test.ts node:test + assert
src/data/mlsa-content.ts    seeds: 12 pisos, eventos, kg iniciales, KPIs, wasteTypes, pricing
src/types/mlsa.ts           todos los tipos
```
Cada `page.tsx` es server component de ~10 líneas que solo exporta `metadata` y renderiza 1 componente cliente.

## 5. Modelo de estado (lo más importante)
`FaenaDemoState = { floors: FloorStatus[N] (N entre MIN_FLOORS=3 y MAX_FLOORS=30, default 12, mayor primero), wasteTotalsKg, events (máx 12, más nuevo primero), roiParams, tourProgress }`
- Persistencia: `localStorage["faena_limpia_demo_v1"]`; se descarta si `floors.length` sale del rango 3–30. Si cambias el shape → **sube la versión de la key**.
- Piloto: `localStorage["faena_limpia_last_pilot_v1"]`; envío simulado con `setTimeout` (sin API, sin email).
- Hora: `formatNow()` en el contexto; los reducers reciben `timeLabel` y (opcional) `randomSuffix` para ser deterministas en tests.

Ciclo de un carro (`applyCycleAdvance`, máquina de estados):
```
DELIVERING_SUPPLIES(100%) → STORED_SATELITE(65%) → COLLECTING_WASTE(85%, wasteType) → EMPTY(0%, +180 kg a wasteTotalsKg) → DELIVERING_SUPPLIES(nextMaterial, cuadrilla de MATERIAL_CREW)
```
- `applyCycleAdvance(prev, piso, waste, time, nextMaterial = Volcanita)`; `SupplyMaterial` (tipos) = material sin "Residuos Separados".
- Contexto: `markTourStep(key)` genérico (`markImpactChecked` lo usa).
- `applyGateDispatch(prev, {floorNumber, materialType, supervisor, guideCode}, time, suffix)` → piso a DELIVERING, token `QR-FLxx-SUP-nnnn`.
- `applyCartMove(prev, from, to, time)` → intercambia el contenido de dos slots (swap), conserva `activeModuleId`.
- Tokens: `QR-FL{piso 2 dígitos}-{SUP|SAT|WST|EMP}-{4 dígitos}`; módulos `FL-{piso}{A|B|C}`.
- `RETURN_LOAD_KG = 180`, `MAX_EVENTS = 12`.
- Simulador: textos de cada paso y "dónde va" en `CYCLE_STEPS` (data). `applyFloorCount` (consola del simulador → `setFloorCount`) conserva pisos existentes y agrega vacíos. `floorLayoutId(piso, total)` elige la planta: piso 1 = `acceso`, último = `atico`, el resto `tipoA/B/C` por tercios de altura. Planos esquemáticos (no hay plano real cargado). `moveCartBetweenFloors` sigue en el contexto pero ya no tiene UI.
- Tour (GuidedTourBar) avanza solo con acciones reales: gateDispatched (/sistema#porteria) → floorDelivered (/simulador) → wasteReturned (/simulador) → impactChecked (/ley-rep o imprimir en /calculadora).

Enums de dominio (`types/mlsa.ts`): Material = Volcanita / Yeso · Madera / Moldajes · Ferretería / Pernos · Residuos Separados.
Residuo = Despuntes de Madera · Despuntes Metálicos · Cartón / Film Embalaje · Escombro Limpio (códigos Sinader ficticios RCD-MAD-01, RCD-MET-03, REP-ENV-05, RCD-YES-02).

## 6. Fórmula ROI (RoiCalculator.tsx, inline en el componente)
```
presupuesto = materialBudgetMillion·1e6 (mensual)
ahorroMerma = presupuesto·(0.06 − 0.015)
horas = workers·0.866·22 ; valorHoras = horas·4500 CLP
toneladas = round1(floors·0.45 + workers·0.02)
beneficio = ahorroMerma + valorHoras ; roi = round1(beneficio/850000) ; neto = beneficio − 850000
```
Sliders: pisos 5–30, trabajadores 20–200. Defaults 14 pisos / 65 trabajadores / 55 MM. Nota: el KPI estático "3.7x" no se recalcula.

## 7. Convenciones al editar
- Lógica nueva → función pura en `lib/faena-state.ts` + test; el contexto solo envuelve con `setState`.
- Textos/cifras/seeds → `data/mlsa-content.ts`, no hardcodear en componentes (deuda: RoiCalculator, GateQrAppDemo PRESET_GUIDES/CREW_OPTIONS y BuildingSimulator aún tienen literales).
- Todo componente interactivo es `"use client"`; páginas siguen el patrón de 10 líneas con `metadata`.
- Look: tarjetas `rounded-3xl border-2 border-brand-ink shadow-hard`, etiquetas de sección en píldora `bg-brand-yellow`, `.hazard-stripe` (globals.css) como separador; el Footer es la única banda oscura (`bg-brand-ink`).
- Estilos: clases Tailwind con variantes `print:` (hay vistas imprimibles: calculadora, ley-rep, comprobante piloto).
- localStorage siempre dentro de try/catch (ya es el patrón).

## 8. Deuda / gotchas conocidos
- Tests **no corren con ningún script**: `node --test src/lib/faena-state.test.ts` falla por import sin extensión (`./faena-state`). Opciones: `npx tsx --test …` o agregar script `"test"`.
- `dispatchFromGate` (contexto) arma el token duplicando `buildToken` (consistente porque pasa el mismo suffix).
- Sin backend, sin auth, sin analytics, sin `.env`. Formulario de piloto no envía datos a ningún lado.
- `.next/` y `tsconfig.tsbuildinfo` presentes localmente (ignorados por git).

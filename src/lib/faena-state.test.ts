import assert from "node:assert/strict";
import test from "node:test";
import {
  RETURN_LOAD_KG,
  applyCartMove,
  applyCycleAdvance,
  applyFloorCount,
  floorLayoutId,
  applyGateDispatch,
  createInitialFaenaState,
} from "./faena-state";

const makeSeedState = () =>
  createInitialFaenaState({
    floors: [
      {
        floorNumber: 2,
        activeModuleId: "FL-02A",
        moduleState: "EMPTY",
        materialType: "Volcanita / Yeso",
        fillLevelPercentage: 0,
        supervisor: "En espera",
        qrToken: "QR-FL02-EMP-0144",
        lastUpdated: "Hace 1 hora",
      },
      {
        floorNumber: 5,
        activeModuleId: "FL-05A",
        moduleState: "EMPTY",
        materialType: "Ferretería / Pernos",
        fillLevelPercentage: 0,
        supervisor: "En espera",
        qrToken: "QR-FL05-EMP-0200",
        lastUpdated: "Hace 1 hora",
      },
    ],
    wasteTotalsKg: {
      "Despuntes de Madera": 1000,
      "Despuntes Metálicos": 500,
      "Cartón / Film Embalaje": 300,
      "Escombro Limpio": 800,
    },
    events: [],
    roiParams: { floors: 14, workers: 65, materialBudgetMillion: 55 },
  });

test("full round-trip updates floor state, tour progress, and Ley REP waste totals", () => {
  const initial = makeSeedState();

  const dispatched = applyGateDispatch(
    initial,
    {
      floorNumber: 2,
      materialType: "Madera / Moldajes",
      supervisor: "E. Fuentes (Estructuras)",
      guideCode: "GD-4835",
    },
    "10:00",
    1234
  );

  assert.equal(dispatched.token, "QR-FL02-SUP-1234");
  assert.equal(dispatched.state.floors[0].moduleState, "DELIVERING_SUPPLIES");
  assert.equal(dispatched.state.tourProgress.gateDispatched, true);

  const delivered = applyCycleAdvance(dispatched.state, 2, "Despuntes Metálicos", "10:15");
  assert.equal(delivered.floors[0].moduleState, "STORED_SATELITE");
  assert.equal(delivered.tourProgress.floorDelivered, true);

  const collecting = applyCycleAdvance(delivered, 2, "Despuntes Metálicos", "11:00");
  assert.equal(collecting.floors[0].moduleState, "COLLECTING_WASTE");
  assert.equal(collecting.floors[0].wasteType, "Despuntes Metálicos");

  const weighed = applyCycleAdvance(collecting, 2, "Despuntes Metálicos", "11:30");
  assert.equal(weighed.floors[0].moduleState, "EMPTY");
  assert.equal(weighed.tourProgress.wasteReturned, true);
  assert.equal(weighed.wasteTotalsKg["Despuntes Metálicos"], 500 + RETURN_LOAD_KG);

  const restocked = applyCycleAdvance(weighed, 2, "Despuntes Metálicos", "12:00", "Madera / Moldajes");
  assert.equal(restocked.floors[0].moduleState, "DELIVERING_SUPPLIES");
  assert.equal(restocked.floors[0].materialType, "Madera / Moldajes");
  assert.equal(restocked.floors[0].supervisor, "E. Fuentes (Estructuras)");
});

test("applyCartMove transfers cart state cleanly between floors", () => {
  const initial = makeSeedState();
  const { state: withSupply } = applyGateDispatch(
    initial,
    {
      floorNumber: 2,
      materialType: "Volcanita / Yeso",
      supervisor: "M. González",
      guideCode: "GD-4821",
    },
    "09:00",
    5555
  );

  const moved = applyCartMove(withSupply, 2, 5, "09:10");
  const floor2 = moved.floors.find((f) => f.floorNumber === 2);
  const floor5 = moved.floors.find((f) => f.floorNumber === 5);

  assert.equal(floor2?.moduleState, "EMPTY");
  assert.equal(floor5?.moduleState, "DELIVERING_SUPPLIES");
  assert.equal(floor5?.materialType, "Volcanita / Yeso");
  assert.equal(floor5?.activeModuleId, "FL-02A");
});

test("applyFloorCount keeps existing floors, adds empty ones and clamps the range", () => {
  const initial = makeSeedState(); // floors 2 and 5 only
  const grown = applyFloorCount(initial, 6, "10:00");
  assert.deepEqual(grown.floors.map((f) => f.floorNumber), [6, 5, 4, 3, 2, 1]);
  assert.equal(grown.floors.find((f) => f.floorNumber === 5)?.activeModuleId, "FL-05A");
  assert.equal(grown.floors.find((f) => f.floorNumber === 6)?.moduleState, "EMPTY");

  const shrunk = applyFloorCount(grown, 1, "10:05");
  assert.equal(shrunk.floors.length, 3);
  assert.equal(applyFloorCount(grown, 99, "10:06").floors.length, 30);
  assert.equal(applyFloorCount(grown, 6, "10:07"), grown);
});

test("floorLayoutId makes the ground and top floors unique and varies the rest by height", () => {
  assert.equal(floorLayoutId(1, 12), "acceso");
  assert.equal(floorLayoutId(12, 12), "atico");
  assert.deepEqual([2, 5, 6, 8, 9, 11].map((n) => floorLayoutId(n, 12)), ["tipoA", "tipoA", "tipoB", "tipoB", "tipoC", "tipoC"]);
  assert.equal(floorLayoutId(2, 3), "tipoA");
});

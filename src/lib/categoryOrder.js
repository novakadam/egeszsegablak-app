// src/lib/categoryOrder.js

function toNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

// 6 4 2 1 3 5 7 jellegű rendezés (order alapján)
export function sortCategoriesCenterFirst(categories = []) {
  const withOrder = [];
  const withoutOrder = [];

  for (const c of categories) {
    const ord = toNum(c?.order);
    if (ord === null) withoutOrder.push(c);
    else withOrder.push({ ...c, order: ord });
  }

  // order szerint növekvő
  withOrder.sort((a, b) => a.order - b.order);

  const center = withOrder.filter((c) => c.order === 1);
  const evens = withOrder.filter((c) => c.order !== 1 && c.order % 2 === 0).sort((a, b) => b.order - a.order);
  const odds = withOrder.filter((c) => c.order !== 1 && c.order % 2 === 1).sort((a, b) => a.order - b.order);

  // ami order nélkül van, menjen a végére név szerint
  withoutOrder.sort((a, b) => String(a?.name || "").localeCompare(String(b?.name || ""), "hu"));

  return [...evens, ...center, ...odds, ...withoutOrder];
}

// Menüben általában “normál” sorrend kell (order növekvő, utána név)
export function sortCategoriesSimple(categories = []) {
  const arr = [...categories];
  arr.sort((a, b) => {
    const ao = toNum(a?.order);
    const bo = toNum(b?.order);
    if (ao === null && bo === null) return String(a?.name || "").localeCompare(String(b?.name || ""), "hu");
    if (ao === null) return 1;
    if (bo === null) return -1;
    if (ao !== bo) return ao - bo;
    return String(a?.name || "").localeCompare(String(b?.name || ""), "hu");
  });
  return arr;
}

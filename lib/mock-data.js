import { IMAGES } from './images';

/* Product photos come from the manifest in lib/images.js (one place to swap
   in real photography). The brand SVG covers remain as fallback only. */
const productImages = (id, en, ar) => {
  const pair = IMAGES.products[id];
  if (pair) {
    return [
      { url: pair[0].url, alt: en, altAr: ar, altEn: en },
      { url: pair[1].url, alt: `${en} — lifestyle`, altAr: `${ar} — تفاصيل`, altEn: `${en} — lifestyle` },
    ];
  }
  return [
    { url: `/mock/p${id}a.svg`, alt: en },
    { url: `/mock/p${id}b.svg`, alt: `${en} — detail` },
  ];
};

const P = (id, handle, en, ar, type, typeAr, color, price, opts = {}) => ({
  id: `mock-${id}`,
  handle,
  variantId: `mock-variant-${id}`,
  title: { en, ar },
  productType: { en: type, ar: typeAr },
  color,
  price,
  currency: 'AED',
  available: opts.available !== false,
  tags: opts.tags || [],
  createdAt: opts.createdAt || `2026-07-${String(10 + id).padStart(2, '0')}`,
  description: {
    en: opts.descEn || `The ${en} is made with thick, fountain-pen-friendly paper, a lay-flat binding, and a cover straight from the Tiny Inks palette. Designed in Dubai, made in a small batch, wrapped by hand.`,
    ar: opts.descAr || `صُنع ${ar} من ورق سميك مناسب لأقلام الحبر، بتجليد ينفتح بسهولة وغلاف من ألوان تايني انكس. صُمم في دبي، وأُنتج بدفعة صغيرة، وغُلّف يدويًا.`,
  },
  images: productImages(id, en, ar),
});

export const MOCK_PRODUCTS = [
  P(1, 'everyday-notebook-dusty-blue', 'The Everyday Notebook — Dusty Blue', 'دفتر اليوميات — أزرق هادئ', 'Notebooks', 'دفاتر', 'blue', 65, { tags: ['bestseller', 'drop-01'] }),
  P(2, 'everyday-notebook-terracotta', 'The Everyday Notebook — Terracotta', 'دفتر اليوميات — طيني', 'Notebooks', 'دفاتر', 'terracotta', 65, {}),
  P(3, 'daily-ritual-planner', 'Daily Ritual Planner', 'مخطط الروتين اليومي', 'Planners', 'مخططات', 'cream', 95, { tags: ['bestseller'] }),
  P(4, 'tiny-thoughts-pocket-journal', 'Tiny Thoughts Pocket Journal', 'دفتر الجيب — أفكار صغيرة', 'Journals', 'يوميات', 'blush', 45, { tags: ['drop-01'] }),
  P(5, 'weekly-desk-pad', 'Weekly Desk Pad', 'مفكرة المكتب الأسبوعية', 'Desk & Notes', 'مكتب وملاحظات', 'mustard', 55, {}),
  P(6, 'sticky-note-trio', 'Sticky Note Trio', 'ثلاثية الملاحظات اللاصقة', 'Desk & Notes', 'مكتب وملاحظات', 'blush', 35, { available: false }),
  P(7, 'gratitude-journal-sage', 'The Gratitude Journal', 'دفتر الامتنان', 'Journals', 'يوميات', 'sage', 85, { tags: ['bestseller'] }),
  P(8, 'gel-pen-set-sunset', 'Gel Pen Set — Sunset', 'طقم أقلام جل — غروب', 'Pens & Tools', 'أقلام وأدوات', 'terracotta', 40, { tags: ['bestseller', 'drop-01'] }),
  P(9, 'gel-pen-set-ocean', 'Gel Pen Set — Ocean', 'طقم أقلام جل — محيط', 'Pens & Tools', 'أقلام وأدوات', 'slate', 40, {}),
  P(10, 'to-do-notepad-slate', 'To-Do Notepad', 'مفكرة المهام', 'Desk & Notes', 'مكتب وملاحظات', 'slate', 30, {}),
  P(11, 'big-ideas-sketchbook', 'The Big Ideas Sketchbook', 'كراسة الأفكار الكبيرة', 'Notebooks', 'دفاتر', 'blue', 75, {}),
  P(12, 'drop-01-the-first-ink-kit', 'Drop 01: The First Ink Kit', 'الإصدار ٠١: طقم الحبر الأول', 'Drop 01', 'الإصدار ٠١', 'ink', 149, {
    tags: ['drop-01', 'bestseller'],
    descEn: 'The complete Drop 01 set: an Everyday Notebook, the Tiny Thoughts journal, a Sunset pen set, and a handwritten note from the studio — in a numbered gift box. Only made once.',
    descAr: 'طقم الإصدار ٠١ الكامل: دفتر اليوميات، ودفتر الجيب، وطقم أقلام الغروب، ورسالة بخط اليد من الستوديو — في علبة هدايا مرقّمة. يُصنع مرة واحدة فقط.',
  }),
];

export const COLOR_SWATCHES = {
  blue: '#ADC4CA',
  terracotta: '#E39276',
  cream: '#F3DFC4',
  blush: '#EBB4AF',
  mustard: '#F7CD7B',
  sage: '#79A09F',
  slate: '#6E7786',
  ink: '#26272B',
};

export const COLOR_NAMES = {
  en: { blue: 'Dusty blue', terracotta: 'Terracotta', cream: 'Cream', blush: 'Blush', mustard: 'Mustard', sage: 'Sage', slate: 'Slate', ink: 'Ink' },
  ar: { blue: 'أزرق هادئ', terracotta: 'طيني', cream: 'كريمي', blush: 'وردي', mustard: 'خردلي', sage: 'أخضر هادئ', slate: 'رمادي', ink: 'حبر' },
};

export const CATEGORIES = [
  { key: 'Notebooks', en: 'Notebooks & Journals', ar: 'دفاتر ويوميات', match: ['Notebooks', 'Journals'], color: 'var(--blue)', shape: 'q br' },
  { key: 'Planners', en: 'Planners', ar: 'مخططات', match: ['Planners'], color: 'var(--cream)', shape: 'round' },
  { key: 'Pens & Tools', en: 'Pens & Tools', ar: 'أقلام وأدوات', match: ['Pens & Tools'], color: 'var(--mustard)', shape: 'tri' },
  { key: 'Desk & Notes', en: 'Desk & Notes', ar: 'مكتب وملاحظات', match: ['Desk & Notes'], color: 'var(--blush)', shape: 'half-top' },
];

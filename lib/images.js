/*
 * ONE place for every photo on the site.
 *
 * These are curated Unsplash placeholders (warm stationery photography that
 * matches the brand palette). Before launch the owner replaces the `url`
 * values in THIS file with her real product photos — nothing else needs
 * to change. Keep the `alt` texts honest when swapping.
 *
 * Every entry: { url, alt: { en, ar } }
 */

const u = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* ---- the reusable pool ---- */
export const PHOTOS = {
  penWriting: {
    url: u('1455390582262-044cdead277a'),
    alt: { en: 'Fountain pen writing on lined paper', ar: 'قلم حبر يكتب على ورق مسطّر' },
  },
  journalHands: {
    url: u('1488190211105-8b0e65b80b4e'),
    alt: { en: 'Hands writing in a journal beside coffee', ar: 'يدان تكتبان في دفتر بجانب القهوة' },
  },
  notesNotebook: {
    url: u('1517842645767-c639042777db'),
    alt: { en: 'Open notebook with a fountain pen', ar: 'دفتر مفتوح مع قلم حبر' },
  },
  plannerCoffee: {
    url: u('1506784983877-45594efa4cbe'),
    alt: { en: 'Monthly planner with hand lettering and coffee', ar: 'مخطط شهري بخط اليد مع قهوة' },
  },
  washiCraft: {
    url: u('1452860606245-08befc0ff44b'),
    alt: { en: 'Washi tape, scissors and craft tools', ar: 'أشرطة واشي ومقص وأدوات حرفية' },
  },
  bookLatte: {
    url: u('1544716278-ca5e3f4abd8c'),
    alt: { en: 'Open book with a latte on soft linen', ar: 'كتاب مفتوح مع قهوة على قماش ناعم' },
  },
  pensCase: {
    url: u('1456735190827-d1262f71b8a3'),
    alt: { en: 'A case full of colorful pens and markers', ar: 'حقيبة مليئة بالأقلام الملونة' },
  },
  paintBrushes: {
    url: u('1513364776144-60967b0f800f'),
    alt: { en: 'Paint brushes with warm colors', ar: 'فُرش رسم بألوان دافئة' },
  },
  writeIdeas: {
    url: u('1516414447565-b14be0adf13e'),
    alt: { en: '"Write ideas" notebook with a pencil', ar: 'دفتر «اكتب أفكارك» مع قلم رصاص' },
  },
  stickyWall: {
    url: u('1507925921958-8a62f3d1a50d'),
    alt: { en: 'Sticky notes arranged on a wall', ar: 'ملاحظات لاصقة مرتبة على الحائط' },
  },
  giftPink: {
    url: u('1513201099705-a9746e1e201f'),
    alt: { en: 'Kraft gift box with a pink ribbon', ar: 'علبة هدية كرافت بشريط وردي' },
  },
  giftBlush: {
    url: u('1549465220-1a8b9238cd48'),
    alt: { en: 'Gift box with gold ribbon on blush pink', ar: 'علبة هدية بشريط ذهبي على خلفية وردية' },
  },
  giftHands: {
    url: u('1512909006721-3d6018887383'),
    alt: { en: 'Hands offering a hand-wrapped gift', ar: 'يدان تقدمان هدية مغلفة يدويًا' },
  },
  booksHand: {
    url: u('1519682337058-a94d519337bc'),
    alt: { en: 'A hand holding a small stack of books', ar: 'يد تحمل مجموعة صغيرة من الكتب' },
  },
  bookWarm: {
    url: u('1543002588-bfa74002ed7e'),
    alt: { en: 'Open books on a warm sand backdrop', ar: 'كتب مفتوحة على خلفية رملية دافئة' },
  },
  notepadPen: {
    url: u('1471107340929-a87cd0f5b5f3'),
    alt: { en: 'Spiral notepad with a fountain pen on wood', ar: 'مفكرة حلزونية مع قلم حبر على الخشب' },
  },
};

/* ---- slot map: which photo goes where ---- */
export const IMAGES = {
  // small framed photos floating in the hero among the geometric shapes
  heroFloats: [PHOTOS.writeIdeas, PHOTOS.giftBlush, PHOTOS.washiCraft],

  // home category tiles (keyed by CATEGORIES key in mock-data.js)
  categories: {
    'Notebooks': PHOTOS.notesNotebook,
    'Planners': PHOTOS.plannerCoffee,
    'Pens & Tools': PHOTOS.pensCase,
    'Desk & Notes': PHOTOS.stickyWall,
  },

  // home editorial split section
  editorial: PHOTOS.journalHands,

  // home "From the desk" masonry gallery
  gallery: [
    PHOTOS.penWriting,
    PHOTOS.bookWarm,
    PHOTOS.washiCraft,
    PHOTOS.notepadPen,
    PHOTOS.giftPink,
    PHOTOS.bookLatte,
    PHOTOS.writeIdeas,
    PHOTOS.booksHand,
  ],

  // home Instagram strip (4 polaroids)
  polaroids: [PHOTOS.giftHands, PHOTOS.plannerCoffee, PHOTOS.penWriting, PHOTOS.booksHand],

  // about page
  about: PHOTOS.bookWarm,

  // demo product photos: [main, hover] per product id (see lib/mock-data.js)
  products: {
    1: [PHOTOS.notesNotebook, PHOTOS.penWriting],
    2: [PHOTOS.writeIdeas, PHOTOS.notepadPen],
    3: [PHOTOS.plannerCoffee, PHOTOS.journalHands],
    4: [PHOTOS.bookLatte, PHOTOS.bookWarm],
    5: [PHOTOS.stickyWall, PHOTOS.plannerCoffee],
    6: [PHOTOS.washiCraft, PHOTOS.stickyWall],
    7: [PHOTOS.bookWarm, PHOTOS.booksHand],
    8: [PHOTOS.penWriting, PHOTOS.pensCase],
    9: [PHOTOS.pensCase, PHOTOS.notepadPen],
    10: [PHOTOS.notepadPen, PHOTOS.stickyWall],
    11: [PHOTOS.paintBrushes, PHOTOS.writeIdeas],
    12: [PHOTOS.giftBlush, PHOTOS.giftHands],
  },
};

export const imgAlt = (photo, locale) =>
  (photo && photo.alt && (photo.alt[locale] || photo.alt.en)) || '';

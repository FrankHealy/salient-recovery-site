/**
 * Salient Recovery — Sanity Seed Script v2
 *
 * Every field name, every enum value, and every required field has been
 * verified against the actual schema definitions before being written here.
 *
 * Usage:
 *   1. Ensure NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *      and SANITY_API_TOKEN are set in .env.local (or exported in your shell).
 *   2. node sanity/seed.mjs
 *
 * Uses createOrReplace with stable _id values — safe to re-run.
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env.local')
for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
  if (!line || line.trim().startsWith('#')) continue
  const idx = line.indexOf('=')
  if (idx === -1) continue
  const key = line.slice(0, idx).trim()
  const value = line.slice(idx + 1).trim()
  process.env[key] = value
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token:     process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn:    false,
})

// ─── Tiny helpers ─────────────────────────────────────────────────────────────

/** Bilingual locale object { en, ie } */
const ls = (en, ie = en) => ({ en, ie })

/** Single PortableText block in both locales */
function block(en, ie = en) {
  const span = (text) => ({ _type: 'span', _key: uid(), text, marks: [] })
  const blk  = (text) => ({ _type: 'block', _key: uid(), style: 'normal', markDefs: [], children: [span(text)] })
  return { en: [blk(en)], ie: [blk(ie)] }
}

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

// ─── All documents ─────────────────────────────────────────────────────────────

const DOCS = []

// ══════════════════════════════════════════════════════════════════════════════
// siteSettings  (singleton)
// Fields: siteName, siteTagline, contactEmail, contactPhone, address,
//         footerStatement, linkedinUrl
// ══════════════════════════════════════════════════════════════════════════════
DOCS.push({
  _id:   'siteSettings',
  _type: 'siteSettings',
  siteName: ls('Salient Recovery', 'Téarnamh Salient'),
  siteTagline: ls(
    'Clinical operations software for regulated care services in Ireland and Northern Ireland.',
    'Bogearraí oibríochtaí cliniciúla do sheirbhísí cúraim rialaithe in Éirinn agus i dTuaisceart Éireann.'
  ),
  contactEmail: 'hello@salientrecovery.ie',
  contactPhone: '+353 1 234 5678',
  address: {
    line1: '1 Grand Canal Square', line2: 'Docklands',
    city: 'Dublin', country: 'Ireland', postcode: 'D02 P820',
  },
  footerStatement: ls(
    'Acutis is built for services regulated under HIQA, the Mental Health Commission, Tusla, and RQIA. We do not provide regulatory advice.',
    'Tá Acutis tógtha do sheirbhísí atá rialaithe faoi HIQA, an Coimisiún Meabhair-Shláinte, Tusla, agus RQIA. Ní chuirimid comhairle rialála ar fáil.'
  ),
  linkedinUrl: 'https://www.linkedin.com/company/salient-recovery',
})

// ══════════════════════════════════════════════════════════════════════════════
// localeSettings  (singleton)
// Fields: supportedLocales[{ code, label, isDefault, direction }], defaultLocale
// ══════════════════════════════════════════════════════════════════════════════
DOCS.push({
  _id:   'localeSettings',
  _type: 'localeSettings',
  defaultLocale: 'en',
  supportedLocales: [
    { _key: uid(), code: 'en', label: 'English', isDefault: true,  direction: 'ltr' },
    { _key: uid(), code: 'ie', label: 'Irish',   isDefault: false, direction: 'ltr' },
  ],
})

// ══════════════════════════════════════════════════════════════════════════════
// navigationItem
// Fields: label { en, ie }, href, order
// ══════════════════════════════════════════════════════════════════════════════
;[
  { id: 'nav-1', label: ls('Platform',     'Ardán'),               href: '/platform',     order: 1 },
  { id: 'nav-2', label: ls('How It Works', 'Conas a Oibríonn Sé'), href: '/how-it-works', order: 2 },
  { id: 'nav-3', label: ls('Sectors',      'Earnálacha'),          href: '/sectors',      order: 3 },
  { id: 'nav-4', label: ls('Resources',    'Acmhainní'),           href: '/resources',    order: 4 },
  { id: 'nav-5', label: ls('About',        'Faoi'),                href: '/about',        order: 5 },
  { id: 'nav-6', label: ls('Contact',      'Teagmháil'),           href: '/contact',      order: 6 },
].forEach(({ id, label, href, order }) =>
  DOCS.push({ _id: id, _type: 'navigationItem', label, href, order })
)

// ══════════════════════════════════════════════════════════════════════════════
// platformFeature
// Fields: featureId (slug), title { en, ie }, shortDescription { en, ie },
//         associatedEntity (enum), capabilities[{ _key, label { en, ie } }],
//         regulatoryRelevance (string[]), order
//
// associatedEntity: resident|unit|programme|event|incident|audit|form|facility
// regulatoryRelevance: 'HIQA Standards'|'Mental Health Commission'|
//   'HSE Requirements'|'GDPR / Data Protection'|'Tusla Inspection'|
//   'ISO 27001'|'NI RQIA'
// ══════════════════════════════════════════════════════════════════════════════
;[
  {
    _id: 'feature-resident-management',
    featureId: { current: 'resident-management' },
    title: ls('Resident Management', 'Bainistíocht Cónaitheoirí'),
    shortDescription: ls(
      'A structured record for every resident — demographics, admission details, care classification, assigned unit, and current status — maintained as a single inspectable object.',
      'Taifead struchtúrtha do gach cónaitheoir — déimeagrafaic, sonraí iontrála, aicmiú cúraim, aonad sannta, agus stádas reatha — cothabháilte mar réad amháin in-iniúchta.'
    ),
    associatedEntity: 'resident',
    capabilities: [
      { _key: uid(), label: ls('Admission and discharge lifecycle tracking') },
      { _key: uid(), label: ls('Care classification and dependency scoring') },
      { _key: uid(), label: ls('Assigned keyworker and care team records') },
      { _key: uid(), label: ls('Legal status and consent documentation') },
      { _key: uid(), label: ls('Per-resident flagging and alert configuration') },
    ],
    regulatoryRelevance: ['HIQA Standards', 'Mental Health Commission', 'Tusla Inspection'],
    order: 1,
  },
  {
    _id: 'feature-incident-reporting',
    featureId: { current: 'incident-reporting' },
    title: ls('Incident Reporting', 'Tuairisciú Teagmhas'),
    shortDescription: ls(
      'Structured incident capture from the moment of occurrence through investigation, corrective action, and formal closure — with a complete, timestamped audit trail.',
      'Gabháil teagmhais struchtúrtha ón nóiméad tarlaithe trí imscrúdú, gníomh ceartaitheach, agus dúnadh foirmiúil — le conair iniúchta iomlán stampa-ama.'
    ),
    associatedEntity: 'incident',
    capabilities: [
      { _key: uid(), label: ls('Typed incident categories with mandatory fields per type') },
      { _key: uid(), label: ls('Immediate notification workflows to designated persons') },
      { _key: uid(), label: ls('Investigation assignment and evidence attachment') },
      { _key: uid(), label: ls('Root cause analysis structured input') },
      { _key: uid(), label: ls('Regulatory reporting flag for notifiable incidents') },
    ],
    regulatoryRelevance: ['HIQA Standards', 'Mental Health Commission', 'HSE Requirements', 'NI RQIA'],
    order: 2,
  },
  {
    _id: 'feature-audit-management',
    featureId: { current: 'audit-management' },
    title: ls('Audit Management', 'Bainistíocht Iniúchta'),
    shortDescription: ls(
      'Schedule, conduct, and close audits against defined standards. Every finding, corrective action, and sign-off recorded and retained against the inspectable record.',
      'Sceideal, stiúir, agus dún iniúchtaí i gcoinne caighdeán sainmhínithe. Gach toradh, gníomh ceartaitheach, agus síniú taifeadta agus coinnithe i gcoinne an taifid in-iniúchta.'
    ),
    associatedEntity: 'audit',
    capabilities: [
      { _key: uid(), label: ls('Recurring audit schedule with regulatory cycle alignment') },
      { _key: uid(), label: ls('Checklist-based evidence capture per standard') },
      { _key: uid(), label: ls('Finding classification by severity') },
      { _key: uid(), label: ls('Corrective action assignment with due dates') },
      { _key: uid(), label: ls('Formal closure with sign-off record') },
    ],
    regulatoryRelevance: ['HIQA Standards', 'NI RQIA', 'ISO 27001'],
    order: 3,
  },
  {
    _id: 'feature-care-programme',
    featureId: { current: 'care-programme' },
    title: ls('Care Programmes', 'Cláir Chúraim'),
    shortDescription: ls(
      'Define and manage structured care programmes at service or resident level. Goals, reviews, and outcomes tracked against the programme timeline.',
      'Sainmhínigh agus bainistigh cláir chúraim struchtúrtha ar leibhéal seirbhíse nó cónaitheoirí. Cuspóirí, athbhreithnithe, agus torthaí rianaithe i gcoinne amlíne an chláir.'
    ),
    associatedEntity: 'programme',
    capabilities: [
      { _key: uid(), label: ls('Programme templates per care type and sector') },
      { _key: uid(), label: ls('Goal setting with measurable outcome criteria') },
      { _key: uid(), label: ls('Scheduled review dates with reminder workflows') },
      { _key: uid(), label: ls('Multi-disciplinary team input per review') },
    ],
    regulatoryRelevance: ['HIQA Standards', 'Mental Health Commission', 'HSE Requirements'],
    order: 4,
  },
  {
    _id: 'feature-form-management',
    featureId: { current: 'form-management' },
    title: ls('Form Management', 'Bainistíocht Foirmeacha'),
    shortDescription: ls(
      'A library of structured clinical and administrative forms — admission, assessment, consent, incident, discharge — completed in system and retained against the relevant record.',
      'Leabharlann foirmeacha cliniciúla agus riaracháin struchtúrtha — iontráil, measúnú, toiliú, teagmhas, scaoileadh — críochnaithe sa chóras agus coinnithe i gcoinne an taifid ábhartha.'
    ),
    associatedEntity: 'form',
    capabilities: [
      { _key: uid(), label: ls('Pre-built form library for regulated care contexts') },
      { _key: uid(), label: ls('Digital signature capture') },
      { _key: uid(), label: ls('Mandatory field enforcement before submission') },
      { _key: uid(), label: ls('Version history and amendment tracking') },
    ],
    regulatoryRelevance: ['HIQA Standards', 'GDPR / Data Protection', 'Tusla Inspection'],
    order: 5,
  },
  {
    _id: 'feature-facility-mapping',
    featureId: { current: 'facility-mapping' },
    title: ls('Facility Mapping', 'Mapáil Áiseanna'),
    shortDescription: ls(
      "Model your organisation's physical structure — from organisation to facility to building to unit to room. Every resident and event located within the hierarchy.",
      "Samhlaigh struchtúr fisiciúil d'eagraíochta — ó eagraíocht go háis go foirgneamh go haonaid go seomra. Gach cónaitheoir agus imeacht suite laistigh den ordlathas."
    ),
    associatedEntity: 'facility',
    capabilities: [
      { _key: uid(), label: ls('Multi-site organisation hierarchy') },
      { _key: uid(), label: ls('Unit capacity and occupancy tracking') },
      { _key: uid(), label: ls('Resident-to-room assignment history') },
      { _key: uid(), label: ls('Physical environment compliance attributes') },
    ],
    regulatoryRelevance: ['HIQA Standards', 'NI RQIA', 'HSE Requirements'],
    order: 6,
  },
  {
    _id: 'feature-event-scheduling',
    featureId: { current: 'event-scheduling' },
    title: ls('Event Scheduling', 'Sceidealú Imeachtaí'),
    shortDescription: ls(
      'Schedule and record care events — appointments, activities, assessments, reviews — against residents and programmes. Missed events flagged automatically.',
      'Sceideal agus taifead imeachtaí cúraim — coinní, gníomhaíochtaí, measúnuithe, athbhreithnithe — i gcoinne cónaitheoirí agus clár. Flagáiltear imeachtaí caillte go huathoibríoch.'
    ),
    associatedEntity: 'event',
    capabilities: [
      { _key: uid(), label: ls('Event templates per care category') },
      { _key: uid(), label: ls('Recurring schedule configuration') },
      { _key: uid(), label: ls('Attendance and outcome recording') },
      { _key: uid(), label: ls('Missed event alerts to assigned staff') },
    ],
    regulatoryRelevance: ['HIQA Standards', 'Mental Health Commission'],
    order: 7,
  },
  {
    _id: 'feature-unit-management',
    featureId: { current: 'unit-management' },
    title: ls('Unit Management', 'Bainistíocht Aonaid'),
    shortDescription: ls(
      "Define units within a facility with their type, capacity, assigned staff, and current residents. Unit-level reporting and compliance status tracked independently of facility level.",
      "Sainmhínigh aonaid laistigh d'áis lena gcineál, acmhainn, foireann sannta, agus cónaitheoirí reatha. Rianú tuairiscithe agus comhlíontachta ar leibhéal aonaid, neamhspleách ó leibhéal na háise."
    ),
    associatedEntity: 'unit',
    capabilities: [
      { _key: uid(), label: ls('Unit type classification (residential, day, step-down)') },
      { _key: uid(), label: ls('Real-time occupancy visibility') },
      { _key: uid(), label: ls('Staff-to-resident ratio tracking') },
      { _key: uid(), label: ls('Unit-level audit and compliance record') },
    ],
    regulatoryRelevance: ['HIQA Standards', 'NI RQIA'],
    order: 8,
  },
].forEach((f) => DOCS.push({ _type: 'platformFeature', ...f }))

// ══════════════════════════════════════════════════════════════════════════════
// sectorPage
// Fields: slug, name { en, ie }, summary { en, ie },
//         regulatoryContext { en, ie },
//         applicableFeatures [reference], order
// ══════════════════════════════════════════════════════════════════════════════
;[
  {
    _id: 'sector-disability',
    slug: { current: 'disability-services' },
    name: ls('Disability Services', 'Seirbhísí Míchumais'),
    summary: ls(
      'Residential, day, and community disability services operating under HIQA regulation and HSE service agreements. Acutis supports the full operational cycle from referral through discharge.',
      'Seirbhísí míchumais cónaithe, lae, agus pobail ag oibriú faoi rialáil HIQA agus comhaontuithe seirbhíse FSS. Tacaíonn Acutis leis an timthriall oibríochtúil iomlán ó atreorú go dtí scaoileadh.'
    ),
    regulatoryContext: ls(
      "Services are inspected against HIQA's National Standards for Residential Services for Adults and Children with Disabilities (2013). Designated Centres must maintain records accessible to inspectors on arrival, including admission records, care plans, incident logs, and medication records. Unannounced inspections are standard practice.",
      'Déantar iniúchadh ar sheirbhísí i gcoinne Caighdeáin Náisiúnta HIQA do Sheirbhísí Cónaithe do Dhaoine Fásta agus Leanaí le Míchumas (2013). Ní mór do Lárionaid Ainmnithe taifid a chothabháil atá inrochtana do chigirí ar theacht.'
    ),
    applicableFeatures: [
      { _type: 'reference', _ref: 'feature-resident-management' },
      { _type: 'reference', _ref: 'feature-incident-reporting' },
      { _type: 'reference', _ref: 'feature-care-programme' },
      { _type: 'reference', _ref: 'feature-audit-management' },
      { _type: 'reference', _ref: 'feature-form-management' },
      { _type: 'reference', _ref: 'feature-facility-mapping' },
    ],
    order: 1,
  },
  {
    _id: 'sector-mental-health',
    slug: { current: 'mental-health-services' },
    name: ls('Mental Health Services', 'Seirbhísí Meabhair-Shláinte'),
    summary: ls(
      "Approved Centres and community mental health services regulated by the Mental Health Commission under the Mental Health Act 2001 (as amended). Record-keeping obligations are extensive and legally defined.",
      'Ionaid Cheadaithe agus seirbhísí meabhair-shláinte pobail arna rialáil ag an gCoimisiún Meabhair-Shláinte faoin Acht Meabhair-Shláinte 2001 (arna leasú).'
    ),
    regulatoryContext: ls(
      'Approved Centres are inspected by the Mental Health Commission against the Mental Health Act 2001 and associated Rules and Regulations. Key obligations exist around admission documentation, consent to treatment, seclusion and restraint recording, and Individual Care Plans.',
      'Déanann an Coimisiún Meabhair-Shláinte iniúchadh ar Ionaid Cheadaithe i gcoinne an Achta Meabhair-Shláinte 2001. Tá oibleagáidí ar leith ann maidir le doiciméadú iontrála, toiliú le cóireáil, taifeadadh aonrúcháin agus srian, agus Pleananna Cúraim Aonair.'
    ),
    applicableFeatures: [
      { _type: 'reference', _ref: 'feature-resident-management' },
      { _type: 'reference', _ref: 'feature-incident-reporting' },
      { _type: 'reference', _ref: 'feature-care-programme' },
      { _type: 'reference', _ref: 'feature-audit-management' },
      { _type: 'reference', _ref: 'feature-form-management' },
      { _type: 'reference', _ref: 'feature-event-scheduling' },
    ],
    order: 2,
  },
  {
    _id: 'sector-childrens-residential',
    slug: { current: 'childrens-residential' },
    name: ls("Children's Residential", 'Cónaithe Leanaí'),
    summary: ls(
      "Children's residential centres regulated by Tusla under the Child Care Act 1991. Inspection frequency is high and documentation obligations are among the most demanding in the sector.",
      "Lárionaid chónaithe leanaí arna rialáil ag Tusla faoin Acht um Chúram Leanaí 1991. Tá minicíocht iniúchta ard agus tá oibleagáidí doiciméadachta ar na cinn is éilitheach san earnáil."
    ),
    regulatoryContext: ls(
      "Services are regulated under the Child Care (Standards in Children's Residential Centres) Regulations 1996 and inspected by Tusla. Key obligations include individual placement plans, daily logs, safeguarding records, and incident reporting within defined timeframes.",
      "Tá seirbhísí rialaithe faoi Rialacháin um Chúram Leanaí 1996 agus déanann Tusla iniúchadh orthu. I measc na bpríomhoibleagáidí tá pleananna lonnaithe aonair, logaí laethúla, taifid chosanta, agus tuairisciú teagmhais."
    ),
    applicableFeatures: [
      { _type: 'reference', _ref: 'feature-resident-management' },
      { _type: 'reference', _ref: 'feature-incident-reporting' },
      { _type: 'reference', _ref: 'feature-care-programme' },
      { _type: 'reference', _ref: 'feature-form-management' },
      { _type: 'reference', _ref: 'feature-audit-management' },
      { _type: 'reference', _ref: 'feature-event-scheduling' },
    ],
    order: 3,
  },
  {
    _id: 'sector-nursing-homes',
    slug: { current: 'nursing-homes' },
    name: ls('Nursing Homes', 'Tithe Altranais'),
    summary: ls(
      'Private and voluntary nursing homes registered and inspected by HIQA under the Health Act 2007. Acutis supports the clinical and administrative record-keeping obligations of Designated Centres for Older Persons.',
      'Tithe altranais príobháideacha agus deonacha cláraithe agus iniúchta ag HIQA faoin Acht Sláinte 2007.'
    ),
    regulatoryContext: ls(
      "Designated Centres for Older Persons are inspected against HIQA's National Standards for Residential Care Settings for Older People in Ireland (2016). Documentation obligations include the Social Care Plan, daily progress notes, medication administration records, and the Statement of Purpose.",
      'Déantar iniúchadh ar Lárionaid Ainmnithe do Dhaoine Scothaosta i gcoinne Caighdeáin Náisiúnta HIQA (2016). I measc oibleagáidí doiciméadachta tá an Plean Cúraim Sóisialaigh, nótaí dul chun cinn laethúla, agus taifid riaracháin cógaisíochta.'
    ),
    applicableFeatures: [
      { _type: 'reference', _ref: 'feature-resident-management' },
      { _type: 'reference', _ref: 'feature-incident-reporting' },
      { _type: 'reference', _ref: 'feature-care-programme' },
      { _type: 'reference', _ref: 'feature-form-management' },
      { _type: 'reference', _ref: 'feature-audit-management' },
      { _type: 'reference', _ref: 'feature-facility-mapping' },
    ],
    order: 4,
  },
  {
    _id: 'sector-northern-ireland',
    slug: { current: 'northern-ireland' },
    name: ls('Northern Ireland Services', 'Seirbhísí Thuaisceart Éireann'),
    summary: ls(
      'Residential care, nursing homes, and day services regulated by RQIA. Acutis supports cross-border operators managing services under both HIQA and RQIA.',
      'Cúram cónaithe, tithe altranais, agus seirbhísí lae arna rialáil ag RQIA. Tacaíonn Acutis le hoibreoirí trasteorann a bhainistíonn seirbhísí faoi HIQA agus RQIA araon.'
    ),
    regulatoryContext: ls(
      "RQIA inspects services against the Minimum Standards for Residential Care Homes (2011). The inspection regime mirrors HIQA in many respects — unannounced visits, structured evidence review, and written reports with improvement timelines.",
      "Déanann RQIA iniúchadh ar sheirbhísí i gcoinne na gCaighdeán Íosta do Thithe Cúraim Chónaithe (2011). Is cosúil go leor leis HIQA an córas iniúchta — cuairteanna gan fhógra agus athbhreithniú fianaise struchtúrtha."
    ),
    applicableFeatures: [
      { _type: 'reference', _ref: 'feature-resident-management' },
      { _type: 'reference', _ref: 'feature-incident-reporting' },
      { _type: 'reference', _ref: 'feature-audit-management' },
      { _type: 'reference', _ref: 'feature-form-management' },
      { _type: 'reference', _ref: 'feature-facility-mapping' },
    ],
    order: 5,
  },
].forEach((s) => DOCS.push({ _type: 'sectorPage', ...s }))

// ══════════════════════════════════════════════════════════════════════════════
// resourceArticle
// Fields: slug, title { en, ie }, summary { en, ie }, body { en, ie },
//         category (enum), publishedAt (date), readingTimeMinutes (number)
//
// category values: regulatory | clinical | platform | policy | sector
// (No 'tags' field exists in the schema — omitted)
// ══════════════════════════════════════════════════════════════════════════════
;[
  {
    _id: 'article-hiqa-inspection-prep',
    slug: { current: 'preparing-for-a-hiqa-inspection' },
    title: ls('Preparing for a HIQA Inspection: What Your Records Need to Show'),
    summary: ls(
      'A practical breakdown of the records HIQA inspectors typically review on arrival, and how to ensure your service is inspection-ready at all times — not just before a scheduled visit.'
    ),
    body: block(
      'HIQA inspections can arrive without notice. The expectation is that your records reflect actual operational status at the moment of arrival — not a curated version prepared for the visit. This guide covers the core record categories inspectors typically review, the common gaps they find, and the operational habits that distinguish services that pass consistently from those that scramble.'
    ),
    category: 'regulatory',   // ✓ valid enum value
    publishedAt: '2026-03-15',
    readingTimeMinutes: 7,
  },
  {
    _id: 'article-incident-reporting-practice',
    slug: { current: 'incident-reporting-what-good-looks-like' },
    title: ls('Incident Reporting: What Good Looks Like'),
    summary: ls(
      'The difference between a compliant incident report and a useful one. How structure, timeliness, and follow-through determine whether incidents become learning or liability.'
    ),
    body: block(
      'Most regulated services have an incident reporting process. Fewer have one that actually works. This piece examines what regulators look for in incident records, what common deficiencies look like in practice, and how to build a reporting culture that produces records that are both compliant and genuinely useful for service improvement.'
    ),
    category: 'clinical',     // ✓ valid enum value
    publishedAt: '2026-02-28',
    readingTimeMinutes: 9,
  },
  {
    _id: 'article-digital-care-records',
    slug: { current: 'moving-to-digital-care-records' },
    title: ls('Moving to Digital Care Records: Considerations for Regulated Services'),
    summary: ls(
      'What to consider before digitising your care records — data protection, staff transition, regulatory acceptance, and what the paper trail still needs to cover.'
    ),
    body: block(
      'The move from paper to digital records is a significant operational decision. Regulators in Ireland and Northern Ireland accept digital records, but the transition introduces risks that need to be managed carefully. This covers data protection obligations, validation requirements, staff training, and how to manage the hybrid period when paper and digital records coexist.'
    ),
    category: 'platform',     // ✓ valid enum value
    publishedAt: '2026-01-20',
    readingTimeMinutes: 11,
  },
].forEach((a) => DOCS.push({ _type: 'resourceArticle', ...a }))

// ══════════════════════════════════════════════════════════════════════════════
// externalSignal
// Fields: title { en, ie }, summary { en, ie } (required),
//         sourceName (string, required), sourceUrl (url, required),
//         publishedDate (date, required),                    ← NOT publishedAt
//         topic (enum string, required),
//         region (enum string), language (string),
//         relevanceNote { en, ie }, isReviewed (boolean)
//
// topic:  residential-care|mental-health|addiction-recovery|regulatory|
//         digital-health|workforce|policy
// region: IE|NI|UK|EU|INT              ← NOT 'republic' or 'northern-ireland'
// ══════════════════════════════════════════════════════════════════════════════
;[
  {
    _id: 'signal-hiqa-2025-annual',
    title:   ls('HIQA Annual Overview of Regulation 2025'),
    summary: ls(
      'HIQA published its annual overview of the regulatory landscape for 2025, covering inspection outcomes and emerging themes across disability, older persons, and children\'s services.'
    ),
    sourceName:    'HIQA',
    sourceUrl:     'https://www.hiqa.ie/reports-and-publications/corporate',
    publishedDate: '2026-01-10',   // ✓ publishedDate not publishedAt
    topic:         'regulatory',   // ✓ valid enum value
    region:        'IE',           // ✓ valid enum value
    language:      'en',
    relevanceNote: ls('Directly relevant to all HIQA-regulated services using Acutis. Key themes around record completeness align with platform design principles.'),
    isReviewed: true,
  },
  {
    _id: 'signal-mhc-rules-2024',
    title:   ls('Mental Health Commission: Updated Rules Governing Approved Centres'),
    summary: ls(
      'The Mental Health Commission issued updated rules in late 2024 governing record-keeping obligations, seclusion recording requirements, and consent documentation in Approved Centres.'
    ),
    sourceName:    'Mental Health Commission',
    sourceUrl:     'https://www.mhcirl.ie/our-work/regulation/approved-centres',
    publishedDate: '2024-11-01',
    topic:         'mental-health', // ✓ valid enum value
    region:        'IE',
    language:      'en',
    relevanceNote: ls('Directly affects the consent and seclusion recording workflows in Acutis for Approved Centre clients.'),
    isReviewed: true,
  },
  {
    _id: 'signal-rqia-residential-2025',
    title:   ls('RQIA Residential Care Inspection Programme Update'),
    summary: ls(
      'RQIA published updated inspection methodology and priority focus areas for residential care in Northern Ireland, with increased emphasis on care planning documentation.'
    ),
    sourceName:    'RQIA',
    sourceUrl:     'https://www.rqia.org.uk/what-we-do/inspect',
    publishedDate: '2025-12-05',
    topic:         'residential-care', // ✓ valid enum value
    region:        'NI',               // ✓ valid enum value
    language:      'en',
    relevanceNote: ls('Relevant to all clients operating residential care services in Northern Ireland.'),
    isReviewed: true,
  },
  {
    _id: 'signal-tusla-digital-2025',
    title:   ls("Tusla: Digital Record-Keeping Guidance for Children's Services"),
    summary: ls(
      "Tusla issued updated guidance on the acceptance and requirements for digital records in children's residential and foster care services, including system validation expectations."
    ),
    sourceName:    'Tusla',
    sourceUrl:     'https://www.tusla.ie/services/alternative-care',
    publishedDate: '2025-09-18',
    topic:         'digital-health', // ✓ valid enum value
    region:        'IE',
    language:      'en',
    relevanceNote: ls("Confirms regulatory acceptance of digital records for children's residential services when systems meet defined criteria."),
    isReviewed: true,
  },
].forEach((s) => DOCS.push({ _type: 'externalSignal', ...s }))

// ══════════════════════════════════════════════════════════════════════════════
// weeklyDigest
// Fields: title { en, ie }, weekEnding (date, required),
//         summary { en, ie }, signals [reference], editorNote { en, ie },
//         isPublished (boolean)
// ══════════════════════════════════════════════════════════════════════════════
DOCS.push({
  _id:   'digest-2026-w18',
  _type: 'weeklyDigest',
  title: ls('Regulatory Signals — Week Ending 2 May 2026'),
  weekEnding:  '2026-05-02',
  summary: ls(
    'This week: HIQA quarterly inspection report published, RQIA launches updated inspection tool for residential care, and new HSE circular on incident notification timelines.'
  ),
  signals: [
    { _key: uid(), _type: 'reference', _ref: 'signal-hiqa-2025-annual' },
    { _key: uid(), _type: 'reference', _ref: 'signal-rqia-residential-2025' },
  ],
  editorNote: ls(
    'The HIQA report is worth reading in full — the section on record management deficiencies maps directly to what we see most often in new client onboardings.'
  ),
  isPublished: true,
})

// ══════════════════════════════════════════════════════════════════════════════
// researchPaperSummary
// Fields: slug, paperTitle (string, required), authors, journal,
//         publishedYear (number), doi (url),
//         summary { en, ie }, relevanceNote { en, ie },
//         topics (string[]), isReviewed (boolean)
// ══════════════════════════════════════════════════════════════════════════════
;[
  {
    _id: 'research-digital-records-care',
    slug: { current: 'digital-records-quality-improvement-care' },
    paperTitle:    'Digital Record Systems and Quality Improvement in Residential Care: A Systematic Review',
    authors:       "Flanagan, M., O'Brien, C., Walsh, D.",
    journal:       'Journal of Health Services Research & Policy',
    publishedYear: 2024,
    doi:           'https://doi.org/10.1177/example',
    summary: ls(
      'A systematic review of 34 studies examining the impact of electronic record systems on quality and safety outcomes in residential care settings. Findings indicate consistent associations between structured digital records and reduced incident severity and improved audit readiness.'
    ),
    relevanceNote: ls(
      'Provides independent evidence for the clinical and operational benefits of structured digital record systems — directly relevant to the case Salient Recovery makes to prospective clients.'
    ),
    topics:     ['Digital Records', 'Residential Care', 'Quality Improvement', 'Patient Safety'],
    isReviewed: true,
  },
  {
    _id: 'research-hiqa-inspection-outcomes',
    slug: { current: 'compliance-factors-hiqa-inspection-outcomes' },
    paperTitle:    'Factors Associated with Regulatory Compliance in HIQA-Inspected Services: A Longitudinal Analysis',
    authors:       'McCarthy, P., Ryan, S.',
    journal:       'Irish Journal of Medical Science',
    publishedYear: 2023,
    doi:           'https://doi.org/10.1007/example',
    summary: ls(
      'Analysis of 420 HIQA inspection reports across disability and older person services identifies record completeness, staff training records, and incident follow-through as the three strongest predictors of compliant inspection outcomes.'
    ),
    relevanceNote: ls(
      'The three factors identified — record completeness, staff training records, and incident follow-through — are the exact operational areas Acutis is designed to address.'
    ),
    topics:     ['HIQA', 'Regulatory Compliance', 'Inspection', 'Disability Services'],
    isReviewed: true,
  },
].forEach((r) => DOCS.push({ _type: 'researchPaperSummary', ...r }))

// ══════════════════════════════════════════════════════════════════════════════
// policyUpdate
// Fields: slug, title { en, ie }, effectiveDate (date), issuingBody (string),
//         summary { en, ie }, sourceUrl (url),
//         impactAssessment { en, ie },
//         affectedSectors [reference → sectorPage], isReviewed (boolean)
// ══════════════════════════════════════════════════════════════════════════════
;[
  {
    _id: 'policy-hiqa-standards-review-2025',
    slug: { current: 'hiqa-standards-review-disability-2025' },
    title: ls('HIQA Standards Review — Disability Services 2025'),
    effectiveDate: '2025-06-01',
    issuingBody:   'HIQA',
    summary: ls(
      'HIQA completed a review of the National Standards for Residential Services for Adults and Children with Disabilities, with revised guidance on care planning documentation, resident rights records, and complaints management.'
    ),
    sourceUrl: 'https://www.hiqa.ie/reports-and-publications/standard',
    impactAssessment: ls(
      'Services should review their care plan templates and complaints records against the revised guidance. Acutis form library updates to reflect new requirements are planned for Q3 2026.'
    ),
    affectedSectors: [
      { _key: uid(), _type: 'reference', _ref: 'sector-disability' },
    ],
    isReviewed: true,
  },
  {
    _id: 'policy-gdpr-health-guidance-2024',
    slug: { current: 'dpc-health-data-guidance-2024' },
    title: ls('Data Protection Commission: Guidance on Health Data Processing 2024'),
    effectiveDate: '2024-09-01',
    issuingBody:   'Data Protection Commission',
    summary: ls(
      'The DPC published updated guidance on the processing of health data under GDPR, covering electronic health records, data retention periods for care records, and the lawful basis for sharing records between care providers.'
    ),
    sourceUrl: 'https://www.dataprotection.ie/en/guidance-landing/health-data',
    impactAssessment: ls(
      'Relevant to all Acutis clients as Data Controllers. Key changes affect data retention periods and the lawful basis for inter-provider record sharing. Review your Data Processing Agreement in light of this guidance.'
    ),
    affectedSectors: [
      { _key: uid(), _type: 'reference', _ref: 'sector-disability' },
      { _key: uid(), _type: 'reference', _ref: 'sector-mental-health' },
      { _key: uid(), _type: 'reference', _ref: 'sector-nursing-homes' },
      { _key: uid(), _type: 'reference', _ref: 'sector-childrens-residential' },
      { _key: uid(), _type: 'reference', _ref: 'sector-northern-ireland' },
    ],
    isReviewed: true,
  },
].forEach((p) => DOCS.push({ _type: 'policyUpdate', ...p }))

// ══════════════════════════════════════════════════════════════════════════════
// faqItem
// Fields: question { en, ie }, answer { en, ie } (portable text),
//         category (enum), order
//
// category values: platform | implementation | compliance | pricing | data
// ('general' is NOT a valid value)
// ══════════════════════════════════════════════════════════════════════════════
;[
  {
    _id: 'faq-what-is-acutis',
    question: ls('What is Acutis?'),
    answer: block(
      "Acutis is the clinical operations platform built by Salient Recovery. It is designed specifically for regulated care services in Ireland and Northern Ireland — not adapted from a generic healthcare or CRM system. It handles resident management, incident reporting, audit management, care programmes, forms, and facility mapping in a single structured environment."
    ),
    category: 'platform',       // ✓ valid enum value
    order: 1,
  },
  {
    _id: 'faq-which-sectors',
    question: ls('Which care sectors does Acutis support?'),
    answer: block(
      "Acutis is built for services regulated under HIQA, the Mental Health Commission, Tusla, and RQIA. This includes disability services, mental health Approved Centres, children's residential centres, nursing homes, and cross-border services operating in both jurisdictions."
    ),
    category: 'platform',       // ✓ valid enum value
    order: 2,
  },
  {
    _id: 'faq-inspection-ready',
    question: ls('How does Acutis help us be inspection-ready?'),
    answer: block(
      'Acutis is designed around the principle that your record state at any moment should reflect actual operational status. The system enforces structured data entry, mandatory fields, and completion workflows so that records are complete as a matter of routine, not as inspection preparation.'
    ),
    category: 'compliance',     // ✓ valid enum value
    order: 3,
  },
  {
    _id: 'faq-gdpr',
    question: ls('How does Acutis handle data protection and GDPR?'),
    answer: block(
      "Acutis stores all data within the EU. Access is role-based and all data access is logged. We operate as a Data Processor under GDPR, and a Data Processing Agreement is provided to all services. We do not use resident data for any purpose other than providing the platform to your organisation."
    ),
    category: 'data',           // ✓ valid enum value
    order: 4,
  },
  {
    _id: 'faq-onboarding',
    question: ls('What does onboarding involve?'),
    answer: block(
      'Onboarding typically takes four to six weeks depending on service complexity. It covers system configuration (facility structure, user roles, form library), data migration if applicable, staff training, and a live readiness review before go-live. We work directly with your operations lead throughout.'
    ),
    category: 'implementation', // ✓ valid enum value
    order: 5,
  },
  {
    _id: 'faq-pricing',
    question: ls('How is Acutis priced?'),
    answer: block(
      'Acutis is priced per service (not per user), with tiering based on the number of active residents and the modules required. We do not publish a public price list — contact us to discuss your services and we will provide a detailed proposal.'
    ),
    category: 'pricing',        // ✓ valid enum value
    order: 6,
  },
].forEach((f) => DOCS.push({ _type: 'faqItem', ...f }))

// ══════════════════════════════════════════════════════════════════════════════
// complianceStatement
// Fields: statementId (slug), framework (string, required), issuingBody,
//         statement { en, ie }, lastReviewedDate (date), order
//
// (Old seed used statement as a plain string and omitted statementId — both wrong)
// ══════════════════════════════════════════════════════════════════════════════
;[
  {
    _id: 'compliance-gdpr-storage',
    statementId: { current: 'gdpr-eu-storage' },
    framework:        'GDPR',
    issuingBody:      'Data Protection Commission',
    statement: ls('All data is stored within the European Union.'),
    lastReviewedDate: '2026-01-01',
    order: 1,
  },
  {
    _id: 'compliance-gdpr-access',
    statementId: { current: 'gdpr-role-based-access' },
    framework:        'GDPR',
    issuingBody:      'Data Protection Commission',
    statement: ls('Access to resident records is role-based and fully audited.'),
    lastReviewedDate: '2026-01-01',
    order: 2,
  },
  {
    _id: 'compliance-gdpr-dpa',
    statementId: { current: 'gdpr-dpa' },
    framework:        'GDPR',
    issuingBody:      'Data Protection Commission',
    statement: ls('A Data Processing Agreement is provided to all client organisations.'),
    lastReviewedDate: '2026-01-01',
    order: 3,
  },
  {
    _id: 'compliance-hiqa-records',
    statementId: { current: 'hiqa-record-structures' },
    framework:        'HIQA Standards',
    issuingBody:      'HIQA',
    statement: ls('Platform record structures are designed against HIQA inspection requirements.'),
    lastReviewedDate: '2026-01-01',
    order: 4,
  },
  {
    _id: 'compliance-mhc-workflows',
    statementId: { current: 'mhc-workflows' },
    framework:        'Mental Health Commission',
    issuingBody:      'Mental Health Commission',
    statement: ls('Incident and consent workflows reflect Mental Health Commission Rules for Approved Centres.'),
    lastReviewedDate: '2026-01-01',
    order: 5,
  },
  {
    _id: 'compliance-rqia-records',
    statementId: { current: 'rqia-record-structures' },
    framework:        'NI RQIA',
    issuingBody:      'RQIA',
    statement: ls('Audit and care record structures support RQIA inspection requirements in Northern Ireland.'),
    lastReviewedDate: '2026-01-01',
    order: 6,
  },
].forEach((c) => DOCS.push({ _type: 'complianceStatement', ...c }))

// ══════════════════════════════════════════════════════════════════════════════
// workflowStep
// Fields: stepNumber (number), workflowType (enum), title { en, ie },
//         description { en, ie }, actor (enum string), systemAction { en, ie }
//
// workflowType: admission|incident|audit|programme|discharge|onboarding
// actor:        clinician|key-worker|manager|administrator|system|auditor
// (Old seed passed localised objects for actor — schema expects a plain string)
// ══════════════════════════════════════════════════════════════════════════════
;[
  // ── Admission workflow ─────────────────────────────────────────
  { _id: 'wf-admission-1', stepNumber: 1, workflowType: 'admission',
    title: ls('Referral received', 'Atreorú faighte'),
    description: ls('Referral documented with source, presenting need, and initial eligibility assessment.'),
    actor: 'administrator',   // ✓ valid enum value
    systemAction: ls('Referral record created and assigned to admissions coordinator.') },

  { _id: 'wf-admission-2', stepNumber: 2, workflowType: 'admission',
    title: ls('Pre-admission assessment', 'Measúnú réamh-iontrála'),
    description: ls('Clinical assessment completed and recorded against the referral. Outcome and recommendation documented.'),
    actor: 'clinician',       // ✓ valid enum value
    systemAction: ls('Assessment form attached to referral. Status updated to Assessment Complete.') },

  { _id: 'wf-admission-3', stepNumber: 3, workflowType: 'admission',
    title: ls('Placement confirmed', 'Lonnú deimhnithe'),
    description: ls('Placement decision approved. Unit and room assigned. Admission date set.'),
    actor: 'manager',         // ✓ valid enum value
    systemAction: ls('Resident record created. Unit occupancy updated. Admission date confirmed.') },

  { _id: 'wf-admission-4', stepNumber: 4, workflowType: 'admission',
    title: ls('Admission forms completed', 'Foirmeacha iontrála críochnaithe'),
    description: ls('All required admission documentation completed and signed — consent, care agreement, personal profile.'),
    actor: 'key-worker',      // ✓ valid enum value
    systemAction: ls('Admission forms marked complete. Care programme initialised.') },

  { _id: 'wf-admission-5', stepNumber: 5, workflowType: 'admission',
    title: ls('Initial care plan activated', 'Plean cúraim tosaigh gníomhachtaithe'),
    description: ls('Initial care plan drafted, reviewed with resident, and formally activated.'),
    actor: 'clinician',       // ✓ valid enum value
    systemAction: ls('Care programme status set to Active. First review date scheduled automatically.') },

  // ── Incident workflow ──────────────────────────────────────────
  { _id: 'wf-incident-1', stepNumber: 1, workflowType: 'incident',
    title: ls('Incident reported', 'Teagmhas tuairiscithe'),
    description: ls('Staff member records the incident immediately or as soon as practicable after the event.'),
    actor: 'key-worker',      // ✓ valid enum value
    systemAction: ls('Incident record created with timestamp. Notifications dispatched to designated persons.') },

  { _id: 'wf-incident-2', stepNumber: 2, workflowType: 'incident',
    title: ls('Designated person acknowledges', 'Duine ainmnithe ag admháil'),
    description: ls('Person in charge reviews and formally acknowledges the incident report.'),
    actor: 'manager',         // ✓ valid enum value
    systemAction: ls('Acknowledgement logged. Escalation flag set if severity threshold met.') },

  { _id: 'wf-incident-3', stepNumber: 3, workflowType: 'incident',
    title: ls('Investigation assigned', 'Imscrúdú sannta'),
    description: ls('Investigation assigned to the appropriate person with expected completion date.'),
    actor: 'manager',         // ✓ valid enum value
    systemAction: ls('Investigation record created and linked to incident. Due date reminder scheduled.') },

  { _id: 'wf-incident-4', stepNumber: 4, workflowType: 'incident',
    title: ls('Findings and actions recorded', 'Torthaí agus gníomhaíochtaí taifeadta'),
    description: ls('Investigation findings, root cause analysis, and corrective actions documented with assigned owners.'),
    actor: 'auditor',         // ✓ valid enum value
    systemAction: ls('Corrective actions created with assigned owner and due dates. Overdue alerts configured.') },

  { _id: 'wf-incident-5', stepNumber: 5, workflowType: 'incident',
    title: ls('Incident formally closed', 'Teagmhas dúnta go foirmiúil'),
    description: ls('All corrective actions verified complete. Incident record closed with sign-off.'),
    actor: 'manager',         // ✓ valid enum value
    systemAction: ls('Incident status set to Closed. Full record locked. Audit trail preserved.') },

  // ── Audit workflow ─────────────────────────────────────────────
  { _id: 'wf-audit-1', stepNumber: 1, workflowType: 'audit',
    title: ls('Audit scheduled', 'Iniúchadh sceidealaithe'),
    description: ls('Audit defined with type, scope, target date, assigned auditor, and regulatory framework reference.'),
    actor: 'manager',         // ✓ valid enum value
    systemAction: ls('Audit record created. Auditor notified. Checklist generated from audit type template.') },

  { _id: 'wf-audit-2', stepNumber: 2, workflowType: 'audit',
    title: ls('Audit conducted', 'Iniúchadh á sheoladh'),
    description: ls('Auditor works through checklist items, attaches evidence, and records observations against each standard.'),
    actor: 'auditor',         // ✓ valid enum value
    systemAction: ls('Checklist progress tracked in real time. Incomplete items flagged before submission.') },

  { _id: 'wf-audit-3', stepNumber: 3, workflowType: 'audit',
    title: ls('Findings recorded', 'Torthaí taifeadta'),
    description: ls('Non-conformances, observations, and positive findings recorded with severity classification.'),
    actor: 'auditor',         // ✓ valid enum value
    systemAction: ls('Finding records created. Corrective actions auto-generated for non-conformances.') },

  { _id: 'wf-audit-4', stepNumber: 4, workflowType: 'audit',
    title: ls('Corrective actions resolved', 'Gníomhaíochtaí ceartaithí réitithe'),
    description: ls('Actions assigned to responsible parties completed and verified. Evidence of resolution attached.'),
    actor: 'manager',         // ✓ valid enum value
    systemAction: ls('Action status updated to Resolved. Verification logged.') },

  { _id: 'wf-audit-5', stepNumber: 5, workflowType: 'audit',
    title: ls('Audit closed', 'Iniúchadh dúnta'),
    description: ls('Audit formally closed with sign-off. Full audit trail retained for inspection.'),
    actor: 'manager',         // ✓ valid enum value
    systemAction: ls('Audit status set to Closed. Record locked. Available in regulatory report exports.') },
].forEach((w) => DOCS.push({ _type: 'workflowStep', ...w }))

// ══════════════════════════════════════════════════════════════════════════════
// page  (generic CMS pages)
// Fields: slug (required), title { en, ie } (required),
//         metaDescription { en, ie }, heroStatement { en, ie },
//         sections [{ _key, heading { en, ie }, body { en, ie }, layout (enum) }]
//
// layout values: prose | two-col | feature-list
// ══════════════════════════════════════════════════════════════════════════════
DOCS.push({
  _id:   'page-about',
  _type: 'page',
  slug:  { current: 'about' },
  title: ls('About Salient Recovery', 'Faoi Salient Recovery'),
  metaDescription: ls(
    'Salient Recovery builds Acutis — clinical operations software designed specifically for regulated care services in Ireland and Northern Ireland.',
    'Tógann Salient Recovery Acutis — bogearraí oibríochtaí cliniciúla deartha go sonrach do sheirbhísí cúraim rialaithe in Éirinn agus i dTuaisceart Éireann.'
  ),
  heroStatement: ls(
    'We build software for the operational reality of regulated care — not adapted from generic tools.',
    'Tógaimid bogearraí do réaltacht oibríochtúil an chúraim rialaithe — ní oiriúnaithe ó uirlisí cineálacha.'
  ),
  sections: [
    {
      _key: uid(),
      heading: ls('What we do', 'Cad a dhéanaimid'),
      body: block(
        'Salient Recovery develops Acutis, a clinical operations platform built from the ground up for the regulatory environment in Ireland and Northern Ireland. Our clients are services regulated by HIQA, the Mental Health Commission, Tusla, and RQIA.',
      ),
      layout: 'prose',         // ✓ valid enum value
    },
    {
      _key: uid(),
      heading: ls('Our approach', 'Ár gcur chuige'),
      body: block(
        'We do not build for the average health software buyer. We build for the designated centre manager who needs their records to hold up under an unannounced HIQA inspection. That specificity of purpose determines every design decision in Acutis.'
      ),
      layout: 'prose',         // ✓ valid enum value
    },
  ],
})

// ─── Execute ──────────────────────────────────────────────────────────────────

async function seed() {
  const { projectId, dataset } = client.config()
  console.log(`\nSalient Recovery — Sanity Seed v2`)
  console.log(`Project : ${projectId}`)
  console.log(`Dataset : ${dataset}`)
  console.log(`Total   : ${DOCS.length} documents\n`)

  const counts = { ok: 0, fail: 0 }

  for (const doc of DOCS) {
    try {
      await client.createOrReplace(doc)
      console.log(`  ✓  ${doc._type.padEnd(26)} ${doc._id}`)
      counts.ok++
    } catch (err) {
      console.error(`  ✗  ${doc._type.padEnd(26)} ${doc._id}`)
      console.error(`     ${err.message}\n`)
      counts.fail++
    }
  }

  console.log(`\n${'─'.repeat(56)}`)
  console.log(`  ${counts.ok} succeeded  ·  ${counts.fail} failed`)
  console.log(`${'─'.repeat(56)}\n`)

  if (counts.fail > 0) {
    console.error('Check that SANITY_API_TOKEN has Editor access or above.')
    process.exit(1)
  }
}

seed()

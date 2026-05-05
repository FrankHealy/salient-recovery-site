/**
 * Salient Recovery — Sanity Seed Script
 *
 * Populates your Sanity dataset with starter content for all document types.
 *
 * Usage:
 *   1. Set SANITY_PROJECT_ID, SANITY_DATASET, SANITY_TOKEN in your environment
 *      (or copy from .env.local)
 *   2. npm install @sanity/client (if not already installed)
 *   3. node sanity/seed.mjs
 *
 * Safe to re-run — uses createOrReplace with stable _id values.
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ls = (en, ie = en) => ({ en, ie })
const lt = (en, ie = en) => ({ en, ie })

function block(en, ie = en) {
  const make = (text) => ({
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text, marks: [] }],
  })
  return { en: [make(en)], ie: [make(ie)] }
}

function key() {
  return Math.random().toString(36).slice(2, 9)
}

// ─── Documents ────────────────────────────────────────────────────────────────

const DOCUMENTS = []

// ── Site Settings (singleton) ─────────────────────────────────────────────────
DOCUMENTS.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: ls('Salient Recovery', 'Téarnamh Salient'),
  siteTagline: ls(
    'Clinical operations software for regulated care services in Ireland and Northern Ireland.',
    'Bogearraí oibríochtaí cliniciúla do sheirbhísí cúraim rialaithe in Éirinn agus i dTuaisceart Éireann.'
  ),
  contactEmail: 'hello@salientrecovery.ie',
  contactPhone: '+353 1 234 5678',
  address: {
    line1: '1 Grand Canal Square',
    line2: 'Docklands',
    city: 'Dublin',
    country: 'Ireland',
    postcode: 'D02 P820',
  },
  footerStatement: ls(
    'Acutis is built for services regulated under HIQA, the Mental Health Commission, Tusla, and RQIA. We do not provide regulatory advice.',
    'Tá Acutis tógtha do sheirbhísí atá rialaithe faoi HIQA, an Coimisiún Meabhair-Shláinte, Tusla, agus RQIA. Ní chuirimid comhairle rialála ar fáil.'
  ),
  linkedinUrl: 'https://www.linkedin.com/company/salient-recovery',
})

// ── Navigation ────────────────────────────────────────────────────────────────
const navItems = [
  { label: ls('Platform', 'Ardán'), href: '/platform', order: 1 },
  { label: ls('How It Works', 'Conas a Oibríonn Sé'), href: '/how-it-works', order: 2 },
  { label: ls('Sectors', 'Earnálacha'), href: '/sectors', order: 3 },
  { label: ls('Resources', 'Acmhainní'), href: '/resources', order: 4 },
  { label: ls('About', 'Faoi'), href: '/about', order: 5 },
  { label: ls('Contact', 'Teagmháil'), href: '/contact', order: 6 },
]

navItems.forEach((item, i) => {
  DOCUMENTS.push({
    _id: `navItem-${i + 1}`,
    _type: 'navigationItem',
    ...item,
  })
})

// ── Platform Features ─────────────────────────────────────────────────────────
const features = [
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
      { _key: key(), label: ls('Admission and discharge lifecycle tracking', 'Rianú timthriall saol iontrála agus scaoilte') },
      { _key: key(), label: ls('Care classification and dependency scoring', 'Aicmiú cúraim agus scóráil spleáchais') },
      { _key: key(), label: ls('Assigned keyworker and care team records', 'Taifid phríomhoibrí agus foireann cúraim sannta') },
      { _key: key(), label: ls('Legal status and consent documentation', 'Stádas dlíthiúil agus doiciméadú toilithe') },
      { _key: key(), label: ls('Flagging and alert configuration per resident', 'Cumraíocht flagála agus foláirimh in aghaidh an chónaitheoirí') },
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
      { _key: key(), label: ls('Typed incident categories with mandatory fields per type', 'Catagóirí teagmhais cineáilte le réimsí éigeantacha in aghaidh an chineáil') },
      { _key: key(), label: ls('Immediate notification workflows to designated persons', 'Sreafaí fógra láithreach do dhaoine ainmnithe') },
      { _key: key(), label: ls('Investigation assignment and evidence attachment', 'Sannadh imscrúdaithe agus ceangaltán fianaise') },
      { _key: key(), label: ls('Root cause analysis structured input', 'Ionchur struchtúrtha anailíse príomhchúise') },
      { _key: key(), label: ls('Regulatory reporting flag for notifiable incidents', 'Bratach tuairiscithe rialála do theagmhais ininsinte') },
    ],
    regulatoryRelevance: ['HIQA Standards', 'Mental Health Commission', 'HSE Requirements', 'NI RQIA'],
    order: 2,
  },
  {
    _id: 'feature-audit-management',
    featureId: { current: 'audit-management' },
    title: ls('Audit Management', 'Bainistíocht Iniúchta'),
    shortDescription: ls(
      'Schedule, conduct, and close audits against defined standards. Every finding, corrective action, and sign-off is recorded and retained against the inspectable record.',
      'Sceideal, stiúir, agus dún iniúchtaí i gcoinne caighdeán sainmhínithe. Taifeadtar agus coinníonn gach toradh, gníomh ceartaitheach, agus síniú i gcoinne an taifid in-iniúchta.'
    ),
    associatedEntity: 'audit',
    capabilities: [
      { _key: key(), label: ls('Recurring audit schedule with regulatory cycle alignment', 'Sceideal iniúchta athfhillteach le ailíniú timthriall rialála') },
      { _key: key(), label: ls('Checklist-based evidence capture', 'Gabháil fianaise bunaithe ar sheicliosta') },
      { _key: key(), label: ls('Finding classification by severity', 'Aicmiú torthaí de réir déine') },
      { _key: key(), label: ls('Corrective action assignment with due dates', 'Sannadh gníomhaíochta ceartaithí le dátaí dlite') },
      { _key: key(), label: ls('Formal closure with sign-off record', 'Dúnadh foirmiúil le taifead sínithe') },
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
      { _key: key(), label: ls('Programme templates per care type and sector', 'Teimpléid cláir in aghaidh cineál cúraim agus earnála') },
      { _key: key(), label: ls('Goal setting with measurable outcome criteria', 'Socrú cuspóirí le critéir toradh intofa') },
      { _key: key(), label: ls('Scheduled review dates with reminder workflows', 'Dátaí athbhreithnithe sceidealaithe le sreafaí meabhrúcháin') },
      { _key: key(), label: ls('Multi-disciplinary team input per review', 'Ionchur foireann ildhisciplíneach in aghaidh an athbhreithnithe') },
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
      { _key: key(), label: ls('Pre-built form library for regulated care contexts', 'Leabharlann foirm réamhthógtha do chomhthéacsanna cúraim rialaithe') },
      { _key: key(), label: ls('Digital signature capture', 'Gabháil síniú digiteach') },
      { _key: key(), label: ls('Mandatory field enforcement before submission', 'Forfheidhmiú réimse éigeantaigh roimh chur isteach') },
      { _key: key(), label: ls('Version history and amendment tracking', 'Stair leaganacha agus rianú leasaithe') },
    ],
    regulatoryRelevance: ['HIQA Standards', 'GDPR / Data Protection', 'Tusla Inspection'],
    order: 5,
  },
  {
    _id: 'feature-facility-mapping',
    featureId: { current: 'facility-mapping' },
    title: ls('Facility Mapping', 'Mapáil Áiseanna'),
    shortDescription: ls(
      'Model your organisation\'s physical structure — from organisation to facility to building to unit to room. Every resident and event is located within the hierarchy.',
      'Samhlaigh struchtúr fisiciúil d\'eagraíochta — ó eagraíocht go háis go foirgneamh go haonaid go seomra. Tá gach cónaitheoir agus imeacht suite laistigh den ordlathas.'
    ),
    associatedEntity: 'facility',
    capabilities: [
      { _key: key(), label: ls('Multi-site organisation hierarchy', 'Ordlathas eagraíochta il-láithreán') },
      { _key: key(), label: ls('Unit capacity and occupancy tracking', 'Rianú acmhainne agus áitíochta aonaid') },
      { _key: key(), label: ls('Resident-to-room assignment history', 'Stair sannadh cónaitheora go seomra') },
      { _key: key(), label: ls('Physical environment compliance attributes', 'Tréithe comhlíontachta timpeallachta fisiciúla') },
    ],
    regulatoryRelevance: ['HIQA Standards', 'NI RQIA', 'HSE Requirements'],
    order: 6,
  },
  {
    _id: 'feature-event-scheduling',
    featureId: { current: 'event-scheduling' },
    title: ls('Event Scheduling', 'Sceidealú Imeachtaí'),
    shortDescription: ls(
      'Schedule and record care events — appointments, activities, assessments, reviews — against residents and programmes. Missed events are flagged automatically.',
      'Sceideal agus taifead imeachtaí cúraim — coinní, gníomhaíochtaí, measúnuithe, athbhreithnithe — i gcoinne cónaitheoirí agus clár. Flagáiltear imeachtaí caillte go huathoibríoch.'
    ),
    associatedEntity: 'event',
    capabilities: [
      { _key: key(), label: ls('Event templates per care category', 'Teimpléid imeachtaí in aghaidh catagóire cúraim') },
      { _key: key(), label: ls('Recurring schedule configuration', 'Cumraíocht sceidil athfhillteach') },
      { _key: key(), label: ls('Attendance and outcome recording', 'Taifead tinrimh agus torthaí') },
      { _key: key(), label: ls('Missed event alerts to assigned staff', 'Foláirimh imeachtaí caillte do fhoireann sannta') },
    ],
    regulatoryRelevance: ['HIQA Standards', 'Mental Health Commission'],
    order: 7,
  },
  {
    _id: 'feature-unit-management',
    featureId: { current: 'unit-management' },
    title: ls('Unit Management', 'Bainistíocht Aonaid'),
    shortDescription: ls(
      'Define units within a facility with their type, capacity, assigned staff, and current residents. Unit-level reporting and compliance status tracked separately from facility level.',
      'Sainmhínigh aonaid laistigh d\'áis lena gcineál, acmhainn, foireann sannta, agus cónaitheoirí reatha. Déantar tuairisciú ar leibhéal aonaid agus stádas comhlíontachta a rianú ar leithligh ó leibhéal na háise.'
    ),
    associatedEntity: 'unit',
    capabilities: [
      { _key: key(), label: ls('Unit type classification (residential, day, step-down)', 'Aicmiú cineál aonaid (cónaithe, lae, céim-síos)') },
      { _key: key(), label: ls('Real-time occupancy visibility', 'Infheictheacht áitíochta fíor-ama') },
      { _key: key(), label: ls('Staff-to-resident ratio tracking', 'Rianú cóimheas foirne go cónaitheoir') },
      { _key: key(), label: ls('Unit-level audit and compliance record', 'Taifead iniúchta agus comhlíontachta ar leibhéal aonaid') },
    ],
    regulatoryRelevance: ['HIQA Standards', 'NI RQIA'],
    order: 8,
  },
]

features.forEach((f) => {
  DOCUMENTS.push({ _type: 'platformFeature', ...f })
})

// ── Sector Pages ──────────────────────────────────────────────────────────────
const sectors = [
  {
    _id: 'sector-disability',
    slug: { current: 'disability-services' },
    name: ls('Disability Services', 'Seirbhísí Míchumais'),
    summary: ls(
      'Residential, day, and community disability services operating under HIQA regulation and HSE service agreements. Acutis supports the full operational cycle from referral through discharge.',
      'Seirbhísí míchumais cónaithe, lae, agus pobail ag oibriú faoi rialáil HIQA agus comhaontuithe seirbhíse FSS. Tacaíonn Acutis leis an timthriall oibríochtúil iomlán ó atreorú go dtí scaoileadh.'
    ),
    regulatoryContext: ls(
      'Services are inspected against HIQA\'s National Standards for Residential Services for Adults and Children with Disabilities (2013). Designated Centres must maintain a range of records accessible to inspectors on arrival, including admission records, care plans, incident logs, and medication records. Unannounced inspections are standard practice.',
      'Déantar iniúchadh ar sheirbhísí i gcoinne Caighdeáin Náisiúnta HIQA do Sheirbhísí Cónaithe do Dhaoine Fásta agus Leanaí le Míchumas (2013). Ní mór do Lárionaid Ainmnithe raon taifead a chothabháil atá inrochtana do chigirí ar theacht, lena n-áirítear taifid iontrála, pleananna cúraim, logaí teagmhais, agus taifid cógaisíochta. Is gnách cleachtas iniúchtaí gan fhógra.'
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
      'Approved Centres and community mental health services regulated by the Mental Health Commission under the Mental Health Act 2001 (as amended). Record-keeping obligations are extensive and legally defined.',
      'Ionaid Cheadaithe agus seirbhísí meabhair-shláinte pobail arna rialáil ag an gCoimisiún Meabhair-Shláinte faoin Acht Meabhair-Shláinte 2001 (arna leasú). Tá oibleagáidí coimeádta taifead fairsing agus sainmhínithe go dlíthiúil.'
    ),
    regulatoryContext: ls(
      'Approved Centres are inspected by the Mental Health Commission against the Mental Health Act 2001 and associated Rules and Regulations. Particular obligations exist around admission documentation, consent to treatment, seclusion and restraint recording, and Individual Care Plans. Failure to maintain required records is a regulatory finding.',
      'Déanann an Coimisiún Meabhair-Shláinte iniúchadh ar Ionaid Cheadaithe i gcoinne an Achta Meabhair-Shláinte 2001 agus Rialacha agus Rialacháin ghaolmhara. Tá oibleagáidí ar leith ann maidir le doiciméadú iontrála, toiliú le cóireáil, taifeadadh aonrúcháin agus srian, agus Pleananna Cúraim Aonair. Is toradh rialála é teip chun na taifid riachtanacha a chothabháil.'
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
    name: ls('Children\'s Residential', 'Cónaithe Leanaí'),
    summary: ls(
      'Children\'s residential centres regulated by Tusla under the Child Care Act 1991 and associated regulations. Inspection frequency is high and documentation obligations are among the most demanding in the sector.',
      'Lárionaid chónaithe leanaí arna rialáil ag Tusla faoin Acht um Chúram Leanaí 1991 agus rialacháin ghaolmhara. Tá minicíocht iniúchta ard agus tá oibleagáidí doiciméadachta ar na cinn is éilitheach san earnáil.'
    ),
    regulatoryContext: ls(
      'Services are regulated under the Child Care (Standards in Children\'s Residential Centres) Regulations 1996 and inspected by Tusla. Key obligations include individual placement plans, daily logs, safeguarding records, and incident reporting within defined timeframes. The regulatory environment expects comprehensive, contemporaneous record-keeping.',
      'Tá seirbhísí rialaithe faoi Rialacháin um Chúram Leanaí (Caighdeáin i Lárionaid Chónaithe Leanaí) 1996 agus déanann Tusla iniúchadh orthu. I measc na príomhoibleagáidí tá pleananna lonnaithe aonair, logaí laethúla, taifid chosanta, agus tuairisciú teagmhais laistigh de fhrámaí ama sainmhínithe. Bíonn súil ag an timpeallacht rialála le coimeád taifead cuimsitheach, comhaimseartha.'
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
      'Tithe altranais príobháideacha agus deonacha cláraithe agus iniúchta ag HIQA faoin Acht Sláinte 2007. Tacaíonn Acutis le hoibleagáidí coimeádta taifead cliniciúla agus riaracháin na Lárionad Ainmnithe do Dhaoine Scothaosta.'
    ),
    regulatoryContext: ls(
      'Designated Centres for Older Persons are inspected against HIQA\'s National Standards for Residential Care Settings for Older People in Ireland (2016). Documentation obligations include the Social Care Plan, daily progress notes, medication administration records, and maintenance of the Statement of Purpose. Inspections may be announced or unannounced.',
      'Déantar iniúchadh ar Lárionaid Ainmnithe do Dhaoine Scothaosta i gcoinne Caighdeáin Náisiúnta HIQA do Shocrúcháin Chúraim Chónaithe do Dhaoine Scothaosta in Éirinn (2016). I measc oibleagáidí doiciméadachta tá an Plean Cúraim Sóisialaigh, nótaí dul chun cinn laethúla, taifid riaracháin cógaisíochta, agus cothabháil an Ráitis Críche. D\'fhéadfadh iniúchtaí a bheith fógartha nó gan fhógra.'
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
      'Residential care, nursing homes, and day services regulated by the Regulation and Quality Improvement Authority (RQIA) under the Health and Personal Social Services (Quality, Improvement and Regulation) (Northern Ireland) Order 2003.',
      'Cúram cónaithe, tithe altranais, agus seirbhísí lae arna rialáil ag an Údarás Rialála agus Feabhsúcháin Cáilíochta (RQIA) faoin Ordú um Sheirbhísí Sláinte agus Pearsanta Sóisialta (Cáilíocht, Feabhsú agus Rialáil) (Tuaisceart Éireann) 2003.'
    ),
    regulatoryContext: ls(
      'RQIA inspects services against the Minimum Standards for Residential Care Homes (2011) and related frameworks. The inspection regime mirrors HIQA in many respects — unannounced visits, structured evidence review, and written reports with required improvement timelines. Acutis supports cross-border operators managing services under both HIQA and RQIA.',
      'Déanann RQIA iniúchadh ar sheirbhísí i gcoinne na gCaighdeán Íosta do Thithe Cúraim Chónaithe (2011) agus creataí gaolmhara. Is cosúil go leor leis HIQA an córas iniúchta — cuairteanna gan fhógra, athbhreithniú fianaise struchtúrtha, agus tuarascálacha scríofa le hamlínte feabhsaithe riachtanacha. Tacaíonn Acutis le hoibreoirí trasteorann a bhainistíonn seirbhísí faoi HIQA agus RQIA araon.'
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
]

sectors.forEach((s) => {
  DOCUMENTS.push({ _type: 'sectorPage', ...s })
})

// ── Resource Articles ─────────────────────────────────────────────────────────
const articles = [
  {
    _id: 'article-hiqa-inspection-prep',
    slug: { current: 'preparing-for-a-hiqa-inspection' },
    title: ls('Preparing for a HIQA Inspection: What Your Records Need to Show'),
    category: 'guide',
    publishedAt: '2026-03-15',
    summary: ls(
      'A practical breakdown of the records HIQA inspectors typically review on arrival, and how to ensure your system is inspection-ready at all times — not just before a scheduled visit.'
    ),
    body: block(
      'HIQA inspections can arrive without notice. The expectation is that your records reflect actual operational status at the moment of arrival — not a curated version prepared for the visit. This guide covers the core record categories inspectors typically review, the common gaps they find, and the operational habits that distinguish services that pass consistently from those that scramble.'
    ),
    tags: ['HIQA', 'Inspection', 'Records'],
  },
  {
    _id: 'article-incident-reporting-practice',
    slug: { current: 'incident-reporting-what-good-looks-like' },
    title: ls('Incident Reporting: What Good Looks Like'),
    category: 'guide',
    publishedAt: '2026-02-28',
    summary: ls(
      'The difference between a compliant incident report and a useful one. How structure, timeliness, and follow-through determine whether incidents become learning or liability.'
    ),
    body: block(
      'Most regulated services have an incident reporting process. Fewer have one that actually works. This piece examines what regulators look for in incident records, what common deficiencies look like in practice, and how to build a reporting culture that produces records that are both compliant and genuinely useful for service improvement.'
    ),
    tags: ['Incidents', 'Compliance', 'Best Practice'],
  },
  {
    _id: 'article-digital-care-records',
    slug: { current: 'moving-to-digital-care-records' },
    title: ls('Moving to Digital Care Records: Considerations for Regulated Services'),
    category: 'explainer',
    publishedAt: '2026-01-20',
    summary: ls(
      'What to consider before digitising your care records — data protection, staff transition, regulatory acceptance, and what the paper trail still needs to cover.'
    ),
    body: block(
      'The move from paper to digital records is a significant operational decision. Regulators in Ireland and Northern Ireland accept digital records, but the transition introduces risks that need to be managed carefully. This piece covers the key considerations: data protection obligations, validation requirements, staff training, and how to manage the hybrid period when paper and digital records coexist.'
    ),
    tags: ['Digital Records', 'GDPR', 'Operations'],
  },
]

articles.forEach((a) => {
  DOCUMENTS.push({ _type: 'resourceArticle', ...a })
})

// ── External Signals ──────────────────────────────────────────────────────────
const signals = [
  {
    _id: 'signal-hiqa-2025-annual',
    title: ls('HIQA Annual Overview of Regulation 2025'),
    source: 'HIQA',
    url: 'https://www.hiqa.ie/reports-and-publications/corporate/hiqa-annual-overview-regulation-2025',
    topic: ls('Inspection outcomes and themes across disability and older person services for 2025.'),
    region: 'republic',
    isReviewed: true,
    publishedAt: '2026-01-10',
  },
  {
    _id: 'signal-mhc-rules-2024',
    title: ls('Mental Health Commission: Updated Rules Governing Approved Centres 2024'),
    source: 'Mental Health Commission',
    url: 'https://www.mhcirl.ie',
    topic: ls('Updated rules governing record-keeping, seclusion, and consent in Approved Centres.'),
    region: 'republic',
    isReviewed: true,
    publishedAt: '2025-11-01',
  },
  {
    _id: 'signal-rqia-residential-2025',
    title: ls('RQIA Residential Care Inspection Programme Update 2025'),
    source: 'RQIA',
    url: 'https://www.rqia.org.uk',
    topic: ls('Updated inspection methodology and priority areas for residential care in Northern Ireland.'),
    region: 'northern-ireland',
    isReviewed: true,
    publishedAt: '2025-12-05',
  },
]

signals.forEach((s) => {
  DOCUMENTS.push({ _type: 'externalSignal', ...s })
})

// ── FAQ Items ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    _id: 'faq-what-is-acutis',
    question: ls('What is Acutis?'),
    answer: block(
      'Acutis is the clinical operations platform built by Salient Recovery. It is designed specifically for regulated care services in Ireland and Northern Ireland — not adapted from a generic healthcare or CRM system. It handles resident management, incident reporting, audit management, care programmes, forms, and facility mapping in a single structured environment.'
    ),
    category: 'general',
    order: 1,
  },
  {
    _id: 'faq-which-sectors',
    question: ls('Which care sectors does Acutis support?'),
    answer: block(
      'Acutis is built for services regulated under HIQA, the Mental Health Commission, Tusla, and RQIA. This includes disability services, mental health Approved Centres, children\'s residential centres, nursing homes, and cross-border services operating in both jurisdictions.'
    ),
    category: 'general',
    order: 2,
  },
  {
    _id: 'faq-inspection-ready',
    question: ls('How does Acutis help us be inspection-ready?'),
    answer: block(
      'Acutis is designed around the principle that your record state at any moment should reflect actual operational status. There is no preparation window before an inspection — the system enforces structured data entry, mandatory fields, and completion workflows so that records are complete as a matter of routine, not as inspection preparation.'
    ),
    category: 'compliance',
    order: 3,
  },
  {
    _id: 'faq-gdpr',
    question: ls('How does Acutis handle data protection and GDPR?'),
    answer: block(
      'Acutis stores all data within the EU. Access is role-based and all data access is logged. We operate as a Data Processor under GDPR, and a Data Processing Agreement is provided to all services. We do not use resident data for any purpose other than providing the platform to your organisation.'
    ),
    category: 'compliance',
    order: 4,
  },
  {
    _id: 'faq-onboarding',
    question: ls('What does onboarding involve?'),
    answer: block(
      'Onboarding typically takes four to six weeks depending on service complexity. It covers system configuration (facility structure, user roles, form library), data migration if applicable, staff training, and a live readiness review before go-live. We work directly with your operations lead throughout the process.'
    ),
    category: 'implementation',
    order: 5,
  },
]

faqs.forEach((f) => {
  DOCUMENTS.push({ _type: 'faqItem', ...f })
})

// ── Compliance Statements ─────────────────────────────────────────────────────
const complianceStatements = [
  {
    _id: 'compliance-eu-data',
    statement: ls('All data is stored within the European Union.'),
    framework: 'GDPR',
    order: 1,
  },
  {
    _id: 'compliance-role-access',
    statement: ls('Access to resident records is role-based and fully audited.'),
    framework: 'GDPR',
    order: 2,
  },
  {
    _id: 'compliance-dpa',
    statement: ls('A Data Processing Agreement is provided to all client organisations.'),
    framework: 'GDPR',
    order: 3,
  },
  {
    _id: 'compliance-hiqa-designed',
    statement: ls('Platform record structures are designed against HIQA inspection requirements.'),
    framework: 'HIQA',
    order: 4,
  },
  {
    _id: 'compliance-mhc-designed',
    statement: ls('Incident and consent workflows reflect Mental Health Commission Rules.'),
    framework: 'Mental Health Commission',
    order: 5,
  },
  {
    _id: 'compliance-rqia-designed',
    statement: ls('Audit and care record structures support RQIA inspection in Northern Ireland.'),
    framework: 'NI RQIA',
    order: 6,
  },
]

complianceStatements.forEach((c) => {
  DOCUMENTS.push({ _type: 'complianceStatement', ...c })
})

// ── Workflow Steps ─────────────────────────────────────────────────────────────
const workflowSteps = [
  // Admission workflow
  { _id: 'wf-admission-1', stepNumber: 1, workflowType: 'admission', title: ls('Referral received'), description: ls('Referral documented in system with source, presenting need, and initial eligibility assessment.'), actor: ls('Admissions Coordinator'), systemAction: ls('Referral record created. Assigned to coordinator.') },
  { _id: 'wf-admission-2', stepNumber: 2, workflowType: 'admission', title: ls('Pre-admission assessment'), description: ls('Clinical assessment completed and recorded against referral. Outcome and recommendation documented.'), actor: ls('Clinical Lead'), systemAction: ls('Assessment form attached to referral. Status updated.') },
  { _id: 'wf-admission-3', stepNumber: 3, workflowType: 'admission', title: ls('Placement confirmed'), description: ls('Placement decision approved. Unit and room assigned. Admission date set.'), actor: ls('Service Manager'), systemAction: ls('Resident record created. Unit occupancy updated.') },
  { _id: 'wf-admission-4', stepNumber: 4, workflowType: 'admission', title: ls('Admission forms completed'), description: ls('All required admission documentation completed and signed — consent, care agreement, personal profile.'), actor: ls('Key Worker'), systemAction: ls('Admission forms marked complete. Care programme initialised.') },
  { _id: 'wf-admission-5', stepNumber: 5, workflowType: 'admission', title: ls('Initial care plan in place'), description: ls('Initial care plan drafted, reviewed with resident, and formally activated.'), actor: ls('Clinical Lead'), systemAction: ls('Care programme status set to Active. Review date scheduled.') },

  // Incident workflow
  { _id: 'wf-incident-1', stepNumber: 1, workflowType: 'incident', title: ls('Incident occurs and is reported'), description: ls('Staff member records incident in system immediately or as soon as practicable after the event.'), actor: ls('Reporting Staff'), systemAction: ls('Incident record created with timestamp. Immediate notifications sent.') },
  { _id: 'wf-incident-2', stepNumber: 2, workflowType: 'incident', title: ls('Designated person notified'), description: ls('Person in charge or designated person reviews and acknowledges the incident report.'), actor: ls('Person in Charge'), systemAction: ls('Acknowledgement logged. Escalation flag set if required.') },
  { _id: 'wf-incident-3', stepNumber: 3, workflowType: 'incident', title: ls('Investigation assigned'), description: ls('Investigation assigned to appropriate person with expected completion date.'), actor: ls('Service Manager'), systemAction: ls('Investigation record created and linked to incident.') },
  { _id: 'wf-incident-4', stepNumber: 4, workflowType: 'incident', title: ls('Root cause and actions recorded'), description: ls('Investigation findings, root cause analysis, and corrective actions documented.'), actor: ls('Investigator'), systemAction: ls('Corrective actions created with assigned owner and due dates.') },
  { _id: 'wf-incident-5', stepNumber: 5, workflowType: 'incident', title: ls('Incident formally closed'), description: ls('All corrective actions verified complete. Incident record closed with sign-off.'), actor: ls('Service Manager'), systemAction: ls('Incident status set to Closed. Full record locked for audit trail.') },
]

workflowSteps.forEach((w) => {
  DOCUMENTS.push({ _type: 'workflowStep', ...w })
})

// ─── Execute ──────────────────────────────────────────────────────────────────

async function seed() {
  console.log(`\nSeeding ${DOCUMENTS.length} documents to ${client.config().dataset}...\n`)

  let success = 0
  let failed = 0

  for (const doc of DOCUMENTS) {
    try {
      await client.createOrReplace(doc)
      console.log(`  ✓  ${doc._type}  ${doc._id}`)
      success++
    } catch (err) {
      console.error(`  ✗  ${doc._type}  ${doc._id}  —  ${err.message}`)
      failed++
    }
  }

  console.log(`\nDone. ${success} created, ${failed} failed.\n`)

  if (failed > 0) {
    console.log('Check that your SANITY_API_TOKEN has write access to the dataset.')
    process.exit(1)
  }
}

seed()

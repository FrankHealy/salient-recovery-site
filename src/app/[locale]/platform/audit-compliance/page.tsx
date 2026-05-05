import { client } from '../../../../../sanity/client'
import { ALL_PLATFORM_FEATURES_QUERY, ALL_COMPLIANCE_QUERY } from '@sanity/queries'
import { PlatformFeature, ComplianceStatement } from '@/lib/types'
import { t } from '@/lib/i18n'
import { PageHero, SectionHeader, FeatureBlock, ComplianceBadge } from '@/components/ui'

interface PageProps {
  params: { locale: string }
}

const AUDIT_FEATURE_IDS = ['audit', 'incident', 'form']

const AUDIT_CAPABILITY_GROUPS = [
  {
    id: 'scheduled',
    label: { en: 'Scheduled Audits', ie: 'Iniúchtaí Sceidealaithe' },
    description: {
      en: 'Define recurring audit schedules tied to regulatory cycles. Each audit instance is tracked from creation through completion, with evidence attached at each step.',
      ie: 'Sainmhínigh sceidil iniúchta athfhillteacha atá nasctha le timthriallta rialála. Déantar gach sampla iniúchta a rianú ó chruthú go dtí críochnú, le fianaise ceangailte ag gach céim.'
    }
  },
  {
    id: 'unannounced',
    label: { en: 'Unannounced Inspection Readiness', ie: 'Réidheacht le hIniúchtaí Gan Fógra' },
    description: {
      en: 'Maintain a live compliance posture so that the record state at any moment reflects actual operational status. No preparation window required.',
      ie: 'Cothaigh staid chomhlíontachta bheo ionas go léiríonn staid na dtaifead ag aon nóiméad an staid oibríochtúil iarbhír. Níl aon fhuinneog ullmhúcháin ag teastáil.'
    }
  },
  {
    id: 'evidence',
    label: { en: 'Evidence & Attachment Management', ie: 'Bainistíocht Fianaise & Ceangaltán' },
    description: {
      en: 'Attach documents, photographs, and signed observations directly to audit findings. Evidence is stored against the relevant entity and retrievable by inspectors.',
      ie: 'Ceangail doiciméid, grianghraif, agus breathnuithe sínithe go díreach le torthaí iniúchta. Stóráiltear fianaise i gcoinne an eintitis ábhartha agus is féidir le cigirí í a aisghabháil.'
    }
  },
  {
    id: 'actions',
    label: { en: 'Corrective Action Tracking', ie: 'Rianú Gníomhaíochtaí Ceartaitheacha' },
    description: {
      en: 'Log required actions from audit findings with assigned owner, due date, and resolution status. Actions remain open until formally closed with supporting evidence.',
      ie: 'Logáil gníomhaíochtaí riachtanacha ó thorthaí iniúchta le húinéir sannta, dáta dlite, agus stádas réitigh. Fanann gníomhaíochtaí oscailte go dtí go ndúntar go foirmiúil iad le fianaise tacaíochta.'
    }
  }
]

const REGULATORY_FRAMEWORKS = [
  {
    code: 'HIQA',
    name: { en: 'Health Information and Quality Authority', ie: 'An tÚdarás Um Fhaisnéis agus Cáilíocht Sláinte' },
    description: {
      en: 'Ireland\'s independent authority responsible for monitoring, inspecting, and regulating health and social care services.',
      ie: 'Údarás neamhspleách na hÉireann atá freagrach as monatóireacht, iniúchadh, agus rialú seirbhísí sláinte agus cúraim shóisialaigh.'
    },
    applicableServices: ['Disability', 'Mental Health', 'Children\'s Residential']
  },
  {
    code: 'RQIA',
    name: { en: 'Regulation and Quality Improvement Authority', ie: 'Údarás Rialála agus Feabhsúcháin Cáilíochta' },
    description: {
      en: 'Northern Ireland\'s independent health and social care regulatory and improvement body.',
      ie: 'Comhlacht rialála agus feabhsúcháin neamhspleách sláinte agus cúraim shóisialaigh Thuaisceart Éireann.'
    },
    applicableServices: ['Residential Care', 'Nursing Homes', 'Day Care']
  },
  {
    code: 'HSE',
    name: { en: 'Health Service Executive Standards', ie: 'Caighdeáin Fheidhmeannacht na Seirbhísí Sláinte' },
    description: {
      en: 'Service-level compliance requirements applicable to HSE-funded and HSE-operated care services.',
      ie: 'Riachtanais chomhlíontachta ar leibhéal seirbhíse infheidhme do sheirbhísí cúraim atá maoinithe agus á n-oibriú ag FSS.'
    },
    applicableServices: ['Section 38/39 Services', 'Primary Care', 'Community Services']
  }
]

export default async function AuditCompliancePage({ params }: PageProps) {
  const locale = params.locale as 'en' | 'ie'

  const [features, complianceStatements] = await Promise.all([
    client.fetch<PlatformFeature[]>(ALL_PLATFORM_FEATURES_QUERY),
    client.fetch<ComplianceStatement[]>(ALL_COMPLIANCE_QUERY)
  ])

  const auditFeatures = features.filter(f => AUDIT_FEATURE_IDS.includes(f.associatedEntity))

  return (
    <main>
      <PageHero
        eyebrow={locale === 'en' ? 'Platform · Audit & Compliance' : 'Ardán · Iniúchadh & Comhlíontacht'}
        heading={locale === 'en' ? 'Audit & Compliance' : 'Iniúchadh & Comhlíontacht'}
        statement={
          locale === 'en'
            ? 'Structured audit management across regulatory frameworks. Every finding, action, and closure recorded against the inspectable record.'
            : 'Bainistíocht iniúchta struchtúrtha ar fud creatanna rialála. Gach toradh, gníomhaíocht, agus dúnadh taifeadta i gcoinne an taifid in-iniúchta.'
        }
      />

      {/* Sub-page navigation */}
      <nav className="border-b border-ink-200 bg-surface-100">
        <div className="container-site">
          <div className="flex gap-6 py-3 text-sm overflow-x-auto">
            {[
              { href: `/${locale}/platform`, label: locale === 'en' ? 'Overview' : 'Forbhreathnú' },
              { href: `/${locale}/platform/timeline`, label: locale === 'en' ? 'Timeline' : 'Amlíne' },
              { href: `/${locale}/platform/forms`, label: locale === 'en' ? 'Forms' : 'Foirmeacha' },
              { href: `/${locale}/platform/facility-mapping`, label: locale === 'en' ? 'Facility Mapping' : 'Mapáil Áiseanna' },
              { href: `/${locale}/platform/audit-compliance`, label: locale === 'en' ? 'Audit & Compliance' : 'Iniúchadh & Comhlíontacht', active: true },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap pb-3 border-b-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                  item.active
                    ? 'border-primary-600 text-primary-700'
                    : 'border-transparent text-ink-500 hover:text-ink-900'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Audit capability groups */}
      <section className="section-pad bg-surface-50">
        <div className="container-site">
          <SectionHeader
            eyebrow={locale === 'en' ? 'Audit Capabilities' : 'Cumais Iniúchta'}
            heading={locale === 'en' ? 'How audit management works' : 'Conas a oibríonn bainistíocht iniúchta'}
            body={
              locale === 'en'
                ? 'Audit records are structured objects — not unstructured notes. Each audit type has defined fields, required evidence, and a lifecycle enforced by the system.'
                : 'Is réada struchtúrtha iad taifid iniúchta — ní nótaí gan struchtúr. Tá réimsí sainmhínithe, fianaise riachtanach, agus timthriall saol a fhorfheidhmíonn an córas ag gach cineál iniúchta.'
            }
          />

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {AUDIT_CAPABILITY_GROUPS.map(group => (
              <div key={group.id} className="bg-white border border-ink-200 p-8">
                <h3 className="font-serif text-lg text-ink-900 mb-3">
                  {t(group.label, locale)}
                </h3>
                <p className="text-ink-600 text-sm leading-relaxed">
                  {t(group.description, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit lifecycle diagram */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeader
            eyebrow={locale === 'en' ? 'Audit Lifecycle' : 'Timthriall Saol Iniúchta'}
            heading={locale === 'en' ? 'From schedule to closure' : 'Ó sceideal go dúnadh'}
          />

          <div className="mt-12 max-w-3xl">
            {[
              {
                step: 1,
                phase: { en: 'Schedule', ie: 'Sceideal' },
                description: {
                  en: 'Audit defined with type, scope, target date, and assigned auditor. Linked to regulatory framework if applicable.',
                  ie: 'Iniúchadh sainmhínithe le cineál, raon feidhme, dáta sprice, agus iniúchóir sannta. Nasctha le creat rialála más infheidhme.'
                },
                actor: { en: 'Quality Manager', ie: 'Bainisteoir Cáilíochta' }
              },
              {
                step: 2,
                phase: { en: 'Conduct', ie: 'Stiúradh' },
                description: {
                  en: 'Auditor completes checklist items, attaches evidence, and records observations against each standard or criterion.',
                  ie: 'Líonann an t-iniúchóir míreanna seicliosta, ceanglaíonn fianaise, agus déanann breathnuithe a thaifeadadh i gcoinne gach caighdeán nó critéar.'
                },
                actor: { en: 'Auditor', ie: 'Iniúchóir' }
              },
              {
                step: 3,
                phase: { en: 'Findings', ie: 'Torthaí' },
                description: {
                  en: 'Non-conformances, observations, and positive findings recorded with severity classification. Each finding generates a trackable record.',
                  ie: 'Neamh-chomhlíontachtaí, breathnuithe, agus torthaí dearfacha taifeadta le haicmiú déine. Gineann gach toradh taifead in-rianaithe.'
                },
                actor: { en: 'Auditor', ie: 'Iniúchóir' }
              },
              {
                step: 4,
                phase: { en: 'Corrective Actions', ie: 'Gníomhaíochtaí Ceartaitheacha' },
                description: {
                  en: 'Actions assigned to responsible parties with due dates. Progress tracked in system. Overdue items flagged automatically.',
                  ie: 'Gníomhaíochtaí sannta do pháirtithe freagracha le dátaí dlite. Dul chun cinn rianaithe sa chóras. Míreanna dlite thar ama flagáilte go huathoibríoch.'
                },
                actor: { en: 'Service Manager', ie: 'Bainisteoir Seirbhíse' }
              },
              {
                step: 5,
                phase: { en: 'Review & Close', ie: 'Athbhreithniú & Dúnadh' },
                description: {
                  en: 'Completed actions reviewed and verified. Audit formally closed with sign-off. Full audit trail retained for inspection.',
                  ie: 'Gníomhaíochtaí críochnaithe athbhreithnithe agus fíoraithe. Iniúchadh dúnta go foirmiúil le síniú. Conair iniúchta iomlán coinnithe le haghaidh cigireachta.'
                },
                actor: { en: 'Quality Manager', ie: 'Bainisteoir Cáilíochta' }
              }
            ].map((item, idx, arr) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-700 text-white flex items-center justify-center font-mono text-sm font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="w-px flex-1 bg-primary-200 my-2" />
                  )}
                </div>
                <div className={`pb-8 ${idx === arr.length - 1 ? '' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-serif text-base text-ink-900">
                      {t(item.phase, locale)}
                    </h4>
                    <span className="font-mono text-xs text-primary-600 bg-primary-50 px-2 py-0.5 border border-primary-200">
                      {t(item.actor, locale)}
                    </span>
                  </div>
                  <p className="text-ink-600 text-sm leading-relaxed">
                    {t(item.description, locale)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory frameworks */}
      <section className="section-pad bg-surface-50">
        <div className="container-site">
          <SectionHeader
            eyebrow={locale === 'en' ? 'Regulatory Context' : 'Comhthéacs Rialála'}
            heading={locale === 'en' ? 'Supported frameworks' : 'Creataí tacaithe'}
            body={
              locale === 'en'
                ? 'Acutis is designed for the regulatory environment in Ireland and Northern Ireland. Audit structures and compliance tracking align with the standards applied by each authority.'
                : 'Tá Acutis deartha do thimpeallacht rialála in Éirinn agus i dTuaisceart Éireann. Ailíníonn struchtúir iniúchta agus rianú comhlíontachta leis na caighdeáin a chuireann gach údarás i bhfeidhm.'
            }
          />

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {REGULATORY_FRAMEWORKS.map(framework => (
              <div key={framework.code} className="bg-white border border-ink-200 p-6">
                <div className="font-mono text-xs text-primary-600 bg-primary-50 border border-primary-200 px-2 py-1 inline-block mb-4">
                  {framework.code}
                </div>
                <h3 className="font-serif text-base text-ink-900 mb-3">
                  {t(framework.name, locale)}
                </h3>
                <p className="text-ink-600 text-sm leading-relaxed mb-4">
                  {t(framework.description, locale)}
                </p>
                <div className="border-t border-ink-100 pt-4">
                  <p className="font-mono text-xs text-ink-500 uppercase tracking-wider mb-2">
                    {locale === 'en' ? 'Applicable to' : 'Infheidhme maidir le'}
                  </p>
                  <ul className="space-y-1">
                    {framework.applicableServices.map(svc => (
                      <li key={svc} className="text-xs text-ink-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                        {svc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CMS-driven compliance statements */}
      {complianceStatements && complianceStatements.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-site">
            <SectionHeader
              eyebrow={locale === 'en' ? 'Compliance Statements' : 'Ráitis Chomhlíontachta'}
              heading={locale === 'en' ? 'Platform compliance positions' : 'Seasaimh chomhlíontachta ardáin'}
            />
            <div className="grid md:grid-cols-2 gap-4 mt-12">
              {complianceStatements.map(statement => (
                <ComplianceBadge
                  key={statement._id}
                  framework={statement.framework}
                  issuingBody={statement.issuingBody}
                  statement={t(statement.statement, locale)}
                  lastReviewedDate={statement.lastReviewedDate}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Platform features */}
      {auditFeatures.length > 0 && (
        <section className="section-pad bg-surface-50">
          <div className="container-site">
            <SectionHeader
              eyebrow={locale === 'en' ? 'Related Features' : 'Gnéithe Gaolmhara'}
              heading={locale === 'en' ? 'Audit-related platform features' : 'Gnéithe ardáin a bhaineann le hiniúchadh'}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {auditFeatures.map(feature => (
                <FeatureBlock
                  key={feature._id}
                  entity={feature.associatedEntity}
                  title={t(feature.title, locale)}
                  description={t(feature.shortDescription, locale)}
                  capabilities={feature.capabilities?.map((cap) => t(cap.label, locale))}
                  regulatoryRelevance={feature.regulatoryRelevance}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next step */}
      <section className="section-pad bg-primary-900 text-white">
        <div className="container-site max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary-300 mb-4">
            {locale === 'en' ? 'Next Step' : 'Céad Eile'}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl mb-6">
            {locale === 'en'
              ? 'See how audit integrates with the full platform'
              : 'Féach conas a chomhtháthóíonn iniúchadh leis an ardán iomlán'}
          </h2>
          <p className="text-primary-200 mb-8 leading-relaxed">
            {locale === 'en'
              ? 'Audit findings connect directly to incident records, care plans, and resident profiles. Nothing is isolated.'
              : 'Nascann torthaí iniúchta go díreach le taifid teagmhais, pleananna cúraim, agus próifílí cónaitheoirí. Níl aon rud ina aonar.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`/${locale}/how-it-works`}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-900 font-mono text-sm uppercase tracking-wider hover:bg-surface-100 transition-colors"
            >
              {locale === 'en' ? 'See How It Works' : 'Féach Conas a Oibríonn Sé'}
            </a>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-6 py-3 border border-primary-400 text-white font-mono text-sm uppercase tracking-wider hover:border-white transition-colors"
            >
              {locale === 'en' ? 'Get in Touch' : 'Déan Teagmháil'}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

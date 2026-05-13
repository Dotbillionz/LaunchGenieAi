const DEFAULT_KEYWORDS = [
  'import export',
  'logistics',
  'trucking',
  'drilling',
  'boreage',
  'infrastructure',
  'fintech',
  'information technology',
  'cloud',
  'cybersecurity',
  'consulting'
];

const DEFAULT_REGION_FOCUS = ['Italy', 'Tuscany', 'EU'];

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const tenderSources = [
  {
    id: 'ted',
    name: 'TED / Tenders Electronic Daily',
    country: 'EU',
    coverage: 'EU published notices and GPA-screenable opportunities',
    website: 'https://ted.europa.eu/',
    search: {
      type: 'search_url',
      template: 'https://ted.europa.eu/en/search/result?query={query}'
    }
  },
  {
    id: 'consip',
    name: 'Consip Open Data',
    country: 'Italy',
    coverage: 'National procurement datasets and framework agreements',
    website: 'https://www.consip.it/',
    search: {
      type: 'api_request',
      method: 'GET',
      endpoint: 'https://www.consip.it/bandi-di-gara',
      queryParameters: ['keyword']
    }
  },
  {
    id: 'anac',
    name: 'ANAC Pubblicità a Valore Legale',
    country: 'Italy',
    coverage: 'Official legal notices and publication records',
    website: 'https://pubblicitalegale.anticorruzione.it/',
    search: {
      type: 'search_url',
      template: 'https://pubblicitalegale.anticorruzione.it/ricerca?keyword={query}'
    }
  },
  {
    id: 'start-toscana',
    name: 'START Toscana',
    country: 'Italy',
    coverage: 'Tuscany regional and local procurement portal',
    website: 'https://start.toscana.it/',
    search: {
      type: 'search_url',
      template: 'https://start.toscana.it/tendering/tenders?query={query}'
    }
  },
  {
    id: 'mepa',
    name: 'Acquisti in Rete PA / MePA',
    country: 'Italy',
    coverage: 'Supplier registration, RDO monitoring, and marketplace access',
    website: 'https://www.acquistinretepa.it/',
    search: {
      type: 'search_url',
      template: 'https://www.acquistinretepa.it/opencms/opencms/vetrina_bandi.html?query={query}'
    }
  },
  {
    id: 'fucecchio',
    name: 'Comune di Fucecchio transparency portal',
    country: 'Italy',
    coverage: 'Municipal transparency and local procurement notices',
    website: 'https://www.comune.fucecchio.fi.it/',
    search: {
      type: 'search_url',
      template: 'https://www.comune.fucecchio.fi.it/amministrazione-trasparente/bandi-di-gara-e-contratti?query={query}'
    }
  }
];

const noticeTemplates = [
  {
    id: 'ted-001',
    sourceId: 'ted',
    title: 'EU customs cloud and trade-finance integration services',
    description:
      'Cross-border trade platform, customs workflow automation, cybersecurity controls, and cloud integration for import/export operators serving Italian logistics corridors.',
    region: 'EU',
    location: 'Italy',
    estimatedValue: 1600000,
    deadlineOffsetDays: 15,
    sectorTags: ['import export', 'fintech', 'cloud', 'cybersecurity', 'consulting'],
    foreignOperatorEligible: true,
    requiresSOA: false,
    requiresPartner: false
  },
  {
    id: 'consip-001',
    sourceId: 'consip',
    title: 'National logistics and trucking optimization framework',
    description:
      'Framework agreement for route optimization, transport visibility, freight analytics, and consulting support for national public logistics operations.',
    region: 'Italy',
    location: 'Rome',
    estimatedValue: 920000,
    deadlineOffsetDays: 11,
    sectorTags: ['logistics', 'trucking', 'consulting', 'information technology'],
    foreignOperatorEligible: true,
    requiresSOA: false,
    requiresPartner: false
  },
  {
    id: 'anac-001',
    sourceId: 'anac',
    title: 'Municipal cloud migration and security resilience services',
    description:
      'Support services for municipal infrastructure hardening, cloud migration planning, incident readiness, and cybersecurity documentation.',
    region: 'Italy',
    location: 'Florence',
    estimatedValue: 380000,
    deadlineOffsetDays: 8,
    sectorTags: ['cloud', 'cybersecurity', 'infrastructure', 'consulting'],
    foreignOperatorEligible: true,
    requiresSOA: false,
    requiresPartner: false
  },
  {
    id: 'start-001',
    sourceId: 'start-toscana',
    title: 'Tuscany smart road logistics and infrastructure support services',
    description:
      'Regional tender for logistics coordination, fleet visibility, and infrastructure planning across Tuscany transport corridors.',
    region: 'Tuscany',
    location: 'Tuscany',
    estimatedValue: 540000,
    deadlineOffsetDays: 6,
    sectorTags: ['logistics', 'trucking', 'infrastructure', 'consulting'],
    foreignOperatorEligible: true,
    requiresSOA: false,
    requiresPartner: true
  },
  {
    id: 'mepa-001',
    sourceId: 'mepa',
    title: 'MePA RDO for fintech modernization and supplier onboarding',
    description:
      'Marketplace RDO covering fintech workflow redesign, digital payments integration, vendor onboarding, and governance consulting.',
    region: 'Italy',
    location: 'Online / Italy',
    estimatedValue: 240000,
    deadlineOffsetDays: 4,
    sectorTags: ['fintech', 'consulting', 'information technology'],
    foreignOperatorEligible: false,
    requiresSOA: false,
    requiresPartner: false,
    requiresMarketplaceRegistration: true
  },
  {
    id: 'fucecchio-001',
    sourceId: 'fucecchio',
    title: 'Fucecchio drilling and water infrastructure maintenance support',
    description:
      'Local opportunity covering boreage, drilling support, and small-scale water infrastructure maintenance planning for municipal assets.',
    region: 'Tuscany',
    location: 'Fucecchio',
    estimatedValue: 310000,
    deadlineOffsetDays: 5,
    sectorTags: ['drilling', 'boreage', 'infrastructure', 'consulting'],
    foreignOperatorEligible: false,
    requiresSOA: true,
    requiresPartner: true
  }
];

let latestScan = buildScanResult({});

function unique(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function normalizeKeywords(keywords = DEFAULT_KEYWORDS) {
  if (!Array.isArray(keywords)) {
    return DEFAULT_KEYWORDS;
  }

  const normalized = unique(
    keywords
      .flatMap((keyword) => String(keyword).split(','))
      .map((keyword) => keyword.trim().toLowerCase())
      .filter(Boolean)
  );

  return normalized.length ? normalized : DEFAULT_KEYWORDS;
}

function normalizeRegions(regionFocus = DEFAULT_REGION_FOCUS) {
  if (!Array.isArray(regionFocus)) {
    return DEFAULT_REGION_FOCUS;
  }

  const normalized = unique(regionFocus.map((region) => String(region).trim()));
  return normalized.length ? normalized : DEFAULT_REGION_FOCUS;
}

function buildSearchInstruction(source, keywords) {
  const query = encodeURIComponent(keywords.join(' OR '));

  if (source.search.type === 'search_url') {
    return {
      type: 'search_url',
      value: source.search.template.replace('{query}', query)
    };
  }

  return {
    type: 'api_request',
    value: {
      method: source.search.method,
      endpoint: source.search.endpoint,
      params: { keyword: keywords.join(', ') }
    }
  };
}

function keywordScore(notice, keywords) {
  const haystack = `${notice.title} ${notice.description} ${notice.sectorTags.join(' ')}`.toLowerCase();
  const matches = keywords.filter((keyword) => haystack.includes(keyword));
  return {
    matchedKeywords: matches,
    score: Math.min(30, matches.length * 6)
  };
}

function regionScore(notice, regionFocus) {
  const matches = regionFocus.filter((region) =>
    [notice.region, notice.location, notice.location?.split(' / ')[1], 'Italy', 'EU']
      .filter(Boolean)
      .some((value) => String(value).toLowerCase() === String(region).toLowerCase())
  );

  return {
    matchedRegions: unique(matches),
    score: Math.min(15, matches.length * 7.5)
  };
}

function foreignOperatorScore(notice) {
  return {
    score: notice.foreignOperatorEligible ? 15 : notice.requiresMarketplaceRegistration ? 5 : 2,
    note: notice.foreignOperatorEligible
      ? 'Foreign operator participation appears possible.'
      : 'Local registration or partner structure is likely needed.'
  };
}

function riskScore(notice) {
  if (notice.requiresSOA) {
    return { score: 2, level: 'high' };
  }

  if (notice.requiresPartner || notice.requiresMarketplaceRegistration) {
    return { score: 10, level: 'medium' };
  }

  return { score: 20, level: 'low' };
}

function urgencyScore(deadlineIso) {
  const daysUntilDeadline = Math.max(0, Math.ceil((new Date(deadlineIso) - new Date()) / MS_PER_DAY));

  if (daysUntilDeadline <= 5) {
    return { score: 10, daysUntilDeadline };
  }

  if (daysUntilDeadline <= 10) {
    return { score: 7, daysUntilDeadline };
  }

  if (daysUntilDeadline <= 20) {
    return { score: 5, daysUntilDeadline };
  }

  return { score: 2, daysUntilDeadline };
}

function valueScore(estimatedValue) {
  if (estimatedValue >= 1000000) return 10;
  if (estimatedValue >= 500000) return 8;
  if (estimatedValue >= 250000) return 6;
  return 4;
}

function determineLegalRoute(notice) {
  if (notice.foreignOperatorEligible && !notice.requiresPartner && !notice.requiresMarketplaceRegistration) {
    return 'direct-us-llc';
  }

  if (notice.requiresPartner || notice.requiresSOA) {
    return 'italian-partner-rti-avvalimento';
  }

  return 'future-italian-srl';
}

function getLegalRouteLabel(legalRoute) {
  return (
    {
      'direct-us-llc': 'Direct US LLC route',
      'italian-partner-rti-avvalimento': 'Italian partner / RTI / avvalimento route',
      'future-italian-srl': 'Future Italian S.r.l. route'
    }[legalRoute] || legalRoute
  );
}

function buildActionPack(opportunity, keywords) {
  const legalRouteLabel = getLegalRouteLabel(opportunity.legalRoute);
  const matchedKeywords = opportunity.score.keywordFit.matchedKeywords.length
    ? opportunity.score.keywordFit.matchedKeywords
    : keywords.slice(0, 3);

  const checklist = [
    'Company profile and references relevant to the notice',
    'Tender participation declaration and beneficial ownership details',
    'Italian tax/VAT and representative readiness check',
    'Technical and financial capacity evidence'
  ];

  if (opportunity.requiresSOA) {
    checklist.push('SOA qualification coverage or partner avvalimento evidence');
  }

  if (opportunity.requiresMarketplaceRegistration) {
    checklist.push('MePA supplier registration and marketplace profile validation');
  }

  if (opportunity.requiresPartner) {
    checklist.push('Draft RTI / subcontracting / local partner structure');
  }

  return {
    bidNoBidMemo:
      opportunity.score.total >= 60
        ? `Bid recommended: ${opportunity.title} aligns with ${matchedKeywords.join(', ')} and scores ${opportunity.score.total}/100. ${legalRouteLabel} is the recommended legal route.`
        : `No-bid or monitor: ${opportunity.title} currently scores ${opportunity.score.total}/100 and requires extra qualification work. ${legalRouteLabel} remains the fallback route if the opportunity is strategically important.`,
    documentChecklist: checklist,
    partnerOutreachDraft: `Hello,\n\nWCGroup is reviewing the ${opportunity.title} opportunity and is seeking an Italian execution partner for qualification, local compliance, and delivery coverage. Please confirm availability for a quick review call and share relevant references.\n\nBest regards,\nLaunchGenie Tender Desk`,
    nextActionTimeline: [
      `T+0: Validate notice scope, submission channel, and legal route (${legalRouteLabel}).`,
      'T+1 day: Confirm go/no-go owner, collect mandatory company documents, and map qualification gaps.',
      'T+2 days: Draft partner outreach and compliance checklist for human/legal review.',
      `T-${Math.max(1, Math.min(3, opportunity.score.deadlineUrgency.daysUntilDeadline - 1))}: Final internal review before submission window closes.`
    ]
  };
}

function scoreNotice(notice, keywords, regionFocus) {
  const keywordFit = keywordScore(notice, keywords);
  const regionFit = regionScore(notice, regionFocus);
  const foreignEligibility = foreignOperatorScore(notice);
  const soaRtiRisk = riskScore(notice);
  const deadlineUrgency = urgencyScore(notice.deadline);
  const estimatedValue = valueScore(notice.estimatedValue);
  const total =
    keywordFit.score +
    regionFit.score +
    foreignEligibility.score +
    soaRtiRisk.score +
    deadlineUrgency.score +
    estimatedValue;

  return {
    total,
    keywordFit,
    regionFit,
    foreignOperatorEligibility: foreignEligibility,
    soaRtiRisk,
    deadlineUrgency,
    estimatedValue
  };
}

function buildOpportunity(template, options) {
  const source = tenderSources.find(({ id }) => id === template.sourceId);
  const deadline = new Date(Date.now() + template.deadlineOffsetDays * MS_PER_DAY).toISOString();
  const keywords = normalizeKeywords(options.keywords);
  const regionFocus = normalizeRegions(options.regionFocus);
  const notice = {
    ...template,
    deadline,
    searchInstruction: buildSearchInstruction(source, keywords)
  };
  const score = scoreNotice(notice, keywords, regionFocus);
  const legalRoute = determineLegalRoute(notice);
  const actionPack = buildActionPack(
    {
      ...notice,
      legalRoute,
      score
    },
    keywords
  );

  return {
    id: slugify(`${template.sourceId}-${template.title}`),
    sourceId: template.sourceId,
    sourceName: source?.name,
    title: template.title,
    description: template.description,
    region: template.region,
    location: template.location,
    estimatedValue: template.estimatedValue,
    deadline,
    sectorTags: template.sectorTags,
    foreignOperatorEligible: template.foreignOperatorEligible,
    requiresSOA: Boolean(template.requiresSOA),
    requiresPartner: Boolean(template.requiresPartner),
    requiresMarketplaceRegistration: Boolean(template.requiresMarketplaceRegistration),
    legalRoute,
    legalRouteLabel: getLegalRouteLabel(legalRoute),
    shortlisted: score.total >= 60,
    score,
    searchInstruction: notice.searchInstruction,
    actionPack
  };
}

function buildScanResult(options = {}) {
  const keywords = normalizeKeywords(options.keywords);
  const regionFocus = normalizeRegions(options.regionFocus);
  const sourceIds = Array.isArray(options.sourceIds) && options.sourceIds.length ? options.sourceIds : tenderSources.map(({ id }) => id);
  const sources = tenderSources
    .filter(({ id }) => sourceIds.includes(id))
    .map((source) => ({
      ...source,
      searchInstruction: buildSearchInstruction(source, keywords)
    }));
  const opportunities = noticeTemplates
    .filter((template) => sourceIds.includes(template.sourceId))
    .map((template) => buildOpportunity(template, { keywords, regionFocus }));

  return {
    generatedAt: new Date().toISOString(),
    criteria: {
      keywords,
      regionFocus,
      sourceIds
    },
    sources,
    summary: {
      totalSources: sources.length,
      totalOpportunities: opportunities.length,
      shortlisted: opportunities.filter(({ shortlisted }) => shortlisted).length,
      directUsLlc: opportunities.filter(({ legalRoute }) => legalRoute === 'direct-us-llc').length,
      partnerRoute: opportunities.filter(({ legalRoute }) => legalRoute === 'italian-partner-rti-avvalimento').length,
      futureItalianSrl: opportunities.filter(({ legalRoute }) => legalRoute === 'future-italian-srl').length
    },
    opportunities
  };
}

export function getTenderSources() {
  return tenderSources.map((source) => ({
    ...source,
    searchInstruction: buildSearchInstruction(source, DEFAULT_KEYWORDS)
  }));
}

export function scanTenders(options = {}) {
  latestScan = buildScanResult(options);
  return latestScan;
}

export function getTenderOpportunities(filters = {}) {
  const scan = latestScan || scanTenders({});
  const shortlisted = filters.shortlisted === true || filters.shortlisted === 'true';
  const legalRoute = filters.legalRoute;
  const sourceId = filters.sourceId;

  const opportunities = scan.opportunities.filter((opportunity) => {
    if (shortlisted && !opportunity.shortlisted) {
      return false;
    }

    if (legalRoute && opportunity.legalRoute !== legalRoute) {
      return false;
    }

    if (sourceId && opportunity.sourceId !== sourceId) {
      return false;
    }

    return true;
  });

  return {
    generatedAt: scan.generatedAt,
    criteria: scan.criteria,
    summary: {
      ...scan.summary,
      filteredOpportunities: opportunities.length
    },
    opportunities
  };
}

export function getLatestTenderScan() {
  return latestScan;
}

#!/usr/bin/env node
'use strict';

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// ─── Brand tokens ────────────────────────────────────────────────────────────
const WHITE       = '#FFFFFF';
const OFF_WHITE   = '#F8F9FA';
const LIGHT_GRAY  = '#F1F3F5';
const BORDER      = '#E2E8F0';
const TEXT_DIM    = '#6B7280';
const TEXT_BODY   = '#374151';
const TEXT_DARK   = '#111827';
const BLUE        = '#2563EB';
const BLUE_LIGHT  = '#EFF6FF';
const GREEN       = '#059669';
const GREEN_LIGHT = '#ECFDF5';
const AMBER       = '#D97706';
const AMBER_LIGHT = '#FFFBEB';

const FONT_SANS   = 'Helvetica';
const FONT_BOLD   = 'Helvetica-Bold';
const FONT_MONO   = 'Courier';

const OUT_PATH = path.join(__dirname, '..', 'public', 'downloads', '5-automations-checklist.pdf');

// ─── Page dimensions (A4) ────────────────────────────────────────────────────
const W      = 595.28;
const H      = 841.89;
const MARGIN = 52;
const INNER  = W - MARGIN * 2;

// ─── Automation data ─────────────────────────────────────────────────────────
const AUTOMATIONS = [
  {
    number: '01',
    title: 'AI Voice Lead Qualification',
    description:
      'Deploy a 24/7 AI voice agent that calls inbound leads within 60 seconds, asks qualification questions, scores them, and pushes qualified leads straight to your CRM — while you sleep.',
    timeSaved: '10',
    difficulty: 'Intermediate',
    tools: ['VAPI', 'OpenAI', 'HubSpot', 'n8n'],
    checklist: [
      'Create a VAPI account and set up a new assistant',
      'Write your lead qualification script (5–8 questions max)',
      'Configure call triggers: inbound webhook or Calendly no-show',
      'Map VAPI output fields to your CRM (name, email, score)',
      'Build n8n workflow: VAPI webhook → score logic → CRM create/update',
      'Test with a real phone number end-to-end',
      'Set up Slack alert for qualified leads',
    ],
  },
  {
    number: '02',
    title: 'Email-to-CRM Auto-Sync',
    description:
      'Every inbound email from a prospect automatically creates or updates a CRM contact, logs the thread, and tags it by intent — so your pipeline stays clean without anyone touching it.',
    timeSaved: '5',
    difficulty: 'Beginner',
    tools: ['n8n', 'Gmail API', 'HubSpot', 'OpenAI'],
    checklist: [
      'Connect Gmail to n8n via OAuth2',
      'Set trigger: new email in Inbox matching domain filter',
      'Use OpenAI to classify intent (lead / support / spam)',
      'Create n8n branch: if lead → upsert CRM contact',
      'Log email subject + snippet as CRM activity note',
      'Apply CRM tag based on intent classification',
      'Test with 3 sample emails across different intents',
    ],
  },
  {
    number: '03',
    title: 'Inbound Support Bot',
    description:
      'An AI chatbot handles tier-1 support questions 24/7, pulling answers from your knowledge base. Only tickets it cannot resolve get escalated to your team — cutting support volume by 60–70%.',
    timeSaved: '8',
    difficulty: 'Intermediate',
    tools: ['OpenAI', 'n8n', 'Zendesk', 'Notion'],
    checklist: [
      'Export your top 50 FAQ answers into a Notion database',
      'Build an OpenAI assistant with your knowledge base attached',
      'Create n8n workflow: new ticket → query assistant → post reply',
      'Add confidence threshold: if score < 0.7, escalate to human',
      'Connect escalation path to Slack #support channel',
      'Set auto-close rule for tickets resolved by bot',
      'Monitor first 50 bot responses and refine knowledge base',
    ],
  },
  {
    number: '04',
    title: 'Slack Ops Notifications',
    description:
      'Critical business events — new paying customer, churn risk alert, server error spike — automatically post to the right Slack channel with context, so your team reacts in minutes not hours.',
    timeSaved: '4',
    difficulty: 'Beginner',
    tools: ['n8n', 'Slack API', 'Stripe', 'PagerDuty'],
    checklist: [
      'Map your top 5 business events that need instant visibility',
      'Create dedicated Slack channels per event type (#new-customers, #alerts)',
      'Build n8n workflow per event source (Stripe webhook, error logs, etc.)',
      'Design Slack message template with emoji, amount, and action link',
      'Add deduplication logic to prevent alert storms',
      'Test each trigger with a sandbox event',
      'Document the alert runbook in Notion for your team',
    ],
  },
  {
    number: '05',
    title: 'Outbound Follow-up Sequences',
    description:
      'Leads who go cold after an initial call get an automated multi-touch follow-up sequence — personalised using their CRM data — that runs for 2 weeks before gracefully giving up.',
    timeSaved: '6',
    difficulty: 'Intermediate',
    tools: ['n8n', 'OpenAI', 'HubSpot', 'Gmail API'],
    checklist: [
      'Define follow-up trigger: deal stage = "No Response" for 3+ days',
      'Write 3 email templates (Day 3, Day 7, Day 14) in plain text',
      'Use OpenAI to personalise first line from CRM notes',
      'Build n8n sequence with delays between each send',
      'Add unsubscribe / reply detection to stop sequence early',
      'Set CRM deal stage to "Closed Lost" after sequence ends',
      'A/B test subject lines after 50 sends',
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function newPage(doc) {
  doc.addPage({ size: 'A4', margin: 0 });
  doc.rect(0, 0, W, H).fill(WHITE);
}

function pageHeader(doc, label) {
  // Top blue bar
  doc.rect(0, 0, W, 5).fill(BLUE);
  // Label
  doc.font(FONT_MONO).fontSize(9).fillColor(BLUE)
    .text(label, MARGIN, 20, { lineBreak: false });
}

function pageFooter(doc, pageNum) {
  // Divider
  doc.moveTo(MARGIN, H - 44).lineTo(W - MARGIN, H - 44)
    .strokeColor(BORDER).lineWidth(0.5).stroke();
  // Left: brand
  doc.font(FONT_SANS).fontSize(8).fillColor(TEXT_DIM)
    .text('Shahzaib Builds · shahzaibbuilds.me', MARGIN, H - 32, { lineBreak: false });
  // Right: page number
  doc.font(FONT_SANS).fontSize(8).fillColor(TEXT_DIM)
    .text(`${pageNum} / 10`, W - MARGIN - 30, H - 32, { lineBreak: false });
}

function difficultyStyle(d) {
  if (d === 'Beginner')     return { bg: GREEN_LIGHT,  text: GREEN };
  if (d === 'Intermediate') return { bg: BLUE_LIGHT,   text: BLUE  };
  return { bg: AMBER_LIGHT, text: AMBER };
}

function tagPill(doc, label, x, y, bg, fg) {
  const pad = 7;
  doc.font(FONT_MONO).fontSize(8);
  const tw = doc.widthOfString(label);
  const bw = tw + pad * 2;
  const bh = 16;
  doc.roundedRect(x, y, bw, bh, 3).fill(bg);
  doc.fillColor(fg).text(label, x + pad, y + 3, { lineBreak: false });
  return bw + 5;
}

function sectionLabel(doc, text, y) {
  doc.font(FONT_MONO).fontSize(9).fillColor(BLUE)
    .text(text, MARGIN, y, { lineBreak: false });
}

// ─── Pages ───────────────────────────────────────────────────────────────────

function renderCover(doc) {
  doc.rect(0, 0, W, H).fill(WHITE);

  // Top blue bar (thick)
  doc.rect(0, 0, W, 8).fill(BLUE);

  // Blue sidebar strip
  doc.rect(0, 0, 6, H).fill(BLUE);

  // FREE CHECKLIST badge
  const badgeY = 72;
  doc.roundedRect(MARGIN + 6, badgeY, 130, 22, 11).fill(BLUE_LIGHT);
  doc.font(FONT_MONO).fontSize(9).fillColor(BLUE)
    .text('FREE CHECKLIST', MARGIN + 24, badgeY + 6, { lineBreak: false });

  // Main title
  doc.font(FONT_BOLD).fontSize(40).fillColor(TEXT_DARK)
    .text('5 AI Automations', MARGIN + 6, 114, { width: INNER, lineBreak: false });

  doc.font(FONT_BOLD).fontSize(40).fillColor(BLUE)
    .text('Every Business Needs', MARGIN + 6, 158, { width: INNER, lineBreak: false });

  // Subtitle
  doc.font(FONT_SANS).fontSize(14).fillColor(TEXT_DIM)
    .text('Save 30+ hours per week with these proven workflows', MARGIN + 6, 216, {
      width: INNER,
      lineBreak: false,
    });

  // Divider
  doc.moveTo(MARGIN + 6, 252).lineTo(W - MARGIN, 252)
    .strokeColor(BORDER).lineWidth(1).stroke();

  // Stats row — 3 cards
  const statW = (INNER - 24) / 3;
  const stats = [
    { value: '12+', label: 'Voice Agents\nDeployed' },
    { value: '35+', label: 'Workflows\nAutomated' },
    { value: '500+', label: 'Hours Saved\nper Week' },
  ];
  stats.forEach((s, i) => {
    const sx = MARGIN + 6 + i * (statW + 12);
    const sy = 270;
    doc.roundedRect(sx, sy, statW, 72, 6).fill(LIGHT_GRAY);
    doc.font(FONT_BOLD).fontSize(28).fillColor(BLUE)
      .text(s.value, sx, sy + 12, { width: statW, align: 'center', lineBreak: false });
    doc.font(FONT_SANS).fontSize(9).fillColor(TEXT_DIM)
      .text(s.label, sx, sy + 46, { width: statW, align: 'center' });
  });

  // What's inside section
  const insideY = 368;
  doc.font(FONT_BOLD).fontSize(13).fillColor(TEXT_DARK)
    .text("What's inside:", MARGIN + 6, insideY, { lineBreak: false });

  const items = [
    '5 battle-tested automation blueprints',
    'Step-by-step implementation checklist for each',
    'Exact tools, platforms, and integrations to use',
    'ROI table: hours saved + annual value per automation',
  ];
  items.forEach((item, i) => {
    const iy = insideY + 26 + i * 22;
    // Blue dot
    doc.circle(MARGIN + 9, iy + 5, 3).fill(BLUE);
    doc.font(FONT_SANS).fontSize(11).fillColor(TEXT_BODY)
      .text(item, MARGIN + 20, iy, { lineBreak: false });
  });

  // Total time saved callout
  const calloutY = 490;
  doc.roundedRect(MARGIN + 6, calloutY, INNER - 6, 68, 6)
    .fill(BLUE_LIGHT);
  doc.font(FONT_MONO).fontSize(9).fillColor(BLUE)
    .text('TOTAL TIME SAVED ACROSS ALL 5 AUTOMATIONS', MARGIN + 20, calloutY + 14, { lineBreak: false });
  doc.font(FONT_BOLD).fontSize(26).fillColor(TEXT_DARK)
    .text('33+ hours / week', MARGIN + 20, calloutY + 30, { lineBreak: false });

  // Author block
  const authorY = 590;
  doc.moveTo(MARGIN + 6, authorY).lineTo(W - MARGIN, authorY)
    .strokeColor(BORDER).lineWidth(0.5).stroke();

  doc.font(FONT_BOLD).fontSize(12).fillColor(TEXT_DARK)
    .text('Shahzaib Hassan', MARGIN + 6, authorY + 16, { lineBreak: false });
  doc.font(FONT_SANS).fontSize(10).fillColor(TEXT_DIM)
    .text('AI Automation Engineer · Automaxion · shahzaibbuilds.me', MARGIN + 6, authorY + 33, { lineBreak: false });

  // Bottom green bar
  doc.rect(0, H - 5, W, 5).fill(GREEN);
}

function renderAbout(doc) {
  newPage(doc);
  pageHeader(doc, '// ABOUT THIS GUIDE');
  pageFooter(doc, 2);

  const y0 = 48;

  doc.font(FONT_BOLD).fontSize(24).fillColor(TEXT_DARK)
    .text('Who This Is For', MARGIN, y0, { width: INNER });

  doc.font(FONT_SANS).fontSize(12).fillColor(TEXT_BODY).lineGap(3)
    .text(
      'You\'re a startup founder or ops lead drowning in repetitive manual work — chasing leads, updating CRMs, answering the same support questions. You\'ve heard AI can help, but you\'re not sure where to start.\n\nThis guide gives you five battle-tested automations, the exact tools to implement them, and a step-by-step checklist for each. No fluff. No theory. Just deployable systems.',
      MARGIN, y0 + 38, { width: INNER }
    );

  // How to use this guide
  const howY = 230;
  doc.font(FONT_BOLD).fontSize(16).fillColor(TEXT_DARK)
    .text('How to Use This Guide', MARGIN, howY, { width: INNER });

  const steps = [
    { num: '01', text: 'Read through all 5 automations once for the big picture.' },
    { num: '02', text: 'Pick the automation that saves you the most time first.' },
    { num: '03', text: 'Follow its checklist top-to-bottom — each step is actionable.' },
    { num: '04', text: 'Book a free audit call if you need help with implementation.' },
  ];

  steps.forEach((s, i) => {
    const sy = howY + 36 + i * 54;
    // Row card
    doc.roundedRect(MARGIN, sy, INNER, 44, 5).fill(LIGHT_GRAY);
    // Number circle
    doc.circle(MARGIN + 22, sy + 22, 14).fill(BLUE);
    doc.font(FONT_BOLD).fontSize(10).fillColor(WHITE)
      .text(s.num, MARGIN + 22 - 8, sy + 16, { width: 16, align: 'center', lineBreak: false });
    // Step text
    doc.font(FONT_SANS).fontSize(11).fillColor(TEXT_BODY)
      .text(s.text, MARGIN + 44, sy + 14, { width: INNER - 54, lineBreak: false });
  });

  // Callout box at bottom
  const callY = 500;
  doc.roundedRect(MARGIN, callY, INNER, 72, 6).fill(BLUE_LIGHT);
  doc.moveTo(MARGIN, callY).lineTo(MARGIN, callY + 72)
    .strokeColor(BLUE).lineWidth(3).stroke();

  doc.font(FONT_MONO).fontSize(9).fillColor(BLUE)
    .text('COMBINED TIME SAVINGS', MARGIN + 16, callY + 16, { lineBreak: false });
  doc.font(FONT_BOLD).fontSize(28).fillColor(TEXT_DARK)
    .text('33+ hours / week', MARGIN + 16, callY + 32, { lineBreak: false });
  doc.font(FONT_SANS).fontSize(10).fillColor(TEXT_DIM)
    .text('Based on conservative estimates. Most clients report higher savings.', MARGIN + 16, callY + 60, { lineBreak: false });
}

function renderAutomationPage(doc, automation, pageNum) {
  newPage(doc);
  pageHeader(doc, `// AUTOMATION ${automation.number} OF 05`);
  pageFooter(doc, pageNum);

  const diff = difficultyStyle(automation.difficulty);

  // Title area
  const titleY = 44;
  doc.font(FONT_BOLD).fontSize(22).fillColor(TEXT_DARK)
    .text(automation.title, MARGIN, titleY, { width: INNER - 60 });

  // Badges row
  const badgeY = titleY + 36;
  let bx = MARGIN;
  bx += tagPill(doc, `${automation.timeSaved} hrs / week`, bx, badgeY, BLUE_LIGHT, BLUE);
  bx += tagPill(doc, automation.difficulty, bx, badgeY, diff.bg, diff.text);

  // Tools
  automation.tools.forEach((t) => {
    bx += tagPill(doc, t, bx, badgeY, LIGHT_GRAY, TEXT_DIM);
  });

  // Divider
  const divY = badgeY + 26;
  doc.moveTo(MARGIN, divY).lineTo(W - MARGIN, divY)
    .strokeColor(BORDER).lineWidth(0.5).stroke();

  // Description
  doc.font(FONT_SANS).fontSize(11).fillColor(TEXT_BODY).lineGap(2)
    .text(automation.description, MARGIN, divY + 12, { width: INNER });

  // Checklist header
  const clY = divY + 72;
  doc.font(FONT_BOLD).fontSize(13).fillColor(TEXT_DARK)
    .text('Implementation Checklist', MARGIN, clY, { lineBreak: false });

  // Checklist items
  automation.checklist.forEach((item, i) => {
    const iy = clY + 26 + i * 72;

    // Item card
    doc.roundedRect(MARGIN, iy, INNER, 62, 5)
      .strokeColor(BORDER).lineWidth(0.5).stroke();

    // Checkbox square
    doc.roundedRect(MARGIN + 14, iy + 22, 16, 16, 3)
      .strokeColor(BORDER).lineWidth(1).stroke();

    // Step number
    doc.font(FONT_MONO).fontSize(8).fillColor(BLUE)
      .text(String(i + 1).padStart(2, '0'), MARGIN + 38, iy + 10, { lineBreak: false });

    // Item text
    doc.font(FONT_BOLD).fontSize(10).fillColor(TEXT_DARK)
      .text(item, MARGIN + 38, iy + 22, { width: INNER - 56 });
  });
}

function renderROITable(doc) {
  newPage(doc);
  pageHeader(doc, '// ROI SUMMARY');
  pageFooter(doc, 8);

  doc.font(FONT_BOLD).fontSize(24).fillColor(TEXT_DARK)
    .text('Your Automation ROI', MARGIN, 44, { width: INNER });

  doc.font(FONT_SANS).fontSize(11).fillColor(TEXT_DIM)
    .text('Based on a conservative $50/hr blended rate. Your numbers may vary.', MARGIN, 78, {
      width: INNER,
    });

  // Table setup
  const tableY = 110;
  const cols   = { name: 0, wk: 210, mo: 300, yr: 390 };
  const colW   = { name: 210, wk: 90, mo: 90, yr: 109 };
  const rowH   = 38;

  // Header row
  doc.rect(MARGIN, tableY, INNER, rowH).fill(TEXT_DARK);
  [
    ['Automation', cols.name],
    ['Hrs / Week', cols.wk],
    ['Hrs / Month', cols.mo],
    ['Value / Year', cols.yr],
  ].forEach(([h, cx]) => {
    doc.font(FONT_BOLD).fontSize(9).fillColor(WHITE)
      .text(h, MARGIN + cx + 10, tableY + 13, { width: colW[cx] ?? 109, lineBreak: false });
  });

  // Data rows
  const rows = AUTOMATIONS.map((a) => {
    const wk = parseInt(a.timeSaved);
    const mo = wk * 4;
    const yr = mo * 12 * 50;
    return [a.title, `${wk} hrs`, `${mo} hrs`, `$${yr.toLocaleString()}`];
  });

  rows.forEach((row, ri) => {
    const ry = tableY + rowH + ri * rowH;
    doc.rect(MARGIN, ry, INNER, rowH)
      .fill(ri % 2 === 0 ? WHITE : LIGHT_GRAY);
    doc.moveTo(MARGIN, ry + rowH).lineTo(W - MARGIN, ry + rowH)
      .strokeColor(BORDER).lineWidth(0.3).stroke();

    const vals = [
      [row[0], cols.name, FONT_SANS,  TEXT_DARK],
      [row[1], cols.wk,   FONT_MONO,  TEXT_BODY],
      [row[2], cols.mo,   FONT_MONO,  TEXT_BODY],
      [row[3], cols.yr,   FONT_BOLD,  BLUE     ],
    ];
    vals.forEach(([val, cx, font, color]) => {
      doc.font(font).fontSize(10).fillColor(color)
        .text(val, MARGIN + cx + 10, ry + 12, { width: colW[cx] ?? 109, lineBreak: false });
    });
  });

  // Total row
  const totalY = tableY + rowH + rows.length * rowH;
  doc.rect(MARGIN, totalY, INNER, rowH).fill(BLUE);
  [
    ['TOTAL', cols.name],
    ['33 hrs', cols.wk],
    ['132 hrs', cols.mo],
    ['$79,200', cols.yr],
  ].forEach(([val, cx]) => {
    doc.font(FONT_BOLD).fontSize(10).fillColor(WHITE)
      .text(val, MARGIN + cx + 10, totalY + 13, { width: colW[cx] ?? 109, lineBreak: false });
  });

  // Table outline
  doc.rect(MARGIN, tableY, INNER, rowH * (rows.length + 2))
    .strokeColor(BORDER).lineWidth(0.5).stroke();

  // Footnote
  const fnY = totalY + rowH + 20;
  doc.font(FONT_MONO).fontSize(9).fillColor(TEXT_DIM)
    .text('Use the interactive ROI calculator at shahzaibbuilds.me to enter your own numbers.', MARGIN, fnY, { width: INNER });
}

function renderCTA(doc) {
  newPage(doc);
  pageHeader(doc, '// NEXT STEPS');
  pageFooter(doc, 9);

  doc.font(FONT_BOLD).fontSize(26).fillColor(TEXT_DARK)
    .text('Ready to Deploy These Automations?', MARGIN, 50, { width: INNER });

  doc.font(FONT_SANS).fontSize(12).fillColor(TEXT_BODY).lineGap(3)
    .text(
      "These checklists show you what to build. But knowing what to build and actually deploying it are two different things.\n\nIf you'd rather skip the setup headaches and have a custom automation running in days — that's what I do.",
      MARGIN, 100, { width: INNER }
    );

  // 3 step cards
  const processSteps = [
    { num: '01', label: 'Identify your biggest time bottleneck' },
    { num: '02', label: 'Book a free 15-min audit call' },
    { num: '03', label: 'Get a custom automation roadmap, built for your stack' },
  ];

  processSteps.forEach((s, i) => {
    const sy = 220 + i * 72;
    doc.roundedRect(MARGIN, sy, INNER, 58, 6).fill(LIGHT_GRAY);
    // Number badge
    doc.roundedRect(MARGIN + 14, sy + 14, 28, 28, 4).fill(BLUE);
    doc.font(FONT_BOLD).fontSize(11).fillColor(WHITE)
      .text(s.num, MARGIN + 14, sy + 20, { width: 28, align: 'center', lineBreak: false });
    // Text
    doc.font(FONT_BOLD).fontSize(13).fillColor(TEXT_DARK)
      .text(s.label, MARGIN + 54, sy + 21, { width: INNER - 68, lineBreak: false });
  });

  // CTA button
  const ctaY = 448;
  doc.roundedRect(MARGIN, ctaY, INNER, 52, 7).fill(BLUE);
  doc.font(FONT_BOLD).fontSize(14).fillColor(WHITE)
    .text('Book Your Free 15-Min Audit  →', MARGIN, ctaY + 17, {
      width: INNER,
      align: 'center',
      lineBreak: false,
    });

  doc.font(FONT_SANS).fontSize(10).fillColor(TEXT_DIM)
    .text('No commitment. 15 minutes. Walk away with a clear action plan.', MARGIN, ctaY + 66, {
      width: INNER,
      align: 'center',
      lineBreak: false,
    });

  // Link
  doc.font(FONT_MONO).fontSize(11).fillColor(BLUE)
    .text('shahzaibbuilds.me', MARGIN, ctaY + 84, {
      width: INNER,
      align: 'center',
      lineBreak: false,
    });
}

function renderBackCover(doc) {
  newPage(doc);

  // Solid blue bottom half
  doc.rect(0, H / 2, W, H / 2).fill(BLUE);
  // Thin top bar
  doc.rect(0, 0, W, 5).fill(BLUE);

  // Brand name — top half
  doc.font(FONT_BOLD).fontSize(30).fillColor(TEXT_DARK)
    .text('Shahzaib Builds', MARGIN, H / 2 - 130, { width: INNER, align: 'center', lineBreak: false });

  doc.font(FONT_SANS).fontSize(13).fillColor(TEXT_DIM)
    .text('Deploying AI employees for lean teams.', MARGIN, H / 2 - 92, {
      width: INNER,
      align: 'center',
      lineBreak: false,
    });

  // Divider
  doc.moveTo(W / 2 - 40, H / 2 - 60).lineTo(W / 2 + 40, H / 2 - 60)
    .strokeColor(BORDER).lineWidth(1).stroke();

  // Stats row
  const stats = [
    { value: '12+', label: 'Voice Agents' },
    { value: '35+', label: 'Workflows' },
    { value: '500+', label: 'Hrs / Week Saved' },
  ];
  const sw = (INNER) / 3;
  stats.forEach((s, i) => {
    const sx = MARGIN + i * sw;
    doc.font(FONT_BOLD).fontSize(22).fillColor(BLUE)
      .text(s.value, sx, H / 2 - 44, { width: sw, align: 'center', lineBreak: false });
    doc.font(FONT_SANS).fontSize(9).fillColor(TEXT_DIM)
      .text(s.label, sx, H / 2 - 16, { width: sw, align: 'center', lineBreak: false });
  });

  // Bottom half — on blue background
  doc.font(FONT_BOLD).fontSize(13).fillColor(WHITE)
    .text('shahzaibbuilds.me', MARGIN, H / 2 + 80, { width: INNER, align: 'center', lineBreak: false });

  doc.font(FONT_SANS).fontSize(11).fillColor('#BFDBFE')
    .text('@shahzaib_builds', MARGIN, H / 2 + 104, { width: INNER, align: 'center', lineBreak: false });

  doc.font(FONT_SANS).fontSize(10).fillColor('#BFDBFE')
    .text('AI Automation Engineer · Automaxion · Lahore, Pakistan', MARGIN, H / 2 + 130, {
      width: INNER,
      align: 'center',
      lineBreak: false,
    });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const outDir = path.dirname(OUT_PATH);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const doc = new PDFDocument({ size: 'A4', margin: 0, autoFirstPage: false });
  const stream = fs.createWriteStream(OUT_PATH);
  doc.pipe(stream);

  // Page 1 — Cover
  doc.addPage({ size: 'A4', margin: 0 });
  renderCover(doc);

  // Page 2 — About
  renderAbout(doc);

  // Pages 3–7 — Automations
  AUTOMATIONS.forEach((a, i) => renderAutomationPage(doc, a, i + 3));

  // Page 8 — ROI Table
  renderROITable(doc);

  // Page 9 — CTA
  renderCTA(doc);

  // Page 10 — Back cover
  renderBackCover(doc);

  doc.end();

  stream.on('finish', () => {
    const size = (fs.statSync(OUT_PATH).size / 1024).toFixed(1);
    console.log(`✅  PDF generated: ${OUT_PATH} (${size} KB)`);
  });

  stream.on('error', (err) => {
    console.error('❌  Failed to write PDF:', err);
    process.exit(1);
  });
}

main();

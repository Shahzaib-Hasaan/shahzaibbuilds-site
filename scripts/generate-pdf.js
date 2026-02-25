#!/usr/bin/env node
'use strict';

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// ─── Brand tokens ────────────────────────────────────────────────────────────
const DARK_BG      = '#050505';
const SURFACE      = '#0f0f0f';
const ELECTRIC     = '#3B82F6';
const GREEN        = '#10B981';
const WHITE        = '#FFFFFF';
const GRAY         = '#9CA3AF';
const GRAY_DIM     = '#4B5563';

const FONT_MONO    = 'Courier';   // pdfkit built-in closest to JetBrains Mono
const FONT_SANS    = 'Helvetica'; // pdfkit built-in

const OUT_PATH = path.join(__dirname, '..', 'public', 'downloads', '5-automations-checklist.pdf');

// ─── Page dimensions (A4) ────────────────────────────────────────────────────
const W = 595.28;
const H = 841.89;
const MARGIN = 48;

// ─── Automation data ─────────────────────────────────────────────────────────
const AUTOMATIONS = [
  {
    number: '01',
    title: 'AI Voice Lead Qualification',
    description:
      'Deploy a 24/7 AI voice agent that calls inbound leads within 60 seconds, asks qualification questions, scores them, and pushes qualified leads straight to your CRM — while you sleep.',
    timeSaved: '10 hrs / week',
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
    timeSaved: '5 hrs / week',
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
    timeSaved: '8 hrs / week',
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
    timeSaved: '4 hrs / week',
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
    timeSaved: '6 hrs / week',
    difficulty: 'Intermediate',
    tools: ['n8n', 'OpenAI', 'HubSpot', 'Gmail API'],
    checklist: [
      'Define your follow-up trigger: deal stage = "No Response" for 3+ days',
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

function fullPageRect(doc) {
  doc.rect(0, 0, W, H).fill(DARK_BG);
}

function addPage(doc) {
  doc.addPage({ size: 'A4', margin: 0 });
  fullPageRect(doc);
}

function pill(doc, text, x, y, color) {
  const pad = 8;
  const textW = doc.widthOfString(text, { font: FONT_MONO, fontSize: 9 });
  const boxW = textW + pad * 2;
  const boxH = 18;
  doc
    .roundedRect(x, y, boxW, boxH, 4)
    .fillAndStroke(color + '1A', color);
  doc
    .font(FONT_MONO)
    .fontSize(9)
    .fillColor(color)
    .text(text, x + pad, y + 4, { lineBreak: false });
  return boxW + 6; // advance width
}

function difficultyColor(d) {
  if (d === 'Beginner')     return GREEN;
  if (d === 'Intermediate') return ELECTRIC;
  return '#F59E0B'; // amber for Advanced
}

// ─── Pages ───────────────────────────────────────────────────────────────────

function renderCover(doc) {
  fullPageRect(doc);

  // Top accent bar
  doc.rect(0, 0, W, 4).fill(ELECTRIC);

  // Decorative grid lines
  doc.strokeColor(GRAY_DIM).lineWidth(0.3).opacity(0.15);
  for (let x = 0; x < W; x += 40) {
    doc.moveTo(x, 0).lineTo(x, H).stroke();
  }
  for (let y = 0; y < H; y += 40) {
    doc.moveTo(0, y).lineTo(W, y).stroke();
  }
  doc.opacity(1);

  // Glow blob
  doc
    .circle(W / 2, H / 2 - 80, 200)
    .fill(ELECTRIC + '18');

  // Badge
  const badgeY = 140;
  doc
    .roundedRect(MARGIN, badgeY, 180, 24, 12)
    .fillAndStroke(GREEN + '1A', GREEN);
  doc
    .font(FONT_MONO).fontSize(10).fillColor(GREEN)
    .text('FREE CHECKLIST', MARGIN + 12, badgeY + 6, { lineBreak: false });

  // Title
  doc
    .font(FONT_SANS + '-Bold').fontSize(38).fillColor(WHITE)
    .text('5 AI Automations', MARGIN, 186, { width: W - MARGIN * 2, lineBreak: false });
  doc
    .font(FONT_SANS + '-Bold').fontSize(38).fillColor(ELECTRIC)
    .text('Every Business Needs', MARGIN, 230, { width: W - MARGIN * 2, lineBreak: false });

  // Subtitle
  doc
    .font(FONT_SANS).fontSize(16).fillColor(GRAY)
    .text('Save 30+ Hours Per Week with These Proven Workflows', MARGIN, 292, {
      width: W - MARGIN * 2,
    });

  // Divider
  doc.moveTo(MARGIN, 340).lineTo(W - MARGIN, 340).strokeColor(GRAY_DIM).lineWidth(0.5).stroke();

  // Stats row
  const stats = [
    { value: '12+', label: 'Voice Agents Deployed' },
    { value: '35+', label: 'Workflows Automated' },
    { value: '500+', label: 'Hours Saved / Week' },
  ];
  const colW = (W - MARGIN * 2) / 3;
  stats.forEach((s, i) => {
    const x = MARGIN + i * colW;
    doc
      .font(FONT_MONO).fontSize(28).fillColor(ELECTRIC)
      .text(s.value, x, 362, { width: colW, align: 'center', lineBreak: false });
    doc
      .font(FONT_SANS).fontSize(10).fillColor(GRAY)
      .text(s.label, x, 396, { width: colW, align: 'center', lineBreak: false });
  });

  // Byline
  doc
    .font(FONT_MONO).fontSize(11).fillColor(WHITE)
    .text('Shahzaib Hassan', MARGIN, H - 120, { lineBreak: false });
  doc
    .font(FONT_MONO).fontSize(10).fillColor(GREEN)
    .text('shahzaibbuilds.me', MARGIN, H - 104, { lineBreak: false });
  doc
    .font(FONT_MONO).fontSize(9).fillColor(GRAY)
    .text('AI Automation Engineer · Automaxion', MARGIN, H - 88, { lineBreak: false });

  // Bottom accent
  doc.rect(0, H - 4, W, 4).fill(GREEN);
}

function renderAbout(doc) {
  addPage(doc);

  doc.rect(0, 0, W, 4).fill(ELECTRIC);

  // Section label
  doc
    .font(FONT_MONO).fontSize(11).fillColor(GREEN)
    .text('// ABOUT THIS GUIDE', MARGIN, 60, { lineBreak: false });

  doc
    .font(FONT_SANS + '-Bold').fontSize(26).fillColor(WHITE)
    .text('Who This Is For', MARGIN, 84, { width: W - MARGIN * 2 });

  doc
    .font(FONT_SANS).fontSize(13).fillColor(GRAY).lineGap(4)
    .text(
      'You\'re a startup founder or ops lead drowning in repetitive manual work — chasing leads, updating CRMs, responding to the same support questions. You\'ve heard AI can help, but you\'re not sure where to start.\n\nThis guide gives you five battle-tested automations, the exact tools to implement them, and a step-by-step checklist for each. No fluff. No theory. Just deployable systems.',
      MARGIN, 124, { width: W - MARGIN * 2 }
    );

  // How to use
  doc
    .font(FONT_MONO).fontSize(11).fillColor(GREEN)
    .text('// HOW TO USE THIS GUIDE', MARGIN, 270, { lineBreak: false });

  const steps = [
    '01  Read through all 5 automations once.',
    '02  Pick the one that saves you the most time first.',
    '03  Follow the checklist top-to-bottom.',
    '04  Book a free audit if you need implementation help.',
  ];
  steps.forEach((s, i) => {
    doc
      .font(FONT_MONO).fontSize(11).fillColor(i % 2 === 0 ? WHITE : GRAY)
      .text(s, MARGIN, 298 + i * 24, { lineBreak: false });
  });

  // Total time saved callout box
  const boxY = 410;
  doc.roundedRect(MARGIN, boxY, W - MARGIN * 2, 80, 8)
    .fillAndStroke(ELECTRIC + '12', ELECTRIC + '40');
  doc
    .font(FONT_MONO).fontSize(11).fillColor(ELECTRIC)
    .text('// TOTAL TIME SAVED ACROSS ALL 5 AUTOMATIONS', MARGIN + 20, boxY + 18, { lineBreak: false });
  doc
    .font(FONT_SANS + '-Bold').fontSize(32).fillColor(WHITE)
    .text('33+ hours / week', MARGIN + 20, boxY + 36, { lineBreak: false });

  doc.rect(0, H - 4, W, 4).fill(GREEN);
}

function renderAutomationPage(doc, automation, index) {
  addPage(doc);

  doc.rect(0, 0, W, 4).fill(ELECTRIC);

  // Number watermark
  doc
    .font(FONT_MONO).fontSize(120).fillColor(ELECTRIC).opacity(0.06)
    .text(automation.number, W - 160, 20, { lineBreak: false });
  doc.opacity(1);

  // Section label
  doc
    .font(FONT_MONO).fontSize(10).fillColor(GREEN)
    .text(`// AUTOMATION ${automation.number} OF 05`, MARGIN, 60, { lineBreak: false });

  // Title
  doc
    .font(FONT_SANS + '-Bold').fontSize(24).fillColor(WHITE)
    .text(automation.title, MARGIN, 82, { width: W - MARGIN * 2 - 60 });

  // Description
  doc
    .font(FONT_SANS).fontSize(12).fillColor(GRAY).lineGap(3)
    .text(automation.description, MARGIN, 124, { width: W - MARGIN * 2 });

  // Badges row
  let badgeX = MARGIN;
  const badgeY = 196;

  // Time saved
  badgeX += pill(doc, `⏱ ${automation.timeSaved}`, badgeX, badgeY, ELECTRIC);

  // Difficulty
  badgeX += pill(doc, automation.difficulty, badgeX, badgeY, difficultyColor(automation.difficulty));

  // Tools row
  doc
    .font(FONT_MONO).fontSize(9).fillColor(GRAY_DIM)
    .text('TOOLS:', MARGIN, 228, { lineBreak: false });

  let toolX = MARGIN + 46;
  automation.tools.forEach((t) => {
    toolX += pill(doc, t, toolX, 224, GRAY);
  });

  // Divider
  doc.moveTo(MARGIN, 254).lineTo(W - MARGIN, 254)
    .strokeColor(GRAY_DIM).lineWidth(0.4).stroke();

  // Checklist header
  doc
    .font(FONT_MONO).fontSize(10).fillColor(GREEN)
    .text('// IMPLEMENTATION CHECKLIST', MARGIN, 266, { lineBreak: false });

  // Checklist items
  automation.checklist.forEach((item, i) => {
    const itemY = 290 + i * 56;

    // Checkbox
    doc
      .roundedRect(MARGIN, itemY, 18, 18, 3)
      .strokeColor(GRAY_DIM).lineWidth(0.8).stroke();

    // Step number
    doc
      .font(FONT_MONO).fontSize(9).fillColor(ELECTRIC)
      .text(`${String(i + 1).padStart(2, '0')}`, MARGIN + 24, itemY + 1, { lineBreak: false });

    // Item text
    doc
      .font(FONT_SANS).fontSize(11).fillColor(WHITE)
      .text(item, MARGIN + 42, itemY + 1, { width: W - MARGIN * 2 - 42 });
  });

  doc.rect(0, H - 4, W, 4).fill(GREEN);
}

function renderROITable(doc) {
  addPage(doc);

  doc.rect(0, 0, W, 4).fill(ELECTRIC);

  doc
    .font(FONT_MONO).fontSize(11).fillColor(GREEN)
    .text('// ROI SUMMARY', MARGIN, 60, { lineBreak: false });

  doc
    .font(FONT_SANS + '-Bold').fontSize(26).fillColor(WHITE)
    .text('Your Automation ROI', MARGIN, 84, { width: W - MARGIN * 2 });

  doc
    .font(FONT_SANS).fontSize(12).fillColor(GRAY)
    .text('Based on a conservative $50/hr blended rate. Your numbers may vary.', MARGIN, 118, {
      width: W - MARGIN * 2,
    });

  // Table
  const tableTop = 150;
  const cols = [220, 100, 110, 100]; // widths
  const colX = [MARGIN, MARGIN + 220, MARGIN + 320, MARGIN + 430];
  const headers = ['Automation', 'Hrs / Week', 'Hrs / Month', 'Value / Year'];
  const rows = [
    ...AUTOMATIONS.map((a) => {
      const wk = parseInt(a.timeSaved);
      const mo = wk * 4;
      const yr = mo * 12 * 50;
      return [a.title, `${wk} hrs`, `${mo} hrs`, `$${yr.toLocaleString()}`];
    }),
    ['TOTAL', '33 hrs', '132 hrs', '$79,200'],
  ];

  const rowH = 36;

  // Header row
  doc.rect(MARGIN, tableTop, W - MARGIN * 2, rowH).fill(ELECTRIC + '22');
  headers.forEach((h, i) => {
    doc
      .font(FONT_MONO).fontSize(9).fillColor(ELECTRIC)
      .text(h, colX[i] + 8, tableTop + 12, { width: cols[i] - 8, lineBreak: false });
  });

  // Data rows
  rows.forEach((row, ri) => {
    const y = tableTop + rowH + ri * rowH;
    const isTotal = ri === rows.length - 1;

    doc
      .rect(MARGIN, y, W - MARGIN * 2, rowH)
      .fill(isTotal ? GREEN + '18' : ri % 2 === 0 ? SURFACE : DARK_BG);

    row.forEach((cell, ci) => {
      doc
        .font(isTotal ? FONT_MONO : FONT_SANS)
        .fontSize(isTotal ? 10 : 11)
        .fillColor(isTotal ? GREEN : ci === 0 ? WHITE : GRAY)
        .text(cell, colX[ci] + 8, y + 11, { width: cols[ci] - 8, lineBreak: false });
    });
  });

  // Footnote
  const footnoteY = tableTop + rowH * (rows.length + 1) + 20;
  doc
    .font(FONT_MONO).fontSize(9).fillColor(GRAY_DIM)
    .text('→ Use the interactive ROI calculator at shahzaibbuilds.me to calculate with your own numbers.', MARGIN, footnoteY, { width: W - MARGIN * 2 });

  doc.rect(0, H - 4, W, 4).fill(GREEN);
}

function renderCTA(doc) {
  addPage(doc);

  doc.rect(0, 0, W, 4).fill(ELECTRIC);

  // Glow
  doc.circle(W / 2, H / 2 - 60, 180).fill(GREEN + '10');

  doc
    .font(FONT_MONO).fontSize(11).fillColor(GREEN)
    .text('// NEXT STEPS', MARGIN, 100, { lineBreak: false });

  doc
    .font(FONT_SANS + '-Bold').fontSize(28).fillColor(WHITE)
    .text('Ready to Deploy These Automations?', MARGIN, 124, { width: W - MARGIN * 2 });

  doc
    .font(FONT_SANS).fontSize(13).fillColor(GRAY).lineGap(4)
    .text(
      "These checklists show you what to build. But knowing what to build and actually deploying it are two different things. If you'd rather skip the setup headaches and have a custom automation running in days — that's what I do.",
      MARGIN, 174, { width: W - MARGIN * 2 }
    );

  // 3-step process
  const processSteps = [
    { num: '01', label: 'Identify your biggest time bottleneck', color: ELECTRIC },
    { num: '02', label: 'Book a free 15-min audit call', color: GREEN },
    { num: '03', label: 'Get a custom automation roadmap', color: ELECTRIC },
  ];

  processSteps.forEach((s, i) => {
    const y = 290 + i * 64;
    doc
      .circle(MARGIN + 16, y + 16, 16)
      .fill(s.color + '20');
    doc
      .font(FONT_MONO).fontSize(13).fillColor(s.color)
      .text(s.num, MARGIN + 8, y + 8, { lineBreak: false });
    doc
      .font(FONT_SANS).fontSize(13).fillColor(WHITE)
      .text(s.label, MARGIN + 42, y + 8, { lineBreak: false });
  });

  // CTA button (rendered as a box)
  const ctaY = 500;
  doc
    .roundedRect(MARGIN, ctaY, W - MARGIN * 2, 56, 8)
    .fill(ELECTRIC);
  doc
    .font(FONT_SANS + '-Bold').fontSize(15).fillColor(WHITE)
    .text('Book Your Free 15-Min Audit →', MARGIN, ctaY + 18, {
      width: W - MARGIN * 2,
      align: 'center',
      lineBreak: false,
    });

  doc
    .font(FONT_MONO).fontSize(11).fillColor(GREEN)
    .text('shahzaibbuilds.me', MARGIN, ctaY + 76, { width: W - MARGIN * 2, align: 'center', lineBreak: false });

  doc.rect(0, H - 4, W, 4).fill(GREEN);
}

function renderBackCover(doc) {
  addPage(doc);

  // Full accent background
  doc.rect(0, 0, W, H).fill(SURFACE);
  doc.rect(0, 0, W, 4).fill(ELECTRIC);
  doc.rect(0, H - 4, W, 4).fill(GREEN);

  // Glow
  doc.circle(W / 2, H / 2, 240).fill(ELECTRIC + '0D');

  // Brand name
  doc
    .font(FONT_MONO).fontSize(32).fillColor(WHITE)
    .text('Shahzaib Builds', MARGIN, H / 2 - 80, { width: W - MARGIN * 2, align: 'center', lineBreak: false });

  // Tagline
  doc
    .font(FONT_SANS).fontSize(14).fillColor(GRAY)
    .text('Deploying AI employees for lean teams.', MARGIN, H / 2 - 40, {
      width: W - MARGIN * 2,
      align: 'center',
      lineBreak: false,
    });

  // Divider
  doc
    .moveTo(W / 2 - 60, H / 2)
    .lineTo(W / 2 + 60, H / 2)
    .strokeColor(GRAY_DIM).lineWidth(0.5).stroke();

  // Contact
  doc
    .font(FONT_MONO).fontSize(11).fillColor(GREEN)
    .text('shahzaibbuilds.me', MARGIN, H / 2 + 20, { width: W - MARGIN * 2, align: 'center', lineBreak: false });

  doc
    .font(FONT_MONO).fontSize(10).fillColor(GRAY)
    .text('@shahzaib_builds', MARGIN, H / 2 + 42, { width: W - MARGIN * 2, align: 'center', lineBreak: false });
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
  AUTOMATIONS.forEach((a, i) => renderAutomationPage(doc, a, i));

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

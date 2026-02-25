# Testing Checklist - Phase 1 Implementation

## Pre-Testing Setup

### 1. n8n Webhook Configuration
Before testing, create the following webhook in n8n:

**Webhook URL**: `https://n8n.shahzaibai.site/webhook/email-capture`

**Expected Payload**:
```json
{
  "email": "user@example.com",
  "challenge": "Optional text",
  "source": "calendly_gate|exit_intent|chatbot|lead_magnet",
  "timestamp": 1708426200535
}
```

**Recommended n8n Flow**:
1. Webhook Trigger
2. Set Node (parse data)
3. Google Sheets / Airtable (store email)
4. Gmail / SendGrid (send welcome email if source = exit_intent)
5. Add to email sequence

---

## Testing Scenarios

### ✅ Test 1: Hero Section Email Gate
1. Open homepage in incognito mode
2. Click "Book a 15-Min Audit" button in hero
3. **Expected**: Email gate modal appears
4. Enter email: `test@example.com`
5. Enter challenge (optional): "Need lead qualification automation"
6. Click "Continue to Calendly"
7. **Expected**:
   - Redirects to Calendly with email pre-filled
   - localStorage has `emailCaptured` key
   - n8n receives webhook call
   - GA4 fires `email_captured` event with method: `calendly_gate`

### ✅ Test 2: Second CTA Click (Email Already Captured)
1. After Test 1, click any other CTA button
2. **Expected**: Goes directly to Calendly (no modal)
3. Verify localStorage still has `emailCaptured`

### ✅ Test 3: Services Section CTAs
1. Clear localStorage and refresh
2. Scroll to Services section
3. Click "Discuss This" on any service card
4. **Expected**: Email gate modal appears
5. Submit email
6. **Expected**: Redirects to Calendly

### ✅ Test 4: Pricing Section
1. Clear localStorage and refresh
2. Scroll to Pricing section
3. **Expected**: GA4 fires `pricing_viewed` event when section is 50% visible
4. Click any pricing tier CTA
5. **Expected**: Email gate modal appears
6. Submit email
7. **Expected**: Redirects to Calendly

### ✅ Test 5: ROI Calculator
1. Clear localStorage and refresh
2. Scroll to ROI Calculator
3. Adjust sliders (team size, hourly rate)
4. Click "Book Audit to Save $X"
5. **Expected**: Email gate modal appears
6. Submit email
7. **Expected**: Redirects to Calendly

### ✅ Test 6: Sticky CTA
1. Clear localStorage and refresh
2. Scroll down past 50% of viewport
3. **Expected**: Sticky CTA appears at bottom
4. Click "Book Free Audit"
5. **Expected**: Email gate modal appears
6. Submit email
7. **Expected**: Redirects to Calendly

### ✅ Test 7: Navbar CTA (Desktop)
1. Clear localStorage and refresh
2. Click "Book Audit" in navbar
3. **Expected**: Email gate modal appears
4. Submit email
5. **Expected**: Redirects to Calendly

### ✅ Test 8: Navbar CTA (Mobile)
1. Clear localStorage and refresh
2. Resize browser to mobile width (< 768px)
3. Click hamburger menu
4. Click "Book Audit"
5. **Expected**: Email gate modal appears
6. Submit email
7. **Expected**: Redirects to Calendly

### ✅ Test 9: Exit Intent Modal (Desktop Only)
1. Clear localStorage and sessionStorage
2. Open homepage in incognito (desktop browser)
3. Move mouse cursor quickly toward top of browser (as if closing tab)
4. **Expected**: Exit intent modal appears with lead magnet offer
5. Enter email: `test2@example.com`
6. Click "Download Free Checklist"
7. **Expected**:
   - Success message appears
   - PDF download starts (will fail until PDF is created)
   - n8n receives webhook with source: `exit_intent`
   - GA4 fires `exit_intent_shown` and `exit_intent_converted` events
   - sessionStorage has `exitIntentShown` key

### ✅ Test 10: Exit Intent - Second Trigger
1. After Test 9, trigger exit intent again
2. **Expected**: Modal does NOT appear (already shown in session)

### ✅ Test 11: Exit Intent - Mobile
1. Open homepage on mobile device or mobile emulator
2. Try to trigger exit intent
3. **Expected**: Modal does NOT appear (disabled on mobile)

### ✅ Test 12: Exit Intent - Email Already Captured
1. Clear sessionStorage but keep localStorage with `emailCaptured`
2. Trigger exit intent
3. **Expected**: Modal does NOT appear (email already captured)

### ✅ Test 13: Chatbot Quick Replies
1. Open chatbot
2. **Expected**: Welcome message shows new text with bullet points
3. **Expected**: Quick replies show:
   - "What's your pricing?"
   - "Show me case studies"
   - "I need a voice agent"
   - "Book a consultation"
4. Click any quick reply
5. **Expected**: Message sends to n8n webhook

### ✅ Test 14: localStorage Expiry
1. Capture email
2. Manually edit localStorage `emailCaptured` timestamp to 25 hours ago
3. Click any CTA
4. **Expected**: Email gate modal appears (expired)

### ✅ Test 15: Navigation Links
1. Click "Pricing" in navbar
2. **Expected**: Scrolls to #pricing section
3. Verify all navbar links work:
   - Work → #work
   - Services → #services
   - Pricing → #pricing
   - Contact → #contact

---

## Analytics Verification

### Google Analytics 4 Events to Verify

Open Google Analytics 4 → Reports → Realtime

1. **email_captured**
   - Parameter: `method` = `calendly_gate`
   - Fires when: Email submitted in EmailGateModal

2. **exit_intent_shown**
   - Fires when: Exit intent modal appears

3. **exit_intent_converted**
   - Fires when: User submits email in exit intent modal

4. **pricing_viewed**
   - Fires when: Pricing section is 50% visible in viewport

5. **calculator_interaction** (not yet implemented)
   - TODO: Add to ROI Calculator slider changes

---

## n8n Webhook Verification

Check n8n workflow executions:

1. Each email capture should create new execution
2. Verify payload contains:
   - `email` field
   - `source` field (correct value)
   - `timestamp` field
   - `challenge` field (if provided)

---

## Browser Compatibility Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Known Issues to Verify

1. **Exit intent on mobile**: Should be disabled (unreliable)
2. **PDF download**: Will fail until actual PDF is created
3. **Email expiry**: 24 hours - verify localStorage cleanup works
4. **Modal z-index**: Verify modals appear above all content

---

## Performance Checks

1. **Lighthouse Score**: Run Lighthouse audit
   - Performance: Should remain 90+
   - Accessibility: Should remain 90+
   - Best Practices: Should remain 90+
   - SEO: Should remain 90+

2. **Page Load Time**: Should not increase significantly
3. **Modal Animation**: Should be smooth (no jank)

---

## Rollback Plan

If critical issues found:

```bash
# Revert all changes
git reset --hard HEAD

# Or revert specific commit
git revert <commit-hash>
```

---

## Success Criteria

Phase 1 is successful if:
- [ ] All 15 test scenarios pass
- [ ] All GA4 events fire correctly
- [ ] n8n receives all webhook calls
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build completes successfully
- [ ] Lighthouse scores remain high
- [ ] Mobile experience is smooth

---

## Post-Launch Monitoring (First 48 Hours)

Monitor:
1. Email capture rate (target: 40%+)
2. Exit intent conversion (target: 10-15%)
3. Pricing section views (target: 60%+)
4. Any JavaScript errors in production
5. n8n webhook success rate
6. User feedback/complaints

---

## Next Steps After Testing

1. Create actual lead magnet PDF
2. Set up email nurture sequence in n8n
3. Monitor conversion metrics for 1 week
4. Adjust copy/design based on data
5. Begin Phase 2 implementation

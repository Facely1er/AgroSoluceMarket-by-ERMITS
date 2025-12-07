✅ AGROSOLUCE — PRODUCTION LAUNCH CHECKLIST
LAUNCH DEFINITION (IMPORTANT)

“In production” DOES NOT mean:

feature complete

public marketing blast

open registration

“In production” means:

stable

legally safe

auditable

ready for controlled real users (buyers + cooperatives)

PHASE A — PRODUCTION HARDENING (48–72 HOURS)
1️⃣ ENVIRONMENT & DATA SEPARATION (NON-NEGOTIABLE)

✅ Confirm:

Production Supabase project ≠ dev/staging

Storage buckets:

agrosoluce-documents → private

RLS enabled for:

evidence_documents

farmer_declarations

readiness_snapshots

pilot dashboards

✅ Quick test:

Open incognito browser

Try accessing /workspace/:coop_id

Should fail unless authenticated

If this fails → STOP LAUNCH.

2️⃣ BACKUP & RECOVERY (BARE MINIMUM)

✅ Enable:

Daily DB backup (Supabase)

Manual export script for:

cooperatives

evidence metadata

declarations

snapshots

✅ You must be able to answer:

“What happens if data is lost?”

3️⃣ PERFORMANCE & FAILURE MODES

You don’t need scale optimization yet, but you must avoid crashes.

✅ Test:

/directory with 0 records

/directory with 100+ cooperatives

/workspace/:coop_id when:

no evidence exists

only 1 document exists

✅ Confirm:

no null pointer crashes

empty states display clearly

no stack traces leak to UI

PHASE B — LEGAL & ETHICAL GUARDRAILS (MANDATORY)
4️⃣ DISCLAIMER COVERAGE AUDIT

Check every surface:

Directory detail

Workspace overview

Evidence tab

Coverage tab

Gaps tab

Enablement tab

Pilot dashboard

ALL exports

✅ Required disclaimer wording pattern (variations OK):

“This view structures supplier-provided and farmer-declared information to support due-diligence processes. It is not a certification or compliance determination. Responsibility for due care and final sourcing decisions remains with the buyer.”

If ANY page is missing this → patch before launch.

5️⃣ GDPR / DATA MINIMIZATION CHECK

Even if you’re B2B, this matters.

✅ Confirm:

No personal farmer names exposed

farmer_reference is internal / pseudonymous

No GPS coordinates unless deliberate & justified

Evidence files not public by URL guessing

✅ Add (if missing):

/privacy page (simple)

/governance/due-care page visible in footer

PHASE C — OPERATIONAL READINESS (THIS IS WHERE MOST FAIL)
6️⃣ SUPPORT MODEL (BEFORE USERS ARRIVE)

Decide NOW:

✅ One support mailbox:

support@agrosoluce.com


✅ One escalation path:

bug

data correction

deletion request

✅ Simple internal rule:

“We never modify supplier data without request + trace.”

7️⃣ ONBOARDING PATHS (MINIMAL BUT REAL)

You need two entry points, not one.

A. Buyer Onboarding (Primary)

Manual account creation for now

Pilot scoping call

You configure cooperatives + pilot_id

B. Cooperative Onboarding (Indirect)

Access via buyer invitation

Enablement tab

Field officer PDFs

❌ No public self-signup yet.
That comes later.

PHASE D — PRODUCTION DEPLOYMENT (DO THIS ONCE)
8️⃣ VERSION FREEZE

✅ Tag current commit:

agrosoluce-v1-production


✅ Lock rule:

No new features without a tagged release

Only hotfixes allowed

9️⃣ DOMAIN & ACCESS

Recommended layout:

www.agrosoluce.com        → public landing + directory
app.agrosoluce.com        → workspace / pilot / enablement


✅ Ensure:

HTTPS

No dev banners

No placeholder text
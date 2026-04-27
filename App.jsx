import { useState, useRef, useEffect } from "react";

// ─── PROMPTS ─────────────────────────────────────────────────────────────────

const INTAKE_SYSTEM = `You ARE Gerald Corteza — Fractional CMO & GTM Architect with 25+ years of B2B marketing leadership and 15 years of digital marketing experience. You are the creator of Social Conversation Engineering (SCE), the S3 Framework (Stir, Steer, Seal), the TagThem! Methodology, and the Conversation Economy thesis. You speak in first person as Gerald: warm, direct, confident, and strategically opinionated. You are having a real intake conversation with a prospective client to gather enough context to build a high-impact GTM strategy grounded in your proprietary frameworks.

CRITICAL RULES:
- You ARE Gerald. Never refer to yourself as an AI, a bot, or an assistant. Speak as Gerald in first person at all times.
- Be conversational and human — like a senior CMO having a real back-and-forth, not a form being filled out.
- Ask ONE focused question at a time. Never stack multiple questions.
- If the client gives vague, incomplete, or surface-level answers, probe deeper before moving on. Never accept "it's for everyone" or generic non-answers.
- Do not generate a strategy yet — just gather information naturally.
- Use Gerald's exact opening message verbatim for the very first message (provided separately).

YOUR MARKETING PHILOSOPHY (use this to shape how you probe and what you listen for):
- You believe most founders confuse activity with strategy. A crowded content calendar is not a GTM plan.
- You believe the Conversation Economy has arrived: buyer journeys in B2B, SaaS, and high-trust services are now initiated, qualified, and accelerated through conversations — not traffic-based funnel entry points. Traditional funnels are still necessary but their front-end is being replaced by conversation-driven systems.
- You believe there are two types of intent: INFERRED intent (clicks, page visits, ad behavior — probabilistic and noisy) and EXPRESSED intent (conversations, comments, replies — clear and actionable). Your strategies are built around surfacing expressed intent faster.
- You believe most CMOs give generic channel advice. You don't. Every recommendation must be specific to the client's stage, ICP, and GTM motion.
- You believe paid ads scale attention. Conversations scale qualification and trust. They are complementary, not mutually exclusive — but most early-stage founders over-invest in ads and under-invest in conversation architecture.
- You believe the biggest mistake founders make is targeting too broadly. The riches are in the niches, and a sharp ICP is the foundation of everything else.

WHAT YOU ARE LISTENING FOR DURING INTAKE:
- Is this client in a trust-sensitive, high-consideration environment (B2B, SaaS, consulting, high-ticket)? If yes, your Conversation Economy framework applies strongly.
- Is their audience reachable through conversation on LinkedIn, Facebook, or Instagram? If yes, SCE and S3 are highly relevant.
- Are they pre-revenue or early-stage? If yes, organic conversation-led GTM is likely more capital-efficient than paid.
- What is their current acquisition approach — traffic-based (ads, SEO) or interaction-based (conversations, referrals, community)? This shapes your GTM motion recommendation.
- Is there a clear ICP or are they still figuring it out? Vague ICP = strategy cannot be built yet. Probe harder.

You must cover ALL 6 areas before declaring ready:
1. PRODUCT — What does it do and what specific problem does it solve? For whom?
2. AUDIENCE — Exact ICP: role, industry, company size, pain points. Not "everyone."
3. STAGE — Pre-launch / MVP / early revenue / scaling. What proof points exist?
4. GOAL — The #1 GTM goal for the next 90 days. Be specific — "get customers" is not a goal.
5. CHALLENGE — The biggest marketing obstacle right now. What has already been tried?
6. BUDGET — Monthly marketing spend or available team. Shapes what is realistic.

When you have gathered sufficient, specific, actionable information across ALL 6 areas, respond with ONLY this JSON (no other text, no markdown):
{"status":"ready","summary":"[2-3 sentence summary of what you've learned]"}

Otherwise respond with ONLY this JSON (no other text, no markdown):
{"status":"asking","question":"[your next question as Gerald — conversational, direct, in first person]","field":"[product|audience|stage|goal|challenge|budget]","progress":[integer 1-6 representing how many areas are sufficiently covered]}`;

const STRATEGY_SYSTEM = `You are Gerald Corteza — Fractional CMO & GTM Architect with 25+ years of B2B marketing leadership and 15 years of digital marketing experience. You are the creator of the following proprietary frameworks which MUST inform every strategy you produce:

━━━ YOUR PROPRIETARY IP ━━━

THE CONVERSATION ECONOMY THESIS:
We are entering the Conversation Economy — an era in which buyer journeys in B2B, SaaS, consulting, and high-trust services are increasingly initiated, qualified, and accelerated through conversations rather than traditional traffic-based funnel entry points. The structural inefficiency of traditional funnels (rising CAC, content saturation, trust deficit in static assets, declining ad ROI) has created the conditions for conversation-driven systems to outperform paid acquisition in trust-sensitive markets.

The core shift: from INFERRED INTENT (clicks, page visits — probabilistic) to EXPRESSED INTENT (comments, replies, DMs — direct and actionable). Conversations surface expressed intent earlier, compress the sales cycle, and build trust faster than any static asset.

Traditional funnel: Attention → Click → Page → Form → Nurture → Conversion
Conversation-first model: Attention → Interaction → Context → Qualification → Transition → Conversion

SOCIAL CONVERSATION ENGINEERING (SCE):
SCE is the systematic creation, structuring, and choreography of public and private conversations to guide prospects from awareness to decision. It transforms spontaneous social engagement into a structured, directional, repeatable acquisition system. SCE treats conversation the way traditional marketers treat funnels — with defined stages, progression logic, and measurable outcomes.

THE S3 FRAMEWORK — STIR · STEER · SEAL:
The S3 Framework is the execution model for SCE. It operationalizes conversation into three sequential stages:

STIR: Deliberately engineered content designed to trigger participation, response, and interaction. Effective Stir content is emotionally or intellectually engaging, specific and relatable, open-ended, and invites response. It replaces top-of-funnel awareness campaigns. Output indicators: comment volume, quality of responses, relevance of participants.

STEER: The structured guidance of conversation toward clarity, relevance, and qualification. Steering happens through replies, follow-up questions, directional responses, and contextual prompts — all intentionally designed to deepen interaction and identify fit, need, and urgency. It replaces form-based qualification and early discovery calls. Output indicators: depth of conversation, clarity of intent, qualified prospects identified.

SEAL: The transition from conversation to commitment. Where interaction becomes a defined business outcome — a DM, a call, a proposal, a transaction. Initiated when intent is clearly expressed, trust is established, and readiness signals are present. Replaces landing page conversion and email-driven closing. Output indicators: DMs initiated, calls booked, proposals sent, deals closed.

THE TAGTHEM! METHODOLOGY:
TagThem! is a strategic conversation-seeding mechanism. Tagging is NOT the scaling engine — it is the ignition trigger. It creates targeted exposure for highly relevant individuals, signals contextual authority, and seeds a conversation anchor. The primary respondents are not the tagged individuals (who are often senior and less likely to engage publicly) but mid-level practitioners and community participants who ARE the engine of engagement and qualification. Conversations — not tags — drive reach through algorithmic amplification, comment thread expansion, and self-selection. Scale in TagThem! comes from the quality and pull of the conversation, not the number of tagged individuals.

KEY METRICS FROM YOUR MEASUREMENT FRAMEWORK:
- Conversation Rate (CR): % of content viewers who engage in meaningful interaction — measures Stir effectiveness
- Tag Response Rate (TRR): % of tagged individuals who respond — measures activation precision
- Comment-to-DM Rate (CDR): % of public interactions that transition to private conversations — measures Steer effectiveness
- DM-to-Conversion Rate (DCR): % of private conversations that result in a business outcome — measures Seal effectiveness
- Time-to-Conversion (TTC): Duration from first interaction to closed outcome — measures overall system efficiency
- Conversation Depth Index (CDI): Qualitative measure of interaction depth — number of replies, length, contextual richness
- Cost per Qualified Conversation (CPQC): Total effort/cost divided by meaningful conversations — replaces Cost per Lead

STRONG FIT FOR YOUR FRAMEWORKS: B2B, SaaS, consulting, advisory, high-ticket services, complex/long sales cycles, relationship-driven environments, trust-sensitive decisions.
WEAK FIT: Low-cost impulse-driven eCommerce, commodity products, purely performance-advertising use cases.

YOUR CONTRARIAN POSITIONS (one of these must inform Gerald's Take):
1. Most founders invest in ads before they have a conversation architecture. This is backwards. Ads scale attention. Conversations scale trust. You need trust before ads can close anything.
2. Content marketing without conversation engineering is broadcasting into a void. The content economy is saturated. The Conversation Economy rewards those who initiate and guide interactions — not those who publish the most.
3. Paid ads give you inferred intent. Conversations give you expressed intent. Early-stage founders cannot afford to pay for the interpretation layer that bridges inferred to expressed. Conversations eliminate that cost.
4. The front-end of every funnel is being replaced by conversation. Funnels are not dead — they are being pushed downstream. The acquisition layer is now conversation-first.
5. ICP precision is the most undervalued GTM asset. A sharp ICP makes every channel more efficient. A vague ICP makes every channel leak.
6. Most CMOs recommend the same 3 channels to every client. The channel recommendation must follow the ICP — where they actually spend their time, who they trust, and what kind of interaction they respond to.

━━━ YOUR TASK ━━━

Based on the client intake, generate a high-level GTM strategy in OGSM format. This is a DIRECTIONAL framework — specific enough to demonstrate clear CMO thinking and make the client feel genuinely understood, but intentionally high-level. The detailed 90-day execution plan, campaign briefs, S3 playbooks, TagThem! sequences, channel-specific tactics, messaging frameworks, and SCE conversation flows are reserved for the paid engagement.

Where the client's situation fits the Conversation Economy (B2B, SaaS, consulting, high-trust, complex sale), the strategy MUST incorporate SCE and S3 language. The GTM motion, channels, and measures should reflect your frameworks — not generic marketing advice.

Return ONLY a JSON object — no markdown, no explanation, no other text. The JSON must follow this exact shape:

{
  "objective": "One powerful, specific sentence stating the single overarching business objective for this GTM push. Specific to their product, stage, and market — not generic.",
  "positioning": "2 sentences on exactly where they win and why. Name the precise niche they should own. Be contrarian if their natural instinct is to go broad.",
  "icp": {
    "primary": "Job title · Company size · Industry · Core pain point they have right now",
    "secondary": "Second most valuable segment — same format",
    "avoid": "One customer type that looks appealing but drains resources — and exactly why they drain resources"
  },
  "goals": [
    { "goal": "Measurable, time-bound goal 1 — specific to their stage. Use conversation metrics where relevant (e.g. CDR, TTC, qualified conversations).", "timeframe": "e.g. Month 1–2" },
    { "goal": "Measurable goal 2", "timeframe": "e.g. Month 2–3" },
    { "goal": "Measurable goal 3", "timeframe": "e.g. Month 3" }
  ],
  "strategies": [
    { "label": "GTM Motion", "description": "Name the motion (Conversation-led / PLG / sales-led / community-led / hybrid) and explain in one sentence exactly why this motion fits their product, stage, audience, and budget. Reference the Conversation Economy where relevant." },
    { "label": "Channel 1 (Primary)", "description": "Specific platform + specific SCE or S3 tactic. Not generic. E.g. 'LinkedIn — run a weekly Stir post targeting [ICP role] around [specific pain point], Steer through comments to identify expressed intent, Seal via DM with a diagnostic offer.'" },
    { "label": "Channel 2 (Secondary)", "description": "Second channel with specific directional tactic." },
    { "label": "Channel 3 (Supporting)", "description": "Third channel or tactic — could be content, referral, community, or paid depending on stage and budget." },
    { "label": "Conversation Architecture", "description": "How SCE and S3 apply to their specific situation — what Stir content looks like for their ICP, how Steer qualification works in their context, and what Seal transition looks like for their offer." }
  ],
  "measures": [
    { "kpi": "Conversation Rate (CR)", "why": "Specific reason why this matters at their stage — e.g. 'Pre-revenue, so measuring whether your Stir content actually triggers engagement is the first proof point before anything else matters.'" },
    { "kpi": "Comment-to-DM Rate (CDR)", "why": "Specific reason relevant to their situation." },
    { "kpi": "DM-to-Conversion Rate (DCR)", "why": "Specific reason relevant to their offer and sales cycle." },
    { "kpi": "Time-to-Conversion (TTC)", "why": "Specific reason — e.g. 'At seed stage, a long TTC signals ICP or messaging misalignment, not just a slow sales cycle.'" },
    { "kpi": "Cost per Qualified Conversation (CPQC)", "why": "Specific reason — position this as the metric that replaces Cost per Lead for conversation-driven systems." }
  ],
  "geraldsInsight": "One bold, contrarian, insider insight specific to THIS client's situation. Draw from your proprietary frameworks — reference the Conversation Economy, SCE, S3, TagThem!, expressed vs. inferred intent, or your contrarian positions. This should feel like the most valuable thing on the page — the insight that makes them think: I need Gerald to build this out with me. Never generic. Always specific to what you learned in their intake."
}`;

// ─── STYLES ──────────────────────────────────────────────────────────────────

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;font-family:'Plus Jakarta Sans',sans-serif}

:root{
  --bg:#faf8f4;
  --surface:#ffffff;
  --surface2:#f5f2ec;
  --border:#e4ddd2;
  --border2:#d4ccc0;
  --ink:#1a1714;
  --ink2:#4a4540;
  --ink3:#8a837a;
  --gold:#b8893a;
  --gold-bg:#fdf6e8;
  --gold-border:#e8d4a0;
  --rust:#c24b2a;
  --green:#2a7a52;
  --r:14px;
}

.app{min-height:100vh;background:var(--bg);display:flex;flex-direction:column;align-items:center;padding:0 16px 80px}

/* ── Header ── */
.hdr{width:100%;max-width:680px;padding:28px 0 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border)}
.hdr-left{display:flex;align-items:center;gap:14px}
.avatar-ring{
  width:46px;height:46px;border-radius:50%;
  background:linear-gradient(135deg,#b8893a,#d4a850);
  display:grid;place-items:center;position:relative;
  flex-shrink:0;
}
.avatar-initials{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:600;color:#fff;letter-spacing:0.02em}
.avatar-dot{
  position:absolute;bottom:1px;right:1px;
  width:11px;height:11px;border-radius:50%;
  background:#2a7a52;border:2px solid var(--bg);
}
.hdr-info .name{font-size:15px;font-weight:600;color:var(--ink);letter-spacing:-0.01em}
.hdr-info .title{font-size:12px;color:var(--ink3);margin-top:2px}
.hdr-badge{font-size:11px;color:var(--ink3);border:1px solid var(--border2);padding:5px 12px;border-radius:20px;letter-spacing:0.03em}

/* ── Hero ── */
.hero{width:100%;max-width:680px;padding:48px 0 40px;display:flex;gap:32px;align-items:flex-start}
.hero-avatar{flex-shrink:0}
.big-avatar{
  width:80px;height:80px;border-radius:50%;
  background:linear-gradient(135deg,#b8893a 0%,#d4a850 50%,#c49040 100%);
  display:grid;place-items:center;position:relative;
}
.big-avatar-initials{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600;color:#fff}
.big-avatar-ring{
  position:absolute;inset:-4px;border-radius:50%;
  border:1.5px solid var(--gold-border);animation:pulse-ring 2.5s ease-in-out infinite;
}
@keyframes pulse-ring{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
.big-avatar-dot{
  position:absolute;bottom:3px;right:3px;
  width:14px;height:14px;border-radius:50%;
  background:var(--green);border:2.5px solid var(--bg);
}
.hero-text{}
.hero-eyebrow{font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold);margin-bottom:14px;font-weight:500}
.hero h1{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,4vw,46px);line-height:1.1;letter-spacing:-0.01em;color:var(--ink);margin-bottom:14px}
.hero h1 em{font-style:italic;color:var(--gold)}
.hero-bio{font-size:14px;color:var(--ink2);line-height:1.75;margin-bottom:20px;max-width:480px}
.hero-pills{display:flex;gap:8px;flex-wrap:wrap}
.pill{font-size:12px;color:var(--ink2);border:1px solid var(--border2);border-radius:20px;padding:4px 12px;background:var(--surface)}

/* ── Chat card ── */
.chat-wrap{width:100%;max-width:680px;margin-top:8px}
.chat-card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--r);overflow:hidden;
  box-shadow:0 2px 20px rgba(26,23,20,0.06),0 0 0 1px rgba(26,23,20,0.02);
}
.chat-bar{
  background:var(--surface2);border-bottom:1px solid var(--border);
  padding:12px 20px;display:flex;align-items:center;justify-content:space-between;
}
.chat-bar-left{display:flex;align-items:center;gap:10px}
.mini-av{
  width:30px;height:30px;border-radius:50%;
  background:linear-gradient(135deg,#b8893a,#d4a850);
  display:grid;place-items:center;flex-shrink:0;
}
.mini-av span{font-family:'Cormorant Garamond',serif;font-size:12px;font-weight:600;color:#fff}
.chat-bar .who{font-size:13px;font-weight:600;color:var(--ink)}
.chat-bar .online{font-size:11px;color:var(--green);display:flex;align-items:center;gap:4px;margin-top:1px}
.chat-bar .online::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--green);display:inline-block}
.progress-bar{height:2px;background:var(--surface2)}
.progress-fill{height:100%;background:linear-gradient(90deg,var(--gold),#d4a850);transition:width 0.6s ease}

/* Messages */
.msgs{padding:20px;display:flex;flex-direction:column;gap:14px;min-height:180px;max-height:400px;overflow-y:auto;scroll-behavior:smooth}
.msgs::-webkit-scrollbar{width:3px}
.msgs::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}

.msg{display:flex;gap:10px;animation:msgIn 0.25s ease}
@keyframes msgIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
.msg.user{flex-direction:row-reverse}

.msg-av-sm{
  width:26px;height:26px;border-radius:50%;flex-shrink:0;
  display:grid;place-items:center;font-size:10px;font-weight:600;margin-top:2px;
}
.msg.ai .msg-av-sm{background:linear-gradient(135deg,#b8893a,#d4a850);color:#fff;font-family:'Cormorant Garamond',serif;font-size:11px}
.msg.user .msg-av-sm{background:var(--surface2);border:1px solid var(--border);color:var(--ink3)}

.bubble{max-width:78%;padding:11px 15px;border-radius:12px;font-size:14px;line-height:1.65;word-wrap:break-word}
.msg.ai .bubble{background:var(--surface2);border:1px solid var(--border);color:var(--ink);border-bottom-left-radius:4px}
.msg.user .bubble{background:var(--ink);color:#f5f2ec;border-bottom-right-radius:4px}

.typing-bubble{padding:10px 15px}
.dots{display:flex;gap:4px;align-items:center}
.dots span{width:5px;height:5px;border-radius:50%;background:var(--ink3);animation:dot 1.2s infinite}
.dots span:nth-child(2){animation-delay:.2s}
.dots span:nth-child(3){animation-delay:.4s}
@keyframes dot{0%,80%,100%{opacity:0.25;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}

/* Input */
.input-area{border-top:1px solid var(--border);background:var(--surface2)}
.file-row{padding:8px 16px 0;display:flex;gap:8px}
.file-chip{
  background:var(--gold-bg);border:1px solid var(--gold-border);
  border-radius:8px;padding:4px 10px;font-size:12px;color:var(--gold);
  display:flex;align-items:center;gap:7px;
}
.file-chip-x{cursor:pointer;color:var(--rust);font-size:13px;line-height:1;opacity:0.8}
.file-chip-x:hover{opacity:1}
.input-row{display:flex;align-items:flex-end;gap:8px;padding:10px 14px}
.txt{
  flex:1;background:var(--surface);border:1px solid var(--border2);
  border-radius:10px;padding:9px 13px;font-size:14px;
  font-family:'Plus Jakarta Sans',sans-serif;color:var(--ink);
  resize:none;outline:none;max-height:110px;line-height:1.5;
  transition:border-color 0.15s;
}
.txt:focus{border-color:var(--gold)}
.txt::placeholder{color:var(--ink3)}
.ico-btn{
  width:36px;height:36px;border-radius:9px;border:1px solid var(--border2);
  background:var(--surface);cursor:pointer;color:var(--ink3);
  display:grid;place-items:center;font-size:15px;
  transition:all 0.15s;flex-shrink:0;
}
.ico-btn:hover{border-color:var(--gold);color:var(--gold)}
.send{
  width:36px;height:36px;border-radius:9px;border:none;
  background:var(--ink);cursor:pointer;color:#f5f2ec;
  display:grid;place-items:center;font-size:15px;
  transition:all 0.15s;flex-shrink:0;
}
.send:hover:not(:disabled){background:#2a2520;transform:scale(1.04)}
.send:disabled{opacity:0.35;cursor:not-allowed;transform:none}

/* ── Strategy ── */
.strategy-wrap{width:100%;max-width:680px;margin-top:20px;animation:fadeUp 0.5s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}

.strat-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;box-shadow:0 2px 20px rgba(26,23,20,0.06)}

.strat-head{
  background:var(--ink);padding:28px 32px;position:relative;overflow:hidden;
}
.strat-head::before{
  content:'OGSM';position:absolute;right:-12px;top:-10px;
  font-family:'Cormorant Garamond',serif;font-size:80px;font-weight:600;
  color:rgba(255,255,255,0.04);letter-spacing:-2px;pointer-events:none;
}
.sh-label{font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#b8893a;margin-bottom:10px;font-weight:500}
.sh-h2{font-family:'Cormorant Garamond',serif;font-size:26px;color:#faf8f4;margin-bottom:6px;letter-spacing:-0.01em}
.sh-sub{font-size:13px;color:rgba(250,248,244,0.5)}
.sh-pills{display:flex;gap:8px;margin-top:16px;flex-wrap:wrap}
.sh-pill{font-size:11px;border:1px solid rgba(184,137,58,0.35);color:#d4a850;padding:3px 10px;border-radius:20px}

/* OGSM Matrix */
.ogsm-wrap{padding:28px 32px}
.ogsm-objective{
  background:var(--gold-bg);border:1px solid var(--gold-border);
  border-radius:10px;padding:18px 22px;margin-bottom:24px;
}
.ogsm-objective .obj-label{font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:6px}
.ogsm-objective .obj-text{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--ink);line-height:1.3;font-style:italic}

.ogsm-positioning{font-size:14px;color:var(--ink2);line-height:1.7;margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid var(--border)}

.ogsm-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:var(--border);border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:24px}
@media(max-width:560px){.ogsm-grid{grid-template-columns:1fr}}
.ogsm-col{background:var(--surface);padding:0}
.ogsm-col-head{
  background:var(--surface2);padding:10px 16px;
  font-size:10px;letter-spacing:0.12em;text-transform:uppercase;
  color:var(--ink3);font-weight:600;border-bottom:1px solid var(--border);
}
.ogsm-col-head span{color:var(--gold)}
.ogsm-col-body{padding:14px 16px;display:flex;flex-direction:column;gap:12px}

.ogsm-goal{border-left:2px solid var(--gold-border);padding-left:10px}
.ogsm-goal .g-text{font-size:13px;color:var(--ink);line-height:1.5;margin-bottom:3px;font-weight:500}
.ogsm-goal .g-time{font-size:11px;color:var(--ink3)}

.ogsm-strat{border-left:2px solid var(--border2);padding-left:10px}
.ogsm-strat .s-label{font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:3px}
.ogsm-strat .s-text{font-size:13px;color:var(--ink2);line-height:1.5}

.ogsm-kpi{border-left:2px solid var(--border2);padding-left:10px}
.ogsm-kpi .k-name{font-size:13px;color:var(--ink);font-weight:600;margin-bottom:2px}
.ogsm-kpi .k-why{font-size:12px;color:var(--ink3);line-height:1.4}

/* ICP section */
.ogsm-icp{margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid var(--border)}
.ogsm-icp .icp-head{font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--ink3);font-weight:600;margin-bottom:12px}
.icp-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
@media(max-width:560px){.icp-grid{grid-template-columns:1fr}}
.icp-card{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:12px 14px}
.icp-card .ic-tag{font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink3);margin-bottom:5px}
.icp-card.primary .ic-tag{color:var(--gold)}
.icp-card.avoid .ic-tag{color:var(--rust)}
.icp-card .ic-text{font-size:12px;color:var(--ink);line-height:1.5}

/* Gerald's insight */
.gerald-insight{
  background:var(--ink);border-radius:10px;padding:20px 22px;margin-bottom:0;
}
.gi-label{font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px}
.gi-text{font-family:'Cormorant Garamond',serif;font-size:17px;color:#faf8f4;line-height:1.6;font-style:italic}

/* Back to Upwork banner */
.upwork-banner{
  width:100%;max-width:680px;margin-top:20px;
  background:#1d4354;border:1px solid #2a6070;
  border-radius:10px;padding:12px 18px;
  display:flex;align-items:center;justify-content:space-between;gap:12px;
  animation:fadeUp 0.4s ease;
}
.ub-left{display:flex;align-items:center;gap:10px}
.ub-dot{width:8px;height:8px;border-radius:50%;background:#14a800;flex-shrink:0;box-shadow:0 0 6px rgba(20,168,0,0.6)}
.ub-text{font-size:13px;color:rgba(255,255,255,0.75);line-height:1.4}
.ub-text strong{color:#fff;font-weight:600}
.ub-back{
  display:inline-flex;align-items:center;gap:6px;white-space:nowrap;
  background:#14a800;color:#fff;border:none;border-radius:7px;
  padding:7px 14px;font-size:12px;font-weight:700;cursor:pointer;
  font-family:'Plus Jakarta Sans',sans-serif;text-decoration:none;
  transition:all 0.15s;flex-shrink:0;
}
.ub-back:hover{background:#12962a;transform:translateY(-1px)}

/* Hire Me block — inside card, after Gerald's Take */
.hire-block{
  margin-top:20px;padding:24px;
  background:linear-gradient(135deg,#0d1a08,#1a1200);
  border-radius:10px;border:1px solid rgba(184,137,58,0.25);
}
.hire-divider{
  text-align:center;margin-bottom:18px;
  display:flex;flex-direction:column;gap:3px;
}
.hire-divider span{font-size:13px;color:rgba(250,248,244,0.45);line-height:1.5}
.hire-divider span:first-child{color:rgba(250,248,244,0.7)}

.hire-btn{
  display:flex;align-items:center;gap:14px;width:100%;
  background:#14a800;color:#fff;border:none;border-radius:12px;
  padding:18px 22px;cursor:pointer;text-decoration:none;
  transition:all 0.2s;
  box-shadow:0 4px 24px rgba(20,168,0,0.35);
}
.hire-btn:hover{background:#12962a;transform:translateY(-2px);box-shadow:0 8px 32px rgba(20,168,0,0.45)}
.hire-btn-icon{
  width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.15);
  display:grid;place-items:center;flex-shrink:0;
}
.hire-btn-text{display:flex;flex-direction:column;flex:1;text-align:left}
.hire-btn-main{font-size:17px;font-weight:700;letter-spacing:-0.01em;font-family:'Plus Jakarta Sans',sans-serif}
.hire-btn-sub{font-size:12px;opacity:0.75;margin-top:2px;font-family:'Plus Jakarta Sans',sans-serif}
.hire-btn-arrow{font-size:22px;font-weight:300;flex-shrink:0;opacity:0.85}

.hire-meta{
  display:flex;gap:16px;justify-content:center;margin-top:14px;flex-wrap:wrap;
}
.hire-meta span{font-size:11px;color:rgba(250,248,244,0.4)}

/* Secondary Upwork CTA below card (keep minimal) */
.upwork-cta{display:none}

.restart{margin-top:16px;text-align:center}
.restart-btn{background:none;border:none;font-size:13px;color:var(--ink3);cursor:pointer;text-decoration:underline;font-family:'Plus Jakarta Sans',sans-serif}
.restart-btn:hover{color:var(--ink2)}

/* Toast */
.toast{
  position:fixed;bottom:22px;left:50%;transform:translateX(-50%);
  background:var(--ink);color:#f5f2ec;padding:10px 20px;border-radius:9px;
  font-size:13px;z-index:99;white-space:nowrap;
  box-shadow:0 4px 20px rgba(26,23,20,0.25);
  animation:tin 0.25s ease;
}
@keyframes tin{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

/* Generating */
.generating{text-align:center;padding:56px 24px}
.gen-spin{width:44px;height:44px;border-radius:50%;border:2.5px solid var(--border2);border-top-color:var(--gold);animation:spin 0.85s linear infinite;margin:0 auto 20px}
@keyframes spin{to{transform:rotate(360deg)}}
.gen-h{font-family:'Cormorant Garamond',serif;font-size:24px;color:var(--ink);margin-bottom:8px}
.gen-p{font-size:14px;color:var(--ink3);line-height:1.7}
`;

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ogsm, setOgsm] = useState(null);
  const [toast, setToast] = useState("");
  const [upworkRef, setUpworkRef] = useState(null); // e.g. { ref: "upwork", job: "saas-founder" }
  const intakeHistory = useRef([]);
  const messagesEnd = useRef(null);
  const fileRef = useRef(null);
  const started = useRef(false);

  // Read URL params on mount — e.g. ?ref=upwork&job=saas-fintech
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("ref") === "upwork") {
      setUpworkRef({
        job: params.get("job") || null,
        // Upwork messages page — closest we can get to the conversation
        backUrl: "https://www.upwork.com/ab/messaging/rooms"
      });
    }
  }, []);

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(""), 3000); };
  const scrollBottom = () => setTimeout(() => messagesEnd.current?.scrollIntoView({ behavior: "smooth" }), 60);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    startIntake();
  }, []);

  const callIntakeAPI = async (msgs) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        system: INTAKE_SYSTEM,
        messages: msgs,
      }),
    });
    const data = await res.json();
    return data.content?.map(b => b.text || "").join("") || "";
  };

  const parseResponse = (raw) => {
    try {
      const match = raw.match(/\{[\s\S]*?\}/);
      if (match) return JSON.parse(match[0]);
    } catch {}
    return { status: "asking", question: raw.trim(), progress: 1 };
  };

  const GERALD_OPENING = `Hey there — great to have you here. I'll be walking you through a quick intake conversation so I can build a focused, high-impact Go-To-Market strategy tailored specifically to your business. We'll keep this conversational and to the point — no fluff.\n\nLet's dive right in: Tell me about your product or service. What does it do, and what's the core problem it solves for your customers?`;

  const startIntake = () => {
    setMessages([{ role: "ai", text: GERALD_OPENING }]);
    intakeHistory.current = [
      { role: "user", content: "Start the intake. You are Gerald Corteza speaking directly to a prospective client." },
      { role: "assistant", content: JSON.stringify({ status: "asking", question: GERALD_OPENING, field: "product", progress: 0 }) }
    ];
    setIsTyping(false);
    scrollBottom();
  };

  const send = async () => {
    const text = input.trim();
    if (!text && !file) return;
    if (isTyping) return;

    const userText = file ? `${text || "Please see my uploaded brief."} [Attached brief: ${file.name}]` : text;

    const newMsgs = [...messages, { role: "user", text: userText }];
    setMessages(newMsgs);
    setInput("");
    setFile(null);
    setIsTyping(true);
    scrollBottom();

    const newHistory = [
      ...intakeHistory.current,
      { role: "user", content: userText }
    ];

    try {
      const raw = await callIntakeAPI(newHistory);
      const parsed = parseResponse(raw);

      if (parsed?.status === "ready") {
        const closing = `Perfect — I have everything I need. Give me just a moment to put your strategy together...`;
        setMessages([...newMsgs, { role: "ai", text: closing }]);
        setProgress(100);
        setIsTyping(false);
        scrollBottom();
        intakeHistory.current = [...newHistory, { role: "assistant", content: raw }];
        setTimeout(() => runStrategyGeneration(newHistory, parsed.summary || ""), 1400);
      } else {
        const q = parsed?.question || "Could you tell me a bit more about that?";
        setMessages([...newMsgs, { role: "ai", text: q }]);
        intakeHistory.current = [...newHistory, { role: "assistant", content: raw }];
        if (parsed?.progress) setProgress((parsed.progress / 6) * 100);
        setIsTyping(false);
        scrollBottom();
      }
    } catch {
      setMessages([...newMsgs, { role: "ai", text: "I had a connection issue — could you resend that?" }]);
      setIsTyping(false);
    }
  };

  // ── Your Google Apps Script Web App URL (paste here after deploying the script) ──
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzoxZm-fJMMfnL0TUuNSikxC1HpUDZH7lelgvesn9SxAVU1nXkbVdAlavR83tp0guGW/exec";

  const sendToGoogleDrive = async (parsedOgsm, transcript) => {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === "PASTE_YOUR_APPS_SCRIPT_URL_HERE") return;
    try {
      const productSlug = parsedOgsm.objective
        ? parsedOgsm.objective.substring(0, 60).replace(/[^a-zA-Z0-9\s]/g, "").trim()
        : "New Client";
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, ogsm: parsedOgsm, productSlug }),
        mode: "no-cors" // Google Apps Script requires no-cors
      });
    } catch (err) {
      console.warn("Google Drive sync failed (non-critical):", err);
    }
  };

  const runStrategyGeneration = async (hist, summary) => {
    setPhase("generating");
    const contextDump = hist.filter(m => m.role === "user").map(m => m.content).join("\n\n");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          system: STRATEGY_SYSTEM,
          messages: [{ role: "user", content: `Client intake:\n\n${contextDump}\n\nSummary: ${summary}\n\nGenerate the OGSM JSON now. Return ONLY raw JSON — no markdown, no code fences, no explanation.` }],
        }),
      });
      const data = await res.json();
      const raw = data.content?.map(b => b.text || "").join("") || "";
      const cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        setOgsm(parsed);
        setPhase("strategy");
        // Silently send transcript + OGSM to Google Drive
        sendToGoogleDrive(parsed, hist.map(m => ({ role: m.role, text: m.content })));
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (err) {
      console.error("Strategy generation error:", err);
      setPhase("chat");
      setMessages(prev => [...prev, {
        role: "ai",
        text: "I hit a snag generating your strategy. Could you click the send button again to retry? Your answers are all saved."
      }]);
    }
  };

  const handleFile = (f) => {
    if (!f) return;
    const ok = f.type === "application/pdf" || f.type.includes("word") || f.name.endsWith(".txt") || f.name.endsWith(".docx");
    if (ok) { setFile(f); showToast("Brief attached ✓"); }
    else showToast("Upload PDF, DOCX, or TXT");
  };

  const onKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  const reset = () => {
    setPhase("chat"); setMessages([]); setHistory([]);
    setInput(""); setFile(null); setProgress(0); setOgsm(null);
    intakeHistory.current = [];
    started.current = false;
    setTimeout(() => { started.current = false; startIntake(); started.current = true; }, 50);
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* Header */}
        <header className="hdr">
          <div className="hdr-left">
            <div className="avatar-ring">
              <span className="avatar-initials">GC</span>
              <span className="avatar-dot" />
            </div>
            <div className="hdr-info">
              <div className="name">Gerald Corteza</div>
              <div className="title">Fractional CMO & GTM Architect</div>
            </div>
          </div>
          <div className="hdr-badge">Available on Upwork</div>
        </header>

        {/* Upwork context banner — shown when visitor came from a proposal */}
        {upworkRef && (
          <div className="upwork-banner">
            <div className="ub-left">
              <div className="ub-dot" />
              <div className="ub-text">
                <strong>You came here from Gerald's Upwork proposal.</strong>{" "}
                {upworkRef.job ? <>Re: <em>{upworkRef.job.replace(/-/g, " ")}</em> · </> : ""}
                Complete the intake below, then go back to hire him directly.
              </div>
            </div>
            <a className="ub-back" href={upworkRef.backUrl} target="_blank" rel="noopener noreferrer">
              ← Back to Upwork
            </a>
          </div>
        )}

        {/* Hero */}
        {phase === "chat" && (
          <div className="hero">
            <div className="hero-avatar">
              <div className="big-avatar">
                <span className="big-avatar-initials">GC</span>
                <div className="big-avatar-ring" />
                <span className="big-avatar-dot" />
              </div>
            </div>
            <div className="hero-text">
              <div className="hero-eyebrow">Virtual CMO · Free GTM Strategy</div>
              <h1>Let's build your<br/><em>go-to-market</em> together</h1>
              <p className="hero-bio">
                I'm Gerald Corteza — Fractional CMO & GTM Architect with 25+ years scaling startups from zero to Series B. 
                Answer a few questions and I'll build a high-level GTM strategy tailored specifically to your product, 
                stage, and market. I'll then review your responses and follow up with you on Upwork.
              </p>

            </div>
          </div>
        )}

        {/* ── CHAT ── */}
        {phase === "chat" && (
          <div className="chat-wrap">
            <div className="chat-card">
              <div className="chat-bar">
                <div className="chat-bar-left">
                  <div className="mini-av"><span>GC</span></div>
                  <div>
                    <div className="who">Gerald Corteza</div>
                    <div className="online">Online now</div>
                  </div>
                </div>
                <div style={{fontSize:11,color:"var(--ink3)"}}>
                  {Math.round(progress)}% complete
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${progress}%`}} />
              </div>

              <div className="msgs">
                {messages.map((m, i) => (
                  <div className={`msg ${m.role}`} key={i}>
                    <div className="msg-av-sm">{m.role === "ai" ? "GC" : "U"}</div>
                    <div className="bubble">{m.text}</div>
                  </div>
                ))}
                {isTyping && (
                  <div className="msg ai">
                    <div className="msg-av-sm">GC</div>
                    <div className="bubble typing-bubble"><div className="dots"><span/><span/><span/></div></div>
                  </div>
                )}
                <div ref={messagesEnd} />
              </div>

              <div className="input-area">
                {file && (
                  <div className="file-row">
                    <div className="file-chip">
                      📄 {file.name}
                      <span className="file-chip-x" onClick={() => setFile(null)}>✕</span>
                    </div>
                  </div>
                )}
                <div className="input-row">
                  <button className="ico-btn" title="Attach brief" onClick={() => fileRef.current.click()}>📎</button>
                  <input type="file" ref={fileRef} style={{display:"none"}} accept=".pdf,.doc,.docx,.txt"
                    onChange={e => handleFile(e.target.files[0])} />
                  <textarea
                    className="txt" rows={1}
                    placeholder="Type your reply… (Enter to send, Shift+Enter for new line)"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={onKey}
                  />
                  <button className="send" onClick={send} disabled={isTyping || (!input.trim() && !file)}>→</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── GENERATING ── */}
        {phase === "generating" && (
          <div className="chat-wrap">
            <div className="chat-card">
              <div className="generating">
                <div className="gen-spin" />
                <div className="gen-h">I'm reviewing your brief…</div>
                <div className="gen-p">
                  Mapping your competitive landscape · Defining your ICP<br/>
                  Building your 90-day roadmap · Crafting GTM motion
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STRATEGY: OGSM Matrix ── */}
        {phase === "strategy" && ogsm && (
          <div className="strategy-wrap">
            <div className="strat-card">
              <div className="strat-head">
                <div className="sh-label">Gerald Corteza · Fractional CMO & GTM Architect · GTM Strategy</div>
                <div className="sh-h2">Your OGSM Strategy Framework</div>
                <div className="sh-sub">High-level directional strategy · Prepared based on your intake</div>
                <div className="sh-pills">
                  <div className="sh-pill">Objective</div>
                  <div className="sh-pill">Goals</div>
                  <div className="sh-pill">Strategies</div>
                  <div className="sh-pill">Measures</div>
                </div>
              </div>

              <div className="ogsm-wrap">
                {/* Objective */}
                <div className="ogsm-objective">
                  <div className="obj-label">Objective</div>
                  <div className="obj-text">{ogsm.objective}</div>
                </div>

                {/* Positioning */}
                <div className="ogsm-positioning">{ogsm.positioning}</div>

                {/* ICP */}
                <div className="ogsm-icp">
                  <div className="icp-head">Ideal Customer Profile</div>
                  <div className="icp-grid">
                    <div className="icp-card primary">
                      <div className="ic-tag">Primary ICP</div>
                      <div className="ic-text">{ogsm.icp.primary}</div>
                    </div>
                    <div className="icp-card">
                      <div className="ic-tag">Secondary ICP</div>
                      <div className="ic-text">{ogsm.icp.secondary}</div>
                    </div>
                    <div className="icp-card avoid">
                      <div className="ic-tag">Who to avoid</div>
                      <div className="ic-text">{ogsm.icp.avoid}</div>
                    </div>
                  </div>
                </div>

                {/* G · S · M grid */}
                <div className="ogsm-grid">
                  {/* Goals */}
                  <div className="ogsm-col">
                    <div className="ogsm-col-head"><span>G</span> — Goals</div>
                    <div className="ogsm-col-body">
                      {ogsm.goals.map((g, i) => (
                        <div className="ogsm-goal" key={i}>
                          <div className="g-text">{g.goal}</div>
                          <div className="g-time">{g.timeframe}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Strategies */}
                  <div className="ogsm-col">
                    <div className="ogsm-col-head"><span>S</span> — Strategies</div>
                    <div className="ogsm-col-body">
                      {ogsm.strategies.map((s, i) => (
                        <div className="ogsm-strat" key={i}>
                          <div className="s-label">{s.label}</div>
                          <div className="s-text">{s.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Measures */}
                  <div className="ogsm-col">
                    <div className="ogsm-col-head"><span>M</span> — Measures</div>
                    <div className="ogsm-col-body">
                      {ogsm.measures.map((m, i) => (
                        <div className="ogsm-kpi" key={i}>
                          <div className="k-name">{m.kpi}</div>
                          <div className="k-why">{m.why}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Gerald's Insight */}
                <div className="gerald-insight">
                  <div className="gi-label">Gerald's Take</div>
                  <div className="gi-text">"{ogsm.geraldsInsight}"</div>
                </div>

                {/* HIRE ME — prominent, inside the card */}
                <div className="hire-block">
                  <div className="hire-divider">
                    <span>This OGSM is your strategic foundation.</span>
                    <span>The full execution plan is where we go to work.</span>
                  </div>
                  <a
                    className="hire-btn"
                    href={upworkRef ? upworkRef.backUrl : "https://www.upwork.com/freelancers/geraldcortezamarketer?viewMode=1"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="hire-btn-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 8.4C18 5.417 15.314 3 12 3S6 5.417 6 8.4c0 2.338 1.417 4.354 3.5 5.374V17.1c0 .994.784 1.8 1.75 1.8h1.5c.966 0 1.75-.806 1.75-1.8v-3.326C16.583 12.754 18 10.738 18 8.4z" fill="currentColor" opacity=".3"/>
                        <path d="M15.5 19.8H8.5c-.414 0-.75.403-.75.9s.336.9.75.9h7c.414 0 .75-.403.75-.9s-.336-.9-.75-.9z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="hire-btn-text">
                      <span className="hire-btn-main">
                        {upworkRef ? "← Go Back & Hire Gerald on Upwork" : "Hire Gerald on Upwork"}
                      </span>
                      <span className="hire-btn-sub">
                        {upworkRef ? "Return to our conversation and send me an offer" : "Let's build your full GTM execution plan"}
                      </span>
                    </span>
                    <span className="hire-btn-arrow">{upworkRef ? "↩" : "→"}</span>
                  </a>
                  <div className="hire-meta">
                    <span>✓ All proposals handled through Upwork</span>
                    <span>✓ Response within 24 hours</span>
                    <span>✓ Execution plan + optional team implementation</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="restart">
              <button className="restart-btn" onClick={reset}>← Build a strategy for a different product</button>
            </div>
          </div>
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

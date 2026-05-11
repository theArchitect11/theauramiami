# Future AI Agent Architecture

## Purpose
Turn AXIOM / LAB into a thinking interface that captures leads.

## Flow
User objective → AI analysis → structured response → lead capture → automation → email.

## System Prompt
You are AXIOM LAB, an intelligent system interface.

Tone:
- precise
- structured
- no fluff
- no emojis
- slightly authoritative

When a user gives an objective:

1. Identify:
→ Sector
→ Intent
→ Friction

2. Generate:
→ System Path (3 steps max)

3. Output:
→ Outcome

FORMAT EXACTLY:

[OBJECTIVE RECEIVED]

→ Sector: ...
→ Intent: ...
→ Friction: ...

[PROCESSING…]

→ System Path:
1. ...
2. ...
3. ...

→ Outcome:
...

## n8n Workflow
1. Webhook Trigger
2. OpenAI Node
3. Set Node: structure output
4. Email to owner
5. Email to user
6. Optional CRM/database storage

## Data to Capture
- Objective
- Name
- Email
- Phone
- Business type
- AI response
- Timestamp

## Email to Owner
Subject: New AXIOM Objective Received

Body:
Objective:
{{objective}}

AI Response:
{{ai_response}}

Contact:
{{name}}
{{email}}
{{phone}}

## Email to User
Subject: AXIOM // Objective Received

Body:
Your objective has been received.

{{ai_response}}

AXIOM / LAB
Systems engineered for performance.

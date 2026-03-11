# System Mechanics

How the Prism portal's automated and semi-automated systems work, their current state, and integration dependencies.

## Stage Tracking

Pipeline prospects move through stages: Lead > Initial Contact > Questions Sent > Fee Proposal > Contract > Onboarding > Active Client > Handed to RM.

| Stage | Trigger | Follow-Up Cadence |
|-------|---------|-------------------|
| Lead | Inbound enquiry, email click, or event attendance | 5 business days |
| Initial Contact | First conversation or meeting | 7 business days |
| Questions Sent | Discovery questionnaire sent | 10 business days |
| Fee Proposal | Proposal document shared | 5 business days |
| Contract | Legal review initiated | 3 business days |
| Onboarding | Contract signed, KYC started | Weekly until complete |
| Active Client | First gift or fund transfer received | Monthly check-in |
| Handed to RM | BD disengages, RM takes over | RM-managed |

Stage transitions are currently manual in Notion. [ASSUMPTION] Full automation requires Outlook 365 integration to detect email replies and auto-progress stages. The portal reads stage data from Notion at build time.

## Contact Auto-Addition

Target flow: emails received via Outlook > contacts extracted from signatures/headers > matched against existing CRM > new contacts added automatically.

Current state: **Manual**. Contacts are added to Notion by Kirsty or Dibo after meetings, events, or email exchanges.

[ASSUMPTION] Auto-addition requires:
1. Outlook 365 API connection (OAuth, read-only mail access)
2. Contact extraction logic (name, email, firm from signature)
3. Deduplication against existing Notion contacts DB
4. Approval queue for ambiguous matches

## Tag Automation

Tags in the CRM connect to external platforms for audience management and campaign targeting.

| Tag Type | Platform | Sync Status |
|----------|----------|-------------|
| MailChimp audience tags | MailChimp | [ASSUMPTION] Backend sync exists but portal-side tag management is new |
| Event attendee tags | Notion + manual export | Manual CSV export to event platforms |
| Firm relationship tags | Notion only | Internal use, no external sync |
| Interest area tags | Notion + MailChimp | Used for targeted email campaigns |

Tag changes in the portal should propagate to MailChimp within 15 minutes when sync is active. Event tags require manual export until an event platform integration is built.

## Grantee Tracking (Future)

The current system is BD-focused: pipeline, prospects, firms, and activities. A grantee-side view is planned for the RM team (primarily Dibo's workflow).

Planned capabilities:
- **Grant status dashboard**: Real-time view of all grants by stage (Requested > In Review > Approved > Paid)
- **DD progress tracking**: Due diligence checklist per charity with document upload status
- **Payment confirmations**: Bank payment reference linked to grant record
- **Charity profiles**: Consolidated view of all grants to a charity across accounts
- **Reporting**: Quarterly giving summaries per account, exportable for client reporting

This module should be discussed with Dibo to align on RM workflows before design begins. The admin grants table and grant detail panel already exist and can serve as the foundation.

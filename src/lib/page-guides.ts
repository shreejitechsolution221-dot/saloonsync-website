type Panel = { title: string; text: string; icon: string };
type Guide = { eyebrow: string; heading: string; intro: string; panels: Panel[]; checklist: string[]; faqs: [string, string][] };

export const pageGuides: Record<string, Guide> = {
  '/': {
    eyebrow: 'THE SALON DAY, CONSIDERED', heading: 'From opening time to the final goodbye.',
    intro: 'A salon day is a sequence of small handovers. Give the schedule, the team and the business details a shared place in that story.',
    panels: [
      { title: 'Before the first arrival', text: 'Start with the appointments ahead. Put your services and people in context, so the first conversation of the day has a clear starting point.', icon: 'calendar' },
      { title: 'After the last appointment', text: 'Make room to look beyond the chair. Billing, inventory and business reporting belong in the picture alongside the work your team has done.', icon: 'chart' },
    ], checklist: ['Appointments with context', 'People at the center', 'Operations in the same conversation'],
    faqs: [],
  },
  '/features': {
    eyebrow: 'CONNECT THE WORK, NOT JUST THE TOOLS', heading: 'Follow the visit. See the whole business.',
    intro: 'Each part of Saloonsync has a purpose. Explore the connections that matter to your workflow before deciding where to begin.',
    panels: [
      { title: 'The service side', text: 'Appointments, staff and customers tell the story of a visit. Explore these areas together to see how your team’s everyday work fits into one workspace.', icon: 'people' },
      { title: 'The business side', text: 'Billing, inventory and reporting provide another perspective on the salon day. Review your requirements for each area during a product conversation.', icon: 'chart' },
    ], checklist: ['Start with your busiest routine', 'Explore the related feature pages', 'Bring specific questions to your demo'],
    faqs: [['Where should I start?', 'Choose the part of your day that takes the most coordination. Appointments are a useful starting point, then explore customers, staff and the operations around each visit.'], ['Can I see the actual application?', 'Request a demo to review the product. Website visuals are illustrative concepts and do not establish the availability of particular controls or integrations.']],
  },
  '/features/appointments': {
    eyebrow: 'A DAY WITH DIRECTION', heading: 'The appointment is only the beginning.',
    intro: 'A booking connects a person, a service and the people delivering it. Keep that context close as you plan the day.',
    panels: [
      { title: 'Start the morning with context', text: 'Think through the appointments ahead alongside the services involved and the team delivering them. A connected operational picture gives that planning a home.', icon: 'calendar' },
      { title: 'Keep the handover considered', text: 'The conversation continues beyond the appointment itself. Explore customer management and billing to understand the business details around a visit.', icon: 'people' },
    ], checklist: ['Your typical appointment flow', 'The services your team offers', 'Questions about your scheduling needs'],
    faqs: [['Is the calendar above interactive?', 'It is a concept illustration. Book a demo to review the appointment experience in the application.'], ['What should I bring to an appointment demo?', 'Describe a typical busy day, your service durations and the way your team works. Ask the team to confirm any specific scheduling rules you require.']],
  },
  '/features/customers': {
    eyebrow: 'RELATIONSHIPS DESERVE CONTEXT', heading: 'Make the next hello more considered.',
    intro: 'Customer information belongs close to the visit. Keep the focus on the person while giving the business details a place.',
    panels: [
      { title: 'A shared starting point', text: 'When a salon team discusses a customer’s visit, context matters. Explore how customer information fits alongside appointments and the services your business provides.', icon: 'people' },
      { title: 'Be thoughtful about information', text: 'Decide what customer information your team needs for its work. Review access requirements and data-handling expectations before bringing existing records into a new system.', icon: 'box' },
    ], checklist: ['The information your team needs', 'Who should have access', 'Questions about existing customer records'],
    faqs: [['Does this marketing website store customer records?', 'No. The public website introduces Saloonsync. Customer management belongs to the separate salon application.'], ['Can existing customer data be imported?', 'Import methods and supported formats have not been confirmed here. Discuss your current records with the team before planning a migration.']],
  },
  '/features/staff': {
    eyebrow: 'THE PEOPLE BEHIND THE WORK', heading: 'Bring individual roles into a shared picture.',
    intro: 'A salon can include owners, managers and staff with different responsibilities. Discuss how your team works before setting up its workspace.',
    panels: [
      { title: 'Make responsibilities explicit', text: 'Start with the people involved in your salon day and what each needs to do. That conversation is the foundation for reviewing roles and access.', icon: 'people' },
      { title: 'Connect the team to the day', text: 'Appointments and services provide context for staff management. Explore those areas together when evaluating how Saloonsync fits your working routine.', icon: 'calendar' },
    ], checklist: ['Your team structure', 'Responsibilities by role', 'The appointment and service workflow'],
    faqs: [['Does everyone need a different identity?', 'A person can use a shared Saloonsync identity across applications. Their assigned role determines access; having an identity does not grant every privilege.'], ['Are platform administrators the same as salon owners?', 'No. Platform administrator privileges are assigned separately. Salon ownership does not automatically imply platform administration access.']],
  },
  '/features/billing-pos': {
    eyebrow: 'THE FINAL STEP DESERVES CLARITY', heading: 'Keep the visit and the business connected.',
    intro: 'Billing is part of the salon experience. Review the details your business needs before choosing how the final step should work.',
    panels: [
      { title: 'Start with your checkout routine', text: 'Describe what happens after a service, the information your team needs and how billing currently works. Use that real workflow to guide the product discussion.', icon: 'card' },
      { title: 'Confirm the specifics', text: 'Payment providers, hardware, tax rules and receipt requirements vary. Ask about your exact needs during the demo rather than assuming a particular integration is included.', icon: 'check' },
    ], checklist: ['Your current billing process', 'Required payment and receipt methods', 'Local business requirements to discuss'],
    faqs: [['Which payment gateways are supported?', 'A verified gateway list is not published on this website. Contact the team to confirm support for the providers you use.'], ['Does this website process payments?', 'No. These are marketing pages. There is no checkout, payment collection or purchase flow on this website.']],
  },
  '/features/inventory': {
    eyebrow: 'THE DETAILS BEHIND THE SHELF', heading: 'Give your products a place in the picture.',
    intro: 'The products behind a service are part of running a salon. Bring your real inventory routine to the conversation.',
    panels: [
      { title: 'Understand what you manage', text: 'Consider the products involved in services and any products your salon sells. Describe how the team currently organizes that information and where coordination becomes difficult.', icon: 'box' },
      { title: 'Review the connection to operations', text: 'Inventory is easier to evaluate in the context of the business. Explore billing and reporting requirements alongside your product-management needs.', icon: 'chart' },
    ], checklist: ['Your product categories', 'Who maintains inventory information', 'The inventory questions you need answered'],
    faqs: [['Are stock alerts or purchase orders included?', 'Specific inventory automations have not been confirmed on this website. Ask the team to demonstrate any workflow you need.'], ['Can I discuss inventory across locations?', 'Yes, bring your branch structure and stock-handling requirements to the product conversation. Confirm the supported approach before planning a rollout.']],
  },
  '/features/reports': {
    eyebrow: 'BETTER QUESTIONS START WITH CONTEXT', heading: 'Look beyond how busy the day felt.',
    intro: 'Begin with the decisions your business needs to make. Then review the reporting that can inform those conversations.',
    panels: [
      { title: 'Name the business question', text: 'Think about the information you review today, who uses it and what decisions follow. Those specifics make a reporting demonstration more useful than a list of chart types.', icon: 'chart' },
      { title: 'Confirm the available detail', text: 'Reporting fields, date ranges, exports and comparisons should be checked directly in a demonstration. This website does not present illustrative numbers as real business results.', icon: 'check' },
    ], checklist: ['Your recurring business questions', 'The information you review today', 'Any reporting or export requirements'],
    faqs: [['Are the website visuals live reports?', 'No. Website previews are concepts, not live salon data or evidence of business performance.'], ['Can I export reports?', 'Export support and file formats are not specified here. Ask the team to confirm the reporting and export options relevant to your business.']],
  },
  '/features/online-booking': {
    eyebrow: 'TWO EXPERIENCES, WITH PURPOSE', heading: 'Meet the customer side of the journey.',
    intro: 'A booking customer and a salon team have different tasks. Saloonsync keeps those application experiences separate while sharing identity.',
    panels: [
      { title: 'For the person planning a visit', text: 'The customer booking application is the place to explore the booking journey. This marketing website explains the platform and does not make appointments for a particular salon.', icon: 'calendar' },
      { title: 'For the team running the day', text: 'The Salon OS is the operational workspace. Review how the customer journey and salon workflow relate during a demo, including your specific booking requirements.', icon: 'people' },
    ], checklist: ['Your desired customer journey', 'How appointments are handled today', 'Questions about shared identity and roles'],
    faqs: [['Can customers book a salon visit on this website?', 'No. This is the Saloonsync marketing website. Customer appointment booking belongs to the separate booking application.'], ['Can someone be both a customer and a staff member?', 'A shared identity can be used across applications. Access to a salon workspace still depends on assigned roles and privileges.']],
  },
  '/solutions': {
    eyebrow: 'START WITH THE WAY YOU WORK', heading: 'A salon is more than a business size.',
    intro: 'Your team, service mix and daily routine matter as much as your number of locations. Use those details to explore the right fit.',
    panels: [
      { title: 'Close to the day-to-day', text: 'For a small team, the owner may be involved in appointments, customer conversations and business administration. Explore a connected workspace around that real routine.', icon: 'spark' },
      { title: 'Ready for a broader conversation', text: 'For several locations, begin with branch structure, roles and reporting expectations. Confirm requirements in a demonstration before choosing an operational approach.', icon: 'people' },
    ], checklist: ['Describe a normal working day', 'Identify the hardest handovers', 'Discuss the needs of your next chapter'],
    faqs: [['Do I have to know which solution to choose?', 'No. Tell the team how your salon works and what you need. The solution pages are starting points for a conversation.'], ['Can you confirm every feature for my business here?', 'No. Review specific capabilities, integrations and requirements with the team before relying on them for a rollout.']],
  },
  '/solutions/small-salons': {
    eyebrow: 'FOR THE OWNER WEARING MANY HATS', heading: 'Give your day a little more structure.',
    intro: 'When the same person moves between the chair and the business, context switching becomes part of the day. Start by mapping those transitions.',
    panels: [
      { title: 'Keep the essentials close', text: 'Appointments, customer information and your team’s work are part of the same service day. Explore these areas together rather than treating them as unrelated tasks.', icon: 'calendar' },
      { title: 'Make the business conversation practical', text: 'Bring examples of how you handle billing and inventory today. A useful demo should help you assess your needs, not require you to imagine a completely different salon.', icon: 'card' },
    ], checklist: ['Your most common services', 'The people involved in each visit', 'The administrative tasks that need attention'],
    faqs: [['Is there a published small-salon plan?', 'Confirmed plans and prices are not published yet. Ask for current pricing based on your requirements.'], ['Can I explore Saloonsync before making a decision?', 'Prepare a demo enquiry with your salon details and the workflows you want to review. Sending an enquiry does not start a subscription.']],
  },
  '/solutions/multi-branch-salons': {
    eyebrow: 'PLAN THE BUSINESS AROUND YOUR LOCATIONS', heading: 'More locations call for clearer questions.',
    intro: 'Before discussing software, describe the relationship between your branches and the people responsible for them.',
    panels: [
      { title: 'Map the people and responsibilities', text: 'Consider which responsibilities belong to branch teams and which sit with business leadership. Bring that structure into the conversation about roles and access.', icon: 'people' },
      { title: 'Make requirements concrete', text: 'Discuss your reporting needs, customer-information expectations and inventory processes. Cross-branch operations should be confirmed specifically, not inferred from a solution label.', icon: 'chart' },
    ], checklist: ['Your location and management structure', 'The access each role needs', 'Branch-specific and shared operational requirements'],
    faqs: [['Are consolidated reporting and stock transfers included?', 'These specific cross-branch capabilities have not been confirmed here. Ask for a demonstration of your required workflows.'], ['How should we prepare for a multi-branch demo?', 'Share the number of locations, the team structure and the workflows that cross branch boundaries. Leave sensitive customer records out of the enquiry.']],
  },
  '/pricing': {
    eyebrow: 'MAKE THE PRICING CONVERSATION USEFUL', heading: 'Clarity before commitment.',
    intro: 'Your next step is a conversation about fit. Confirm the details of any offer before deciding how to move forward.',
    panels: [
      { title: 'Understand what is included', text: 'Ask which product areas are available, who needs access and whether your required workflows are supported. Make sure those details are explicit in the pricing information you receive.', icon: 'box' },
      { title: 'Ask about the practical details', text: 'Discuss the billing period, any setup requirements and the support arrangements that would apply. No prices, trial periods or contractual inclusions are assumed by this website.', icon: 'card' },
    ], checklist: ['Feature and integration requirements', 'Team size and location structure', 'Setup, billing and support questions'],
    faqs: [['Is there a free trial?', 'A trial offer has not been confirmed here. Ask the team about current evaluation options.'], ['Will requesting pricing create an account or charge me?', 'No. The contact form sends an enquiry to the team. It does not create an account, collect payment or start a subscription.']],
  },
  '/about': {
    eyebrow: 'A CONSIDERED APPROACH', heading: 'The details are part of the experience.',
    intro: 'We describe Saloonsync around the work it is intended to support: the craft in the chair and the business around it.',
    panels: [
      { title: 'People first, operations in context', text: 'Customers, staff and owners each have a place in the story of a salon. The workspace brings business information together around those relationships.', icon: 'people' },
      { title: 'Clear expectations from the start', text: 'Explore the product by area, ask to see the workflows you need and discuss pricing directly. Demonstrations should answer practical questions about your own business.', icon: 'check' },
    ], checklist: ['A salon-focused product', 'Separate applications with shared identity', 'A conversation grounded in your business'],
    faqs: [['Is Saloonsync itself a salon?', 'No. Saloonsync is a multi-tenant salon management platform for salon businesses. This public website introduces that platform.'], ['Where can I ask about the company or product?', 'Contact help@saloonsync.vasudevai.in. We have not published a company history, location or team biography without confirmed details.']],
  },
  '/contact': {
    eyebrow: 'HELP US POINT YOU IN THE RIGHT DIRECTION', heading: 'A little context goes a long way.',
    intro: 'Tell us what you are trying to do and which part of Saloonsync your question concerns. Keep the first message simple.',
    panels: [
      { title: 'Product and pricing questions', text: 'Include your salon name, location count and the workflows you want to discuss. For pricing, mention the roles that need access and any requirements that are essential to your business.', icon: 'card' },
      { title: 'Help with an existing question', text: 'Describe the application or page involved and what you expected to happen. You can explain the steps without sending passwords, payment details or customer records.', icon: 'people' },
    ], checklist: ['A short description of your question', 'The product area involved', 'A reply address you can access'],
    faqs: [['Has the form sent my message?', 'When the form reports success, the email provider has accepted the messages for delivery. Check your inbox for the confirmation. Delivery to an inbox is not guaranteed by acceptance.'], ['What if the form cannot send my message?', 'The form displays an error if sending fails. You can try again or email help@saloonsync.vasudevai.in directly. If a partial send occurred, the team may already have received your enquiry.']],
  },
  '/book-a-demo': {
    eyebrow: 'A DEMO AROUND YOUR REAL DAY', heading: 'Bring your questions. Bring your workflow.',
    intro: 'The most useful product conversation starts with your salon. Tell us what you want to understand rather than sharing sensitive business records.',
    panels: [
      { title: 'Walk through a typical visit', text: 'Describe how appointments are handled, who delivers services and how the visit reaches billing. Highlight the handovers that matter most to your team.', icon: 'calendar' },
      { title: 'Make your requirements specific', text: 'Ask about the product areas, reports, integrations and access needs that are important to your salon. Request confirmation of anything you would rely on operationally.', icon: 'check' },
    ], checklist: ['Your service and appointment routine', 'Your team and location structure', 'The questions you want the demo to answer'],
    faqs: [['Is a time booked when I complete this form?', 'No. The form sends a demo enquiry. A demonstration time needs to be arranged with the team afterwards.'], ['Do I need an account to enquire?', 'No account is created or required by this enquiry form. Login and registration belong to the separate shared identity service.']],
  },
  '/help': {
    eyebrow: 'FIND THE RIGHT STARTING POINT', heading: 'Different questions. A clearer route forward.',
    intro: 'The help center covers the public website and the basics of the Saloonsync platform. For a specific application workflow, contact the team.',
    panels: [
      { title: 'Getting to know the platform', text: 'Start with Features for the workspace, Solutions for business context and Pricing for the next commercial conversation. Each page has a distinct purpose.', icon: 'spark' },
      { title: 'Understanding accounts', text: 'Salon staff, owners and booking customers can share an identity across separate applications. A login does not automatically grant access to a business workspace.', icon: 'people' },
    ], checklist: ['Search the common questions', 'Identify the application involved', 'Contact the team with a concise description'],
    faqs: [['Is there a complete application knowledge base here?', 'Not yet. This page contains verified platform and website information, not an invented library of application instructions.'], ['Where do I report a website issue?', 'Email help@saloonsync.vasudevai.in with the page address and a description of the issue. Do not include passwords or sensitive customer information.']],
  },
  '/blog': {
    eyebrow: 'EXPLORE WHILE THE JOURNAL GROWS', heading: 'There is already more to discover.',
    intro: 'No articles have been published yet. These product pages offer a useful place to learn about Saloonsync in the meantime.',
    panels: [
      { title: 'Understand the workspace', text: 'Explore the feature pages for appointments, customers, staff and business operations. Each introduces a different part of the salon day.', icon: 'calendar' },
      { title: 'Start with your business', text: 'The solution pages discuss the context of small teams and multi-branch businesses. Use them to prepare questions about your own requirements.', icon: 'people' },
    ], checklist: ['Explore the product areas', 'Read about the product philosophy', 'Ask a question about your salon'],
    faqs: [['Where are the articles?', 'There are no published articles yet, so the journal does not link to placeholder stories.'], ['Can I ask a question before articles are available?', 'Yes. Contact the team at help@saloonsync.vasudevai.in or explore the help center.']],
  },
  '/privacy': {
    eyebrow: 'YOUR NEXT STEP, WITH CONTEXT', heading: 'Understand where your information goes.',
    intro: 'Different parts of an enquiry involve different services. The public website and your email provider have separate roles.',
    panels: [
      { title: 'While you complete the form', text: 'The website validates your fields and requires enquiry consent. On submission, the form sends those details to the enquiry endpoint for validation and email delivery. It does not save them in browser storage.', icon: 'box' },
      { title: 'When you submit an enquiry', text: 'The configured Resend service delivers messages to the team and a confirmation to you. Your email provider handles the confirmation in your inbox. Only include information needed to explain your enquiry.', icon: 'people' },
    ], checklist: ['Keep sensitive records out of enquiries', 'Review your form details before sending', 'Contact us with website privacy questions'],
    faqs: [['Does this notice cover every Saloonsync application?', 'No. This notice concerns the current public marketing website. The identity, Salon OS and customer booking applications need their own confirmed data-handling information.'], ['Is a complete production policy available?', 'Not yet. The operator, hosting, retention and applicable privacy-rights details identified above still need confirmation.']],
  },
  '/terms': {
    eyebrow: 'BEFORE YOU MAKE A DECISION', heading: 'Confirm the details that matter.',
    intro: 'The website is a starting point for learning about Saloonsync. Product suitability and commercial arrangements require a separate conversation.',
    panels: [
      { title: 'Review the real workflow', text: 'Ask to see the features and integrations your business would use. Website illustrations are concepts, so they should not be treated as a live product demonstration.', icon: 'calendar' },
      { title: 'Review a specific offer', text: 'Confirm pricing, inclusions, setup needs and the terms that would apply before choosing a subscription. No purchase or account creation takes place on this website.', icon: 'card' },
    ], checklist: ['Confirm required functionality', 'Review current pricing and inclusions', 'Obtain the applicable service terms'],
    faqs: [['Does an enquiry create a service agreement?', 'The website enquiry sends a message to the team. It does not create a subscription or process a purchase.'], ['Where can I obtain final service terms?', 'Contact help@saloonsync.vasudevai.in. Final service terms are pending the confirmed business and commercial details described above.']],
  },
};

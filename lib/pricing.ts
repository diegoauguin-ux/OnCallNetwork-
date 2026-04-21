export const PRICING = {
  permanentStandard: {
    label: "Permanent Placement",
    feePercent: 18,
    feeDisplay: "18% of annual salary",
    payableWhen: "on Candidate's start date",
    paymentTerms: "14 days from invoice",
    replacementGuarantee: "60-day replacement guarantee",
  },
  permanentFounding: {
    label: "Founding Venues Rate",
    feePercent: 15,
    feeDisplay: "15% — first 3 venues this month",
    note: "Founding Venues programme — limited to first three venues to sign each month.",
  },
  casualIntro: {
    label: "Casual Introduction",
    fee: 99,
    feeDisplay: "$99 per introduction",
    currency: "AUD",
    gstTreatment: "ex GST",
    payableWhen: "on first confirmed shift",
    noShowGuarantee: "Service credit + replacement intro if candidate doesn't show",
  },
  gstDisclosure:
    "All prices are GST-exclusive. GST added on invoice where applicable.",
} as const;

export const SERVICE_DROPDOWN_OPTIONS = [
  "Permanent Placement (18% of annual salary)",
  "Casual Introduction ($99 per intro)",
  "Priority plan (enquire)",
  "Venue partner (enquire)",
  "General Enquiry",
] as const;

export type ServiceDropdownOption = (typeof SERVICE_DROPDOWN_OPTIONS)[number];

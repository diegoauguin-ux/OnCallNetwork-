/**
 * Airtable API integration for OnCallNetwork
 * Env vars required: AIRTABLE_ACCESS_TOKEN (or AIRTABLE_API_KEY), AIRTABLE_BASE_ID
 */

type AirtableAttachment = { url: string };
type AirtableFieldValue =
  | string
  | number
  | boolean
  | AirtableAttachment[]
  | null;
type AirtableFields = Record<string, AirtableFieldValue>;

async function writeAirtableRecord(params: {
  tableName: string;
  fields: AirtableFields;
  optionalFields?: string[];
}): Promise<{ id: string }> {
  const apiKey =
    process.env.AIRTABLE_ACCESS_TOKEN ?? process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    throw new Error(
      "Missing Airtable config: AIRTABLE_ACCESS_TOKEN and AIRTABLE_BASE_ID must be set"
    );
  }

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
    params.tableName
  )}`;

  async function send(fields: AirtableFields) {
    return fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ records: [{ fields }], typecast: true }),
    });
  }

  let response = await send(params.fields);

  if (!response.ok && params.optionalFields && params.optionalFields.length) {
    const errorBody = await response.clone().text();
    const mentionsUnknownField = /UNKNOWN_FIELD_NAME|Unknown field name/i.test(
      errorBody
    );
    if (mentionsUnknownField) {
      const fallback: AirtableFields = { ...params.fields };
      for (const f of params.optionalFields) delete fallback[f];
      response = await send(fallback);
    }
  }

  if (!response.ok) {
    const errorBody = await response.text();
    let errorMessage = `Airtable API error: ${response.status} ${response.statusText}`;
    try {
      const parsed = JSON.parse(errorBody);
      errorMessage = parsed.error?.message ?? errorMessage;
    } catch {
      if (errorBody) errorMessage += ` — ${errorBody}`;
    }
    throw new Error(errorMessage);
  }

  const result = (await response.json()) as {
    records: Array<{ id: string }>;
  };

  if (!result.records?.[0]?.id) {
    throw new Error("Unexpected Airtable response: no record ID returned");
  }

  return { id: result.records[0].id };
}

export interface VenueRecord {
  venueName: string;
  contactPerson: string;
  email: string;
  phone: string;
  serviceType?: string;
  suburb?: string;
  positionsNeeded?: string;
  immediateNeed?: string;
  additionalNotes?: string;
  consentTimestamp?: string;
}

export async function createVenueRecord(
  data: VenueRecord
): Promise<{ id: string }> {
  const tableName = process.env.AIRTABLE_VENUES_TABLE_NAME ?? "Venues";

  const fields: AirtableFields = {
    "Venue Name": data.venueName,
    "Contact Person": data.contactPerson,
    Email: data.email,
    Phone: data.phone,
  };

  if (data.serviceType) fields["Service Type"] = data.serviceType;
  if (data.suburb) fields["Suburb"] = data.suburb;
  if (data.positionsNeeded) fields["Positions Usually Needed"] = data.positionsNeeded;
  if (data.immediateNeed) fields["Immediate Need"] = data.immediateNeed;
  if (data.additionalNotes) fields["Notes"] = data.additionalNotes;
  if (data.consentTimestamp) fields["Consent Timestamp"] = data.consentTimestamp;

  return writeAirtableRecord({
    tableName,
    fields,
    optionalFields: ["Consent Timestamp"],
  });
}

export interface WorkerRecord {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  workExperience: number;
  hasRSA: string;
  suburb: string;
  availability: string;
  additionalNotes?: string;
}

export async function createWorkerRecord(
  data: WorkerRecord
): Promise<{ id: string }> {
  const tableName =
    process.env.AIRTABLE_WORKERS_TABLE_NAME ??
    process.env.AIRTABLE_CANDIDATE_TABLE ??
    process.env.AIRTABLE_CANDIDATE_APPLICATIONS_TABLE_NAME ??
    "Candidate Applications";

  const fields: AirtableFields = {
    "Full Name": data.fullName,
    Email: data.email,
    Phone: data.phone,
    Role: data.role,
    "Work Experience (years)": data.workExperience,
    "Has RSA": data.hasRSA,
    Suburb: data.suburb,
    Availability: data.availability,
  };

  if (data.additionalNotes) fields["Notes"] = data.additionalNotes;

  return writeAirtableRecord({ tableName, fields });
}

export interface CandidateApplicationRecord {
  fullName: string;
  email: string;
  phone: string;
  suburb: string;
  roleApplyingFor: string;
  yearsInAustralia: number;
  currentVenue: string;
  hasRSA: boolean;
  hasRCG: boolean;
  hasFoodSafety: boolean;
  hasFirstAid: boolean;
  availability: string;
  preferredZones: string;
  employmentType: string;
  briefIntro: string;
  registrationDate: string;
  status: string;
  cvAttachment?: AirtableAttachment[];
  rsaCertificateAttachment?: AirtableAttachment[];
}

export async function createCandidateApplicationRecord(
  record: CandidateApplicationRecord
): Promise<{ id: string }> {
  const tableName =
    process.env.AIRTABLE_CANDIDATE_APPLICATIONS_TABLE_NAME ??
    "Candidate Applications";

  const fields: AirtableFields = {
    "Full Name": record.fullName,
    "Email": record.email,
    "Phone": record.phone,
    "Suburb": record.suburb,
    "Primary role": record.roleApplyingFor,
    "Work Experience (years)": record.yearsInAustralia,
    "Venues": record.currentVenue,
    "Has RSA": record.hasRSA,
    "RCG": record.hasRCG,
    "Food Safety": record.hasFoodSafety,
    "First Aid": record.hasFirstAid,
    "Availability": record.availability,
    "Sydney zones": record.preferredZones,
    "Shifts preferences": record.employmentType,
    "Experience description": record.briefIntro,
    "Status": "New Application",
    "CV": record.cvAttachment ?? null,
    "RSA Certificate file": record.rsaCertificateAttachment ?? null,
  };

  return writeAirtableRecord({
    tableName,
    fields,
  });
}

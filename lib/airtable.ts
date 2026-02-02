/**
 * Airtable API integration for OnCallNetwork
 * Requires: AIRTABLE_API_KEY, AIRTABLE_BASE_ID env vars
 */

export interface VenueRecord {
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  venueType: string;
  location?: string;
  immediateNeed?: string;
  message?: string;
}

export async function createVenueRecord(
  data: VenueRecord
): Promise<{ id: string }> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    throw new Error(
      "Missing Airtable configuration: AIRTABLE_API_KEY and AIRTABLE_BASE_ID must be set"
    );
  }

  const url = `https://api.airtable.com/v0/${baseId}/Venues`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [
        {
          fields: {
            "Business Name": data.businessName,
            "Contact Person": data.contactPerson,
            Email: data.email,
            Phone: data.phone,
            "Venue Type": data.venueType,
            Location: data.location ?? "",
            "Immediate Need": data.immediateNeed ?? "no",
            Message: data.message ?? "",
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let errorMessage = `Airtable API error: ${response.status} ${response.statusText}`;
    try {
      const parsed = JSON.parse(errorBody);
      errorMessage = parsed.error?.message ?? errorMessage;
    } catch {
      if (errorBody) errorMessage += ` - ${errorBody}`;
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

export interface WorkerRecord {
  fullName: string;
  email: string;
  phone: string;
  workExperience: number;
  availability: string;
}

export async function createWorkerRecord(
  data: WorkerRecord
): Promise<{ id: string }> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    throw new Error(
      "Missing Airtable configuration: AIRTABLE_API_KEY and AIRTABLE_BASE_ID must be set"
    );
  }

  const url = `https://api.airtable.com/v0/${baseId}/Workers`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [
        {
          fields: {
            "Full Name": data.fullName,
            Email: data.email,
            Phone: data.phone,
            "Work Experience (years)": data.workExperience,
            Availability: data.availability,
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let errorMessage = `Airtable API error: ${response.status} ${response.statusText}`;
    try {
      const parsed = JSON.parse(errorBody);
      errorMessage = parsed.error?.message ?? errorMessage;
    } catch {
      if (errorBody) errorMessage += ` - ${errorBody}`;
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

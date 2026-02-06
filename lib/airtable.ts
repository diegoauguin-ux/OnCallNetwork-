/**
 * Airtable API integration for OnCallNetwork
 * Requires: AIRTABLE_API_KEY, AIRTABLE_BASE_ID env vars
 */

export interface VenueRecord {
  venueName: string;
  contactPerson: string;
  email: string;
  phone: string;
  suburb?: string;
  positionsNeeded?: string;
  immediateNeed?: string;
  additionalNotes?: string;
}

export async function createVenueRecord(
  data: VenueRecord
): Promise<{ id: string }> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName =
    process.env.AIRTABLE_VENUES_TABLE_NAME || "Venues";

  if (!apiKey || !baseId) {
    throw new Error(
      "Missing Airtable configuration: AIRTABLE_API_KEY and AIRTABLE_BASE_ID must be set"
    );
  }

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  const fields: Record<string, string> = {
    "Venue Name": data.venueName,
    "Contact Person": data.contactPerson,
    Email: data.email,
    Phone: data.phone,
  };
  if (data.suburb != null && data.suburb !== "") {
    fields.Suburb = data.suburb;
  }
  if (data.positionsNeeded != null && data.positionsNeeded !== "") {
    fields["Positions Usually Needed"] = data.positionsNeeded;
  }
  if (data.immediateNeed != null && data.immediateNeed !== "") {
    fields["Immediate Need"] = data.immediateNeed;
  }
  if (data.additionalNotes != null && data.additionalNotes !== "") {
    fields.Notes = data.additionalNotes;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [{ fields }],
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

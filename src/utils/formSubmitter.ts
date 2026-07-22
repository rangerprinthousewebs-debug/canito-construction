export interface LeadData {
  name: string;
  lastName?: string;
  email: string;
  phone: string;
  city?: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
}

export async function submitLead(data: LeadData): Promise<boolean> {
  // Abstracted submission dispatcher.
  // Can be pointed to: Web3Forms, Resend, FormSubmit, EmailJS easily in production.
  try {
    // Example endpoint for Web3Forms or FormSubmit
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

    if (!endpoint) {
      // Mocking successful dispatch for static builds/testing
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...data,
        subject: `New Lead: ${data.service} - ${data.name} ${data.lastName || ""}`,
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, location, service, budget, message } = body;

    // Validation
    if (!name || !phone || !location || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || "elementsbyshipra@gmail.com";
    const senderEmail = process.env.SENDER_EMAIL || "onboarding@resend.dev";

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1A1816; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #FBF9F5; }
            .header { background-color: #1A1816; padding: 40px; text-align: center; border-bottom: 4px solid #C59A58; }
            .logo { color: #EAD8BD; font-size: 24px; font-weight: bold; letter-spacing: 4px; text-transform: uppercase; margin: 0; }
            .content { padding: 40px; background-color: #ffffff; }
            .section-title { font-size: 11px; font-weight: bold; color: #B58544; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; border-bottom: 1px solid #E8DFC8; padding-bottom: 10px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
            .label { font-size: 10px; font-weight: bold; color: #A0988E; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
            .value { font-size: 14px; color: #1A1816; font-weight: 500; }
            .highlight-box { background-color: #FAF6F0; border: 1px solid #E8DFC8; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .message-box { background-color: #ffffff; border-left: 3px solid #C59A58; padding: 20px; font-style: italic; color: #6E675E; margin-top: 30px; }
            .footer { padding: 30px; text-align: center; font-size: 12px; color: #7A7268; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="logo">SHIPRA DESIGNS</h1>
              <p style="color: #B58544; font-size: 12px; letter-spacing: 2px; margin-top: 10px; text-transform: uppercase;">New Consultation Inquiry</p>
            </div>
            <div class="content">
              <div class="section-title">Client Details</div>
              <div style="margin-bottom: 25px;">
                <div class="label">Full Name</div>
                <div class="value" style="font-size: 18px;">${name}</div>
              </div>
              <div style="display: flex; gap: 40px; margin-bottom: 30px;">
                <div>
                  <div class="label">Contact Number</div>
                  <div class="value">${phone}</div>
                </div>
                <div>
                  <div class="label">Email Address</div>
                  <div class="value">${email || "Not provided"}</div>
                </div>
              </div>
              <div style="margin-bottom: 30px;">
                <div class="label">Project Location</div>
                <div class="value">${location}</div>
              </div>

              <div class="section-title">Project Interest</div>
              <div class="highlight-box">
                <div style="display: flex; justify-content: space-between;">
                  <div>
                    <div class="label">Service Required</div>
                    <div class="value" style="color: #B58544;">${service}</div>
                  </div>
                  <div style="text-align: right;">
                    <div class="label">Estimated Budget</div>
                    <div class="value">${budget}</div>
                  </div>
                </div>
              </div>

              ${message ? `
                <div class="section-title">Message / Requirements</div>
                <div class="message-box">
                  "${message}"
                </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Shipra Designs. All rights reserved.</p>
              <p>This inquiry was sent from the consultation form on shipradesigns.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: `Shipra Designs <${senderEmail}>`,
        to: [contactEmail],
        subject: `New Consultation: ${name} - ${service}`,
        html: htmlContent,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorData = await response.json();
      console.error("Resend API error:", errorData);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Consultation Inquiry</title>
  <style type="text/css">
    /* Reset styles for mobile email clients */
    body, table, td, p, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #FAF8F5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #11100F; }

    /* Mobile Responsive Overrides */
    @media screen and (max-width: 600px) {
      .outer-padding { padding: 10px !important; }
      .container { padding: 20px 16px !important; width: 100% !important; max-width: 100% !important; box-sizing: border-box !important; }
      .brand-title { font-size: 18px !important; letter-spacing: 1.5px !important; }
      .intro-paragraph { font-size: 14px !important; line-height: 1.5 !important; }
      .table-cell { padding: 8px 10px !important; font-size: 13px !important; }
      .message-bubble { padding: 14px 16px !important; border-radius: 4px 14px 14px 14px !important; }
      .message-text { font-size: 13px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F5;">

  <!-- Outer Wrapper Table for email rendering -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF8F5;">
    <tr>
      <td align="center" class="outer-padding" style="padding: 20px 10px;">
        
        <!-- Main Document Sheet -->
        <table border="0" cellpadding="0" cellspacing="0" class="container" width="100%" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E8DFC8; border-radius: 6px; padding: 32px 28px; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
          <tr>
            <td>
              
              <!-- Brand Header -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 2px solid #11100F; padding-bottom: 12px; margin-bottom: 24px;">
                <tr>
                  <td>
                    <h1 class="brand-title" style="font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; color: #11100F; margin: 0;">SHIPRA DESIGNS</h1>
                    <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #C59A58; margin-top: 4px;">New Project Inquiry Notification</div>
                  </td>
                </tr>
              </table>

              <!-- Direct Opening Sentence -->
              <div class="intro-paragraph" style="font-size: 15px; line-height: 1.6; color: #2B2825; margin-bottom: 24px;">
                Hi, <strong>${name}</strong> has submitted a new project consultation inquiry for <strong>${service}</strong> in <strong>${location}</strong> with an estimated budget of <strong>${budget || "Flexible / Not specified"}</strong>.
              </div>

              <!-- Chat Bubble UI Message Box -->
              ${message ? `
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #8C8479; margin-bottom: 10px; border-bottom: 1px solid #F4F1EA; padding-bottom: 4px;">
                Client Message &amp; Scope
              </div>
              <div style="margin-bottom: 28px;">
                <div class="message-bubble" style="background-color: #FAF6F0; border: 1px solid #E8DFC8; border-radius: 4px 18px 18px 18px; padding: 16px 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                  <span style="font-size: 13px; font-weight: 700; color: #11100F; margin-bottom: 6px; display: block;">${name}</span>
                  <p class="message-text" style="font-size: 14px; line-height: 1.6; color: #3A3530; white-space: pre-wrap; margin: 0;">${message}</p>
                </div>
              </div>
              ` : ''}

              <!-- Client Details Header -->
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #8C8479; margin-bottom: 10px; border-bottom: 1px solid #F4F1EA; padding-bottom: 4px;">
                Client Details
              </div>

              <!-- Client & Project Details Table -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <th class="table-cell" width="35%" style="text-align: left; padding: 10px 12px; border: 1px solid #E8DFC8; font-size: 14px; background-color: #FAF8F5; font-weight: 600; color: #666056;">Full Name</th>
                  <td class="table-cell" width="65%" style="text-align: left; padding: 10px 12px; border: 1px solid #E8DFC8; font-size: 14px; color: #11100F;"><strong>${name}</strong></td>
                </tr>
                <tr>
                  <th class="table-cell" style="text-align: left; padding: 10px 12px; border: 1px solid #E8DFC8; font-size: 14px; background-color: #FAF8F5; font-weight: 600; color: #666056;">Phone Number</th>
                  <td class="table-cell" style="text-align: left; padding: 10px 12px; border: 1px solid #E8DFC8; font-size: 14px; color: #11100F;">${phone}</td>
                </tr>
                <tr>
                  <th class="table-cell" style="text-align: left; padding: 10px 12px; border: 1px solid #E8DFC8; font-size: 14px; background-color: #FAF8F5; font-weight: 600; color: #666056;">Email Address</th>
                  <td class="table-cell" style="text-align: left; padding: 10px 12px; border: 1px solid #E8DFC8; font-size: 14px; color: #11100F;">
                    ${email ? `<a href="mailto:${email}" style="color: #11100F; font-weight: 600; text-decoration: underline;">${email}</a>` : 'Not provided'}
                  </td>
                </tr>
                <tr>
                  <th class="table-cell" style="text-align: left; padding: 10px 12px; border: 1px solid #E8DFC8; font-size: 14px; background-color: #FAF8F5; font-weight: 600; color: #666056;">Project Location</th>
                  <td class="table-cell" style="text-align: left; padding: 10px 12px; border: 1px solid #E8DFC8; font-size: 14px; color: #11100F;">${location}</td>
                </tr>
                <tr>
                  <th class="table-cell" style="text-align: left; padding: 10px 12px; border: 1px solid #E8DFC8; font-size: 14px; background-color: #FAF8F5; font-weight: 600; color: #666056;">Requested Service</th>
                  <td class="table-cell" style="text-align: left; padding: 10px 12px; border: 1px solid #E8DFC8; font-size: 14px; color: #11100F;"><strong style="color: #C59A58;">${service}</strong></td>
                </tr>
                <tr>
                  <th class="table-cell" style="text-align: left; padding: 10px 12px; border: 1px solid #E8DFC8; font-size: 14px; background-color: #FAF8F5; font-weight: 600; color: #666056;">Estimated Budget</th>
                  <td class="table-cell" style="text-align: left; padding: 10px 12px; border: 1px solid #E8DFC8; font-size: 14px; color: #11100F;">${budget || "Flexible / Not specified"}</td>
                </tr>
              </table>

              <!-- Simple Sign-off -->
              <p style="font-size: 14px; color: #2B2825; margin: 0 0 4px 0;">
                Regards,<br>
                <strong>Shipra Designs Consultation System</strong>
              </p>

              <!-- Minimal Footer -->
              <div style="font-size: 10px; color: #8C8479; border-top: 1px solid #E8DFC8; padding-top: 16px; margin-top: 24px; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
                &copy; ${new Date().getFullYear()} Shipra Designs. All rights reserved.
              </div>

            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

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
        subject: `New Inquiry: ${name} - ${service}`,
        html: htmlContent,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json({
        success: true,
        message: "Consultation email sent successfully",
        data: responseData,
      });
    }

    const errorText = await response.text();
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch {
      errorData = { message: errorText };
    }

    return NextResponse.json(
      { error: "Failed to send email", resendError: errorData },
      { status: 500 }
    );

  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
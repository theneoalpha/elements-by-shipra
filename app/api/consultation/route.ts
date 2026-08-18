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
            /* Global Resets */
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #F4F1EA; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }

            /* Mobile Overrides */
            @media screen and (max-width: 600px) {
              .outer-container { padding: 12px !important; }
              .inner-card { padding: 24px 18px !important; }
              .brand-header { padding: 28px 18px !important; }
              .logo-title { font-size: 20px !important; letter-spacing: 3px !important; }
              .data-value { font-size: 15px !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #F4F1EA;">

          <!-- Wrapper Background Table -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F4F1EA;">
            <tr>
              <td align="center" class="outer-container" style="padding: 30px 15px;">
                
                <!-- Main Container Card -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #E6DFD3;">
                  
                  <!-- Brand Header -->
                  <tr>
                    <td class="brand-header" style="background-color: #11100F; padding: 36px 30px; text-align: center; border-bottom: 3px solid #C59A58;">
                      <div class="logo-title" style="color: #F2E8DA; font-size: 22px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; margin: 0 0 6px 0;">SHIPRA DESIGNS</div>
                      <div style="color: #C59A58; font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase;">New Project Inquiry</div>
                    </td>
                  </tr>

                  <!-- Card Body -->
                  <tr>
                    <td class="inner-card" style="padding: 36px 32px; background-color: #FFFFFF;">
                      
                      <!-- Section 1 Header -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                        <tr>
                          <td style="font-size: 11px; font-weight: 700; color: #C59A58; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #F4F1EA; padding-bottom: 8px;">
                            Client Profile
                          </td>
                        </tr>
                      </table>

                      <!-- Full Name -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                        <tr>
                          <td style="background-color: #FAF8F5; padding: 12px 16px; border-radius: 8px; border-left: 3px solid #11100F;">
                            <div style="font-size: 10px; font-weight: 700; color: #8C8479; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Full Name</div>
                            <div class="data-value" style="font-size: 16px; font-weight: 700; color: #11100F;">${name}</div>
                          </td>
                        </tr>
                      </table>

                      <!-- Phone & Email (Clean Stack layout for both screen sizes) -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                        <tr>
                          <td style="background-color: #FAF8F5; padding: 12px 16px; border-radius: 8px; margin-bottom: 10px;">
                            <div style="font-size: 10px; font-weight: 700; color: #8C8479; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Phone Number</div>
                            <div class="data-value" style="font-size: 15px; font-weight: 600; color: #11100F;">${phone}</div>
                          </td>
                        </tr>
                      </table>

                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                        <tr>
                          <td style="background-color: #FAF8F5; padding: 12px 16px; border-radius: 8px;">
                            <div style="font-size: 10px; font-weight: 700; color: #8C8479; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Email Address</div>
                            <div class="data-value" style="font-size: 15px; font-weight: 600; color: #11100F;">${email || "Not provided"}</div>
                          </td>
                        </tr>
                      </table>

                      <!-- Location -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                        <tr>
                          <td style="background-color: #FAF8F5; padding: 12px 16px; border-radius: 8px;">
                            <div style="font-size: 10px; font-weight: 700; color: #8C8479; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Project Location</div>
                            <div class="data-value" style="font-size: 15px; font-weight: 600; color: #11100F;">${location}</div>
                          </td>
                        </tr>
                      </table>

                      <!-- Section 2 Header -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                        <tr>
                          <td style="font-size: 11px; font-weight: 700; color: #C59A58; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #F4F1EA; padding-bottom: 8px;">
                            Project Requirements
                          </td>
                        </tr>
                      </table>

                      <!-- Highlighted Service & Budget Box -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF6F0; border: 1px solid #E8DFC8; border-radius: 10px; margin-bottom: 24px; overflow: hidden;">
                        <tr>
                          <td style="padding: 16px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px;">
                              <tr>
                                <td>
                                  <div style="font-size: 10px; font-weight: 700; color: #8C8479; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Requested Service</div>
                                  <div style="font-size: 16px; font-weight: 700; color: #C59A58;">${service}</div>
                                </td>
                              </tr>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td style="border-top: 1px dashed #E3D9C6; padding-top: 12px;">
                                  <div style="font-size: 10px; font-weight: 700; color: #8C8479; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Estimated Budget</div>
                                  <div style="font-size: 15px; font-weight: 700; color: #11100F;">${budget || "Flexible / Not specified"}</div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Client Message Box -->
                      ${message ? `
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="font-size: 10px; font-weight: 700; color: #8C8479; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">Client Notes / Scope</td>
                          </tr>
                          <tr>
                            <td style="background-color: #FFFFFF; border-left: 3px solid #C59A58; padding: 14px 16px; border-top: 1px solid #F0ECE1; border-right: 1px solid #F0ECE1; border-bottom: 1px solid #F0ECE1; border-radius: 0 8px 8px 0; color: #4A443D; font-size: 14px; line-height: 1.6; font-style: italic;">
                              "${message}"
                            </td>
                          </tr>
                        </table>
                      ` : ''}

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #FAF8F5; padding: 24px 20px; text-align: center; border-top: 1px solid #E6DFD3;">
                      <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #11100F;">Shipra Designs Consultation System</p>
                      <p style="margin: 0; font-size: 10px; color: #8C8479;">&copy; ${new Date().getFullYear()} Shipra Designs. Sent via website inquiry form.</p>
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
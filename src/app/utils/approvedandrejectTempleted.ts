export const approvedAndRejectSchoolTempleted = (
  status: string,
  name: string,
  platform: string,
) => {
  const isApproved = status === 'approved';

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>${platform} Notification</title>
  </head>

  <body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">

            <!-- Header -->
            <tr>
              <td style="background:${isApproved ? '#22c55e' : '#ef4444'}; padding:25px; text-align:center; color:white;">
                <h1 style="margin:0;">${platform}</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px; color:#333;">
                <h2 style="margin-top:0;">Hello ${name},</h2>

                <p style="font-size:16px; line-height:1.6;">
                  ${
                    isApproved
                      ? '🎉 Congratulations! Your school registration has been successfully approved.'
                      : 'Unfortunately, your school registration request has been rejected.'
                  }
                </p>

                <p style="font-size:15px; line-height:1.6;">
                  ${
                    isApproved
                      ? 'You can now access the platform and start using all available features.'
                      : 'If you believe this was a mistake or need more information, please contact our support team.'
                  }
                </p>

                

                <p style="font-size:14px; color:#666;">
                  Thank you for being part of <strong>${platform}</strong>.
                </p>

                <p style="margin-top:30px;">
                  Best Regards,<br/>
                  <strong>${platform} Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f1f5f9; padding:20px; text-align:center; font-size:13px; color:#777;">
                © ${new Date().getFullYear()} ${platform}. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

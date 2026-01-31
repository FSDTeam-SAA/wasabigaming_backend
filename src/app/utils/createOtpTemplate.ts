import config from '../config';

const createOtpTemplate = (
  code: string,
  email?: string,
  companyName: string = 'Your Company',
): string => `
  <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 20px auto; background-color: #f9fafb; padding: 24px;">
    <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <header style="background: linear-gradient(90deg, #4f46e5, #6366f1); padding: 28px; text-align: center; color: #ffffff;">
        <h2 style="margin: 0; font-size: 22px; font-weight: 600;">Verify your Email</h2>
        <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">Secure your ${companyName} account</p>
      </header>
      
      <!-- Body -->
      <main style="padding: 32px 24px; text-align: center; color: #374151;">
        <p style="font-size: 16px; margin: 0 0 16px;">Hi ${email || 'there'},</p>
        <p style="font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
          We received a request to verify your account. Please use the following one-time code:
        </p>
        
        <!-- OTP Box -->
        <div style="display: inline-block; background-color: #eef2ff; padding: 18px 36px; border-radius: 12px; font-size: 32px; font-weight: 700; color: #4f46e5; letter-spacing: 6px; margin: 20px 0;">
          ${code}
        </div>
        
        <p style="font-size: 14px; color: #6b7280; margin-top: 24px;">
          This code will expire in <strong>5 minutes</strong>. If you didn’t request this, please ignore this email.
        </p>
      </main>
      
      <!-- Footer -->
      <footer style="background-color: #f3f4f6; text-align: center; padding: 16px; font-size: 12px; color: #9ca3af;">
        &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
      </footer>
    </div>
  </div>
`;


export const sendInvitation = (
  studentName: string,
  schoolName: string,
  schoolCategory: string,
  studentEmail: string,
  schoolId?: string,
): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>School Invitation</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">School Invitation</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; font-size: 16px; color: #333333; line-height: 1.6;">
                Hello <strong style="color: #667eea;">${studentName}</strong>,
              </p>
              
              <p style="margin: 0 0 30px; font-size: 16px; color: #555555; line-height: 1.6;">
                You have been invited to join the following school:
              </p>
              
              <!-- School Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fc; border-left: 4px solid #667eea; border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px;">
                    <p style="margin: 0 0 12px; font-size: 15px; color: #333333;">
                      <strong style="color: #667eea;">School Name:</strong> 
                      <span style="color: #555555;">${schoolName}</span>
                    </p>
                    <p style="margin: 0; font-size: 15px; color: #333333;">
                      <strong style="color: #667eea;">Category:</strong> 
                      <span style="color: #555555;">${schoolCategory}</span>
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 25px; font-size: 16px; color: #555555; line-height: 1.6;">
                Please choose one of the options below to respond:
              </p>
              
              <!-- Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td align="center" style="padding: 0 10px 15px 0;">
                    <a href="${config.frontendUrl}/accepted?status=accepted&email=${studentEmail}&schoolId=${schoolId}" 
                       style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3); transition: transform 0.2s;">
                      ✓ Accept Invitation
                    </a>
                  </td>
                  <td align="center" style="padding: 0 0 15px 10px;">
                    <a href="${config.frontendUrl}/rejected?status=rejected&email=${studentEmail}&schoolId=${schoolId}" 
                       style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3); transition: transform 0.2s;">
                      ✗ Reject Invitation
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; font-size: 14px; color: #888888; line-height: 1.6; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                If you did not expect this invitation, you can safely ignore this email.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fc; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; font-size: 15px; color: #555555;">Best regards,</p>
              <p style="margin: 0; font-size: 17px; color: #667eea; font-weight: 600;">${schoolName}</p>
              <p style="margin: 15px 0 0; font-size: 13px; color: #888888;">
                © ${new Date().getFullYear()} ${schoolName}. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
        
        <!-- Bottom Spacing -->
        <table width="600" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 20px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #888888;">
                This is an automated message. Please do not reply to this email.
              </p>
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


export const sendPasswordAndEmail = (
  password: string,
  email?: string,
  companyName: string = 'Wasabigaming',
): string => `
  <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 20px auto; background-color: #f9fafb; padding: 24px;">
    <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <header style="background: linear-gradient(90deg, #4f46e5, #6366f1); padding: 28px; text-align: center; color: #ffffff;">
        <h2 style="margin: 0; font-size: 22px; font-weight: 600;">Verify your Email</h2>
        <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">Secure your ${companyName} account</p>
      </header>
      
      <!-- Body -->
      <main style="padding: 32px 24px; text-align: center; color: #374151;">
        <p style="font-size: 16px; margin: 0 0 16px;">Hi ${email || 'there'},</p>
        <p style="font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
          We received a request to verify your account. Please use the password and login your account:
        </p>
        
        <!-- OTP Box -->
        <div style="display: inline-block; background-color: #eef2ff; padding: 18px 36px; border-radius: 12px; font-size: 32px; font-weight: 700; color: #4f46e5; letter-spacing: 6px; margin: 20px 0;">
          ${password}
        </div>
      
      </main>
      
      <!-- Footer -->
      <footer style="background-color: #f3f4f6; text-align: center; padding: 16px; font-size: 12px; color: #9ca3af;">
        &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
      </footer>
    </div>
  </div>
`;
export default createOtpTemplate;

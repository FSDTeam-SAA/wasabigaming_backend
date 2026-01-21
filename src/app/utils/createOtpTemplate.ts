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
  studentUrl: string,
  schoolName: string,
  schoolCategory: string
): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 30px 40px;
          text-align: center;
          color: #ffffff;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 40px;
        }
        .greeting {
          font-size: 18px;
          color: #333333;
          margin-bottom: 20px;
        }
        .info-box {
          background-color: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 25px 0;
          border-radius: 4px;
        }
        .info-box p {
          margin: 8px 0;
          font-size: 15px;
        }
        .info-box strong {
          color: #555555;
          display: inline-block;
          min-width: 140px;
        }
        .download-section {
          margin: 30px 0;
          text-align: center;
        }
        .download-btn {
          display: inline-block;
          padding: 12px 30px;
          background-color: #667eea;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          transition: background-color 0.3s ease;
        }
        .download-btn:hover {
          background-color: #5568d3;
        }
        .action-section {
          margin: 35px 0;
          padding: 25px;
          background-color: #fafafa;
          border-radius: 6px;
          text-align: center;
        }
        .action-section h3 {
          margin: 0 0 20px 0;
          font-size: 16px;
          color: #555555;
          font-weight: 600;
        }
        .button-group {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .action-btn {
          display: inline-block;
          padding: 12px 35px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
          min-width: 120px;
        }
        .accept-btn {
          background-color: #28a745;
          color: #ffffff !important;
        }
        .accept-btn:hover {
          background-color: #218838;
        }
        .accept-btn.clicked {
          background-color: #1e7e34;
          cursor: not-allowed;
        }
        .reject-btn {
          background-color: #dc3545;
          color: #ffffff !important;
        }
        .reject-btn:hover {
          background-color: #c82333;
        }
        .reject-btn.clicked {
          background-color: #bd2130;
          cursor: not-allowed;
        }
        .footer {
          padding: 30px 40px;
          background-color: #f8f9fa;
          border-top: 1px solid #e9ecef;
        }
        .footer p {
          margin: 5px 0;
          color: #666666;
          font-size: 14px;
        }
        .footer strong {
          color: #333333;
        }
        @media only screen and (max-width: 600px) {
          .content {
            padding: 25px 20px;
          }
          .header {
            padding: 25px 20px;
          }
          .button-group {
            flex-direction: column;
            padding:5px;
          }
          .action-btn {
            width: 100%;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>School Invitation</h1>
        </div>
        
        <div class="content">
          <p class="greeting">Hello <strong>${studentName}</strong>,</p>
          
          <p>You have been invited as a student to join the following institution:</p>
          
          <div class="info-box">
            <p><strong>School Name:</strong> ${schoolName}</p>
            <p><strong>Category:</strong> ${schoolCategory}</p>
          </div>
          
          <div class="download-section">
            <p style="margin-bottom: 15px;">Get started by downloading your onboarding materials:</p>
            <a href="${studentUrl}" class="download-btn" target="_blank">Download Materials</a>
          </div>
          
          <div class="action-section">
            <h3>Please respond to this invitation:</h3>
            <div class="button-group ">
              <a href="#" class="action-btn accept-btn" onclick="handleInvitation(event, 'accepted', this)">Accept Invitation</a>
              <a href="#" class="action-btn reject-btn" onclick="handleInvitation(event, 'rejected', this)">Reject Invitation</a>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>Best regards,</p>
          <p><strong>${schoolName}</strong></p>
        </div>
      </div>
      
      <script>
        function handleInvitation(event, status, button) {
          event.preventDefault();
          
          // Prevent multiple clicks
          if (button.classList.contains('clicked')) {
            return;
          }
          
          // Add clicked class to change color
          button.classList.add('clicked');
          
          // Update button text
          const originalText = button.textContent;
          button.textContent = status === 'accepted' ? 'Accepting...' : 'Rejecting...';
          
          // Make API call
          fetch('http://localhost:5000/api?status=' + status, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            button.textContent = status === 'accepted' ? '✓ Accepted' : '✓ Rejected';
            
            // Disable both buttons after selection
            document.querySelectorAll('.action-btn').forEach(btn => {
              btn.style.pointerEvents = 'none';
              btn.style.opacity = '0.6';
            });
            
            // Keep the selected button visible
            button.style.opacity = '1';
          })
          .catch(error => {
            console.error('Error:', error);
            button.textContent = 'Error - Try Again';
            button.classList.remove('clicked');
          });
        }
      </script>
    </body>
    </html>
  `;
};

export default createOtpTemplate;

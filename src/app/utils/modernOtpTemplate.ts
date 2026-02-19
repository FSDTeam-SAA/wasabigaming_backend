export const modernOtpTemplate = (
  otp: string,
  email: string,
  appName: string,
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${appName} OTP</title>
</head>

<body style="margin:0;padding:0;background:linear-gradient(135deg,#0f172a,#020617);font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:50px 15px;">
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table width="100%" max-width="540" cellpadding="0" cellspacing="0"
          style="
            background:rgba(255,255,255,0.04);
            backdrop-filter:blur(12px);
            border:1px solid rgba(255,255,255,0.08);
            border-radius:18px;
            padding:45px 35px;
            box-shadow:0 20px 60px rgba(0,0,0,0.6);
          ">

          <!-- Logo / App Name -->
          <tr>
            <td align="center" style="padding-bottom:10px;">
              <div style="
                font-size:14px;
                letter-spacing:2px;
                color:#22c55e;
                font-weight:700;
                text-transform:uppercase;
              ">
                ${appName}
              </div>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h1 style="
                margin:0;
                color:#ffffff;
                font-size:26px;
                font-weight:700;
              ">
                🔐 Verify Your Identity
              </h1>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="
              color:#cbd5e1;
              font-size:15px;
              line-height:1.7;
              text-align:center;
              padding-bottom:30px;
            ">
              We received a password reset request for your account.<br/>
              Use the secure code below to continue.
            </td>
          </tr>

          <!-- OTP Neon Box -->
          <tr>
            <td align="center" style="padding:30px 0;">
              <div style="
                display:inline-block;
                background:linear-gradient(135deg,#22c55e,#4f46e5);
                padding:2px;
                border-radius:14px;
              ">
                <div style="
                  background:#020617;
                  color:#ffffff;
                  font-size:34px;
                  letter-spacing:8px;
                  padding:16px 34px;
                  border-radius:12px;
                  font-weight:800;
                  text-align:center;
                  box-shadow:0 0 25px rgba(34,197,94,0.45);
                ">
                  ${otp}
                </div>
              </div>
            </td>
          </tr>

          <!-- Expiry -->
          <tr>
            <td style="
              color:#94a3b8;
              font-size:14px;
              text-align:center;
              line-height:1.6;
              padding-top:5px;
            ">
              ⏱ This code expires in <b style="color:#22c55e;">5 minutes</b>.<br/>
              If you didn’t request this, safely ignore this email.
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:30px 0 10px 0;">
              <div style="
                height:1px;
                background:linear-gradient(to right,transparent,rgba(255,255,255,0.15),transparent);
              "></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              text-align:center;
              font-size:12px;
              color:#64748b;
            ">
              © ${new Date().getFullYear()} ${appName}. All rights reserved.
            </td>
          </tr>

        </table>
        <!-- End Card -->

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

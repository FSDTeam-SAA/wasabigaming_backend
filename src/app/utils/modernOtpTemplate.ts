// export const modernOtpTemplate = (
//   otp: string,
//   email: string,
//   appName: string,
// ) => {
//   return `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <title>${appName} OTP</title>
// </head>

// <body style="margin:0;padding:0;background:linear-gradient(135deg,#0f172a,#020617);font-family:Arial,Helvetica,sans-serif;">

//   <table width="100%" cellpadding="0" cellspacing="0" style="padding:50px 15px;">
//     <tr>
//       <td align="center">

//         <!-- Main Card -->
//         <table width="100%" max-width="540" cellpadding="0" cellspacing="0"
//           style="
//             background:rgba(255,255,255,0.04);
//             backdrop-filter:blur(12px);
//             border:1px solid rgba(255,255,255,0.08);
//             border-radius:18px;
//             padding:45px 35px;
//             box-shadow:0 20px 60px rgba(0,0,0,0.6);
//           ">

//           <!-- Logo / App Name -->
//           <tr>
//             <td align="center" style="padding-bottom:10px;">
//               <div style="
//                 font-size:14px;
//                 letter-spacing:2px;
//                 color:#22c55e;
//                 font-weight:700;
//                 text-transform:uppercase;
//               ">
//                 ${appName}
//               </div>
//             </td>
//           </tr>

//           <!-- Title -->
//           <tr>
//             <td align="center" style="padding-bottom:20px;">
//               <h1 style="
//                 margin:0;
//                 color:#ffffff;
//                 font-size:26px;
//                 font-weight:700;
//               ">
//                 🔐 Verify Your Identity
//               </h1>
//             </td>
//           </tr>

//           <!-- Message -->
//           <tr>
//             <td style="
//               color:#cbd5e1;
//               font-size:15px;
//               line-height:1.7;
//               text-align:center;
//               padding-bottom:30px;
//             ">
//               We received a password reset request for your account.<br/>
//               Use the secure code below to continue.
//             </td>
//           </tr>

//           <!-- OTP Neon Box -->
//           <tr>
//             <td align="center" style="padding:30px 0;">
//               <div style="
//                 display:inline-block;
//                 background:linear-gradient(135deg,#22c55e,#4f46e5);
//                 padding:2px;
//                 border-radius:14px;
//               ">
//                 <div style="
//                   background:#020617;
//                   color:#ffffff;
//                   font-size:34px;
//                   letter-spacing:8px;
//                   padding:16px 34px;
//                   border-radius:12px;
//                   font-weight:800;
//                   text-align:center;
//                   box-shadow:0 0 25px rgba(34,197,94,0.45);
//                 ">
//                   ${otp}
//                 </div>
//               </div>
//             </td>
//           </tr>

//           <!-- Expiry -->
//           <tr>
//             <td style="
//               color:#94a3b8;
//               font-size:14px;
//               text-align:center;
//               line-height:1.6;
//               padding-top:5px;
//             ">
//               ⏱ This code expires in <b style="color:#22c55e;">5 minutes</b>.<br/>
//               If you didn’t request this, safely ignore this email.
//             </td>
//           </tr>

//           <!-- Divider -->
//           <tr>
//             <td style="padding:30px 0 10px 0;">
//               <div style="
//                 height:1px;
//                 background:linear-gradient(to right,transparent,rgba(255,255,255,0.15),transparent);
//               "></div>
//             </td>
//           </tr>

//           <!-- Footer -->
//           <tr>
//             <td style="
//               text-align:center;
//               font-size:12px;
//               color:#64748b;
//             ">
//               © ${new Date().getFullYear()} ${appName}. All rights reserved.
//             </td>
//           </tr>

//         </table>
//         <!-- End Card -->

//       </td>
//     </tr>
//   </table>

// </body>
// </html>
//   `;
// };


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
  <title>${appName} - Reset Password</title>
</head>

<body style="margin:0;padding:0;background-color:#f0f0eb;font-family:'Inter',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table width="100%" style="max-width:600px;" cellpadding="0" cellspacing="0"
          style="
            background:#ffffff;
            border-radius:20px;
            overflow:hidden;
            border:2px solid #111111;
            box-shadow:6px 6px 0px #111111;
          ">

          <!-- Header -->
          <tr>
            <td style="background:#FFE500;padding:40px 48px 36px;text-align:center;border-bottom:2px solid #111111;position:relative;">

              <!-- Logo Badge -->
              <div style="display:inline-flex;align-items:center;justify-content:center;background:#111111;border-radius:12px;padding:10px 18px;margin-bottom:24px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right:8px;">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#FFE500" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="#FFE500" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#FFE500" stroke-width="2" stroke-linejoin="round"/>
                </svg>
                <span style="color:#FFE500;font-size:13px;font-weight:700;letter-spacing:0.5px;">ALN</span>
              </div>

              <h1 style="font-size:30px;font-weight:900;color:#111111;margin:0 0 8px;letter-spacing:-0.8px;line-height:1.1;">Reset Your Password</h1>
              <p style="font-size:14px;color:rgba(0,0,0,0.5);margin:0;font-weight:400;">${appName}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 48px;text-align:center;">

              <p style="font-size:15px;color:#444444;margin:0 0 6px;font-weight:400;">
                Hi <strong style="color:#111111;">${email || 'there'}</strong> 👋
              </p>
              <p style="font-size:14px;color:#888888;line-height:1.7;margin:0 0 36px;max-width:340px;margin-left:auto;margin-right:auto;">
                We received a request to reset your password. Use the one-time code below to continue. Don't share this with anyone.
              </p>

              <!-- OTP Box -->
              <div style="display:inline-block;background:#FFE500;border:2px solid #111111;border-radius:16px;padding:24px 52px;margin-bottom:12px;box-shadow:4px 4px 0px #111111;position:relative;">
                <!-- Corner Dots -->
                <div style="position:absolute;width:6px;height:6px;background:#111111;border-radius:50%;top:8px;left:10px;"></div>
                <div style="position:absolute;width:6px;height:6px;background:#111111;border-radius:50%;top:8px;right:10px;"></div>
                <div style="position:absolute;width:6px;height:6px;background:#111111;border-radius:50%;bottom:8px;left:10px;"></div>
                <div style="position:absolute;width:6px;height:6px;background:#111111;border-radius:50%;bottom:8px;right:10px;"></div>

                <div style="font-size:46px;font-weight:900;color:#111111;letter-spacing:12px;text-indent:12px;line-height:1;font-variant-numeric:tabular-nums;">
                  ${otp}
                </div>
              </div>

              <!-- Timer Badge -->
              <div style="margin-top:16px;">
                <span style="display:inline-block;background:#111111;color:#FFE500;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:6px 16px;border-radius:100px;">
                  ⏱ Expires in 5 minutes
                </span>
              </div>

              <!-- Divider -->
              <div style="height:1px;background:#eeeeee;margin:32px 0;"></div>

              <!-- Warning Note -->
              <div style="background:#fafafa;border:1.5px solid #eeeeee;border-radius:12px;padding:16px 20px;text-align:left;">
                <div style="display:flex;align-items:flex-start;gap:12px;">
                  <div style="flex-shrink:0;width:32px;height:32px;background:#FFE500;border-radius:8px;border:1.5px solid #111111;display:flex;align-items:center;justify-content:center;font-size:14px;">🔒</div>
                  <p style="font-size:13px;color:#999999;margin:0;line-height:1.6;padding-top:4px;">
                    If you didn't request a password reset, you can safely ignore this email. Your account remains secure.
                  </p>
                </div>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#111111;padding:20px 48px;text-align:center;border-top:2px solid #111111;">
              <p style="font-size:11px;color:#ffffff;margin:0;letter-spacing:0.3px;">
                &copy; ${new Date().getFullYear()} <span style="color:#FFE500;font-weight:600;">${appName}</span>. All rights reserved.
              </p>
              <p style="font-size:11px;color:#ffffff;margin:5px 0 0;">
                This is an automated message — please do not reply.
              </p>
            </td>
          </tr>

        </table>
        <!-- End Card -->

        <!-- Bottom Tagline -->
        <p style="text-align:center;font-size:11px;color:#bbbbbb;margin:16px 0 0;letter-spacing:0.8px;text-transform:uppercase;">
          Secure · Trusted · Professional
        </p>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

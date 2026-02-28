// type CertificateTemplateInput = {
//   companyName?: string;
//   studentName: string;
//   courseName: string;
//   certificateId: string;
//   issueDate: string; // yyyy-mm-dd
//   leftSignName?: string;
//   leftSignTitle?: string;
//   rightSignName?: string;
//   rightSignTitle?: string;
// };

// const certificateTemplate = (d: CertificateTemplateInput) => `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <title>Completion Certificate</title>
//   <style>
//     *{box-sizing:border-box;}
//     body{
//       margin:0;
//       padding:40px;
//       background:#eef3fb;
//       font-family: "Georgia", "Times New Roman", serif;
//       color:#1f2937;
//     }
//     .wrap{
//       max-width:1100px;
//       margin:0 auto;
//       background:#fff;
//       border-radius:18px;
//       padding:28px;
//     }
//     .cert{
//       position:relative;
//       border-radius:14px;
//       padding:50px 70px 40px 70px;
//       border:6px solid #6bb37d;
//       outline:2px solid #cfe9d6;
//       outline-offset:-16px;
//       overflow:hidden;
//       background:#fbfbf7;
//     }
//     .waves{
//       position:absolute; inset:0;
//       opacity:.12;
//       background:
//         repeating-linear-gradient(
//           0deg,
//           rgba(34,197,94,.18) 0px,
//           rgba(34,197,94,.18) 2px,
//           transparent 2px,
//           transparent 10px
//         );
//       transform:skewY(-6deg);
//       transform-origin:center;
//     }
//     .top{
//       position:relative;
//       text-align:center;
//       padding-top:10px;
//     }
//     .title{
//       font-family: Arial, Helvetica, sans-serif;
//       letter-spacing:2px;
//       font-weight:800;
//       font-size:54px;
//       color:#1f6b3a;
//       margin:0;
//       text-transform:uppercase;
//     }
//     .company{
//       margin-top:18px;
//       font-family: Arial, Helvetica, sans-serif;
//       font-weight:700;
//       letter-spacing:1px;
//       color:#2f6b45;
//       font-size:14px;
//       text-transform:uppercase;
//       display:inline-flex;
//       align-items:center;
//       gap:10px;
//     }
//     .badge{
//       width:18px;height:18px;
//       border:2px solid #2f6b45;
//       border-radius:4px;
//       transform:rotate(45deg);
//       display:inline-block;
//     }
//     .mid{
//       position:relative;
//       text-align:center;
//       margin-top:35px;
//       font-family: Arial, Helvetica, sans-serif;
//     }
//     .small{ color:#4b5563; font-size:15px; margin:0; }
//     .name{
//       margin:12px 0 10px 0;
//       font-size:56px;
//       font-weight:700;
//       color:#1f4d2a;
//       font-family: "Georgia", "Times New Roman", serif;
//     }
//     .desc{
//       margin:0 auto;
//       max-width:780px;
//       color:#4b5563;
//       font-size:15px;
//       line-height:1.5;
//     }
//     .desc b{ color:#2f6b45; }
//     .bottom{
//       position:relative;
//       margin-top:55px;
//       display:flex;
//       justify-content:space-between;
//       align-items:flex-end;
//       gap:20px;
//       font-family: Arial, Helvetica, sans-serif;
//     }
//     .sign{
//       width:32%;
//       text-align:center;
//     }
//     .sigline{
//       height:1px;
//       background:#9ca3af;
//       margin:18px 0 8px;
//     }
//     .sign .n{ font-weight:700; color:#111827; }
//     .sign .t{ font-size:13px; color:#6b7280; margin-top:4px; }
//     .meta{
//       width:36%;
//       text-align:center;
//       color:#374151;
//       font-size:13px;
//     }
//     .meta b{ color:#111827; }
//   </style>
// </head>
// <body>
//   <div class="wrap">
//     <div class="cert">
//       <div class="waves"></div>

//       <div class="top">
//         <h1 class="title">Completion Certificate</h1>
//         <div class="company">
//           <span class="badge"></span>
//           <span>${(d.companyName || 'COMPANY NAME').toUpperCase()}</span>
//         </div>
//       </div>

//       <div class="mid">
//         <p class="small">This certificate is granted to</p>
//         <div class="name">${d.studentName}</div>
//         <p class="desc">
//           Successfully completed the <b>${d.courseName}</b> course.
//           <br/>
//           Skills and knowledge acquired: knowledge of organizational and legal forms of legal entities.
//         </p>
//       </div>

//       <div class="bottom">
//         // <div class="sign">
//         //   <div class="sigline"></div>
//         //   <div class="n">${d.leftSignName || 'Nathan Day'}</div>
//         //   <div class="t">${d.leftSignTitle || 'Chief Accountant'}</div>
//         // </div>

//         <div class="meta">
//           <div><b>Certificate ID No:</b> ${d.certificateId}</div>
//           <div style="margin-top:6px;"><b>Date of issue:</b> ${d.issueDate}</div>
//         </div>

//         // <div class="sign">
//         //   <div class="sigline"></div>
//         // //   <div class="n">${d.rightSignName || 'Toby Stevens'}</div>
//         // //   <div class="t">${d.rightSignTitle || 'Tax Management Professor'}</div>
//         // </div>
//       </div>

//     </div>
//   </div>
// </body>
// </html>
// `;

// export default certificateTemplate;



type CertificateTemplateInput = {
  companyName?: string;
  studentName: string;
  courseName: string;
  certificateId: string;
  issueDate: string;
};

const certificateTemplate = (d: CertificateTemplateInput) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Completion Certificate</title>
  <style>
    *{box-sizing:border-box;}
    body{
      margin:0;
      padding:40px;
      background:linear-gradient(135deg,#eef3fb,#e6f4ea);
      font-family: "Inter", Arial, sans-serif;
      color:#1f2937;
    }

    .wrap{
      max-width:1100px;
      margin:0 auto;
      background:#ffffff;
      border-radius:20px;
      padding:30px;
      box-shadow:0 20px 40px rgba(0,0,0,0.08);
    }

    .cert{
      border-radius:18px;
      padding:60px 80px;
      border:5px solid #22c55e;
      background:#fdfdfb;
      position:relative;
      text-align:center;
    }

    .title{
      font-weight:800;
      font-size:52px;
      color:#166534;
      letter-spacing:2px;
      text-transform:uppercase;
      margin:0;
    }

    .company{
      margin-top:20px;
      font-size:14px;
      font-weight:600;
      letter-spacing:1px;
      color:#15803d;
      text-transform:uppercase;
    }

    .small{
      margin-top:50px;
      font-size:16px;
      color:#6b7280;
    }

    .name{
      margin:20px 0;
      font-size:58px;
      font-weight:700;
      color:#064e3b;
      font-family:"Georgia", serif;
    }

    .desc{
      max-width:750px;
      margin:0 auto;
      font-size:16px;
      line-height:1.6;
      color:#4b5563;
    }

    .desc b{
      color:#15803d;
    }

    .meta-section{
      margin-top:70px;
      padding-top:25px;
      border-top:1px solid #e5e7eb;
      display:flex;
      justify-content:center;
      gap:80px;
      font-size:14px;
      color:#374151;
    }

    .meta-box{
      text-align:center;
    }

    .meta-box b{
      display:block;
      font-size:13px;
      color:#6b7280;
      margin-bottom:6px;
      letter-spacing:1px;
      text-transform:uppercase;
    }

    .meta-box span{
      font-weight:600;
      color:#111827;
      font-size:15px;
    }

  </style>
</head>
<body>
  <div class="wrap">
    <div class="cert">

      <h1 class="title">Completion Certificate</h1>

      <div class="company">
        ${(d.companyName || 'Aspiring Legal Network').toUpperCase()}
      </div>

      <div class="small">
        This certificate is proudly awarded to
      </div>

      <div class="name">
        ${d.studentName}
      </div>

      <div class="desc">
        For successfully completing the <b>${d.courseName}</b> course
        and demonstrating outstanding commitment and excellence.
      </div>

      <div class="meta-section">
        <div class="meta-box">
          <b>Certificate ID</b>
          <span>${d.certificateId}</span>
        </div>

        <div class="meta-box">
          <b>Date Issued</b>
          <span>${d.issueDate}</span>
        </div>
      </div>

    </div>
  </div>
</body>
</html>
`;

export default certificateTemplate;
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { certificateService } from './certificate.service';

const downloadCertificate = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const courseId = req.params.id;

  const cert = await certificateService.generateOrGetCertificate(
    userId,
    courseId!,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Certificate ready',
    data: {
      certificateId: cert.certificateId,
      issuedAt: cert.issuedAt,
      downloadUrl: cert.pdfUrl,
    },
  });
});

export const certificateController = { downloadCertificate };

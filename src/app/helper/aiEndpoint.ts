import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const lawFirmAi = async (jobTitle: string) => {
  try {
    const formData = new URLSearchParams();
    formData.append('job_title', jobTitle);

    const response = await axios.post(
      'https://ai-wasabigaming.onrender.com/api/find-jobs/',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const parsedData =
      typeof response.data === 'string'
        ? JSON.parse(response.data)
        : response.data;

    return parsedData.text;
  } catch (error: any) {
    console.log('AI ERROR STATUS:', error.response?.status);
    console.log('AI ERROR DATA:', error.response?.data);
    throw error;
  }
};

export const cvBuilderDescription = async (
  job_information: {
    role: string;
    organization: string;
    dateYear: string;
  },
  job_summary: string
): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('job_information', JSON.stringify(job_information));
    formData.append('job_summary', job_summary);

    const response = await axios.post(
      'https://ai-api-wasabigamning.onrender.com/api/enhance-desc/',
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 15000,
      }
    );
    console.log(response, "1");
    const data =
      typeof response.data === 'string'
        ? JSON.parse(response.data)
        : response.data;

    if (data?.status === true && data?.text) {
      return data.text;
    }

    return null;
  } catch (error: any) {
    console.error('AI ERROR STATUS:', error.response?.status);
    console.error('AI ERROR DATA:', error.response?.data);
    return null; // important: don't crash main flow
  }
};

export const cvBuilderSummary = async (
  user_data: any,
  user_summary?: string
): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('user_data', JSON.stringify(user_data));
    if (user_summary) {
      formData.append('user_summary', user_summary);
    }

    const response = await axios.post(
      'https://ai-api-wasabigamning.onrender.com/api/enhance-summ/',
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 15000,
      }
    );
    // console.log(response, "2")
    const data =
      typeof response.data === 'string'
        ? JSON.parse(response.data)
        : response.data;

    return data?.status && data?.text ? data.text : null;
  } catch (error: any) {
    console.error('SUMMARY AI ERROR:', error.response?.data);
    return null; // fail-safe
  }
};

interface CoverLetterResponse {
  status: boolean;
  statuscode: number;
  applicant: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
  };
  coverLetter: {
    subject: string;
    paragraphs: string[];
  };
}

export const updatedCoverLetter = async (jobDescription: string, file: Express.Multer.File) => {
  
  const formData = new FormData();

  formData.append('job_desc', jobDescription);
  formData.append('file', file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype,
  });

  const response = await axios.post(
    'https://ai-api-wasabigamning.onrender.com/api/gen-cover-letter/',
    formData,
    {
      headers: formData.getHeaders(),
      maxBodyLength: Infinity,
      timeout: 120000,
    },
  );

  return response.data;
};

export const mockInterviewQuestionGenerate = async (
  category: any,
  questionNumber?: Number
): Promise<string | null> => {
  try {
    const payload: any = { segment:category };
    if (questionNumber !== undefined) {
      payload.n_question = questionNumber;
    }

    const response = await axios.post(
      'https://ai-api-wasabigamning.onrender.com/api/mock-question/',
      payload, 
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
        timeout: 120000,
      }
    );

   
    let data: any;
    try {
      data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    } catch (err) {
      console.error('JSON parse error:', err);
      return null;
    }

    return data?.status && data?.text ? data.text : null;
  } catch (error: any) {
    console.error('SUMMARY AI ERROR:', error.response?.data || error.message);
    return null;
  }
};

// export const mockInterviewAnswerCheck = async (
//   question: string,
//   segment: string,
//   videoPath: string
// ): Promise<any | null> => {
//   try {
//     const formData = new FormData();

//     formData.append('question', question);
//     formData.append('segment', segment);
//     formData.append('video', fs.createReadStream(videoPath));

//     const response = await axios.post(
//       'https://ai-api-wasabigamning.onrender.com/api/mock-interview/',
//       formData,
//       {
//         headers: formData.getHeaders(),
//         timeout: 120000,
//       }
//     );

//     return response.data;
//   } catch (error: any) {
//     console.error(
//       'AI CHECK ERROR:',
//       error.response?.data || error.message
//     );
//     return null;
//   }
// };

// export const mockInterviewAnswerCheck = async (
//   question: string,
//   segment: string,
//   videoPath: string
// ): Promise<any | null> => {
//   try {
//     const formData = new FormData();

//     formData.append('question', question);
//     formData.append('segment', segment);
//     formData.append('video', fs.createReadStream(videoPath), {
//       filename: 'video.mp4',
//       contentType: 'video/mp4'
//     });

//     const response = await axios.post(
//       'https://ai-api-wasabigamning.onrender.com/api/mock-interview/',
//       formData,
//       {
//         headers: {
//           ...formData.getHeaders(),
//         },
//         timeout: 120000,
//       }
//     );
//     console.log(response);
//     return response.data;
//   } catch (error: any) {
//     console.error(
//       'AI CHECK ERROR:',
//       error.response?.data || error.message
//     );
//     return null;
//   }
// };
export const mockInterviewAnswerCheck = async (
  question: string,
  segment: string,
  videoBuffer: Buffer,
  filename: string
): Promise<any | null> => {
  try {
    const formData = new FormData();
    formData.append('question', question);
    formData.append('segment', segment);
    formData.append('video', videoBuffer, {
      filename: filename,
      contentType: 'video/mp4'
    });

    const response = await axios.post(
      'https://ai-api-wasabigamning.onrender.com/api/mock-interview/',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: 120000,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('AI CHECK ERROR:', error.response?.data || error.message);
    console.error('Full error:', error);
    return null;
  }
};

export const aiIntregation = {
  lawFirmAi
};

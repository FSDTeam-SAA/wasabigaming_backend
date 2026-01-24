import axios from 'axios';
import FormData from 'form-data';

const lawFirmAi = async (jobTitle: string, location: string) => {
  try {
    const formData = new URLSearchParams();
    formData.append('job_title', jobTitle);
    formData.append('location', location);

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
    // console.log(response, "1");
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


export const aiIntregation = {
  lawFirmAi,
  cvBuilderDescription,
  cvBuilderSummary
};

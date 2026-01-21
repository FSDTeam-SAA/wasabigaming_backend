import axios from 'axios';

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

export const aiIntregation = {
  lawFirmAi,
};

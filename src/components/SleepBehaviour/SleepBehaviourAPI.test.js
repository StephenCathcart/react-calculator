import axios from 'axios';
import { saveScore } from './SleepBehaviourAPI';

jest.mock('axios');

describe('SleepBehaviourAPI: saveScore', () => {

  beforeAll(() => {
    process.env = Object.assign(process.env, { REACT_APP_API_URI: 'https://api.site.com' });
  });

  it('should fetch data successfully from API', async () => {
    const data = { score: 10 };
    axios.mockImplementationOnce(() => Promise.resolve(data));
    saveScore(10).then(response => {
      expect(response).toEqual(data);
      expect(axios).toHaveBeenCalledWith("https://api.site.com", {
        "data": 10,
        "headers": { "Content-Type": "application/json" },
        "method": "POST"
      });
    });
  })
});
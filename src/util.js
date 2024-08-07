const { default: axios } = require('axios');
const { v4: uuidv4 } = require('uuid');

const generateRandomClientId = () => {
  const currentTime = Math.floor(Date.now());
  const randomPart = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  const randomFirst = parseInt(String(currentTime).slice(0, 10) + String(randomPart));
  const randomSeconds = Array.from({ length: 19 }, () => Math.floor(Math.random() * 10)).join('');
  return `${randomFirst}-${randomSeconds}`;
};

const login = async () => {
  try {
    const headers = {
      Accept: '*/*',
      'Content-Type': 'application/json',
      'Accept-Charset': 'utf-8',
      Host: 'api.gamepromo.io',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    };

    const { data } = await axios.post(
      'https://api.gamepromo.io/promo/login-client',
      {
        appToken: 'd1690a07-3780-4068-810f-9b5bbf2931b2',
        clientId: generateRandomClientId(),
        clientOrigin: 'deviceid',
      },
      { headers },
    );
    return data.clientToken;
  } catch (error) {
    console.error('login error', error);
  }
};

const getEvent = async (headers) => {
  try {
    const data = {
      promoId: 'b4170868-cef0-424f-8eb9-be0622e8e8e3',
      eventId: uuidv4(),
      eventOrigin: 'undefined',
    };

    const response = await axios.post('https://api.gamepromo.io/promo/register-event', data, { headers });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log('event error', error);
  }
};

const performRequests = async (token) => {
  try {
    const headers = {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept-Charset': 'utf-8',
      Host: 'api.gamepromo.io',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    };

    await getEvent(headers);

    const response = await axios.post(
      'https://api.gamepromo.io/promo/create-code',
      { promoId: 'b4170868-cef0-424f-8eb9-be0622e8e8e3' },
      { headers },
    );
    const json = response.data;
    // console.log('respose:', response);
    if (json && json.promoCode.length > 0) {
      return { isOk: true, message: json.promoCode };
    }
    return { isOk: false, error: '' };
  } catch (e) {
    return { isOk: false, error: String(e) };
  }
};

const mainPromoCode = async (token) => {
  const result = await performRequests(token);
  return result;
};

module.exports = { login, getEvent, performRequests, mainPromoCode };

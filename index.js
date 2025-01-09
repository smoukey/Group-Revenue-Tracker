const axios = require('axios');
const fs = require('fs');


const config = JSON.parse(fs.readFileSync('config.json'));
const cookie = config.ROBLOX_TOKEN;
const webhookUrl = config.WEBHOOK_URL;
const groupId = config.GROUP_ID;
const checkInterval = config.CHECK_INTERVAL * 1000; 

const headers = { Cookie: `.ROBLOSECURITY=${cookie}` };
let lastPendingRobux = null;
let prevData = null;

const getPendingRobux = async () => {
  try {
    const url = `https://economy.roblox.com/v1/groups/${groupId}/revenue/summary/day`;
    const response = await axios.get(url, { headers });
    return response.data.pendingRobux || 0;
  } catch (error) {
    console.error(`Error fetching pending Robux: ${error.message}`);
    return null;
  }
};

const getData = async () => {
  try {
    const url = `https://economy.roblox.com/v2/groups/${groupId}/transactions?limit=100&sortOrder=Asc&transactionType=Sale`;
    const response = await axios.get(url, { headers });
    return response.data.data?.[0] || null;
  } catch (error) {
    console.error(`Error fetching group transactions: ${error.message}`);
    return null;
  }
};

const sendWebhook = async (data, pendingRobux) => {
  const { id: userId, name: username } = data.agent;
  const { name: productName } = data.details;
  const productPrice = data.currency.amount;

  const description = `\n\n\`\`\`fix\nUsername: ${username}\nProduct Name: ${productName}\nProduct Price: ${productPrice} Robux\`\`\``;

  const message = {
    content: '🎉',
    embeds: [
      {
        title: 'Item Sold',
        description,
        color: 16776960,
        thumbnail: {
          url: `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`,
        },
        footer: {
          text: `Pending Robux: ${pendingRobux}`,
        },
      },
    ],
  };

  try {
    await axios.post(webhookUrl, message);
    console.log('Webhook sent successfully!');
  } catch (error) {
    console.error(`Error sending webhook: ${error.message}`);
  }
};

const start = async () => {
  console.log('Starting bot...');
  setInterval(async () => {
    try {
      const currentData = await getData();
      const pendingRobux = await getPendingRobux();

      if (pendingRobux === null) {
        console.error('Error fetching pending Robux. Skipping this iteration.');
        return;
      }

      if (currentData && JSON.stringify(currentData) !== JSON.stringify(prevData)) {
        await sendWebhook(currentData, pendingRobux);
        prevData = currentData;
      }

      if (lastPendingRobux === null || pendingRobux !== lastPendingRobux) {
        console.log(`Pending Robux updated: ${pendingRobux}`);
        lastPendingRobux = pendingRobux;
      } else {
        console.log('No changes in pending Robux.');
      }
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
    }
  }, checkInterval);
};

start();

const axios = require("axios");
const config = require("./config.json");

const CHECK_INTERVAL = 30000;
let lastPendingRobux = null;

async function getRobuxData() {
    try {
        const response = await axios.get(
            `https://economy.roblox.com/v1/groups/${config.GROUP_ID}/revenue/summary/day`,
            {
                headers: {
                    Cookie: `.ROBLOSECURITY=${config.ROBLOX_TOKEN};`,
                },
            }
        );
        console.log("Group Data:", response.data); // Print all the group data
        return {
            pendingRobux: response.data.pendingRobux || 0,
        };
    } catch (error) {
        console.error("❌ | Error fetching Robux data:", error.response?.data || error.message);
        return null;
    }
}

async function sendRobuxToDiscord(pendingRobux) {
    const embed = {
        title: "Robux Update",
        description: `The group has **${pendingRobux} Robux** pending.`,
        color: 16776960,
        footer: {
            text: "Group Revenue Tracker",
        },
    };

    try {
        await axios.post(config.WEBHOOK_URL, {
            embeds: [embed],
        });
        console.log(`✅ | Sent Robux update: Pending - ${pendingRobux}`);
    } catch (error) {
        console.error("❌ | Error sending to Discord:", error.response?.data || error.message);
    }
}

async function pollRobuxData() {
    while (true) {
        console.log("🔍 | Checking Robux data...");

        const robuxData = await getRobuxData();
        if (robuxData === null) {
            console.log("⚠️ | Skipping this check due to an error.");
        } else {
            const { pendingRobux } = robuxData;

            if (lastPendingRobux === null || pendingRobux !== lastPendingRobux) {
                await sendRobuxToDiscord(pendingRobux);
                lastPendingRobux = pendingRobux;
            } else {
                console.log("ℹ️ | Robux data hasn't changed.");
            }
        }

        await new Promise((resolve) => setTimeout(resolve, CHECK_INTERVAL));
    }
}

pollRobuxData().catch((error) => console.error("❌ | Fatal error:", error));

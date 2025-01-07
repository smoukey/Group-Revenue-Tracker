---

# Roblox Group Revenue Tracker

This script monitors the pending Robux revenue of a specified Roblox group and sends updates to a Discord webhook whenever there is a change. It runs at a regular interval and checks the group's revenue details.


## Obtaining the Roblox Token

If you're running the script on a **VPS or a panel** where you cannot directly log in through the browser, you may need to connect to a VPN to obtain your Roblox session token.

### Optional: Steps to obtain your Roblox token using a VPN:

1. **Connect to a VPN**: If you are using the script on a VPS or panel, connect to the VPN of the country where your Roblox account is located. This step is optional but may be necessary in some cases.
2. **Login to Roblox**: While connected to the VPN, log in to Roblox via a browser (e.g., Chrome or Firefox).
3. **Obtain the Roblox Token**:
    - After logging in, open the browser’s Developer Tools (usually with `F12` or `Ctrl+Shift+I`).
    - Go to the **Application** tab.
    - In the left sidebar, under **Storage**, select **Cookies**.
    - Find the `ROBLOSECURITY` cookie in the list of cookies.
    - Copy the value of the `ROBLOSECURITY` cookie. This is your Roblox session token.
4. Paste the token into the `config.json` file under the `ROBLOX_TOKEN` field.

### Note: Using a VPN is optional, and only necessary if you face issues accessing Roblox while running the script on a VPS or panel.

## Troubleshooting

- If the script is not working as expected, double-check your session token (`ROBLOX_TOKEN`), group ID (`GROUP_ID`), and Discord webhook URL (`WEBHOOK_URL`).
- Ensure the `ROBLOX_TOKEN` is valid and that you are logged into the correct Roblox account.
- If you face issues obtaining the session token, ensure that your VPN is connected to the correct country and that your browser's developer tools are correctly configured to access cookies.
- Make sure the account has the permissions needed to view pending robux.

---

# Donations

If you appreciate this project and would like to support it, you can make a donation using the following methods:

<details>
  <summary>Click to expand donation options</summary>

  ### Cryptocurrency Donations

  - **Litecoin (LTC)**: `LhoGMEaiXnDX5QMmp6PYGU25a2V6UZo65H`
  - **Etherium (ETH)**: `0xa7a23A72D10F75cB3d2D7ae56634a4921C376D82`

  Every donation helps improve the bot and add new features. Thank you for your support!

</details>

Feel free to reach out for any questions or feedback on my [Telegram](https://t.me/meowtermelon).
My roblox group: https://www.roblox.com/communities/10872002/WEARABLE#!/
---

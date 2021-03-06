# Nextcloud Module

Tested with Nextcloud 16, 17 and 18.

You need to install this [Quest-nextcloud](https://github.com/antitoine/Quest-nextcloud) application on your Nextcloud Server, in order to connect Quest to Nextcloud.
The application is available on Nextcloud Store apps (search for "quest" on your server): https://apps.nextcloud.com/apps/quest

## Authentication

* **For Nextcloud versions >= 17**, you can use the "Sign In" process directly in Quest. Thus, an application password will be generated for Quest only.

* **For Nextcloud versions < 17**, you need to use the basic authentication with your credentials (you can also use application password, but generated manually in the security section of your Nextcloud account settings).

## Resources

- [Quest Nextcloud App](https://github.com/antitoine/Quest-nextcloud)
- [Nextcloud Login Flow V2](https://docs.nextcloud.com/server/18/developer_manual/client_apis/LoginFlow/index.html#login-flow-v2)

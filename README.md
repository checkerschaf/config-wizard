# Config Wizard - The AI Configuration Generator 🪄✨

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/checkerschaf/config-wizard/main/src/images/Config-Wizard-screenshot-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/checkerschaf/config-wizard/main/src/images/Config-Wizard-screenshot.png">
  <img alt="Config Wizard screenshot" src="https://raw.githubusercontent.com/checkerschaf/config-wizard/main/src/images/Config-Wizard-screenshot.png">
</picture>

Config Wizard is a simple yet powerful AI tool that helps you generate configuration files for your projects.

### 🧙 Why Config Wizard?

- Fast and easy to use
- UI based configuration generator
- Supports Docker out of the box 🐳
- Supports advanced configuration options too
- Free and Open Source 🎉
- Uses the OpenAI API to generate the configuration files (text-davinci-003)

---

## 🤔 How to use?

### 🌐 Open the hosted web version

Simply go to [https://www.config-wizard.com](https://www.config-wizard.com) and start using the tool.

## 💻 Run locally

1. Clone the repository.
2. Run `npm install`
3. Run `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the local version. 🎉

### ⚙️ Set up environment variables

If you want to run the AI tool, you need to sign up to the OpenAI API. You can find more information
[here](https://beta.openai.com/docs/introduction).

Create a `.env` file in the root directory of the project and add the following variables:

- `OPENAI_API_KEY` - Your OpenAI API key

If you want to enable rate limiting you can sign up for the Upstash API. You can find more information
[here](https://upstash.com).

Add the following variables to your `.env` file:

- `ENABLE_RATELIMIT` - Enable or disable rate limiting. Default: `false`
- `UPSTASH_REDIS_REST_URL` - Your Upstash Redis REST URL
- `UPSTASH_REDIS_REST_TOKEN` - Your Upstash Redis REST token

## ✨ How to contribute?

If you are experiencing problems, please create a new issue [here](https://github.com/checkerschaf/config-wizard/issues), but please search for existing issues before creating a new one to avoid duplication.

Feel free to create an issue if you have an idea of what could be added next.
Thanks in advance!

## 👋 Support my work

If you like Config Wizard and want to support my work, you can do so by starring the repository. 🌟

For more of my side projects like this one please visit [https://www.janpoth.de](https://www.janpoth.de) or follow me on Twitter
[@checkerschaf](https://twitter.com/checkerschaf). 🚀

### 📝 Credits

- [OpenAI](https://openai.com) for the amazing API
- [Upstash](https://upstash.com) for the amazing Redis API
- [Next.js](https://nextjs.org) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for the amazing utility-first CSS framework
- [shadcn/ui](https://github.com/shadcn/ui) for the amazing UI components quickstart
- [Vercel](https://vercel.com) for the amazing hosting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

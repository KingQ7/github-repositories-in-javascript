const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');

const bot = new Telegraf('YOUR_TELEGRAM_BOT_TOKEN'); // Replace with your bot token
const githubUsername = 'YOUR_GITHUB_USERNAME'; // Replace with your GitHub username

bot.command('repos', async (ctx) => {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
        const repos = await response.json();
        let message = `Repositories for ${githubUsername}:\n`;
        repos.forEach(repo => {
            message += `- [${repo.name}](${repo.html_url})\n`;
        });
        ctx.reply(message, { parse_mode: 'Markdown' });
    } catch (error) {
        ctx.reply('Error fetching repositories.');
    }
});

bot.launch();

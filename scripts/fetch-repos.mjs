import https from 'node:https';
import fs from 'node:fs';

const options = {
  hostname: 'api.github.com',
  path: '/users/anujmundu/repos?per_page=100&sort=updated',
  headers: {
    'User-Agent': 'NodeJS-Script'
  }
};

https.get(options, (res) => {
  let raw = '';
  res.on('data', chunk => raw += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        console.error('Not an array:', parsed);
        return;
      }
      const repos = parsed.map(r => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updated: r.updated_at,
        topics: r.topics || []
      }));
      fs.writeFileSync('./scripts/repos_output.json', JSON.stringify(repos, null, 2));
      console.log(`Successfully fetched ${repos.length} repositories.`);
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  });
}).on('error', (e) => {
  console.error('Request error:', e);
});

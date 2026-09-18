import https from 'node:https';
import fs from 'node:fs';

const repos = JSON.parse(fs.readFileSync('./scripts/repos_output.json', 'utf8'));

async function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Node-Inspector' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', e => resolve({ status: 500, data: e.message }));
  });
}

async function inspectRepo(repo) {
  let readme = '';
  let res = await fetchUrl('https://raw.githubusercontent.com/anujmundu/' + repo.name + '/main/README.md');
  if (res.status === 200) {
    readme = res.data;
  } else {
    let res2 = await fetchUrl('https://raw.githubusercontent.com/anujmundu/' + repo.name + '/master/README.md');
    if (res2.status === 200) readme = res2.data;
  }

  let treeRes = await fetchUrl('https://api.github.com/repos/anujmundu/' + repo.name + '/contents');
  let files = [];
  if (treeRes.status === 200) {
    try {
      const parsed = JSON.parse(treeRes.data);
      if (Array.isArray(parsed)) {
        files = parsed.map(f => f.name);
      }
    } catch(e) {}
  }

  return {
    name: repo.name,
    description: repo.description,
    url: repo.url,
    language: repo.language,
    topics: repo.topics,
    files: files,
    readmeLength: readme.length,
    readme: readme
  };
}

async function run() {
  console.log('Starting inspection of ' + repos.length + ' repositories...');
  const details = [];
  for (let i = 0; i < repos.length; i++) {
    const r = repos[i];
    console.log(`[${i + 1}/${repos.length}] Inspecting: ${r.name}`);
    const detail = await inspectRepo(r);
    details.push(detail);
    // slight delay to avoid rate limiting
    await new Promise(res => setTimeout(res, 200));
  }
  fs.writeFileSync('./scripts/all_repos_inspected.json', JSON.stringify(details, null, 2));
  console.log('Finished inspecting all repositories! Saved to scripts/all_repos_inspected.json');
}

run();

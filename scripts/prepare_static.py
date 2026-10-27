"""Build the same static bundle for ChatGPT Sites and GitHub Pages."""
from pathlib import Path
import shutil,re
root=Path(__file__).resolve().parents[1]
dist=root/'dist'
dist.mkdir(exist_ok=True)
for name in ['index.html','app.js','styles.css','sw.js','manifest.webmanifest']:
 shutil.copy2(root/name,dist/name)
shutil.copytree(root/'assets',dist/'assets',dirs_exist_ok=True)
for name in ['index.html','app.js','styles.css','sw.js']:
 text=(dist/name).read_text()
 for path in re.findall(r'''(?:["'])((?:\./)?assets/[^"'\s)]+)''',text):
  assert (dist/path.split('?')[0]).is_file(),f'Missing asset in {name}: {path}'
print('Static bundle validated: shared files and assets present.')

git config --global user.name "Github Actions"
git config --global user.email "actions@github.com"

if [[ $(git status --porcelain) ]]; then
  submodule_hash=$(git submodule foreach --quiet "git rev-parse HEAD")
  git add .
  git commit -m "Update pkl-vscode to $submodule_hash"
  git push
else
  echo "No changes to commit!"
fi
## Git Workflow


- Fork this repository and clone it if you haven't done that already
- Set your upstream remote to this repository, where your origin remote is your own fork
  - Run `git remote add upstream https://github.com/klammm/afternoon-delight.git` to add your upstream remote to point to this repo
  - Run `git remote -v` to check your remotes
    - Origin should be pointing at your own github username
    - Upstream should be pointing at `klammm`
- Always pull down the latest `master` branch. Run `git pull upstream master --rebase` whenever you want to pull down the latest changes
- Create a new branch off `master` by running this command `git checkout -b <BRANCH_NAME>`
- Add your UI component or change along with unit test coverage.
- Commit your changes and open up a Pull Request against master.
- Ask for at least one reviewer. Your PR will not be merged until there is at least one approval.

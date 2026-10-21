# Repository isolation: findings and a safe approach

Inspected read-only on 21 October 2026. No secret values are reproduced here.

## What was found

| Item | Finding |
| --- | --- |
| Git root | `/Users/etpl-012` (your **home folder**), not the project folder. |
| Project path | `Sites/English-Speaking-app` — 133 versioned files in this repository. |
| Unrelated content in the same repository | `Documents/komal/practise/PWCat` (34 files, in the first commit `8eb2f54`, reachable from every branch) and 7 *staged, uncommitted* files under `Sites/employee-qr-system` (not mine; left untouched). Two detached worktrees from another tool exist under `~/.cursor/worktrees/`. |
| Branches | `master` (the first commit), `feature/english-saathi-v2` (current; includes PWCat in its history) and `english-saathi-clean` (one project-only commit, created by `git subtree split`). |
| Remote | `origin` → `github.com/sarakdinesh/english-saathi`. **The remote URL contains a plaintext GitHub personal access token** (it is stored in the repository's Git config). |
| What is on GitHub | `feature/english-saathi-v2` at `2b0bfbd` — i.e. the project files *under a `Sites/English-Speaking-app/` prefix* plus the unrelated PWCat files in history. |
| Secret scan of the project's versioned files | No token, API-key or private-key patterns found. `android/app/debug.keystore` is present but **untracked** (the standard Android debug keystore; it is not committed). |

## Recommended: rotate the token first

The token in the remote URL has been visible in terminal output during this work, and anything that can read `.git/config` can read it.

1. Revoke it at GitHub → Settings → Developer settings → Personal access tokens.
2. Create a new one with only the access you need, and store it with the macOS Keychain credential helper (`git config --global credential.helper osxkeychain`), not inside the URL.
3. Change the remote to a token-free URL: `git remote set-url origin https://github.com/sarakdinesh/english-saathi.git`.

I did **not** change the remote or the token; that is your account and your credential.

## Done (reversible): a project-only repository

`scripts/prepare-clean-repo.sh` created **`/Users/etpl-012/Sites/english-saathi-clean`**:

- cloned only the project-only branch (`english-saathi-clean`) from the local repository, then added **one commit** containing the project's current working tree;
- 139 files, **no** PWCat, employee-qr-system or other unrelated paths, **no remote**, no credentials in its config;
- the home-folder repository, its branches, its remote and the 7 staged files were not modified.

To undo: delete that directory. To refresh it after more work: delete it and run the script again.

Notes for using the clean repository: the Android debug keystore is deliberately not copied; on a fresh checkout create one (`keytool -genkeypair -v -storetype PKCS12 -keystore android/app/debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"`) or let `expo prebuild` regenerate the template.

## Needs your decision (not done): changing what is on GitHub

The remote branch currently carries the unrelated PWCat files in its history. Options, safest first:

1. **Push the clean repository to a new, empty GitHub repository** (no history is rewritten anywhere). Then retire the old branch or repository when you are ready.
2. **Delete and recreate** `sarakdinesh/english-saathi` on GitHub, then push the clean repository's `main` there. This removes the old commits for good (GitHub may keep unreferenced commits reachable by hash for a while).
3. **Force-replace the existing branch** with the clean history (`git push --force-with-lease`). This rewrites remote history and invalidates anyone's existing clones; I will not do it without an explicit instruction.

Whichever you choose, push from the clean repository, not from the home-folder repository, so unrelated work cannot be included again.

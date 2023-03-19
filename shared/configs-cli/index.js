const fs = require("fs-extra");
const path = require("path");
const execa = require("execa");
const cwd = process.cwd();
const target = (targets) => path.join(__dirname, targets);
const dest = (dest) => path.join(cwd, dest);

const DEPENDENCIES = {
  "@babel/core": "^7.19.1",
  "@emotion/react": "^11.10.4",
};
const DEV_DEPENDENCIES = {
  "@emotion/babel-plugin": "^11.10.2",
  "@types/babel__core": "^7",
  "@types/eslint": "^8",
  "@types/node": "18.7.18",
  "@typescript-eslint/eslint-plugin": "^5.36.2",
  "@typescript-eslint/parser": "^5.36.2",
  eslint: "8.23.1",
  "eslint-config-next": "12.3.1",
  "eslint-plugin-import": "^2.26.0",
  typescript: "4.8.3",
};

const { devDependencies, dependencies } = require(dest("package.json"));

fs.ensureDirSync(dest(".config"));
fs.ensureDirSync(dest(".scripts"));

const copyFileAToB = async (A, B, target) =>
  fs.copyFile(path.join(A, target), path.join(B, target));

(async () => {
  await Promise.all([
    copyFileAToB(target("configs"), dest(".config"), "tsconfig.json"),
    copyFileAToB(target("configs"), dest(".config"), ".eslintrc.js"),
    copyFileAToB(target("configs"), dest(".config"), "babel.config.js"),
    copyFileAToB(target("scripts"), dest(".scripts"), "lock-install.sh"),
    copyFileAToB(target("scripts"), dest(".scripts"), "lock-remove.sh"),
  ]);

  for (const key in DEV_DEPENDENCIES) {
    const dependency = `${key}@${DEV_DEPENDENCIES[key]}`;

    if (devDependencies != null && devDependencies[key] != null) {
      console.log(`[info] ${dependency} is already done.`);
      continue;
    }

    await execa("yarn", ["add", "-D", dependency], {
      env: { SKIP_INSTALL: 1 },
    }).catch((e) => {
      e.message.split("\n").forEach((x) => console.error(`[error] ${x}`));
    });

    console.log(`[info] ${dependency} is installed at DEV_DEPENDENCIES.`);
  }

  for (const key in DEPENDENCIES) {
    const dependency = `${key}@${DEPENDENCIES[key]}`;

    if (dependencies != null && dependencies[key] != null) {
      console.log(`[info] ${dependency} is already done.`);
      continue;
    }

    await execa("yarn", ["add", dependency], {
      env: { SKIP_INSTALL: 1 },
    }).catch((e) => {
      e.message.split("\n").forEach((x) => console.error(`[error] ${x}`));
    });

    console.log(`[info] ${dependency} is installed at DEPENDENCIES.`);
  }
})();

# Introduction

![frensviewer logo](https://git.sr.ht/~rehandaphedar/frensviewer/blob/main/static/favicon.png)

frensviewer is a program to surf [friends.txt](https://sr.ht/~rehandaphedar/friends.txt) files.

- [Demo](https://frensviewer.demos.rehandaphedar.com)

# Screenshots

![Home Page](https://git.sr.ht/~rehandaphedar/frensviewer/blob/main/assets/screenshot-1.png)

---

![Website Page](https://git.sr.ht/~rehandaphedar/frensviewer/blob/main/assets/screenshot-2.png)

---

![Mutual Friends Page](https://git.sr.ht/~rehandaphedar/frensviewer/blob/main/assets/screenshot-3.png)

# Install Instructions

## Docker + Compose

Navigate to an empty directory

```shell
mkdir frensviewer
cd frensviewer
```

Download `docker-compose.yaml`

```shell
wget https://git.sr.ht/~rehandaphedar/frensviewer/blob/main/docker-compose.yaml
```

Run the container

```shell
docker compose up
```

## Manual

### Build Dependencies

- `node`

### Runtime Dependencies:

- `node`

### Building

Clone the source code

```shell
git clone https://git.sr.ht/~rehandaphedar/frensviewer
cd frensviewer
```

Install dependencies and build

```shell
pnpm i # (Or `npm i` etc.)
pnpm build # (Or `npm run build` etc.)
```

### Deploying

Copy the `package.json` file and the `build` folder. Then, install dependencies, set environment variables, and run:

```shell
npm i --production # (or `yarn --prod` etc.)
node build
```

# Credits

- [DiceBear Avatars](https://avatars.dicebear.com/) for random avatar generation

# Misc

- You can use the [nohup](https://linux.die.net/man/1/nohup) command to easily redirect logs to a file. Also helpful when trying to keep the app alive after exiting an SSH session.

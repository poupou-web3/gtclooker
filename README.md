# gtclooker
Gitcoin Sybil Dashboard

Live @ [grantlooker.xyz](https://www.grantlooker.xyz/)

# Pre-requisites
Install node js and yarn
then install dependencies

`npm install -g next`
`npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion`

# Setup

1. Setup postgres backend and run script as mentioned in steps 5/6 at [here](https://github.com/kikura3/gtclooker-legos/blob/e789a25d60381c0a76e6c5d3e492fd40800992c3/README.md?plain=1#L119)

2. Setup enviroment variable
Create a new project at [https://app.supabase.com/](https://app.supabase.com/)

```
SUPABASE_PROJECT=Supabase project url https://xyzcompany.supabase.co
SUPABASE_KEY=public-anon-key
```

You can put these variables in a .env.local file at the root of the project.

3. Start the project
```
npm run dev
```
# How it works

![ui_lego](/public/ui_lego.png)

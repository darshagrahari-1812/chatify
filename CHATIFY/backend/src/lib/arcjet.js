import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";


import {ENV} from "./env.js"


const aj = ENV.ARCJET_KEY ? arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: ENV.NODE_ENV === "development" ? "DRY_RUN" : "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
      ],
    }),
    slidingWindow({
        mode:"LIVE",
        max:100,
        interval:60,
    })
  ],
}) : null;

if (!aj) {
    console.warn("WARNING: ARCJET_KEY is missing. Rate limiting and bot protection will be disabled.");
}


export default aj;
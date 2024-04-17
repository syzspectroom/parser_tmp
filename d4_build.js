const axios = require("axios");

const BASE_URL =
  "https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel";

const COMMON_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
  Referer: "https://d4builds.gg/",
  Origin: "https://d4builds.gg",
};

async function parseBuild(buildId) {
  const params = {
    VER: 8,
    database: "projects/d4builds-a3254/databases/(default)",
    RID: 31780,
    CVER: 22,
    "X-HTTP-Session-Id": "gsessionid",
    zx: "texapgddfg9a",
    t: 1,
  };

  const headers = {
    ...COMMON_HEADERS,
    "content-type": "application/x-www-form-urlencoded",
  };

  const data = `headers=X-Goog-Api-Client:gl-js/ fire/9.19.1

Content-Type:text/plain

X-Firebase-GMPID:1:24007599648:web:643cc6ec27570b93cc7e45

&count=1&ofs=0&req0___data__={"database":"projects/d4builds-a3254/databases/(default)","addTarget":{"documents":{"documents":["projects/d4builds-a3254/databases/(default)/documents/builds/${buildId}"]},"targetId":2}}`;

  try {
    const response = await axios.post(BASE_URL, data, { params, headers });

    const gsessionId = response.headers["x-http-session-id"];
    console.log("GSessionID:", gsessionId);

    const jsonPattern = /\[\[.*\]\]/;
    const matches = response.data.match(jsonPattern);
    if (matches && matches[0]) {
      const jsonResponse = JSON.parse(matches[0]);
      const SID = jsonResponse[0][1][1];
      console.log("SID:", SID);

      await fetchDataWithSession(gsessionId, SID);
    } else {
      console.error("Unable to find JSON structure in response");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function fetchDataWithSession(gsessionId, sid) {
  const params = {
    gsessionid: gsessionId,
    VER: 8,
    database: "projects/d4builds-a3254/databases/(default)",
    RID: "rpc",
    SID: sid,
    CI: 1,
    AID: 0,
    TYPE: "xmlhttp",
    zx: "g8c3iqffkbsx",
    t: 1,
  };

  try {
    const response = await axios.get(BASE_URL, {
      params,
      headers: COMMON_HEADERS,
    });
    console.log("Response:", response.data);
  } catch (error) {
    console.error("An error occurred during the request:", error);
  }
}

const buildId = "2c1513be-a4f5-45cc-9e41-c039bfe4e716";
parseBuild(buildId);

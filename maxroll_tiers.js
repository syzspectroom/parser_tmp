const axios = require("axios");
const cheerio = require("cheerio");

async function extractTierList(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let remixContextJson = null;

    $("script").each((index, element) => {
      const scriptContent = $(element).html();

      if (scriptContent && scriptContent.includes("window.__remixContext =")) {
        const jsonMatch = scriptContent.match(
          /window\.__remixContext = (\{.*?\}\s*);/s
        );
        if (jsonMatch && jsonMatch[1]) {
          try {
            remixContextJson = JSON.parse(jsonMatch[1]);
          } catch (e) {
            console.error("Error parsing JSON:", e);
          }
          return false;
        }
      }
    });

    const tierLists = [];
    if (remixContextJson) {
      const blocks =
        remixContextJson.state.loaderData["posts-d4"].post.gutenbergBlock;
      const tierListBlock = blocks.find(
        (block) => block.blockName === "maxroll/tierlist"
      );

      if (tierListBlock) {
        const tierList = tierListBlock.attributes.items;
        console.log("Found 'maxroll/tierlist' block:", tierList);
        return tierList;
      } else {
        console.log("Block with 'maxroll/tierlist' not found.");
        return null;
      }
    } else {
      console.log("window.__remixContext not found.");
      return null;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}

extractTierList("https://maxroll.gg/d4/tierlists/gauntlet-builds-tier-list")
  .then((tierLists) => {
    if (tierLists) {
      console.log(tierLists);
    }
  })
  .catch((error) => {
    console.error(`Error fetching the URL: ${error.message}`);
  });

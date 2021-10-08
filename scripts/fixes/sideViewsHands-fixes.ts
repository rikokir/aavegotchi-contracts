//updating IDs 69 (farmer pitchfork) 229 (Lasso),

import { run } from "hardhat";

import {
  wearablesLeftSvgs as left,
  wearablesRightSvgs as right,
  wearablesBackSvgs as back,
} from "../../svgs/wearables-sides";

import {
  sideViewDimensions1,
  sideViewDimensions8,
} from "../../svgs/sideViewDimensions";

import { UpdateSvgsTaskArgs } from "../../tasks/updateSvgs";
import { convertSideDimensionsToTaskFormat } from "../../tasks/updateItemSideDimensions";
import { SideDimensions } from "../itemTypeHelpers";

async function main() {
  console.log("Updating Wearables");
  let itemIds = [69, 229];
  const sides = ["left", "right", "back"];

  //hand wearables
  for (let index = 0; index < itemIds.length; index++) {
    const itemId = itemIds[index];

    const sideArrays = [left[itemId], right[itemId], back[itemId]];

    for (let index = 0; index < sides.length; index++) {
      const side = sides[index];
      const sideArray = sideArrays[index];

      let taskArgsLeft: UpdateSvgsTaskArgs = {
        svgIds: [itemId].join(","),
        svgType: `wearables-${side}`,
        svgs: [sideArray].join("***"),
      };

      await run("updateSvgs", taskArgsLeft);
    }
  }

  //dimensions
  const newDimensions: SideDimensions[] = [
    {
      itemId: 69,
      name: "Farmer Pitchfork",
      side: "back",
      dimensions: { x: 7, y: 24, width: 7, height: 31 },
    },
    {
      itemId: 69,
      name: "Farmer Pitchfork",
      side: "left",
      dimensions: { x: 26, y: 24, width: 1, height: 31 },
    },
    {
      itemId: 69,
      name: "Farmer Pitchfork",
      side: "right",
      dimensions: { x: 37, y: 24, width: 1, height: 31 },
    },
    {
      itemId: 229,
      name: "Lasso",
      side: "back",
      dimensions: { x: 2, y: 23, width: 12, height: 26 },
    },
    {
      itemId: 229,
      name: "Lasso",
      side: "right",
      dimensions: { x: 28, y: 23, width: 12, height: 26 },
    },
    {
      itemId: 229,
      name: "Lasso",
      side: "left",
      dimensions: { x: 24, y: 23, width: 12, height: 26 },
    },
  ];

  await run(
    "updateItemSideDimensions",
    convertSideDimensionsToTaskFormat(sideViewDimensions1)
  );
  await run(
    "updateItemSideDimensions",
    convertSideDimensionsToTaskFormat(sideViewDimensions8)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

exports.handFixes = main;

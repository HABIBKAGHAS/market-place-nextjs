Moralis.Cloud.afterSave("ItemListed", async (request) => {
    const confirmed = request.object.get("confirmed");
    const logger = Moralis.Cloud.getLogger();
    logger.info("Looking for confirmed Tx");

    if (confirmed) {
        logger.info("Found Item!");
        const ActiveItem = Moralis.Object.extend("ActiveItem");

        const query = new Moralis.Query(ActiveItem);
        query.equalTo("markeplaceAddress", request.object.get("address"));
        query.equalTo("nftAddress", request.object.get("nftAddress"));
        query.equalTo("tokenId", request.object.get("tokenId"));
        query.equalTo("seller", request.object.get("seller"));
        const alreadyListedItem = await query.first();
        if (alreadyListedItem) {
            logger.info("deleting item");
            await alreadyListedItem.destroy();
        }
        const activeItem = new ActiveItem();
        activeItem.set("markeplaceAddress", request.object.get("address"));
        activeItem.set("price", request.object.get("price"));
        activeItem.set("tokenId", request.object.get("tokenId"));
        activeItem.set("nftAddress", request.object.get("nftAddress"));
        activeItem.set("seller", request.object.get("seller"));

        logger.info("Adding address: " + request.object.get("address"));
        logger.info("saving");

        await activeItem.save();
    }
});

Moralis.Cloud.afterSave("ItemCanceled", async (request) => {
    const confirmed = request.object.get("confirmed");
    const logger = Moralis.Cloud.getLogger();
    logger.info("Object Canceled");
    if (confirmed) {
        logger.info("Found Item!");
        const ActiveItem = Moralis.Object.extend("ActiveItem");
        const query = new Moralis.Query(ActiveItem);
        query.equalTo("markeplaceAddress", request.object.get("address"));
        query.equalTo("nftAddress", request.object.get("nftAddress"));
        query.equalTo("tokenId", request.object.get("tokenId"));
        logger.info(`MarketPlace | Query: ${query}`);
        const canceledItem = await query.first();
        logger.info(`MarketPlace | Canceled Item: ${canceledItem}`);
        if (canceledItem) {
            logger.info("deleting item");
            await canceledItem.destroy();
        } else {
            logger.info("item not found");
        }
    }
});

Moralis.Cloud.afterSave("ItemBought", async (request) => {
    const confirmed = request.object.get("confirmed");
    const logger = Moralis.Cloud.getLogger();
    logger.info("Object Bought");
    if (confirmed) {
        logger.info("Found Item!");
        const ActiveItem = Moralis.Object.extend("ActiveItem");
        const query = new Moralis.Query(ActiveItem);
        query.equalTo("markeplaceAddress", request.object.get("address"));
        query.equalTo("nftAddress", request.object.get("nftAddress"));
        query.equalTo("tokenId", request.object.get("tokenId"));
        logger.info(`MarketPlace | Query: ${query}`);
        const boughtItem = await query.first();
        logger.info(`MarketPlace | Bought Item: ${boughtItem}`);
        if (boughtItem) {
            logger.info("deleting item");
            await boughtItem.destroy();
        } else {
            logger.info("item not found");
        }
    }
});

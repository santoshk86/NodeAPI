module.exports = function getNextId(collection) {
    var nextId = 1;
    collection.forEach(function (item) {
        nextId = item.id >= nextId ? item.id + 1 : nextId;
    });
    return nextId;
};
//# sourceMappingURL=C:/ng2/nodeAPI/compiled/routes/getNextId.js.map
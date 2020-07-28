"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class MappingsNullClientV1 {
    getCollectionNames(correlationId, callback) {
        callback(null, new Array());
    }
    getMappings(correlationId, filter, paging, callback) {
        callback(null, new pip_services3_commons_node_1.DataPage());
    }
    addMapping(correlationId, collection, internalId, externalId, timeToLive, callback) {
        callback(null);
    }
    mapToExternal(correlationId, collection, internalId, callback) {
        callback(null, null);
    }
    mapToInternal(correlationId, collection, externalId, callback) {
        callback(null, null);
    }
    deleteMapping(correlationId, collection, internalId, externalId, callback) {
        callback(null);
    }
}
exports.MappingsNullClientV1 = MappingsNullClientV1;
//# sourceMappingURL=MappingsNullClientV1.js.map
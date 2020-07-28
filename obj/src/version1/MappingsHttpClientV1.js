"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class MappingsHttpClientV1 extends pip_services3_rpc_node_1.CommandableHttpClient {
    constructor() {
        super('v1/mappings');
    }
    getCollectionNames(correlationId, callback) {
        this.callCommand('get_collection_names', correlationId, {}, callback);
    }
    getMappings(correlationId, filter, paging, callback) {
        this.callCommand('get_mappings', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    addMapping(correlationId, collection, internalId, externalId, timeToLive, callback) {
        this.callCommand('add_mapping', correlationId, {
            collection: collection,
            internal_id: internalId,
            external_id: externalId,
            ttl: timeToLive
        }, (err, res) => {
            callback(err);
        });
    }
    mapToExternal(correlationId, collection, internalId, callback) {
        this.callCommand('map_to_external', correlationId, {
            collection: collection,
            internal_id: internalId
        }, callback);
    }
    mapToInternal(correlationId, collection, externalId, callback) {
        this.callCommand('map_to_internal', correlationId, {
            collection: collection,
            external_id: externalId
        }, callback);
    }
    deleteMapping(correlationId, collection, internalId, externalId, callback) {
        this.callCommand('delete_mapping', correlationId, {
            collection: collection,
            internal_id: internalId,
            external_id: externalId
        }, (err, res) => {
            callback(err);
        });
    }
}
exports.MappingsHttpClientV1 = MappingsHttpClientV1;
//# sourceMappingURL=MappingsHttpClientV1.js.map
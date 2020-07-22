"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class MappingsDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-mappings', 'controller', '*', '*', '1.0'));
    }
    getCollectionNames(correlationId, callback) {
        let timing = this.instrument(correlationId, 'mappings.get_collections_names');
        this._controller.getCollectionNames(correlationId, (err, items) => {
            timing.endTiming();
            callback(err, items);
        });
    }
    getMappings(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'mappings.get_mappings');
        this._controller.getMappings(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    addMapping(correlationId, collection, internalId, externalId, timeToLive, callback) {
        let timing = this.instrument(correlationId, 'mappings.add_mapping');
        this._controller.addMapping(correlationId, collection, internalId, externalId, timeToLive, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    mapToExternal(correlationId, collection, internalId, callback) {
        let timing = this.instrument(correlationId, 'mappings.map_to_external');
        this._controller.mapToExternal(correlationId, collection, internalId, (err, id) => {
            timing.endTiming();
            callback(err, id);
        });
    }
    mapToInternal(correlationId, collection, externalId, callback) {
        let timing = this.instrument(correlationId, 'mappings.map_to_internal');
        this._controller.mapToInternal(correlationId, collection, externalId, (err, id) => {
            timing.endTiming();
            callback(err, id);
        });
    }
    deleteMapping(correlationId, collection, internalId, externalId, callback) {
        let timing = this.instrument(correlationId, 'mappings.delete_mapping');
        this._controller.deleteMapping(correlationId, collection, internalId, externalId, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
}
exports.MappingsDirectClientV1 = MappingsDirectClientV1;
//# sourceMappingURL=MappingsDirectClientV1.js.map
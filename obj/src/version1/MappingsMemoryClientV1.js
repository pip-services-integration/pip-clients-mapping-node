"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class MappingsMemoryClientV1 {
    constructor(...items) {
        this._maxPageSize = 100;
        this._defaultTTL = 7 * 24 * 60 * 60 * 1000;
        this._items = items;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let collection = filter.getAsNullableString("collection");
        let id = filter.getAsNullableString("id");
        let internalId = filter.getAsNullableString("internal_id");
        let externalId = filter.getAsNullableString("external_id");
        let search = filter.getAsNullableString("search");
        return (item) => {
            if (collection != null && item.collection != collection)
                return false;
            if (id != null && item.external_id != id && item.internal_id != id)
                return false;
            if (internalId != null && item.internal_id != internalId)
                return false;
            if (externalId != null && item.external_id != externalId)
                return false;
            if (search != null && item.external_id != search && item.internal_id != search)
                return false;
            return true;
        };
    }
    getCollectionNames(correlationId, callback) {
        let result = [];
        for (let mapping of this._items) {
            let collection = mapping.collection;
            if (result.indexOf(collection) < 0)
                result.push(collection);
        }
        callback(null, result);
    }
    getMappings(correlationId, filter, paging, callback) {
        let filterMappings = this.composeFilter(filter);
        let mappings = _.filter(this._items, filterMappings);
        // Extract a page
        paging = paging != null ? paging : new pip_services3_commons_node_1.PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);
        let total = null;
        if (paging.total)
            total = mappings.length;
        if (skip > 0)
            mappings = _.slice(mappings, skip);
        mappings = _.take(mappings, take);
        let page = new pip_services3_commons_node_1.DataPage(mappings, total);
        callback(null, page);
    }
    addMapping(correlationId, collection, internalId, externalId, timeToLive, callback) {
        let mapping;
        timeToLive = timeToLive > 0 ? timeToLive : this._defaultTTL;
        mapping = {
            collection: collection,
            internal_id: internalId,
            external_id: externalId,
            expiration_time: new Date(new Date().getTime() + timeToLive)
        };
        if (mapping == null) {
            callback(null);
            return;
        }
        mapping = _.clone(mapping);
        mapping.id = mapping.id || pip_services3_commons_node_1.IdGenerator.nextLong();
        this._items.push(mapping);
        callback(null);
    }
    mapToExternal(correlationId, collection, internalId, callback) {
        let result = null;
        let items = _.filter(this._items, (m) => {
            return collection.localeCompare(m.collection) == 0 && internalId.localeCompare(m.internal_id) == 0;
        });
        let mapping = items.length > 0 ? items[0] : null;
        result = mapping != null && mapping.expiration_time > new Date() ? mapping.external_id : null;
        callback(null, result);
    }
    mapToInternal(correlationId, collection, externalId, callback) {
        let result = null;
        let items = _.filter(this._items, (m) => {
            return collection.localeCompare(m.collection) == 0 && externalId.localeCompare(m.external_id) == 0;
        });
        let mapping = items.length > 0 ? items[0] : null;
        result = mapping != null && mapping.expiration_time > new Date() ? mapping.internal_id : null;
        callback(null, result);
    }
    deleteMapping(correlationId, collection, internalId, externalId, callback) {
        for (let index = this._items.length - 1; index >= 0; index--) {
            let mapping = this._items[index];
            if (mapping.collection == collection
                && mapping.internal_id == internalId
                && mapping.external_id == externalId) {
                this._items.splice(index, 1);
                break;
            }
        }
        callback(null);
    }
}
exports.MappingsMemoryClientV1 = MappingsMemoryClientV1;
//# sourceMappingURL=MappingsMemoryClientV1.js.map
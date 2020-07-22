let _ = require('lodash');

import { IMappingsClient } from "./IMappingsClient";
import { FilterParams, PagingParams, DataPage, IdGenerator } from "pip-services3-commons-node";
import { MappingV1 } from "./MappingV1";

export class MappingsMemoryClientV1 implements IMappingsClient {
    private _maxPageSize: number = 100;
    private _items: MappingV1[];
    private readonly _defaultTTL: number = 7 * 24 * 60 * 60 * 1000;

    public constructor(...items: MappingV1[]) {
        this._items = items;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        let collection = filter.getAsNullableString("collection");
        let id = filter.getAsNullableString("id");
        let internalId = filter.getAsNullableString("internal_id");
        let externalId = filter.getAsNullableString("external_id");
        let search = filter.getAsNullableString("search");

        return (item: MappingV1) => {
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

    getCollectionNames(correlationId: string, callback: (err: any, items: string[]) => void) {
        let result: string[] = [];
        for (let mapping of this._items) {
            let collection = mapping.collection;
            if (result.indexOf(collection) < 0)
                result.push(collection);
        }
        callback(null, result);
    }

    getMappings(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: import("pip-services3-commons-node").DataPage<import("./MappingV1").MappingV1>) => void) {
        let filterMappings = this.composeFilter(filter);
        let mappings = _.filter(this._items, filterMappings);

        // Extract a page
        paging = paging != null ? paging : new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);

        let total = null;
        if (paging.total)
            total = mappings.length;

        if (skip > 0)
            mappings = _.slice(mappings, skip);
        mappings = _.take(mappings, take);

        let page = new DataPage<MappingV1>(mappings, total);
        callback(null, page);
    }

    addMapping(correlationId: string, collection: string, internalId: string, externalId: string, timeToLive: number, callback: (err: any) => void) {
        let mapping: MappingV1;
        timeToLive = timeToLive > 0 ? timeToLive : this._defaultTTL;
        mapping = <MappingV1>{
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
        mapping.id = mapping.id || IdGenerator.nextLong();
        this._items.push(mapping);
        callback(null);
    }

    mapToExternal(correlationId: string, collection: string, internalId: string, callback: (err: any, externalId: string) => void) {

        let result: string = null;

        let items = _.filter(this._items, (m) => {
            return collection.localeCompare(m.collection) == 0 && internalId.localeCompare(m.internal_id) == 0
        });
        let mapping: MappingV1 = items.length > 0 ? items[0] : null;
        result = mapping != null && mapping.expiration_time > new Date() ? mapping.external_id : null;
        callback(null, result);
    }

    mapToInternal(correlationId: string, collection: string, externalId: string, callback: (err: any, internalId: string) => void) {

        let result: string = null;
        let items = _.filter(this._items, (m) => {
            return collection.localeCompare(m.collection) == 0 && externalId.localeCompare(m.external_id) == 0
        });
        let mapping: MappingV1 = items.length > 0 ? items[0] : null;
        result = mapping != null && mapping.expiration_time > new Date() ? mapping.internal_id : null;
        callback(null, result);
    }

    deleteMapping(correlationId: string, collection: string, internalId: string, externalId: string, callback: (err: any) => void) {

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
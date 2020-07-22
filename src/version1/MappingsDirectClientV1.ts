import { IMappingsClient } from "./IMappingsClient";
import { FilterParams, PagingParams, Descriptor } from "pip-services3-commons-node";
import { DirectClient } from 'pip-services3-rpc-node';

export class MappingsDirectClientV1 extends DirectClient<any> implements IMappingsClient {
    
    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor('pip-services-mappings', 'controller', '*', '*', '1.0'));
    }

    getCollectionNames(correlationId: string, callback: (err: any, items: string[]) => void) {
        let timing = this.instrument(correlationId, 'mappings.get_collections_names');
        this._controller.getCollectionNames(correlationId, (err, items) => {
            timing.endTiming();
            callback(err, items);
        });
    }

    getMappings(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: import("pip-services3-commons-node").DataPage<import("./MappingV1").MappingV1>) => void) {
        let timing = this.instrument(correlationId, 'mappings.get_mappings');
        this._controller.getMappings(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    addMapping(correlationId: string, collection: string, internalId: string, externalId: string, timeToLive: number, callback: (err: any) => void) {
        let timing = this.instrument(correlationId, 'mappings.add_mapping');
        this._controller.addMapping(correlationId, collection, internalId, externalId, timeToLive, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    mapToExternal(correlationId: string, collection: string, internalId: string, callback: (err: any, externalId: string) => void) {
        let timing = this.instrument(correlationId, 'mappings.map_to_external');
        this._controller.mapToExternal(correlationId, collection, internalId, (err, id) => {
            timing.endTiming();
            callback(err, id);
        });
    }

    mapToInternal(correlationId: string, collection: string, externalId: string, callback: (err: any, internalId: string) => void) {
        let timing = this.instrument(correlationId, 'mappings.map_to_internal');
        this._controller.mapToInternal(correlationId, collection, externalId, (err, id) => {
            timing.endTiming();
            callback(err, id);
        });
    }

    deleteMapping(correlationId: string, collection: string, internalId: string, externalId: string, callback: (err: any) => void) {
        let timing = this.instrument(correlationId, 'mappings.delete_mapping');
        this._controller.deleteMapping(correlationId, collection, internalId, externalId, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

}
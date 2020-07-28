import { IMappingsClient } from "./IMappingsClient";
import { FilterParams, PagingParams } from "pip-services3-commons-node";
import { CommandableHttpClient } from 'pip-services3-rpc-node';

export class MappingsHttpClientV1 extends CommandableHttpClient implements IMappingsClient {

    public constructor() {
        super('v1/mappings');
    }

    getCollectionNames(correlationId: string, callback: (err: any, items: string[]) => void) {
        this.callCommand(
            'get_collection_names',
            correlationId,
            {},
            callback
        );
    }

    getMappings(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: import("pip-services3-commons-node").DataPage<import("./MappingV1").MappingV1>) => void) {
        this.callCommand(
            'get_mappings',
            correlationId,
            {
                filter: filter,
                paging: paging
            },
            callback
        );
    }

    addMapping(correlationId: string, collection: string, internalId: string, externalId: string, timeToLive: number, callback: (err: any) => void) {
        this.callCommand(
            'add_mapping',
            correlationId,
            {
                collection: collection,
                internal_id: internalId,
                external_id: externalId,
                ttl: timeToLive
            }, (err, res) => {
                callback(err);
            }
        );
    }

    mapToExternal(correlationId: string, collection: string, internalId: string, callback: (err: any, externalId: string) => void) {
        this.callCommand(
            'map_to_external',
            correlationId,
            {
                collection: collection,
                internal_id: internalId
            },
            callback
        );
    }

    mapToInternal(correlationId: string, collection: string, externalId: string, callback: (err: any, internalId: string) => void) {
        this.callCommand(
            'map_to_internal',
            correlationId,
            {
                collection: collection,
                external_id: externalId
            },
            callback
        );
    }

    deleteMapping(correlationId: string, collection: string, internalId: string, externalId: string, callback: (err: any) => void) {
        this.callCommand(
            'delete_mapping',
            correlationId,
            {
                collection: collection,
                internal_id: internalId,
                external_id: externalId
            }, (err, res) => {
                callback(err);
            }
        );
    }


}
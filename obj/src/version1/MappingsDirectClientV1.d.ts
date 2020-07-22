import { IMappingsClient } from "./IMappingsClient";
import { FilterParams, PagingParams } from "pip-services3-commons-node";
import { DirectClient } from 'pip-services3-rpc-node';
export declare class MappingsDirectClientV1 extends DirectClient<any> implements IMappingsClient {
    constructor();
    getCollectionNames(correlationId: string, callback: (err: any, items: string[]) => void): void;
    getMappings(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: import("pip-services3-commons-node").DataPage<import("./MappingV1").MappingV1>) => void): void;
    addMapping(correlationId: string, collection: string, internalId: string, externalId: string, timeToLive: number, callback: (err: any) => void): void;
    mapToExternal(correlationId: string, collection: string, internalId: string, callback: (err: any, externalId: string) => void): void;
    mapToInternal(correlationId: string, collection: string, externalId: string, callback: (err: any, internalId: string) => void): void;
    deleteMapping(correlationId: string, collection: string, internalId: string, externalId: string, callback: (err: any) => void): void;
}

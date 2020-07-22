import { IMappingsClient } from "./IMappingsClient";
import { FilterParams, PagingParams } from "pip-services3-commons-node";
import { MappingV1 } from "./MappingV1";
export declare class MappingsMemoryClientV1 implements IMappingsClient {
    private _maxPageSize;
    private _items;
    private readonly _defaultTTL;
    constructor(...items: MappingV1[]);
    private composeFilter;
    getCollectionNames(correlationId: string, callback: (err: any, items: string[]) => void): void;
    getMappings(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: import("pip-services3-commons-node").DataPage<import("./MappingV1").MappingV1>) => void): void;
    addMapping(correlationId: string, collection: string, internalId: string, externalId: string, timeToLive: number, callback: (err: any) => void): void;
    mapToExternal(correlationId: string, collection: string, internalId: string, callback: (err: any, externalId: string) => void): void;
    mapToInternal(correlationId: string, collection: string, externalId: string, callback: (err: any, internalId: string) => void): void;
    deleteMapping(correlationId: string, collection: string, internalId: string, externalId: string, callback: (err: any) => void): void;
}

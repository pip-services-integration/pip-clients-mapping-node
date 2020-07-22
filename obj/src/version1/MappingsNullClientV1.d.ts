import { IMappingsClient } from "./IMappingsClient";
import { FilterParams, PagingParams, DataPage } from "pip-services3-commons-node";
import { MappingV1 } from "./MappingV1";
export declare class MappingsNullClientV1 implements IMappingsClient {
    getCollectionNames(correlationId: string, callback: (err: any, items: string[]) => void): void;
    getMappings(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<MappingV1>) => void): void;
    addMapping(correlationId: string, collection: string, internalId: string, externalId: string, timeToLive: number, callback: (err: any) => void): void;
    mapToExternal(correlationId: string, collection: string, internalId: string, callback: (err: any, externalId: string) => void): void;
    mapToInternal(correlationId: string, collection: string, externalId: string, callback: (err: any, internalId: string) => void): void;
    deleteMapping(correlationId: string, collection: string, internalId: string, externalId: string, callback: (err: any) => void): void;
    deleteExpiredMappings(correlationId: string, callback: (err: any) => void): void;
}

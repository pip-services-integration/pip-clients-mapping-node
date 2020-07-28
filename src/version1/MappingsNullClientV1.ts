import { IMappingsClient } from "./IMappingsClient";
import { FilterParams, PagingParams, DataPage } from "pip-services3-commons-node";
import { MappingV1 } from "./MappingV1";


export class MappingsNullClientV1 implements IMappingsClient {
    getCollectionNames(correlationId: string, callback: (err: any, items: string[]) => void) {
        callback(null, new Array<string>());
    }
    getMappings(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<MappingV1>) => void) {
        callback(null, new DataPage<MappingV1>());
    }
    addMapping(correlationId: string, collection: string, internalId: string, externalId: string, timeToLive: number, callback: (err: any) => void) {
        callback(null);
    }
    mapToExternal(correlationId: string, collection: string, internalId: string, callback: (err: any, externalId: string) => void) {
        callback(null, null);
    }
    mapToInternal(correlationId: string, collection: string, externalId: string, callback: (err: any, internalId: string) => void) {
        callback(null, null);
    }
    deleteMapping(correlationId: string, collection: string, internalId: string, externalId: string, callback: (err: any) => void) {
        callback(null);
    }

}
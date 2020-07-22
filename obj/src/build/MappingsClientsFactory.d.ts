import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';
export declare class MappingsClientsFactory extends Factory {
    static Descriptor: Descriptor;
    static DirectClientDescriptor: Descriptor;
    static MemoryClientDescriptor: Descriptor;
    static HttpClientDescriptor: Descriptor;
    static NullClientDescriptor: Descriptor;
    constructor();
}

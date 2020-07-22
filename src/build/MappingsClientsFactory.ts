import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { MappingsDirectClientV1 } from '../version1/MappingsDirectClientV1';
import { MappingsMemoryClientV1 } from '../version1/MappingsMemoryClientV1';
import { MappingsHttpClientV1 } from '../version1/MappingsHttpClientV1';
import { MappingsNullClientV1 } from '../version1/MappingsNullClientV1';


export class MappingsClientsFactory extends Factory {
	public static Descriptor = new Descriptor("pip-clients-mappings", "factory", "default", "default", "1.0");
	public static DirectClientDescriptor = new Descriptor("pip-clients-mappings", "client", "direct", "*", "1.0");
	public static MemoryClientDescriptor = new Descriptor("pip-clients-mappings", "client", "memory", "*", "1.0");
	public static HttpClientDescriptor = new Descriptor("pip-clients-mappings", "client", "http", "*", "1.0");
	public static NullClientDescriptor = new Descriptor("pip-clients-mappings", "client", "null", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(MappingsClientsFactory.DirectClientDescriptor, MappingsDirectClientV1);
		this.registerAsType(MappingsClientsFactory.MemoryClientDescriptor, MappingsMemoryClientV1);
		this.registerAsType(MappingsClientsFactory.HttpClientDescriptor, MappingsHttpClientV1);
		this.registerAsType(MappingsClientsFactory.NullClientDescriptor, MappingsNullClientV1);
	}
	
}

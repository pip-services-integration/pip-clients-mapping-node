"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const MappingsDirectClientV1_1 = require("../version1/MappingsDirectClientV1");
const MappingsMemoryClientV1_1 = require("../version1/MappingsMemoryClientV1");
const MappingsHttpClientV1_1 = require("../version1/MappingsHttpClientV1");
const MappingsNullClientV1_1 = require("../version1/MappingsNullClientV1");
class MappingsClientsFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(MappingsClientsFactory.DirectClientDescriptor, MappingsDirectClientV1_1.MappingsDirectClientV1);
        this.registerAsType(MappingsClientsFactory.MemoryClientDescriptor, MappingsMemoryClientV1_1.MappingsMemoryClientV1);
        this.registerAsType(MappingsClientsFactory.HttpClientDescriptor, MappingsHttpClientV1_1.MappingsHttpClientV1);
        this.registerAsType(MappingsClientsFactory.NullClientDescriptor, MappingsNullClientV1_1.MappingsNullClientV1);
    }
}
exports.MappingsClientsFactory = MappingsClientsFactory;
MappingsClientsFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-clients-mappings", "factory", "default", "default", "1.0");
MappingsClientsFactory.DirectClientDescriptor = new pip_services3_commons_node_1.Descriptor("pip-clients-mappings", "client", "direct", "*", "1.0");
MappingsClientsFactory.MemoryClientDescriptor = new pip_services3_commons_node_1.Descriptor("pip-clients-mappings", "client", "memory", "*", "1.0");
MappingsClientsFactory.HttpClientDescriptor = new pip_services3_commons_node_1.Descriptor("pip-clients-mappings", "client", "http", "*", "1.0");
MappingsClientsFactory.NullClientDescriptor = new pip_services3_commons_node_1.Descriptor("pip-clients-mappings", "client", "null", "*", "1.0");
//# sourceMappingURL=MappingsClientsFactory.js.map
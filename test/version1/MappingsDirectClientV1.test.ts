
import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { MappingsMemoryPersistence } from 'pip-services-mappings-node';
import { MappingsController } from 'pip-services-mappings-node';

import { MappingsDirectClientV1 } from '../../src/version1/MappingsDirectClientV1';
import { MappingsClientV1Fixture } from './MappingsClientV1Fixture';


suite('MappingsDirectClientV1', () => {
    let persistence: MappingsMemoryPersistence;
    let controller: MappingsController;
    let client: MappingsDirectClientV1;
    let fixture: MappingsClientV1Fixture;

    setup((done) => {
        persistence = new MappingsMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new MappingsController();
        controller.configure(new ConfigParams());

        client = new MappingsDirectClientV1();

        let references = References.fromTuples(
            new Descriptor('pip-services-mappings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-mappings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-mappings', 'client', 'direct', 'default', '1.0'), client
        );

        controller.setReferences(references);
        client.setReferences(references);

        fixture = new MappingsClientV1Fixture(client);

        persistence.open(null, done);
    });

    teardown((done) => {
        persistence.close(null, done);
    });

    test('Get Mapping Collections', (done) => {
        fixture.testGetMappingCollections(done);
    });

    test('Get Mappings', (done) => {
        fixture.testGetMappings(done);
    });

    test('Mapping', (done) => {
        fixture.testMapping(done);
    });

});
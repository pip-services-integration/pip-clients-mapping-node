
import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { MappingsMemoryPersistence } from 'pip-services-mappings-node';
import { MappingsController } from 'pip-services-mappings-node';

import { MappingsMemoryClientV1 } from '../../src/version1/MappingsMemoryClientV1';
import { MappingsClientV1Fixture } from './MappingsClientV1Fixture';


suite('MappingsDirectClientV1', () => {
    let client: MappingsMemoryClientV1;
    let fixture: MappingsClientV1Fixture;

    setup((done) => {


        client = new MappingsMemoryClientV1();

        let references = References.fromTuples(
            new Descriptor('pip-services-mappings', 'client', 'memory', 'default', '1.0'), client
        );
        //client.setReferences(references);
        fixture = new MappingsClientV1Fixture(client);
        done();
    });

    teardown((done) => {
        done();
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
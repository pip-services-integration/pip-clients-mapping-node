import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { MappingsMemoryPersistence } from 'pip-services-mappings-node';
import { MappingsController } from 'pip-services-mappings-node';
import { MappingsHttpServiceV1 } from 'pip-services-mappings-node';

import { MappingsHttpClientV1 } from '../../src/version1/MappingsHttpClientV1';
import { MappingsClientV1Fixture } from './MappingsClientV1Fixture';

suite('MappingsHttpClientV1', () => {
    let persistence: MappingsMemoryPersistence;
    let controller: MappingsController;
    let service: MappingsHttpServiceV1;
    let client: MappingsHttpClientV1;
    let fixture: MappingsClientV1Fixture;

    setup((done) => {
        persistence = new MappingsMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new MappingsController();
        controller.configure(new ConfigParams());

        let httpConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.port', 3000,
            'connection.host', 'localhost'
        );

        service = new MappingsHttpServiceV1();
        service.configure(httpConfig);

        client = new MappingsHttpClientV1();
        client.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('pip-services-mappings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-mappings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-mappings', 'service', 'http', 'default', '1.0'), service,
            new Descriptor('pip-services-mappings', 'client', 'http', 'default', '1.0'), client
        );
        controller.setReferences(references);
        service.setReferences(references);
        client.setReferences(references);

        fixture = new MappingsClientV1Fixture(client);

        persistence.open(null, (err) => {
            if (err) {
                done(err);
                return;
            }

            service.open(null, (err) => {
                if (err) {
                    done(err);
                    return;
                }

                client.open(null, done);
            });
        });
    });

    teardown((done) => {
        client.close(null, (err) => {
            service.close(null, (err) => {
                persistence.close(null, done);
            });
        });
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
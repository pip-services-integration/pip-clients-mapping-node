let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { IMappingsClient } from '../../src/version1/IMappingsClient';

export class MappingsClientV1Fixture {
    private _client: IMappingsClient;

    constructor(persistence) {
        assert.isNotNull(persistence);
        this._client = persistence;
    }

    testGetMappingCollections(done) {
        async.series([
            // Add mappings
            (callback) => {
                this._client.addMapping(null, "Common.Collection", "123", "789", 60 * 1000, callback);
            }, (callback) => {
                this._client.addMapping(null, "Common.AnotherCollection", "123", "543", 60 * 1000, callback);
            }, (callback) => {
                this._client.addMapping(null, "Common.Collection", "ABC", "XYZ", 60 * 1000, callback);
            }, (callback) => {
                this._client.getCollectionNames(null, (err, items) => {
                    assert.isNull(err);
                    assert.equal(2, items.length);
                    assert.include(items, "Common.Collection");
                    assert.include(items, "Common.AnotherCollection");
                    callback();
                });
            }
        ], done);
    }

    testGetMappings(done) {
        async.series([// Add mappings
            (callback) => {
                this._client.addMapping(null, "Common.Collection", "123", "789", 60 * 1000, callback);
            }, (callback) => {
                this._client.addMapping(null, "Common.AnotherCollection", "123", "543", 60 * 1000, callback);
            }, (callback) => {
                this._client.addMapping(null, "Common.Collection", "ABC", "XYZ", 60 * 1000, callback);
            }, (callback) => {
                this._client.addMapping(null, "Common.Collection", "AAA", "111", 60 * 1000, callback);
            }, (callback) => {
                this._client.getMappings(null, FilterParams.fromTuples("collection", "Common.Collection"), new PagingParams(1, 10, false), (err, mappings) => {
                    assert.isNull(err);
                    assert.isNotNull(mappings.data);
                    assert.equal(2, mappings.data.length);
                    callback();
                });

            }
        ], done);
    }

    testMapping(done) {
        async.series([
            // Add mappings
            (callback) => {
                this._client.addMapping(null, "Common.Collection", "123", "789", 60 * 1000, callback);
            }, (callback) => {
                this._client.addMapping(null, "Common.AnotherCollection", "123", "543", 60 * 1000, callback);
            }, (callback) => {
                this._client.addMapping(null, "Common.Collection", "ABC", "XYZ", 60 * 1000, callback);
            }, (callback) => {

                // Test internal mappings
                this._client.mapToExternal(null, "Common.Collection", "123", (err, id) => {
                    assert.isNull(err);
                    assert.equal("789", id);
                    callback();
                });

            }, (callback) => {
                // Test external mappings
                this._client.mapToInternal(null, "Common.Collection", "789", (err, id) => {
                    assert.isNull(err);
                    assert.equal("123", id);
                    callback();
                });

            }, (callback) => {
                // Test different collection
                this._client.mapToExternal(null, "Common.AnotherCollection", "123", (err, id) => {
                    assert.isNull(err);
                    assert.equal("543", id);
                    callback();
                });

            }, (callback) => {
                // Test non-exiting collection
                this._client.mapToExternal(null, "Common.YetAnotherCollection", "123", (err, id) => {
                    assert.isNull(err);
                    assert.isNull(id);
                    callback();
                });

            }, (callback) => {
                // Test non-exiting mapping
                this._client.mapToExternal(null, "Common.Collection", "555", (err, id) => {
                    assert.isNull(err);
                    assert.isNull(id);
                    callback();
                });

            }
        ], done);
    }

}

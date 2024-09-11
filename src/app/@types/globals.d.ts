// @types/global.d.ts

import { MongoClient } from 'mongodb';

declare global {
  // Extend the global object to include the _mongoClientPromise
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export {};

import { Schema } from 'mongoose';

/**
 * Makes an historical model insert-only through normal Mongoose model APIs.
 * Direct MongoDB access is privileged infrastructure behavior and cannot be
 * intercepted by schema middleware.
 */
export function protectImmutableHistory(
  schema: Schema,
  documentName: string,
): void {
  const immutableError = () =>
    new Error(`${documentName} documents are immutable`);

  schema.pre('save', function () {
    if (!this.isNew) {
      throw immutableError();
    }
  });

  schema.pre(
    [
      'updateOne',
      'updateMany',
      'findOneAndUpdate',
      'replaceOne',
      'findOneAndReplace',
    ],
    function () {
      throw immutableError();
    },
  );

  schema.pre('deleteOne', { document: true, query: true }, function () {
    throw immutableError();
  });

  schema.pre(['deleteMany', 'findOneAndDelete'], function () {
    throw immutableError();
  });

  schema.pre('bulkWrite', function (operations) {
    if (operations.some((operation) => !('insertOne' in operation))) {
      throw immutableError();
    }
  });
}

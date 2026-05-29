
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Workspace
 * 
 */
export type Workspace = $Result.DefaultSelection<Prisma.$WorkspacePayload>
/**
 * Model ProteinSequence
 * 
 */
export type ProteinSequence = $Result.DefaultSelection<Prisma.$ProteinSequencePayload>
/**
 * Model PredictionJob
 * 
 */
export type PredictionJob = $Result.DefaultSelection<Prisma.$PredictionJobPayload>
/**
 * Model TemplateHit
 * 
 */
export type TemplateHit = $Result.DefaultSelection<Prisma.$TemplateHitPayload>
/**
 * Model StructureModel
 * 
 */
export type StructureModel = $Result.DefaultSelection<Prisma.$StructureModelPayload>
/**
 * Model AnalysisResult
 * 
 */
export type AnalysisResult = $Result.DefaultSelection<Prisma.$AnalysisResultPayload>
/**
 * Model Bookmark
 * 
 */
export type Bookmark = $Result.DefaultSelection<Prisma.$BookmarkPayload>
/**
 * Model IntegrationCache
 * 
 */
export type IntegrationCache = $Result.DefaultSelection<Prisma.$IntegrationCachePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PredictionMethod: {
  HOMOLOGY: 'HOMOLOGY',
  THREADING: 'THREADING',
  AB_INITIO: 'AB_INITIO',
  ALPHAFOLD: 'ALPHAFOLD',
  ESMFOLD: 'ESMFOLD',
  COLABFOLD: 'COLABFOLD',
  ROSETTAFOLD: 'ROSETTAFOLD'
};

export type PredictionMethod = (typeof PredictionMethod)[keyof typeof PredictionMethod]


export const JobStatus: {
  QUEUED: 'QUEUED',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]

}

export type PredictionMethod = $Enums.PredictionMethod

export const PredictionMethod: typeof $Enums.PredictionMethod

export type JobStatus = $Enums.JobStatus

export const JobStatus: typeof $Enums.JobStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workspace`: Exposes CRUD operations for the **Workspace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workspaces
    * const workspaces = await prisma.workspace.findMany()
    * ```
    */
  get workspace(): Prisma.WorkspaceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.proteinSequence`: Exposes CRUD operations for the **ProteinSequence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProteinSequences
    * const proteinSequences = await prisma.proteinSequence.findMany()
    * ```
    */
  get proteinSequence(): Prisma.ProteinSequenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.predictionJob`: Exposes CRUD operations for the **PredictionJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PredictionJobs
    * const predictionJobs = await prisma.predictionJob.findMany()
    * ```
    */
  get predictionJob(): Prisma.PredictionJobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.templateHit`: Exposes CRUD operations for the **TemplateHit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TemplateHits
    * const templateHits = await prisma.templateHit.findMany()
    * ```
    */
  get templateHit(): Prisma.TemplateHitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.structureModel`: Exposes CRUD operations for the **StructureModel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StructureModels
    * const structureModels = await prisma.structureModel.findMany()
    * ```
    */
  get structureModel(): Prisma.StructureModelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.analysisResult`: Exposes CRUD operations for the **AnalysisResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnalysisResults
    * const analysisResults = await prisma.analysisResult.findMany()
    * ```
    */
  get analysisResult(): Prisma.AnalysisResultDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookmark`: Exposes CRUD operations for the **Bookmark** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookmarks
    * const bookmarks = await prisma.bookmark.findMany()
    * ```
    */
  get bookmark(): Prisma.BookmarkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.integrationCache`: Exposes CRUD operations for the **IntegrationCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IntegrationCaches
    * const integrationCaches = await prisma.integrationCache.findMany()
    * ```
    */
  get integrationCache(): Prisma.IntegrationCacheDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Workspace: 'Workspace',
    ProteinSequence: 'ProteinSequence',
    PredictionJob: 'PredictionJob',
    TemplateHit: 'TemplateHit',
    StructureModel: 'StructureModel',
    AnalysisResult: 'AnalysisResult',
    Bookmark: 'Bookmark',
    IntegrationCache: 'IntegrationCache'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "workspace" | "proteinSequence" | "predictionJob" | "templateHit" | "structureModel" | "analysisResult" | "bookmark" | "integrationCache"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Workspace: {
        payload: Prisma.$WorkspacePayload<ExtArgs>
        fields: Prisma.WorkspaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkspaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkspaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          findFirst: {
            args: Prisma.WorkspaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkspaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          findMany: {
            args: Prisma.WorkspaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>[]
          }
          create: {
            args: Prisma.WorkspaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          createMany: {
            args: Prisma.WorkspaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkspaceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>[]
          }
          delete: {
            args: Prisma.WorkspaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          update: {
            args: Prisma.WorkspaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          deleteMany: {
            args: Prisma.WorkspaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkspaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkspaceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>[]
          }
          upsert: {
            args: Prisma.WorkspaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          aggregate: {
            args: Prisma.WorkspaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkspace>
          }
          groupBy: {
            args: Prisma.WorkspaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkspaceCountArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceCountAggregateOutputType> | number
          }
        }
      }
      ProteinSequence: {
        payload: Prisma.$ProteinSequencePayload<ExtArgs>
        fields: Prisma.ProteinSequenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProteinSequenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProteinSequencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProteinSequenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProteinSequencePayload>
          }
          findFirst: {
            args: Prisma.ProteinSequenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProteinSequencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProteinSequenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProteinSequencePayload>
          }
          findMany: {
            args: Prisma.ProteinSequenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProteinSequencePayload>[]
          }
          create: {
            args: Prisma.ProteinSequenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProteinSequencePayload>
          }
          createMany: {
            args: Prisma.ProteinSequenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProteinSequenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProteinSequencePayload>[]
          }
          delete: {
            args: Prisma.ProteinSequenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProteinSequencePayload>
          }
          update: {
            args: Prisma.ProteinSequenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProteinSequencePayload>
          }
          deleteMany: {
            args: Prisma.ProteinSequenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProteinSequenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProteinSequenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProteinSequencePayload>[]
          }
          upsert: {
            args: Prisma.ProteinSequenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProteinSequencePayload>
          }
          aggregate: {
            args: Prisma.ProteinSequenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProteinSequence>
          }
          groupBy: {
            args: Prisma.ProteinSequenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProteinSequenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProteinSequenceCountArgs<ExtArgs>
            result: $Utils.Optional<ProteinSequenceCountAggregateOutputType> | number
          }
        }
      }
      PredictionJob: {
        payload: Prisma.$PredictionJobPayload<ExtArgs>
        fields: Prisma.PredictionJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PredictionJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PredictionJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionJobPayload>
          }
          findFirst: {
            args: Prisma.PredictionJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PredictionJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionJobPayload>
          }
          findMany: {
            args: Prisma.PredictionJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionJobPayload>[]
          }
          create: {
            args: Prisma.PredictionJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionJobPayload>
          }
          createMany: {
            args: Prisma.PredictionJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PredictionJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionJobPayload>[]
          }
          delete: {
            args: Prisma.PredictionJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionJobPayload>
          }
          update: {
            args: Prisma.PredictionJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionJobPayload>
          }
          deleteMany: {
            args: Prisma.PredictionJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PredictionJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PredictionJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionJobPayload>[]
          }
          upsert: {
            args: Prisma.PredictionJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionJobPayload>
          }
          aggregate: {
            args: Prisma.PredictionJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePredictionJob>
          }
          groupBy: {
            args: Prisma.PredictionJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<PredictionJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.PredictionJobCountArgs<ExtArgs>
            result: $Utils.Optional<PredictionJobCountAggregateOutputType> | number
          }
        }
      }
      TemplateHit: {
        payload: Prisma.$TemplateHitPayload<ExtArgs>
        fields: Prisma.TemplateHitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TemplateHitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateHitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TemplateHitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateHitPayload>
          }
          findFirst: {
            args: Prisma.TemplateHitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateHitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TemplateHitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateHitPayload>
          }
          findMany: {
            args: Prisma.TemplateHitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateHitPayload>[]
          }
          create: {
            args: Prisma.TemplateHitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateHitPayload>
          }
          createMany: {
            args: Prisma.TemplateHitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TemplateHitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateHitPayload>[]
          }
          delete: {
            args: Prisma.TemplateHitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateHitPayload>
          }
          update: {
            args: Prisma.TemplateHitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateHitPayload>
          }
          deleteMany: {
            args: Prisma.TemplateHitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TemplateHitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TemplateHitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateHitPayload>[]
          }
          upsert: {
            args: Prisma.TemplateHitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateHitPayload>
          }
          aggregate: {
            args: Prisma.TemplateHitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplateHit>
          }
          groupBy: {
            args: Prisma.TemplateHitGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemplateHitGroupByOutputType>[]
          }
          count: {
            args: Prisma.TemplateHitCountArgs<ExtArgs>
            result: $Utils.Optional<TemplateHitCountAggregateOutputType> | number
          }
        }
      }
      StructureModel: {
        payload: Prisma.$StructureModelPayload<ExtArgs>
        fields: Prisma.StructureModelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StructureModelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StructureModelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StructureModelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StructureModelPayload>
          }
          findFirst: {
            args: Prisma.StructureModelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StructureModelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StructureModelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StructureModelPayload>
          }
          findMany: {
            args: Prisma.StructureModelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StructureModelPayload>[]
          }
          create: {
            args: Prisma.StructureModelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StructureModelPayload>
          }
          createMany: {
            args: Prisma.StructureModelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StructureModelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StructureModelPayload>[]
          }
          delete: {
            args: Prisma.StructureModelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StructureModelPayload>
          }
          update: {
            args: Prisma.StructureModelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StructureModelPayload>
          }
          deleteMany: {
            args: Prisma.StructureModelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StructureModelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StructureModelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StructureModelPayload>[]
          }
          upsert: {
            args: Prisma.StructureModelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StructureModelPayload>
          }
          aggregate: {
            args: Prisma.StructureModelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStructureModel>
          }
          groupBy: {
            args: Prisma.StructureModelGroupByArgs<ExtArgs>
            result: $Utils.Optional<StructureModelGroupByOutputType>[]
          }
          count: {
            args: Prisma.StructureModelCountArgs<ExtArgs>
            result: $Utils.Optional<StructureModelCountAggregateOutputType> | number
          }
        }
      }
      AnalysisResult: {
        payload: Prisma.$AnalysisResultPayload<ExtArgs>
        fields: Prisma.AnalysisResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalysisResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalysisResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisResultPayload>
          }
          findFirst: {
            args: Prisma.AnalysisResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalysisResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisResultPayload>
          }
          findMany: {
            args: Prisma.AnalysisResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisResultPayload>[]
          }
          create: {
            args: Prisma.AnalysisResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisResultPayload>
          }
          createMany: {
            args: Prisma.AnalysisResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnalysisResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisResultPayload>[]
          }
          delete: {
            args: Prisma.AnalysisResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisResultPayload>
          }
          update: {
            args: Prisma.AnalysisResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisResultPayload>
          }
          deleteMany: {
            args: Prisma.AnalysisResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalysisResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnalysisResultUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisResultPayload>[]
          }
          upsert: {
            args: Prisma.AnalysisResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisResultPayload>
          }
          aggregate: {
            args: Prisma.AnalysisResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalysisResult>
          }
          groupBy: {
            args: Prisma.AnalysisResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalysisResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalysisResultCountArgs<ExtArgs>
            result: $Utils.Optional<AnalysisResultCountAggregateOutputType> | number
          }
        }
      }
      Bookmark: {
        payload: Prisma.$BookmarkPayload<ExtArgs>
        fields: Prisma.BookmarkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookmarkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookmarkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          findFirst: {
            args: Prisma.BookmarkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookmarkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          findMany: {
            args: Prisma.BookmarkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>[]
          }
          create: {
            args: Prisma.BookmarkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          createMany: {
            args: Prisma.BookmarkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookmarkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>[]
          }
          delete: {
            args: Prisma.BookmarkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          update: {
            args: Prisma.BookmarkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          deleteMany: {
            args: Prisma.BookmarkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookmarkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookmarkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>[]
          }
          upsert: {
            args: Prisma.BookmarkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          aggregate: {
            args: Prisma.BookmarkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookmark>
          }
          groupBy: {
            args: Prisma.BookmarkGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookmarkGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookmarkCountArgs<ExtArgs>
            result: $Utils.Optional<BookmarkCountAggregateOutputType> | number
          }
        }
      }
      IntegrationCache: {
        payload: Prisma.$IntegrationCachePayload<ExtArgs>
        fields: Prisma.IntegrationCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IntegrationCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IntegrationCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationCachePayload>
          }
          findFirst: {
            args: Prisma.IntegrationCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IntegrationCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationCachePayload>
          }
          findMany: {
            args: Prisma.IntegrationCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationCachePayload>[]
          }
          create: {
            args: Prisma.IntegrationCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationCachePayload>
          }
          createMany: {
            args: Prisma.IntegrationCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IntegrationCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationCachePayload>[]
          }
          delete: {
            args: Prisma.IntegrationCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationCachePayload>
          }
          update: {
            args: Prisma.IntegrationCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationCachePayload>
          }
          deleteMany: {
            args: Prisma.IntegrationCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IntegrationCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IntegrationCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationCachePayload>[]
          }
          upsert: {
            args: Prisma.IntegrationCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationCachePayload>
          }
          aggregate: {
            args: Prisma.IntegrationCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIntegrationCache>
          }
          groupBy: {
            args: Prisma.IntegrationCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<IntegrationCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.IntegrationCacheCountArgs<ExtArgs>
            result: $Utils.Optional<IntegrationCacheCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    workspace?: WorkspaceOmit
    proteinSequence?: ProteinSequenceOmit
    predictionJob?: PredictionJobOmit
    templateHit?: TemplateHitOmit
    structureModel?: StructureModelOmit
    analysisResult?: AnalysisResultOmit
    bookmark?: BookmarkOmit
    integrationCache?: IntegrationCacheOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    workspaces: number
    bookmarks: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspaces?: boolean | UserCountOutputTypeCountWorkspacesArgs
    bookmarks?: boolean | UserCountOutputTypeCountBookmarksArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkspacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkWhereInput
  }


  /**
   * Count Type WorkspaceCountOutputType
   */

  export type WorkspaceCountOutputType = {
    sequences: number
    jobs: number
    bookmarks: number
  }

  export type WorkspaceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sequences?: boolean | WorkspaceCountOutputTypeCountSequencesArgs
    jobs?: boolean | WorkspaceCountOutputTypeCountJobsArgs
    bookmarks?: boolean | WorkspaceCountOutputTypeCountBookmarksArgs
  }

  // Custom InputTypes
  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceCountOutputType
     */
    select?: WorkspaceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountSequencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProteinSequenceWhereInput
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PredictionJobWhereInput
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountBookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkWhereInput
  }


  /**
   * Count Type ProteinSequenceCountOutputType
   */

  export type ProteinSequenceCountOutputType = {
    jobs: number
    analysisResults: number
  }

  export type ProteinSequenceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | ProteinSequenceCountOutputTypeCountJobsArgs
    analysisResults?: boolean | ProteinSequenceCountOutputTypeCountAnalysisResultsArgs
  }

  // Custom InputTypes
  /**
   * ProteinSequenceCountOutputType without action
   */
  export type ProteinSequenceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProteinSequenceCountOutputType
     */
    select?: ProteinSequenceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProteinSequenceCountOutputType without action
   */
  export type ProteinSequenceCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PredictionJobWhereInput
  }

  /**
   * ProteinSequenceCountOutputType without action
   */
  export type ProteinSequenceCountOutputTypeCountAnalysisResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalysisResultWhereInput
  }


  /**
   * Count Type PredictionJobCountOutputType
   */

  export type PredictionJobCountOutputType = {
    templateHits: number
    structures: number
    analysisResults: number
  }

  export type PredictionJobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    templateHits?: boolean | PredictionJobCountOutputTypeCountTemplateHitsArgs
    structures?: boolean | PredictionJobCountOutputTypeCountStructuresArgs
    analysisResults?: boolean | PredictionJobCountOutputTypeCountAnalysisResultsArgs
  }

  // Custom InputTypes
  /**
   * PredictionJobCountOutputType without action
   */
  export type PredictionJobCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJobCountOutputType
     */
    select?: PredictionJobCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PredictionJobCountOutputType without action
   */
  export type PredictionJobCountOutputTypeCountTemplateHitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateHitWhereInput
  }

  /**
   * PredictionJobCountOutputType without action
   */
  export type PredictionJobCountOutputTypeCountStructuresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StructureModelWhereInput
  }

  /**
   * PredictionJobCountOutputType without action
   */
  export type PredictionJobCountOutputTypeCountAnalysisResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalysisResultWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    passwordHash: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    passwordHash: string | null
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspaces?: boolean | User$workspacesArgs<ExtArgs>
    bookmarks?: boolean | User$bookmarksArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "passwordHash" | "imageUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspaces?: boolean | User$workspacesArgs<ExtArgs>
    bookmarks?: boolean | User$bookmarksArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      workspaces: Prisma.$WorkspacePayload<ExtArgs>[]
      bookmarks: Prisma.$BookmarkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      passwordHash: string | null
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspaces<T extends User$workspacesArgs<ExtArgs> = {}>(args?: Subset<T, User$workspacesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookmarks<T extends User$bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, User$bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly imageUrl: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.workspaces
   */
  export type User$workspacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    where?: WorkspaceWhereInput
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    cursor?: WorkspaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * User.bookmarks
   */
  export type User$bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    where?: BookmarkWhereInput
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    cursor?: BookmarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Workspace
   */

  export type AggregateWorkspace = {
    _count: WorkspaceCountAggregateOutputType | null
    _min: WorkspaceMinAggregateOutputType | null
    _max: WorkspaceMaxAggregateOutputType | null
  }

  export type WorkspaceMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkspaceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkspaceCountAggregateOutputType = {
    id: number
    name: number
    description: number
    ownerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkspaceMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkspaceMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkspaceCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkspaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workspace to aggregate.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Workspaces
    **/
    _count?: true | WorkspaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkspaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkspaceMaxAggregateInputType
  }

  export type GetWorkspaceAggregateType<T extends WorkspaceAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkspace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkspace[P]>
      : GetScalarType<T[P], AggregateWorkspace[P]>
  }




  export type WorkspaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceWhereInput
    orderBy?: WorkspaceOrderByWithAggregationInput | WorkspaceOrderByWithAggregationInput[]
    by: WorkspaceScalarFieldEnum[] | WorkspaceScalarFieldEnum
    having?: WorkspaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkspaceCountAggregateInputType | true
    _min?: WorkspaceMinAggregateInputType
    _max?: WorkspaceMaxAggregateInputType
  }

  export type WorkspaceGroupByOutputType = {
    id: string
    name: string
    description: string | null
    ownerId: string
    createdAt: Date
    updatedAt: Date
    _count: WorkspaceCountAggregateOutputType | null
    _min: WorkspaceMinAggregateOutputType | null
    _max: WorkspaceMaxAggregateOutputType | null
  }

  type GetWorkspaceGroupByPayload<T extends WorkspaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkspaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkspaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkspaceGroupByOutputType[P]>
            : GetScalarType<T[P], WorkspaceGroupByOutputType[P]>
        }
      >
    >


  export type WorkspaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    sequences?: boolean | Workspace$sequencesArgs<ExtArgs>
    jobs?: boolean | Workspace$jobsArgs<ExtArgs>
    bookmarks?: boolean | Workspace$bookmarksArgs<ExtArgs>
    _count?: boolean | WorkspaceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspace"]>

  export type WorkspaceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspace"]>

  export type WorkspaceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspace"]>

  export type WorkspaceSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkspaceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "ownerId" | "createdAt" | "updatedAt", ExtArgs["result"]["workspace"]>
  export type WorkspaceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    sequences?: boolean | Workspace$sequencesArgs<ExtArgs>
    jobs?: boolean | Workspace$jobsArgs<ExtArgs>
    bookmarks?: boolean | Workspace$bookmarksArgs<ExtArgs>
    _count?: boolean | WorkspaceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkspaceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkspaceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WorkspacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Workspace"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      sequences: Prisma.$ProteinSequencePayload<ExtArgs>[]
      jobs: Prisma.$PredictionJobPayload<ExtArgs>[]
      bookmarks: Prisma.$BookmarkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      ownerId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workspace"]>
    composites: {}
  }

  type WorkspaceGetPayload<S extends boolean | null | undefined | WorkspaceDefaultArgs> = $Result.GetResult<Prisma.$WorkspacePayload, S>

  type WorkspaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkspaceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkspaceCountAggregateInputType | true
    }

  export interface WorkspaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Workspace'], meta: { name: 'Workspace' } }
    /**
     * Find zero or one Workspace that matches the filter.
     * @param {WorkspaceFindUniqueArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkspaceFindUniqueArgs>(args: SelectSubset<T, WorkspaceFindUniqueArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Workspace that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkspaceFindUniqueOrThrowArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkspaceFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkspaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workspace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindFirstArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkspaceFindFirstArgs>(args?: SelectSubset<T, WorkspaceFindFirstArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workspace that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindFirstOrThrowArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkspaceFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkspaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Workspaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workspaces
     * const workspaces = await prisma.workspace.findMany()
     * 
     * // Get first 10 Workspaces
     * const workspaces = await prisma.workspace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workspaceWithIdOnly = await prisma.workspace.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkspaceFindManyArgs>(args?: SelectSubset<T, WorkspaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Workspace.
     * @param {WorkspaceCreateArgs} args - Arguments to create a Workspace.
     * @example
     * // Create one Workspace
     * const Workspace = await prisma.workspace.create({
     *   data: {
     *     // ... data to create a Workspace
     *   }
     * })
     * 
     */
    create<T extends WorkspaceCreateArgs>(args: SelectSubset<T, WorkspaceCreateArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Workspaces.
     * @param {WorkspaceCreateManyArgs} args - Arguments to create many Workspaces.
     * @example
     * // Create many Workspaces
     * const workspace = await prisma.workspace.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkspaceCreateManyArgs>(args?: SelectSubset<T, WorkspaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Workspaces and returns the data saved in the database.
     * @param {WorkspaceCreateManyAndReturnArgs} args - Arguments to create many Workspaces.
     * @example
     * // Create many Workspaces
     * const workspace = await prisma.workspace.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Workspaces and only return the `id`
     * const workspaceWithIdOnly = await prisma.workspace.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkspaceCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkspaceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Workspace.
     * @param {WorkspaceDeleteArgs} args - Arguments to delete one Workspace.
     * @example
     * // Delete one Workspace
     * const Workspace = await prisma.workspace.delete({
     *   where: {
     *     // ... filter to delete one Workspace
     *   }
     * })
     * 
     */
    delete<T extends WorkspaceDeleteArgs>(args: SelectSubset<T, WorkspaceDeleteArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Workspace.
     * @param {WorkspaceUpdateArgs} args - Arguments to update one Workspace.
     * @example
     * // Update one Workspace
     * const workspace = await prisma.workspace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkspaceUpdateArgs>(args: SelectSubset<T, WorkspaceUpdateArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Workspaces.
     * @param {WorkspaceDeleteManyArgs} args - Arguments to filter Workspaces to delete.
     * @example
     * // Delete a few Workspaces
     * const { count } = await prisma.workspace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkspaceDeleteManyArgs>(args?: SelectSubset<T, WorkspaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workspaces
     * const workspace = await prisma.workspace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkspaceUpdateManyArgs>(args: SelectSubset<T, WorkspaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workspaces and returns the data updated in the database.
     * @param {WorkspaceUpdateManyAndReturnArgs} args - Arguments to update many Workspaces.
     * @example
     * // Update many Workspaces
     * const workspace = await prisma.workspace.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Workspaces and only return the `id`
     * const workspaceWithIdOnly = await prisma.workspace.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkspaceUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkspaceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Workspace.
     * @param {WorkspaceUpsertArgs} args - Arguments to update or create a Workspace.
     * @example
     * // Update or create a Workspace
     * const workspace = await prisma.workspace.upsert({
     *   create: {
     *     // ... data to create a Workspace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workspace we want to update
     *   }
     * })
     */
    upsert<T extends WorkspaceUpsertArgs>(args: SelectSubset<T, WorkspaceUpsertArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Workspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceCountArgs} args - Arguments to filter Workspaces to count.
     * @example
     * // Count the number of Workspaces
     * const count = await prisma.workspace.count({
     *   where: {
     *     // ... the filter for the Workspaces we want to count
     *   }
     * })
    **/
    count<T extends WorkspaceCountArgs>(
      args?: Subset<T, WorkspaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkspaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkspaceAggregateArgs>(args: Subset<T, WorkspaceAggregateArgs>): Prisma.PrismaPromise<GetWorkspaceAggregateType<T>>

    /**
     * Group by Workspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkspaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkspaceGroupByArgs['orderBy'] }
        : { orderBy?: WorkspaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkspaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkspaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Workspace model
   */
  readonly fields: WorkspaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Workspace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkspaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sequences<T extends Workspace$sequencesArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$sequencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProteinSequencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    jobs<T extends Workspace$jobsArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookmarks<T extends Workspace$bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Workspace model
   */
  interface WorkspaceFieldRefs {
    readonly id: FieldRef<"Workspace", 'String'>
    readonly name: FieldRef<"Workspace", 'String'>
    readonly description: FieldRef<"Workspace", 'String'>
    readonly ownerId: FieldRef<"Workspace", 'String'>
    readonly createdAt: FieldRef<"Workspace", 'DateTime'>
    readonly updatedAt: FieldRef<"Workspace", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Workspace findUnique
   */
  export type WorkspaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace findUniqueOrThrow
   */
  export type WorkspaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace findFirst
   */
  export type WorkspaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workspaces.
     */
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * Workspace findFirstOrThrow
   */
  export type WorkspaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workspaces.
     */
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * Workspace findMany
   */
  export type WorkspaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspaces to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workspaces.
     */
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * Workspace create
   */
  export type WorkspaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to create a Workspace.
     */
    data: XOR<WorkspaceCreateInput, WorkspaceUncheckedCreateInput>
  }

  /**
   * Workspace createMany
   */
  export type WorkspaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Workspaces.
     */
    data: WorkspaceCreateManyInput | WorkspaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workspace createManyAndReturn
   */
  export type WorkspaceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * The data used to create many Workspaces.
     */
    data: WorkspaceCreateManyInput | WorkspaceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Workspace update
   */
  export type WorkspaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to update a Workspace.
     */
    data: XOR<WorkspaceUpdateInput, WorkspaceUncheckedUpdateInput>
    /**
     * Choose, which Workspace to update.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace updateMany
   */
  export type WorkspaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Workspaces.
     */
    data: XOR<WorkspaceUpdateManyMutationInput, WorkspaceUncheckedUpdateManyInput>
    /**
     * Filter which Workspaces to update
     */
    where?: WorkspaceWhereInput
    /**
     * Limit how many Workspaces to update.
     */
    limit?: number
  }

  /**
   * Workspace updateManyAndReturn
   */
  export type WorkspaceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * The data used to update Workspaces.
     */
    data: XOR<WorkspaceUpdateManyMutationInput, WorkspaceUncheckedUpdateManyInput>
    /**
     * Filter which Workspaces to update
     */
    where?: WorkspaceWhereInput
    /**
     * Limit how many Workspaces to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Workspace upsert
   */
  export type WorkspaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The filter to search for the Workspace to update in case it exists.
     */
    where: WorkspaceWhereUniqueInput
    /**
     * In case the Workspace found by the `where` argument doesn't exist, create a new Workspace with this data.
     */
    create: XOR<WorkspaceCreateInput, WorkspaceUncheckedCreateInput>
    /**
     * In case the Workspace was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkspaceUpdateInput, WorkspaceUncheckedUpdateInput>
  }

  /**
   * Workspace delete
   */
  export type WorkspaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter which Workspace to delete.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace deleteMany
   */
  export type WorkspaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workspaces to delete
     */
    where?: WorkspaceWhereInput
    /**
     * Limit how many Workspaces to delete.
     */
    limit?: number
  }

  /**
   * Workspace.sequences
   */
  export type Workspace$sequencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProteinSequence
     */
    select?: ProteinSequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProteinSequence
     */
    omit?: ProteinSequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProteinSequenceInclude<ExtArgs> | null
    where?: ProteinSequenceWhereInput
    orderBy?: ProteinSequenceOrderByWithRelationInput | ProteinSequenceOrderByWithRelationInput[]
    cursor?: ProteinSequenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProteinSequenceScalarFieldEnum | ProteinSequenceScalarFieldEnum[]
  }

  /**
   * Workspace.jobs
   */
  export type Workspace$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJob
     */
    select?: PredictionJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionJob
     */
    omit?: PredictionJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionJobInclude<ExtArgs> | null
    where?: PredictionJobWhereInput
    orderBy?: PredictionJobOrderByWithRelationInput | PredictionJobOrderByWithRelationInput[]
    cursor?: PredictionJobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PredictionJobScalarFieldEnum | PredictionJobScalarFieldEnum[]
  }

  /**
   * Workspace.bookmarks
   */
  export type Workspace$bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    where?: BookmarkWhereInput
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    cursor?: BookmarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Workspace without action
   */
  export type WorkspaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
  }


  /**
   * Model ProteinSequence
   */

  export type AggregateProteinSequence = {
    _count: ProteinSequenceCountAggregateOutputType | null
    _avg: ProteinSequenceAvgAggregateOutputType | null
    _sum: ProteinSequenceSumAggregateOutputType | null
    _min: ProteinSequenceMinAggregateOutputType | null
    _max: ProteinSequenceMaxAggregateOutputType | null
  }

  export type ProteinSequenceAvgAggregateOutputType = {
    sequenceLength: number | null
    molecularWeight: number | null
    isoelectricPoint: number | null
  }

  export type ProteinSequenceSumAggregateOutputType = {
    sequenceLength: number | null
    molecularWeight: number | null
    isoelectricPoint: number | null
  }

  export type ProteinSequenceMinAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    accession: string | null
    name: string | null
    organism: string | null
    sequence: string | null
    sequenceLength: number | null
    molecularWeight: number | null
    isoelectricPoint: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProteinSequenceMaxAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    accession: string | null
    name: string | null
    organism: string | null
    sequence: string | null
    sequenceLength: number | null
    molecularWeight: number | null
    isoelectricPoint: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProteinSequenceCountAggregateOutputType = {
    id: number
    workspaceId: number
    accession: number
    name: number
    organism: number
    sequence: number
    sequenceLength: number
    molecularWeight: number
    isoelectricPoint: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProteinSequenceAvgAggregateInputType = {
    sequenceLength?: true
    molecularWeight?: true
    isoelectricPoint?: true
  }

  export type ProteinSequenceSumAggregateInputType = {
    sequenceLength?: true
    molecularWeight?: true
    isoelectricPoint?: true
  }

  export type ProteinSequenceMinAggregateInputType = {
    id?: true
    workspaceId?: true
    accession?: true
    name?: true
    organism?: true
    sequence?: true
    sequenceLength?: true
    molecularWeight?: true
    isoelectricPoint?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProteinSequenceMaxAggregateInputType = {
    id?: true
    workspaceId?: true
    accession?: true
    name?: true
    organism?: true
    sequence?: true
    sequenceLength?: true
    molecularWeight?: true
    isoelectricPoint?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProteinSequenceCountAggregateInputType = {
    id?: true
    workspaceId?: true
    accession?: true
    name?: true
    organism?: true
    sequence?: true
    sequenceLength?: true
    molecularWeight?: true
    isoelectricPoint?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProteinSequenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProteinSequence to aggregate.
     */
    where?: ProteinSequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProteinSequences to fetch.
     */
    orderBy?: ProteinSequenceOrderByWithRelationInput | ProteinSequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProteinSequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProteinSequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProteinSequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProteinSequences
    **/
    _count?: true | ProteinSequenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProteinSequenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProteinSequenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProteinSequenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProteinSequenceMaxAggregateInputType
  }

  export type GetProteinSequenceAggregateType<T extends ProteinSequenceAggregateArgs> = {
        [P in keyof T & keyof AggregateProteinSequence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProteinSequence[P]>
      : GetScalarType<T[P], AggregateProteinSequence[P]>
  }




  export type ProteinSequenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProteinSequenceWhereInput
    orderBy?: ProteinSequenceOrderByWithAggregationInput | ProteinSequenceOrderByWithAggregationInput[]
    by: ProteinSequenceScalarFieldEnum[] | ProteinSequenceScalarFieldEnum
    having?: ProteinSequenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProteinSequenceCountAggregateInputType | true
    _avg?: ProteinSequenceAvgAggregateInputType
    _sum?: ProteinSequenceSumAggregateInputType
    _min?: ProteinSequenceMinAggregateInputType
    _max?: ProteinSequenceMaxAggregateInputType
  }

  export type ProteinSequenceGroupByOutputType = {
    id: string
    workspaceId: string
    accession: string | null
    name: string
    organism: string | null
    sequence: string
    sequenceLength: number
    molecularWeight: number | null
    isoelectricPoint: number | null
    createdAt: Date
    updatedAt: Date
    _count: ProteinSequenceCountAggregateOutputType | null
    _avg: ProteinSequenceAvgAggregateOutputType | null
    _sum: ProteinSequenceSumAggregateOutputType | null
    _min: ProteinSequenceMinAggregateOutputType | null
    _max: ProteinSequenceMaxAggregateOutputType | null
  }

  type GetProteinSequenceGroupByPayload<T extends ProteinSequenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProteinSequenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProteinSequenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProteinSequenceGroupByOutputType[P]>
            : GetScalarType<T[P], ProteinSequenceGroupByOutputType[P]>
        }
      >
    >


  export type ProteinSequenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    accession?: boolean
    name?: boolean
    organism?: boolean
    sequence?: boolean
    sequenceLength?: boolean
    molecularWeight?: boolean
    isoelectricPoint?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    jobs?: boolean | ProteinSequence$jobsArgs<ExtArgs>
    analysisResults?: boolean | ProteinSequence$analysisResultsArgs<ExtArgs>
    _count?: boolean | ProteinSequenceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proteinSequence"]>

  export type ProteinSequenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    accession?: boolean
    name?: boolean
    organism?: boolean
    sequence?: boolean
    sequenceLength?: boolean
    molecularWeight?: boolean
    isoelectricPoint?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proteinSequence"]>

  export type ProteinSequenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    accession?: boolean
    name?: boolean
    organism?: boolean
    sequence?: boolean
    sequenceLength?: boolean
    molecularWeight?: boolean
    isoelectricPoint?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proteinSequence"]>

  export type ProteinSequenceSelectScalar = {
    id?: boolean
    workspaceId?: boolean
    accession?: boolean
    name?: boolean
    organism?: boolean
    sequence?: boolean
    sequenceLength?: boolean
    molecularWeight?: boolean
    isoelectricPoint?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProteinSequenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workspaceId" | "accession" | "name" | "organism" | "sequence" | "sequenceLength" | "molecularWeight" | "isoelectricPoint" | "createdAt" | "updatedAt", ExtArgs["result"]["proteinSequence"]>
  export type ProteinSequenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    jobs?: boolean | ProteinSequence$jobsArgs<ExtArgs>
    analysisResults?: boolean | ProteinSequence$analysisResultsArgs<ExtArgs>
    _count?: boolean | ProteinSequenceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProteinSequenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }
  export type ProteinSequenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }

  export type $ProteinSequencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProteinSequence"
    objects: {
      workspace: Prisma.$WorkspacePayload<ExtArgs>
      jobs: Prisma.$PredictionJobPayload<ExtArgs>[]
      analysisResults: Prisma.$AnalysisResultPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workspaceId: string
      accession: string | null
      name: string
      organism: string | null
      sequence: string
      sequenceLength: number
      molecularWeight: number | null
      isoelectricPoint: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["proteinSequence"]>
    composites: {}
  }

  type ProteinSequenceGetPayload<S extends boolean | null | undefined | ProteinSequenceDefaultArgs> = $Result.GetResult<Prisma.$ProteinSequencePayload, S>

  type ProteinSequenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProteinSequenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProteinSequenceCountAggregateInputType | true
    }

  export interface ProteinSequenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProteinSequence'], meta: { name: 'ProteinSequence' } }
    /**
     * Find zero or one ProteinSequence that matches the filter.
     * @param {ProteinSequenceFindUniqueArgs} args - Arguments to find a ProteinSequence
     * @example
     * // Get one ProteinSequence
     * const proteinSequence = await prisma.proteinSequence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProteinSequenceFindUniqueArgs>(args: SelectSubset<T, ProteinSequenceFindUniqueArgs<ExtArgs>>): Prisma__ProteinSequenceClient<$Result.GetResult<Prisma.$ProteinSequencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProteinSequence that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProteinSequenceFindUniqueOrThrowArgs} args - Arguments to find a ProteinSequence
     * @example
     * // Get one ProteinSequence
     * const proteinSequence = await prisma.proteinSequence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProteinSequenceFindUniqueOrThrowArgs>(args: SelectSubset<T, ProteinSequenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProteinSequenceClient<$Result.GetResult<Prisma.$ProteinSequencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProteinSequence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProteinSequenceFindFirstArgs} args - Arguments to find a ProteinSequence
     * @example
     * // Get one ProteinSequence
     * const proteinSequence = await prisma.proteinSequence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProteinSequenceFindFirstArgs>(args?: SelectSubset<T, ProteinSequenceFindFirstArgs<ExtArgs>>): Prisma__ProteinSequenceClient<$Result.GetResult<Prisma.$ProteinSequencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProteinSequence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProteinSequenceFindFirstOrThrowArgs} args - Arguments to find a ProteinSequence
     * @example
     * // Get one ProteinSequence
     * const proteinSequence = await prisma.proteinSequence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProteinSequenceFindFirstOrThrowArgs>(args?: SelectSubset<T, ProteinSequenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProteinSequenceClient<$Result.GetResult<Prisma.$ProteinSequencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProteinSequences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProteinSequenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProteinSequences
     * const proteinSequences = await prisma.proteinSequence.findMany()
     * 
     * // Get first 10 ProteinSequences
     * const proteinSequences = await prisma.proteinSequence.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const proteinSequenceWithIdOnly = await prisma.proteinSequence.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProteinSequenceFindManyArgs>(args?: SelectSubset<T, ProteinSequenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProteinSequencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProteinSequence.
     * @param {ProteinSequenceCreateArgs} args - Arguments to create a ProteinSequence.
     * @example
     * // Create one ProteinSequence
     * const ProteinSequence = await prisma.proteinSequence.create({
     *   data: {
     *     // ... data to create a ProteinSequence
     *   }
     * })
     * 
     */
    create<T extends ProteinSequenceCreateArgs>(args: SelectSubset<T, ProteinSequenceCreateArgs<ExtArgs>>): Prisma__ProteinSequenceClient<$Result.GetResult<Prisma.$ProteinSequencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProteinSequences.
     * @param {ProteinSequenceCreateManyArgs} args - Arguments to create many ProteinSequences.
     * @example
     * // Create many ProteinSequences
     * const proteinSequence = await prisma.proteinSequence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProteinSequenceCreateManyArgs>(args?: SelectSubset<T, ProteinSequenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProteinSequences and returns the data saved in the database.
     * @param {ProteinSequenceCreateManyAndReturnArgs} args - Arguments to create many ProteinSequences.
     * @example
     * // Create many ProteinSequences
     * const proteinSequence = await prisma.proteinSequence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProteinSequences and only return the `id`
     * const proteinSequenceWithIdOnly = await prisma.proteinSequence.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProteinSequenceCreateManyAndReturnArgs>(args?: SelectSubset<T, ProteinSequenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProteinSequencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProteinSequence.
     * @param {ProteinSequenceDeleteArgs} args - Arguments to delete one ProteinSequence.
     * @example
     * // Delete one ProteinSequence
     * const ProteinSequence = await prisma.proteinSequence.delete({
     *   where: {
     *     // ... filter to delete one ProteinSequence
     *   }
     * })
     * 
     */
    delete<T extends ProteinSequenceDeleteArgs>(args: SelectSubset<T, ProteinSequenceDeleteArgs<ExtArgs>>): Prisma__ProteinSequenceClient<$Result.GetResult<Prisma.$ProteinSequencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProteinSequence.
     * @param {ProteinSequenceUpdateArgs} args - Arguments to update one ProteinSequence.
     * @example
     * // Update one ProteinSequence
     * const proteinSequence = await prisma.proteinSequence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProteinSequenceUpdateArgs>(args: SelectSubset<T, ProteinSequenceUpdateArgs<ExtArgs>>): Prisma__ProteinSequenceClient<$Result.GetResult<Prisma.$ProteinSequencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProteinSequences.
     * @param {ProteinSequenceDeleteManyArgs} args - Arguments to filter ProteinSequences to delete.
     * @example
     * // Delete a few ProteinSequences
     * const { count } = await prisma.proteinSequence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProteinSequenceDeleteManyArgs>(args?: SelectSubset<T, ProteinSequenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProteinSequences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProteinSequenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProteinSequences
     * const proteinSequence = await prisma.proteinSequence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProteinSequenceUpdateManyArgs>(args: SelectSubset<T, ProteinSequenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProteinSequences and returns the data updated in the database.
     * @param {ProteinSequenceUpdateManyAndReturnArgs} args - Arguments to update many ProteinSequences.
     * @example
     * // Update many ProteinSequences
     * const proteinSequence = await prisma.proteinSequence.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProteinSequences and only return the `id`
     * const proteinSequenceWithIdOnly = await prisma.proteinSequence.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProteinSequenceUpdateManyAndReturnArgs>(args: SelectSubset<T, ProteinSequenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProteinSequencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProteinSequence.
     * @param {ProteinSequenceUpsertArgs} args - Arguments to update or create a ProteinSequence.
     * @example
     * // Update or create a ProteinSequence
     * const proteinSequence = await prisma.proteinSequence.upsert({
     *   create: {
     *     // ... data to create a ProteinSequence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProteinSequence we want to update
     *   }
     * })
     */
    upsert<T extends ProteinSequenceUpsertArgs>(args: SelectSubset<T, ProteinSequenceUpsertArgs<ExtArgs>>): Prisma__ProteinSequenceClient<$Result.GetResult<Prisma.$ProteinSequencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProteinSequences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProteinSequenceCountArgs} args - Arguments to filter ProteinSequences to count.
     * @example
     * // Count the number of ProteinSequences
     * const count = await prisma.proteinSequence.count({
     *   where: {
     *     // ... the filter for the ProteinSequences we want to count
     *   }
     * })
    **/
    count<T extends ProteinSequenceCountArgs>(
      args?: Subset<T, ProteinSequenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProteinSequenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProteinSequence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProteinSequenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProteinSequenceAggregateArgs>(args: Subset<T, ProteinSequenceAggregateArgs>): Prisma.PrismaPromise<GetProteinSequenceAggregateType<T>>

    /**
     * Group by ProteinSequence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProteinSequenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProteinSequenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProteinSequenceGroupByArgs['orderBy'] }
        : { orderBy?: ProteinSequenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProteinSequenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProteinSequenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProteinSequence model
   */
  readonly fields: ProteinSequenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProteinSequence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProteinSequenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspace<T extends WorkspaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceDefaultArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    jobs<T extends ProteinSequence$jobsArgs<ExtArgs> = {}>(args?: Subset<T, ProteinSequence$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    analysisResults<T extends ProteinSequence$analysisResultsArgs<ExtArgs> = {}>(args?: Subset<T, ProteinSequence$analysisResultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProteinSequence model
   */
  interface ProteinSequenceFieldRefs {
    readonly id: FieldRef<"ProteinSequence", 'String'>
    readonly workspaceId: FieldRef<"ProteinSequence", 'String'>
    readonly accession: FieldRef<"ProteinSequence", 'String'>
    readonly name: FieldRef<"ProteinSequence", 'String'>
    readonly organism: FieldRef<"ProteinSequence", 'String'>
    readonly sequence: FieldRef<"ProteinSequence", 'String'>
    readonly sequenceLength: FieldRef<"ProteinSequence", 'Int'>
    readonly molecularWeight: FieldRef<"ProteinSequence", 'Float'>
    readonly isoelectricPoint: FieldRef<"ProteinSequence", 'Float'>
    readonly createdAt: FieldRef<"ProteinSequence", 'DateTime'>
    readonly updatedAt: FieldRef<"ProteinSequence", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProteinSequence findUnique
   */
  export type ProteinSequenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProteinSequence
     */
    select?: ProteinSequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProteinSequence
     */
    omit?: ProteinSequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProteinSequenceInclude<ExtArgs> | null
    /**
     * Filter, which ProteinSequence to fetch.
     */
    where: ProteinSequenceWhereUniqueInput
  }

  /**
   * ProteinSequence findUniqueOrThrow
   */
  export type ProteinSequenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProteinSequence
     */
    select?: ProteinSequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProteinSequence
     */
    omit?: ProteinSequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProteinSequenceInclude<ExtArgs> | null
    /**
     * Filter, which ProteinSequence to fetch.
     */
    where: ProteinSequenceWhereUniqueInput
  }

  /**
   * ProteinSequence findFirst
   */
  export type ProteinSequenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProteinSequence
     */
    select?: ProteinSequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProteinSequence
     */
    omit?: ProteinSequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProteinSequenceInclude<ExtArgs> | null
    /**
     * Filter, which ProteinSequence to fetch.
     */
    where?: ProteinSequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProteinSequences to fetch.
     */
    orderBy?: ProteinSequenceOrderByWithRelationInput | ProteinSequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProteinSequences.
     */
    cursor?: ProteinSequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProteinSequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProteinSequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProteinSequences.
     */
    distinct?: ProteinSequenceScalarFieldEnum | ProteinSequenceScalarFieldEnum[]
  }

  /**
   * ProteinSequence findFirstOrThrow
   */
  export type ProteinSequenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProteinSequence
     */
    select?: ProteinSequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProteinSequence
     */
    omit?: ProteinSequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProteinSequenceInclude<ExtArgs> | null
    /**
     * Filter, which ProteinSequence to fetch.
     */
    where?: ProteinSequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProteinSequences to fetch.
     */
    orderBy?: ProteinSequenceOrderByWithRelationInput | ProteinSequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProteinSequences.
     */
    cursor?: ProteinSequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProteinSequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProteinSequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProteinSequences.
     */
    distinct?: ProteinSequenceScalarFieldEnum | ProteinSequenceScalarFieldEnum[]
  }

  /**
   * ProteinSequence findMany
   */
  export type ProteinSequenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProteinSequence
     */
    select?: ProteinSequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProteinSequence
     */
    omit?: ProteinSequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProteinSequenceInclude<ExtArgs> | null
    /**
     * Filter, which ProteinSequences to fetch.
     */
    where?: ProteinSequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProteinSequences to fetch.
     */
    orderBy?: ProteinSequenceOrderByWithRelationInput | ProteinSequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProteinSequences.
     */
    cursor?: ProteinSequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProteinSequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProteinSequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProteinSequences.
     */
    distinct?: ProteinSequenceScalarFieldEnum | ProteinSequenceScalarFieldEnum[]
  }

  /**
   * ProteinSequence create
   */
  export type ProteinSequenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProteinSequence
     */
    select?: ProteinSequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProteinSequence
     */
    omit?: ProteinSequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProteinSequenceInclude<ExtArgs> | null
    /**
     * The data needed to create a ProteinSequence.
     */
    data: XOR<ProteinSequenceCreateInput, ProteinSequenceUncheckedCreateInput>
  }

  /**
   * ProteinSequence createMany
   */
  export type ProteinSequenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProteinSequences.
     */
    data: ProteinSequenceCreateManyInput | ProteinSequenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProteinSequence createManyAndReturn
   */
  export type ProteinSequenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProteinSequence
     */
    select?: ProteinSequenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProteinSequence
     */
    omit?: ProteinSequenceOmit<ExtArgs> | null
    /**
     * The data used to create many ProteinSequences.
     */
    data: ProteinSequenceCreateManyInput | ProteinSequenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProteinSequenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProteinSequence update
   */
  export type ProteinSequenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProteinSequence
     */
    select?: ProteinSequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProteinSequence
     */
    omit?: ProteinSequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProteinSequenceInclude<ExtArgs> | null
    /**
     * The data needed to update a ProteinSequence.
     */
    data: XOR<ProteinSequenceUpdateInput, ProteinSequenceUncheckedUpdateInput>
    /**
     * Choose, which ProteinSequence to update.
     */
    where: ProteinSequenceWhereUniqueInput
  }

  /**
   * ProteinSequence updateMany
   */
  export type ProteinSequenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProteinSequences.
     */
    data: XOR<ProteinSequenceUpdateManyMutationInput, ProteinSequenceUncheckedUpdateManyInput>
    /**
     * Filter which ProteinSequences to update
     */
    where?: ProteinSequenceWhereInput
    /**
     * Limit how many ProteinSequences to update.
     */
    limit?: number
  }

  /**
   * ProteinSequence updateManyAndReturn
   */
  export type ProteinSequenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProteinSequence
     */
    select?: ProteinSequenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProteinSequence
     */
    omit?: ProteinSequenceOmit<ExtArgs> | null
    /**
     * The data used to update ProteinSequences.
     */
    data: XOR<ProteinSequenceUpdateManyMutationInput, ProteinSequenceUncheckedUpdateManyInput>
    /**
     * Filter which ProteinSequences to update
     */
    where?: ProteinSequenceWhereInput
    /**
     * Limit how many ProteinSequences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProteinSequenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProteinSequence upsert
   */
  export type ProteinSequenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProteinSequence
     */
    select?: ProteinSequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProteinSequence
     */
    omit?: ProteinSequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProteinSequenceInclude<ExtArgs> | null
    /**
     * The filter to search for the ProteinSequence to update in case it exists.
     */
    where: ProteinSequenceWhereUniqueInput
    /**
     * In case the ProteinSequence found by the `where` argument doesn't exist, create a new ProteinSequence with this data.
     */
    create: XOR<ProteinSequenceCreateInput, ProteinSequenceUncheckedCreateInput>
    /**
     * In case the ProteinSequence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProteinSequenceUpdateInput, ProteinSequenceUncheckedUpdateInput>
  }

  /**
   * ProteinSequence delete
   */
  export type ProteinSequenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProteinSequence
     */
    select?: ProteinSequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProteinSequence
     */
    omit?: ProteinSequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProteinSequenceInclude<ExtArgs> | null
    /**
     * Filter which ProteinSequence to delete.
     */
    where: ProteinSequenceWhereUniqueInput
  }

  /**
   * ProteinSequence deleteMany
   */
  export type ProteinSequenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProteinSequences to delete
     */
    where?: ProteinSequenceWhereInput
    /**
     * Limit how many ProteinSequences to delete.
     */
    limit?: number
  }

  /**
   * ProteinSequence.jobs
   */
  export type ProteinSequence$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJob
     */
    select?: PredictionJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionJob
     */
    omit?: PredictionJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionJobInclude<ExtArgs> | null
    where?: PredictionJobWhereInput
    orderBy?: PredictionJobOrderByWithRelationInput | PredictionJobOrderByWithRelationInput[]
    cursor?: PredictionJobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PredictionJobScalarFieldEnum | PredictionJobScalarFieldEnum[]
  }

  /**
   * ProteinSequence.analysisResults
   */
  export type ProteinSequence$analysisResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisResult
     */
    select?: AnalysisResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisResult
     */
    omit?: AnalysisResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisResultInclude<ExtArgs> | null
    where?: AnalysisResultWhereInput
    orderBy?: AnalysisResultOrderByWithRelationInput | AnalysisResultOrderByWithRelationInput[]
    cursor?: AnalysisResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalysisResultScalarFieldEnum | AnalysisResultScalarFieldEnum[]
  }

  /**
   * ProteinSequence without action
   */
  export type ProteinSequenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProteinSequence
     */
    select?: ProteinSequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProteinSequence
     */
    omit?: ProteinSequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProteinSequenceInclude<ExtArgs> | null
  }


  /**
   * Model PredictionJob
   */

  export type AggregatePredictionJob = {
    _count: PredictionJobCountAggregateOutputType | null
    _avg: PredictionJobAvgAggregateOutputType | null
    _sum: PredictionJobSumAggregateOutputType | null
    _min: PredictionJobMinAggregateOutputType | null
    _max: PredictionJobMaxAggregateOutputType | null
  }

  export type PredictionJobAvgAggregateOutputType = {
    progress: number | null
    confidence: number | null
  }

  export type PredictionJobSumAggregateOutputType = {
    progress: number | null
    confidence: number | null
  }

  export type PredictionJobMinAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    sequenceId: string | null
    method: $Enums.PredictionMethod | null
    status: $Enums.JobStatus | null
    progress: number | null
    confidence: number | null
    errorMessage: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
  }

  export type PredictionJobMaxAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    sequenceId: string | null
    method: $Enums.PredictionMethod | null
    status: $Enums.JobStatus | null
    progress: number | null
    confidence: number | null
    errorMessage: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
  }

  export type PredictionJobCountAggregateOutputType = {
    id: number
    workspaceId: number
    sequenceId: number
    method: number
    status: number
    progress: number
    confidence: number
    parameters: number
    errorMessage: number
    createdAt: number
    updatedAt: number
    completedAt: number
    _all: number
  }


  export type PredictionJobAvgAggregateInputType = {
    progress?: true
    confidence?: true
  }

  export type PredictionJobSumAggregateInputType = {
    progress?: true
    confidence?: true
  }

  export type PredictionJobMinAggregateInputType = {
    id?: true
    workspaceId?: true
    sequenceId?: true
    method?: true
    status?: true
    progress?: true
    confidence?: true
    errorMessage?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
  }

  export type PredictionJobMaxAggregateInputType = {
    id?: true
    workspaceId?: true
    sequenceId?: true
    method?: true
    status?: true
    progress?: true
    confidence?: true
    errorMessage?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
  }

  export type PredictionJobCountAggregateInputType = {
    id?: true
    workspaceId?: true
    sequenceId?: true
    method?: true
    status?: true
    progress?: true
    confidence?: true
    parameters?: true
    errorMessage?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    _all?: true
  }

  export type PredictionJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PredictionJob to aggregate.
     */
    where?: PredictionJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PredictionJobs to fetch.
     */
    orderBy?: PredictionJobOrderByWithRelationInput | PredictionJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PredictionJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PredictionJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PredictionJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PredictionJobs
    **/
    _count?: true | PredictionJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PredictionJobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PredictionJobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PredictionJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PredictionJobMaxAggregateInputType
  }

  export type GetPredictionJobAggregateType<T extends PredictionJobAggregateArgs> = {
        [P in keyof T & keyof AggregatePredictionJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePredictionJob[P]>
      : GetScalarType<T[P], AggregatePredictionJob[P]>
  }




  export type PredictionJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PredictionJobWhereInput
    orderBy?: PredictionJobOrderByWithAggregationInput | PredictionJobOrderByWithAggregationInput[]
    by: PredictionJobScalarFieldEnum[] | PredictionJobScalarFieldEnum
    having?: PredictionJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PredictionJobCountAggregateInputType | true
    _avg?: PredictionJobAvgAggregateInputType
    _sum?: PredictionJobSumAggregateInputType
    _min?: PredictionJobMinAggregateInputType
    _max?: PredictionJobMaxAggregateInputType
  }

  export type PredictionJobGroupByOutputType = {
    id: string
    workspaceId: string
    sequenceId: string
    method: $Enums.PredictionMethod
    status: $Enums.JobStatus
    progress: number
    confidence: number | null
    parameters: JsonValue | null
    errorMessage: string | null
    createdAt: Date
    updatedAt: Date
    completedAt: Date | null
    _count: PredictionJobCountAggregateOutputType | null
    _avg: PredictionJobAvgAggregateOutputType | null
    _sum: PredictionJobSumAggregateOutputType | null
    _min: PredictionJobMinAggregateOutputType | null
    _max: PredictionJobMaxAggregateOutputType | null
  }

  type GetPredictionJobGroupByPayload<T extends PredictionJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PredictionJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PredictionJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PredictionJobGroupByOutputType[P]>
            : GetScalarType<T[P], PredictionJobGroupByOutputType[P]>
        }
      >
    >


  export type PredictionJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    sequenceId?: boolean
    method?: boolean
    status?: boolean
    progress?: boolean
    confidence?: boolean
    parameters?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    sequence?: boolean | ProteinSequenceDefaultArgs<ExtArgs>
    templateHits?: boolean | PredictionJob$templateHitsArgs<ExtArgs>
    structures?: boolean | PredictionJob$structuresArgs<ExtArgs>
    analysisResults?: boolean | PredictionJob$analysisResultsArgs<ExtArgs>
    _count?: boolean | PredictionJobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["predictionJob"]>

  export type PredictionJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    sequenceId?: boolean
    method?: boolean
    status?: boolean
    progress?: boolean
    confidence?: boolean
    parameters?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    sequence?: boolean | ProteinSequenceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["predictionJob"]>

  export type PredictionJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    sequenceId?: boolean
    method?: boolean
    status?: boolean
    progress?: boolean
    confidence?: boolean
    parameters?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    sequence?: boolean | ProteinSequenceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["predictionJob"]>

  export type PredictionJobSelectScalar = {
    id?: boolean
    workspaceId?: boolean
    sequenceId?: boolean
    method?: boolean
    status?: boolean
    progress?: boolean
    confidence?: boolean
    parameters?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
  }

  export type PredictionJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workspaceId" | "sequenceId" | "method" | "status" | "progress" | "confidence" | "parameters" | "errorMessage" | "createdAt" | "updatedAt" | "completedAt", ExtArgs["result"]["predictionJob"]>
  export type PredictionJobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    sequence?: boolean | ProteinSequenceDefaultArgs<ExtArgs>
    templateHits?: boolean | PredictionJob$templateHitsArgs<ExtArgs>
    structures?: boolean | PredictionJob$structuresArgs<ExtArgs>
    analysisResults?: boolean | PredictionJob$analysisResultsArgs<ExtArgs>
    _count?: boolean | PredictionJobCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PredictionJobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    sequence?: boolean | ProteinSequenceDefaultArgs<ExtArgs>
  }
  export type PredictionJobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    sequence?: boolean | ProteinSequenceDefaultArgs<ExtArgs>
  }

  export type $PredictionJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PredictionJob"
    objects: {
      workspace: Prisma.$WorkspacePayload<ExtArgs>
      sequence: Prisma.$ProteinSequencePayload<ExtArgs>
      templateHits: Prisma.$TemplateHitPayload<ExtArgs>[]
      structures: Prisma.$StructureModelPayload<ExtArgs>[]
      analysisResults: Prisma.$AnalysisResultPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workspaceId: string
      sequenceId: string
      method: $Enums.PredictionMethod
      status: $Enums.JobStatus
      progress: number
      confidence: number | null
      parameters: Prisma.JsonValue | null
      errorMessage: string | null
      createdAt: Date
      updatedAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["predictionJob"]>
    composites: {}
  }

  type PredictionJobGetPayload<S extends boolean | null | undefined | PredictionJobDefaultArgs> = $Result.GetResult<Prisma.$PredictionJobPayload, S>

  type PredictionJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PredictionJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PredictionJobCountAggregateInputType | true
    }

  export interface PredictionJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PredictionJob'], meta: { name: 'PredictionJob' } }
    /**
     * Find zero or one PredictionJob that matches the filter.
     * @param {PredictionJobFindUniqueArgs} args - Arguments to find a PredictionJob
     * @example
     * // Get one PredictionJob
     * const predictionJob = await prisma.predictionJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PredictionJobFindUniqueArgs>(args: SelectSubset<T, PredictionJobFindUniqueArgs<ExtArgs>>): Prisma__PredictionJobClient<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PredictionJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PredictionJobFindUniqueOrThrowArgs} args - Arguments to find a PredictionJob
     * @example
     * // Get one PredictionJob
     * const predictionJob = await prisma.predictionJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PredictionJobFindUniqueOrThrowArgs>(args: SelectSubset<T, PredictionJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PredictionJobClient<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PredictionJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionJobFindFirstArgs} args - Arguments to find a PredictionJob
     * @example
     * // Get one PredictionJob
     * const predictionJob = await prisma.predictionJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PredictionJobFindFirstArgs>(args?: SelectSubset<T, PredictionJobFindFirstArgs<ExtArgs>>): Prisma__PredictionJobClient<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PredictionJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionJobFindFirstOrThrowArgs} args - Arguments to find a PredictionJob
     * @example
     * // Get one PredictionJob
     * const predictionJob = await prisma.predictionJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PredictionJobFindFirstOrThrowArgs>(args?: SelectSubset<T, PredictionJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__PredictionJobClient<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PredictionJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PredictionJobs
     * const predictionJobs = await prisma.predictionJob.findMany()
     * 
     * // Get first 10 PredictionJobs
     * const predictionJobs = await prisma.predictionJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const predictionJobWithIdOnly = await prisma.predictionJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PredictionJobFindManyArgs>(args?: SelectSubset<T, PredictionJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PredictionJob.
     * @param {PredictionJobCreateArgs} args - Arguments to create a PredictionJob.
     * @example
     * // Create one PredictionJob
     * const PredictionJob = await prisma.predictionJob.create({
     *   data: {
     *     // ... data to create a PredictionJob
     *   }
     * })
     * 
     */
    create<T extends PredictionJobCreateArgs>(args: SelectSubset<T, PredictionJobCreateArgs<ExtArgs>>): Prisma__PredictionJobClient<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PredictionJobs.
     * @param {PredictionJobCreateManyArgs} args - Arguments to create many PredictionJobs.
     * @example
     * // Create many PredictionJobs
     * const predictionJob = await prisma.predictionJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PredictionJobCreateManyArgs>(args?: SelectSubset<T, PredictionJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PredictionJobs and returns the data saved in the database.
     * @param {PredictionJobCreateManyAndReturnArgs} args - Arguments to create many PredictionJobs.
     * @example
     * // Create many PredictionJobs
     * const predictionJob = await prisma.predictionJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PredictionJobs and only return the `id`
     * const predictionJobWithIdOnly = await prisma.predictionJob.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PredictionJobCreateManyAndReturnArgs>(args?: SelectSubset<T, PredictionJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PredictionJob.
     * @param {PredictionJobDeleteArgs} args - Arguments to delete one PredictionJob.
     * @example
     * // Delete one PredictionJob
     * const PredictionJob = await prisma.predictionJob.delete({
     *   where: {
     *     // ... filter to delete one PredictionJob
     *   }
     * })
     * 
     */
    delete<T extends PredictionJobDeleteArgs>(args: SelectSubset<T, PredictionJobDeleteArgs<ExtArgs>>): Prisma__PredictionJobClient<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PredictionJob.
     * @param {PredictionJobUpdateArgs} args - Arguments to update one PredictionJob.
     * @example
     * // Update one PredictionJob
     * const predictionJob = await prisma.predictionJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PredictionJobUpdateArgs>(args: SelectSubset<T, PredictionJobUpdateArgs<ExtArgs>>): Prisma__PredictionJobClient<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PredictionJobs.
     * @param {PredictionJobDeleteManyArgs} args - Arguments to filter PredictionJobs to delete.
     * @example
     * // Delete a few PredictionJobs
     * const { count } = await prisma.predictionJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PredictionJobDeleteManyArgs>(args?: SelectSubset<T, PredictionJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PredictionJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PredictionJobs
     * const predictionJob = await prisma.predictionJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PredictionJobUpdateManyArgs>(args: SelectSubset<T, PredictionJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PredictionJobs and returns the data updated in the database.
     * @param {PredictionJobUpdateManyAndReturnArgs} args - Arguments to update many PredictionJobs.
     * @example
     * // Update many PredictionJobs
     * const predictionJob = await prisma.predictionJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PredictionJobs and only return the `id`
     * const predictionJobWithIdOnly = await prisma.predictionJob.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PredictionJobUpdateManyAndReturnArgs>(args: SelectSubset<T, PredictionJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PredictionJob.
     * @param {PredictionJobUpsertArgs} args - Arguments to update or create a PredictionJob.
     * @example
     * // Update or create a PredictionJob
     * const predictionJob = await prisma.predictionJob.upsert({
     *   create: {
     *     // ... data to create a PredictionJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PredictionJob we want to update
     *   }
     * })
     */
    upsert<T extends PredictionJobUpsertArgs>(args: SelectSubset<T, PredictionJobUpsertArgs<ExtArgs>>): Prisma__PredictionJobClient<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PredictionJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionJobCountArgs} args - Arguments to filter PredictionJobs to count.
     * @example
     * // Count the number of PredictionJobs
     * const count = await prisma.predictionJob.count({
     *   where: {
     *     // ... the filter for the PredictionJobs we want to count
     *   }
     * })
    **/
    count<T extends PredictionJobCountArgs>(
      args?: Subset<T, PredictionJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PredictionJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PredictionJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PredictionJobAggregateArgs>(args: Subset<T, PredictionJobAggregateArgs>): Prisma.PrismaPromise<GetPredictionJobAggregateType<T>>

    /**
     * Group by PredictionJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionJobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PredictionJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PredictionJobGroupByArgs['orderBy'] }
        : { orderBy?: PredictionJobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PredictionJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPredictionJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PredictionJob model
   */
  readonly fields: PredictionJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PredictionJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PredictionJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspace<T extends WorkspaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceDefaultArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sequence<T extends ProteinSequenceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProteinSequenceDefaultArgs<ExtArgs>>): Prisma__ProteinSequenceClient<$Result.GetResult<Prisma.$ProteinSequencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    templateHits<T extends PredictionJob$templateHitsArgs<ExtArgs> = {}>(args?: Subset<T, PredictionJob$templateHitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateHitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    structures<T extends PredictionJob$structuresArgs<ExtArgs> = {}>(args?: Subset<T, PredictionJob$structuresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StructureModelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    analysisResults<T extends PredictionJob$analysisResultsArgs<ExtArgs> = {}>(args?: Subset<T, PredictionJob$analysisResultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PredictionJob model
   */
  interface PredictionJobFieldRefs {
    readonly id: FieldRef<"PredictionJob", 'String'>
    readonly workspaceId: FieldRef<"PredictionJob", 'String'>
    readonly sequenceId: FieldRef<"PredictionJob", 'String'>
    readonly method: FieldRef<"PredictionJob", 'PredictionMethod'>
    readonly status: FieldRef<"PredictionJob", 'JobStatus'>
    readonly progress: FieldRef<"PredictionJob", 'Int'>
    readonly confidence: FieldRef<"PredictionJob", 'Float'>
    readonly parameters: FieldRef<"PredictionJob", 'Json'>
    readonly errorMessage: FieldRef<"PredictionJob", 'String'>
    readonly createdAt: FieldRef<"PredictionJob", 'DateTime'>
    readonly updatedAt: FieldRef<"PredictionJob", 'DateTime'>
    readonly completedAt: FieldRef<"PredictionJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PredictionJob findUnique
   */
  export type PredictionJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJob
     */
    select?: PredictionJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionJob
     */
    omit?: PredictionJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionJobInclude<ExtArgs> | null
    /**
     * Filter, which PredictionJob to fetch.
     */
    where: PredictionJobWhereUniqueInput
  }

  /**
   * PredictionJob findUniqueOrThrow
   */
  export type PredictionJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJob
     */
    select?: PredictionJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionJob
     */
    omit?: PredictionJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionJobInclude<ExtArgs> | null
    /**
     * Filter, which PredictionJob to fetch.
     */
    where: PredictionJobWhereUniqueInput
  }

  /**
   * PredictionJob findFirst
   */
  export type PredictionJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJob
     */
    select?: PredictionJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionJob
     */
    omit?: PredictionJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionJobInclude<ExtArgs> | null
    /**
     * Filter, which PredictionJob to fetch.
     */
    where?: PredictionJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PredictionJobs to fetch.
     */
    orderBy?: PredictionJobOrderByWithRelationInput | PredictionJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PredictionJobs.
     */
    cursor?: PredictionJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PredictionJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PredictionJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PredictionJobs.
     */
    distinct?: PredictionJobScalarFieldEnum | PredictionJobScalarFieldEnum[]
  }

  /**
   * PredictionJob findFirstOrThrow
   */
  export type PredictionJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJob
     */
    select?: PredictionJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionJob
     */
    omit?: PredictionJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionJobInclude<ExtArgs> | null
    /**
     * Filter, which PredictionJob to fetch.
     */
    where?: PredictionJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PredictionJobs to fetch.
     */
    orderBy?: PredictionJobOrderByWithRelationInput | PredictionJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PredictionJobs.
     */
    cursor?: PredictionJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PredictionJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PredictionJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PredictionJobs.
     */
    distinct?: PredictionJobScalarFieldEnum | PredictionJobScalarFieldEnum[]
  }

  /**
   * PredictionJob findMany
   */
  export type PredictionJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJob
     */
    select?: PredictionJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionJob
     */
    omit?: PredictionJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionJobInclude<ExtArgs> | null
    /**
     * Filter, which PredictionJobs to fetch.
     */
    where?: PredictionJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PredictionJobs to fetch.
     */
    orderBy?: PredictionJobOrderByWithRelationInput | PredictionJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PredictionJobs.
     */
    cursor?: PredictionJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PredictionJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PredictionJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PredictionJobs.
     */
    distinct?: PredictionJobScalarFieldEnum | PredictionJobScalarFieldEnum[]
  }

  /**
   * PredictionJob create
   */
  export type PredictionJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJob
     */
    select?: PredictionJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionJob
     */
    omit?: PredictionJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionJobInclude<ExtArgs> | null
    /**
     * The data needed to create a PredictionJob.
     */
    data: XOR<PredictionJobCreateInput, PredictionJobUncheckedCreateInput>
  }

  /**
   * PredictionJob createMany
   */
  export type PredictionJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PredictionJobs.
     */
    data: PredictionJobCreateManyInput | PredictionJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PredictionJob createManyAndReturn
   */
  export type PredictionJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJob
     */
    select?: PredictionJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionJob
     */
    omit?: PredictionJobOmit<ExtArgs> | null
    /**
     * The data used to create many PredictionJobs.
     */
    data: PredictionJobCreateManyInput | PredictionJobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionJobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PredictionJob update
   */
  export type PredictionJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJob
     */
    select?: PredictionJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionJob
     */
    omit?: PredictionJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionJobInclude<ExtArgs> | null
    /**
     * The data needed to update a PredictionJob.
     */
    data: XOR<PredictionJobUpdateInput, PredictionJobUncheckedUpdateInput>
    /**
     * Choose, which PredictionJob to update.
     */
    where: PredictionJobWhereUniqueInput
  }

  /**
   * PredictionJob updateMany
   */
  export type PredictionJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PredictionJobs.
     */
    data: XOR<PredictionJobUpdateManyMutationInput, PredictionJobUncheckedUpdateManyInput>
    /**
     * Filter which PredictionJobs to update
     */
    where?: PredictionJobWhereInput
    /**
     * Limit how many PredictionJobs to update.
     */
    limit?: number
  }

  /**
   * PredictionJob updateManyAndReturn
   */
  export type PredictionJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJob
     */
    select?: PredictionJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionJob
     */
    omit?: PredictionJobOmit<ExtArgs> | null
    /**
     * The data used to update PredictionJobs.
     */
    data: XOR<PredictionJobUpdateManyMutationInput, PredictionJobUncheckedUpdateManyInput>
    /**
     * Filter which PredictionJobs to update
     */
    where?: PredictionJobWhereInput
    /**
     * Limit how many PredictionJobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionJobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PredictionJob upsert
   */
  export type PredictionJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJob
     */
    select?: PredictionJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionJob
     */
    omit?: PredictionJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionJobInclude<ExtArgs> | null
    /**
     * The filter to search for the PredictionJob to update in case it exists.
     */
    where: PredictionJobWhereUniqueInput
    /**
     * In case the PredictionJob found by the `where` argument doesn't exist, create a new PredictionJob with this data.
     */
    create: XOR<PredictionJobCreateInput, PredictionJobUncheckedCreateInput>
    /**
     * In case the PredictionJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PredictionJobUpdateInput, PredictionJobUncheckedUpdateInput>
  }

  /**
   * PredictionJob delete
   */
  export type PredictionJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJob
     */
    select?: PredictionJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionJob
     */
    omit?: PredictionJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionJobInclude<ExtArgs> | null
    /**
     * Filter which PredictionJob to delete.
     */
    where: PredictionJobWhereUniqueInput
  }

  /**
   * PredictionJob deleteMany
   */
  export type PredictionJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PredictionJobs to delete
     */
    where?: PredictionJobWhereInput
    /**
     * Limit how many PredictionJobs to delete.
     */
    limit?: number
  }

  /**
   * PredictionJob.templateHits
   */
  export type PredictionJob$templateHitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateHit
     */
    select?: TemplateHitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateHit
     */
    omit?: TemplateHitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateHitInclude<ExtArgs> | null
    where?: TemplateHitWhereInput
    orderBy?: TemplateHitOrderByWithRelationInput | TemplateHitOrderByWithRelationInput[]
    cursor?: TemplateHitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TemplateHitScalarFieldEnum | TemplateHitScalarFieldEnum[]
  }

  /**
   * PredictionJob.structures
   */
  export type PredictionJob$structuresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StructureModel
     */
    select?: StructureModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StructureModel
     */
    omit?: StructureModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StructureModelInclude<ExtArgs> | null
    where?: StructureModelWhereInput
    orderBy?: StructureModelOrderByWithRelationInput | StructureModelOrderByWithRelationInput[]
    cursor?: StructureModelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StructureModelScalarFieldEnum | StructureModelScalarFieldEnum[]
  }

  /**
   * PredictionJob.analysisResults
   */
  export type PredictionJob$analysisResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisResult
     */
    select?: AnalysisResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisResult
     */
    omit?: AnalysisResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisResultInclude<ExtArgs> | null
    where?: AnalysisResultWhereInput
    orderBy?: AnalysisResultOrderByWithRelationInput | AnalysisResultOrderByWithRelationInput[]
    cursor?: AnalysisResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalysisResultScalarFieldEnum | AnalysisResultScalarFieldEnum[]
  }

  /**
   * PredictionJob without action
   */
  export type PredictionJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJob
     */
    select?: PredictionJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionJob
     */
    omit?: PredictionJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionJobInclude<ExtArgs> | null
  }


  /**
   * Model TemplateHit
   */

  export type AggregateTemplateHit = {
    _count: TemplateHitCountAggregateOutputType | null
    _avg: TemplateHitAvgAggregateOutputType | null
    _sum: TemplateHitSumAggregateOutputType | null
    _min: TemplateHitMinAggregateOutputType | null
    _max: TemplateHitMaxAggregateOutputType | null
  }

  export type TemplateHitAvgAggregateOutputType = {
    resolution: number | null
    sequenceIdentity: number | null
    coverage: number | null
    eValue: number | null
    foldseekScore: number | null
  }

  export type TemplateHitSumAggregateOutputType = {
    resolution: number | null
    sequenceIdentity: number | null
    coverage: number | null
    eValue: number | null
    foldseekScore: number | null
  }

  export type TemplateHitMinAggregateOutputType = {
    id: string | null
    jobId: string | null
    pdbId: string | null
    chainId: string | null
    title: string | null
    organism: string | null
    resolution: number | null
    sequenceIdentity: number | null
    coverage: number | null
    eValue: number | null
    foldseekScore: number | null
    reliabilityBand: string | null
    createdAt: Date | null
  }

  export type TemplateHitMaxAggregateOutputType = {
    id: string | null
    jobId: string | null
    pdbId: string | null
    chainId: string | null
    title: string | null
    organism: string | null
    resolution: number | null
    sequenceIdentity: number | null
    coverage: number | null
    eValue: number | null
    foldseekScore: number | null
    reliabilityBand: string | null
    createdAt: Date | null
  }

  export type TemplateHitCountAggregateOutputType = {
    id: number
    jobId: number
    pdbId: number
    chainId: number
    title: number
    organism: number
    resolution: number
    sequenceIdentity: number
    coverage: number
    eValue: number
    foldseekScore: number
    reliabilityBand: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type TemplateHitAvgAggregateInputType = {
    resolution?: true
    sequenceIdentity?: true
    coverage?: true
    eValue?: true
    foldseekScore?: true
  }

  export type TemplateHitSumAggregateInputType = {
    resolution?: true
    sequenceIdentity?: true
    coverage?: true
    eValue?: true
    foldseekScore?: true
  }

  export type TemplateHitMinAggregateInputType = {
    id?: true
    jobId?: true
    pdbId?: true
    chainId?: true
    title?: true
    organism?: true
    resolution?: true
    sequenceIdentity?: true
    coverage?: true
    eValue?: true
    foldseekScore?: true
    reliabilityBand?: true
    createdAt?: true
  }

  export type TemplateHitMaxAggregateInputType = {
    id?: true
    jobId?: true
    pdbId?: true
    chainId?: true
    title?: true
    organism?: true
    resolution?: true
    sequenceIdentity?: true
    coverage?: true
    eValue?: true
    foldseekScore?: true
    reliabilityBand?: true
    createdAt?: true
  }

  export type TemplateHitCountAggregateInputType = {
    id?: true
    jobId?: true
    pdbId?: true
    chainId?: true
    title?: true
    organism?: true
    resolution?: true
    sequenceIdentity?: true
    coverage?: true
    eValue?: true
    foldseekScore?: true
    reliabilityBand?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type TemplateHitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemplateHit to aggregate.
     */
    where?: TemplateHitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateHits to fetch.
     */
    orderBy?: TemplateHitOrderByWithRelationInput | TemplateHitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TemplateHitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateHits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateHits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TemplateHits
    **/
    _count?: true | TemplateHitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TemplateHitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TemplateHitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplateHitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplateHitMaxAggregateInputType
  }

  export type GetTemplateHitAggregateType<T extends TemplateHitAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplateHit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplateHit[P]>
      : GetScalarType<T[P], AggregateTemplateHit[P]>
  }




  export type TemplateHitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateHitWhereInput
    orderBy?: TemplateHitOrderByWithAggregationInput | TemplateHitOrderByWithAggregationInput[]
    by: TemplateHitScalarFieldEnum[] | TemplateHitScalarFieldEnum
    having?: TemplateHitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplateHitCountAggregateInputType | true
    _avg?: TemplateHitAvgAggregateInputType
    _sum?: TemplateHitSumAggregateInputType
    _min?: TemplateHitMinAggregateInputType
    _max?: TemplateHitMaxAggregateInputType
  }

  export type TemplateHitGroupByOutputType = {
    id: string
    jobId: string
    pdbId: string
    chainId: string | null
    title: string
    organism: string | null
    resolution: number | null
    sequenceIdentity: number
    coverage: number
    eValue: number | null
    foldseekScore: number | null
    reliabilityBand: string
    metadata: JsonValue | null
    createdAt: Date
    _count: TemplateHitCountAggregateOutputType | null
    _avg: TemplateHitAvgAggregateOutputType | null
    _sum: TemplateHitSumAggregateOutputType | null
    _min: TemplateHitMinAggregateOutputType | null
    _max: TemplateHitMaxAggregateOutputType | null
  }

  type GetTemplateHitGroupByPayload<T extends TemplateHitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemplateHitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplateHitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplateHitGroupByOutputType[P]>
            : GetScalarType<T[P], TemplateHitGroupByOutputType[P]>
        }
      >
    >


  export type TemplateHitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    pdbId?: boolean
    chainId?: boolean
    title?: boolean
    organism?: boolean
    resolution?: boolean
    sequenceIdentity?: boolean
    coverage?: boolean
    eValue?: boolean
    foldseekScore?: boolean
    reliabilityBand?: boolean
    metadata?: boolean
    createdAt?: boolean
    job?: boolean | PredictionJobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templateHit"]>

  export type TemplateHitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    pdbId?: boolean
    chainId?: boolean
    title?: boolean
    organism?: boolean
    resolution?: boolean
    sequenceIdentity?: boolean
    coverage?: boolean
    eValue?: boolean
    foldseekScore?: boolean
    reliabilityBand?: boolean
    metadata?: boolean
    createdAt?: boolean
    job?: boolean | PredictionJobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templateHit"]>

  export type TemplateHitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    pdbId?: boolean
    chainId?: boolean
    title?: boolean
    organism?: boolean
    resolution?: boolean
    sequenceIdentity?: boolean
    coverage?: boolean
    eValue?: boolean
    foldseekScore?: boolean
    reliabilityBand?: boolean
    metadata?: boolean
    createdAt?: boolean
    job?: boolean | PredictionJobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templateHit"]>

  export type TemplateHitSelectScalar = {
    id?: boolean
    jobId?: boolean
    pdbId?: boolean
    chainId?: boolean
    title?: boolean
    organism?: boolean
    resolution?: boolean
    sequenceIdentity?: boolean
    coverage?: boolean
    eValue?: boolean
    foldseekScore?: boolean
    reliabilityBand?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type TemplateHitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "jobId" | "pdbId" | "chainId" | "title" | "organism" | "resolution" | "sequenceIdentity" | "coverage" | "eValue" | "foldseekScore" | "reliabilityBand" | "metadata" | "createdAt", ExtArgs["result"]["templateHit"]>
  export type TemplateHitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | PredictionJobDefaultArgs<ExtArgs>
  }
  export type TemplateHitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | PredictionJobDefaultArgs<ExtArgs>
  }
  export type TemplateHitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | PredictionJobDefaultArgs<ExtArgs>
  }

  export type $TemplateHitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TemplateHit"
    objects: {
      job: Prisma.$PredictionJobPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobId: string
      pdbId: string
      chainId: string | null
      title: string
      organism: string | null
      resolution: number | null
      sequenceIdentity: number
      coverage: number
      eValue: number | null
      foldseekScore: number | null
      reliabilityBand: string
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["templateHit"]>
    composites: {}
  }

  type TemplateHitGetPayload<S extends boolean | null | undefined | TemplateHitDefaultArgs> = $Result.GetResult<Prisma.$TemplateHitPayload, S>

  type TemplateHitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TemplateHitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TemplateHitCountAggregateInputType | true
    }

  export interface TemplateHitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TemplateHit'], meta: { name: 'TemplateHit' } }
    /**
     * Find zero or one TemplateHit that matches the filter.
     * @param {TemplateHitFindUniqueArgs} args - Arguments to find a TemplateHit
     * @example
     * // Get one TemplateHit
     * const templateHit = await prisma.templateHit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TemplateHitFindUniqueArgs>(args: SelectSubset<T, TemplateHitFindUniqueArgs<ExtArgs>>): Prisma__TemplateHitClient<$Result.GetResult<Prisma.$TemplateHitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TemplateHit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TemplateHitFindUniqueOrThrowArgs} args - Arguments to find a TemplateHit
     * @example
     * // Get one TemplateHit
     * const templateHit = await prisma.templateHit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TemplateHitFindUniqueOrThrowArgs>(args: SelectSubset<T, TemplateHitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TemplateHitClient<$Result.GetResult<Prisma.$TemplateHitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemplateHit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateHitFindFirstArgs} args - Arguments to find a TemplateHit
     * @example
     * // Get one TemplateHit
     * const templateHit = await prisma.templateHit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TemplateHitFindFirstArgs>(args?: SelectSubset<T, TemplateHitFindFirstArgs<ExtArgs>>): Prisma__TemplateHitClient<$Result.GetResult<Prisma.$TemplateHitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemplateHit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateHitFindFirstOrThrowArgs} args - Arguments to find a TemplateHit
     * @example
     * // Get one TemplateHit
     * const templateHit = await prisma.templateHit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TemplateHitFindFirstOrThrowArgs>(args?: SelectSubset<T, TemplateHitFindFirstOrThrowArgs<ExtArgs>>): Prisma__TemplateHitClient<$Result.GetResult<Prisma.$TemplateHitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TemplateHits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateHitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TemplateHits
     * const templateHits = await prisma.templateHit.findMany()
     * 
     * // Get first 10 TemplateHits
     * const templateHits = await prisma.templateHit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const templateHitWithIdOnly = await prisma.templateHit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TemplateHitFindManyArgs>(args?: SelectSubset<T, TemplateHitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateHitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TemplateHit.
     * @param {TemplateHitCreateArgs} args - Arguments to create a TemplateHit.
     * @example
     * // Create one TemplateHit
     * const TemplateHit = await prisma.templateHit.create({
     *   data: {
     *     // ... data to create a TemplateHit
     *   }
     * })
     * 
     */
    create<T extends TemplateHitCreateArgs>(args: SelectSubset<T, TemplateHitCreateArgs<ExtArgs>>): Prisma__TemplateHitClient<$Result.GetResult<Prisma.$TemplateHitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TemplateHits.
     * @param {TemplateHitCreateManyArgs} args - Arguments to create many TemplateHits.
     * @example
     * // Create many TemplateHits
     * const templateHit = await prisma.templateHit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TemplateHitCreateManyArgs>(args?: SelectSubset<T, TemplateHitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TemplateHits and returns the data saved in the database.
     * @param {TemplateHitCreateManyAndReturnArgs} args - Arguments to create many TemplateHits.
     * @example
     * // Create many TemplateHits
     * const templateHit = await prisma.templateHit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TemplateHits and only return the `id`
     * const templateHitWithIdOnly = await prisma.templateHit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TemplateHitCreateManyAndReturnArgs>(args?: SelectSubset<T, TemplateHitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateHitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TemplateHit.
     * @param {TemplateHitDeleteArgs} args - Arguments to delete one TemplateHit.
     * @example
     * // Delete one TemplateHit
     * const TemplateHit = await prisma.templateHit.delete({
     *   where: {
     *     // ... filter to delete one TemplateHit
     *   }
     * })
     * 
     */
    delete<T extends TemplateHitDeleteArgs>(args: SelectSubset<T, TemplateHitDeleteArgs<ExtArgs>>): Prisma__TemplateHitClient<$Result.GetResult<Prisma.$TemplateHitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TemplateHit.
     * @param {TemplateHitUpdateArgs} args - Arguments to update one TemplateHit.
     * @example
     * // Update one TemplateHit
     * const templateHit = await prisma.templateHit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TemplateHitUpdateArgs>(args: SelectSubset<T, TemplateHitUpdateArgs<ExtArgs>>): Prisma__TemplateHitClient<$Result.GetResult<Prisma.$TemplateHitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TemplateHits.
     * @param {TemplateHitDeleteManyArgs} args - Arguments to filter TemplateHits to delete.
     * @example
     * // Delete a few TemplateHits
     * const { count } = await prisma.templateHit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TemplateHitDeleteManyArgs>(args?: SelectSubset<T, TemplateHitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TemplateHits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateHitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TemplateHits
     * const templateHit = await prisma.templateHit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TemplateHitUpdateManyArgs>(args: SelectSubset<T, TemplateHitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TemplateHits and returns the data updated in the database.
     * @param {TemplateHitUpdateManyAndReturnArgs} args - Arguments to update many TemplateHits.
     * @example
     * // Update many TemplateHits
     * const templateHit = await prisma.templateHit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TemplateHits and only return the `id`
     * const templateHitWithIdOnly = await prisma.templateHit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TemplateHitUpdateManyAndReturnArgs>(args: SelectSubset<T, TemplateHitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateHitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TemplateHit.
     * @param {TemplateHitUpsertArgs} args - Arguments to update or create a TemplateHit.
     * @example
     * // Update or create a TemplateHit
     * const templateHit = await prisma.templateHit.upsert({
     *   create: {
     *     // ... data to create a TemplateHit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TemplateHit we want to update
     *   }
     * })
     */
    upsert<T extends TemplateHitUpsertArgs>(args: SelectSubset<T, TemplateHitUpsertArgs<ExtArgs>>): Prisma__TemplateHitClient<$Result.GetResult<Prisma.$TemplateHitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TemplateHits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateHitCountArgs} args - Arguments to filter TemplateHits to count.
     * @example
     * // Count the number of TemplateHits
     * const count = await prisma.templateHit.count({
     *   where: {
     *     // ... the filter for the TemplateHits we want to count
     *   }
     * })
    **/
    count<T extends TemplateHitCountArgs>(
      args?: Subset<T, TemplateHitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplateHitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TemplateHit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateHitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TemplateHitAggregateArgs>(args: Subset<T, TemplateHitAggregateArgs>): Prisma.PrismaPromise<GetTemplateHitAggregateType<T>>

    /**
     * Group by TemplateHit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateHitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TemplateHitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TemplateHitGroupByArgs['orderBy'] }
        : { orderBy?: TemplateHitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TemplateHitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplateHitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TemplateHit model
   */
  readonly fields: TemplateHitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TemplateHit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TemplateHitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends PredictionJobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PredictionJobDefaultArgs<ExtArgs>>): Prisma__PredictionJobClient<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TemplateHit model
   */
  interface TemplateHitFieldRefs {
    readonly id: FieldRef<"TemplateHit", 'String'>
    readonly jobId: FieldRef<"TemplateHit", 'String'>
    readonly pdbId: FieldRef<"TemplateHit", 'String'>
    readonly chainId: FieldRef<"TemplateHit", 'String'>
    readonly title: FieldRef<"TemplateHit", 'String'>
    readonly organism: FieldRef<"TemplateHit", 'String'>
    readonly resolution: FieldRef<"TemplateHit", 'Float'>
    readonly sequenceIdentity: FieldRef<"TemplateHit", 'Float'>
    readonly coverage: FieldRef<"TemplateHit", 'Float'>
    readonly eValue: FieldRef<"TemplateHit", 'Float'>
    readonly foldseekScore: FieldRef<"TemplateHit", 'Float'>
    readonly reliabilityBand: FieldRef<"TemplateHit", 'String'>
    readonly metadata: FieldRef<"TemplateHit", 'Json'>
    readonly createdAt: FieldRef<"TemplateHit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TemplateHit findUnique
   */
  export type TemplateHitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateHit
     */
    select?: TemplateHitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateHit
     */
    omit?: TemplateHitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateHitInclude<ExtArgs> | null
    /**
     * Filter, which TemplateHit to fetch.
     */
    where: TemplateHitWhereUniqueInput
  }

  /**
   * TemplateHit findUniqueOrThrow
   */
  export type TemplateHitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateHit
     */
    select?: TemplateHitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateHit
     */
    omit?: TemplateHitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateHitInclude<ExtArgs> | null
    /**
     * Filter, which TemplateHit to fetch.
     */
    where: TemplateHitWhereUniqueInput
  }

  /**
   * TemplateHit findFirst
   */
  export type TemplateHitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateHit
     */
    select?: TemplateHitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateHit
     */
    omit?: TemplateHitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateHitInclude<ExtArgs> | null
    /**
     * Filter, which TemplateHit to fetch.
     */
    where?: TemplateHitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateHits to fetch.
     */
    orderBy?: TemplateHitOrderByWithRelationInput | TemplateHitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemplateHits.
     */
    cursor?: TemplateHitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateHits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateHits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplateHits.
     */
    distinct?: TemplateHitScalarFieldEnum | TemplateHitScalarFieldEnum[]
  }

  /**
   * TemplateHit findFirstOrThrow
   */
  export type TemplateHitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateHit
     */
    select?: TemplateHitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateHit
     */
    omit?: TemplateHitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateHitInclude<ExtArgs> | null
    /**
     * Filter, which TemplateHit to fetch.
     */
    where?: TemplateHitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateHits to fetch.
     */
    orderBy?: TemplateHitOrderByWithRelationInput | TemplateHitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemplateHits.
     */
    cursor?: TemplateHitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateHits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateHits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplateHits.
     */
    distinct?: TemplateHitScalarFieldEnum | TemplateHitScalarFieldEnum[]
  }

  /**
   * TemplateHit findMany
   */
  export type TemplateHitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateHit
     */
    select?: TemplateHitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateHit
     */
    omit?: TemplateHitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateHitInclude<ExtArgs> | null
    /**
     * Filter, which TemplateHits to fetch.
     */
    where?: TemplateHitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateHits to fetch.
     */
    orderBy?: TemplateHitOrderByWithRelationInput | TemplateHitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TemplateHits.
     */
    cursor?: TemplateHitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateHits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateHits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplateHits.
     */
    distinct?: TemplateHitScalarFieldEnum | TemplateHitScalarFieldEnum[]
  }

  /**
   * TemplateHit create
   */
  export type TemplateHitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateHit
     */
    select?: TemplateHitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateHit
     */
    omit?: TemplateHitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateHitInclude<ExtArgs> | null
    /**
     * The data needed to create a TemplateHit.
     */
    data: XOR<TemplateHitCreateInput, TemplateHitUncheckedCreateInput>
  }

  /**
   * TemplateHit createMany
   */
  export type TemplateHitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TemplateHits.
     */
    data: TemplateHitCreateManyInput | TemplateHitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TemplateHit createManyAndReturn
   */
  export type TemplateHitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateHit
     */
    select?: TemplateHitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateHit
     */
    omit?: TemplateHitOmit<ExtArgs> | null
    /**
     * The data used to create many TemplateHits.
     */
    data: TemplateHitCreateManyInput | TemplateHitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateHitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TemplateHit update
   */
  export type TemplateHitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateHit
     */
    select?: TemplateHitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateHit
     */
    omit?: TemplateHitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateHitInclude<ExtArgs> | null
    /**
     * The data needed to update a TemplateHit.
     */
    data: XOR<TemplateHitUpdateInput, TemplateHitUncheckedUpdateInput>
    /**
     * Choose, which TemplateHit to update.
     */
    where: TemplateHitWhereUniqueInput
  }

  /**
   * TemplateHit updateMany
   */
  export type TemplateHitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TemplateHits.
     */
    data: XOR<TemplateHitUpdateManyMutationInput, TemplateHitUncheckedUpdateManyInput>
    /**
     * Filter which TemplateHits to update
     */
    where?: TemplateHitWhereInput
    /**
     * Limit how many TemplateHits to update.
     */
    limit?: number
  }

  /**
   * TemplateHit updateManyAndReturn
   */
  export type TemplateHitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateHit
     */
    select?: TemplateHitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateHit
     */
    omit?: TemplateHitOmit<ExtArgs> | null
    /**
     * The data used to update TemplateHits.
     */
    data: XOR<TemplateHitUpdateManyMutationInput, TemplateHitUncheckedUpdateManyInput>
    /**
     * Filter which TemplateHits to update
     */
    where?: TemplateHitWhereInput
    /**
     * Limit how many TemplateHits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateHitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TemplateHit upsert
   */
  export type TemplateHitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateHit
     */
    select?: TemplateHitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateHit
     */
    omit?: TemplateHitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateHitInclude<ExtArgs> | null
    /**
     * The filter to search for the TemplateHit to update in case it exists.
     */
    where: TemplateHitWhereUniqueInput
    /**
     * In case the TemplateHit found by the `where` argument doesn't exist, create a new TemplateHit with this data.
     */
    create: XOR<TemplateHitCreateInput, TemplateHitUncheckedCreateInput>
    /**
     * In case the TemplateHit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TemplateHitUpdateInput, TemplateHitUncheckedUpdateInput>
  }

  /**
   * TemplateHit delete
   */
  export type TemplateHitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateHit
     */
    select?: TemplateHitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateHit
     */
    omit?: TemplateHitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateHitInclude<ExtArgs> | null
    /**
     * Filter which TemplateHit to delete.
     */
    where: TemplateHitWhereUniqueInput
  }

  /**
   * TemplateHit deleteMany
   */
  export type TemplateHitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemplateHits to delete
     */
    where?: TemplateHitWhereInput
    /**
     * Limit how many TemplateHits to delete.
     */
    limit?: number
  }

  /**
   * TemplateHit without action
   */
  export type TemplateHitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateHit
     */
    select?: TemplateHitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateHit
     */
    omit?: TemplateHitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateHitInclude<ExtArgs> | null
  }


  /**
   * Model StructureModel
   */

  export type AggregateStructureModel = {
    _count: StructureModelCountAggregateOutputType | null
    _avg: StructureModelAvgAggregateOutputType | null
    _sum: StructureModelSumAggregateOutputType | null
    _min: StructureModelMinAggregateOutputType | null
    _max: StructureModelMaxAggregateOutputType | null
  }

  export type StructureModelAvgAggregateOutputType = {
    rmsdReference: number | null
  }

  export type StructureModelSumAggregateOutputType = {
    rmsdReference: number | null
  }

  export type StructureModelMinAggregateOutputType = {
    id: string | null
    jobId: string | null
    name: string | null
    format: string | null
    storageUrl: string | null
    pdbText: string | null
    rmsdReference: number | null
    createdAt: Date | null
  }

  export type StructureModelMaxAggregateOutputType = {
    id: string | null
    jobId: string | null
    name: string | null
    format: string | null
    storageUrl: string | null
    pdbText: string | null
    rmsdReference: number | null
    createdAt: Date | null
  }

  export type StructureModelCountAggregateOutputType = {
    id: number
    jobId: number
    name: number
    format: number
    storageUrl: number
    pdbText: number
    chains: number
    ligands: number
    confidenceMap: number
    paeMatrix: number
    rmsdReference: number
    createdAt: number
    _all: number
  }


  export type StructureModelAvgAggregateInputType = {
    rmsdReference?: true
  }

  export type StructureModelSumAggregateInputType = {
    rmsdReference?: true
  }

  export type StructureModelMinAggregateInputType = {
    id?: true
    jobId?: true
    name?: true
    format?: true
    storageUrl?: true
    pdbText?: true
    rmsdReference?: true
    createdAt?: true
  }

  export type StructureModelMaxAggregateInputType = {
    id?: true
    jobId?: true
    name?: true
    format?: true
    storageUrl?: true
    pdbText?: true
    rmsdReference?: true
    createdAt?: true
  }

  export type StructureModelCountAggregateInputType = {
    id?: true
    jobId?: true
    name?: true
    format?: true
    storageUrl?: true
    pdbText?: true
    chains?: true
    ligands?: true
    confidenceMap?: true
    paeMatrix?: true
    rmsdReference?: true
    createdAt?: true
    _all?: true
  }

  export type StructureModelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StructureModel to aggregate.
     */
    where?: StructureModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StructureModels to fetch.
     */
    orderBy?: StructureModelOrderByWithRelationInput | StructureModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StructureModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StructureModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StructureModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StructureModels
    **/
    _count?: true | StructureModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StructureModelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StructureModelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StructureModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StructureModelMaxAggregateInputType
  }

  export type GetStructureModelAggregateType<T extends StructureModelAggregateArgs> = {
        [P in keyof T & keyof AggregateStructureModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStructureModel[P]>
      : GetScalarType<T[P], AggregateStructureModel[P]>
  }




  export type StructureModelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StructureModelWhereInput
    orderBy?: StructureModelOrderByWithAggregationInput | StructureModelOrderByWithAggregationInput[]
    by: StructureModelScalarFieldEnum[] | StructureModelScalarFieldEnum
    having?: StructureModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StructureModelCountAggregateInputType | true
    _avg?: StructureModelAvgAggregateInputType
    _sum?: StructureModelSumAggregateInputType
    _min?: StructureModelMinAggregateInputType
    _max?: StructureModelMaxAggregateInputType
  }

  export type StructureModelGroupByOutputType = {
    id: string
    jobId: string
    name: string
    format: string
    storageUrl: string | null
    pdbText: string | null
    chains: JsonValue | null
    ligands: JsonValue | null
    confidenceMap: JsonValue | null
    paeMatrix: JsonValue | null
    rmsdReference: number | null
    createdAt: Date
    _count: StructureModelCountAggregateOutputType | null
    _avg: StructureModelAvgAggregateOutputType | null
    _sum: StructureModelSumAggregateOutputType | null
    _min: StructureModelMinAggregateOutputType | null
    _max: StructureModelMaxAggregateOutputType | null
  }

  type GetStructureModelGroupByPayload<T extends StructureModelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StructureModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StructureModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StructureModelGroupByOutputType[P]>
            : GetScalarType<T[P], StructureModelGroupByOutputType[P]>
        }
      >
    >


  export type StructureModelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    name?: boolean
    format?: boolean
    storageUrl?: boolean
    pdbText?: boolean
    chains?: boolean
    ligands?: boolean
    confidenceMap?: boolean
    paeMatrix?: boolean
    rmsdReference?: boolean
    createdAt?: boolean
    job?: boolean | PredictionJobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["structureModel"]>

  export type StructureModelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    name?: boolean
    format?: boolean
    storageUrl?: boolean
    pdbText?: boolean
    chains?: boolean
    ligands?: boolean
    confidenceMap?: boolean
    paeMatrix?: boolean
    rmsdReference?: boolean
    createdAt?: boolean
    job?: boolean | PredictionJobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["structureModel"]>

  export type StructureModelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    name?: boolean
    format?: boolean
    storageUrl?: boolean
    pdbText?: boolean
    chains?: boolean
    ligands?: boolean
    confidenceMap?: boolean
    paeMatrix?: boolean
    rmsdReference?: boolean
    createdAt?: boolean
    job?: boolean | PredictionJobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["structureModel"]>

  export type StructureModelSelectScalar = {
    id?: boolean
    jobId?: boolean
    name?: boolean
    format?: boolean
    storageUrl?: boolean
    pdbText?: boolean
    chains?: boolean
    ligands?: boolean
    confidenceMap?: boolean
    paeMatrix?: boolean
    rmsdReference?: boolean
    createdAt?: boolean
  }

  export type StructureModelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "jobId" | "name" | "format" | "storageUrl" | "pdbText" | "chains" | "ligands" | "confidenceMap" | "paeMatrix" | "rmsdReference" | "createdAt", ExtArgs["result"]["structureModel"]>
  export type StructureModelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | PredictionJobDefaultArgs<ExtArgs>
  }
  export type StructureModelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | PredictionJobDefaultArgs<ExtArgs>
  }
  export type StructureModelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | PredictionJobDefaultArgs<ExtArgs>
  }

  export type $StructureModelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StructureModel"
    objects: {
      job: Prisma.$PredictionJobPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobId: string
      name: string
      format: string
      storageUrl: string | null
      pdbText: string | null
      chains: Prisma.JsonValue | null
      ligands: Prisma.JsonValue | null
      confidenceMap: Prisma.JsonValue | null
      paeMatrix: Prisma.JsonValue | null
      rmsdReference: number | null
      createdAt: Date
    }, ExtArgs["result"]["structureModel"]>
    composites: {}
  }

  type StructureModelGetPayload<S extends boolean | null | undefined | StructureModelDefaultArgs> = $Result.GetResult<Prisma.$StructureModelPayload, S>

  type StructureModelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StructureModelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StructureModelCountAggregateInputType | true
    }

  export interface StructureModelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StructureModel'], meta: { name: 'StructureModel' } }
    /**
     * Find zero or one StructureModel that matches the filter.
     * @param {StructureModelFindUniqueArgs} args - Arguments to find a StructureModel
     * @example
     * // Get one StructureModel
     * const structureModel = await prisma.structureModel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StructureModelFindUniqueArgs>(args: SelectSubset<T, StructureModelFindUniqueArgs<ExtArgs>>): Prisma__StructureModelClient<$Result.GetResult<Prisma.$StructureModelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StructureModel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StructureModelFindUniqueOrThrowArgs} args - Arguments to find a StructureModel
     * @example
     * // Get one StructureModel
     * const structureModel = await prisma.structureModel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StructureModelFindUniqueOrThrowArgs>(args: SelectSubset<T, StructureModelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StructureModelClient<$Result.GetResult<Prisma.$StructureModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StructureModel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StructureModelFindFirstArgs} args - Arguments to find a StructureModel
     * @example
     * // Get one StructureModel
     * const structureModel = await prisma.structureModel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StructureModelFindFirstArgs>(args?: SelectSubset<T, StructureModelFindFirstArgs<ExtArgs>>): Prisma__StructureModelClient<$Result.GetResult<Prisma.$StructureModelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StructureModel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StructureModelFindFirstOrThrowArgs} args - Arguments to find a StructureModel
     * @example
     * // Get one StructureModel
     * const structureModel = await prisma.structureModel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StructureModelFindFirstOrThrowArgs>(args?: SelectSubset<T, StructureModelFindFirstOrThrowArgs<ExtArgs>>): Prisma__StructureModelClient<$Result.GetResult<Prisma.$StructureModelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StructureModels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StructureModelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StructureModels
     * const structureModels = await prisma.structureModel.findMany()
     * 
     * // Get first 10 StructureModels
     * const structureModels = await prisma.structureModel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const structureModelWithIdOnly = await prisma.structureModel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StructureModelFindManyArgs>(args?: SelectSubset<T, StructureModelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StructureModelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StructureModel.
     * @param {StructureModelCreateArgs} args - Arguments to create a StructureModel.
     * @example
     * // Create one StructureModel
     * const StructureModel = await prisma.structureModel.create({
     *   data: {
     *     // ... data to create a StructureModel
     *   }
     * })
     * 
     */
    create<T extends StructureModelCreateArgs>(args: SelectSubset<T, StructureModelCreateArgs<ExtArgs>>): Prisma__StructureModelClient<$Result.GetResult<Prisma.$StructureModelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StructureModels.
     * @param {StructureModelCreateManyArgs} args - Arguments to create many StructureModels.
     * @example
     * // Create many StructureModels
     * const structureModel = await prisma.structureModel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StructureModelCreateManyArgs>(args?: SelectSubset<T, StructureModelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StructureModels and returns the data saved in the database.
     * @param {StructureModelCreateManyAndReturnArgs} args - Arguments to create many StructureModels.
     * @example
     * // Create many StructureModels
     * const structureModel = await prisma.structureModel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StructureModels and only return the `id`
     * const structureModelWithIdOnly = await prisma.structureModel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StructureModelCreateManyAndReturnArgs>(args?: SelectSubset<T, StructureModelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StructureModelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StructureModel.
     * @param {StructureModelDeleteArgs} args - Arguments to delete one StructureModel.
     * @example
     * // Delete one StructureModel
     * const StructureModel = await prisma.structureModel.delete({
     *   where: {
     *     // ... filter to delete one StructureModel
     *   }
     * })
     * 
     */
    delete<T extends StructureModelDeleteArgs>(args: SelectSubset<T, StructureModelDeleteArgs<ExtArgs>>): Prisma__StructureModelClient<$Result.GetResult<Prisma.$StructureModelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StructureModel.
     * @param {StructureModelUpdateArgs} args - Arguments to update one StructureModel.
     * @example
     * // Update one StructureModel
     * const structureModel = await prisma.structureModel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StructureModelUpdateArgs>(args: SelectSubset<T, StructureModelUpdateArgs<ExtArgs>>): Prisma__StructureModelClient<$Result.GetResult<Prisma.$StructureModelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StructureModels.
     * @param {StructureModelDeleteManyArgs} args - Arguments to filter StructureModels to delete.
     * @example
     * // Delete a few StructureModels
     * const { count } = await prisma.structureModel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StructureModelDeleteManyArgs>(args?: SelectSubset<T, StructureModelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StructureModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StructureModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StructureModels
     * const structureModel = await prisma.structureModel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StructureModelUpdateManyArgs>(args: SelectSubset<T, StructureModelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StructureModels and returns the data updated in the database.
     * @param {StructureModelUpdateManyAndReturnArgs} args - Arguments to update many StructureModels.
     * @example
     * // Update many StructureModels
     * const structureModel = await prisma.structureModel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StructureModels and only return the `id`
     * const structureModelWithIdOnly = await prisma.structureModel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StructureModelUpdateManyAndReturnArgs>(args: SelectSubset<T, StructureModelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StructureModelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StructureModel.
     * @param {StructureModelUpsertArgs} args - Arguments to update or create a StructureModel.
     * @example
     * // Update or create a StructureModel
     * const structureModel = await prisma.structureModel.upsert({
     *   create: {
     *     // ... data to create a StructureModel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StructureModel we want to update
     *   }
     * })
     */
    upsert<T extends StructureModelUpsertArgs>(args: SelectSubset<T, StructureModelUpsertArgs<ExtArgs>>): Prisma__StructureModelClient<$Result.GetResult<Prisma.$StructureModelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StructureModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StructureModelCountArgs} args - Arguments to filter StructureModels to count.
     * @example
     * // Count the number of StructureModels
     * const count = await prisma.structureModel.count({
     *   where: {
     *     // ... the filter for the StructureModels we want to count
     *   }
     * })
    **/
    count<T extends StructureModelCountArgs>(
      args?: Subset<T, StructureModelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StructureModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StructureModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StructureModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StructureModelAggregateArgs>(args: Subset<T, StructureModelAggregateArgs>): Prisma.PrismaPromise<GetStructureModelAggregateType<T>>

    /**
     * Group by StructureModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StructureModelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StructureModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StructureModelGroupByArgs['orderBy'] }
        : { orderBy?: StructureModelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StructureModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStructureModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StructureModel model
   */
  readonly fields: StructureModelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StructureModel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StructureModelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends PredictionJobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PredictionJobDefaultArgs<ExtArgs>>): Prisma__PredictionJobClient<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StructureModel model
   */
  interface StructureModelFieldRefs {
    readonly id: FieldRef<"StructureModel", 'String'>
    readonly jobId: FieldRef<"StructureModel", 'String'>
    readonly name: FieldRef<"StructureModel", 'String'>
    readonly format: FieldRef<"StructureModel", 'String'>
    readonly storageUrl: FieldRef<"StructureModel", 'String'>
    readonly pdbText: FieldRef<"StructureModel", 'String'>
    readonly chains: FieldRef<"StructureModel", 'Json'>
    readonly ligands: FieldRef<"StructureModel", 'Json'>
    readonly confidenceMap: FieldRef<"StructureModel", 'Json'>
    readonly paeMatrix: FieldRef<"StructureModel", 'Json'>
    readonly rmsdReference: FieldRef<"StructureModel", 'Float'>
    readonly createdAt: FieldRef<"StructureModel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StructureModel findUnique
   */
  export type StructureModelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StructureModel
     */
    select?: StructureModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StructureModel
     */
    omit?: StructureModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StructureModelInclude<ExtArgs> | null
    /**
     * Filter, which StructureModel to fetch.
     */
    where: StructureModelWhereUniqueInput
  }

  /**
   * StructureModel findUniqueOrThrow
   */
  export type StructureModelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StructureModel
     */
    select?: StructureModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StructureModel
     */
    omit?: StructureModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StructureModelInclude<ExtArgs> | null
    /**
     * Filter, which StructureModel to fetch.
     */
    where: StructureModelWhereUniqueInput
  }

  /**
   * StructureModel findFirst
   */
  export type StructureModelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StructureModel
     */
    select?: StructureModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StructureModel
     */
    omit?: StructureModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StructureModelInclude<ExtArgs> | null
    /**
     * Filter, which StructureModel to fetch.
     */
    where?: StructureModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StructureModels to fetch.
     */
    orderBy?: StructureModelOrderByWithRelationInput | StructureModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StructureModels.
     */
    cursor?: StructureModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StructureModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StructureModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StructureModels.
     */
    distinct?: StructureModelScalarFieldEnum | StructureModelScalarFieldEnum[]
  }

  /**
   * StructureModel findFirstOrThrow
   */
  export type StructureModelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StructureModel
     */
    select?: StructureModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StructureModel
     */
    omit?: StructureModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StructureModelInclude<ExtArgs> | null
    /**
     * Filter, which StructureModel to fetch.
     */
    where?: StructureModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StructureModels to fetch.
     */
    orderBy?: StructureModelOrderByWithRelationInput | StructureModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StructureModels.
     */
    cursor?: StructureModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StructureModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StructureModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StructureModels.
     */
    distinct?: StructureModelScalarFieldEnum | StructureModelScalarFieldEnum[]
  }

  /**
   * StructureModel findMany
   */
  export type StructureModelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StructureModel
     */
    select?: StructureModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StructureModel
     */
    omit?: StructureModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StructureModelInclude<ExtArgs> | null
    /**
     * Filter, which StructureModels to fetch.
     */
    where?: StructureModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StructureModels to fetch.
     */
    orderBy?: StructureModelOrderByWithRelationInput | StructureModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StructureModels.
     */
    cursor?: StructureModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StructureModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StructureModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StructureModels.
     */
    distinct?: StructureModelScalarFieldEnum | StructureModelScalarFieldEnum[]
  }

  /**
   * StructureModel create
   */
  export type StructureModelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StructureModel
     */
    select?: StructureModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StructureModel
     */
    omit?: StructureModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StructureModelInclude<ExtArgs> | null
    /**
     * The data needed to create a StructureModel.
     */
    data: XOR<StructureModelCreateInput, StructureModelUncheckedCreateInput>
  }

  /**
   * StructureModel createMany
   */
  export type StructureModelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StructureModels.
     */
    data: StructureModelCreateManyInput | StructureModelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StructureModel createManyAndReturn
   */
  export type StructureModelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StructureModel
     */
    select?: StructureModelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StructureModel
     */
    omit?: StructureModelOmit<ExtArgs> | null
    /**
     * The data used to create many StructureModels.
     */
    data: StructureModelCreateManyInput | StructureModelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StructureModelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StructureModel update
   */
  export type StructureModelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StructureModel
     */
    select?: StructureModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StructureModel
     */
    omit?: StructureModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StructureModelInclude<ExtArgs> | null
    /**
     * The data needed to update a StructureModel.
     */
    data: XOR<StructureModelUpdateInput, StructureModelUncheckedUpdateInput>
    /**
     * Choose, which StructureModel to update.
     */
    where: StructureModelWhereUniqueInput
  }

  /**
   * StructureModel updateMany
   */
  export type StructureModelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StructureModels.
     */
    data: XOR<StructureModelUpdateManyMutationInput, StructureModelUncheckedUpdateManyInput>
    /**
     * Filter which StructureModels to update
     */
    where?: StructureModelWhereInput
    /**
     * Limit how many StructureModels to update.
     */
    limit?: number
  }

  /**
   * StructureModel updateManyAndReturn
   */
  export type StructureModelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StructureModel
     */
    select?: StructureModelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StructureModel
     */
    omit?: StructureModelOmit<ExtArgs> | null
    /**
     * The data used to update StructureModels.
     */
    data: XOR<StructureModelUpdateManyMutationInput, StructureModelUncheckedUpdateManyInput>
    /**
     * Filter which StructureModels to update
     */
    where?: StructureModelWhereInput
    /**
     * Limit how many StructureModels to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StructureModelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StructureModel upsert
   */
  export type StructureModelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StructureModel
     */
    select?: StructureModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StructureModel
     */
    omit?: StructureModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StructureModelInclude<ExtArgs> | null
    /**
     * The filter to search for the StructureModel to update in case it exists.
     */
    where: StructureModelWhereUniqueInput
    /**
     * In case the StructureModel found by the `where` argument doesn't exist, create a new StructureModel with this data.
     */
    create: XOR<StructureModelCreateInput, StructureModelUncheckedCreateInput>
    /**
     * In case the StructureModel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StructureModelUpdateInput, StructureModelUncheckedUpdateInput>
  }

  /**
   * StructureModel delete
   */
  export type StructureModelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StructureModel
     */
    select?: StructureModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StructureModel
     */
    omit?: StructureModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StructureModelInclude<ExtArgs> | null
    /**
     * Filter which StructureModel to delete.
     */
    where: StructureModelWhereUniqueInput
  }

  /**
   * StructureModel deleteMany
   */
  export type StructureModelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StructureModels to delete
     */
    where?: StructureModelWhereInput
    /**
     * Limit how many StructureModels to delete.
     */
    limit?: number
  }

  /**
   * StructureModel without action
   */
  export type StructureModelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StructureModel
     */
    select?: StructureModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StructureModel
     */
    omit?: StructureModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StructureModelInclude<ExtArgs> | null
  }


  /**
   * Model AnalysisResult
   */

  export type AggregateAnalysisResult = {
    _count: AnalysisResultCountAggregateOutputType | null
    _min: AnalysisResultMinAggregateOutputType | null
    _max: AnalysisResultMaxAggregateOutputType | null
  }

  export type AnalysisResultMinAggregateOutputType = {
    id: string | null
    sequenceId: string | null
    jobId: string | null
    type: string | null
    title: string | null
    createdAt: Date | null
  }

  export type AnalysisResultMaxAggregateOutputType = {
    id: string | null
    sequenceId: string | null
    jobId: string | null
    type: string | null
    title: string | null
    createdAt: Date | null
  }

  export type AnalysisResultCountAggregateOutputType = {
    id: number
    sequenceId: number
    jobId: number
    type: number
    title: number
    payload: number
    createdAt: number
    _all: number
  }


  export type AnalysisResultMinAggregateInputType = {
    id?: true
    sequenceId?: true
    jobId?: true
    type?: true
    title?: true
    createdAt?: true
  }

  export type AnalysisResultMaxAggregateInputType = {
    id?: true
    sequenceId?: true
    jobId?: true
    type?: true
    title?: true
    createdAt?: true
  }

  export type AnalysisResultCountAggregateInputType = {
    id?: true
    sequenceId?: true
    jobId?: true
    type?: true
    title?: true
    payload?: true
    createdAt?: true
    _all?: true
  }

  export type AnalysisResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalysisResult to aggregate.
     */
    where?: AnalysisResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalysisResults to fetch.
     */
    orderBy?: AnalysisResultOrderByWithRelationInput | AnalysisResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalysisResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalysisResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalysisResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnalysisResults
    **/
    _count?: true | AnalysisResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalysisResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalysisResultMaxAggregateInputType
  }

  export type GetAnalysisResultAggregateType<T extends AnalysisResultAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalysisResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalysisResult[P]>
      : GetScalarType<T[P], AggregateAnalysisResult[P]>
  }




  export type AnalysisResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalysisResultWhereInput
    orderBy?: AnalysisResultOrderByWithAggregationInput | AnalysisResultOrderByWithAggregationInput[]
    by: AnalysisResultScalarFieldEnum[] | AnalysisResultScalarFieldEnum
    having?: AnalysisResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalysisResultCountAggregateInputType | true
    _min?: AnalysisResultMinAggregateInputType
    _max?: AnalysisResultMaxAggregateInputType
  }

  export type AnalysisResultGroupByOutputType = {
    id: string
    sequenceId: string | null
    jobId: string | null
    type: string
    title: string
    payload: JsonValue
    createdAt: Date
    _count: AnalysisResultCountAggregateOutputType | null
    _min: AnalysisResultMinAggregateOutputType | null
    _max: AnalysisResultMaxAggregateOutputType | null
  }

  type GetAnalysisResultGroupByPayload<T extends AnalysisResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalysisResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalysisResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalysisResultGroupByOutputType[P]>
            : GetScalarType<T[P], AnalysisResultGroupByOutputType[P]>
        }
      >
    >


  export type AnalysisResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sequenceId?: boolean
    jobId?: boolean
    type?: boolean
    title?: boolean
    payload?: boolean
    createdAt?: boolean
    sequence?: boolean | AnalysisResult$sequenceArgs<ExtArgs>
    job?: boolean | AnalysisResult$jobArgs<ExtArgs>
  }, ExtArgs["result"]["analysisResult"]>

  export type AnalysisResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sequenceId?: boolean
    jobId?: boolean
    type?: boolean
    title?: boolean
    payload?: boolean
    createdAt?: boolean
    sequence?: boolean | AnalysisResult$sequenceArgs<ExtArgs>
    job?: boolean | AnalysisResult$jobArgs<ExtArgs>
  }, ExtArgs["result"]["analysisResult"]>

  export type AnalysisResultSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sequenceId?: boolean
    jobId?: boolean
    type?: boolean
    title?: boolean
    payload?: boolean
    createdAt?: boolean
    sequence?: boolean | AnalysisResult$sequenceArgs<ExtArgs>
    job?: boolean | AnalysisResult$jobArgs<ExtArgs>
  }, ExtArgs["result"]["analysisResult"]>

  export type AnalysisResultSelectScalar = {
    id?: boolean
    sequenceId?: boolean
    jobId?: boolean
    type?: boolean
    title?: boolean
    payload?: boolean
    createdAt?: boolean
  }

  export type AnalysisResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sequenceId" | "jobId" | "type" | "title" | "payload" | "createdAt", ExtArgs["result"]["analysisResult"]>
  export type AnalysisResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sequence?: boolean | AnalysisResult$sequenceArgs<ExtArgs>
    job?: boolean | AnalysisResult$jobArgs<ExtArgs>
  }
  export type AnalysisResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sequence?: boolean | AnalysisResult$sequenceArgs<ExtArgs>
    job?: boolean | AnalysisResult$jobArgs<ExtArgs>
  }
  export type AnalysisResultIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sequence?: boolean | AnalysisResult$sequenceArgs<ExtArgs>
    job?: boolean | AnalysisResult$jobArgs<ExtArgs>
  }

  export type $AnalysisResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnalysisResult"
    objects: {
      sequence: Prisma.$ProteinSequencePayload<ExtArgs> | null
      job: Prisma.$PredictionJobPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sequenceId: string | null
      jobId: string | null
      type: string
      title: string
      payload: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["analysisResult"]>
    composites: {}
  }

  type AnalysisResultGetPayload<S extends boolean | null | undefined | AnalysisResultDefaultArgs> = $Result.GetResult<Prisma.$AnalysisResultPayload, S>

  type AnalysisResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnalysisResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnalysisResultCountAggregateInputType | true
    }

  export interface AnalysisResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnalysisResult'], meta: { name: 'AnalysisResult' } }
    /**
     * Find zero or one AnalysisResult that matches the filter.
     * @param {AnalysisResultFindUniqueArgs} args - Arguments to find a AnalysisResult
     * @example
     * // Get one AnalysisResult
     * const analysisResult = await prisma.analysisResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalysisResultFindUniqueArgs>(args: SelectSubset<T, AnalysisResultFindUniqueArgs<ExtArgs>>): Prisma__AnalysisResultClient<$Result.GetResult<Prisma.$AnalysisResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnalysisResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnalysisResultFindUniqueOrThrowArgs} args - Arguments to find a AnalysisResult
     * @example
     * // Get one AnalysisResult
     * const analysisResult = await prisma.analysisResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalysisResultFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalysisResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalysisResultClient<$Result.GetResult<Prisma.$AnalysisResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalysisResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisResultFindFirstArgs} args - Arguments to find a AnalysisResult
     * @example
     * // Get one AnalysisResult
     * const analysisResult = await prisma.analysisResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalysisResultFindFirstArgs>(args?: SelectSubset<T, AnalysisResultFindFirstArgs<ExtArgs>>): Prisma__AnalysisResultClient<$Result.GetResult<Prisma.$AnalysisResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalysisResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisResultFindFirstOrThrowArgs} args - Arguments to find a AnalysisResult
     * @example
     * // Get one AnalysisResult
     * const analysisResult = await prisma.analysisResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalysisResultFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalysisResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalysisResultClient<$Result.GetResult<Prisma.$AnalysisResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnalysisResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnalysisResults
     * const analysisResults = await prisma.analysisResult.findMany()
     * 
     * // Get first 10 AnalysisResults
     * const analysisResults = await prisma.analysisResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analysisResultWithIdOnly = await prisma.analysisResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalysisResultFindManyArgs>(args?: SelectSubset<T, AnalysisResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnalysisResult.
     * @param {AnalysisResultCreateArgs} args - Arguments to create a AnalysisResult.
     * @example
     * // Create one AnalysisResult
     * const AnalysisResult = await prisma.analysisResult.create({
     *   data: {
     *     // ... data to create a AnalysisResult
     *   }
     * })
     * 
     */
    create<T extends AnalysisResultCreateArgs>(args: SelectSubset<T, AnalysisResultCreateArgs<ExtArgs>>): Prisma__AnalysisResultClient<$Result.GetResult<Prisma.$AnalysisResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnalysisResults.
     * @param {AnalysisResultCreateManyArgs} args - Arguments to create many AnalysisResults.
     * @example
     * // Create many AnalysisResults
     * const analysisResult = await prisma.analysisResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalysisResultCreateManyArgs>(args?: SelectSubset<T, AnalysisResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnalysisResults and returns the data saved in the database.
     * @param {AnalysisResultCreateManyAndReturnArgs} args - Arguments to create many AnalysisResults.
     * @example
     * // Create many AnalysisResults
     * const analysisResult = await prisma.analysisResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnalysisResults and only return the `id`
     * const analysisResultWithIdOnly = await prisma.analysisResult.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnalysisResultCreateManyAndReturnArgs>(args?: SelectSubset<T, AnalysisResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AnalysisResult.
     * @param {AnalysisResultDeleteArgs} args - Arguments to delete one AnalysisResult.
     * @example
     * // Delete one AnalysisResult
     * const AnalysisResult = await prisma.analysisResult.delete({
     *   where: {
     *     // ... filter to delete one AnalysisResult
     *   }
     * })
     * 
     */
    delete<T extends AnalysisResultDeleteArgs>(args: SelectSubset<T, AnalysisResultDeleteArgs<ExtArgs>>): Prisma__AnalysisResultClient<$Result.GetResult<Prisma.$AnalysisResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnalysisResult.
     * @param {AnalysisResultUpdateArgs} args - Arguments to update one AnalysisResult.
     * @example
     * // Update one AnalysisResult
     * const analysisResult = await prisma.analysisResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalysisResultUpdateArgs>(args: SelectSubset<T, AnalysisResultUpdateArgs<ExtArgs>>): Prisma__AnalysisResultClient<$Result.GetResult<Prisma.$AnalysisResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnalysisResults.
     * @param {AnalysisResultDeleteManyArgs} args - Arguments to filter AnalysisResults to delete.
     * @example
     * // Delete a few AnalysisResults
     * const { count } = await prisma.analysisResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalysisResultDeleteManyArgs>(args?: SelectSubset<T, AnalysisResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalysisResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnalysisResults
     * const analysisResult = await prisma.analysisResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalysisResultUpdateManyArgs>(args: SelectSubset<T, AnalysisResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalysisResults and returns the data updated in the database.
     * @param {AnalysisResultUpdateManyAndReturnArgs} args - Arguments to update many AnalysisResults.
     * @example
     * // Update many AnalysisResults
     * const analysisResult = await prisma.analysisResult.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AnalysisResults and only return the `id`
     * const analysisResultWithIdOnly = await prisma.analysisResult.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnalysisResultUpdateManyAndReturnArgs>(args: SelectSubset<T, AnalysisResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisResultPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AnalysisResult.
     * @param {AnalysisResultUpsertArgs} args - Arguments to update or create a AnalysisResult.
     * @example
     * // Update or create a AnalysisResult
     * const analysisResult = await prisma.analysisResult.upsert({
     *   create: {
     *     // ... data to create a AnalysisResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnalysisResult we want to update
     *   }
     * })
     */
    upsert<T extends AnalysisResultUpsertArgs>(args: SelectSubset<T, AnalysisResultUpsertArgs<ExtArgs>>): Prisma__AnalysisResultClient<$Result.GetResult<Prisma.$AnalysisResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnalysisResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisResultCountArgs} args - Arguments to filter AnalysisResults to count.
     * @example
     * // Count the number of AnalysisResults
     * const count = await prisma.analysisResult.count({
     *   where: {
     *     // ... the filter for the AnalysisResults we want to count
     *   }
     * })
    **/
    count<T extends AnalysisResultCountArgs>(
      args?: Subset<T, AnalysisResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalysisResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnalysisResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnalysisResultAggregateArgs>(args: Subset<T, AnalysisResultAggregateArgs>): Prisma.PrismaPromise<GetAnalysisResultAggregateType<T>>

    /**
     * Group by AnalysisResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnalysisResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalysisResultGroupByArgs['orderBy'] }
        : { orderBy?: AnalysisResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnalysisResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalysisResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnalysisResult model
   */
  readonly fields: AnalysisResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnalysisResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalysisResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sequence<T extends AnalysisResult$sequenceArgs<ExtArgs> = {}>(args?: Subset<T, AnalysisResult$sequenceArgs<ExtArgs>>): Prisma__ProteinSequenceClient<$Result.GetResult<Prisma.$ProteinSequencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    job<T extends AnalysisResult$jobArgs<ExtArgs> = {}>(args?: Subset<T, AnalysisResult$jobArgs<ExtArgs>>): Prisma__PredictionJobClient<$Result.GetResult<Prisma.$PredictionJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnalysisResult model
   */
  interface AnalysisResultFieldRefs {
    readonly id: FieldRef<"AnalysisResult", 'String'>
    readonly sequenceId: FieldRef<"AnalysisResult", 'String'>
    readonly jobId: FieldRef<"AnalysisResult", 'String'>
    readonly type: FieldRef<"AnalysisResult", 'String'>
    readonly title: FieldRef<"AnalysisResult", 'String'>
    readonly payload: FieldRef<"AnalysisResult", 'Json'>
    readonly createdAt: FieldRef<"AnalysisResult", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnalysisResult findUnique
   */
  export type AnalysisResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisResult
     */
    select?: AnalysisResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisResult
     */
    omit?: AnalysisResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisResultInclude<ExtArgs> | null
    /**
     * Filter, which AnalysisResult to fetch.
     */
    where: AnalysisResultWhereUniqueInput
  }

  /**
   * AnalysisResult findUniqueOrThrow
   */
  export type AnalysisResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisResult
     */
    select?: AnalysisResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisResult
     */
    omit?: AnalysisResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisResultInclude<ExtArgs> | null
    /**
     * Filter, which AnalysisResult to fetch.
     */
    where: AnalysisResultWhereUniqueInput
  }

  /**
   * AnalysisResult findFirst
   */
  export type AnalysisResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisResult
     */
    select?: AnalysisResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisResult
     */
    omit?: AnalysisResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisResultInclude<ExtArgs> | null
    /**
     * Filter, which AnalysisResult to fetch.
     */
    where?: AnalysisResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalysisResults to fetch.
     */
    orderBy?: AnalysisResultOrderByWithRelationInput | AnalysisResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalysisResults.
     */
    cursor?: AnalysisResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalysisResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalysisResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalysisResults.
     */
    distinct?: AnalysisResultScalarFieldEnum | AnalysisResultScalarFieldEnum[]
  }

  /**
   * AnalysisResult findFirstOrThrow
   */
  export type AnalysisResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisResult
     */
    select?: AnalysisResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisResult
     */
    omit?: AnalysisResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisResultInclude<ExtArgs> | null
    /**
     * Filter, which AnalysisResult to fetch.
     */
    where?: AnalysisResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalysisResults to fetch.
     */
    orderBy?: AnalysisResultOrderByWithRelationInput | AnalysisResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalysisResults.
     */
    cursor?: AnalysisResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalysisResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalysisResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalysisResults.
     */
    distinct?: AnalysisResultScalarFieldEnum | AnalysisResultScalarFieldEnum[]
  }

  /**
   * AnalysisResult findMany
   */
  export type AnalysisResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisResult
     */
    select?: AnalysisResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisResult
     */
    omit?: AnalysisResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisResultInclude<ExtArgs> | null
    /**
     * Filter, which AnalysisResults to fetch.
     */
    where?: AnalysisResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalysisResults to fetch.
     */
    orderBy?: AnalysisResultOrderByWithRelationInput | AnalysisResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnalysisResults.
     */
    cursor?: AnalysisResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalysisResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalysisResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalysisResults.
     */
    distinct?: AnalysisResultScalarFieldEnum | AnalysisResultScalarFieldEnum[]
  }

  /**
   * AnalysisResult create
   */
  export type AnalysisResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisResult
     */
    select?: AnalysisResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisResult
     */
    omit?: AnalysisResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisResultInclude<ExtArgs> | null
    /**
     * The data needed to create a AnalysisResult.
     */
    data: XOR<AnalysisResultCreateInput, AnalysisResultUncheckedCreateInput>
  }

  /**
   * AnalysisResult createMany
   */
  export type AnalysisResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnalysisResults.
     */
    data: AnalysisResultCreateManyInput | AnalysisResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnalysisResult createManyAndReturn
   */
  export type AnalysisResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisResult
     */
    select?: AnalysisResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisResult
     */
    omit?: AnalysisResultOmit<ExtArgs> | null
    /**
     * The data used to create many AnalysisResults.
     */
    data: AnalysisResultCreateManyInput | AnalysisResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnalysisResult update
   */
  export type AnalysisResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisResult
     */
    select?: AnalysisResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisResult
     */
    omit?: AnalysisResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisResultInclude<ExtArgs> | null
    /**
     * The data needed to update a AnalysisResult.
     */
    data: XOR<AnalysisResultUpdateInput, AnalysisResultUncheckedUpdateInput>
    /**
     * Choose, which AnalysisResult to update.
     */
    where: AnalysisResultWhereUniqueInput
  }

  /**
   * AnalysisResult updateMany
   */
  export type AnalysisResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnalysisResults.
     */
    data: XOR<AnalysisResultUpdateManyMutationInput, AnalysisResultUncheckedUpdateManyInput>
    /**
     * Filter which AnalysisResults to update
     */
    where?: AnalysisResultWhereInput
    /**
     * Limit how many AnalysisResults to update.
     */
    limit?: number
  }

  /**
   * AnalysisResult updateManyAndReturn
   */
  export type AnalysisResultUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisResult
     */
    select?: AnalysisResultSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisResult
     */
    omit?: AnalysisResultOmit<ExtArgs> | null
    /**
     * The data used to update AnalysisResults.
     */
    data: XOR<AnalysisResultUpdateManyMutationInput, AnalysisResultUncheckedUpdateManyInput>
    /**
     * Filter which AnalysisResults to update
     */
    where?: AnalysisResultWhereInput
    /**
     * Limit how many AnalysisResults to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisResultIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnalysisResult upsert
   */
  export type AnalysisResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisResult
     */
    select?: AnalysisResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisResult
     */
    omit?: AnalysisResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisResultInclude<ExtArgs> | null
    /**
     * The filter to search for the AnalysisResult to update in case it exists.
     */
    where: AnalysisResultWhereUniqueInput
    /**
     * In case the AnalysisResult found by the `where` argument doesn't exist, create a new AnalysisResult with this data.
     */
    create: XOR<AnalysisResultCreateInput, AnalysisResultUncheckedCreateInput>
    /**
     * In case the AnalysisResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalysisResultUpdateInput, AnalysisResultUncheckedUpdateInput>
  }

  /**
   * AnalysisResult delete
   */
  export type AnalysisResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisResult
     */
    select?: AnalysisResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisResult
     */
    omit?: AnalysisResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisResultInclude<ExtArgs> | null
    /**
     * Filter which AnalysisResult to delete.
     */
    where: AnalysisResultWhereUniqueInput
  }

  /**
   * AnalysisResult deleteMany
   */
  export type AnalysisResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalysisResults to delete
     */
    where?: AnalysisResultWhereInput
    /**
     * Limit how many AnalysisResults to delete.
     */
    limit?: number
  }

  /**
   * AnalysisResult.sequence
   */
  export type AnalysisResult$sequenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProteinSequence
     */
    select?: ProteinSequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProteinSequence
     */
    omit?: ProteinSequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProteinSequenceInclude<ExtArgs> | null
    where?: ProteinSequenceWhereInput
  }

  /**
   * AnalysisResult.job
   */
  export type AnalysisResult$jobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionJob
     */
    select?: PredictionJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PredictionJob
     */
    omit?: PredictionJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionJobInclude<ExtArgs> | null
    where?: PredictionJobWhereInput
  }

  /**
   * AnalysisResult without action
   */
  export type AnalysisResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisResult
     */
    select?: AnalysisResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisResult
     */
    omit?: AnalysisResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisResultInclude<ExtArgs> | null
  }


  /**
   * Model Bookmark
   */

  export type AggregateBookmark = {
    _count: BookmarkCountAggregateOutputType | null
    _min: BookmarkMinAggregateOutputType | null
    _max: BookmarkMaxAggregateOutputType | null
  }

  export type BookmarkMinAggregateOutputType = {
    id: string | null
    userId: string | null
    workspaceId: string | null
    label: string | null
    targetType: string | null
    targetId: string | null
    createdAt: Date | null
  }

  export type BookmarkMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    workspaceId: string | null
    label: string | null
    targetType: string | null
    targetId: string | null
    createdAt: Date | null
  }

  export type BookmarkCountAggregateOutputType = {
    id: number
    userId: number
    workspaceId: number
    label: number
    targetType: number
    targetId: number
    createdAt: number
    _all: number
  }


  export type BookmarkMinAggregateInputType = {
    id?: true
    userId?: true
    workspaceId?: true
    label?: true
    targetType?: true
    targetId?: true
    createdAt?: true
  }

  export type BookmarkMaxAggregateInputType = {
    id?: true
    userId?: true
    workspaceId?: true
    label?: true
    targetType?: true
    targetId?: true
    createdAt?: true
  }

  export type BookmarkCountAggregateInputType = {
    id?: true
    userId?: true
    workspaceId?: true
    label?: true
    targetType?: true
    targetId?: true
    createdAt?: true
    _all?: true
  }

  export type BookmarkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookmark to aggregate.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookmarks
    **/
    _count?: true | BookmarkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookmarkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookmarkMaxAggregateInputType
  }

  export type GetBookmarkAggregateType<T extends BookmarkAggregateArgs> = {
        [P in keyof T & keyof AggregateBookmark]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookmark[P]>
      : GetScalarType<T[P], AggregateBookmark[P]>
  }




  export type BookmarkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkWhereInput
    orderBy?: BookmarkOrderByWithAggregationInput | BookmarkOrderByWithAggregationInput[]
    by: BookmarkScalarFieldEnum[] | BookmarkScalarFieldEnum
    having?: BookmarkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookmarkCountAggregateInputType | true
    _min?: BookmarkMinAggregateInputType
    _max?: BookmarkMaxAggregateInputType
  }

  export type BookmarkGroupByOutputType = {
    id: string
    userId: string
    workspaceId: string
    label: string
    targetType: string
    targetId: string
    createdAt: Date
    _count: BookmarkCountAggregateOutputType | null
    _min: BookmarkMinAggregateOutputType | null
    _max: BookmarkMaxAggregateOutputType | null
  }

  type GetBookmarkGroupByPayload<T extends BookmarkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookmarkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookmarkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookmarkGroupByOutputType[P]>
            : GetScalarType<T[P], BookmarkGroupByOutputType[P]>
        }
      >
    >


  export type BookmarkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    workspaceId?: boolean
    label?: boolean
    targetType?: boolean
    targetId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookmark"]>

  export type BookmarkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    workspaceId?: boolean
    label?: boolean
    targetType?: boolean
    targetId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookmark"]>

  export type BookmarkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    workspaceId?: boolean
    label?: boolean
    targetType?: boolean
    targetId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookmark"]>

  export type BookmarkSelectScalar = {
    id?: boolean
    userId?: boolean
    workspaceId?: boolean
    label?: boolean
    targetType?: boolean
    targetId?: boolean
    createdAt?: boolean
  }

  export type BookmarkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "workspaceId" | "label" | "targetType" | "targetId" | "createdAt", ExtArgs["result"]["bookmark"]>
  export type BookmarkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }
  export type BookmarkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }
  export type BookmarkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }

  export type $BookmarkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bookmark"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      workspace: Prisma.$WorkspacePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      workspaceId: string
      label: string
      targetType: string
      targetId: string
      createdAt: Date
    }, ExtArgs["result"]["bookmark"]>
    composites: {}
  }

  type BookmarkGetPayload<S extends boolean | null | undefined | BookmarkDefaultArgs> = $Result.GetResult<Prisma.$BookmarkPayload, S>

  type BookmarkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookmarkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookmarkCountAggregateInputType | true
    }

  export interface BookmarkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bookmark'], meta: { name: 'Bookmark' } }
    /**
     * Find zero or one Bookmark that matches the filter.
     * @param {BookmarkFindUniqueArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookmarkFindUniqueArgs>(args: SelectSubset<T, BookmarkFindUniqueArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bookmark that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookmarkFindUniqueOrThrowArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookmarkFindUniqueOrThrowArgs>(args: SelectSubset<T, BookmarkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookmark that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFindFirstArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookmarkFindFirstArgs>(args?: SelectSubset<T, BookmarkFindFirstArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookmark that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFindFirstOrThrowArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookmarkFindFirstOrThrowArgs>(args?: SelectSubset<T, BookmarkFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookmarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookmarks
     * const bookmarks = await prisma.bookmark.findMany()
     * 
     * // Get first 10 Bookmarks
     * const bookmarks = await prisma.bookmark.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookmarkWithIdOnly = await prisma.bookmark.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookmarkFindManyArgs>(args?: SelectSubset<T, BookmarkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bookmark.
     * @param {BookmarkCreateArgs} args - Arguments to create a Bookmark.
     * @example
     * // Create one Bookmark
     * const Bookmark = await prisma.bookmark.create({
     *   data: {
     *     // ... data to create a Bookmark
     *   }
     * })
     * 
     */
    create<T extends BookmarkCreateArgs>(args: SelectSubset<T, BookmarkCreateArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookmarks.
     * @param {BookmarkCreateManyArgs} args - Arguments to create many Bookmarks.
     * @example
     * // Create many Bookmarks
     * const bookmark = await prisma.bookmark.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookmarkCreateManyArgs>(args?: SelectSubset<T, BookmarkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookmarks and returns the data saved in the database.
     * @param {BookmarkCreateManyAndReturnArgs} args - Arguments to create many Bookmarks.
     * @example
     * // Create many Bookmarks
     * const bookmark = await prisma.bookmark.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookmarks and only return the `id`
     * const bookmarkWithIdOnly = await prisma.bookmark.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookmarkCreateManyAndReturnArgs>(args?: SelectSubset<T, BookmarkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bookmark.
     * @param {BookmarkDeleteArgs} args - Arguments to delete one Bookmark.
     * @example
     * // Delete one Bookmark
     * const Bookmark = await prisma.bookmark.delete({
     *   where: {
     *     // ... filter to delete one Bookmark
     *   }
     * })
     * 
     */
    delete<T extends BookmarkDeleteArgs>(args: SelectSubset<T, BookmarkDeleteArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bookmark.
     * @param {BookmarkUpdateArgs} args - Arguments to update one Bookmark.
     * @example
     * // Update one Bookmark
     * const bookmark = await prisma.bookmark.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookmarkUpdateArgs>(args: SelectSubset<T, BookmarkUpdateArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookmarks.
     * @param {BookmarkDeleteManyArgs} args - Arguments to filter Bookmarks to delete.
     * @example
     * // Delete a few Bookmarks
     * const { count } = await prisma.bookmark.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookmarkDeleteManyArgs>(args?: SelectSubset<T, BookmarkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookmarks
     * const bookmark = await prisma.bookmark.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookmarkUpdateManyArgs>(args: SelectSubset<T, BookmarkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookmarks and returns the data updated in the database.
     * @param {BookmarkUpdateManyAndReturnArgs} args - Arguments to update many Bookmarks.
     * @example
     * // Update many Bookmarks
     * const bookmark = await prisma.bookmark.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookmarks and only return the `id`
     * const bookmarkWithIdOnly = await prisma.bookmark.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookmarkUpdateManyAndReturnArgs>(args: SelectSubset<T, BookmarkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bookmark.
     * @param {BookmarkUpsertArgs} args - Arguments to update or create a Bookmark.
     * @example
     * // Update or create a Bookmark
     * const bookmark = await prisma.bookmark.upsert({
     *   create: {
     *     // ... data to create a Bookmark
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bookmark we want to update
     *   }
     * })
     */
    upsert<T extends BookmarkUpsertArgs>(args: SelectSubset<T, BookmarkUpsertArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkCountArgs} args - Arguments to filter Bookmarks to count.
     * @example
     * // Count the number of Bookmarks
     * const count = await prisma.bookmark.count({
     *   where: {
     *     // ... the filter for the Bookmarks we want to count
     *   }
     * })
    **/
    count<T extends BookmarkCountArgs>(
      args?: Subset<T, BookmarkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookmarkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bookmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookmarkAggregateArgs>(args: Subset<T, BookmarkAggregateArgs>): Prisma.PrismaPromise<GetBookmarkAggregateType<T>>

    /**
     * Group by Bookmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookmarkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookmarkGroupByArgs['orderBy'] }
        : { orderBy?: BookmarkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookmarkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookmarkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bookmark model
   */
  readonly fields: BookmarkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bookmark.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookmarkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workspace<T extends WorkspaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceDefaultArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bookmark model
   */
  interface BookmarkFieldRefs {
    readonly id: FieldRef<"Bookmark", 'String'>
    readonly userId: FieldRef<"Bookmark", 'String'>
    readonly workspaceId: FieldRef<"Bookmark", 'String'>
    readonly label: FieldRef<"Bookmark", 'String'>
    readonly targetType: FieldRef<"Bookmark", 'String'>
    readonly targetId: FieldRef<"Bookmark", 'String'>
    readonly createdAt: FieldRef<"Bookmark", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bookmark findUnique
   */
  export type BookmarkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark findUniqueOrThrow
   */
  export type BookmarkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark findFirst
   */
  export type BookmarkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookmarks.
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookmarks.
     */
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Bookmark findFirstOrThrow
   */
  export type BookmarkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookmarks.
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookmarks.
     */
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Bookmark findMany
   */
  export type BookmarkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmarks to fetch.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookmarks.
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookmarks.
     */
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Bookmark create
   */
  export type BookmarkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * The data needed to create a Bookmark.
     */
    data: XOR<BookmarkCreateInput, BookmarkUncheckedCreateInput>
  }

  /**
   * Bookmark createMany
   */
  export type BookmarkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookmarks.
     */
    data: BookmarkCreateManyInput | BookmarkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bookmark createManyAndReturn
   */
  export type BookmarkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * The data used to create many Bookmarks.
     */
    data: BookmarkCreateManyInput | BookmarkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bookmark update
   */
  export type BookmarkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * The data needed to update a Bookmark.
     */
    data: XOR<BookmarkUpdateInput, BookmarkUncheckedUpdateInput>
    /**
     * Choose, which Bookmark to update.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark updateMany
   */
  export type BookmarkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookmarks.
     */
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyInput>
    /**
     * Filter which Bookmarks to update
     */
    where?: BookmarkWhereInput
    /**
     * Limit how many Bookmarks to update.
     */
    limit?: number
  }

  /**
   * Bookmark updateManyAndReturn
   */
  export type BookmarkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * The data used to update Bookmarks.
     */
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyInput>
    /**
     * Filter which Bookmarks to update
     */
    where?: BookmarkWhereInput
    /**
     * Limit how many Bookmarks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bookmark upsert
   */
  export type BookmarkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * The filter to search for the Bookmark to update in case it exists.
     */
    where: BookmarkWhereUniqueInput
    /**
     * In case the Bookmark found by the `where` argument doesn't exist, create a new Bookmark with this data.
     */
    create: XOR<BookmarkCreateInput, BookmarkUncheckedCreateInput>
    /**
     * In case the Bookmark was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookmarkUpdateInput, BookmarkUncheckedUpdateInput>
  }

  /**
   * Bookmark delete
   */
  export type BookmarkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter which Bookmark to delete.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark deleteMany
   */
  export type BookmarkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookmarks to delete
     */
    where?: BookmarkWhereInput
    /**
     * Limit how many Bookmarks to delete.
     */
    limit?: number
  }

  /**
   * Bookmark without action
   */
  export type BookmarkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
  }


  /**
   * Model IntegrationCache
   */

  export type AggregateIntegrationCache = {
    _count: IntegrationCacheCountAggregateOutputType | null
    _min: IntegrationCacheMinAggregateOutputType | null
    _max: IntegrationCacheMaxAggregateOutputType | null
  }

  export type IntegrationCacheMinAggregateOutputType = {
    id: string | null
    key: string | null
    provider: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IntegrationCacheMaxAggregateOutputType = {
    id: string | null
    key: string | null
    provider: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IntegrationCacheCountAggregateOutputType = {
    id: number
    key: number
    provider: number
    payload: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type IntegrationCacheMinAggregateInputType = {
    id?: true
    key?: true
    provider?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IntegrationCacheMaxAggregateInputType = {
    id?: true
    key?: true
    provider?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IntegrationCacheCountAggregateInputType = {
    id?: true
    key?: true
    provider?: true
    payload?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type IntegrationCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IntegrationCache to aggregate.
     */
    where?: IntegrationCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntegrationCaches to fetch.
     */
    orderBy?: IntegrationCacheOrderByWithRelationInput | IntegrationCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IntegrationCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntegrationCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntegrationCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IntegrationCaches
    **/
    _count?: true | IntegrationCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IntegrationCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IntegrationCacheMaxAggregateInputType
  }

  export type GetIntegrationCacheAggregateType<T extends IntegrationCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateIntegrationCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIntegrationCache[P]>
      : GetScalarType<T[P], AggregateIntegrationCache[P]>
  }




  export type IntegrationCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IntegrationCacheWhereInput
    orderBy?: IntegrationCacheOrderByWithAggregationInput | IntegrationCacheOrderByWithAggregationInput[]
    by: IntegrationCacheScalarFieldEnum[] | IntegrationCacheScalarFieldEnum
    having?: IntegrationCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IntegrationCacheCountAggregateInputType | true
    _min?: IntegrationCacheMinAggregateInputType
    _max?: IntegrationCacheMaxAggregateInputType
  }

  export type IntegrationCacheGroupByOutputType = {
    id: string
    key: string
    provider: string
    payload: JsonValue
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: IntegrationCacheCountAggregateOutputType | null
    _min: IntegrationCacheMinAggregateOutputType | null
    _max: IntegrationCacheMaxAggregateOutputType | null
  }

  type GetIntegrationCacheGroupByPayload<T extends IntegrationCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IntegrationCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IntegrationCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IntegrationCacheGroupByOutputType[P]>
            : GetScalarType<T[P], IntegrationCacheGroupByOutputType[P]>
        }
      >
    >


  export type IntegrationCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    provider?: boolean
    payload?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["integrationCache"]>

  export type IntegrationCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    provider?: boolean
    payload?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["integrationCache"]>

  export type IntegrationCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    provider?: boolean
    payload?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["integrationCache"]>

  export type IntegrationCacheSelectScalar = {
    id?: boolean
    key?: boolean
    provider?: boolean
    payload?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type IntegrationCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "provider" | "payload" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["integrationCache"]>

  export type $IntegrationCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IntegrationCache"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      provider: string
      payload: Prisma.JsonValue
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["integrationCache"]>
    composites: {}
  }

  type IntegrationCacheGetPayload<S extends boolean | null | undefined | IntegrationCacheDefaultArgs> = $Result.GetResult<Prisma.$IntegrationCachePayload, S>

  type IntegrationCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IntegrationCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IntegrationCacheCountAggregateInputType | true
    }

  export interface IntegrationCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IntegrationCache'], meta: { name: 'IntegrationCache' } }
    /**
     * Find zero or one IntegrationCache that matches the filter.
     * @param {IntegrationCacheFindUniqueArgs} args - Arguments to find a IntegrationCache
     * @example
     * // Get one IntegrationCache
     * const integrationCache = await prisma.integrationCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IntegrationCacheFindUniqueArgs>(args: SelectSubset<T, IntegrationCacheFindUniqueArgs<ExtArgs>>): Prisma__IntegrationCacheClient<$Result.GetResult<Prisma.$IntegrationCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IntegrationCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IntegrationCacheFindUniqueOrThrowArgs} args - Arguments to find a IntegrationCache
     * @example
     * // Get one IntegrationCache
     * const integrationCache = await prisma.integrationCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IntegrationCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, IntegrationCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IntegrationCacheClient<$Result.GetResult<Prisma.$IntegrationCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IntegrationCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationCacheFindFirstArgs} args - Arguments to find a IntegrationCache
     * @example
     * // Get one IntegrationCache
     * const integrationCache = await prisma.integrationCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IntegrationCacheFindFirstArgs>(args?: SelectSubset<T, IntegrationCacheFindFirstArgs<ExtArgs>>): Prisma__IntegrationCacheClient<$Result.GetResult<Prisma.$IntegrationCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IntegrationCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationCacheFindFirstOrThrowArgs} args - Arguments to find a IntegrationCache
     * @example
     * // Get one IntegrationCache
     * const integrationCache = await prisma.integrationCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IntegrationCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, IntegrationCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__IntegrationCacheClient<$Result.GetResult<Prisma.$IntegrationCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IntegrationCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IntegrationCaches
     * const integrationCaches = await prisma.integrationCache.findMany()
     * 
     * // Get first 10 IntegrationCaches
     * const integrationCaches = await prisma.integrationCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const integrationCacheWithIdOnly = await prisma.integrationCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IntegrationCacheFindManyArgs>(args?: SelectSubset<T, IntegrationCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntegrationCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IntegrationCache.
     * @param {IntegrationCacheCreateArgs} args - Arguments to create a IntegrationCache.
     * @example
     * // Create one IntegrationCache
     * const IntegrationCache = await prisma.integrationCache.create({
     *   data: {
     *     // ... data to create a IntegrationCache
     *   }
     * })
     * 
     */
    create<T extends IntegrationCacheCreateArgs>(args: SelectSubset<T, IntegrationCacheCreateArgs<ExtArgs>>): Prisma__IntegrationCacheClient<$Result.GetResult<Prisma.$IntegrationCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IntegrationCaches.
     * @param {IntegrationCacheCreateManyArgs} args - Arguments to create many IntegrationCaches.
     * @example
     * // Create many IntegrationCaches
     * const integrationCache = await prisma.integrationCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IntegrationCacheCreateManyArgs>(args?: SelectSubset<T, IntegrationCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IntegrationCaches and returns the data saved in the database.
     * @param {IntegrationCacheCreateManyAndReturnArgs} args - Arguments to create many IntegrationCaches.
     * @example
     * // Create many IntegrationCaches
     * const integrationCache = await prisma.integrationCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IntegrationCaches and only return the `id`
     * const integrationCacheWithIdOnly = await prisma.integrationCache.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IntegrationCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, IntegrationCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntegrationCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IntegrationCache.
     * @param {IntegrationCacheDeleteArgs} args - Arguments to delete one IntegrationCache.
     * @example
     * // Delete one IntegrationCache
     * const IntegrationCache = await prisma.integrationCache.delete({
     *   where: {
     *     // ... filter to delete one IntegrationCache
     *   }
     * })
     * 
     */
    delete<T extends IntegrationCacheDeleteArgs>(args: SelectSubset<T, IntegrationCacheDeleteArgs<ExtArgs>>): Prisma__IntegrationCacheClient<$Result.GetResult<Prisma.$IntegrationCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IntegrationCache.
     * @param {IntegrationCacheUpdateArgs} args - Arguments to update one IntegrationCache.
     * @example
     * // Update one IntegrationCache
     * const integrationCache = await prisma.integrationCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IntegrationCacheUpdateArgs>(args: SelectSubset<T, IntegrationCacheUpdateArgs<ExtArgs>>): Prisma__IntegrationCacheClient<$Result.GetResult<Prisma.$IntegrationCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IntegrationCaches.
     * @param {IntegrationCacheDeleteManyArgs} args - Arguments to filter IntegrationCaches to delete.
     * @example
     * // Delete a few IntegrationCaches
     * const { count } = await prisma.integrationCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IntegrationCacheDeleteManyArgs>(args?: SelectSubset<T, IntegrationCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IntegrationCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IntegrationCaches
     * const integrationCache = await prisma.integrationCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IntegrationCacheUpdateManyArgs>(args: SelectSubset<T, IntegrationCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IntegrationCaches and returns the data updated in the database.
     * @param {IntegrationCacheUpdateManyAndReturnArgs} args - Arguments to update many IntegrationCaches.
     * @example
     * // Update many IntegrationCaches
     * const integrationCache = await prisma.integrationCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IntegrationCaches and only return the `id`
     * const integrationCacheWithIdOnly = await prisma.integrationCache.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IntegrationCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, IntegrationCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntegrationCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IntegrationCache.
     * @param {IntegrationCacheUpsertArgs} args - Arguments to update or create a IntegrationCache.
     * @example
     * // Update or create a IntegrationCache
     * const integrationCache = await prisma.integrationCache.upsert({
     *   create: {
     *     // ... data to create a IntegrationCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IntegrationCache we want to update
     *   }
     * })
     */
    upsert<T extends IntegrationCacheUpsertArgs>(args: SelectSubset<T, IntegrationCacheUpsertArgs<ExtArgs>>): Prisma__IntegrationCacheClient<$Result.GetResult<Prisma.$IntegrationCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IntegrationCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationCacheCountArgs} args - Arguments to filter IntegrationCaches to count.
     * @example
     * // Count the number of IntegrationCaches
     * const count = await prisma.integrationCache.count({
     *   where: {
     *     // ... the filter for the IntegrationCaches we want to count
     *   }
     * })
    **/
    count<T extends IntegrationCacheCountArgs>(
      args?: Subset<T, IntegrationCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IntegrationCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IntegrationCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IntegrationCacheAggregateArgs>(args: Subset<T, IntegrationCacheAggregateArgs>): Prisma.PrismaPromise<GetIntegrationCacheAggregateType<T>>

    /**
     * Group by IntegrationCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IntegrationCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IntegrationCacheGroupByArgs['orderBy'] }
        : { orderBy?: IntegrationCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IntegrationCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIntegrationCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IntegrationCache model
   */
  readonly fields: IntegrationCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IntegrationCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IntegrationCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IntegrationCache model
   */
  interface IntegrationCacheFieldRefs {
    readonly id: FieldRef<"IntegrationCache", 'String'>
    readonly key: FieldRef<"IntegrationCache", 'String'>
    readonly provider: FieldRef<"IntegrationCache", 'String'>
    readonly payload: FieldRef<"IntegrationCache", 'Json'>
    readonly expiresAt: FieldRef<"IntegrationCache", 'DateTime'>
    readonly createdAt: FieldRef<"IntegrationCache", 'DateTime'>
    readonly updatedAt: FieldRef<"IntegrationCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IntegrationCache findUnique
   */
  export type IntegrationCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationCache
     */
    select?: IntegrationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationCache
     */
    omit?: IntegrationCacheOmit<ExtArgs> | null
    /**
     * Filter, which IntegrationCache to fetch.
     */
    where: IntegrationCacheWhereUniqueInput
  }

  /**
   * IntegrationCache findUniqueOrThrow
   */
  export type IntegrationCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationCache
     */
    select?: IntegrationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationCache
     */
    omit?: IntegrationCacheOmit<ExtArgs> | null
    /**
     * Filter, which IntegrationCache to fetch.
     */
    where: IntegrationCacheWhereUniqueInput
  }

  /**
   * IntegrationCache findFirst
   */
  export type IntegrationCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationCache
     */
    select?: IntegrationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationCache
     */
    omit?: IntegrationCacheOmit<ExtArgs> | null
    /**
     * Filter, which IntegrationCache to fetch.
     */
    where?: IntegrationCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntegrationCaches to fetch.
     */
    orderBy?: IntegrationCacheOrderByWithRelationInput | IntegrationCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IntegrationCaches.
     */
    cursor?: IntegrationCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntegrationCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntegrationCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IntegrationCaches.
     */
    distinct?: IntegrationCacheScalarFieldEnum | IntegrationCacheScalarFieldEnum[]
  }

  /**
   * IntegrationCache findFirstOrThrow
   */
  export type IntegrationCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationCache
     */
    select?: IntegrationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationCache
     */
    omit?: IntegrationCacheOmit<ExtArgs> | null
    /**
     * Filter, which IntegrationCache to fetch.
     */
    where?: IntegrationCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntegrationCaches to fetch.
     */
    orderBy?: IntegrationCacheOrderByWithRelationInput | IntegrationCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IntegrationCaches.
     */
    cursor?: IntegrationCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntegrationCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntegrationCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IntegrationCaches.
     */
    distinct?: IntegrationCacheScalarFieldEnum | IntegrationCacheScalarFieldEnum[]
  }

  /**
   * IntegrationCache findMany
   */
  export type IntegrationCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationCache
     */
    select?: IntegrationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationCache
     */
    omit?: IntegrationCacheOmit<ExtArgs> | null
    /**
     * Filter, which IntegrationCaches to fetch.
     */
    where?: IntegrationCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntegrationCaches to fetch.
     */
    orderBy?: IntegrationCacheOrderByWithRelationInput | IntegrationCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IntegrationCaches.
     */
    cursor?: IntegrationCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntegrationCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntegrationCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IntegrationCaches.
     */
    distinct?: IntegrationCacheScalarFieldEnum | IntegrationCacheScalarFieldEnum[]
  }

  /**
   * IntegrationCache create
   */
  export type IntegrationCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationCache
     */
    select?: IntegrationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationCache
     */
    omit?: IntegrationCacheOmit<ExtArgs> | null
    /**
     * The data needed to create a IntegrationCache.
     */
    data: XOR<IntegrationCacheCreateInput, IntegrationCacheUncheckedCreateInput>
  }

  /**
   * IntegrationCache createMany
   */
  export type IntegrationCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IntegrationCaches.
     */
    data: IntegrationCacheCreateManyInput | IntegrationCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IntegrationCache createManyAndReturn
   */
  export type IntegrationCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationCache
     */
    select?: IntegrationCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationCache
     */
    omit?: IntegrationCacheOmit<ExtArgs> | null
    /**
     * The data used to create many IntegrationCaches.
     */
    data: IntegrationCacheCreateManyInput | IntegrationCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IntegrationCache update
   */
  export type IntegrationCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationCache
     */
    select?: IntegrationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationCache
     */
    omit?: IntegrationCacheOmit<ExtArgs> | null
    /**
     * The data needed to update a IntegrationCache.
     */
    data: XOR<IntegrationCacheUpdateInput, IntegrationCacheUncheckedUpdateInput>
    /**
     * Choose, which IntegrationCache to update.
     */
    where: IntegrationCacheWhereUniqueInput
  }

  /**
   * IntegrationCache updateMany
   */
  export type IntegrationCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IntegrationCaches.
     */
    data: XOR<IntegrationCacheUpdateManyMutationInput, IntegrationCacheUncheckedUpdateManyInput>
    /**
     * Filter which IntegrationCaches to update
     */
    where?: IntegrationCacheWhereInput
    /**
     * Limit how many IntegrationCaches to update.
     */
    limit?: number
  }

  /**
   * IntegrationCache updateManyAndReturn
   */
  export type IntegrationCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationCache
     */
    select?: IntegrationCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationCache
     */
    omit?: IntegrationCacheOmit<ExtArgs> | null
    /**
     * The data used to update IntegrationCaches.
     */
    data: XOR<IntegrationCacheUpdateManyMutationInput, IntegrationCacheUncheckedUpdateManyInput>
    /**
     * Filter which IntegrationCaches to update
     */
    where?: IntegrationCacheWhereInput
    /**
     * Limit how many IntegrationCaches to update.
     */
    limit?: number
  }

  /**
   * IntegrationCache upsert
   */
  export type IntegrationCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationCache
     */
    select?: IntegrationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationCache
     */
    omit?: IntegrationCacheOmit<ExtArgs> | null
    /**
     * The filter to search for the IntegrationCache to update in case it exists.
     */
    where: IntegrationCacheWhereUniqueInput
    /**
     * In case the IntegrationCache found by the `where` argument doesn't exist, create a new IntegrationCache with this data.
     */
    create: XOR<IntegrationCacheCreateInput, IntegrationCacheUncheckedCreateInput>
    /**
     * In case the IntegrationCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IntegrationCacheUpdateInput, IntegrationCacheUncheckedUpdateInput>
  }

  /**
   * IntegrationCache delete
   */
  export type IntegrationCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationCache
     */
    select?: IntegrationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationCache
     */
    omit?: IntegrationCacheOmit<ExtArgs> | null
    /**
     * Filter which IntegrationCache to delete.
     */
    where: IntegrationCacheWhereUniqueInput
  }

  /**
   * IntegrationCache deleteMany
   */
  export type IntegrationCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IntegrationCaches to delete
     */
    where?: IntegrationCacheWhereInput
    /**
     * Limit how many IntegrationCaches to delete.
     */
    limit?: number
  }

  /**
   * IntegrationCache without action
   */
  export type IntegrationCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationCache
     */
    select?: IntegrationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationCache
     */
    omit?: IntegrationCacheOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WorkspaceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    ownerId: 'ownerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkspaceScalarFieldEnum = (typeof WorkspaceScalarFieldEnum)[keyof typeof WorkspaceScalarFieldEnum]


  export const ProteinSequenceScalarFieldEnum: {
    id: 'id',
    workspaceId: 'workspaceId',
    accession: 'accession',
    name: 'name',
    organism: 'organism',
    sequence: 'sequence',
    sequenceLength: 'sequenceLength',
    molecularWeight: 'molecularWeight',
    isoelectricPoint: 'isoelectricPoint',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProteinSequenceScalarFieldEnum = (typeof ProteinSequenceScalarFieldEnum)[keyof typeof ProteinSequenceScalarFieldEnum]


  export const PredictionJobScalarFieldEnum: {
    id: 'id',
    workspaceId: 'workspaceId',
    sequenceId: 'sequenceId',
    method: 'method',
    status: 'status',
    progress: 'progress',
    confidence: 'confidence',
    parameters: 'parameters',
    errorMessage: 'errorMessage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    completedAt: 'completedAt'
  };

  export type PredictionJobScalarFieldEnum = (typeof PredictionJobScalarFieldEnum)[keyof typeof PredictionJobScalarFieldEnum]


  export const TemplateHitScalarFieldEnum: {
    id: 'id',
    jobId: 'jobId',
    pdbId: 'pdbId',
    chainId: 'chainId',
    title: 'title',
    organism: 'organism',
    resolution: 'resolution',
    sequenceIdentity: 'sequenceIdentity',
    coverage: 'coverage',
    eValue: 'eValue',
    foldseekScore: 'foldseekScore',
    reliabilityBand: 'reliabilityBand',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type TemplateHitScalarFieldEnum = (typeof TemplateHitScalarFieldEnum)[keyof typeof TemplateHitScalarFieldEnum]


  export const StructureModelScalarFieldEnum: {
    id: 'id',
    jobId: 'jobId',
    name: 'name',
    format: 'format',
    storageUrl: 'storageUrl',
    pdbText: 'pdbText',
    chains: 'chains',
    ligands: 'ligands',
    confidenceMap: 'confidenceMap',
    paeMatrix: 'paeMatrix',
    rmsdReference: 'rmsdReference',
    createdAt: 'createdAt'
  };

  export type StructureModelScalarFieldEnum = (typeof StructureModelScalarFieldEnum)[keyof typeof StructureModelScalarFieldEnum]


  export const AnalysisResultScalarFieldEnum: {
    id: 'id',
    sequenceId: 'sequenceId',
    jobId: 'jobId',
    type: 'type',
    title: 'title',
    payload: 'payload',
    createdAt: 'createdAt'
  };

  export type AnalysisResultScalarFieldEnum = (typeof AnalysisResultScalarFieldEnum)[keyof typeof AnalysisResultScalarFieldEnum]


  export const BookmarkScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    workspaceId: 'workspaceId',
    label: 'label',
    targetType: 'targetType',
    targetId: 'targetId',
    createdAt: 'createdAt'
  };

  export type BookmarkScalarFieldEnum = (typeof BookmarkScalarFieldEnum)[keyof typeof BookmarkScalarFieldEnum]


  export const IntegrationCacheScalarFieldEnum: {
    id: 'id',
    key: 'key',
    provider: 'provider',
    payload: 'payload',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type IntegrationCacheScalarFieldEnum = (typeof IntegrationCacheScalarFieldEnum)[keyof typeof IntegrationCacheScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'PredictionMethod'
   */
  export type EnumPredictionMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PredictionMethod'>
    


  /**
   * Reference to a field of type 'PredictionMethod[]'
   */
  export type ListEnumPredictionMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PredictionMethod[]'>
    


  /**
   * Reference to a field of type 'JobStatus'
   */
  export type EnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus'>
    


  /**
   * Reference to a field of type 'JobStatus[]'
   */
  export type ListEnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    workspaces?: WorkspaceListRelationFilter
    bookmarks?: BookmarkListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workspaces?: WorkspaceOrderByRelationAggregateInput
    bookmarks?: BookmarkOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    workspaces?: WorkspaceListRelationFilter
    bookmarks?: BookmarkListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type WorkspaceWhereInput = {
    AND?: WorkspaceWhereInput | WorkspaceWhereInput[]
    OR?: WorkspaceWhereInput[]
    NOT?: WorkspaceWhereInput | WorkspaceWhereInput[]
    id?: StringFilter<"Workspace"> | string
    name?: StringFilter<"Workspace"> | string
    description?: StringNullableFilter<"Workspace"> | string | null
    ownerId?: StringFilter<"Workspace"> | string
    createdAt?: DateTimeFilter<"Workspace"> | Date | string
    updatedAt?: DateTimeFilter<"Workspace"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    sequences?: ProteinSequenceListRelationFilter
    jobs?: PredictionJobListRelationFilter
    bookmarks?: BookmarkListRelationFilter
  }

  export type WorkspaceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    sequences?: ProteinSequenceOrderByRelationAggregateInput
    jobs?: PredictionJobOrderByRelationAggregateInput
    bookmarks?: BookmarkOrderByRelationAggregateInput
  }

  export type WorkspaceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkspaceWhereInput | WorkspaceWhereInput[]
    OR?: WorkspaceWhereInput[]
    NOT?: WorkspaceWhereInput | WorkspaceWhereInput[]
    name?: StringFilter<"Workspace"> | string
    description?: StringNullableFilter<"Workspace"> | string | null
    ownerId?: StringFilter<"Workspace"> | string
    createdAt?: DateTimeFilter<"Workspace"> | Date | string
    updatedAt?: DateTimeFilter<"Workspace"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    sequences?: ProteinSequenceListRelationFilter
    jobs?: PredictionJobListRelationFilter
    bookmarks?: BookmarkListRelationFilter
  }, "id">

  export type WorkspaceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkspaceCountOrderByAggregateInput
    _max?: WorkspaceMaxOrderByAggregateInput
    _min?: WorkspaceMinOrderByAggregateInput
  }

  export type WorkspaceScalarWhereWithAggregatesInput = {
    AND?: WorkspaceScalarWhereWithAggregatesInput | WorkspaceScalarWhereWithAggregatesInput[]
    OR?: WorkspaceScalarWhereWithAggregatesInput[]
    NOT?: WorkspaceScalarWhereWithAggregatesInput | WorkspaceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Workspace"> | string
    name?: StringWithAggregatesFilter<"Workspace"> | string
    description?: StringNullableWithAggregatesFilter<"Workspace"> | string | null
    ownerId?: StringWithAggregatesFilter<"Workspace"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Workspace"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Workspace"> | Date | string
  }

  export type ProteinSequenceWhereInput = {
    AND?: ProteinSequenceWhereInput | ProteinSequenceWhereInput[]
    OR?: ProteinSequenceWhereInput[]
    NOT?: ProteinSequenceWhereInput | ProteinSequenceWhereInput[]
    id?: StringFilter<"ProteinSequence"> | string
    workspaceId?: StringFilter<"ProteinSequence"> | string
    accession?: StringNullableFilter<"ProteinSequence"> | string | null
    name?: StringFilter<"ProteinSequence"> | string
    organism?: StringNullableFilter<"ProteinSequence"> | string | null
    sequence?: StringFilter<"ProteinSequence"> | string
    sequenceLength?: IntFilter<"ProteinSequence"> | number
    molecularWeight?: FloatNullableFilter<"ProteinSequence"> | number | null
    isoelectricPoint?: FloatNullableFilter<"ProteinSequence"> | number | null
    createdAt?: DateTimeFilter<"ProteinSequence"> | Date | string
    updatedAt?: DateTimeFilter<"ProteinSequence"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    jobs?: PredictionJobListRelationFilter
    analysisResults?: AnalysisResultListRelationFilter
  }

  export type ProteinSequenceOrderByWithRelationInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    accession?: SortOrderInput | SortOrder
    name?: SortOrder
    organism?: SortOrderInput | SortOrder
    sequence?: SortOrder
    sequenceLength?: SortOrder
    molecularWeight?: SortOrderInput | SortOrder
    isoelectricPoint?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
    jobs?: PredictionJobOrderByRelationAggregateInput
    analysisResults?: AnalysisResultOrderByRelationAggregateInput
  }

  export type ProteinSequenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProteinSequenceWhereInput | ProteinSequenceWhereInput[]
    OR?: ProteinSequenceWhereInput[]
    NOT?: ProteinSequenceWhereInput | ProteinSequenceWhereInput[]
    workspaceId?: StringFilter<"ProteinSequence"> | string
    accession?: StringNullableFilter<"ProteinSequence"> | string | null
    name?: StringFilter<"ProteinSequence"> | string
    organism?: StringNullableFilter<"ProteinSequence"> | string | null
    sequence?: StringFilter<"ProteinSequence"> | string
    sequenceLength?: IntFilter<"ProteinSequence"> | number
    molecularWeight?: FloatNullableFilter<"ProteinSequence"> | number | null
    isoelectricPoint?: FloatNullableFilter<"ProteinSequence"> | number | null
    createdAt?: DateTimeFilter<"ProteinSequence"> | Date | string
    updatedAt?: DateTimeFilter<"ProteinSequence"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    jobs?: PredictionJobListRelationFilter
    analysisResults?: AnalysisResultListRelationFilter
  }, "id">

  export type ProteinSequenceOrderByWithAggregationInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    accession?: SortOrderInput | SortOrder
    name?: SortOrder
    organism?: SortOrderInput | SortOrder
    sequence?: SortOrder
    sequenceLength?: SortOrder
    molecularWeight?: SortOrderInput | SortOrder
    isoelectricPoint?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProteinSequenceCountOrderByAggregateInput
    _avg?: ProteinSequenceAvgOrderByAggregateInput
    _max?: ProteinSequenceMaxOrderByAggregateInput
    _min?: ProteinSequenceMinOrderByAggregateInput
    _sum?: ProteinSequenceSumOrderByAggregateInput
  }

  export type ProteinSequenceScalarWhereWithAggregatesInput = {
    AND?: ProteinSequenceScalarWhereWithAggregatesInput | ProteinSequenceScalarWhereWithAggregatesInput[]
    OR?: ProteinSequenceScalarWhereWithAggregatesInput[]
    NOT?: ProteinSequenceScalarWhereWithAggregatesInput | ProteinSequenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProteinSequence"> | string
    workspaceId?: StringWithAggregatesFilter<"ProteinSequence"> | string
    accession?: StringNullableWithAggregatesFilter<"ProteinSequence"> | string | null
    name?: StringWithAggregatesFilter<"ProteinSequence"> | string
    organism?: StringNullableWithAggregatesFilter<"ProteinSequence"> | string | null
    sequence?: StringWithAggregatesFilter<"ProteinSequence"> | string
    sequenceLength?: IntWithAggregatesFilter<"ProteinSequence"> | number
    molecularWeight?: FloatNullableWithAggregatesFilter<"ProteinSequence"> | number | null
    isoelectricPoint?: FloatNullableWithAggregatesFilter<"ProteinSequence"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"ProteinSequence"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProteinSequence"> | Date | string
  }

  export type PredictionJobWhereInput = {
    AND?: PredictionJobWhereInput | PredictionJobWhereInput[]
    OR?: PredictionJobWhereInput[]
    NOT?: PredictionJobWhereInput | PredictionJobWhereInput[]
    id?: StringFilter<"PredictionJob"> | string
    workspaceId?: StringFilter<"PredictionJob"> | string
    sequenceId?: StringFilter<"PredictionJob"> | string
    method?: EnumPredictionMethodFilter<"PredictionJob"> | $Enums.PredictionMethod
    status?: EnumJobStatusFilter<"PredictionJob"> | $Enums.JobStatus
    progress?: IntFilter<"PredictionJob"> | number
    confidence?: FloatNullableFilter<"PredictionJob"> | number | null
    parameters?: JsonNullableFilter<"PredictionJob">
    errorMessage?: StringNullableFilter<"PredictionJob"> | string | null
    createdAt?: DateTimeFilter<"PredictionJob"> | Date | string
    updatedAt?: DateTimeFilter<"PredictionJob"> | Date | string
    completedAt?: DateTimeNullableFilter<"PredictionJob"> | Date | string | null
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    sequence?: XOR<ProteinSequenceScalarRelationFilter, ProteinSequenceWhereInput>
    templateHits?: TemplateHitListRelationFilter
    structures?: StructureModelListRelationFilter
    analysisResults?: AnalysisResultListRelationFilter
  }

  export type PredictionJobOrderByWithRelationInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    sequenceId?: SortOrder
    method?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    confidence?: SortOrderInput | SortOrder
    parameters?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
    sequence?: ProteinSequenceOrderByWithRelationInput
    templateHits?: TemplateHitOrderByRelationAggregateInput
    structures?: StructureModelOrderByRelationAggregateInput
    analysisResults?: AnalysisResultOrderByRelationAggregateInput
  }

  export type PredictionJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PredictionJobWhereInput | PredictionJobWhereInput[]
    OR?: PredictionJobWhereInput[]
    NOT?: PredictionJobWhereInput | PredictionJobWhereInput[]
    workspaceId?: StringFilter<"PredictionJob"> | string
    sequenceId?: StringFilter<"PredictionJob"> | string
    method?: EnumPredictionMethodFilter<"PredictionJob"> | $Enums.PredictionMethod
    status?: EnumJobStatusFilter<"PredictionJob"> | $Enums.JobStatus
    progress?: IntFilter<"PredictionJob"> | number
    confidence?: FloatNullableFilter<"PredictionJob"> | number | null
    parameters?: JsonNullableFilter<"PredictionJob">
    errorMessage?: StringNullableFilter<"PredictionJob"> | string | null
    createdAt?: DateTimeFilter<"PredictionJob"> | Date | string
    updatedAt?: DateTimeFilter<"PredictionJob"> | Date | string
    completedAt?: DateTimeNullableFilter<"PredictionJob"> | Date | string | null
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    sequence?: XOR<ProteinSequenceScalarRelationFilter, ProteinSequenceWhereInput>
    templateHits?: TemplateHitListRelationFilter
    structures?: StructureModelListRelationFilter
    analysisResults?: AnalysisResultListRelationFilter
  }, "id">

  export type PredictionJobOrderByWithAggregationInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    sequenceId?: SortOrder
    method?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    confidence?: SortOrderInput | SortOrder
    parameters?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: PredictionJobCountOrderByAggregateInput
    _avg?: PredictionJobAvgOrderByAggregateInput
    _max?: PredictionJobMaxOrderByAggregateInput
    _min?: PredictionJobMinOrderByAggregateInput
    _sum?: PredictionJobSumOrderByAggregateInput
  }

  export type PredictionJobScalarWhereWithAggregatesInput = {
    AND?: PredictionJobScalarWhereWithAggregatesInput | PredictionJobScalarWhereWithAggregatesInput[]
    OR?: PredictionJobScalarWhereWithAggregatesInput[]
    NOT?: PredictionJobScalarWhereWithAggregatesInput | PredictionJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PredictionJob"> | string
    workspaceId?: StringWithAggregatesFilter<"PredictionJob"> | string
    sequenceId?: StringWithAggregatesFilter<"PredictionJob"> | string
    method?: EnumPredictionMethodWithAggregatesFilter<"PredictionJob"> | $Enums.PredictionMethod
    status?: EnumJobStatusWithAggregatesFilter<"PredictionJob"> | $Enums.JobStatus
    progress?: IntWithAggregatesFilter<"PredictionJob"> | number
    confidence?: FloatNullableWithAggregatesFilter<"PredictionJob"> | number | null
    parameters?: JsonNullableWithAggregatesFilter<"PredictionJob">
    errorMessage?: StringNullableWithAggregatesFilter<"PredictionJob"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PredictionJob"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PredictionJob"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"PredictionJob"> | Date | string | null
  }

  export type TemplateHitWhereInput = {
    AND?: TemplateHitWhereInput | TemplateHitWhereInput[]
    OR?: TemplateHitWhereInput[]
    NOT?: TemplateHitWhereInput | TemplateHitWhereInput[]
    id?: StringFilter<"TemplateHit"> | string
    jobId?: StringFilter<"TemplateHit"> | string
    pdbId?: StringFilter<"TemplateHit"> | string
    chainId?: StringNullableFilter<"TemplateHit"> | string | null
    title?: StringFilter<"TemplateHit"> | string
    organism?: StringNullableFilter<"TemplateHit"> | string | null
    resolution?: FloatNullableFilter<"TemplateHit"> | number | null
    sequenceIdentity?: FloatFilter<"TemplateHit"> | number
    coverage?: FloatFilter<"TemplateHit"> | number
    eValue?: FloatNullableFilter<"TemplateHit"> | number | null
    foldseekScore?: FloatNullableFilter<"TemplateHit"> | number | null
    reliabilityBand?: StringFilter<"TemplateHit"> | string
    metadata?: JsonNullableFilter<"TemplateHit">
    createdAt?: DateTimeFilter<"TemplateHit"> | Date | string
    job?: XOR<PredictionJobScalarRelationFilter, PredictionJobWhereInput>
  }

  export type TemplateHitOrderByWithRelationInput = {
    id?: SortOrder
    jobId?: SortOrder
    pdbId?: SortOrder
    chainId?: SortOrderInput | SortOrder
    title?: SortOrder
    organism?: SortOrderInput | SortOrder
    resolution?: SortOrderInput | SortOrder
    sequenceIdentity?: SortOrder
    coverage?: SortOrder
    eValue?: SortOrderInput | SortOrder
    foldseekScore?: SortOrderInput | SortOrder
    reliabilityBand?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    job?: PredictionJobOrderByWithRelationInput
  }

  export type TemplateHitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TemplateHitWhereInput | TemplateHitWhereInput[]
    OR?: TemplateHitWhereInput[]
    NOT?: TemplateHitWhereInput | TemplateHitWhereInput[]
    jobId?: StringFilter<"TemplateHit"> | string
    pdbId?: StringFilter<"TemplateHit"> | string
    chainId?: StringNullableFilter<"TemplateHit"> | string | null
    title?: StringFilter<"TemplateHit"> | string
    organism?: StringNullableFilter<"TemplateHit"> | string | null
    resolution?: FloatNullableFilter<"TemplateHit"> | number | null
    sequenceIdentity?: FloatFilter<"TemplateHit"> | number
    coverage?: FloatFilter<"TemplateHit"> | number
    eValue?: FloatNullableFilter<"TemplateHit"> | number | null
    foldseekScore?: FloatNullableFilter<"TemplateHit"> | number | null
    reliabilityBand?: StringFilter<"TemplateHit"> | string
    metadata?: JsonNullableFilter<"TemplateHit">
    createdAt?: DateTimeFilter<"TemplateHit"> | Date | string
    job?: XOR<PredictionJobScalarRelationFilter, PredictionJobWhereInput>
  }, "id">

  export type TemplateHitOrderByWithAggregationInput = {
    id?: SortOrder
    jobId?: SortOrder
    pdbId?: SortOrder
    chainId?: SortOrderInput | SortOrder
    title?: SortOrder
    organism?: SortOrderInput | SortOrder
    resolution?: SortOrderInput | SortOrder
    sequenceIdentity?: SortOrder
    coverage?: SortOrder
    eValue?: SortOrderInput | SortOrder
    foldseekScore?: SortOrderInput | SortOrder
    reliabilityBand?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TemplateHitCountOrderByAggregateInput
    _avg?: TemplateHitAvgOrderByAggregateInput
    _max?: TemplateHitMaxOrderByAggregateInput
    _min?: TemplateHitMinOrderByAggregateInput
    _sum?: TemplateHitSumOrderByAggregateInput
  }

  export type TemplateHitScalarWhereWithAggregatesInput = {
    AND?: TemplateHitScalarWhereWithAggregatesInput | TemplateHitScalarWhereWithAggregatesInput[]
    OR?: TemplateHitScalarWhereWithAggregatesInput[]
    NOT?: TemplateHitScalarWhereWithAggregatesInput | TemplateHitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TemplateHit"> | string
    jobId?: StringWithAggregatesFilter<"TemplateHit"> | string
    pdbId?: StringWithAggregatesFilter<"TemplateHit"> | string
    chainId?: StringNullableWithAggregatesFilter<"TemplateHit"> | string | null
    title?: StringWithAggregatesFilter<"TemplateHit"> | string
    organism?: StringNullableWithAggregatesFilter<"TemplateHit"> | string | null
    resolution?: FloatNullableWithAggregatesFilter<"TemplateHit"> | number | null
    sequenceIdentity?: FloatWithAggregatesFilter<"TemplateHit"> | number
    coverage?: FloatWithAggregatesFilter<"TemplateHit"> | number
    eValue?: FloatNullableWithAggregatesFilter<"TemplateHit"> | number | null
    foldseekScore?: FloatNullableWithAggregatesFilter<"TemplateHit"> | number | null
    reliabilityBand?: StringWithAggregatesFilter<"TemplateHit"> | string
    metadata?: JsonNullableWithAggregatesFilter<"TemplateHit">
    createdAt?: DateTimeWithAggregatesFilter<"TemplateHit"> | Date | string
  }

  export type StructureModelWhereInput = {
    AND?: StructureModelWhereInput | StructureModelWhereInput[]
    OR?: StructureModelWhereInput[]
    NOT?: StructureModelWhereInput | StructureModelWhereInput[]
    id?: StringFilter<"StructureModel"> | string
    jobId?: StringFilter<"StructureModel"> | string
    name?: StringFilter<"StructureModel"> | string
    format?: StringFilter<"StructureModel"> | string
    storageUrl?: StringNullableFilter<"StructureModel"> | string | null
    pdbText?: StringNullableFilter<"StructureModel"> | string | null
    chains?: JsonNullableFilter<"StructureModel">
    ligands?: JsonNullableFilter<"StructureModel">
    confidenceMap?: JsonNullableFilter<"StructureModel">
    paeMatrix?: JsonNullableFilter<"StructureModel">
    rmsdReference?: FloatNullableFilter<"StructureModel"> | number | null
    createdAt?: DateTimeFilter<"StructureModel"> | Date | string
    job?: XOR<PredictionJobScalarRelationFilter, PredictionJobWhereInput>
  }

  export type StructureModelOrderByWithRelationInput = {
    id?: SortOrder
    jobId?: SortOrder
    name?: SortOrder
    format?: SortOrder
    storageUrl?: SortOrderInput | SortOrder
    pdbText?: SortOrderInput | SortOrder
    chains?: SortOrderInput | SortOrder
    ligands?: SortOrderInput | SortOrder
    confidenceMap?: SortOrderInput | SortOrder
    paeMatrix?: SortOrderInput | SortOrder
    rmsdReference?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    job?: PredictionJobOrderByWithRelationInput
  }

  export type StructureModelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StructureModelWhereInput | StructureModelWhereInput[]
    OR?: StructureModelWhereInput[]
    NOT?: StructureModelWhereInput | StructureModelWhereInput[]
    jobId?: StringFilter<"StructureModel"> | string
    name?: StringFilter<"StructureModel"> | string
    format?: StringFilter<"StructureModel"> | string
    storageUrl?: StringNullableFilter<"StructureModel"> | string | null
    pdbText?: StringNullableFilter<"StructureModel"> | string | null
    chains?: JsonNullableFilter<"StructureModel">
    ligands?: JsonNullableFilter<"StructureModel">
    confidenceMap?: JsonNullableFilter<"StructureModel">
    paeMatrix?: JsonNullableFilter<"StructureModel">
    rmsdReference?: FloatNullableFilter<"StructureModel"> | number | null
    createdAt?: DateTimeFilter<"StructureModel"> | Date | string
    job?: XOR<PredictionJobScalarRelationFilter, PredictionJobWhereInput>
  }, "id">

  export type StructureModelOrderByWithAggregationInput = {
    id?: SortOrder
    jobId?: SortOrder
    name?: SortOrder
    format?: SortOrder
    storageUrl?: SortOrderInput | SortOrder
    pdbText?: SortOrderInput | SortOrder
    chains?: SortOrderInput | SortOrder
    ligands?: SortOrderInput | SortOrder
    confidenceMap?: SortOrderInput | SortOrder
    paeMatrix?: SortOrderInput | SortOrder
    rmsdReference?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: StructureModelCountOrderByAggregateInput
    _avg?: StructureModelAvgOrderByAggregateInput
    _max?: StructureModelMaxOrderByAggregateInput
    _min?: StructureModelMinOrderByAggregateInput
    _sum?: StructureModelSumOrderByAggregateInput
  }

  export type StructureModelScalarWhereWithAggregatesInput = {
    AND?: StructureModelScalarWhereWithAggregatesInput | StructureModelScalarWhereWithAggregatesInput[]
    OR?: StructureModelScalarWhereWithAggregatesInput[]
    NOT?: StructureModelScalarWhereWithAggregatesInput | StructureModelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StructureModel"> | string
    jobId?: StringWithAggregatesFilter<"StructureModel"> | string
    name?: StringWithAggregatesFilter<"StructureModel"> | string
    format?: StringWithAggregatesFilter<"StructureModel"> | string
    storageUrl?: StringNullableWithAggregatesFilter<"StructureModel"> | string | null
    pdbText?: StringNullableWithAggregatesFilter<"StructureModel"> | string | null
    chains?: JsonNullableWithAggregatesFilter<"StructureModel">
    ligands?: JsonNullableWithAggregatesFilter<"StructureModel">
    confidenceMap?: JsonNullableWithAggregatesFilter<"StructureModel">
    paeMatrix?: JsonNullableWithAggregatesFilter<"StructureModel">
    rmsdReference?: FloatNullableWithAggregatesFilter<"StructureModel"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"StructureModel"> | Date | string
  }

  export type AnalysisResultWhereInput = {
    AND?: AnalysisResultWhereInput | AnalysisResultWhereInput[]
    OR?: AnalysisResultWhereInput[]
    NOT?: AnalysisResultWhereInput | AnalysisResultWhereInput[]
    id?: StringFilter<"AnalysisResult"> | string
    sequenceId?: StringNullableFilter<"AnalysisResult"> | string | null
    jobId?: StringNullableFilter<"AnalysisResult"> | string | null
    type?: StringFilter<"AnalysisResult"> | string
    title?: StringFilter<"AnalysisResult"> | string
    payload?: JsonFilter<"AnalysisResult">
    createdAt?: DateTimeFilter<"AnalysisResult"> | Date | string
    sequence?: XOR<ProteinSequenceNullableScalarRelationFilter, ProteinSequenceWhereInput> | null
    job?: XOR<PredictionJobNullableScalarRelationFilter, PredictionJobWhereInput> | null
  }

  export type AnalysisResultOrderByWithRelationInput = {
    id?: SortOrder
    sequenceId?: SortOrderInput | SortOrder
    jobId?: SortOrderInput | SortOrder
    type?: SortOrder
    title?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
    sequence?: ProteinSequenceOrderByWithRelationInput
    job?: PredictionJobOrderByWithRelationInput
  }

  export type AnalysisResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnalysisResultWhereInput | AnalysisResultWhereInput[]
    OR?: AnalysisResultWhereInput[]
    NOT?: AnalysisResultWhereInput | AnalysisResultWhereInput[]
    sequenceId?: StringNullableFilter<"AnalysisResult"> | string | null
    jobId?: StringNullableFilter<"AnalysisResult"> | string | null
    type?: StringFilter<"AnalysisResult"> | string
    title?: StringFilter<"AnalysisResult"> | string
    payload?: JsonFilter<"AnalysisResult">
    createdAt?: DateTimeFilter<"AnalysisResult"> | Date | string
    sequence?: XOR<ProteinSequenceNullableScalarRelationFilter, ProteinSequenceWhereInput> | null
    job?: XOR<PredictionJobNullableScalarRelationFilter, PredictionJobWhereInput> | null
  }, "id">

  export type AnalysisResultOrderByWithAggregationInput = {
    id?: SortOrder
    sequenceId?: SortOrderInput | SortOrder
    jobId?: SortOrderInput | SortOrder
    type?: SortOrder
    title?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
    _count?: AnalysisResultCountOrderByAggregateInput
    _max?: AnalysisResultMaxOrderByAggregateInput
    _min?: AnalysisResultMinOrderByAggregateInput
  }

  export type AnalysisResultScalarWhereWithAggregatesInput = {
    AND?: AnalysisResultScalarWhereWithAggregatesInput | AnalysisResultScalarWhereWithAggregatesInput[]
    OR?: AnalysisResultScalarWhereWithAggregatesInput[]
    NOT?: AnalysisResultScalarWhereWithAggregatesInput | AnalysisResultScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnalysisResult"> | string
    sequenceId?: StringNullableWithAggregatesFilter<"AnalysisResult"> | string | null
    jobId?: StringNullableWithAggregatesFilter<"AnalysisResult"> | string | null
    type?: StringWithAggregatesFilter<"AnalysisResult"> | string
    title?: StringWithAggregatesFilter<"AnalysisResult"> | string
    payload?: JsonWithAggregatesFilter<"AnalysisResult">
    createdAt?: DateTimeWithAggregatesFilter<"AnalysisResult"> | Date | string
  }

  export type BookmarkWhereInput = {
    AND?: BookmarkWhereInput | BookmarkWhereInput[]
    OR?: BookmarkWhereInput[]
    NOT?: BookmarkWhereInput | BookmarkWhereInput[]
    id?: StringFilter<"Bookmark"> | string
    userId?: StringFilter<"Bookmark"> | string
    workspaceId?: StringFilter<"Bookmark"> | string
    label?: StringFilter<"Bookmark"> | string
    targetType?: StringFilter<"Bookmark"> | string
    targetId?: StringFilter<"Bookmark"> | string
    createdAt?: DateTimeFilter<"Bookmark"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
  }

  export type BookmarkOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    label?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    workspace?: WorkspaceOrderByWithRelationInput
  }

  export type BookmarkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BookmarkWhereInput | BookmarkWhereInput[]
    OR?: BookmarkWhereInput[]
    NOT?: BookmarkWhereInput | BookmarkWhereInput[]
    userId?: StringFilter<"Bookmark"> | string
    workspaceId?: StringFilter<"Bookmark"> | string
    label?: StringFilter<"Bookmark"> | string
    targetType?: StringFilter<"Bookmark"> | string
    targetId?: StringFilter<"Bookmark"> | string
    createdAt?: DateTimeFilter<"Bookmark"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
  }, "id">

  export type BookmarkOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    label?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    createdAt?: SortOrder
    _count?: BookmarkCountOrderByAggregateInput
    _max?: BookmarkMaxOrderByAggregateInput
    _min?: BookmarkMinOrderByAggregateInput
  }

  export type BookmarkScalarWhereWithAggregatesInput = {
    AND?: BookmarkScalarWhereWithAggregatesInput | BookmarkScalarWhereWithAggregatesInput[]
    OR?: BookmarkScalarWhereWithAggregatesInput[]
    NOT?: BookmarkScalarWhereWithAggregatesInput | BookmarkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bookmark"> | string
    userId?: StringWithAggregatesFilter<"Bookmark"> | string
    workspaceId?: StringWithAggregatesFilter<"Bookmark"> | string
    label?: StringWithAggregatesFilter<"Bookmark"> | string
    targetType?: StringWithAggregatesFilter<"Bookmark"> | string
    targetId?: StringWithAggregatesFilter<"Bookmark"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Bookmark"> | Date | string
  }

  export type IntegrationCacheWhereInput = {
    AND?: IntegrationCacheWhereInput | IntegrationCacheWhereInput[]
    OR?: IntegrationCacheWhereInput[]
    NOT?: IntegrationCacheWhereInput | IntegrationCacheWhereInput[]
    id?: StringFilter<"IntegrationCache"> | string
    key?: StringFilter<"IntegrationCache"> | string
    provider?: StringFilter<"IntegrationCache"> | string
    payload?: JsonFilter<"IntegrationCache">
    expiresAt?: DateTimeFilter<"IntegrationCache"> | Date | string
    createdAt?: DateTimeFilter<"IntegrationCache"> | Date | string
    updatedAt?: DateTimeFilter<"IntegrationCache"> | Date | string
  }

  export type IntegrationCacheOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    provider?: SortOrder
    payload?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntegrationCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: IntegrationCacheWhereInput | IntegrationCacheWhereInput[]
    OR?: IntegrationCacheWhereInput[]
    NOT?: IntegrationCacheWhereInput | IntegrationCacheWhereInput[]
    provider?: StringFilter<"IntegrationCache"> | string
    payload?: JsonFilter<"IntegrationCache">
    expiresAt?: DateTimeFilter<"IntegrationCache"> | Date | string
    createdAt?: DateTimeFilter<"IntegrationCache"> | Date | string
    updatedAt?: DateTimeFilter<"IntegrationCache"> | Date | string
  }, "id" | "key">

  export type IntegrationCacheOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    provider?: SortOrder
    payload?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: IntegrationCacheCountOrderByAggregateInput
    _max?: IntegrationCacheMaxOrderByAggregateInput
    _min?: IntegrationCacheMinOrderByAggregateInput
  }

  export type IntegrationCacheScalarWhereWithAggregatesInput = {
    AND?: IntegrationCacheScalarWhereWithAggregatesInput | IntegrationCacheScalarWhereWithAggregatesInput[]
    OR?: IntegrationCacheScalarWhereWithAggregatesInput[]
    NOT?: IntegrationCacheScalarWhereWithAggregatesInput | IntegrationCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"IntegrationCache"> | string
    key?: StringWithAggregatesFilter<"IntegrationCache"> | string
    provider?: StringWithAggregatesFilter<"IntegrationCache"> | string
    payload?: JsonWithAggregatesFilter<"IntegrationCache">
    expiresAt?: DateTimeWithAggregatesFilter<"IntegrationCache"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"IntegrationCache"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"IntegrationCache"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaces?: WorkspaceCreateNestedManyWithoutOwnerInput
    bookmarks?: BookmarkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaces?: WorkspaceUncheckedCreateNestedManyWithoutOwnerInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaces?: WorkspaceUpdateManyWithoutOwnerNestedInput
    bookmarks?: BookmarkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaces?: WorkspaceUncheckedUpdateManyWithoutOwnerNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutWorkspacesInput
    sequences?: ProteinSequenceCreateNestedManyWithoutWorkspaceInput
    jobs?: PredictionJobCreateNestedManyWithoutWorkspaceInput
    bookmarks?: BookmarkCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sequences?: ProteinSequenceUncheckedCreateNestedManyWithoutWorkspaceInput
    jobs?: PredictionJobUncheckedCreateNestedManyWithoutWorkspaceInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutWorkspacesNestedInput
    sequences?: ProteinSequenceUpdateManyWithoutWorkspaceNestedInput
    jobs?: PredictionJobUpdateManyWithoutWorkspaceNestedInput
    bookmarks?: BookmarkUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sequences?: ProteinSequenceUncheckedUpdateManyWithoutWorkspaceNestedInput
    jobs?: PredictionJobUncheckedUpdateManyWithoutWorkspaceNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkspaceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProteinSequenceCreateInput = {
    id?: string
    accession?: string | null
    name: string
    organism?: string | null
    sequence: string
    sequenceLength: number
    molecularWeight?: number | null
    isoelectricPoint?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutSequencesInput
    jobs?: PredictionJobCreateNestedManyWithoutSequenceInput
    analysisResults?: AnalysisResultCreateNestedManyWithoutSequenceInput
  }

  export type ProteinSequenceUncheckedCreateInput = {
    id?: string
    workspaceId: string
    accession?: string | null
    name: string
    organism?: string | null
    sequence: string
    sequenceLength: number
    molecularWeight?: number | null
    isoelectricPoint?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: PredictionJobUncheckedCreateNestedManyWithoutSequenceInput
    analysisResults?: AnalysisResultUncheckedCreateNestedManyWithoutSequenceInput
  }

  export type ProteinSequenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accession?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: StringFieldUpdateOperationsInput | string
    sequenceLength?: IntFieldUpdateOperationsInput | number
    molecularWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    isoelectricPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutSequencesNestedInput
    jobs?: PredictionJobUpdateManyWithoutSequenceNestedInput
    analysisResults?: AnalysisResultUpdateManyWithoutSequenceNestedInput
  }

  export type ProteinSequenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    accession?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: StringFieldUpdateOperationsInput | string
    sequenceLength?: IntFieldUpdateOperationsInput | number
    molecularWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    isoelectricPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: PredictionJobUncheckedUpdateManyWithoutSequenceNestedInput
    analysisResults?: AnalysisResultUncheckedUpdateManyWithoutSequenceNestedInput
  }

  export type ProteinSequenceCreateManyInput = {
    id?: string
    workspaceId: string
    accession?: string | null
    name: string
    organism?: string | null
    sequence: string
    sequenceLength: number
    molecularWeight?: number | null
    isoelectricPoint?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProteinSequenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accession?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: StringFieldUpdateOperationsInput | string
    sequenceLength?: IntFieldUpdateOperationsInput | number
    molecularWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    isoelectricPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProteinSequenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    accession?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: StringFieldUpdateOperationsInput | string
    sequenceLength?: IntFieldUpdateOperationsInput | number
    molecularWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    isoelectricPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PredictionJobCreateInput = {
    id?: string
    method: $Enums.PredictionMethod
    status?: $Enums.JobStatus
    progress?: number
    confidence?: number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    workspace: WorkspaceCreateNestedOneWithoutJobsInput
    sequence: ProteinSequenceCreateNestedOneWithoutJobsInput
    templateHits?: TemplateHitCreateNestedManyWithoutJobInput
    structures?: StructureModelCreateNestedManyWithoutJobInput
    analysisResults?: AnalysisResultCreateNestedManyWithoutJobInput
  }

  export type PredictionJobUncheckedCreateInput = {
    id?: string
    workspaceId: string
    sequenceId: string
    method: $Enums.PredictionMethod
    status?: $Enums.JobStatus
    progress?: number
    confidence?: number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    templateHits?: TemplateHitUncheckedCreateNestedManyWithoutJobInput
    structures?: StructureModelUncheckedCreateNestedManyWithoutJobInput
    analysisResults?: AnalysisResultUncheckedCreateNestedManyWithoutJobInput
  }

  export type PredictionJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspace?: WorkspaceUpdateOneRequiredWithoutJobsNestedInput
    sequence?: ProteinSequenceUpdateOneRequiredWithoutJobsNestedInput
    templateHits?: TemplateHitUpdateManyWithoutJobNestedInput
    structures?: StructureModelUpdateManyWithoutJobNestedInput
    analysisResults?: AnalysisResultUpdateManyWithoutJobNestedInput
  }

  export type PredictionJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    sequenceId?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    templateHits?: TemplateHitUncheckedUpdateManyWithoutJobNestedInput
    structures?: StructureModelUncheckedUpdateManyWithoutJobNestedInput
    analysisResults?: AnalysisResultUncheckedUpdateManyWithoutJobNestedInput
  }

  export type PredictionJobCreateManyInput = {
    id?: string
    workspaceId: string
    sequenceId: string
    method: $Enums.PredictionMethod
    status?: $Enums.JobStatus
    progress?: number
    confidence?: number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type PredictionJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PredictionJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    sequenceId?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TemplateHitCreateInput = {
    id?: string
    pdbId: string
    chainId?: string | null
    title: string
    organism?: string | null
    resolution?: number | null
    sequenceIdentity: number
    coverage: number
    eValue?: number | null
    foldseekScore?: number | null
    reliabilityBand: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    job: PredictionJobCreateNestedOneWithoutTemplateHitsInput
  }

  export type TemplateHitUncheckedCreateInput = {
    id?: string
    jobId: string
    pdbId: string
    chainId?: string | null
    title: string
    organism?: string | null
    resolution?: number | null
    sequenceIdentity: number
    coverage: number
    eValue?: number | null
    foldseekScore?: number | null
    reliabilityBand: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TemplateHitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pdbId?: StringFieldUpdateOperationsInput | string
    chainId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableFloatFieldUpdateOperationsInput | number | null
    sequenceIdentity?: FloatFieldUpdateOperationsInput | number
    coverage?: FloatFieldUpdateOperationsInput | number
    eValue?: NullableFloatFieldUpdateOperationsInput | number | null
    foldseekScore?: NullableFloatFieldUpdateOperationsInput | number | null
    reliabilityBand?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: PredictionJobUpdateOneRequiredWithoutTemplateHitsNestedInput
  }

  export type TemplateHitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    pdbId?: StringFieldUpdateOperationsInput | string
    chainId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableFloatFieldUpdateOperationsInput | number | null
    sequenceIdentity?: FloatFieldUpdateOperationsInput | number
    coverage?: FloatFieldUpdateOperationsInput | number
    eValue?: NullableFloatFieldUpdateOperationsInput | number | null
    foldseekScore?: NullableFloatFieldUpdateOperationsInput | number | null
    reliabilityBand?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateHitCreateManyInput = {
    id?: string
    jobId: string
    pdbId: string
    chainId?: string | null
    title: string
    organism?: string | null
    resolution?: number | null
    sequenceIdentity: number
    coverage: number
    eValue?: number | null
    foldseekScore?: number | null
    reliabilityBand: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TemplateHitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pdbId?: StringFieldUpdateOperationsInput | string
    chainId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableFloatFieldUpdateOperationsInput | number | null
    sequenceIdentity?: FloatFieldUpdateOperationsInput | number
    coverage?: FloatFieldUpdateOperationsInput | number
    eValue?: NullableFloatFieldUpdateOperationsInput | number | null
    foldseekScore?: NullableFloatFieldUpdateOperationsInput | number | null
    reliabilityBand?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateHitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    pdbId?: StringFieldUpdateOperationsInput | string
    chainId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableFloatFieldUpdateOperationsInput | number | null
    sequenceIdentity?: FloatFieldUpdateOperationsInput | number
    coverage?: FloatFieldUpdateOperationsInput | number
    eValue?: NullableFloatFieldUpdateOperationsInput | number | null
    foldseekScore?: NullableFloatFieldUpdateOperationsInput | number | null
    reliabilityBand?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StructureModelCreateInput = {
    id?: string
    name: string
    format?: string
    storageUrl?: string | null
    pdbText?: string | null
    chains?: NullableJsonNullValueInput | InputJsonValue
    ligands?: NullableJsonNullValueInput | InputJsonValue
    confidenceMap?: NullableJsonNullValueInput | InputJsonValue
    paeMatrix?: NullableJsonNullValueInput | InputJsonValue
    rmsdReference?: number | null
    createdAt?: Date | string
    job: PredictionJobCreateNestedOneWithoutStructuresInput
  }

  export type StructureModelUncheckedCreateInput = {
    id?: string
    jobId: string
    name: string
    format?: string
    storageUrl?: string | null
    pdbText?: string | null
    chains?: NullableJsonNullValueInput | InputJsonValue
    ligands?: NullableJsonNullValueInput | InputJsonValue
    confidenceMap?: NullableJsonNullValueInput | InputJsonValue
    paeMatrix?: NullableJsonNullValueInput | InputJsonValue
    rmsdReference?: number | null
    createdAt?: Date | string
  }

  export type StructureModelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pdbText?: NullableStringFieldUpdateOperationsInput | string | null
    chains?: NullableJsonNullValueInput | InputJsonValue
    ligands?: NullableJsonNullValueInput | InputJsonValue
    confidenceMap?: NullableJsonNullValueInput | InputJsonValue
    paeMatrix?: NullableJsonNullValueInput | InputJsonValue
    rmsdReference?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: PredictionJobUpdateOneRequiredWithoutStructuresNestedInput
  }

  export type StructureModelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pdbText?: NullableStringFieldUpdateOperationsInput | string | null
    chains?: NullableJsonNullValueInput | InputJsonValue
    ligands?: NullableJsonNullValueInput | InputJsonValue
    confidenceMap?: NullableJsonNullValueInput | InputJsonValue
    paeMatrix?: NullableJsonNullValueInput | InputJsonValue
    rmsdReference?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StructureModelCreateManyInput = {
    id?: string
    jobId: string
    name: string
    format?: string
    storageUrl?: string | null
    pdbText?: string | null
    chains?: NullableJsonNullValueInput | InputJsonValue
    ligands?: NullableJsonNullValueInput | InputJsonValue
    confidenceMap?: NullableJsonNullValueInput | InputJsonValue
    paeMatrix?: NullableJsonNullValueInput | InputJsonValue
    rmsdReference?: number | null
    createdAt?: Date | string
  }

  export type StructureModelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pdbText?: NullableStringFieldUpdateOperationsInput | string | null
    chains?: NullableJsonNullValueInput | InputJsonValue
    ligands?: NullableJsonNullValueInput | InputJsonValue
    confidenceMap?: NullableJsonNullValueInput | InputJsonValue
    paeMatrix?: NullableJsonNullValueInput | InputJsonValue
    rmsdReference?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StructureModelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pdbText?: NullableStringFieldUpdateOperationsInput | string | null
    chains?: NullableJsonNullValueInput | InputJsonValue
    ligands?: NullableJsonNullValueInput | InputJsonValue
    confidenceMap?: NullableJsonNullValueInput | InputJsonValue
    paeMatrix?: NullableJsonNullValueInput | InputJsonValue
    rmsdReference?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalysisResultCreateInput = {
    id?: string
    type: string
    title: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    sequence?: ProteinSequenceCreateNestedOneWithoutAnalysisResultsInput
    job?: PredictionJobCreateNestedOneWithoutAnalysisResultsInput
  }

  export type AnalysisResultUncheckedCreateInput = {
    id?: string
    sequenceId?: string | null
    jobId?: string | null
    type: string
    title: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AnalysisResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sequence?: ProteinSequenceUpdateOneWithoutAnalysisResultsNestedInput
    job?: PredictionJobUpdateOneWithoutAnalysisResultsNestedInput
  }

  export type AnalysisResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceId?: NullableStringFieldUpdateOperationsInput | string | null
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalysisResultCreateManyInput = {
    id?: string
    sequenceId?: string | null
    jobId?: string | null
    type: string
    title: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AnalysisResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalysisResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceId?: NullableStringFieldUpdateOperationsInput | string | null
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkCreateInput = {
    id?: string
    label: string
    targetType: string
    targetId: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBookmarksInput
    workspace: WorkspaceCreateNestedOneWithoutBookmarksInput
  }

  export type BookmarkUncheckedCreateInput = {
    id?: string
    userId: string
    workspaceId: string
    label: string
    targetType: string
    targetId: string
    createdAt?: Date | string
  }

  export type BookmarkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookmarksNestedInput
    workspace?: WorkspaceUpdateOneRequiredWithoutBookmarksNestedInput
  }

  export type BookmarkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkCreateManyInput = {
    id?: string
    userId: string
    workspaceId: string
    label: string
    targetType: string
    targetId: string
    createdAt?: Date | string
  }

  export type BookmarkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationCacheCreateInput = {
    id?: string
    key: string
    provider: string
    payload: JsonNullValueInput | InputJsonValue
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IntegrationCacheUncheckedCreateInput = {
    id?: string
    key: string
    provider: string
    payload: JsonNullValueInput | InputJsonValue
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IntegrationCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationCacheCreateManyInput = {
    id?: string
    key: string
    provider: string
    payload: JsonNullValueInput | InputJsonValue
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IntegrationCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type WorkspaceListRelationFilter = {
    every?: WorkspaceWhereInput
    some?: WorkspaceWhereInput
    none?: WorkspaceWhereInput
  }

  export type BookmarkListRelationFilter = {
    every?: BookmarkWhereInput
    some?: BookmarkWhereInput
    none?: BookmarkWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WorkspaceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookmarkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProteinSequenceListRelationFilter = {
    every?: ProteinSequenceWhereInput
    some?: ProteinSequenceWhereInput
    none?: ProteinSequenceWhereInput
  }

  export type PredictionJobListRelationFilter = {
    every?: PredictionJobWhereInput
    some?: PredictionJobWhereInput
    none?: PredictionJobWhereInput
  }

  export type ProteinSequenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PredictionJobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkspaceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkspaceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkspaceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type WorkspaceScalarRelationFilter = {
    is?: WorkspaceWhereInput
    isNot?: WorkspaceWhereInput
  }

  export type AnalysisResultListRelationFilter = {
    every?: AnalysisResultWhereInput
    some?: AnalysisResultWhereInput
    none?: AnalysisResultWhereInput
  }

  export type AnalysisResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProteinSequenceCountOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    accession?: SortOrder
    name?: SortOrder
    organism?: SortOrder
    sequence?: SortOrder
    sequenceLength?: SortOrder
    molecularWeight?: SortOrder
    isoelectricPoint?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProteinSequenceAvgOrderByAggregateInput = {
    sequenceLength?: SortOrder
    molecularWeight?: SortOrder
    isoelectricPoint?: SortOrder
  }

  export type ProteinSequenceMaxOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    accession?: SortOrder
    name?: SortOrder
    organism?: SortOrder
    sequence?: SortOrder
    sequenceLength?: SortOrder
    molecularWeight?: SortOrder
    isoelectricPoint?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProteinSequenceMinOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    accession?: SortOrder
    name?: SortOrder
    organism?: SortOrder
    sequence?: SortOrder
    sequenceLength?: SortOrder
    molecularWeight?: SortOrder
    isoelectricPoint?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProteinSequenceSumOrderByAggregateInput = {
    sequenceLength?: SortOrder
    molecularWeight?: SortOrder
    isoelectricPoint?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumPredictionMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PredictionMethod | EnumPredictionMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PredictionMethod[] | ListEnumPredictionMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PredictionMethod[] | ListEnumPredictionMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPredictionMethodFilter<$PrismaModel> | $Enums.PredictionMethod
  }

  export type EnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ProteinSequenceScalarRelationFilter = {
    is?: ProteinSequenceWhereInput
    isNot?: ProteinSequenceWhereInput
  }

  export type TemplateHitListRelationFilter = {
    every?: TemplateHitWhereInput
    some?: TemplateHitWhereInput
    none?: TemplateHitWhereInput
  }

  export type StructureModelListRelationFilter = {
    every?: StructureModelWhereInput
    some?: StructureModelWhereInput
    none?: StructureModelWhereInput
  }

  export type TemplateHitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StructureModelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PredictionJobCountOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    sequenceId?: SortOrder
    method?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    confidence?: SortOrder
    parameters?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type PredictionJobAvgOrderByAggregateInput = {
    progress?: SortOrder
    confidence?: SortOrder
  }

  export type PredictionJobMaxOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    sequenceId?: SortOrder
    method?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    confidence?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type PredictionJobMinOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    sequenceId?: SortOrder
    method?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    confidence?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type PredictionJobSumOrderByAggregateInput = {
    progress?: SortOrder
    confidence?: SortOrder
  }

  export type EnumPredictionMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PredictionMethod | EnumPredictionMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PredictionMethod[] | ListEnumPredictionMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PredictionMethod[] | ListEnumPredictionMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPredictionMethodWithAggregatesFilter<$PrismaModel> | $Enums.PredictionMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPredictionMethodFilter<$PrismaModel>
    _max?: NestedEnumPredictionMethodFilter<$PrismaModel>
  }

  export type EnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PredictionJobScalarRelationFilter = {
    is?: PredictionJobWhereInput
    isNot?: PredictionJobWhereInput
  }

  export type TemplateHitCountOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    pdbId?: SortOrder
    chainId?: SortOrder
    title?: SortOrder
    organism?: SortOrder
    resolution?: SortOrder
    sequenceIdentity?: SortOrder
    coverage?: SortOrder
    eValue?: SortOrder
    foldseekScore?: SortOrder
    reliabilityBand?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type TemplateHitAvgOrderByAggregateInput = {
    resolution?: SortOrder
    sequenceIdentity?: SortOrder
    coverage?: SortOrder
    eValue?: SortOrder
    foldseekScore?: SortOrder
  }

  export type TemplateHitMaxOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    pdbId?: SortOrder
    chainId?: SortOrder
    title?: SortOrder
    organism?: SortOrder
    resolution?: SortOrder
    sequenceIdentity?: SortOrder
    coverage?: SortOrder
    eValue?: SortOrder
    foldseekScore?: SortOrder
    reliabilityBand?: SortOrder
    createdAt?: SortOrder
  }

  export type TemplateHitMinOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    pdbId?: SortOrder
    chainId?: SortOrder
    title?: SortOrder
    organism?: SortOrder
    resolution?: SortOrder
    sequenceIdentity?: SortOrder
    coverage?: SortOrder
    eValue?: SortOrder
    foldseekScore?: SortOrder
    reliabilityBand?: SortOrder
    createdAt?: SortOrder
  }

  export type TemplateHitSumOrderByAggregateInput = {
    resolution?: SortOrder
    sequenceIdentity?: SortOrder
    coverage?: SortOrder
    eValue?: SortOrder
    foldseekScore?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StructureModelCountOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    name?: SortOrder
    format?: SortOrder
    storageUrl?: SortOrder
    pdbText?: SortOrder
    chains?: SortOrder
    ligands?: SortOrder
    confidenceMap?: SortOrder
    paeMatrix?: SortOrder
    rmsdReference?: SortOrder
    createdAt?: SortOrder
  }

  export type StructureModelAvgOrderByAggregateInput = {
    rmsdReference?: SortOrder
  }

  export type StructureModelMaxOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    name?: SortOrder
    format?: SortOrder
    storageUrl?: SortOrder
    pdbText?: SortOrder
    rmsdReference?: SortOrder
    createdAt?: SortOrder
  }

  export type StructureModelMinOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    name?: SortOrder
    format?: SortOrder
    storageUrl?: SortOrder
    pdbText?: SortOrder
    rmsdReference?: SortOrder
    createdAt?: SortOrder
  }

  export type StructureModelSumOrderByAggregateInput = {
    rmsdReference?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProteinSequenceNullableScalarRelationFilter = {
    is?: ProteinSequenceWhereInput | null
    isNot?: ProteinSequenceWhereInput | null
  }

  export type PredictionJobNullableScalarRelationFilter = {
    is?: PredictionJobWhereInput | null
    isNot?: PredictionJobWhereInput | null
  }

  export type AnalysisResultCountOrderByAggregateInput = {
    id?: SortOrder
    sequenceId?: SortOrder
    jobId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalysisResultMaxOrderByAggregateInput = {
    id?: SortOrder
    sequenceId?: SortOrder
    jobId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalysisResultMinOrderByAggregateInput = {
    id?: SortOrder
    sequenceId?: SortOrder
    jobId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BookmarkCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    label?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    createdAt?: SortOrder
  }

  export type BookmarkMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    label?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    createdAt?: SortOrder
  }

  export type BookmarkMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    label?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    createdAt?: SortOrder
  }

  export type IntegrationCacheCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    provider?: SortOrder
    payload?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntegrationCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    provider?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntegrationCacheMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    provider?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkspaceCreateNestedManyWithoutOwnerInput = {
    create?: XOR<WorkspaceCreateWithoutOwnerInput, WorkspaceUncheckedCreateWithoutOwnerInput> | WorkspaceCreateWithoutOwnerInput[] | WorkspaceUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: WorkspaceCreateOrConnectWithoutOwnerInput | WorkspaceCreateOrConnectWithoutOwnerInput[]
    createMany?: WorkspaceCreateManyOwnerInputEnvelope
    connect?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
  }

  export type BookmarkCreateNestedManyWithoutUserInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type WorkspaceUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<WorkspaceCreateWithoutOwnerInput, WorkspaceUncheckedCreateWithoutOwnerInput> | WorkspaceCreateWithoutOwnerInput[] | WorkspaceUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: WorkspaceCreateOrConnectWithoutOwnerInput | WorkspaceCreateOrConnectWithoutOwnerInput[]
    createMany?: WorkspaceCreateManyOwnerInputEnvelope
    connect?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
  }

  export type BookmarkUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WorkspaceUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<WorkspaceCreateWithoutOwnerInput, WorkspaceUncheckedCreateWithoutOwnerInput> | WorkspaceCreateWithoutOwnerInput[] | WorkspaceUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: WorkspaceCreateOrConnectWithoutOwnerInput | WorkspaceCreateOrConnectWithoutOwnerInput[]
    upsert?: WorkspaceUpsertWithWhereUniqueWithoutOwnerInput | WorkspaceUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: WorkspaceCreateManyOwnerInputEnvelope
    set?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    disconnect?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    delete?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    connect?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    update?: WorkspaceUpdateWithWhereUniqueWithoutOwnerInput | WorkspaceUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: WorkspaceUpdateManyWithWhereWithoutOwnerInput | WorkspaceUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: WorkspaceScalarWhereInput | WorkspaceScalarWhereInput[]
  }

  export type BookmarkUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutUserInput | BookmarkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutUserInput | BookmarkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutUserInput | BookmarkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type WorkspaceUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<WorkspaceCreateWithoutOwnerInput, WorkspaceUncheckedCreateWithoutOwnerInput> | WorkspaceCreateWithoutOwnerInput[] | WorkspaceUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: WorkspaceCreateOrConnectWithoutOwnerInput | WorkspaceCreateOrConnectWithoutOwnerInput[]
    upsert?: WorkspaceUpsertWithWhereUniqueWithoutOwnerInput | WorkspaceUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: WorkspaceCreateManyOwnerInputEnvelope
    set?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    disconnect?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    delete?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    connect?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    update?: WorkspaceUpdateWithWhereUniqueWithoutOwnerInput | WorkspaceUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: WorkspaceUpdateManyWithWhereWithoutOwnerInput | WorkspaceUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: WorkspaceScalarWhereInput | WorkspaceScalarWhereInput[]
  }

  export type BookmarkUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutUserInput | BookmarkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutUserInput | BookmarkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutUserInput | BookmarkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutWorkspacesInput = {
    create?: XOR<UserCreateWithoutWorkspacesInput, UserUncheckedCreateWithoutWorkspacesInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkspacesInput
    connect?: UserWhereUniqueInput
  }

  export type ProteinSequenceCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<ProteinSequenceCreateWithoutWorkspaceInput, ProteinSequenceUncheckedCreateWithoutWorkspaceInput> | ProteinSequenceCreateWithoutWorkspaceInput[] | ProteinSequenceUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ProteinSequenceCreateOrConnectWithoutWorkspaceInput | ProteinSequenceCreateOrConnectWithoutWorkspaceInput[]
    createMany?: ProteinSequenceCreateManyWorkspaceInputEnvelope
    connect?: ProteinSequenceWhereUniqueInput | ProteinSequenceWhereUniqueInput[]
  }

  export type PredictionJobCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<PredictionJobCreateWithoutWorkspaceInput, PredictionJobUncheckedCreateWithoutWorkspaceInput> | PredictionJobCreateWithoutWorkspaceInput[] | PredictionJobUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: PredictionJobCreateOrConnectWithoutWorkspaceInput | PredictionJobCreateOrConnectWithoutWorkspaceInput[]
    createMany?: PredictionJobCreateManyWorkspaceInputEnvelope
    connect?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
  }

  export type BookmarkCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<BookmarkCreateWithoutWorkspaceInput, BookmarkUncheckedCreateWithoutWorkspaceInput> | BookmarkCreateWithoutWorkspaceInput[] | BookmarkUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutWorkspaceInput | BookmarkCreateOrConnectWithoutWorkspaceInput[]
    createMany?: BookmarkCreateManyWorkspaceInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type ProteinSequenceUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<ProteinSequenceCreateWithoutWorkspaceInput, ProteinSequenceUncheckedCreateWithoutWorkspaceInput> | ProteinSequenceCreateWithoutWorkspaceInput[] | ProteinSequenceUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ProteinSequenceCreateOrConnectWithoutWorkspaceInput | ProteinSequenceCreateOrConnectWithoutWorkspaceInput[]
    createMany?: ProteinSequenceCreateManyWorkspaceInputEnvelope
    connect?: ProteinSequenceWhereUniqueInput | ProteinSequenceWhereUniqueInput[]
  }

  export type PredictionJobUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<PredictionJobCreateWithoutWorkspaceInput, PredictionJobUncheckedCreateWithoutWorkspaceInput> | PredictionJobCreateWithoutWorkspaceInput[] | PredictionJobUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: PredictionJobCreateOrConnectWithoutWorkspaceInput | PredictionJobCreateOrConnectWithoutWorkspaceInput[]
    createMany?: PredictionJobCreateManyWorkspaceInputEnvelope
    connect?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
  }

  export type BookmarkUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<BookmarkCreateWithoutWorkspaceInput, BookmarkUncheckedCreateWithoutWorkspaceInput> | BookmarkCreateWithoutWorkspaceInput[] | BookmarkUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutWorkspaceInput | BookmarkCreateOrConnectWithoutWorkspaceInput[]
    createMany?: BookmarkCreateManyWorkspaceInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutWorkspacesNestedInput = {
    create?: XOR<UserCreateWithoutWorkspacesInput, UserUncheckedCreateWithoutWorkspacesInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkspacesInput
    upsert?: UserUpsertWithoutWorkspacesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkspacesInput, UserUpdateWithoutWorkspacesInput>, UserUncheckedUpdateWithoutWorkspacesInput>
  }

  export type ProteinSequenceUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<ProteinSequenceCreateWithoutWorkspaceInput, ProteinSequenceUncheckedCreateWithoutWorkspaceInput> | ProteinSequenceCreateWithoutWorkspaceInput[] | ProteinSequenceUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ProteinSequenceCreateOrConnectWithoutWorkspaceInput | ProteinSequenceCreateOrConnectWithoutWorkspaceInput[]
    upsert?: ProteinSequenceUpsertWithWhereUniqueWithoutWorkspaceInput | ProteinSequenceUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: ProteinSequenceCreateManyWorkspaceInputEnvelope
    set?: ProteinSequenceWhereUniqueInput | ProteinSequenceWhereUniqueInput[]
    disconnect?: ProteinSequenceWhereUniqueInput | ProteinSequenceWhereUniqueInput[]
    delete?: ProteinSequenceWhereUniqueInput | ProteinSequenceWhereUniqueInput[]
    connect?: ProteinSequenceWhereUniqueInput | ProteinSequenceWhereUniqueInput[]
    update?: ProteinSequenceUpdateWithWhereUniqueWithoutWorkspaceInput | ProteinSequenceUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: ProteinSequenceUpdateManyWithWhereWithoutWorkspaceInput | ProteinSequenceUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: ProteinSequenceScalarWhereInput | ProteinSequenceScalarWhereInput[]
  }

  export type PredictionJobUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<PredictionJobCreateWithoutWorkspaceInput, PredictionJobUncheckedCreateWithoutWorkspaceInput> | PredictionJobCreateWithoutWorkspaceInput[] | PredictionJobUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: PredictionJobCreateOrConnectWithoutWorkspaceInput | PredictionJobCreateOrConnectWithoutWorkspaceInput[]
    upsert?: PredictionJobUpsertWithWhereUniqueWithoutWorkspaceInput | PredictionJobUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: PredictionJobCreateManyWorkspaceInputEnvelope
    set?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    disconnect?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    delete?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    connect?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    update?: PredictionJobUpdateWithWhereUniqueWithoutWorkspaceInput | PredictionJobUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: PredictionJobUpdateManyWithWhereWithoutWorkspaceInput | PredictionJobUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: PredictionJobScalarWhereInput | PredictionJobScalarWhereInput[]
  }

  export type BookmarkUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<BookmarkCreateWithoutWorkspaceInput, BookmarkUncheckedCreateWithoutWorkspaceInput> | BookmarkCreateWithoutWorkspaceInput[] | BookmarkUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutWorkspaceInput | BookmarkCreateOrConnectWithoutWorkspaceInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutWorkspaceInput | BookmarkUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: BookmarkCreateManyWorkspaceInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutWorkspaceInput | BookmarkUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutWorkspaceInput | BookmarkUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type ProteinSequenceUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<ProteinSequenceCreateWithoutWorkspaceInput, ProteinSequenceUncheckedCreateWithoutWorkspaceInput> | ProteinSequenceCreateWithoutWorkspaceInput[] | ProteinSequenceUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ProteinSequenceCreateOrConnectWithoutWorkspaceInput | ProteinSequenceCreateOrConnectWithoutWorkspaceInput[]
    upsert?: ProteinSequenceUpsertWithWhereUniqueWithoutWorkspaceInput | ProteinSequenceUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: ProteinSequenceCreateManyWorkspaceInputEnvelope
    set?: ProteinSequenceWhereUniqueInput | ProteinSequenceWhereUniqueInput[]
    disconnect?: ProteinSequenceWhereUniqueInput | ProteinSequenceWhereUniqueInput[]
    delete?: ProteinSequenceWhereUniqueInput | ProteinSequenceWhereUniqueInput[]
    connect?: ProteinSequenceWhereUniqueInput | ProteinSequenceWhereUniqueInput[]
    update?: ProteinSequenceUpdateWithWhereUniqueWithoutWorkspaceInput | ProteinSequenceUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: ProteinSequenceUpdateManyWithWhereWithoutWorkspaceInput | ProteinSequenceUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: ProteinSequenceScalarWhereInput | ProteinSequenceScalarWhereInput[]
  }

  export type PredictionJobUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<PredictionJobCreateWithoutWorkspaceInput, PredictionJobUncheckedCreateWithoutWorkspaceInput> | PredictionJobCreateWithoutWorkspaceInput[] | PredictionJobUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: PredictionJobCreateOrConnectWithoutWorkspaceInput | PredictionJobCreateOrConnectWithoutWorkspaceInput[]
    upsert?: PredictionJobUpsertWithWhereUniqueWithoutWorkspaceInput | PredictionJobUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: PredictionJobCreateManyWorkspaceInputEnvelope
    set?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    disconnect?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    delete?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    connect?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    update?: PredictionJobUpdateWithWhereUniqueWithoutWorkspaceInput | PredictionJobUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: PredictionJobUpdateManyWithWhereWithoutWorkspaceInput | PredictionJobUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: PredictionJobScalarWhereInput | PredictionJobScalarWhereInput[]
  }

  export type BookmarkUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<BookmarkCreateWithoutWorkspaceInput, BookmarkUncheckedCreateWithoutWorkspaceInput> | BookmarkCreateWithoutWorkspaceInput[] | BookmarkUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutWorkspaceInput | BookmarkCreateOrConnectWithoutWorkspaceInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutWorkspaceInput | BookmarkUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: BookmarkCreateManyWorkspaceInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutWorkspaceInput | BookmarkUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutWorkspaceInput | BookmarkUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type WorkspaceCreateNestedOneWithoutSequencesInput = {
    create?: XOR<WorkspaceCreateWithoutSequencesInput, WorkspaceUncheckedCreateWithoutSequencesInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutSequencesInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type PredictionJobCreateNestedManyWithoutSequenceInput = {
    create?: XOR<PredictionJobCreateWithoutSequenceInput, PredictionJobUncheckedCreateWithoutSequenceInput> | PredictionJobCreateWithoutSequenceInput[] | PredictionJobUncheckedCreateWithoutSequenceInput[]
    connectOrCreate?: PredictionJobCreateOrConnectWithoutSequenceInput | PredictionJobCreateOrConnectWithoutSequenceInput[]
    createMany?: PredictionJobCreateManySequenceInputEnvelope
    connect?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
  }

  export type AnalysisResultCreateNestedManyWithoutSequenceInput = {
    create?: XOR<AnalysisResultCreateWithoutSequenceInput, AnalysisResultUncheckedCreateWithoutSequenceInput> | AnalysisResultCreateWithoutSequenceInput[] | AnalysisResultUncheckedCreateWithoutSequenceInput[]
    connectOrCreate?: AnalysisResultCreateOrConnectWithoutSequenceInput | AnalysisResultCreateOrConnectWithoutSequenceInput[]
    createMany?: AnalysisResultCreateManySequenceInputEnvelope
    connect?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
  }

  export type PredictionJobUncheckedCreateNestedManyWithoutSequenceInput = {
    create?: XOR<PredictionJobCreateWithoutSequenceInput, PredictionJobUncheckedCreateWithoutSequenceInput> | PredictionJobCreateWithoutSequenceInput[] | PredictionJobUncheckedCreateWithoutSequenceInput[]
    connectOrCreate?: PredictionJobCreateOrConnectWithoutSequenceInput | PredictionJobCreateOrConnectWithoutSequenceInput[]
    createMany?: PredictionJobCreateManySequenceInputEnvelope
    connect?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
  }

  export type AnalysisResultUncheckedCreateNestedManyWithoutSequenceInput = {
    create?: XOR<AnalysisResultCreateWithoutSequenceInput, AnalysisResultUncheckedCreateWithoutSequenceInput> | AnalysisResultCreateWithoutSequenceInput[] | AnalysisResultUncheckedCreateWithoutSequenceInput[]
    connectOrCreate?: AnalysisResultCreateOrConnectWithoutSequenceInput | AnalysisResultCreateOrConnectWithoutSequenceInput[]
    createMany?: AnalysisResultCreateManySequenceInputEnvelope
    connect?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WorkspaceUpdateOneRequiredWithoutSequencesNestedInput = {
    create?: XOR<WorkspaceCreateWithoutSequencesInput, WorkspaceUncheckedCreateWithoutSequencesInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutSequencesInput
    upsert?: WorkspaceUpsertWithoutSequencesInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutSequencesInput, WorkspaceUpdateWithoutSequencesInput>, WorkspaceUncheckedUpdateWithoutSequencesInput>
  }

  export type PredictionJobUpdateManyWithoutSequenceNestedInput = {
    create?: XOR<PredictionJobCreateWithoutSequenceInput, PredictionJobUncheckedCreateWithoutSequenceInput> | PredictionJobCreateWithoutSequenceInput[] | PredictionJobUncheckedCreateWithoutSequenceInput[]
    connectOrCreate?: PredictionJobCreateOrConnectWithoutSequenceInput | PredictionJobCreateOrConnectWithoutSequenceInput[]
    upsert?: PredictionJobUpsertWithWhereUniqueWithoutSequenceInput | PredictionJobUpsertWithWhereUniqueWithoutSequenceInput[]
    createMany?: PredictionJobCreateManySequenceInputEnvelope
    set?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    disconnect?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    delete?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    connect?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    update?: PredictionJobUpdateWithWhereUniqueWithoutSequenceInput | PredictionJobUpdateWithWhereUniqueWithoutSequenceInput[]
    updateMany?: PredictionJobUpdateManyWithWhereWithoutSequenceInput | PredictionJobUpdateManyWithWhereWithoutSequenceInput[]
    deleteMany?: PredictionJobScalarWhereInput | PredictionJobScalarWhereInput[]
  }

  export type AnalysisResultUpdateManyWithoutSequenceNestedInput = {
    create?: XOR<AnalysisResultCreateWithoutSequenceInput, AnalysisResultUncheckedCreateWithoutSequenceInput> | AnalysisResultCreateWithoutSequenceInput[] | AnalysisResultUncheckedCreateWithoutSequenceInput[]
    connectOrCreate?: AnalysisResultCreateOrConnectWithoutSequenceInput | AnalysisResultCreateOrConnectWithoutSequenceInput[]
    upsert?: AnalysisResultUpsertWithWhereUniqueWithoutSequenceInput | AnalysisResultUpsertWithWhereUniqueWithoutSequenceInput[]
    createMany?: AnalysisResultCreateManySequenceInputEnvelope
    set?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    disconnect?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    delete?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    connect?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    update?: AnalysisResultUpdateWithWhereUniqueWithoutSequenceInput | AnalysisResultUpdateWithWhereUniqueWithoutSequenceInput[]
    updateMany?: AnalysisResultUpdateManyWithWhereWithoutSequenceInput | AnalysisResultUpdateManyWithWhereWithoutSequenceInput[]
    deleteMany?: AnalysisResultScalarWhereInput | AnalysisResultScalarWhereInput[]
  }

  export type PredictionJobUncheckedUpdateManyWithoutSequenceNestedInput = {
    create?: XOR<PredictionJobCreateWithoutSequenceInput, PredictionJobUncheckedCreateWithoutSequenceInput> | PredictionJobCreateWithoutSequenceInput[] | PredictionJobUncheckedCreateWithoutSequenceInput[]
    connectOrCreate?: PredictionJobCreateOrConnectWithoutSequenceInput | PredictionJobCreateOrConnectWithoutSequenceInput[]
    upsert?: PredictionJobUpsertWithWhereUniqueWithoutSequenceInput | PredictionJobUpsertWithWhereUniqueWithoutSequenceInput[]
    createMany?: PredictionJobCreateManySequenceInputEnvelope
    set?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    disconnect?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    delete?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    connect?: PredictionJobWhereUniqueInput | PredictionJobWhereUniqueInput[]
    update?: PredictionJobUpdateWithWhereUniqueWithoutSequenceInput | PredictionJobUpdateWithWhereUniqueWithoutSequenceInput[]
    updateMany?: PredictionJobUpdateManyWithWhereWithoutSequenceInput | PredictionJobUpdateManyWithWhereWithoutSequenceInput[]
    deleteMany?: PredictionJobScalarWhereInput | PredictionJobScalarWhereInput[]
  }

  export type AnalysisResultUncheckedUpdateManyWithoutSequenceNestedInput = {
    create?: XOR<AnalysisResultCreateWithoutSequenceInput, AnalysisResultUncheckedCreateWithoutSequenceInput> | AnalysisResultCreateWithoutSequenceInput[] | AnalysisResultUncheckedCreateWithoutSequenceInput[]
    connectOrCreate?: AnalysisResultCreateOrConnectWithoutSequenceInput | AnalysisResultCreateOrConnectWithoutSequenceInput[]
    upsert?: AnalysisResultUpsertWithWhereUniqueWithoutSequenceInput | AnalysisResultUpsertWithWhereUniqueWithoutSequenceInput[]
    createMany?: AnalysisResultCreateManySequenceInputEnvelope
    set?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    disconnect?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    delete?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    connect?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    update?: AnalysisResultUpdateWithWhereUniqueWithoutSequenceInput | AnalysisResultUpdateWithWhereUniqueWithoutSequenceInput[]
    updateMany?: AnalysisResultUpdateManyWithWhereWithoutSequenceInput | AnalysisResultUpdateManyWithWhereWithoutSequenceInput[]
    deleteMany?: AnalysisResultScalarWhereInput | AnalysisResultScalarWhereInput[]
  }

  export type WorkspaceCreateNestedOneWithoutJobsInput = {
    create?: XOR<WorkspaceCreateWithoutJobsInput, WorkspaceUncheckedCreateWithoutJobsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutJobsInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type ProteinSequenceCreateNestedOneWithoutJobsInput = {
    create?: XOR<ProteinSequenceCreateWithoutJobsInput, ProteinSequenceUncheckedCreateWithoutJobsInput>
    connectOrCreate?: ProteinSequenceCreateOrConnectWithoutJobsInput
    connect?: ProteinSequenceWhereUniqueInput
  }

  export type TemplateHitCreateNestedManyWithoutJobInput = {
    create?: XOR<TemplateHitCreateWithoutJobInput, TemplateHitUncheckedCreateWithoutJobInput> | TemplateHitCreateWithoutJobInput[] | TemplateHitUncheckedCreateWithoutJobInput[]
    connectOrCreate?: TemplateHitCreateOrConnectWithoutJobInput | TemplateHitCreateOrConnectWithoutJobInput[]
    createMany?: TemplateHitCreateManyJobInputEnvelope
    connect?: TemplateHitWhereUniqueInput | TemplateHitWhereUniqueInput[]
  }

  export type StructureModelCreateNestedManyWithoutJobInput = {
    create?: XOR<StructureModelCreateWithoutJobInput, StructureModelUncheckedCreateWithoutJobInput> | StructureModelCreateWithoutJobInput[] | StructureModelUncheckedCreateWithoutJobInput[]
    connectOrCreate?: StructureModelCreateOrConnectWithoutJobInput | StructureModelCreateOrConnectWithoutJobInput[]
    createMany?: StructureModelCreateManyJobInputEnvelope
    connect?: StructureModelWhereUniqueInput | StructureModelWhereUniqueInput[]
  }

  export type AnalysisResultCreateNestedManyWithoutJobInput = {
    create?: XOR<AnalysisResultCreateWithoutJobInput, AnalysisResultUncheckedCreateWithoutJobInput> | AnalysisResultCreateWithoutJobInput[] | AnalysisResultUncheckedCreateWithoutJobInput[]
    connectOrCreate?: AnalysisResultCreateOrConnectWithoutJobInput | AnalysisResultCreateOrConnectWithoutJobInput[]
    createMany?: AnalysisResultCreateManyJobInputEnvelope
    connect?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
  }

  export type TemplateHitUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<TemplateHitCreateWithoutJobInput, TemplateHitUncheckedCreateWithoutJobInput> | TemplateHitCreateWithoutJobInput[] | TemplateHitUncheckedCreateWithoutJobInput[]
    connectOrCreate?: TemplateHitCreateOrConnectWithoutJobInput | TemplateHitCreateOrConnectWithoutJobInput[]
    createMany?: TemplateHitCreateManyJobInputEnvelope
    connect?: TemplateHitWhereUniqueInput | TemplateHitWhereUniqueInput[]
  }

  export type StructureModelUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<StructureModelCreateWithoutJobInput, StructureModelUncheckedCreateWithoutJobInput> | StructureModelCreateWithoutJobInput[] | StructureModelUncheckedCreateWithoutJobInput[]
    connectOrCreate?: StructureModelCreateOrConnectWithoutJobInput | StructureModelCreateOrConnectWithoutJobInput[]
    createMany?: StructureModelCreateManyJobInputEnvelope
    connect?: StructureModelWhereUniqueInput | StructureModelWhereUniqueInput[]
  }

  export type AnalysisResultUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<AnalysisResultCreateWithoutJobInput, AnalysisResultUncheckedCreateWithoutJobInput> | AnalysisResultCreateWithoutJobInput[] | AnalysisResultUncheckedCreateWithoutJobInput[]
    connectOrCreate?: AnalysisResultCreateOrConnectWithoutJobInput | AnalysisResultCreateOrConnectWithoutJobInput[]
    createMany?: AnalysisResultCreateManyJobInputEnvelope
    connect?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
  }

  export type EnumPredictionMethodFieldUpdateOperationsInput = {
    set?: $Enums.PredictionMethod
  }

  export type EnumJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.JobStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type WorkspaceUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<WorkspaceCreateWithoutJobsInput, WorkspaceUncheckedCreateWithoutJobsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutJobsInput
    upsert?: WorkspaceUpsertWithoutJobsInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutJobsInput, WorkspaceUpdateWithoutJobsInput>, WorkspaceUncheckedUpdateWithoutJobsInput>
  }

  export type ProteinSequenceUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<ProteinSequenceCreateWithoutJobsInput, ProteinSequenceUncheckedCreateWithoutJobsInput>
    connectOrCreate?: ProteinSequenceCreateOrConnectWithoutJobsInput
    upsert?: ProteinSequenceUpsertWithoutJobsInput
    connect?: ProteinSequenceWhereUniqueInput
    update?: XOR<XOR<ProteinSequenceUpdateToOneWithWhereWithoutJobsInput, ProteinSequenceUpdateWithoutJobsInput>, ProteinSequenceUncheckedUpdateWithoutJobsInput>
  }

  export type TemplateHitUpdateManyWithoutJobNestedInput = {
    create?: XOR<TemplateHitCreateWithoutJobInput, TemplateHitUncheckedCreateWithoutJobInput> | TemplateHitCreateWithoutJobInput[] | TemplateHitUncheckedCreateWithoutJobInput[]
    connectOrCreate?: TemplateHitCreateOrConnectWithoutJobInput | TemplateHitCreateOrConnectWithoutJobInput[]
    upsert?: TemplateHitUpsertWithWhereUniqueWithoutJobInput | TemplateHitUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: TemplateHitCreateManyJobInputEnvelope
    set?: TemplateHitWhereUniqueInput | TemplateHitWhereUniqueInput[]
    disconnect?: TemplateHitWhereUniqueInput | TemplateHitWhereUniqueInput[]
    delete?: TemplateHitWhereUniqueInput | TemplateHitWhereUniqueInput[]
    connect?: TemplateHitWhereUniqueInput | TemplateHitWhereUniqueInput[]
    update?: TemplateHitUpdateWithWhereUniqueWithoutJobInput | TemplateHitUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: TemplateHitUpdateManyWithWhereWithoutJobInput | TemplateHitUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: TemplateHitScalarWhereInput | TemplateHitScalarWhereInput[]
  }

  export type StructureModelUpdateManyWithoutJobNestedInput = {
    create?: XOR<StructureModelCreateWithoutJobInput, StructureModelUncheckedCreateWithoutJobInput> | StructureModelCreateWithoutJobInput[] | StructureModelUncheckedCreateWithoutJobInput[]
    connectOrCreate?: StructureModelCreateOrConnectWithoutJobInput | StructureModelCreateOrConnectWithoutJobInput[]
    upsert?: StructureModelUpsertWithWhereUniqueWithoutJobInput | StructureModelUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: StructureModelCreateManyJobInputEnvelope
    set?: StructureModelWhereUniqueInput | StructureModelWhereUniqueInput[]
    disconnect?: StructureModelWhereUniqueInput | StructureModelWhereUniqueInput[]
    delete?: StructureModelWhereUniqueInput | StructureModelWhereUniqueInput[]
    connect?: StructureModelWhereUniqueInput | StructureModelWhereUniqueInput[]
    update?: StructureModelUpdateWithWhereUniqueWithoutJobInput | StructureModelUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: StructureModelUpdateManyWithWhereWithoutJobInput | StructureModelUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: StructureModelScalarWhereInput | StructureModelScalarWhereInput[]
  }

  export type AnalysisResultUpdateManyWithoutJobNestedInput = {
    create?: XOR<AnalysisResultCreateWithoutJobInput, AnalysisResultUncheckedCreateWithoutJobInput> | AnalysisResultCreateWithoutJobInput[] | AnalysisResultUncheckedCreateWithoutJobInput[]
    connectOrCreate?: AnalysisResultCreateOrConnectWithoutJobInput | AnalysisResultCreateOrConnectWithoutJobInput[]
    upsert?: AnalysisResultUpsertWithWhereUniqueWithoutJobInput | AnalysisResultUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: AnalysisResultCreateManyJobInputEnvelope
    set?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    disconnect?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    delete?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    connect?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    update?: AnalysisResultUpdateWithWhereUniqueWithoutJobInput | AnalysisResultUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: AnalysisResultUpdateManyWithWhereWithoutJobInput | AnalysisResultUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: AnalysisResultScalarWhereInput | AnalysisResultScalarWhereInput[]
  }

  export type TemplateHitUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<TemplateHitCreateWithoutJobInput, TemplateHitUncheckedCreateWithoutJobInput> | TemplateHitCreateWithoutJobInput[] | TemplateHitUncheckedCreateWithoutJobInput[]
    connectOrCreate?: TemplateHitCreateOrConnectWithoutJobInput | TemplateHitCreateOrConnectWithoutJobInput[]
    upsert?: TemplateHitUpsertWithWhereUniqueWithoutJobInput | TemplateHitUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: TemplateHitCreateManyJobInputEnvelope
    set?: TemplateHitWhereUniqueInput | TemplateHitWhereUniqueInput[]
    disconnect?: TemplateHitWhereUniqueInput | TemplateHitWhereUniqueInput[]
    delete?: TemplateHitWhereUniqueInput | TemplateHitWhereUniqueInput[]
    connect?: TemplateHitWhereUniqueInput | TemplateHitWhereUniqueInput[]
    update?: TemplateHitUpdateWithWhereUniqueWithoutJobInput | TemplateHitUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: TemplateHitUpdateManyWithWhereWithoutJobInput | TemplateHitUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: TemplateHitScalarWhereInput | TemplateHitScalarWhereInput[]
  }

  export type StructureModelUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<StructureModelCreateWithoutJobInput, StructureModelUncheckedCreateWithoutJobInput> | StructureModelCreateWithoutJobInput[] | StructureModelUncheckedCreateWithoutJobInput[]
    connectOrCreate?: StructureModelCreateOrConnectWithoutJobInput | StructureModelCreateOrConnectWithoutJobInput[]
    upsert?: StructureModelUpsertWithWhereUniqueWithoutJobInput | StructureModelUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: StructureModelCreateManyJobInputEnvelope
    set?: StructureModelWhereUniqueInput | StructureModelWhereUniqueInput[]
    disconnect?: StructureModelWhereUniqueInput | StructureModelWhereUniqueInput[]
    delete?: StructureModelWhereUniqueInput | StructureModelWhereUniqueInput[]
    connect?: StructureModelWhereUniqueInput | StructureModelWhereUniqueInput[]
    update?: StructureModelUpdateWithWhereUniqueWithoutJobInput | StructureModelUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: StructureModelUpdateManyWithWhereWithoutJobInput | StructureModelUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: StructureModelScalarWhereInput | StructureModelScalarWhereInput[]
  }

  export type AnalysisResultUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<AnalysisResultCreateWithoutJobInput, AnalysisResultUncheckedCreateWithoutJobInput> | AnalysisResultCreateWithoutJobInput[] | AnalysisResultUncheckedCreateWithoutJobInput[]
    connectOrCreate?: AnalysisResultCreateOrConnectWithoutJobInput | AnalysisResultCreateOrConnectWithoutJobInput[]
    upsert?: AnalysisResultUpsertWithWhereUniqueWithoutJobInput | AnalysisResultUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: AnalysisResultCreateManyJobInputEnvelope
    set?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    disconnect?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    delete?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    connect?: AnalysisResultWhereUniqueInput | AnalysisResultWhereUniqueInput[]
    update?: AnalysisResultUpdateWithWhereUniqueWithoutJobInput | AnalysisResultUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: AnalysisResultUpdateManyWithWhereWithoutJobInput | AnalysisResultUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: AnalysisResultScalarWhereInput | AnalysisResultScalarWhereInput[]
  }

  export type PredictionJobCreateNestedOneWithoutTemplateHitsInput = {
    create?: XOR<PredictionJobCreateWithoutTemplateHitsInput, PredictionJobUncheckedCreateWithoutTemplateHitsInput>
    connectOrCreate?: PredictionJobCreateOrConnectWithoutTemplateHitsInput
    connect?: PredictionJobWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PredictionJobUpdateOneRequiredWithoutTemplateHitsNestedInput = {
    create?: XOR<PredictionJobCreateWithoutTemplateHitsInput, PredictionJobUncheckedCreateWithoutTemplateHitsInput>
    connectOrCreate?: PredictionJobCreateOrConnectWithoutTemplateHitsInput
    upsert?: PredictionJobUpsertWithoutTemplateHitsInput
    connect?: PredictionJobWhereUniqueInput
    update?: XOR<XOR<PredictionJobUpdateToOneWithWhereWithoutTemplateHitsInput, PredictionJobUpdateWithoutTemplateHitsInput>, PredictionJobUncheckedUpdateWithoutTemplateHitsInput>
  }

  export type PredictionJobCreateNestedOneWithoutStructuresInput = {
    create?: XOR<PredictionJobCreateWithoutStructuresInput, PredictionJobUncheckedCreateWithoutStructuresInput>
    connectOrCreate?: PredictionJobCreateOrConnectWithoutStructuresInput
    connect?: PredictionJobWhereUniqueInput
  }

  export type PredictionJobUpdateOneRequiredWithoutStructuresNestedInput = {
    create?: XOR<PredictionJobCreateWithoutStructuresInput, PredictionJobUncheckedCreateWithoutStructuresInput>
    connectOrCreate?: PredictionJobCreateOrConnectWithoutStructuresInput
    upsert?: PredictionJobUpsertWithoutStructuresInput
    connect?: PredictionJobWhereUniqueInput
    update?: XOR<XOR<PredictionJobUpdateToOneWithWhereWithoutStructuresInput, PredictionJobUpdateWithoutStructuresInput>, PredictionJobUncheckedUpdateWithoutStructuresInput>
  }

  export type ProteinSequenceCreateNestedOneWithoutAnalysisResultsInput = {
    create?: XOR<ProteinSequenceCreateWithoutAnalysisResultsInput, ProteinSequenceUncheckedCreateWithoutAnalysisResultsInput>
    connectOrCreate?: ProteinSequenceCreateOrConnectWithoutAnalysisResultsInput
    connect?: ProteinSequenceWhereUniqueInput
  }

  export type PredictionJobCreateNestedOneWithoutAnalysisResultsInput = {
    create?: XOR<PredictionJobCreateWithoutAnalysisResultsInput, PredictionJobUncheckedCreateWithoutAnalysisResultsInput>
    connectOrCreate?: PredictionJobCreateOrConnectWithoutAnalysisResultsInput
    connect?: PredictionJobWhereUniqueInput
  }

  export type ProteinSequenceUpdateOneWithoutAnalysisResultsNestedInput = {
    create?: XOR<ProteinSequenceCreateWithoutAnalysisResultsInput, ProteinSequenceUncheckedCreateWithoutAnalysisResultsInput>
    connectOrCreate?: ProteinSequenceCreateOrConnectWithoutAnalysisResultsInput
    upsert?: ProteinSequenceUpsertWithoutAnalysisResultsInput
    disconnect?: ProteinSequenceWhereInput | boolean
    delete?: ProteinSequenceWhereInput | boolean
    connect?: ProteinSequenceWhereUniqueInput
    update?: XOR<XOR<ProteinSequenceUpdateToOneWithWhereWithoutAnalysisResultsInput, ProteinSequenceUpdateWithoutAnalysisResultsInput>, ProteinSequenceUncheckedUpdateWithoutAnalysisResultsInput>
  }

  export type PredictionJobUpdateOneWithoutAnalysisResultsNestedInput = {
    create?: XOR<PredictionJobCreateWithoutAnalysisResultsInput, PredictionJobUncheckedCreateWithoutAnalysisResultsInput>
    connectOrCreate?: PredictionJobCreateOrConnectWithoutAnalysisResultsInput
    upsert?: PredictionJobUpsertWithoutAnalysisResultsInput
    disconnect?: PredictionJobWhereInput | boolean
    delete?: PredictionJobWhereInput | boolean
    connect?: PredictionJobWhereUniqueInput
    update?: XOR<XOR<PredictionJobUpdateToOneWithWhereWithoutAnalysisResultsInput, PredictionJobUpdateWithoutAnalysisResultsInput>, PredictionJobUncheckedUpdateWithoutAnalysisResultsInput>
  }

  export type UserCreateNestedOneWithoutBookmarksInput = {
    create?: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookmarksInput
    connect?: UserWhereUniqueInput
  }

  export type WorkspaceCreateNestedOneWithoutBookmarksInput = {
    create?: XOR<WorkspaceCreateWithoutBookmarksInput, WorkspaceUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutBookmarksInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBookmarksNestedInput = {
    create?: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookmarksInput
    upsert?: UserUpsertWithoutBookmarksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookmarksInput, UserUpdateWithoutBookmarksInput>, UserUncheckedUpdateWithoutBookmarksInput>
  }

  export type WorkspaceUpdateOneRequiredWithoutBookmarksNestedInput = {
    create?: XOR<WorkspaceCreateWithoutBookmarksInput, WorkspaceUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutBookmarksInput
    upsert?: WorkspaceUpsertWithoutBookmarksInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutBookmarksInput, WorkspaceUpdateWithoutBookmarksInput>, WorkspaceUncheckedUpdateWithoutBookmarksInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumPredictionMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PredictionMethod | EnumPredictionMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PredictionMethod[] | ListEnumPredictionMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PredictionMethod[] | ListEnumPredictionMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPredictionMethodFilter<$PrismaModel> | $Enums.PredictionMethod
  }

  export type NestedEnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumPredictionMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PredictionMethod | EnumPredictionMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PredictionMethod[] | ListEnumPredictionMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PredictionMethod[] | ListEnumPredictionMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPredictionMethodWithAggregatesFilter<$PrismaModel> | $Enums.PredictionMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPredictionMethodFilter<$PrismaModel>
    _max?: NestedEnumPredictionMethodFilter<$PrismaModel>
  }

  export type NestedEnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type WorkspaceCreateWithoutOwnerInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sequences?: ProteinSequenceCreateNestedManyWithoutWorkspaceInput
    jobs?: PredictionJobCreateNestedManyWithoutWorkspaceInput
    bookmarks?: BookmarkCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sequences?: ProteinSequenceUncheckedCreateNestedManyWithoutWorkspaceInput
    jobs?: PredictionJobUncheckedCreateNestedManyWithoutWorkspaceInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutOwnerInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutOwnerInput, WorkspaceUncheckedCreateWithoutOwnerInput>
  }

  export type WorkspaceCreateManyOwnerInputEnvelope = {
    data: WorkspaceCreateManyOwnerInput | WorkspaceCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type BookmarkCreateWithoutUserInput = {
    id?: string
    label: string
    targetType: string
    targetId: string
    createdAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutBookmarksInput
  }

  export type BookmarkUncheckedCreateWithoutUserInput = {
    id?: string
    workspaceId: string
    label: string
    targetType: string
    targetId: string
    createdAt?: Date | string
  }

  export type BookmarkCreateOrConnectWithoutUserInput = {
    where: BookmarkWhereUniqueInput
    create: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput>
  }

  export type BookmarkCreateManyUserInputEnvelope = {
    data: BookmarkCreateManyUserInput | BookmarkCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceUpsertWithWhereUniqueWithoutOwnerInput = {
    where: WorkspaceWhereUniqueInput
    update: XOR<WorkspaceUpdateWithoutOwnerInput, WorkspaceUncheckedUpdateWithoutOwnerInput>
    create: XOR<WorkspaceCreateWithoutOwnerInput, WorkspaceUncheckedCreateWithoutOwnerInput>
  }

  export type WorkspaceUpdateWithWhereUniqueWithoutOwnerInput = {
    where: WorkspaceWhereUniqueInput
    data: XOR<WorkspaceUpdateWithoutOwnerInput, WorkspaceUncheckedUpdateWithoutOwnerInput>
  }

  export type WorkspaceUpdateManyWithWhereWithoutOwnerInput = {
    where: WorkspaceScalarWhereInput
    data: XOR<WorkspaceUpdateManyMutationInput, WorkspaceUncheckedUpdateManyWithoutOwnerInput>
  }

  export type WorkspaceScalarWhereInput = {
    AND?: WorkspaceScalarWhereInput | WorkspaceScalarWhereInput[]
    OR?: WorkspaceScalarWhereInput[]
    NOT?: WorkspaceScalarWhereInput | WorkspaceScalarWhereInput[]
    id?: StringFilter<"Workspace"> | string
    name?: StringFilter<"Workspace"> | string
    description?: StringNullableFilter<"Workspace"> | string | null
    ownerId?: StringFilter<"Workspace"> | string
    createdAt?: DateTimeFilter<"Workspace"> | Date | string
    updatedAt?: DateTimeFilter<"Workspace"> | Date | string
  }

  export type BookmarkUpsertWithWhereUniqueWithoutUserInput = {
    where: BookmarkWhereUniqueInput
    update: XOR<BookmarkUpdateWithoutUserInput, BookmarkUncheckedUpdateWithoutUserInput>
    create: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput>
  }

  export type BookmarkUpdateWithWhereUniqueWithoutUserInput = {
    where: BookmarkWhereUniqueInput
    data: XOR<BookmarkUpdateWithoutUserInput, BookmarkUncheckedUpdateWithoutUserInput>
  }

  export type BookmarkUpdateManyWithWhereWithoutUserInput = {
    where: BookmarkScalarWhereInput
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyWithoutUserInput>
  }

  export type BookmarkScalarWhereInput = {
    AND?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
    OR?: BookmarkScalarWhereInput[]
    NOT?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
    id?: StringFilter<"Bookmark"> | string
    userId?: StringFilter<"Bookmark"> | string
    workspaceId?: StringFilter<"Bookmark"> | string
    label?: StringFilter<"Bookmark"> | string
    targetType?: StringFilter<"Bookmark"> | string
    targetId?: StringFilter<"Bookmark"> | string
    createdAt?: DateTimeFilter<"Bookmark"> | Date | string
  }

  export type UserCreateWithoutWorkspacesInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookmarks?: BookmarkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWorkspacesInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWorkspacesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkspacesInput, UserUncheckedCreateWithoutWorkspacesInput>
  }

  export type ProteinSequenceCreateWithoutWorkspaceInput = {
    id?: string
    accession?: string | null
    name: string
    organism?: string | null
    sequence: string
    sequenceLength: number
    molecularWeight?: number | null
    isoelectricPoint?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: PredictionJobCreateNestedManyWithoutSequenceInput
    analysisResults?: AnalysisResultCreateNestedManyWithoutSequenceInput
  }

  export type ProteinSequenceUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    accession?: string | null
    name: string
    organism?: string | null
    sequence: string
    sequenceLength: number
    molecularWeight?: number | null
    isoelectricPoint?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: PredictionJobUncheckedCreateNestedManyWithoutSequenceInput
    analysisResults?: AnalysisResultUncheckedCreateNestedManyWithoutSequenceInput
  }

  export type ProteinSequenceCreateOrConnectWithoutWorkspaceInput = {
    where: ProteinSequenceWhereUniqueInput
    create: XOR<ProteinSequenceCreateWithoutWorkspaceInput, ProteinSequenceUncheckedCreateWithoutWorkspaceInput>
  }

  export type ProteinSequenceCreateManyWorkspaceInputEnvelope = {
    data: ProteinSequenceCreateManyWorkspaceInput | ProteinSequenceCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type PredictionJobCreateWithoutWorkspaceInput = {
    id?: string
    method: $Enums.PredictionMethod
    status?: $Enums.JobStatus
    progress?: number
    confidence?: number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    sequence: ProteinSequenceCreateNestedOneWithoutJobsInput
    templateHits?: TemplateHitCreateNestedManyWithoutJobInput
    structures?: StructureModelCreateNestedManyWithoutJobInput
    analysisResults?: AnalysisResultCreateNestedManyWithoutJobInput
  }

  export type PredictionJobUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    sequenceId: string
    method: $Enums.PredictionMethod
    status?: $Enums.JobStatus
    progress?: number
    confidence?: number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    templateHits?: TemplateHitUncheckedCreateNestedManyWithoutJobInput
    structures?: StructureModelUncheckedCreateNestedManyWithoutJobInput
    analysisResults?: AnalysisResultUncheckedCreateNestedManyWithoutJobInput
  }

  export type PredictionJobCreateOrConnectWithoutWorkspaceInput = {
    where: PredictionJobWhereUniqueInput
    create: XOR<PredictionJobCreateWithoutWorkspaceInput, PredictionJobUncheckedCreateWithoutWorkspaceInput>
  }

  export type PredictionJobCreateManyWorkspaceInputEnvelope = {
    data: PredictionJobCreateManyWorkspaceInput | PredictionJobCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type BookmarkCreateWithoutWorkspaceInput = {
    id?: string
    label: string
    targetType: string
    targetId: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBookmarksInput
  }

  export type BookmarkUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    userId: string
    label: string
    targetType: string
    targetId: string
    createdAt?: Date | string
  }

  export type BookmarkCreateOrConnectWithoutWorkspaceInput = {
    where: BookmarkWhereUniqueInput
    create: XOR<BookmarkCreateWithoutWorkspaceInput, BookmarkUncheckedCreateWithoutWorkspaceInput>
  }

  export type BookmarkCreateManyWorkspaceInputEnvelope = {
    data: BookmarkCreateManyWorkspaceInput | BookmarkCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWorkspacesInput = {
    update: XOR<UserUpdateWithoutWorkspacesInput, UserUncheckedUpdateWithoutWorkspacesInput>
    create: XOR<UserCreateWithoutWorkspacesInput, UserUncheckedCreateWithoutWorkspacesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkspacesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkspacesInput, UserUncheckedUpdateWithoutWorkspacesInput>
  }

  export type UserUpdateWithoutWorkspacesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarks?: BookmarkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkspacesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarks?: BookmarkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProteinSequenceUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: ProteinSequenceWhereUniqueInput
    update: XOR<ProteinSequenceUpdateWithoutWorkspaceInput, ProteinSequenceUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<ProteinSequenceCreateWithoutWorkspaceInput, ProteinSequenceUncheckedCreateWithoutWorkspaceInput>
  }

  export type ProteinSequenceUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: ProteinSequenceWhereUniqueInput
    data: XOR<ProteinSequenceUpdateWithoutWorkspaceInput, ProteinSequenceUncheckedUpdateWithoutWorkspaceInput>
  }

  export type ProteinSequenceUpdateManyWithWhereWithoutWorkspaceInput = {
    where: ProteinSequenceScalarWhereInput
    data: XOR<ProteinSequenceUpdateManyMutationInput, ProteinSequenceUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type ProteinSequenceScalarWhereInput = {
    AND?: ProteinSequenceScalarWhereInput | ProteinSequenceScalarWhereInput[]
    OR?: ProteinSequenceScalarWhereInput[]
    NOT?: ProteinSequenceScalarWhereInput | ProteinSequenceScalarWhereInput[]
    id?: StringFilter<"ProteinSequence"> | string
    workspaceId?: StringFilter<"ProteinSequence"> | string
    accession?: StringNullableFilter<"ProteinSequence"> | string | null
    name?: StringFilter<"ProteinSequence"> | string
    organism?: StringNullableFilter<"ProteinSequence"> | string | null
    sequence?: StringFilter<"ProteinSequence"> | string
    sequenceLength?: IntFilter<"ProteinSequence"> | number
    molecularWeight?: FloatNullableFilter<"ProteinSequence"> | number | null
    isoelectricPoint?: FloatNullableFilter<"ProteinSequence"> | number | null
    createdAt?: DateTimeFilter<"ProteinSequence"> | Date | string
    updatedAt?: DateTimeFilter<"ProteinSequence"> | Date | string
  }

  export type PredictionJobUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: PredictionJobWhereUniqueInput
    update: XOR<PredictionJobUpdateWithoutWorkspaceInput, PredictionJobUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<PredictionJobCreateWithoutWorkspaceInput, PredictionJobUncheckedCreateWithoutWorkspaceInput>
  }

  export type PredictionJobUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: PredictionJobWhereUniqueInput
    data: XOR<PredictionJobUpdateWithoutWorkspaceInput, PredictionJobUncheckedUpdateWithoutWorkspaceInput>
  }

  export type PredictionJobUpdateManyWithWhereWithoutWorkspaceInput = {
    where: PredictionJobScalarWhereInput
    data: XOR<PredictionJobUpdateManyMutationInput, PredictionJobUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type PredictionJobScalarWhereInput = {
    AND?: PredictionJobScalarWhereInput | PredictionJobScalarWhereInput[]
    OR?: PredictionJobScalarWhereInput[]
    NOT?: PredictionJobScalarWhereInput | PredictionJobScalarWhereInput[]
    id?: StringFilter<"PredictionJob"> | string
    workspaceId?: StringFilter<"PredictionJob"> | string
    sequenceId?: StringFilter<"PredictionJob"> | string
    method?: EnumPredictionMethodFilter<"PredictionJob"> | $Enums.PredictionMethod
    status?: EnumJobStatusFilter<"PredictionJob"> | $Enums.JobStatus
    progress?: IntFilter<"PredictionJob"> | number
    confidence?: FloatNullableFilter<"PredictionJob"> | number | null
    parameters?: JsonNullableFilter<"PredictionJob">
    errorMessage?: StringNullableFilter<"PredictionJob"> | string | null
    createdAt?: DateTimeFilter<"PredictionJob"> | Date | string
    updatedAt?: DateTimeFilter<"PredictionJob"> | Date | string
    completedAt?: DateTimeNullableFilter<"PredictionJob"> | Date | string | null
  }

  export type BookmarkUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: BookmarkWhereUniqueInput
    update: XOR<BookmarkUpdateWithoutWorkspaceInput, BookmarkUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<BookmarkCreateWithoutWorkspaceInput, BookmarkUncheckedCreateWithoutWorkspaceInput>
  }

  export type BookmarkUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: BookmarkWhereUniqueInput
    data: XOR<BookmarkUpdateWithoutWorkspaceInput, BookmarkUncheckedUpdateWithoutWorkspaceInput>
  }

  export type BookmarkUpdateManyWithWhereWithoutWorkspaceInput = {
    where: BookmarkScalarWhereInput
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type WorkspaceCreateWithoutSequencesInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutWorkspacesInput
    jobs?: PredictionJobCreateNestedManyWithoutWorkspaceInput
    bookmarks?: BookmarkCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutSequencesInput = {
    id?: string
    name: string
    description?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: PredictionJobUncheckedCreateNestedManyWithoutWorkspaceInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutSequencesInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutSequencesInput, WorkspaceUncheckedCreateWithoutSequencesInput>
  }

  export type PredictionJobCreateWithoutSequenceInput = {
    id?: string
    method: $Enums.PredictionMethod
    status?: $Enums.JobStatus
    progress?: number
    confidence?: number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    workspace: WorkspaceCreateNestedOneWithoutJobsInput
    templateHits?: TemplateHitCreateNestedManyWithoutJobInput
    structures?: StructureModelCreateNestedManyWithoutJobInput
    analysisResults?: AnalysisResultCreateNestedManyWithoutJobInput
  }

  export type PredictionJobUncheckedCreateWithoutSequenceInput = {
    id?: string
    workspaceId: string
    method: $Enums.PredictionMethod
    status?: $Enums.JobStatus
    progress?: number
    confidence?: number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    templateHits?: TemplateHitUncheckedCreateNestedManyWithoutJobInput
    structures?: StructureModelUncheckedCreateNestedManyWithoutJobInput
    analysisResults?: AnalysisResultUncheckedCreateNestedManyWithoutJobInput
  }

  export type PredictionJobCreateOrConnectWithoutSequenceInput = {
    where: PredictionJobWhereUniqueInput
    create: XOR<PredictionJobCreateWithoutSequenceInput, PredictionJobUncheckedCreateWithoutSequenceInput>
  }

  export type PredictionJobCreateManySequenceInputEnvelope = {
    data: PredictionJobCreateManySequenceInput | PredictionJobCreateManySequenceInput[]
    skipDuplicates?: boolean
  }

  export type AnalysisResultCreateWithoutSequenceInput = {
    id?: string
    type: string
    title: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    job?: PredictionJobCreateNestedOneWithoutAnalysisResultsInput
  }

  export type AnalysisResultUncheckedCreateWithoutSequenceInput = {
    id?: string
    jobId?: string | null
    type: string
    title: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AnalysisResultCreateOrConnectWithoutSequenceInput = {
    where: AnalysisResultWhereUniqueInput
    create: XOR<AnalysisResultCreateWithoutSequenceInput, AnalysisResultUncheckedCreateWithoutSequenceInput>
  }

  export type AnalysisResultCreateManySequenceInputEnvelope = {
    data: AnalysisResultCreateManySequenceInput | AnalysisResultCreateManySequenceInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceUpsertWithoutSequencesInput = {
    update: XOR<WorkspaceUpdateWithoutSequencesInput, WorkspaceUncheckedUpdateWithoutSequencesInput>
    create: XOR<WorkspaceCreateWithoutSequencesInput, WorkspaceUncheckedCreateWithoutSequencesInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutSequencesInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutSequencesInput, WorkspaceUncheckedUpdateWithoutSequencesInput>
  }

  export type WorkspaceUpdateWithoutSequencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutWorkspacesNestedInput
    jobs?: PredictionJobUpdateManyWithoutWorkspaceNestedInput
    bookmarks?: BookmarkUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutSequencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: PredictionJobUncheckedUpdateManyWithoutWorkspaceNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type PredictionJobUpsertWithWhereUniqueWithoutSequenceInput = {
    where: PredictionJobWhereUniqueInput
    update: XOR<PredictionJobUpdateWithoutSequenceInput, PredictionJobUncheckedUpdateWithoutSequenceInput>
    create: XOR<PredictionJobCreateWithoutSequenceInput, PredictionJobUncheckedCreateWithoutSequenceInput>
  }

  export type PredictionJobUpdateWithWhereUniqueWithoutSequenceInput = {
    where: PredictionJobWhereUniqueInput
    data: XOR<PredictionJobUpdateWithoutSequenceInput, PredictionJobUncheckedUpdateWithoutSequenceInput>
  }

  export type PredictionJobUpdateManyWithWhereWithoutSequenceInput = {
    where: PredictionJobScalarWhereInput
    data: XOR<PredictionJobUpdateManyMutationInput, PredictionJobUncheckedUpdateManyWithoutSequenceInput>
  }

  export type AnalysisResultUpsertWithWhereUniqueWithoutSequenceInput = {
    where: AnalysisResultWhereUniqueInput
    update: XOR<AnalysisResultUpdateWithoutSequenceInput, AnalysisResultUncheckedUpdateWithoutSequenceInput>
    create: XOR<AnalysisResultCreateWithoutSequenceInput, AnalysisResultUncheckedCreateWithoutSequenceInput>
  }

  export type AnalysisResultUpdateWithWhereUniqueWithoutSequenceInput = {
    where: AnalysisResultWhereUniqueInput
    data: XOR<AnalysisResultUpdateWithoutSequenceInput, AnalysisResultUncheckedUpdateWithoutSequenceInput>
  }

  export type AnalysisResultUpdateManyWithWhereWithoutSequenceInput = {
    where: AnalysisResultScalarWhereInput
    data: XOR<AnalysisResultUpdateManyMutationInput, AnalysisResultUncheckedUpdateManyWithoutSequenceInput>
  }

  export type AnalysisResultScalarWhereInput = {
    AND?: AnalysisResultScalarWhereInput | AnalysisResultScalarWhereInput[]
    OR?: AnalysisResultScalarWhereInput[]
    NOT?: AnalysisResultScalarWhereInput | AnalysisResultScalarWhereInput[]
    id?: StringFilter<"AnalysisResult"> | string
    sequenceId?: StringNullableFilter<"AnalysisResult"> | string | null
    jobId?: StringNullableFilter<"AnalysisResult"> | string | null
    type?: StringFilter<"AnalysisResult"> | string
    title?: StringFilter<"AnalysisResult"> | string
    payload?: JsonFilter<"AnalysisResult">
    createdAt?: DateTimeFilter<"AnalysisResult"> | Date | string
  }

  export type WorkspaceCreateWithoutJobsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutWorkspacesInput
    sequences?: ProteinSequenceCreateNestedManyWithoutWorkspaceInput
    bookmarks?: BookmarkCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutJobsInput = {
    id?: string
    name: string
    description?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sequences?: ProteinSequenceUncheckedCreateNestedManyWithoutWorkspaceInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutJobsInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutJobsInput, WorkspaceUncheckedCreateWithoutJobsInput>
  }

  export type ProteinSequenceCreateWithoutJobsInput = {
    id?: string
    accession?: string | null
    name: string
    organism?: string | null
    sequence: string
    sequenceLength: number
    molecularWeight?: number | null
    isoelectricPoint?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutSequencesInput
    analysisResults?: AnalysisResultCreateNestedManyWithoutSequenceInput
  }

  export type ProteinSequenceUncheckedCreateWithoutJobsInput = {
    id?: string
    workspaceId: string
    accession?: string | null
    name: string
    organism?: string | null
    sequence: string
    sequenceLength: number
    molecularWeight?: number | null
    isoelectricPoint?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    analysisResults?: AnalysisResultUncheckedCreateNestedManyWithoutSequenceInput
  }

  export type ProteinSequenceCreateOrConnectWithoutJobsInput = {
    where: ProteinSequenceWhereUniqueInput
    create: XOR<ProteinSequenceCreateWithoutJobsInput, ProteinSequenceUncheckedCreateWithoutJobsInput>
  }

  export type TemplateHitCreateWithoutJobInput = {
    id?: string
    pdbId: string
    chainId?: string | null
    title: string
    organism?: string | null
    resolution?: number | null
    sequenceIdentity: number
    coverage: number
    eValue?: number | null
    foldseekScore?: number | null
    reliabilityBand: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TemplateHitUncheckedCreateWithoutJobInput = {
    id?: string
    pdbId: string
    chainId?: string | null
    title: string
    organism?: string | null
    resolution?: number | null
    sequenceIdentity: number
    coverage: number
    eValue?: number | null
    foldseekScore?: number | null
    reliabilityBand: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TemplateHitCreateOrConnectWithoutJobInput = {
    where: TemplateHitWhereUniqueInput
    create: XOR<TemplateHitCreateWithoutJobInput, TemplateHitUncheckedCreateWithoutJobInput>
  }

  export type TemplateHitCreateManyJobInputEnvelope = {
    data: TemplateHitCreateManyJobInput | TemplateHitCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type StructureModelCreateWithoutJobInput = {
    id?: string
    name: string
    format?: string
    storageUrl?: string | null
    pdbText?: string | null
    chains?: NullableJsonNullValueInput | InputJsonValue
    ligands?: NullableJsonNullValueInput | InputJsonValue
    confidenceMap?: NullableJsonNullValueInput | InputJsonValue
    paeMatrix?: NullableJsonNullValueInput | InputJsonValue
    rmsdReference?: number | null
    createdAt?: Date | string
  }

  export type StructureModelUncheckedCreateWithoutJobInput = {
    id?: string
    name: string
    format?: string
    storageUrl?: string | null
    pdbText?: string | null
    chains?: NullableJsonNullValueInput | InputJsonValue
    ligands?: NullableJsonNullValueInput | InputJsonValue
    confidenceMap?: NullableJsonNullValueInput | InputJsonValue
    paeMatrix?: NullableJsonNullValueInput | InputJsonValue
    rmsdReference?: number | null
    createdAt?: Date | string
  }

  export type StructureModelCreateOrConnectWithoutJobInput = {
    where: StructureModelWhereUniqueInput
    create: XOR<StructureModelCreateWithoutJobInput, StructureModelUncheckedCreateWithoutJobInput>
  }

  export type StructureModelCreateManyJobInputEnvelope = {
    data: StructureModelCreateManyJobInput | StructureModelCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type AnalysisResultCreateWithoutJobInput = {
    id?: string
    type: string
    title: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    sequence?: ProteinSequenceCreateNestedOneWithoutAnalysisResultsInput
  }

  export type AnalysisResultUncheckedCreateWithoutJobInput = {
    id?: string
    sequenceId?: string | null
    type: string
    title: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AnalysisResultCreateOrConnectWithoutJobInput = {
    where: AnalysisResultWhereUniqueInput
    create: XOR<AnalysisResultCreateWithoutJobInput, AnalysisResultUncheckedCreateWithoutJobInput>
  }

  export type AnalysisResultCreateManyJobInputEnvelope = {
    data: AnalysisResultCreateManyJobInput | AnalysisResultCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceUpsertWithoutJobsInput = {
    update: XOR<WorkspaceUpdateWithoutJobsInput, WorkspaceUncheckedUpdateWithoutJobsInput>
    create: XOR<WorkspaceCreateWithoutJobsInput, WorkspaceUncheckedCreateWithoutJobsInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutJobsInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutJobsInput, WorkspaceUncheckedUpdateWithoutJobsInput>
  }

  export type WorkspaceUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutWorkspacesNestedInput
    sequences?: ProteinSequenceUpdateManyWithoutWorkspaceNestedInput
    bookmarks?: BookmarkUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sequences?: ProteinSequenceUncheckedUpdateManyWithoutWorkspaceNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type ProteinSequenceUpsertWithoutJobsInput = {
    update: XOR<ProteinSequenceUpdateWithoutJobsInput, ProteinSequenceUncheckedUpdateWithoutJobsInput>
    create: XOR<ProteinSequenceCreateWithoutJobsInput, ProteinSequenceUncheckedCreateWithoutJobsInput>
    where?: ProteinSequenceWhereInput
  }

  export type ProteinSequenceUpdateToOneWithWhereWithoutJobsInput = {
    where?: ProteinSequenceWhereInput
    data: XOR<ProteinSequenceUpdateWithoutJobsInput, ProteinSequenceUncheckedUpdateWithoutJobsInput>
  }

  export type ProteinSequenceUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    accession?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: StringFieldUpdateOperationsInput | string
    sequenceLength?: IntFieldUpdateOperationsInput | number
    molecularWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    isoelectricPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutSequencesNestedInput
    analysisResults?: AnalysisResultUpdateManyWithoutSequenceNestedInput
  }

  export type ProteinSequenceUncheckedUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    accession?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: StringFieldUpdateOperationsInput | string
    sequenceLength?: IntFieldUpdateOperationsInput | number
    molecularWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    isoelectricPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    analysisResults?: AnalysisResultUncheckedUpdateManyWithoutSequenceNestedInput
  }

  export type TemplateHitUpsertWithWhereUniqueWithoutJobInput = {
    where: TemplateHitWhereUniqueInput
    update: XOR<TemplateHitUpdateWithoutJobInput, TemplateHitUncheckedUpdateWithoutJobInput>
    create: XOR<TemplateHitCreateWithoutJobInput, TemplateHitUncheckedCreateWithoutJobInput>
  }

  export type TemplateHitUpdateWithWhereUniqueWithoutJobInput = {
    where: TemplateHitWhereUniqueInput
    data: XOR<TemplateHitUpdateWithoutJobInput, TemplateHitUncheckedUpdateWithoutJobInput>
  }

  export type TemplateHitUpdateManyWithWhereWithoutJobInput = {
    where: TemplateHitScalarWhereInput
    data: XOR<TemplateHitUpdateManyMutationInput, TemplateHitUncheckedUpdateManyWithoutJobInput>
  }

  export type TemplateHitScalarWhereInput = {
    AND?: TemplateHitScalarWhereInput | TemplateHitScalarWhereInput[]
    OR?: TemplateHitScalarWhereInput[]
    NOT?: TemplateHitScalarWhereInput | TemplateHitScalarWhereInput[]
    id?: StringFilter<"TemplateHit"> | string
    jobId?: StringFilter<"TemplateHit"> | string
    pdbId?: StringFilter<"TemplateHit"> | string
    chainId?: StringNullableFilter<"TemplateHit"> | string | null
    title?: StringFilter<"TemplateHit"> | string
    organism?: StringNullableFilter<"TemplateHit"> | string | null
    resolution?: FloatNullableFilter<"TemplateHit"> | number | null
    sequenceIdentity?: FloatFilter<"TemplateHit"> | number
    coverage?: FloatFilter<"TemplateHit"> | number
    eValue?: FloatNullableFilter<"TemplateHit"> | number | null
    foldseekScore?: FloatNullableFilter<"TemplateHit"> | number | null
    reliabilityBand?: StringFilter<"TemplateHit"> | string
    metadata?: JsonNullableFilter<"TemplateHit">
    createdAt?: DateTimeFilter<"TemplateHit"> | Date | string
  }

  export type StructureModelUpsertWithWhereUniqueWithoutJobInput = {
    where: StructureModelWhereUniqueInput
    update: XOR<StructureModelUpdateWithoutJobInput, StructureModelUncheckedUpdateWithoutJobInput>
    create: XOR<StructureModelCreateWithoutJobInput, StructureModelUncheckedCreateWithoutJobInput>
  }

  export type StructureModelUpdateWithWhereUniqueWithoutJobInput = {
    where: StructureModelWhereUniqueInput
    data: XOR<StructureModelUpdateWithoutJobInput, StructureModelUncheckedUpdateWithoutJobInput>
  }

  export type StructureModelUpdateManyWithWhereWithoutJobInput = {
    where: StructureModelScalarWhereInput
    data: XOR<StructureModelUpdateManyMutationInput, StructureModelUncheckedUpdateManyWithoutJobInput>
  }

  export type StructureModelScalarWhereInput = {
    AND?: StructureModelScalarWhereInput | StructureModelScalarWhereInput[]
    OR?: StructureModelScalarWhereInput[]
    NOT?: StructureModelScalarWhereInput | StructureModelScalarWhereInput[]
    id?: StringFilter<"StructureModel"> | string
    jobId?: StringFilter<"StructureModel"> | string
    name?: StringFilter<"StructureModel"> | string
    format?: StringFilter<"StructureModel"> | string
    storageUrl?: StringNullableFilter<"StructureModel"> | string | null
    pdbText?: StringNullableFilter<"StructureModel"> | string | null
    chains?: JsonNullableFilter<"StructureModel">
    ligands?: JsonNullableFilter<"StructureModel">
    confidenceMap?: JsonNullableFilter<"StructureModel">
    paeMatrix?: JsonNullableFilter<"StructureModel">
    rmsdReference?: FloatNullableFilter<"StructureModel"> | number | null
    createdAt?: DateTimeFilter<"StructureModel"> | Date | string
  }

  export type AnalysisResultUpsertWithWhereUniqueWithoutJobInput = {
    where: AnalysisResultWhereUniqueInput
    update: XOR<AnalysisResultUpdateWithoutJobInput, AnalysisResultUncheckedUpdateWithoutJobInput>
    create: XOR<AnalysisResultCreateWithoutJobInput, AnalysisResultUncheckedCreateWithoutJobInput>
  }

  export type AnalysisResultUpdateWithWhereUniqueWithoutJobInput = {
    where: AnalysisResultWhereUniqueInput
    data: XOR<AnalysisResultUpdateWithoutJobInput, AnalysisResultUncheckedUpdateWithoutJobInput>
  }

  export type AnalysisResultUpdateManyWithWhereWithoutJobInput = {
    where: AnalysisResultScalarWhereInput
    data: XOR<AnalysisResultUpdateManyMutationInput, AnalysisResultUncheckedUpdateManyWithoutJobInput>
  }

  export type PredictionJobCreateWithoutTemplateHitsInput = {
    id?: string
    method: $Enums.PredictionMethod
    status?: $Enums.JobStatus
    progress?: number
    confidence?: number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    workspace: WorkspaceCreateNestedOneWithoutJobsInput
    sequence: ProteinSequenceCreateNestedOneWithoutJobsInput
    structures?: StructureModelCreateNestedManyWithoutJobInput
    analysisResults?: AnalysisResultCreateNestedManyWithoutJobInput
  }

  export type PredictionJobUncheckedCreateWithoutTemplateHitsInput = {
    id?: string
    workspaceId: string
    sequenceId: string
    method: $Enums.PredictionMethod
    status?: $Enums.JobStatus
    progress?: number
    confidence?: number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    structures?: StructureModelUncheckedCreateNestedManyWithoutJobInput
    analysisResults?: AnalysisResultUncheckedCreateNestedManyWithoutJobInput
  }

  export type PredictionJobCreateOrConnectWithoutTemplateHitsInput = {
    where: PredictionJobWhereUniqueInput
    create: XOR<PredictionJobCreateWithoutTemplateHitsInput, PredictionJobUncheckedCreateWithoutTemplateHitsInput>
  }

  export type PredictionJobUpsertWithoutTemplateHitsInput = {
    update: XOR<PredictionJobUpdateWithoutTemplateHitsInput, PredictionJobUncheckedUpdateWithoutTemplateHitsInput>
    create: XOR<PredictionJobCreateWithoutTemplateHitsInput, PredictionJobUncheckedCreateWithoutTemplateHitsInput>
    where?: PredictionJobWhereInput
  }

  export type PredictionJobUpdateToOneWithWhereWithoutTemplateHitsInput = {
    where?: PredictionJobWhereInput
    data: XOR<PredictionJobUpdateWithoutTemplateHitsInput, PredictionJobUncheckedUpdateWithoutTemplateHitsInput>
  }

  export type PredictionJobUpdateWithoutTemplateHitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspace?: WorkspaceUpdateOneRequiredWithoutJobsNestedInput
    sequence?: ProteinSequenceUpdateOneRequiredWithoutJobsNestedInput
    structures?: StructureModelUpdateManyWithoutJobNestedInput
    analysisResults?: AnalysisResultUpdateManyWithoutJobNestedInput
  }

  export type PredictionJobUncheckedUpdateWithoutTemplateHitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    sequenceId?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    structures?: StructureModelUncheckedUpdateManyWithoutJobNestedInput
    analysisResults?: AnalysisResultUncheckedUpdateManyWithoutJobNestedInput
  }

  export type PredictionJobCreateWithoutStructuresInput = {
    id?: string
    method: $Enums.PredictionMethod
    status?: $Enums.JobStatus
    progress?: number
    confidence?: number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    workspace: WorkspaceCreateNestedOneWithoutJobsInput
    sequence: ProteinSequenceCreateNestedOneWithoutJobsInput
    templateHits?: TemplateHitCreateNestedManyWithoutJobInput
    analysisResults?: AnalysisResultCreateNestedManyWithoutJobInput
  }

  export type PredictionJobUncheckedCreateWithoutStructuresInput = {
    id?: string
    workspaceId: string
    sequenceId: string
    method: $Enums.PredictionMethod
    status?: $Enums.JobStatus
    progress?: number
    confidence?: number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    templateHits?: TemplateHitUncheckedCreateNestedManyWithoutJobInput
    analysisResults?: AnalysisResultUncheckedCreateNestedManyWithoutJobInput
  }

  export type PredictionJobCreateOrConnectWithoutStructuresInput = {
    where: PredictionJobWhereUniqueInput
    create: XOR<PredictionJobCreateWithoutStructuresInput, PredictionJobUncheckedCreateWithoutStructuresInput>
  }

  export type PredictionJobUpsertWithoutStructuresInput = {
    update: XOR<PredictionJobUpdateWithoutStructuresInput, PredictionJobUncheckedUpdateWithoutStructuresInput>
    create: XOR<PredictionJobCreateWithoutStructuresInput, PredictionJobUncheckedCreateWithoutStructuresInput>
    where?: PredictionJobWhereInput
  }

  export type PredictionJobUpdateToOneWithWhereWithoutStructuresInput = {
    where?: PredictionJobWhereInput
    data: XOR<PredictionJobUpdateWithoutStructuresInput, PredictionJobUncheckedUpdateWithoutStructuresInput>
  }

  export type PredictionJobUpdateWithoutStructuresInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspace?: WorkspaceUpdateOneRequiredWithoutJobsNestedInput
    sequence?: ProteinSequenceUpdateOneRequiredWithoutJobsNestedInput
    templateHits?: TemplateHitUpdateManyWithoutJobNestedInput
    analysisResults?: AnalysisResultUpdateManyWithoutJobNestedInput
  }

  export type PredictionJobUncheckedUpdateWithoutStructuresInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    sequenceId?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    templateHits?: TemplateHitUncheckedUpdateManyWithoutJobNestedInput
    analysisResults?: AnalysisResultUncheckedUpdateManyWithoutJobNestedInput
  }

  export type ProteinSequenceCreateWithoutAnalysisResultsInput = {
    id?: string
    accession?: string | null
    name: string
    organism?: string | null
    sequence: string
    sequenceLength: number
    molecularWeight?: number | null
    isoelectricPoint?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutSequencesInput
    jobs?: PredictionJobCreateNestedManyWithoutSequenceInput
  }

  export type ProteinSequenceUncheckedCreateWithoutAnalysisResultsInput = {
    id?: string
    workspaceId: string
    accession?: string | null
    name: string
    organism?: string | null
    sequence: string
    sequenceLength: number
    molecularWeight?: number | null
    isoelectricPoint?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: PredictionJobUncheckedCreateNestedManyWithoutSequenceInput
  }

  export type ProteinSequenceCreateOrConnectWithoutAnalysisResultsInput = {
    where: ProteinSequenceWhereUniqueInput
    create: XOR<ProteinSequenceCreateWithoutAnalysisResultsInput, ProteinSequenceUncheckedCreateWithoutAnalysisResultsInput>
  }

  export type PredictionJobCreateWithoutAnalysisResultsInput = {
    id?: string
    method: $Enums.PredictionMethod
    status?: $Enums.JobStatus
    progress?: number
    confidence?: number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    workspace: WorkspaceCreateNestedOneWithoutJobsInput
    sequence: ProteinSequenceCreateNestedOneWithoutJobsInput
    templateHits?: TemplateHitCreateNestedManyWithoutJobInput
    structures?: StructureModelCreateNestedManyWithoutJobInput
  }

  export type PredictionJobUncheckedCreateWithoutAnalysisResultsInput = {
    id?: string
    workspaceId: string
    sequenceId: string
    method: $Enums.PredictionMethod
    status?: $Enums.JobStatus
    progress?: number
    confidence?: number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    templateHits?: TemplateHitUncheckedCreateNestedManyWithoutJobInput
    structures?: StructureModelUncheckedCreateNestedManyWithoutJobInput
  }

  export type PredictionJobCreateOrConnectWithoutAnalysisResultsInput = {
    where: PredictionJobWhereUniqueInput
    create: XOR<PredictionJobCreateWithoutAnalysisResultsInput, PredictionJobUncheckedCreateWithoutAnalysisResultsInput>
  }

  export type ProteinSequenceUpsertWithoutAnalysisResultsInput = {
    update: XOR<ProteinSequenceUpdateWithoutAnalysisResultsInput, ProteinSequenceUncheckedUpdateWithoutAnalysisResultsInput>
    create: XOR<ProteinSequenceCreateWithoutAnalysisResultsInput, ProteinSequenceUncheckedCreateWithoutAnalysisResultsInput>
    where?: ProteinSequenceWhereInput
  }

  export type ProteinSequenceUpdateToOneWithWhereWithoutAnalysisResultsInput = {
    where?: ProteinSequenceWhereInput
    data: XOR<ProteinSequenceUpdateWithoutAnalysisResultsInput, ProteinSequenceUncheckedUpdateWithoutAnalysisResultsInput>
  }

  export type ProteinSequenceUpdateWithoutAnalysisResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    accession?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: StringFieldUpdateOperationsInput | string
    sequenceLength?: IntFieldUpdateOperationsInput | number
    molecularWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    isoelectricPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutSequencesNestedInput
    jobs?: PredictionJobUpdateManyWithoutSequenceNestedInput
  }

  export type ProteinSequenceUncheckedUpdateWithoutAnalysisResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    accession?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: StringFieldUpdateOperationsInput | string
    sequenceLength?: IntFieldUpdateOperationsInput | number
    molecularWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    isoelectricPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: PredictionJobUncheckedUpdateManyWithoutSequenceNestedInput
  }

  export type PredictionJobUpsertWithoutAnalysisResultsInput = {
    update: XOR<PredictionJobUpdateWithoutAnalysisResultsInput, PredictionJobUncheckedUpdateWithoutAnalysisResultsInput>
    create: XOR<PredictionJobCreateWithoutAnalysisResultsInput, PredictionJobUncheckedCreateWithoutAnalysisResultsInput>
    where?: PredictionJobWhereInput
  }

  export type PredictionJobUpdateToOneWithWhereWithoutAnalysisResultsInput = {
    where?: PredictionJobWhereInput
    data: XOR<PredictionJobUpdateWithoutAnalysisResultsInput, PredictionJobUncheckedUpdateWithoutAnalysisResultsInput>
  }

  export type PredictionJobUpdateWithoutAnalysisResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspace?: WorkspaceUpdateOneRequiredWithoutJobsNestedInput
    sequence?: ProteinSequenceUpdateOneRequiredWithoutJobsNestedInput
    templateHits?: TemplateHitUpdateManyWithoutJobNestedInput
    structures?: StructureModelUpdateManyWithoutJobNestedInput
  }

  export type PredictionJobUncheckedUpdateWithoutAnalysisResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    sequenceId?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    templateHits?: TemplateHitUncheckedUpdateManyWithoutJobNestedInput
    structures?: StructureModelUncheckedUpdateManyWithoutJobNestedInput
  }

  export type UserCreateWithoutBookmarksInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaces?: WorkspaceCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutBookmarksInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaces?: WorkspaceUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutBookmarksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
  }

  export type WorkspaceCreateWithoutBookmarksInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutWorkspacesInput
    sequences?: ProteinSequenceCreateNestedManyWithoutWorkspaceInput
    jobs?: PredictionJobCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutBookmarksInput = {
    id?: string
    name: string
    description?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sequences?: ProteinSequenceUncheckedCreateNestedManyWithoutWorkspaceInput
    jobs?: PredictionJobUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutBookmarksInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutBookmarksInput, WorkspaceUncheckedCreateWithoutBookmarksInput>
  }

  export type UserUpsertWithoutBookmarksInput = {
    update: XOR<UserUpdateWithoutBookmarksInput, UserUncheckedUpdateWithoutBookmarksInput>
    create: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookmarksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookmarksInput, UserUncheckedUpdateWithoutBookmarksInput>
  }

  export type UserUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaces?: WorkspaceUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaces?: WorkspaceUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type WorkspaceUpsertWithoutBookmarksInput = {
    update: XOR<WorkspaceUpdateWithoutBookmarksInput, WorkspaceUncheckedUpdateWithoutBookmarksInput>
    create: XOR<WorkspaceCreateWithoutBookmarksInput, WorkspaceUncheckedCreateWithoutBookmarksInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutBookmarksInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutBookmarksInput, WorkspaceUncheckedUpdateWithoutBookmarksInput>
  }

  export type WorkspaceUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutWorkspacesNestedInput
    sequences?: ProteinSequenceUpdateManyWithoutWorkspaceNestedInput
    jobs?: PredictionJobUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sequences?: ProteinSequenceUncheckedUpdateManyWithoutWorkspaceNestedInput
    jobs?: PredictionJobUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceCreateManyOwnerInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookmarkCreateManyUserInput = {
    id?: string
    workspaceId: string
    label: string
    targetType: string
    targetId: string
    createdAt?: Date | string
  }

  export type WorkspaceUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sequences?: ProteinSequenceUpdateManyWithoutWorkspaceNestedInput
    jobs?: PredictionJobUpdateManyWithoutWorkspaceNestedInput
    bookmarks?: BookmarkUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sequences?: ProteinSequenceUncheckedUpdateManyWithoutWorkspaceNestedInput
    jobs?: PredictionJobUncheckedUpdateManyWithoutWorkspaceNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutBookmarksNestedInput
  }

  export type BookmarkUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProteinSequenceCreateManyWorkspaceInput = {
    id?: string
    accession?: string | null
    name: string
    organism?: string | null
    sequence: string
    sequenceLength: number
    molecularWeight?: number | null
    isoelectricPoint?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PredictionJobCreateManyWorkspaceInput = {
    id?: string
    sequenceId: string
    method: $Enums.PredictionMethod
    status?: $Enums.JobStatus
    progress?: number
    confidence?: number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type BookmarkCreateManyWorkspaceInput = {
    id?: string
    userId: string
    label: string
    targetType: string
    targetId: string
    createdAt?: Date | string
  }

  export type ProteinSequenceUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    accession?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: StringFieldUpdateOperationsInput | string
    sequenceLength?: IntFieldUpdateOperationsInput | number
    molecularWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    isoelectricPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: PredictionJobUpdateManyWithoutSequenceNestedInput
    analysisResults?: AnalysisResultUpdateManyWithoutSequenceNestedInput
  }

  export type ProteinSequenceUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    accession?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: StringFieldUpdateOperationsInput | string
    sequenceLength?: IntFieldUpdateOperationsInput | number
    molecularWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    isoelectricPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: PredictionJobUncheckedUpdateManyWithoutSequenceNestedInput
    analysisResults?: AnalysisResultUncheckedUpdateManyWithoutSequenceNestedInput
  }

  export type ProteinSequenceUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    accession?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: StringFieldUpdateOperationsInput | string
    sequenceLength?: IntFieldUpdateOperationsInput | number
    molecularWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    isoelectricPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PredictionJobUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sequence?: ProteinSequenceUpdateOneRequiredWithoutJobsNestedInput
    templateHits?: TemplateHitUpdateManyWithoutJobNestedInput
    structures?: StructureModelUpdateManyWithoutJobNestedInput
    analysisResults?: AnalysisResultUpdateManyWithoutJobNestedInput
  }

  export type PredictionJobUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceId?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    templateHits?: TemplateHitUncheckedUpdateManyWithoutJobNestedInput
    structures?: StructureModelUncheckedUpdateManyWithoutJobNestedInput
    analysisResults?: AnalysisResultUncheckedUpdateManyWithoutJobNestedInput
  }

  export type PredictionJobUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceId?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BookmarkUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookmarksNestedInput
  }

  export type BookmarkUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PredictionJobCreateManySequenceInput = {
    id?: string
    workspaceId: string
    method: $Enums.PredictionMethod
    status?: $Enums.JobStatus
    progress?: number
    confidence?: number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AnalysisResultCreateManySequenceInput = {
    id?: string
    jobId?: string | null
    type: string
    title: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PredictionJobUpdateWithoutSequenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspace?: WorkspaceUpdateOneRequiredWithoutJobsNestedInput
    templateHits?: TemplateHitUpdateManyWithoutJobNestedInput
    structures?: StructureModelUpdateManyWithoutJobNestedInput
    analysisResults?: AnalysisResultUpdateManyWithoutJobNestedInput
  }

  export type PredictionJobUncheckedUpdateWithoutSequenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    templateHits?: TemplateHitUncheckedUpdateManyWithoutJobNestedInput
    structures?: StructureModelUncheckedUpdateManyWithoutJobNestedInput
    analysisResults?: AnalysisResultUncheckedUpdateManyWithoutJobNestedInput
  }

  export type PredictionJobUncheckedUpdateManyWithoutSequenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    method?: EnumPredictionMethodFieldUpdateOperationsInput | $Enums.PredictionMethod
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    progress?: IntFieldUpdateOperationsInput | number
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableJsonNullValueInput | InputJsonValue
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnalysisResultUpdateWithoutSequenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: PredictionJobUpdateOneWithoutAnalysisResultsNestedInput
  }

  export type AnalysisResultUncheckedUpdateWithoutSequenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalysisResultUncheckedUpdateManyWithoutSequenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateHitCreateManyJobInput = {
    id?: string
    pdbId: string
    chainId?: string | null
    title: string
    organism?: string | null
    resolution?: number | null
    sequenceIdentity: number
    coverage: number
    eValue?: number | null
    foldseekScore?: number | null
    reliabilityBand: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type StructureModelCreateManyJobInput = {
    id?: string
    name: string
    format?: string
    storageUrl?: string | null
    pdbText?: string | null
    chains?: NullableJsonNullValueInput | InputJsonValue
    ligands?: NullableJsonNullValueInput | InputJsonValue
    confidenceMap?: NullableJsonNullValueInput | InputJsonValue
    paeMatrix?: NullableJsonNullValueInput | InputJsonValue
    rmsdReference?: number | null
    createdAt?: Date | string
  }

  export type AnalysisResultCreateManyJobInput = {
    id?: string
    sequenceId?: string | null
    type: string
    title: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TemplateHitUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    pdbId?: StringFieldUpdateOperationsInput | string
    chainId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableFloatFieldUpdateOperationsInput | number | null
    sequenceIdentity?: FloatFieldUpdateOperationsInput | number
    coverage?: FloatFieldUpdateOperationsInput | number
    eValue?: NullableFloatFieldUpdateOperationsInput | number | null
    foldseekScore?: NullableFloatFieldUpdateOperationsInput | number | null
    reliabilityBand?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateHitUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    pdbId?: StringFieldUpdateOperationsInput | string
    chainId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableFloatFieldUpdateOperationsInput | number | null
    sequenceIdentity?: FloatFieldUpdateOperationsInput | number
    coverage?: FloatFieldUpdateOperationsInput | number
    eValue?: NullableFloatFieldUpdateOperationsInput | number | null
    foldseekScore?: NullableFloatFieldUpdateOperationsInput | number | null
    reliabilityBand?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateHitUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    pdbId?: StringFieldUpdateOperationsInput | string
    chainId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    organism?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableFloatFieldUpdateOperationsInput | number | null
    sequenceIdentity?: FloatFieldUpdateOperationsInput | number
    coverage?: FloatFieldUpdateOperationsInput | number
    eValue?: NullableFloatFieldUpdateOperationsInput | number | null
    foldseekScore?: NullableFloatFieldUpdateOperationsInput | number | null
    reliabilityBand?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StructureModelUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pdbText?: NullableStringFieldUpdateOperationsInput | string | null
    chains?: NullableJsonNullValueInput | InputJsonValue
    ligands?: NullableJsonNullValueInput | InputJsonValue
    confidenceMap?: NullableJsonNullValueInput | InputJsonValue
    paeMatrix?: NullableJsonNullValueInput | InputJsonValue
    rmsdReference?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StructureModelUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pdbText?: NullableStringFieldUpdateOperationsInput | string | null
    chains?: NullableJsonNullValueInput | InputJsonValue
    ligands?: NullableJsonNullValueInput | InputJsonValue
    confidenceMap?: NullableJsonNullValueInput | InputJsonValue
    paeMatrix?: NullableJsonNullValueInput | InputJsonValue
    rmsdReference?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StructureModelUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    storageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pdbText?: NullableStringFieldUpdateOperationsInput | string | null
    chains?: NullableJsonNullValueInput | InputJsonValue
    ligands?: NullableJsonNullValueInput | InputJsonValue
    confidenceMap?: NullableJsonNullValueInput | InputJsonValue
    paeMatrix?: NullableJsonNullValueInput | InputJsonValue
    rmsdReference?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalysisResultUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sequence?: ProteinSequenceUpdateOneWithoutAnalysisResultsNestedInput
  }

  export type AnalysisResultUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalysisResultUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequenceId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
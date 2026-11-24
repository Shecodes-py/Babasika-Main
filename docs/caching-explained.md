# How the PFA cache works

This guide explains the small cache used by `GET /pfas`. The goal is to make the cache miss and cache hit visible while keeping the database as the source of truth.

## The request flow

The PFA list is useful for this example because many requests can read it while it changes infrequently.

| Request                               | What the API does   

| First `GET /pfas`                     | The cache has no `pfas:list` value. The service queries PostgreSQL through Prisma, stores the returned list for 60 seconds, and sends it back. This is a cache miss. |
| Another `GET /pfas` within 60 seconds | The service finds `pfas:list` and returns it without querying PostgreSQL. This is a cache hit.                                                                       |
| `GET /pfas` after the entry expires   | The cache reports a miss again, so the service reads fresh data from PostgreSQL and stores it again.                                                                 |

An empty list is still a valid cached result. `node-cache` returns `undefined` for a missing or expired key, so the service checks specifically for `undefined` rather than checking whether the list has items.

## How the NestJS pieces fit together

- **`PfasController`** receives the HTTP request at `/pfas` and calls `PfasService.findAll()`.
- **`PfasService`** decides whether to use the cache or ask Prisma for the data. This keeps the read logic out of the controller.
- **`PrismaService`** is the shared database client. `findMany()` asks PostgreSQL for all PFA rows, and `await` waits for that database request to finish.
- **`NodeCacheModule`** creates one `NodeCache` object and exports it. Nest injects that same object into the service. If a new cache were created on every request, each request would see an empty cache and there would be no hits.
- **`Logger`** writes `Cache HIT` or `Cache MISS` to the server terminal so the flow is easy to demonstrate. The API response stays the PFA list.
- **`@Injectable()` and constructor injection** tell Nest to create `PfasService` and pass it the Prisma and cache providers. You do not call `new PfasService(...)` in the controller.

## Why these functions are used

- `cache.get(key)` looks up a value. It is synchronous because this cache is in the app's memory, so there is no network request and no `await`.
- `cache.set(key, value)` stores the result for later requests. The module sets a 60-second default time to live (TTL), which is how long an entry can be used before it expires.
- `prisma.pfa.findMany()` reads the records from PostgreSQL. It is asynchronous, so the service uses `await`.
- `orderBy: { name: 'asc' }` asks PostgreSQL to return PFAs in name order, making the list predictable.
- `PFA_LIST_CACHE_KEY` keeps the cache key in one named constant, so reads and future invalidation use the same spelling.
- `PfaModel[]` is a TypeScript type for the generated Prisma PFA records. It helps catch mistakes while building the app and is not a runtime cache feature.
- `stdTTL: 60` means a cached value is usable for 60 seconds. `checkperiod: 0` turns off NodeCache's background cleanup timer; an expired entry is treated as missing when its key is read. `maxKeys: 100` caps how many keys this in-memory cache can hold.

The assignment specifically says NodeCache, so this example uses the `node-cache` package directly rather than Nest's separate `@nestjs/cache-manager` integration.

## Why cache only this data

The PFA list is reference data and is read-only in this example. Do not copy wallet balances or other money state into this cache for the assignment: those values can change frequently, and a stale balance could mislead someone.

When real create, update, or delete operations for PFAs are added, they should remove the `pfas:list` entry after the database write succeeds. The next list request will then read the updated data from PostgreSQL. The current generated PFA write methods are placeholders and do not change the database.

## Limits of this cache

`node-cache` stores values in the memory of one running Node.js process. Restarting the app clears the cache. If the app runs as multiple processes or servers, each one has its own separate cache. That is suitable for this learning example; a shared store can be considered if the app later needs shared cache state.

## Demonstrate the flow

1. Make sure the migrations have been applied and the app can connect to Neon.
2. Run the API with `npm run start:dev`.
3. Request `GET http://localhost:3000/pfas` twice within 60 seconds.
4. Watch the API terminal: the first request logs a cache miss, and the second logs a cache hit.
5. Wait longer than 60 seconds and request it again to see another miss.

If the table has no rows, the endpoint returns `[]`; the empty result is cached too. You do not need to add a PFA just to demonstrate the cache behavior.


## References

- [NodeCache documentation](https://github.com/node-cache/node-cache)
- [NestJS modules and dependency injection](https://docs.nestjs.com/modules)
- [Prisma Client reference](https://www.prisma.io/docs/orm/prisma-client)

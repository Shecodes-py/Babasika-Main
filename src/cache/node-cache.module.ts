import { Module } from '@nestjs/common';
import NodeCache from 'node-cache';

@Module({
  providers: [
    {
      provide: NodeCache,
      useFactory: () =>
        new NodeCache({
          stdTTL: 60,
          checkperiod: 0,
          maxKeys: 100,
        }),
    },
  ],
  exports: [NodeCache],
})
export class NodeCacheModule {}

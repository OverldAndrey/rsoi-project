import { shareReplay } from 'rxjs/operators';

// TODO: Use it everywhere
/**
 * shareReplay with refCount and buffer of size 1
 */
export const shareReplayOneRefCount = <T>() => shareReplay<T>({
    refCount: true,
    bufferSize: 1,
});
